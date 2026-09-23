import { describe, expect, it, vi } from "vitest";
import { onGet, onHead } from "~/routes/health";

const createEvent = () => {
  const headers = new Headers();
  const text = vi.fn();
  const status = vi.fn();

  return {
    headers,
    text,
    status,
  };
};

describe("routes/health", () => {
  describe("onGet", () => {
    it("should send plain text ok with no-store cache headers", async () => {
      const event = createEvent();

      await onGet(event as never);

      expect(event.text).toHaveBeenCalledWith(200, "ok");
      expect(event.headers.get("cache-control")).toBe("no-store");
    });
  });

  describe("onHead", () => {
    it("should set status and headers without a body", async () => {
      const event = createEvent();

      await onHead(event as never);

      expect(event.status).toHaveBeenCalledWith(200);
      expect(event.headers.get("content-type")).toBe(
        "text/plain; charset=utf-8",
      );
      expect(event.headers.get("cache-control")).toBe("no-store");
      expect(event.text).not.toHaveBeenCalled();
    });
  });
});
