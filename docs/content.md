# Portfolio content

I keep the card short and use the case study to explain what I worked on, what changed and how I checked the result.

## Add or update a project

1. Add or edit the summary in [catalog.ts](../src/content/catalog.ts). Set the slug, path, category, title, description, featured flag and short evidence lines. The sitemap handler also reads `priority` and `changeFreq` from the catalog.
2. Add or edit `src/content/projects/<slug>.ts` and default-export a [`Project`](../src/content/types.ts). The filename must match the slug. The [loader](../src/content/loader.ts) requires both a catalog entry and a project module. The catalog takes precedence when both supply the same field.
3. Write the introduction, metrics, sections and technologies. Add related links where they help the reader follow the work. `lesson` and `repoUrl` are optional. See [Project media](media.md) for screenshots and recordings.
4. Check the card, direct project URL and related links. Use `/projects/<slug>` for project links and `/#selected-projects` to jump back to the home-page list.

Keep the `about-approach` entry last in the catalog. The [supporting-project list](../src/components/ui/project-display/experience-list.tsx) currently drops the last non-featured entry by position so the approach page can appear in the sitemap without getting a supporting-project card.

## Engineering approach

Edit [about-approach.ts](../src/content/projects/about-approach.ts) for the case study and the `engineeringApproach` export in [catalog.ts](../src/content/catalog.ts) for the route’s page metadata. The short introduction on the home page lives in the [home route](../src/routes/index.tsx).

## Public files

[public/markdown/](../public/markdown/) holds earlier copies of the case studies. Bun can serve these files directly under `/markdown/`. Update the TypeScript project module when changing the rendered project page.

The résumé, icons, manifest and robots file are also under `public/`. If the résumé filename changes, update [site.ts](../src/config/site.ts) and [site-link-sets.ts](../src/lib/site-link-sets.ts), then check the download from both navigation menus.
