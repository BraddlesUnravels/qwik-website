import { component$ } from "@builder.io/qwik";
import FeatureList from "./feature-list";
import ExperienceList from "./experience-list";

export default component$(() => {
  return (
    <section
      id="selected-projects"
      tabIndex={-1}
      class="scroll-mt-(--site-header-height) py-10 focus:outline-none lg:py-20"
    >
      <FeatureList />

      <ExperienceList />
    </section>
  );
});
