import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Typography } from "~/components/ui/typography";
import { LuArrowUpRight } from "@qwikest/icons/lucide";
import type { ProjectSummary } from "~/content/types";
import { twMerge } from "~/lib/tw-merge";

export type CardProps = {
  project: ProjectSummary;
  index: number;
};

const ListChip = ({ key, item }: { key?: string; item?: string }) => (
  <li
    key={key}
    class="text-ink-soft rounded-full border border-white/10 bg-emerald-400/10 px-3 py-1 text-xs"
  >
    {item}
  </li>
);

const twFeaturedLink = twMerge([
  "feature-card group h-full",
  "relative flex min-h-[340px] min-w-0 flex-col rounded-[20px]",
  "p-5 lg:p-7 transition duration-200 ease-out",
  "motion-safe:hover:-translate-y-1 hover:shadow-xl",
  "focus-visible:outline-brand-bright",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "motion-reduce:transition-none",
]);

export default component$<CardProps>(({ project, index }) => (
  <Link href={project.path} class={twFeaturedLink}>
    <div class="flex items-start justify-between gap-4">
      <Typography tone="emerald" variant="eyebrow" class="tracking-wide">
        {project?.category}
      </Typography>

      <Typography
        aria-hidden="true"
        tone="emerald"
        variant="eyebrow"
        class="tracking-wide"
      >
        {String(index + 1).padStart(2, "0")}
      </Typography>
    </div>

    <Typography as="h3" variant="heading-3" class="mt-6">
      {project.title}
    </Typography>

    <Typography
      as="p"
      class="text-ink-soft mt-4 max-w-xl text-base leading-relaxed"
    >
      {project.description}
    </Typography>

    <div class="mt-auto pt-8">
      <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
        {project.evidence.map((item) => (
          <ListChip key={item} item={item} />
        ))}
      </ul>

      <div class="mt-6 flex items-center justify-between gap-4 border-t border-t-cyan-400/30 pt-5">
        <Typography variant="body" class="font-medium">
          View project
        </Typography>

        <Typography
          aria-hidden="true"
          variant="body"
          class="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        >
          <LuArrowUpRight class="h-[1.25em] w-[1.25em]" />
        </Typography>
      </div>
    </div>
  </Link>
));
