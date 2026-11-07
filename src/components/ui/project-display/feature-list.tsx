import { component$ } from "@builder.io/qwik";
import FeaturedCard from "./feature-card";
import { Typography } from "~/components/ui/typography";
import { projectSummaries } from "~/content/catalog";

const features = projectSummaries.filter((p) => p.featured);

export default component$(() => (
  <section id="featured-projects">
    <div class="flex scroll-mt-24 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Typography tone="emerald" variant="eyebrow">
          Selected projects
        </Typography>
        <Typography variant="heading-2" class="mt-5">
          Making the complicated work.
        </Typography>
      </div>
      <Typography variant="small" class="max-w-md sm:text-right">
        What I built, why I built it that way, and how it worked in practice.
      </Typography>
    </div>
    <div class="mt-3 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
      {features.map((project, index) => (
        <FeaturedCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  </section>
));
