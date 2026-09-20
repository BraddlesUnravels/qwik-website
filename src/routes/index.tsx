import { component$ } from "@builder.io/qwik";
import { ProjectCard } from "~/components/content/project-card";
import { TechnologyCarousel } from "~/components/ui/technology-carousel";
import { Typography } from "~/components/ui/typography";
import {
  caseStudySummaries,
  commercialEngineeringSummary,
} from "~/content/catalog";
import { createSeoHead } from "~/lib/seo";

const evidence = [
  { value: "5,000+", label: "customers migrated" },
  { value: "34 min → 30 ms", label: "balance calculation" },
  { value: "3 × 100", label: "Lighthouse scores" },
  { value: "By 9:00 am", label: "critical recovery" },
] as const;

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

export default component$(() => (
  <main>
    <section class="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_32%),radial-gradient(circle_at_82%_14%,color-mix(in_oklab,var(--color-accent)_13%,transparent),transparent_27%)]"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_85%)] bg-size-[4rem_4rem] opacity-25"
      />

      <div class="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-10">
        <div>
          <Typography variant="eyebrow">
            Full Stack Developer · Melbourne → Sydney
          </Typography>
          <Typography as="h1" variant="display" class="mt-7 max-w-5xl">
            I build software around the way a business actually works.
          </Typography>
          <Typography class="mt-8 max-w-3xl text-xl">
            Five years delivering secure customer applications, modernising
            legacy systems and connecting operational workflows across
            TypeScript, React, Node.js, SQL and Azure.
          </Typography>
          <div class="mt-10 flex flex-wrap gap-3">
            <a
              href="#selected-work"
              class="bg-ink text-canvas hover:bg-brand-bright rounded-full px-6 py-3.5 text-sm font-semibold transition"
            >
              Explore selected work
            </a>
            <a
              href="mailto:bradley.laskey1990@gmail.com"
              class="text-ink hover:border-brand/50 hover:bg-brand/10 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold transition"
            >
              Start a conversation
            </a>
          </div>
        </div>

        <aside class="rounded-panel bg-surface/75 shadow-card border border-white/10 p-6 backdrop-blur sm:p-8">
          <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase">
            Evidence, not adjectives
          </p>
          <dl class="mt-7 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-1">
            {evidence.map((item) => (
              <div
                key={item.label}
                class="border-t border-white/10 pt-4 first:border-0 first:pt-0"
              >
                <dt class="text-ink-muted text-xs tracking-widest uppercase">
                  {item.label}
                </dt>
                <dd class="font-display text-ink mt-1 text-2xl font-semibold tracking-[-0.035em]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>

    <section
      id="capabilities"
      class="bg-canvas-soft/65 scroll-mt-24 border-y border-white/8"
    >
      <div class="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Typography variant="eyebrow">What I bring</Typography>
        <Typography as="h2" variant="heading-2" class="mt-5 max-w-3xl">
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

    <section class="bg-canvas-soft/65 overflow-hidden border-y border-white/8 py-16">
      <div class="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Typography variant="eyebrow">Technical toolkit</Typography>
        <TechnologyCarousel />
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
            Sometimes that is a clean new application; sometimes it is a careful
            boundary around a legacy system that cannot yet be replaced.
          </p>
          <p>
            In either case, I make the trade-offs visible and keep the result
            tied to a customer, security or operational need.
          </p>
        </div>
      </div>
    </section>

    <section class="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
      <div class="rounded-panel border-brand/25 shadow-glow mx-auto max-w-7xl overflow-hidden border bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-brand)_18%,var(--color-surface)),var(--color-surface))] p-8 sm:p-12 lg:p-16">
        <Typography variant="eyebrow">
          Available for Sydney opportunities
        </Typography>
        <Typography as="h2" variant="heading-2" class="mt-5 max-w-4xl">
          Looking for a developer who can own the problem, not just the ticket?
        </Typography>
        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:bradley.laskey1990@gmail.com"
            class="bg-ink text-canvas rounded-full px-6 py-3.5 text-sm font-semibold"
          >
            Email Bradley
          </a>
          <a
            href="/Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf"
            class="text-ink rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold"
          >
            Download résumé
          </a>
        </div>
      </div>
    </section>
  </main>
));

export const head = createSeoHead({
  title: "Full Stack Developer",
  description:
    "Full Stack Developer specialising in TypeScript, React, Node.js, business systems, legacy modernisation and secure customer applications.",
  path: "/",
});
