import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Typography } from "~/components/ui/typography";
import { LuArrowUpRight } from "@qwikest/icons/lucide";
import type { CardProps } from "./feature-card";
import { twMerge } from "~/lib/tw-merge";

const twProjectCard = twMerge([
  "project-card group h-full",
  "flex min-w-0 flex-col rounded-xl p-5",
  "transition duration-200 ease-out",
  "motion-safe:hover:-translate-y-1 hover:shadow-xl",
  "focus-visible:outline-brand-bright",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "motion-reduce:transition-none",
]);

export default component$<CardProps>(({ project, index }) => (
  <Link id="project-card" href={project.path} class={twProjectCard}>
    <div class="mb-2 flex items-start justify-between gap-4">
      <Typography
        tone="emerald"
        variant="x-small"
        class="font-mono font-semibold tracking-wider uppercase [word-spacing:-0.12em]"
      >
        {project.category}
      </Typography>

      <Typography
        tone="emerald"
        variant="x-small"
        class="font-mono font-semibold tracking-wider uppercase [word-spacing:-0.12em]"
      >
        {String(index + 1).padStart(2, "0")}
      </Typography>
    </div>

    <Typography
      as="h3"
      class="font-display text-ink mt-3 text-xl leading-snug font-semibold tracking-[-0.035em] text-balance"
    >
      {project.title}
    </Typography>

    <Typography as="p" class="text-ink-soft mt-3 text-sm leading-relaxed">
      {project.description}
    </Typography>

    <div class="mt-auto pt-5">
      <ul class="text-ink-muted m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-xs">
        {project.evidence.map((item, i) => (
          <li key={item} class="flex items-center gap-3">
            {i !== 0 && (
              <span
                aria-hidden="true"
                class="text-ink self-center text-lg leading-none font-bold"
              >
                ·
              </span>
            )}
            <Typography as="span" class="text-ink self-center text-sm">
              {item}
            </Typography>
          </li>
        ))}
      </ul>

      <div class="text-brand-bright mt-5 flex items-center justify-between gap-4">
        <Typography variant="body" class="font-medium">
          View project
        </Typography>

        <Typography
          aria-hidden="true"
          variant="body"
          class="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        >
          <LuArrowUpRight class="h-[1em] w-[1em]" />
        </Typography>
      </div>
    </div>
  </Link>
));
