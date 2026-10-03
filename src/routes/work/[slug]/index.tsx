import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { CaseStudyPage } from "~/components/content/case-study-page";
import { loadCaseStudy } from "~/content/loader";
import { resolveAccessLink } from "~/lib/demo-access";
import { createSeoHead } from "~/lib/seo";

const DEMO_ACCESS_SLUG = "access-control-demo";

export const useCaseStudy = routeLoader$(async ({ params, status }) => {
  const study = await loadCaseStudy(params.slug);

  if (!study) {
    status(404);
    return null;
  }

  return study;
});

// Builds the demo link (with access code) on the server only, then redirects.
export const useDemoAccessRedirect = routeAction$(
  (_, { env, fail, params, redirect }) => {
    if (params.slug !== DEMO_ACCESS_SLUG) {
      return fail(404, { message: "No live demo is available for this page." });
    }

    const link = resolveAccessLink("ACA_DEMO_ACCESS_LINK", (key) =>
      env.get(key),
    );

    if (!link) {
      console.error("Demo access link is not configured.");
      return fail(503, {
        message:
          "The live demo is unavailable right now. Please try again later.",
      });
    }

    throw redirect(302, link);
  },
);

export default component$(() => {
  const study = useCaseStudy().value;
  const demoAccess = useDemoAccessRedirect();

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

  return (
    <CaseStudyPage study={study}>
      {study.slug === DEMO_ACCESS_SLUG && (
        <Form
          q:slot="actions"
          action={demoAccess}
          reloadDocument
          class="mt-10 flex flex-col items-start gap-3"
        >
          <button
            type="submit"
            class="bg-ink text-canvas hover:bg-ink/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
            disabled={demoAccess.isRunning}
          >
            {demoAccess.isRunning ? "Opening demo…" : "Try the live demo"}
            <span aria-hidden="true">→</span>
          </button>
          {demoAccess.value?.failed && (
            <p role="alert" class="text-sm text-red-300">
              {demoAccess.value.message}
            </p>
          )}
        </Form>
      )}
    </CaseStudyPage>
  );
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
