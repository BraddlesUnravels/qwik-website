import { $, component$, useOnWindow, useSignal } from "@builder.io/qwik";

export const MobileBackToTop = component$(() => {
  const visible = useSignal(false);
  const framePending = useSignal(false);

  const updateVisibility = $(() => {
    if (framePending.value || window.matchMedia("(min-width: 64rem)").matches) {
      return;
    }

    framePending.value = true;

    requestAnimationFrame(() => {
      framePending.value = false;

      const projects = document.getElementById("selected-projects");
      const downButton = document.getElementById("view-projects-button");

      if (!projects || !downButton) return;

      const heading = projects.querySelector("h2");
      const bounds = (heading ?? projects).getBoundingClientRect();

      // The heading has fully entered the viewport, or passed above it.
      const projectsReached =
        (heading ? bounds.bottom : bounds.top) <= window.innerHeight;

      const downButtonGone = downButton.getBoundingClientRect().bottom <= 0;

      const next = projectsReached && downButtonGone;

      if (visible.value !== next) {
        visible.value = next;
      }
    });
  });

  useOnWindow("scroll", updateVisibility);
  useOnWindow("resize", updateVisibility);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible.value}
      tabIndex={visible.value ? 0 : -1}
      onClick$={() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? "instant" : "smooth",
        });
      }}
      class={[
        "fixed right-5 z-40 inline-flex size-11",
        "items-center justify-center rounded-full",
        "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
        "border border-emerald-400/30 bg-slate-950/90",
        "text-xl text-emerald-300 shadow-lg",
        "transition-opacity duration-200",
        "motion-reduce:transition-none lg:hidden",
        visible.value
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
      ].join(" ")}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
});
