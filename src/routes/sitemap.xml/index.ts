import type { RequestHandler } from "@builder.io/qwik-city";
import { createSitemap } from "./create-sitemap";
import { projectSummaries } from "../../content/catalog";

const lastmod = new Date().toISOString();

export const onGet: RequestHandler = (ev) => {
  const siteRoutes = projectSummaries.map((p) => {
    return { path: p.path, changefreq: p.changeFreq, priority: p.priority };
  });

  const sitemap = createSitemap([
    { loc: "/", priority: 1, changefreq: "daily", lastmod }, // Manually include the root route
    ...siteRoutes.map((p) => ({
      loc: p.path,
      ...p,
      lastmod,
    })),
  ]);

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
