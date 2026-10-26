import { component$ } from "@builder.io/qwik";
import { Typography } from "../ui/typography";

export const CaseStudyReflection = component$<{ lesson?: string }>(
  ({ lesson }) => {
    if (!lesson) return;

    return (
      <aside class="rounded-card border-brand/25 bg-brand/8 shadow-glow border p-7 sm:p-9">
        <Typography
          as="p"
          class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase"
        >
          Key reflection
        </Typography>
        <Typography
          as="p"
          class="font-display text-ink mt-4 text-2xl font-medium tracking-tight"
        >
          {lesson}
        </Typography>
      </aside>
    );
  },
);
