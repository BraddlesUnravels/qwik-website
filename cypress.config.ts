import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  video: false,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  component: {
    devServer: {
      // cypress-ct-qwik registers itself under this framework id
      framework: "cypress-ct-qwik" as never,
      bundler: "vite",
      viteConfig: async () => {
        const config = await import("./vite.config");
        return typeof config.default === "function"
          ? config.default()
          : config.default;
      },
    },
    specPattern: "src/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
  },
});
