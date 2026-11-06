import { component$ } from "@builder.io/qwik";
import FeaturedCard from "./feature-card";
import { Typography } from "~/components/ui/typography";
import type { CardProps } from "./feature-card";

export default component$<CardProps[]>((data: CardProps[]) => {
  if (!data || !data.length) return;
  return (
    <section
      id="featured-projects"
      class="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-20"
    >
      <div
        id="selected-projects"
        class="flex scroll-mt-24 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <Typography variant="eyebrow">Selected work</Typography>
          <Typography as="h2" variant="heading-2" class="mt-5">
            Complex systems, clearly evidenced.
          </Typography>
        </div>
        <Typography variant="small" class="max-w-md sm:text-right">
          Production outcomes, architectural decisions, trade-offs and the
          evidence behind them.
        </Typography>
      </div>
      <div class="mt-3 grid items-start gap-6 md:grid-cols-2">
        {data.map(({ project, index }) => (
          <FeaturedCard key={project.path} project={project} index={index} />
        ))}
      </div>
    </section>
  );
});
