import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TechnologyCarousel } from "~/components/ui/technology-carousel";

export default component$(() => {
  return (
    <main class="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6 px-6 py-16">
      <div class="flex flex-col gap-4 items-center">
        <p class="text-sm font-medium tracking-wide text-white uppercase">
          Welcome
        </p>

        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Bradley{" "}
          <span class="bg-linear-to-r from-[#7c3feb] to-[#3c5beb] bg-clip-text text-transparent">
            Laskey
          </span>
        </h1>

        <p class="max-w-2xl text-lg text-zinc-400">So yeah, This is where it begins</p>
      </div>

      <TechnologyCarousel />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Portfolio",
  meta: [
    {
      name: "description",
      content: "Personal portfolio landing page",
    },
  ],
};

