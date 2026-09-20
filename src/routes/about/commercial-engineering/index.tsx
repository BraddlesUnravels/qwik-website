import { component$ } from "@builder.io/qwik";
import { CaseStudyPage } from "~/components/content/case-study-page";
import commercialEngineering from "~/content/studies/commercial-engineering";
import { createSeoHead } from "~/lib/seo";

export default component$(() => (
  <CaseStudyPage study={commercialEngineering} />
));

export const head = createSeoHead({
  title: commercialEngineering.title,
  description: commercialEngineering.description,
  path: commercialEngineering.path,
  type: "article",
});
