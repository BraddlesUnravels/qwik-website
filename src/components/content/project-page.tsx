import { Slot, component$ } from "@builder.io/qwik";
import type { Project } from "~/content/types";
import { ProjectHeader } from "./header";
import { ProjectReflection } from "./reflection";
import { ProjectRelatedLinks } from "./related-links";
import { ProjectSection } from "./section";
import { ProjectTechnologies } from "./technologies";

export const ProjectPage = component$<{ project: Project }>(({ project }) => (
  <main class="relative isolate overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-150 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent_42%),radial-gradient(circle_at_85%_20%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_36%)]"
    />
    <article>
      <ProjectHeader project={project}>
        <div q:slot="actions" class="contents">
          <Slot name="actions" />
        </div>
      </ProjectHeader>

      <div class="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:px-10 lg:pb-32">
        <div class="max-w-3xl min-w-0">
          {project.sections.map((section, index) => (
            <ProjectSection
              key={section.title}
              section={section}
              index={index}
            />
          ))}
          <ProjectReflection lesson={project.lesson} />
        </div>
        <ProjectTechnologies technologies={project.technologies} />
      </div>

      <ProjectRelatedLinks links={project.related} />
    </article>
  </main>
));
