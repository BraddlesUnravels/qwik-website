import type { RequestHandler } from "@builder.io/qwik-city";
import { createSitemap } from "./create-sitemap";
import { projectSummaries } from "../../content/catalog";

export const onGet: RequestHandler = (ev) => {
  const siteRoutes = projectSummaries.map((p) => p.path);

  const sitemap = createSitemap([
    { loc: "/", priority: 1 }, // Manually include the root route
    ...siteRoutes.map((path) => ({
      loc: path,
      priority: 0.9, // Default priority, adjust as needed
    })),
  ]);

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
