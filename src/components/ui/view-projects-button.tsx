import {
  $,
  component$,
  useOnDocument,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import { MobileBackToTop } from "./back-to-top-button";
import { twMerge } from "~/lib/tw-merge";

export const ViewProjectsButton = component$(() => {
  const projectsBelowViewport = useSignal<boolean>();
  const framePending = useSignal(false);

  const updateVisibility = $(() => {
    if (framePending.value) return;

    framePending.value = true;
    requestAnimationFrame(() => {
      framePending.value = false;

      const projectsHeading = document.querySelector("#selected-projects h2");
      if (!projectsHeading) return;

      projectsBelowViewport.value =
        projectsHeading.getBoundingClientRect().top >= window.innerHeight;
    });
  });

  useOnDocument("qinit", updateVisibility);
  useOnWindow(["scroll", "resize", "pageshow"], updateVisibility);

  const visible = projectsBelowViewport.value === true;

  return (
    <>
      <a
        id="view-projects-button"
        href="#selected-projects"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        inert={!visible}
        class={twMerge([
          "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 z-40",
          "inline-flex min-h-11 -translate-x-1/2 items-center gap-2",
          "rounded-full border border-emerald-400/30 bg-slate-950/90",
          "px-5 py-3 text-sm font-medium text-emerald-300 shadow-lg",
          "transition-[opacity,visibility,background-color] duration-200 hover:bg-emerald-950",
          "focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none",
          visible
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        ])}
      >
        View projects
        <span aria-hidden="true">&darr;</span>
      </a>
      <MobileBackToTop visible={projectsBelowViewport.value === false} />
    </>
  );
});
