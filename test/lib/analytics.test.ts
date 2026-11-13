import { afterEach, describe, expect, it, vi } from "vitest";

describe("analytics configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it.each([
    [" G-AB12 ", "G-AB12"],
    ["", undefined],
    ["UA-123456", undefined],
    ["G-ab12", undefined],
    ["G-AB_12", undefined],
  ])("should validate measurement ID %s", async (configuredId, expectedId) => {
    vi.stubEnv("PUBLIC_GA_MEASUREMENT_ID", configuredId);
    const { gaMeasurementId } = await import("~/lib/analytics");

    expect(gaMeasurementId).toBe(expectedId);
  });

  it("should add the enforced policy to HTML responses when enabled", async () => {
    vi.stubEnv("PUBLIC_GA_MEASUREMENT_ID", "G-AB12");
    const { addAnalyticsContentSecurityPolicy } =
      await import("~/lib/analytics");
    const response = new Response("<!doctype html>", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

    const result = addAnalyticsContentSecurityPolicy(response);

    expect(result.headers.get("Content-Security-Policy")).toBe(
      "script-src 'self' 'unsafe-inline'; frame-src 'self'",
    );
  });

  it.each(["", "malformed"])(
    "should not add the policy when the measurement ID is %s",
    async (configuredId) => {
      vi.stubEnv("PUBLIC_GA_MEASUREMENT_ID", configuredId);
      const { addAnalyticsContentSecurityPolicy } =
        await import("~/lib/analytics");
      const response = new Response("<!doctype html>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });

      expect(addAnalyticsContentSecurityPolicy(response)).toBe(response);
    },
  );

  it("should not add the policy to non-HTML responses", async () => {
    vi.stubEnv("PUBLIC_GA_MEASUREMENT_ID", "G-AB12");
    const { addAnalyticsContentSecurityPolicy } =
      await import("~/lib/analytics");
    const response = new Response("{}", {
      headers: { "Content-Type": "application/json" },
    });

    expect(addAnalyticsContentSecurityPolicy(response)).toBe(response);
  });
});
