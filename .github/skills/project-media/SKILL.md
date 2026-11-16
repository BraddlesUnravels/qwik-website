---
name: project-media
description: Add or update portfolio screenshots, diagrams, video recordings, posters, captions, or media delivery.
---

# Project media

Use for changes to project images, diagrams, or recordings. First read [docs/media.md](../../../docs/media.md); it is the source of truth for imports and component placement.

- Keep assets in the matching `src/media/<project>/` directory. Review screenshots, video, and posters for customer or personal data before adding them.
- Follow the existing responsive image-import pattern and `ProjectImage` metadata. Import SVGs with `?url&no-inline`; use an original image URL only when the full-size viewer needs it.
- For video, add both MP4 and poster, register the import and metadata in `src/content/project-media.ts`, then reference the entry in the project module. A lookup entry alone does not render a clip.
- Header `project.videos` renders one video; put multiple clips in `section.videos` or `section.additionalVideos`.
- Check placement, captions, alt text, and desktop/mobile rendering. For delivery changes, test the built Bun server with GET, HEAD, and a satisfiable byte range; expect 200, 200, and 206 respectively.

Run the relevant Vitest/Playwright checks from [docs/testing.md](../../../docs/testing.md). Do not alter unrelated generated files under `dist/` or `server/`.
