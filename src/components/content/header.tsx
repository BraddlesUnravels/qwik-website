import { Slot, component$ } from "@builder.io/qwik";
import type { CaseStudy } from "~/content/types";
import { GithubRepoButton } from "../ui/github-repo-button";
import { CardRow } from "../ui/stat-card";
import { CaseStudyImages } from "~/components/ui/image-list";

type HeaderProps = {
  study: Pick<
    CaseStudy,
    "category" | "title" | "introduction" | "repoUrl" | "metrics" | "images"
  >;
};

export const CaseStudyHeader = component$<HeaderProps>(({ study }) => (
  <header class="mx-auto w-full max-w-6xl px-5 pt-10 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:px-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
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

    <div class="mt-10 max-w-4xl sm:mt-12">
      <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.18em] uppercase">
        {study.category}
      </p>
      <h1 class="font-display text-ink mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-balance">
        {study.title}
      </h1>
      <p class="text-ink-soft mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
        {study.introduction}
      </p>
      <Slot name="actions" />
    </div>

    <CardRow metrics={study.metrics} />
    <CaseStudyImages
      images={study.images}
      sizes="(min-width: 1152px) 1072px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
    />
  </header>
));
