import { describe, expect, it } from "vitest";
import { resolveAccessLink } from "~/lib/demo-access";

const reader = (env: Record<string, string>) => (key: string) => env[key];

describe("lib/demo-access", () => {
  it("should interpolate placeholders and encode the access code", () => {
    const link = resolveAccessLink(
      "LINK",
      reader({
        LINK: "{{DOMAIN}}/?code={{CODE}}",
        DOMAIN: "https://demo.test/",
        CODE: "a b&c",
      }),
    );

    expect(link).toBe("https://demo.test/?code=a%20b%26c");
  });

  it("should return null when a referenced value is missing", () => {
    expect(
      resolveAccessLink("LINK", reader({ LINK: "{{DOMAIN}}/?code={{CODE}}" })),
    ).toBeNull();
  });

  it("should return null when the link is not configured", () => {
    expect(resolveAccessLink("LINK", reader({}))).toBeNull();
  });

  it("should reject non-http protocols", () => {
    expect(
      resolveAccessLink("LINK", reader({ LINK: "javascript:alert(1)" })),
    ).toBeNull();
  });
});
