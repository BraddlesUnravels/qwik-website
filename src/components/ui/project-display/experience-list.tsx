import { component$ } from "@builder.io/qwik";
import { Typography } from "~/components/ui/typography";
import ProjectCard from "./project-card";
import { projectSummaries } from "~/content/catalog";

const projects = projectSummaries.filter((p) => !p.featured);

export default component$(() => {
  return (
    <section id="projects" class="py-10 lg:py-20">
      <div>
        <Typography variant="body-large">Supporting Projects</Typography>
      </div>
      <div class="xxl:grid-cols-3 mt-3 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
});
