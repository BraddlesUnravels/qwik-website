import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import type { Plugin } from "vite";
import type { QwikVitePlugin } from "@builder.io/qwik/optimizer";
import { isPrecompressedAssetPath } from "./response-compression";

export default function precompressAssets(): Plugin {
  let clientDirectory: string;
  let gzipDirectory: string;

  return {
    name: "bun-precompress-assets",
    apply: "build",
    configResolved(config) {
      const qwik = config.plugins.find(
        (plugin) => plugin.name === "vite-plugin-qwik",
      ) as QwikVitePlugin;

      const directory = qwik?.api.getClientPublicOutDir();
      if (!directory)
        throw new Error(
          "Compression Error: Cannot find Qwik's client output for compression.",
        );

      clientDirectory = directory;
      gzipDirectory = resolve(config.root, config.build.outDir, "gzip");
    },
    closeBundle: {
      order: "post",
      sequential: true,
      async handler() {
        await rm(gzipDirectory, { recursive: true, force: true });

        for (const directory of ["assets", "build"]) {
          const source = resolve(clientDirectory, directory);
          const destination = resolve(gzipDirectory, directory);
          await mkdir(destination, { recursive: true });

          for (const file of await readdir(source, { withFileTypes: true })) {
            if (
              !file.isFile() ||
              !isPrecompressedAssetPath(`/${directory}/${file.name}`)
            )
              continue;

            const original = await readFile(resolve(source, file.name));
            const compressed = gzipSync(original, { level: 9 });

            if (compressed.length < original.length)
              await writeFile(
                resolve(destination, `${file.name}.gz`),
                compressed,
              );
          }
        }
      },
    },
  };
}
