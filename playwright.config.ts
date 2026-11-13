import { defineConfig, devices } from "@playwright/test";

const port = 4177;

export default defineConfig({
  testDir: "playwright",
  testMatch: "**/*.pw.ts",
  // Playwright clears its output dir, and test-results/ also holds media-mutations.json.
  outputDir: "playwright-results",
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Analytics settings are inlined at build time, so the server is built here.
  webServer: {
    command: `PUBLIC_GA_MEASUREMENT_ID=G-TEST123456 bun run build.docker && PORT=${port} bun server/entry.bun.js`,
    url: `http://127.0.0.1:${port}/health`,
    reuseExistingServer: false,
    timeout: 300_000,
  },
});
