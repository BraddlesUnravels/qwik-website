import { component$ } from "@builder.io/qwik";
import { ProjectCard } from "~/components/content/project-card";
import { MainPageHeadBanner } from "~/components/ui/home-page-header";
import { Typography } from "~/components/ui/typography";
import {
  caseStudySummaries,
  commercialEngineeringSummary,
} from "~/content/catalog";
import { createSeoHead } from "~/lib/seo";

const capabilities = [
  [
    "01",
    "Full-stack delivery",
    "Production interfaces, APIs, data models and deployment pipelines carried from discovery through support.",
  ],
  [
    "02",
    "Legacy modernisation",
    "Careful boundaries around systems that cannot be switched off, backed by repeatable validation and rollback.",
  ],
  [
    "03",
    "Security and identity",
    "MFA, migration, step-up authentication, RBAC, ownership controls and database-enforced access.",
  ],
  [
    "04",
    "Commercial systems",
    "Workflow discovery and integrations that make sales, marketing and operational data genuinely observable.",
  ],
] as const;

export default component$(() => {

  return (
    <main id="main-page-content">
      <section class="relative isolate overflow-hidden">
        <MainPageHeadBanner />
      </section>

      <section
        id="capabilities"
        class="bg-canvas-soft/65"
      >
        <div class="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
          <Typography variant="eyebrow">What I bring</Typography>
          <Typography as="h2" variant="heading-2" class="mt-5 max-w-6xl">
            Technical depth tied to operational outcomes.
          </Typography>
          <div class="rounded-card mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([number, title, description]) => (
              <article key={number} class="bg-canvas-soft p-6 sm:p-8">
                <span class="text-brand font-mono text-xs">{number}</span>
                <h3 class="font-display text-ink mt-8 text-2xl font-semibold tracking-[-0.03em]">
                  {title}
                </h3>
                <p class="text-ink-muted mt-4 text-sm">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="selected-work" class="scroll-mt-24">
        <div class="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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
          <div class="mt-12 grid gap-5 lg:grid-cols-2">
            {caseStudySummaries.map((study, index) => (
              <ProjectCard key={study.slug} study={study} index={index} />
            ))}
            <ProjectCard
              study={commercialEngineeringSummary}
              index={caseStudySummaries.length}
            />
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
