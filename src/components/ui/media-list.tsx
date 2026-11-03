import { component$ } from "@builder.io/qwik";
import type { ProjectMedia } from "~/content/types";
import { MediaPlayer } from "./media-player";

export const ProjectVideos = component$<{
  videos?: ProjectMedia[];
  autoPlay?: boolean;
}>(({ videos = [], autoPlay = false }) => (
  <div class="mt-8 grid min-w-0 gap-8 empty:hidden">
    {videos.map((video) => (
      <div key={video.id} class="min-w-0">
        <h3 class="text-ink mb-3 font-semibold">
          {video.title}{" "}
          <span class="text-ink-muted text-sm font-normal">
            ({video.label})
          </span>
        </h3>
        <MediaPlayer {...video} autoPlay={autoPlay} />
      </div>
    ))}
  </div>
));
