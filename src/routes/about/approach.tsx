import { component$ } from "@builder.io/qwik";
import { CaseStudyPage } from "~/components/content/case-study-page";
import aboutApproach from "~/content/projects/about-approach";
import { createSeoHead } from "~/lib/seo";

export default component$(() => <CaseStudyPage study={aboutApproach} />);

export const head = createSeoHead({
  title: aboutApproach.title,
  description: aboutApproach.description,
  path: aboutApproach.path,
  type: "article",
});
