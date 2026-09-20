import { component$ } from "@builder.io/qwik";
import { Typography } from "./typography";

const technologyGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Python", "Bash"],
  },
  {
    title: "Applications",
    items: ["React", "Next.js", "Qwik", "Redux", "Material UI"],
  },
  {
    title: "APIs and data",
    items: ["Node.js", "Express", "PostgreSQL", "MSSQL", "MongoDB", "Supabase"],
  },
  {
    title: "Delivery",
    items: ["Docker", "GitHub Actions", "Azure", "Bicep", "CI/CD"],
  },
] as const;

export const TechnologyList = component$(() => {
  return (
    <div class="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
      {technologyGroups.map((group) => (
        <section key={group.title} class="bg-zinc-950 p-6">
          <Typography as="h3" variant="eyebrow" tone="accent" class="mb-4">
            {group.title}
          </Typography>

          <ul class="space-y-2 text-sm text-zinc-400">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
});
