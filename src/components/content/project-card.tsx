import { component$ } from "@builder.io/qwik";
import type { CaseStudySummary } from "~/content/types";

export const ProjectCard = component$<{
  study: CaseStudySummary;
  index: number;
}>(({ study, index }) => (
  <a
    href={study.path}
    class="group rounded-card bg-surface/75 shadow-card hover:border-brand/35 hover:bg-surface-raised relative flex min-h-82 flex-col overflow-hidden border border-white/10 p-6 transition duration-300 hover:-translate-y-1 sm:p-8"
  >
    <div
      aria-hidden="true"
      class="bg-brand/0 group-hover:bg-brand/15 absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl transition-colors duration-500"
    />
    <div class="relative flex items-center justify-between gap-4">
      <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.15em] uppercase">
        {study.category}
      </p>
      <span class="text-ink-muted font-mono text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <h3 class="font-display text-ink relative mt-8 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-balance">
      {study.title}
    </h3>
    <p class="text-ink-soft relative mt-5 max-w-xl text-base">
      {study.description}
    </p>
    <div class="relative mt-auto flex items-end justify-between gap-6 pt-10">
      <div class="flex flex-wrap gap-2">
        {study.evidence.map((item) => (
          <span
            key={item}
            class="text-ink-muted rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
      <span
        aria-hidden="true"
        class="text-brand-bright text-xl transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </div>
  </a>
));
