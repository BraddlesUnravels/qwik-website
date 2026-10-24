import { Slot, component$ } from "@builder.io/qwik";
import type { CaseStudy } from "~/content/types";
import { CaseStudyHeader } from "./header";
import { CaseStudyReflection } from "./reflection";
import { CaseStudyRelatedLinks } from "./related-links";
import { CaseStudySection } from "./section";
import { CaseStudyTechnologies } from "./technologies";

export const CaseStudyPage = component$<{ study: CaseStudy }>(({ study }) => (
  <main class="relative isolate overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-150 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent_42%),radial-gradient(circle_at_85%_20%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_36%)]"
    />
    <article>
      <CaseStudyHeader study={study}>
        <div q:slot="actions" class="contents">
          <Slot name="actions" />
        </div>
      </CaseStudyHeader>

      <div class="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:px-10 lg:pb-32">
        <div class="max-w-3xl min-w-0">
          {study.sections.map((section, index) => (
            <CaseStudySection
              key={section.title}
              section={section}
              index={index}
            />
          ))}
          <CaseStudyReflection lesson={study.lesson} />
        </div>
        <CaseStudyTechnologies technologies={study.technologies} />
      </div>

      <CaseStudyRelatedLinks links={study.related} />
    </article>
  </main>
));
