import { component$ } from "@builder.io/qwik";
import { Typography } from "../ui/typography";
import type { CaseStudyMetric } from "~/content/types";

export const StatCard = component$<{ metric: CaseStudyMetric }>(
  ({ metric }) => (
    <div class="bg-surface/60 min-w-0 rounded-xl border border-white/10 p-4 sm:p-5">
      <dt class="text-ink-muted text-xs leading-relaxed font-semibold tracking-wider uppercase">
        {metric.label}
      </dt>
      <dd class="mt-3">
        <Typography
          as="span"
          class="text-ink block text-xl leading-snug font-semibold tracking-tight wrap-anywhere sm:text-2xl"
        >
          {metric.value}
        </Typography>
        {metric.description && (
          <Typography
            as="p"
            class="text-ink-muted mt-3 text-sm leading-relaxed"
          >
            {metric.description}
          </Typography>
        )}
      </dd>
    </div>
  ),
);

export const CardRow = component$<{ metrics: CaseStudyMetric[] }>(
  ({ metrics }) => (
    <dl class="mt-8 grid auto-rows-fr gap-3 empty:hidden min-[380px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard key={metric.label} metric={metric} />
      ))}
    </dl>
  ),
);
