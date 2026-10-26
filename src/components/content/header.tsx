import { Slot, component$ } from "@builder.io/qwik";
import type { Project } from "~/content/types";
import { GithubRepoButton } from "../ui/github-repo-button";
import { CardRow } from "../ui/stat-card";
import { ProjectImages } from "~/components/ui/image-list";
import { Typography } from "../ui/typography";

type HeaderProps = {
  project: Pick<
    Project,
    "category" | "title" | "introduction" | "repoUrl" | "metrics" | "images"
  >;
};

export const ProjectHeader = component$<HeaderProps>(({ project }) => (
  <header class="mx-auto w-full max-w-6xl px-5 pt-10 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:px-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <a
        href="/#selected-projects"
        class="group text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm font-semibold transition-colors"
      >
        <span
          aria-hidden="true"
          class="transition-transform group-hover:-translate-x-1"
        >
          ←
        </span>
        Selected work
      </a>
      <GithubRepoButton url={project.repoUrl} />
    </div>

    <div class="mt-10 max-w-4xl sm:mt-12">
      <Typography variant="eyebrow" tone="emerald">
        {project.category}
      </Typography>
      <h1 class="font-display text-ink mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-balance">
        {project.title}
      </h1>
      <p class="text-ink-soft mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
        {project.introduction}
      </p>
      <Slot name="actions" />
    </div>

    <CardRow metrics={project.metrics} />
    <ProjectImages
      images={project.images}
      sizes="(min-width: 1152px) 1072px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
    />
  </header>
));
