import { component$ } from "@builder.io/qwik";
import { Typography } from "./typography";

interface EvidenceStatProps {
  value: string;
  description: string;
}

export const EvidenceStat = component$<EvidenceStatProps>(
  ({ value, description }) => {
    return (
      <div class="border-b border-zinc-800 py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
        <Typography as="div" variant="heading-3" class="mb-2">
          {value}
        </Typography>

        <Typography variant="small" tone="muted">
          {description}
        </Typography>
      </div>
    );
  },
);
