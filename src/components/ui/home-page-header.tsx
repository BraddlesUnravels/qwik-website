import { component$, useSignal } from "@builder.io/qwik";
import { TechnologyCarousel } from "~/components/ui/technology-carousel";
import { Typography } from "~/components/ui/typography";

export const MainPageHeadBanner = component$(() => {
  const cursorDone = useSignal(false);

  return (
    <div class="display mx-auto flex w-full max-w-7xl flex-col px-5 py-0 2xl:min-h-[calc(100svh-4.5rem)]">
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

      <a
        href="#selected-projects"
        class="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-950/90 px-5 py-3 text-sm font-medium text-emerald-300 shadow-lg transition-colors hover:bg-emerald-950"
      >
        View projects
        <span aria-hidden="true">&darr;</span>
      </a>
    </div>
  );
});
