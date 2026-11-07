import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div
    id="root-container"
    class="relative isolate min-h-screen w-full overflow-clip bg-zinc-950 text-zinc-100 antialiased"
  >
    <Slot />
  </div>
));

export const ContentContainer = component$<{ id?: string; className?: string }>(
  ({ id, className }) => (
    <div
      id={id}
      class={[
        "mx-auto w-full min-w-0 px-5 sm:px-8 lg:px-10 xl:max-w-[75%]",
        className,
      ]}
    >
      <Slot />
    </div>
  ),
);
