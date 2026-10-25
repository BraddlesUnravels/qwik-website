import { component$ } from "@builder.io/qwik";
import {
  FeaturedProjectCard,
  SupportingProjectCard,
} from "~/components/content/project-card";
import { MainPageHeadBanner } from "~/components/ui/home-page-header";
import { Typography } from "~/components/ui/typography";
import { caseStudySummaries } from "~/content/catalog";
import { createSeoHead } from "~/lib/seo";

const featuredStudies = caseStudySummaries
  .filter(({ featured }) => featured)
  .map((study, index) => ({ study, index }));

const supportingStudies = caseStudySummaries
  .filter(({ featured }) => !featured)
  .map((study, index) => ({ study, index }));

export default component$(() => {
  return (
    <main id="main-page-content">
      <section class="relative isolate overflow-hidden">
        <MainPageHeadBanner />
      </section>

      <section>
        <div class="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
          <div
            id="selected-projects"
            class="flex scroll-mt-24 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <Typography variant="eyebrow">Selected work</Typography>
              <Typography as="h2" variant="heading-2" class="mt-5">
                Complex systems, clearly evidenced.
              </Typography>
            </div>
            <Typography variant="small" class="max-w-md sm:text-right">
              Production outcomes, architectural decisions, trade-offs and the
              evidence behind them.
            </Typography>
          </div>
          <div class="mt-3 grid items-start gap-6 md:grid-cols-2">
            {featuredStudies.map(({ study, index }) => (
              <FeaturedProjectCard
                key={study.path}
                study={study}
                index={index}
              />
            ))}
          </div>
          <div class="mt-10">
            <Typography variant="eyebrow">Supporting work</Typography>
            <div class="mt-3 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
              {supportingStudies.map(({ study, index }) => (
                <SupportingProjectCard
                  key={study.path}
                  study={study}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="approach" class="scroll-mt-24">
        <div class="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-32">
          <div>
            <Typography variant="eyebrow">How I work</Typography>
            <Typography as="h2" variant="heading-2" class="mt-5">
              Start with the real workflow.
            </Typography>
          </div>
          <div class="text-ink-soft grid gap-6 text-lg">
            <p>
              I ask people to show me what actually happens, inspect the systems
              and data behind it, and separate symptoms from causes before
              deciding what to build.
            </p>
            <p>
              I favour solutions that fit the environment the business has.
              Sometimes that is a clean new application; sometimes it is a
              careful boundary around a legacy system that cannot yet be
              replaced.
            </p>
            <p>
              In either case, I make the trade-offs visible and keep the result
              tied to a customer, security or operational need.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head = createSeoHead({
  title: "Full Stack Developer",
  description:
    "Full Stack Developer specialising in TypeScript, React, Node.js, business systems, legacy modernisation and secure customer applications.",
  path: "/",
});
