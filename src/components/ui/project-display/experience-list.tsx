import { component$ } from "@builder.io/qwik";
import { Typography } from "~/components/ui/typography";
import ProjectCard from "./project-card";
import type { CardProps } from "./feature-card";

export default component$<CardProps[]>((data: CardProps[]) => {
  return (
    <section
      id="projects"
      class="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-20"
    >
      <Typography variant="heading-3">Supporting Projects</Typography>
      {data.map(({ project, index }) => (
        <ProjectCard key={project.path} project={project} index={index} />
      ))}
    </section>
  );
});
