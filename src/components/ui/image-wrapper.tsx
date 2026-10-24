import { Slot, component$, type ClassList } from "@builder.io/qwik";

type ImageWrapperProps = {
  caption?: string;
  class?: ClassList;
  framed?: boolean;
};

const twMedia = [
  "[&>img]:block [&>img]:h-auto [&>img]:w-full",
  "[&>picture]:block",
  "[&>picture>img]:block [&>picture>img]:h-auto [&>picture>img]:w-full",
  "[&>svg]:block [&>svg]:h-auto [&>svg]:w-full",
].join(" ");

export const ImageWrapper = component$<ImageWrapperProps>(
  ({ caption, class: className, framed = true }) => (
    <figure class={["min-w-0", className]}>
      <div
        class={[
          "min-w-0",
          twMedia,
          framed &&
            "bg-canvas-soft overflow-hidden rounded-xl border border-white/10",
        ]}
      >
        <Slot />
      </div>

      {caption && (
        <figcaption class="text-ink-muted mt-3 text-sm">{caption}</figcaption>
      )}
    </figure>
  ),
);
