import { $, component$, useSignal } from "@builder.io/qwik";
import type { ProjectImage } from "~/content/types";
import { ImageViewer } from "./app-modal/image-viewer";

type ImageWrapperProps = {
  image: ProjectImage;
  sizes?: string;
};

export const ImageWrapper = component$<ImageWrapperProps>(
  ({ image, sizes = "(min-width: 1152px) 768px, 100vw" }) => {
    const show = useSignal(false);
    const fullSrc = image.fullSrc ?? image.src;

    const openImage = $(() => {
      show.value = true;
    });

    return (
      <figure class="min-w-0">
        <div class="flex justify-center">
          <a
            href={fullSrc}
            aria-haspopup="dialog"
            aria-label={`Enlarge image: ${image.alt}`}
            preventdefault:click
            onClick$={openImage}
            style={{
              width: `min(100%, ${(image.w / image.h) * 32}rem)`,
            }}
            class="block max-w-full rounded-xl"
          >
            <img
              src={image.src}
              srcset={image.srcset}
              width={image.w}
              height={image.h}
              alt={image.alt}
              sizes={sizes}
              loading="lazy"
              decoding="async"
              data-tone={image.tone}
              style={{
                aspectRatio: `${image.w} / ${image.h}`,
              }}
              class="project-image bg-canvas-soft block h-auto w-full max-w-full rounded-xl border border-white/10"
            />
          </a>
        </div>

        <ImageViewer show={show} image={image} />

        <figcaption class="text-ink-muted mt-3 max-w-prose text-sm leading-tight">
          {image.caption}{" "}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`Enlarge image: ${image.alt}`}
            onClick$={openImage}
            class="text-ink-soft min-h-11 cursor-pointer whitespace-nowrap underline decoration-white/25 underline-offset-4 hover:decoration-current"
          >
            View full size
          </button>
        </figcaption>
      </figure>
    );
  },
);

/*
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
          data-tone={image.tone}
          style={{
            aspectRatio: `${image.w} / ${image.h}`,
            width: `min(100%, ${(image.w / image.h) * 32}rem)`,
          }}
          class="project-image bg-canvas-soft block h-auto max-w-full rounded-xl border border-white/10"
        />
      </div>

      <figcaption class="text-ink-muted mt-3 max-w-prose text-sm leading-tight">
        {image.caption}{" "}
        <a
          href={image.src}
          target="_blank"
          rel="noreferrer"
          class="text-ink-soft whitespace-nowrap underline decoration-white/25 underline-offset-4 hover:decoration-current"
          aria-label={`View full-size image: ${image.alt} (opens in a new tab)`}
        >
          View full size <span>↗</span>
        </a>
      </figcaption>
    </figure>
  ),
);
*/
