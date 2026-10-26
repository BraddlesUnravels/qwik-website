import { component$, useSignal } from "@builder.io/qwik";
import { TechnologyCarousel } from "~/components/ui/technology-carousel";
import { Typography } from "~/components/ui/typography";

const twHeader = [
  "relative display mx-auto flex w-full max-w-7xl flex-col px-5",
  "py-0 max-lg:min-h-[calc(100svh-4.5rem)]",
  "2xl:min-h-[calc(100svh-4.5rem)]",
].join(" ");

const twViewProjects = [
  "pointer-events-auto absolute bottom-0 left-1/2",
  "inline-flex -translate-x-1/2 items-center gap-2",
  "rounded-full border border-emerald-400/30",
  "bg-slate-950/90 px-5 py-3 text-sm font-medium text-emerald-300",
  "shadow-lg transition-colors hover:bg-emerald-950",
  "lg:bottom-5",
].join(" ");

// const twStickyAnchor = [
//   "bottom-[calc(1.25rem_+_env(safe-area-inset-bottom,0px))]",
//   // "sticky bottom-[calc(2.25rem+env(safe-area-inset-bottom,0px))]",
//   "z-40 mt-auto h-0 shrink-0 lg:static lg:contents",
// ].join(" ");

export default component$(() => {
  const cursorDone = useSignal(false);

  return (
    <header class={twHeader}>
      <div id="header-intro" class="pt-5 lg:pt-10 2xl:pt-12">
        <Typography variant="eyebrow" tone="emerald">
          Bradley Laskey · Full Stack Developer
        </Typography>
        <Typography as="h1" variant="display" class="mt-4 lg:mt-8 2xl:mt-10">
          I think in business problems.
        </Typography>
        <Typography
          as="h1"
          variant="display"
          class="mt-4 lg:mt-7"
          tone="emerald"
        >
          I build in code
          <span
            class={
              cursorDone.value
                ? "opacity-100 transition-opacity duration-300"
                : "opacity-0 transition-opacity duration-300"
            }
          >
            .
          </span>
          <span
            id="cursor"
            aria-hidden="true"
            onAnimationEnd$={() => {
              cursorDone.value = true;
            }}
            class={`${cursorDone.value ? "opacity-0 transition-opacity duration-600" : "-ml-2 inline-block lg:-ml-3"} cursor-blink top-[0.05em] -mb-1 h-[0.78em] w-[0.42em] bg-emerald-400 opacity-5`}
          />
        </Typography>
      </div>
      <Typography class="mt-8 min-h-15 max-w-6xl text-xl lg:mt-12">
        I'm a full-stack developer with five years of production experience
        across front and back-end development, APIs, databases and cloud
        infrastructure.
      </Typography>

      <Typography class="mt-8 min-h-15 max-w-6xl text-xl lg:mt-12">
        I build applications, modernise legacy platforms and connect systems
        that weren't designed to connect. Turning technical complexity into
        reliable, well documented and maintainable software.
      </Typography>

      <section class="mt-4 overflow-hidden border-y border-white/8 py-5 lg:mt-8 2xl:mt-15">
        <div class="mx-auto w-full max-w-7xl lg:px-8 2xl:py-5">
          <Typography variant="eyebrow">Technical toolkit</Typography>
          <TechnologyCarousel />
        </div>
      </section>

      <div
        class={[
          "pointer-events-none absolute inset-x-0 top-0 z-40",
          "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
          "lg:static lg:contents",
        ].join(" ")}
      >
        <div
          class={[
            "sticky h-0 w-full",
            "top-[calc(100dvh-1.25rem-env(safe-area-inset-bottom,0px))]",
            "lg:static lg:contents",
          ].join(" ")}
        >
          <a
            id="view-projects-button"
            href="#selected-projects"
            class={twViewProjects}
          >
            View projects
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </header>
  );
});
