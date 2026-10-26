import { component$ } from "@builder.io/qwik";
import { ProjectPage } from "~/components/content/project-page";
import aboutApproach from "~/content/projects/about-approach";
import { engineeringApproach } from "~/content/catalog";
import { createSeoHead } from "~/lib/seo";

export default component$(() => <ProjectPage project={aboutApproach} />);

export const head = createSeoHead({
  title: engineeringApproach.title,
  description: engineeringApproach.description,
  path: engineeringApproach.path,
  type: "article",
});
