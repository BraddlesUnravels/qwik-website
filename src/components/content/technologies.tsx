import { component$ } from "@builder.io/qwik";
import { Typography } from "../ui/typography";
import type { ProjectMetric } from "~/content/types";

export const ProjectTechnologies = component$<{
  technologies: ProjectMetric[];
}>(({ technologies }) => (
  <aside class="lg:sticky lg:top-28 lg:h-fit">
    <div class="shadow-card emerald-border background-color: rgb(7 10 16 / 0.5) rounded-xl p-6">
      <Typography as="h2" class="font-display text-ink text-lg font-semibold">
        Technology and methods
      </Typography>

      <dl class="mt-6 grid gap-5">
        {technologies.map((technology) => (
          <div key={technology.label}>
            <dt class="text-ink-muted text-xs font-semibold tracking-[0.12em] uppercase">
              {technology.label}
            </dt>
            <dd class="text-ink-soft mt-1 text-sm">{technology.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </aside>
));
