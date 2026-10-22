import { component$ } from "@builder.io/qwik";
import { Typography } from "~/components/ui/typography";
import type { CaseStudySummary } from "~/content/types";

type ProjectCardProps = {
  study: CaseStudySummary;
  index: number;
};

const twFeaturedAnchor = [
  "group bg-surface-raised border-brand/25",
  "hover:border-brand/60 focus-visible:outline-brand-bright",
  "relative flex min-h-[340px] min-w-0 flex-col rounded-[20px]",
  "border p-6 sm:p-8",
  "transition duration-200 ease-out",
  "motion-safe:hover:-translate-y-1 hover:shadow-xl",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "motion-reduce:transition-none",
].join(" ");

export const FeaturedProjectCard = component$<ProjectCardProps>(
  ({ study, index }) => (
    <a href={study.path} class={twFeaturedAnchor}>
      <div class="flex items-start justify-between gap-4">
        <Typography
          as="p"
          class="text-brand-bright font-mono text-xs leading-relaxed font-semibold tracking-[0.12em] uppercase"
        >
          {study.category}
        </Typography>

        <Typography
          as="span"
          aria-hidden="true"
          class="text-ink-muted shrink-0 font-mono text-xs"
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </div>

      <Typography as="h3" variant="heading-3" class="mt-6">
        {study.title}
      </Typography>

      <Typography
        as="p"
        class="text-ink-soft mt-4 max-w-xl text-base leading-relaxed"
      >
        {study.description}
      </Typography>

      <div class="mt-auto pt-8">
        <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
          {study.evidence.map((item) => (
            <li
              key={item}
              class="text-ink-soft rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
            >
              {item}
            </li>
          ))}
        </ul>

        <div class="text-brand-bright mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <Typography as="span" class="text-sm font-medium">
            View case study
          </Typography>

          <span aria-hidden="true" class="text-lg">
            ↗
          </span>
        </div>
      </div>
    </a>
  ),
);

const twSupportingAnchor = [
  "group bg-surface/50 hover:border-brand/35",
  "hover:bg-surface-raised focus-visible:outline-brand-bright",
  "flex min-w-0 flex-col rounded-xl border border-white/10 p-5",
  "transition duration-200 ease-out",
  "motion-safe:hover:-translate-y-1 hover:shadow-xl",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "motion-reduce:transition-none",
].join(" ");

export const SupportingProjectCard = component$<ProjectCardProps>(
  ({ study, index }) => (
    <a href={study.path} class={twSupportingAnchor}>
      <div class="flex items-start justify-between gap-4">
        <Typography
          as="p"
          class="text-brand-bright font-mono text-[11px] leading-relaxed font-semibold tracking-[0.12em] uppercase"
        >
          {study.category}
        </Typography>

        <Typography
          as="span"
          aria-hidden="true"
          class="text-ink-muted shrink-0 font-mono text-xs"
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </div>

      <h3 class="font-display text-ink mt-3 text-xl leading-snug font-semibold tracking-[-0.035em] text-balance">
        {study.title}
      </h3>

      <Typography as="p" class="text-ink-soft mt-3 text-sm leading-relaxed">
        {study.description}
      </Typography>

      <div class="mt-auto pt-5">
        <ul class="text-ink-muted m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-xs">
          {study.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div class="text-brand-bright mt-5 flex items-center justify-between gap-4 text-xs font-medium">
          <Typography as="span">View case study</Typography>
          <span
            aria-hidden="true"
            class="text-lg motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
          >
            ↗
          </span>
        </div>
      </div>
    </a>
  ),
);
