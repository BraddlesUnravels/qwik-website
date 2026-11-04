import { component$ } from "@builder.io/qwik";
import ProjectCard from "./project-card";
import FeatureList from "./feature-list";
import { Typography } from "../typography";
import { projectSummaries } from "~/content/catalog";

const projects = projectSummaries.filter((p) => !p.featured);

export default component$(() => {
  return (
    <section
      id="selected-projects"
      class="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8 lg:px-10 lg:py-20"
    >
      <FeatureList />

      <div class="mt-10">
        <Typography variant="body-large" class="mt-2">
          Further projects
        </Typography>
        <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});
