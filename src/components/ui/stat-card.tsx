import { component$ } from "@builder.io/qwik";
import { Typography } from "../ui/typography";
import type { ProjectMetric } from "~/content/types";

export const StatCard = component$<{ metric: ProjectMetric }>(({ metric }) => (
  <div class="card-bg emerald-border min-w-0 rounded-xl border p-4 sm:p-5">
    <dt class="emerald-text text-xs leading-relaxed font-semibold tracking-wider uppercase">
      {metric.label}
    </dt>
    <dd class="mt-3">
      <Typography
        as="span"
        class="text-ink block text-lg leading-snug font-semibold tracking-tight wrap-anywhere sm:text-2xl"
      >
        {metric.value}
      </Typography>
      {metric.description && (
        <Typography as="p" class="text-ink-muted mt-3 text-sm leading-relaxed">
          {metric.description}
        </Typography>
      )}
    </dd>
  </div>
));

export const CardRow = component$<{ metrics: ProjectMetric[] }>(
  ({ metrics }) => (
    <dl class="mt-8 grid auto-rows-fr gap-3 empty:hidden min-[380px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard key={metric.label} metric={metric} />
      ))}
    </dl>
  ),
);
