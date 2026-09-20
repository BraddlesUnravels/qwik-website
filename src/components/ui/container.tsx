import { component$, Slot } from "@builder.io/qwik";

interface ContainerProps {
  class?: string;
}

export const Container = component$<ContainerProps>((props) => {
  return (
    <div
      class={["mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", props.class]}
    >
      <Slot />
    </div>
  );
});
