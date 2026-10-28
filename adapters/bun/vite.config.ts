import { bunServerAdapter } from "@builder.io/qwik-city/adapters/bun-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    ssr: {
      // The production image omits devDependencies, including Qwik UI's helpers.
      noExternal: true,
    },
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.bun.ts", "@qwik-city-plan"],
      },
      minify: false,
    },
    plugins: [
      // SSG is disabled until a verified canonical domain is configured.
      // Enabling SSG without a real origin embeds placeholder hostnames.
      bunServerAdapter(),
    ],
  };
});
