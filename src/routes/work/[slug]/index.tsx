import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CaseStudyPage } from "~/components/content/case-study-page";
import { loadCaseStudy } from "~/content/loader";
import { createSeoHead } from "~/lib/seo";

export const useCaseStudy = routeLoader$(async ({ params, status }) => {
  const study = await loadCaseStudy(params.slug);

  if (!study) {
    status(404);
    return null;
  }

  return study;
});

export default component$(() => {
  const study = useCaseStudy().value;

  if (!study) {
    return (
      <main class="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col justify-center px-5 py-20 sm:px-8">
        <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase">
          404
        </p>
        <h1 class="font-display text-ink mt-5 text-5xl font-semibold tracking-tighter">
          Case study not found
        </h1>
        <p class="text-ink-soft mt-5 text-lg">
          The requested case study does not exist or has moved.
        </p>
        <a
          class="bg-ink text-canvas mt-8 w-fit rounded-full px-5 py-3 text-sm font-semibold"
          href="/#selected-work"
        >
          Return to selected work
        </a>
      </main>
    );
  }

  return <CaseStudyPage study={study} />;
});

export const head: DocumentHead = ({ params, resolveValue }) => {
  const study = resolveValue(useCaseStudy);

  return study
    ? createSeoHead({
        title: study.title,
        description: study.description,
        path: study.path,
        type: "article",
      })
    : createSeoHead({
        title: "Case study not found",
        description: "The requested portfolio case study could not be found.",
        path: `/work/${params.slug}/`,
      });
};
