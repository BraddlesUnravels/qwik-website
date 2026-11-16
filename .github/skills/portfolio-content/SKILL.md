---
name: portfolio-content
description: Add or update portfolio cards, project stories, project routes, or engineering-approach content in this Qwik site.
---

# Portfolio content

Use for changes to project summaries, project stories, route metadata, or related project links.

1. Read [docs/content.md](../../../docs/content.md). It is the canonical workflow and explains fields and route conventions.
2. Keep the catalog entry in `src/content/catalog.ts` and the matching `src/content/projects/<slug>.ts` module aligned. The project module must default-export a `Project`; the loader expects both entries.
3. Check content precedence before editing: catalog values override same-named project-module values.
4. Preserve catalog ordering: `about-approach` must remain last because the supporting-project list currently omits the final non-featured entry.
5. Change the typed project module for rendered content; `public/markdown/` is an earlier copy, not the source for the Qwik page.
6. Validate the home card, direct `/projects/<slug>` route, related links, and sitemap inclusion when relevant. Run the focused tests, then `bun run build.types` if types changed.

Don't invent missing project facts or metrics. Keep short card evidence concise and explain detailed outcomes in the case study.
