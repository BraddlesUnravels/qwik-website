import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { test } from "node:test";
import { gunzipSync } from "node:zlib";

const origin = process.env.AZURE_CUSTOM_DOMAIN ?? "http://localhost:3000";

function rawResponse(path, encoding, method = "GET") {
  const url = new URL(path, origin);
  const request = url.protocol === "https:" ? httpsRequest : httpRequest;
  return new Promise((resolve, reject) => {
    // fetch decodes gzip automatically. Read the actual wire body here.
    const client = request(
      url,
      {
        method,
        headers: { "Accept-Encoding": encoding },
        signal: AbortSignal.timeout(10_000),
      },
      async (response) => {
        try {
          const chunks = [];
          for await (const chunk of response) chunks.push(chunk);
          resolve({
            status: response.statusCode,
            headers: response.headers,
            body: Buffer.concat(chunks),
          });
        } catch (error) {
          reject(error);
        }
      },
    );
    client.on("error", reject);
    client.end();
  });
}

function withoutQwikInstance(html) {
  const instance = html.match(/\bq:instance="([^"]+)"/)?.[1];
  assert.ok(instance, "Expected a server-rendered Qwik instance");
  return html.replaceAll(instance, "<QWIK_INSTANCE>");
}

async function checkVariants(path) {
  const identity = await rawResponse(path, "identity");
  const gzip = await rawResponse(path, "gzip");
  assert.equal(identity.status, 200, `GET ${path} identity`);
  assert.equal(gzip.status, 200, `GET ${path} gzip`);
  assert.equal(identity.headers["content-encoding"], undefined);
  assert.equal(gzip.headers["content-encoding"], "gzip");
  for (const response of [identity, gzip]) {
    assert.match(
      response.headers.vary ?? "",
      /(?:^|,)\s*accept-encoding\s*(?:,|$)/i,
    );
  }
  assert.equal(gzip.headers["content-type"], identity.headers["content-type"]);
  assert.equal(
    gzip.headers["cache-control"],
    identity.headers["cache-control"],
  );
  assert.ok(
    gzip.body.length < identity.body.length,
    `Gzip should reduce ${path} transfer size`,
  );

  for (const [encoding, get] of [
    ["identity", identity],
    ["gzip", gzip],
  ]) {
    const head = await rawResponse(path, encoding, "HEAD");
    assert.equal(head.status, get.status, `HEAD ${path} ${encoding}`);
    assert.equal(head.body.length, 0, `HEAD ${path} must be bodyless`);
    for (const header of [
      "content-type",
      "content-encoding",
      "content-length",
      "cache-control",
      "vary",
    ]) {
      assert.equal(
        head.headers[header],
        get.headers[header],
        `HEAD ${path} ${encoding} ${header}`,
      );
    }
  }

  return { identity, gzip };
}

test("production server should negotiate compression for the homepage and its build assets", async (t) => {
  const { identity, gzip } = await checkVariants("/");
  const html = identity.body.toString();
  assert.ok(
    withoutQwikInstance(gunzipSync(gzip.body).toString()) ===
      withoutQwikInstance(html),
    "Decoded gzip HTML should must match identity after normalising Qwik's request-specific ID",
  );

  const refused = await rawResponse("/", "gzip;q=0, identity;q=0");
  assert.equal(refused.status, 406);
  assert.equal(refused.headers["cache-control"], "no-store");
  assert.match(
    refused.headers.vary ?? "",
    /(?:^|,)\s*accept-encoding\s*(?:,|$)/i,
  );

  const assets = {
    stylesheet: html.match(
      /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="(\/assets\/[^"]+\.css)"/,
    )?.[1],
    script: html.match(/<script\b[^>]*\bsrc="(\/build\/[^"]+\.js)"/)?.[1],
    "bundle graph": html.match(
      /<link\b[^>]*\bhref="(\/assets\/[^"]+-bundle-graph\.json)"/,
    )?.[1],
  };

  for (const [name, path] of Object.entries(assets)) {
    await t.test(name, async () => {
      assert.ok(path, `Expected ${name} in production HTML`);
      const { identity, gzip } = await checkVariants(path);
      assert.match(gzip.headers["cache-control"] ?? "", /\bimmutable\b/);
      assert.equal(gzip.headers["content-length"], String(gzip.body.length));
      assert.ok(
        gunzipSync(gzip.body).equals(identity.body),
        `Decoded ${name} should match identity byte for byte`,
      );
    });
  }
});
