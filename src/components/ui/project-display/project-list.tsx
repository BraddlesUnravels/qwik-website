import { component$ } from "@builder.io/qwik";
import ProjectCard from "./project-card";
import { projectSummaries } from "~/content/catalog";
import { Typography } from "../typography";

export default component$(() => {
  return (
    <section
      id="selected-projects"
      class="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8 lg:px-10 lg:py-20"
    >
      <Typography variant="eyebrow">Selected work</Typography>
      <Typography as="h2" variant="heading-2" class="mt-5">
        Projects and recorded workflows.
      </Typography>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        {projectSummaries.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
});
