---
applyTo: "**/*.{ts,tsx}"
---

# TypeScript and Qwik

- Follow the nearby Qwik pattern for `component$`, event handlers, and resumable boundaries. Keep values captured by serialized code serializable; keep server-only logic and configuration out of client code.
- Reuse existing public exports and helpers. In particular, use the existing content types and the Tailwind merge helper instead of creating parallel shapes or class-merging logic.
- Keep project content typed as `Project` and conform to the media metadata types. See [content](../../docs/content.md) and [media](../../docs/media.md) before changing either.
- Run `bun run build.types` after TypeScript changes; use the relevant test command from [the testing guide](../../docs/testing.md).
