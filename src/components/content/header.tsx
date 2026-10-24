import { Slot, component$ } from "@builder.io/qwik";
import type { CaseStudy } from "~/content/types";
import { GithubRepoButton } from "../ui/github-repo-button";
import { CardRow } from "../ui/stat-card";
import { Typography } from "../ui/typography";

type HeaderProps = {
  study: Pick<
    CaseStudy,
    "category" | "title" | "introduction" | "repoUrl" | "metrics"
  >;
};

export const CaseStudyHeader = component$<HeaderProps>(({ study }) => (
  <header class="mx-auto w-full max-w-7xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24 lg:px-10">
    <div class="flex justify-between">
      <a
        href="/#selected-work"
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

      <GithubRepoButton url={study.repoUrl} />
    </div>

    <div class="mt-12 max-w-5xl">
      <Typography
        as="p"
        class="text-brand-bright font-mono text-xs font-semibold tracking-[0.18em] uppercase"
      >
        {study.category}
      </Typography>

      <Typography
        as="h1"
        class="font-display text-ink mt-6 max-w-5xl text-6xl font-semibold tracking-[-0.055em] text-balance"
      >
        {study.title}
      </Typography>

      <Typography as="p" class="text-ink-soft mt-8 max-w-3xl text-xl">
        {study.introduction}
      </Typography>

      <Slot name="actions" />
    </div>

    <Slot name="hero" />
    <CardRow metrics={study.metrics} />
  </header>
));
