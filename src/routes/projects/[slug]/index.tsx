import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { ProjectPage } from "~/components/content/project-page";
import { loadProject } from "~/content/loader";
import { resolveAccessLink } from "~/lib/demo-access";
import { createSeoHead } from "~/lib/seo";

const DEMO_ACCESS_SLUG = "access-control-demo";

const twButton = [
  "inline-flex items-center justify-center gap-2 rounded-lg",
  "border border-gray-300 bg-gray-200 px-5 py-2",
  "text-base font-semibold text-black shadow-md",
  "transition duration-200 hover:-translate-y-0.5 hover:bg-white",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-white focus-visible:ring-offset-2",
  "focus-visible:ring-offset-gray-950",
  "motion-reduce:transform-none motion-reduce:transition-none",
];

export const useProject = routeLoader$(async ({ params, status }) => {
  const project = await loadProject(params.slug);

  if (!project) {
    status(404);
    return null;
  }

  return project;
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
  const project = useProject().value;
  const demoAccess = useDemoAccessRedirect();

  if (!project) {
    return (
      <main class="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col justify-center px-5 py-20 sm:px-8">
        <p class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase">
          404
        </p>
        <h1 class="font-display text-ink mt-5 text-5xl font-semibold tracking-tighter">
          Project not found
        </h1>
        <p class="text-ink-soft mt-5 text-lg">
          The requested project does not exist or has moved.
        </p>
        <a
          class="bg-ink text-canvas mt-8 w-fit rounded-full px-5 py-3 text-sm font-semibold"
          href="/#selected-projects"
        >
          Return to selected work
        </a>
      </main>
    );
  }

  return (
    <ProjectPage project={project}>
      {project.slug === DEMO_ACCESS_SLUG && (
        <Form
          id="demo-access"
          q:slot="actions"
          action={demoAccess}
          reloadDocument
          class="mt-10 flex flex-col items-start gap-3"
        >
          <button
            aria-label="Try demo"
            type="submit"
            class={twButton}
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
    </ProjectPage>
  );
});

export const head: DocumentHead = ({ params, resolveValue }) => {
  const project = resolveValue(useProject);

  return project
    ? createSeoHead({
        title: project.title,
        description: project.description,
        path: project.path,
        type: "article",
      })
    : createSeoHead({
        title: "Project not found",
        description: "The requested portfolio project could not be found.",
        path: `/projects/${params.slug}/`,
      });
};
