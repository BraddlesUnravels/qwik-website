import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div class="relative isolate min-h-screen w-full bg-zinc-950 text-zinc-100 antialiased">
    <Slot />
  </div>
));

export const ContentContainer = component$<{ className?: string }>(
  ({ className }) => (
    <div
      class={[
        "mx-auto w-full min-w-0 px-5 sm:px-8 lg:px-10 xl:max-w-[75%]",
        className,
      ]}
    >
      <Slot />
    </div>
  ),
);
