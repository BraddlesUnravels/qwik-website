import { test as base } from "@playwright/test";
import { stubGtag } from "./stub-gtag";

// The production server is built with analytics enabled, so keep specs that
// are not about analytics off the real Google endpoints.
export const test = base.extend<{ analyticsStub: void }>({
  analyticsStub: [
    async ({ context }, use) => {
      await stubGtag(context);
      await use();
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
