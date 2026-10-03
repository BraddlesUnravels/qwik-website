import { describe, expect, it } from "vitest";
import {
  getServerOrigin,
  normalizeServerRequest,
  trustedOrigins,
} from "~/lib/server-origin";

describe("lib/server-origin", () => {
  it.each(trustedOrigins)(
    "restores %s behind an HTTP reverse proxy",
    (origin) => {
      const internalUrl = origin.replace("https:", "http:");
      expect(
        getServerOrigin(
          new Request(`${internalUrl}/work/access-control-demo/?qaction=test`),
        ),
      ).toBe(origin);
    },
  );

  it.each(trustedOrigins)("preserves an already HTTPS origin %s", (origin) => {
    expect(getServerOrigin(new Request(`${origin}/`))).toBe(origin);
  });

  it("keeps the apex and www origins distinct for same-origin CSRF checks", () => {
    const request = new Request("http://braddlesunravels.online/", {
      method: "POST",
      headers: { Origin: "https://www.braddlesunravels.online" },
    });
    expect(getServerOrigin(request)).toBe("https://braddlesunravels.online");
    expect(getServerOrigin(request)).not.toBe(request.headers.get("Origin"));
  });

  it.each([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://aca-qwik-website-production.azurecontainerapps.io",
    "http://braddlesunravels.online:8080",
    "http://braddlesunravels.online.attacker.test",
  ])("does not rewrite an unlisted origin %s", (origin) => {
    expect(getServerOrigin(new Request(`${origin}/health`))).toBe(origin);
  });

  it("does not trust Origin or forwarded headers to select the server origin", () => {
    const request = new Request("http://braddlesunravels.online/", {
      method: "POST",
      headers: {
        Origin: "https://attacker.test",
        "X-Forwarded-Host": "attacker.test",
        "X-Forwarded-Proto": "http",
        Forwarded: "host=attacker.test;proto=http",
      },
    });
    expect(getServerOrigin(request)).toBe("https://braddlesunravels.online");
  });

  it("normalizes the actual POST URL without changing its body or Origin", async () => {
    const request = new Request(
      "http://braddlesunravels.online/work/access-control-demo/?qaction=test",
      {
        method: "POST",
        headers: {
          Origin: "https://attacker.test",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "session=test",
        },
        body: "field=value",
      },
    );
    const normalized = normalizeServerRequest(request);
    expect(normalized.url).toBe(
      "https://braddlesunravels.online/work/access-control-demo/?qaction=test",
    );
    expect(normalized.method).toBe("POST");
    expect(normalized.headers.get("Origin")).toBe("https://attacker.test");
    expect(normalized.headers.get("Cookie")).toBe("session=test");
    expect(normalized.headers.get("Content-Type")).toBe(
      "application/x-www-form-urlencoded",
    );
    expect(await normalized.text()).toBe("field=value");
  });

  it("preserves the original request for unlisted hosts and existing HTTPS", () => {
    for (const url of [
      "http://localhost:3000/health",
      "https://braddlesunravels.online/",
      "http://braddlesunravels.online:8080/",
    ]) {
      const request = new Request(url);
      expect(normalizeServerRequest(request)).toBe(request);
    }
  });
});
