import { component$ } from "@builder.io/qwik";
import type { CaseStudy, CaseStudySubsection } from "~/content/types";

type CaseStudyPageProps = {
  study: CaseStudy;
};

const Subsection = component$<{ subsection: CaseStudySubsection }>(
  ({ subsection }) => (
    <section class="border-brand/35 border-l pl-5 sm:pl-7">
      <h3 class="font-display text-ink text-xl font-semibold tracking-[-0.02em]">
        {subsection.title}
      </h3>

      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph} class="text-ink-soft mt-4 text-base">
          {paragraph}
        </p>
      ))}

      {subsection.bullets && (
        <ul class="mt-5 grid gap-3">
          {subsection.bullets.map((item) => (
            <li key={item} class="text-ink-soft flex gap-3 text-base">
              <span
                aria-hidden="true"
                class="bg-brand mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {subsection.steps && (
        <ol class="mt-6 grid gap-4">
          {subsection.steps.map((item, index) => (
            <li key={item} class="text-ink-soft flex gap-4 text-base">
              <span class="border-brand/35 bg-brand/10 text-brand-bright flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  ),
);

export const CaseStudyPage = component$<CaseStudyPageProps>(({ study }) => (
  <main class="relative isolate overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-150 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent_42%),radial-gradient(circle_at_85%_20%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_36%)]"
    />

    <article>
      <header class="mx-auto w-full max-w-7xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24 lg:px-10">
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

        <div class="mt-12 max-w-5xl">
          <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.18em] uppercase">
            {study.category}
          </p>
          <h1 class="font-display text-ink mt-6 max-w-5xl text-6xl font-semibold tracking-[-0.055em] text-balance">
            {study.title}
          </h1>
          <p class="text-ink-soft mt-8 max-w-3xl text-xl">
            {study.introduction}
          </p>
        </div>

        <dl class="rounded-card shadow-card mt-14 grid overflow-hidden border border-white/10 bg-white/4 sm:grid-cols-2 lg:grid-cols-4">
          {study.metrics.map((metric) => (
            <div
              key={metric.label}
              class="border-b border-white/8 p-5 last:border-0 sm:border-r sm:p-6 lg:border-b-0"
            >
              <dt class="text-ink-muted text-xs font-semibold tracking-[0.13em] uppercase">
                {metric.label}
              </dt>
              <dd class="font-display text-ink mt-2 text-2xl font-semibold tracking-[-0.03em]">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div class="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20 lg:px-10 lg:pb-32">
        <div class="max-w-3xl">
          {study.sections.map((section, index) => (
            <section
              key={section.title}
              class="border-t border-white/10 py-12 first:border-t-0 first:pt-0 sm:py-16"
            >
              <div class="mb-7 flex items-baseline gap-4">
                <span class="text-brand font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 class="font-display text-ink text-3xl font-semibold tracking-[-0.035em]">
                  {section.title}
                </h2>
              </div>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  class="text-ink-soft mt-5 text-base first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul class="mt-7 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      class="text-ink-soft rounded-xl border border-white/8 bg-white/3 p-4 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.subsections && (
                <div class="mt-9 grid gap-10">
                  {section.subsections.map((subsection) => (
                    <Subsection
                      key={subsection.title}
                      subsection={subsection}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}

          {study.lesson && (
            <aside class="rounded-card border-brand/25 bg-brand/8 shadow-glow border p-7 sm:p-9">
              <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Key reflection
              </p>
              <p class="font-display text-ink mt-4 text-2xl font-medium tracking-[-0.025em]">
                {study.lesson}
              </p>
            </aside>
          )}
        </div>

        <aside class="lg:sticky lg:top-28 lg:h-fit">
          <div class="rounded-card bg-surface/80 shadow-card border border-white/10 p-6 backdrop-blur">
            <h2 class="font-display text-ink text-lg font-semibold">
              Technology and methods
            </h2>
            <dl class="mt-6 grid gap-5">
              {study.technologies.map((technology) => (
                <div key={technology.label}>
                  <dt class="text-ink-muted text-xs font-semibold tracking-[0.12em] uppercase">
                    {technology.label}
                  </dt>
                  <dd class="text-ink-soft mt-1 text-sm">{technology.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <footer class="bg-canvas-soft/70 border-t border-white/8">
        <div class="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase">
            Continue exploring
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            {study.related.length > 0 ? (
              study.related.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  class="text-ink hover:border-brand/50 hover:bg-brand/10 rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold transition"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))
            ) : (
              <a
                href="/#selected-work"
                class="text-ink hover:border-brand/50 hover:bg-brand/10 rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold transition"
              >
                View all case studies <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </footer>
    </article>
  </main>
));