import { component$ } from "@builder.io/qwik";
import type { CaseStudyMetric } from "~/content/types";

export const StatCard = component$(
  ({ metric, index }: { metric: CaseStudyMetric; index: number }) => {
    return (
      <div
        key={metric.label}
        class={[
          "group relative isolate flex min-w-0 flex-col",
          "overflow-hidden rounded-2xl border p-6 sm:p-7",
          "shadow-lg backdrop-blur-sm",
          "transition duration-300 ease-out",
          "hover:shadow-2xl",
          "motion-safe:hover:-translate-y-2",
          "motion-safe:hover:scale-[1.02]",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {/* Soft coloured light in the corner */}
        <div
          aria-hidden="true"
          class={[
            "pointer-events-none absolute -top-12 -right-12 -z-10",
            "h-36 w-36 rounded-full opacity-10 blur-3xl",
            "transition-opacity duration-300 group-hover:opacity-30",
            "motion-reduce:transition-none",
          ].join(" ")}
        />

        <dt class="flex items-start justify-between gap-3">
          <span class="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            {metric.label}
          </span>

          <span aria-hidden="true" class="font-mono text-xs text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </dt>

        <dd class="mt-6 flex flex-1 flex-col">
          <span
            class={[
              "block text-3xl leading-tight font-semibold",
              "tracking-tight text-balance",
            ].join(" ")}
          >
            {metric.value}
          </span>

          {metric.description && (
            <p class="mt-4 text-sm leading-relaxed text-gray-400">
              {metric.description}
            </p>
          )}

          {/* Accent line grows across the card on hover */}
          <span aria-hidden="true" class="mt-auto block pt-7">
            <span
              class={[
                "block h-0.5 w-10 rounded-full opacity-60",
                "transition-all duration-300 ease-out",
                "group-hover:w-full group-hover:opacity-100",
                "motion-reduce:transition-none",
              ].join(" ")}
            />
          </span>
        </dd>
      </div>
    );
  },
);

export const CardRow = component$(
  ({ metrics }: { metrics: CaseStudyMetric[] }) => {
    return (
      <dl class="rounded-card shadow-card mt-14 grid space-x-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <StatCard key={m.label} metric={m} index={i} />
        ))}
      </dl>
    );
  },
);
