import { component$ } from "@builder.io/qwik";
import { twMerge } from "~/lib/tw-merge";

export const MobileBackToTop = component$<{ visible: boolean }>(
  ({ visible }) => {
    return (
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        onClick$={() => {
          const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "instant" : "smooth",
          });
        }}
        class={twMerge([
          "fixed right-5 z-40 inline-flex size-11",
          "items-center justify-center rounded-full",
          "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
          "border border-emerald-400/30 bg-slate-950/90",
          "text-xl text-emerald-300 shadow-lg",
          "transition-[opacity,visibility] duration-200",
          "motion-reduce:transition-none lg:hidden",
          visible
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        ])}
      >
        <span aria-hidden="true">↑</span>
      </button>
    );
  },
);
