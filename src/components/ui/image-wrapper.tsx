import { component$ } from "@builder.io/qwik";
import { Typography } from "./typography";
import type { CaseStudyImage } from "~/content/types";

type ImageWrapperProps = {
  image: CaseStudyImage;
  sizes?: string;
};

export const ImageWrapper = component$<ImageWrapperProps>(
  ({ image, sizes = "(min-width: 1152px) 768px, 100vw" }) => (
    <figure class="min-w-0">
      <div class="flex justify-center">
        <img
          src={image.src}
          srcset={image.srcset}
          width={image.w}
          height={image.h}
          alt={image.alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          // Reserve the final size before loading, with one 32rem height limit.
          style={{
            aspectRatio: `${image.w} / ${image.h}`,
            width: `min(100%, ${(image.w / image.h) * 32}rem)`,
          }}
          class="bg-canvas-soft block h-auto max-w-full rounded-xl border border-white/10"
        />
      </div>
      <figcaption class="text-ink-muted mt-3 max-w-prose text-[0.875rem] leading-relaxed">
        <Typography variant="small">{image.caption}</Typography>{" "}
        <a
          href={image.src}
          target="_blank"
          rel="noreferrer"
          class="text-ink-soft whitespace-nowrap underline decoration-white/25 underline-offset-4 hover:decoration-current"
          aria-label={`View full-size image: ${image.alt} (opens in a new tab)`}
        >
          <Typography variant="small">View full size</Typography>
          <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  ),
);
