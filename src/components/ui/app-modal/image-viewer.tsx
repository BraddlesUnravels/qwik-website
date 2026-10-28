import { component$, useSignal, useTask$, type Signal } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import type { ProjectImage } from "~/content/types";
import AppModal, { modalButtonClass } from "./modal";

type ImageViewerProps = {
  show: Signal<boolean>;
  image: ProjectImage;
};

type ImageStatus = "loading" | "ready" | "error";

export const ImageViewer = component$<ImageViewerProps>(({ show, image }) => {
  const actualSize = useSignal(false);
  const status = useSignal<ImageStatus>("loading");
  const naturalWidth = useSignal(0);
  const attempt = useSignal(0);

  useTask$(({ track }) => {
    const isOpen = track(() => show.value);

    if (!isOpen) {
      actualSize.value = false;
      status.value = "loading";
      naturalWidth.value = 0;
    }
  });

  return (
    <AppModal show={show} variant="image">
      <header
        class={[
          "flex min-w-0 flex-wrap items-center justify-between gap-3",
          "border-b border-zinc-800 bg-zinc-950 pb-3",
          "pt-[max(0.75rem,env(safe-area-inset-top,0px))]",
          "pl-[max(1rem,env(safe-area-inset-left,0px))]",
          "pr-[max(1rem,env(safe-area-inset-right,0px))]",
        ]}
      >
        <Modal.Title class="min-w-0 text-base font-semibold">
          Image preview
        </Modal.Title>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class={modalButtonClass}
            disabled={status.value !== "ready"}
            aria-pressed={actualSize.value}
            onClick$={() => {
              actualSize.value = !actualSize.value;
            }}
          >
            {actualSize.value ? "Fit" : "Actual size"}
          </button>

          <Modal.Close
            type="button"
            class={modalButtonClass}
            aria-label="Close image preview"
            autofocus
          >
            Close
          </Modal.Close>
        </div>
      </header>

      <div
        class={[
          "relative min-h-0 min-w-0 overflow-auto",
          "overscroll-contain bg-zinc-950",
        ]}
        role="region"
        aria-label="Image area. At actual size, scroll to explore the image."
        tabIndex={0}
      >
        {status.value === "loading" && (
          <p
            role="status"
            class={[
              "absolute top-4 left-4 rounded-lg",
              "bg-zinc-900 px-3 py-2 text-sm text-zinc-300",
            ]}
          >
            Loading image…
          </p>
        )}

        {status.value === "error" && (
          <div class="grid min-h-full content-center justify-items-center gap-4 p-6 text-center">
            <p role="alert">This image could not be loaded.</p>

            <button
              type="button"
              class={modalButtonClass}
              onClick$={() => {
                status.value = "loading";
                attempt.value += 1;
              }}
            >
              Try again
            </button>
          </div>
        )}

        {show.value && status.value !== "error" && (
          <img
            key={attempt.value}
            src={image.fullSrc ?? image.src}
            width={image.w}
            height={image.h}
            alt={image.alt}
            decoding="async"
            draggable={false}
            class={
              actualSize.value
                ? "block h-auto max-w-none"
                : "block h-full w-full max-w-none object-contain object-center"
            }
            style={
              actualSize.value
                ? { width: `${naturalWidth.value}px` }
                : undefined
            }
            onLoad$={(_, element) => {
              naturalWidth.value = element.naturalWidth || image.w;
              status.value = "ready";
            }}
            onError$={() => {
              status.value = "error";
            }}
          />
        )}
      </div>

      <footer
        class={[
          "max-h-[20dvh] min-h-0 overflow-auto overscroll-contain",
          "border-t border-zinc-800 bg-zinc-950 pt-3",
          "pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
          "pl-[max(1rem,env(safe-area-inset-left,0px))]",
          "pr-[max(1rem,env(safe-area-inset-right,0px))]",
        ]}
      >
        <Modal.Description class="text-sm leading-relaxed text-zinc-300">
          {image.caption}
        </Modal.Description>
      </footer>
    </AppModal>
  );
});
