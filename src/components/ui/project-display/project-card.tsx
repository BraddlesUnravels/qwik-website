import { component$ } from "@builder.io/qwik";
import { Typography } from "~/components/ui/typography";
import type { CardProps } from "./feature-card";

const twSupportingAnchor = [
  "group bg-surface/50 hover:border-brand/35",
  "hover:bg-surface-raised focus-visible:outline-brand-bright",
  "flex min-w-0 flex-col rounded-xl border border-white/10 p-5",
  "transition duration-200 ease-out",
  "motion-safe:hover:-translate-y-1 hover:shadow-xl",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "motion-reduce:transition-none",
].join(" ");

export default component$<CardProps>(({ project, index }) => (
  <a href={project.path} class={twSupportingAnchor}>
    <div class="flex items-start justify-between gap-4">
      <Typography
        as="p"
        class="text-brand-bright font-mono text-[11px] leading-relaxed font-semibold tracking-[0.12em] uppercase"
      >
        {project.category}
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
      {project.title}
    </h3>

    <Typography as="p" class="text-ink-soft mt-3 text-sm leading-relaxed">
      {project.description}
    </Typography>

    <div class="mt-auto pt-5">
      <ul class="text-ink-muted m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-xs">
        {project.evidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div class="text-brand-bright mt-5 flex items-center justify-between gap-4 text-xs font-medium">
        <Typography as="span">View case project</Typography>
        <span
          aria-hidden="true"
          class="text-lg motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        >
          ↗
        </span>
      </div>
    </div>
  </a>
));
