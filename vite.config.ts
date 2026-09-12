/**
 * Base Vite config.
 * Adapter configs load and extend this file during production builds.
 */
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PkgDep = Record<string, string>;

const { dependencies = {}, devDependencies = {} } = pkg as {
  dependencies?: PkgDep;
  devDependencies?: PkgDep;
};

function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep,
) {
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );

  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  );

  if (qwikPkg.length > 0) {
    throw new Error(
      `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`,
    );
  }

  if (duplicateDeps.length > 0) {
    throw new Error(
      `The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies". Move duplicated dependencies to "devDependencies" only.`,
    );
  }
}

errorOnDuplicatesPkgDeps(devDependencies, dependencies);

/**
 * Vite normally starts from index.html, but the qwikCity plugin starts at
 * src/entry.ssr.tsx instead.
 */
export default defineConfig((): UserConfig => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths({ root: "." }),
      tailwindcss(),
    ],
    optimizeDeps: {
      exclude: [],
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
