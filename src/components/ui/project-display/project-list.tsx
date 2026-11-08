import { component$ } from "@builder.io/qwik";
import FeatureList from "./feature-list";
import ExperienceList from "./experience-list";

export default component$(() => {
  return (
    <section id="selected-projects" class="scroll-mt-15 py-10 lg:py-20">
      <FeatureList />

      <ExperienceList />
    </section>
  );
});
