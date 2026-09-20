import { component$ } from "@builder.io/qwik";
import { Typography } from "./typography";

interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
}

export const SectionHeading = component$<SectionHeadingProps>(
  ({ title, description, id }) => {
    return (
      <header class="mb-8 grid gap-4 md:grid-cols-[1fr_28rem] md:items-end">
        <Typography as="h2" variant="heading-2" id={id}>
          {title}
        </Typography>

        {description && <Typography tone="muted">{description}</Typography>}
      </header>
    );
  },
);
