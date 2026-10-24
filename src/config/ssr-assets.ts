import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { QwikVitePlugin } from "@builder.io/qwik/optimizer";
import type { Plugin } from "vite";

// routeLoader$ imports are removed from the client build. Publish assets
// emitted by those server-only imports alongside the normal client assets.
export const ssrAssets = (): Plugin => {
  let publicDirectory: string | null = null;

  return {
    name: "qwik-ssr-assets",
    apply: "build",
    config: () => ({ build: { ssrEmitAssets: true } }),
    configResolved(config) {
      if (!config.build.ssr) return;
      const qwik = config.plugins.find(
        (plugin) => plugin.name === "vite-plugin-qwik",
      ) as QwikVitePlugin | undefined;
      publicDirectory = qwik?.api.getClientPublicOutDir() ?? null;
      if (!publicDirectory) {
        throw new Error(
          "Cannot publish SSR assets without Qwik's client output directory.",
        );
      }
    },
    async writeBundle(_, bundle) {
      if (!publicDirectory) return;
      const directory = publicDirectory;
      await Promise.all(
        Object.values(bundle).map(async (output) => {
          if (output.type !== "asset") return;
          const destination = resolve(directory, output.fileName);
          await mkdir(dirname(destination), { recursive: true });
          await writeFile(destination, output.source);
        }),
      );
    },
  };
};
