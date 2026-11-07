import { component$ } from "@builder.io/qwik";
import { Typography } from "../typography";
import type { ProjectMetric } from "~/content/types";

export const StatCard = component$<{ metric: ProjectMetric }>(({ metric }) => (
  <div class="card-bg emerald-border min-w-0 rounded-xl border p-4 sm:p-5">
    <dt class="emerald-text text-xs leading-relaxed font-semibold tracking-wider uppercase">
      {metric.label}
    </dt>
    <dd class="mt-3">
      <Typography
        as="span"
        variant="body-large"
        class="block leading-snug font-semibold tracking-tight wrap-anywhere"
      >
        {metric.value}
      </Typography>
      {metric.description && (
        <Typography variant="x-small">{metric.description}</Typography>
      )}
    </dd>
  </div>
));

export const CardRow = component$<{ metrics: ProjectMetric[] }>(
  ({ metrics }) =>
    metrics.length ? (
      <dl class="mt-8 hidden auto-rows-fr gap-3 empty:hidden lg:grid lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </dl>
    ) : undefined,
);
