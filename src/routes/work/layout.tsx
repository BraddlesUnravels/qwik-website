import { component$, Slot } from "@builder.io/qwik";
import { Container } from "~/components/ui/container";

export default component$(() => {
  return (
    <main id="main-content">
      <Container class="py-16 sm:py-24">
        <article class="case-study mx-auto max-w-3xl">
          <Slot />
        </article>
      </Container>
    </main>
  );
});
