import { component$ } from "@builder.io/qwik";
import { ProjectImages } from "../image-list";
import { ProjectMediaList } from "../media-list";
import { Typography } from "../typography";
import type {
  ProjectSection as SectionData,
  ProjectSubsection as SubsectionData,
} from "~/content/types";

const BulletPoint = () => (
  <span
    aria-hidden="true"
    class="bg-brand mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full"
  />
);

const Subsection = component$<{ subsection: SubsectionData }>(
  ({ subsection }) => (
    <section class="border-brand/35 border-l pl-5 sm:pl-7">
      <Typography
        as="h3"
        class="font-display text-ink text-xl font-semibold tracking-[-0.02em]"
      >
        {subsection.title}
      </Typography>

      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph} class="text-ink-soft mt-4 text-base">
          {paragraph}
        </p>
      ))}

      {subsection.bullets?.length && (
        <ul class="mt-5 grid gap-3">
          {subsection.bullets.map((item) => (
            <li key={item} class="text-ink-soft flex gap-3 text-base">
              <BulletPoint />
              <Typography as="span">{item}</Typography>
            </li>
          ))}
        </ul>
      )}

      {subsection.steps?.length && (
        <ol class="mt-6 grid gap-4">
          {subsection.steps.map((item, index) => (
            <li key={item} class="text-ink-soft flex gap-4 text-base">
              <span class="border-brand/35 bg-brand/10 text-brand-bright flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold">
                {index + 1}
              </span>
              <Typography as="span">{item}</Typography>
            </li>
          ))}
        </ol>
      )}
    </section>
  ),
);

export const ProjectSection = component$<{
  section: SectionData;
  index: number;
}>(({ section, index }) => (
  <section class="border-t border-white/10 py-12 first:border-t-0 first:pt-0 sm:py-16">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="text-brand font-mono text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 class="font-display text-ink text-2xl leading-tight font-semibold tracking-[-0.035em] sm:text-3xl">
        {section.title}
      </h2>
    </div>

    {section.paragraphs?.map((paragraph) => (
      <p key={paragraph} class="text-ink-soft mt-5 text-base first:mt-0">
        {paragraph}
      </p>
    ))}

    {/*  */}
    {section.bullets?.length ? (
      <ul class="mt-7 grid gap-3 sm:grid-cols-2">
        {section.bullets.map((item) => (
          <li
            key={item}
            class="text-ink-soft rounded-xl border border-white/8 bg-white/3 p-4 text-sm"
          >
            <BulletPoint />
            {item}
          </li>
        ))}
      </ul>
    ) : null}
    {/*  */}

    {/* refactor subsections to handle both arrays and single items */}
    {section.subsections?.length ? (
      <div class="mt-9 grid gap-10">
        {section.subsections.map((subsection) => (
          <Subsection key={subsection.title} subsection={subsection} />
        ))}
      </div>
    ) : null}
    {/*  */}

    <ProjectImages
      images={section.images}
      sizes="(min-width: 1152px) 768px, (min-width: 1024px) calc(100vw - 384px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
    />

    <ProjectMediaList videos={section.videos} />

    {/*  */}
    {section.additionalVideos?.length && (
      <details class="mt-8 min-w-0 rounded-xl border border-white/10 p-5">
        <summary class="text-ink cursor-pointer font-semibold">
          More recorded workflows ({section.additionalVideos.length})
        </summary>
        <ProjectMediaList videos={section.additionalVideos} />
      </details>
    )}
    {/*  */}
  </section>
));
