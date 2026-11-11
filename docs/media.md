# Project media

## Screenshots and diagrams

Keep project assets under [src/media/](../src/media/). For screenshots, use a responsive image import such as `?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img`. Use smaller widths for phone screenshots. Spread the imported metadata into the [`ProjectImage`](../src/content/types.ts) entry and add alt text and a caption.

Import an SVG diagram with `?url&no-inline` and give it a width and height. Use a separate `?url&no-inline` import as `fullSrc` when the original screenshot needs to open at full size. Put images in `project.images` for the header or `section.images` to keep them next to the relevant explanation.

## Recordings

1. Put the MP4 and its poster in the project’s `clips/` directory. Review both for customer details before committing.
2. Import both files with `?url&no-inline` in [project-media.ts](../src/content/project-media.ts). Add the recording to `projectVideos` with an ID, title, device label, width, height, duration and caption.
3. Reference the entry from the project module. The header renders a single `project.videos` value. Use an array under `section.videos` for recordings in the write-up, or `section.additionalVideos` for recordings under “More recorded workflows”. Adding a clip to the `projectMedia` lookup alone leaves it out of the rendered page.
4. Check the poster, caption and video on desktop and mobile. The player accepts WebVTT caption tracks through `tracks`. That prop belongs to the player and is outside the current `ProjectMedia` type.

[AutoDash](../src/content/projects/autodash.ts) shows both placements. The desktop recording appears in the header and the mobile recording appears in a section.

## Playback

[MediaPlayer](../src/components/ui/media-player.tsx) renders native inline video with `preload="none"` and a direct MP4 link when playback fails. Standard clips show native controls.

The [autoplay controller](../src/lib/media-autoplay.ts) plays muted clips at 2× when at least 25% is visible and the tab is active. Reduced motion and an available data-saver signal can prevent autoplay. The controller pauses automatic playback when the clip leaves the viewport or the tab is hidden. The autoplay variant hides native controls, so use a standard clip when the viewer needs a play or pause button.

## Serving media

The [SSR asset plugin](../src/config/ssr-assets.ts) copies assets emitted by the server build into the client output. The [Bun entry](../src/entry.bun.ts) serves built MP4s from `dist/assets/` before handing other static files to Qwik City.

When changing video delivery, check the built URL with a normal GET, a HEAD request and a single byte-range GET. Expect 200 for GET and HEAD, 206 for a satisfiable range and 416 for a valid range outside the file. Try seeking in a browser against the Bun build as well.
