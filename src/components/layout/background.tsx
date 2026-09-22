import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div
      id="background"
      class="relative h-full w-full overflow-hidden bg-[#070a10]"
    >
      {/* Directional blue light */}
      <div
        aria-hidden="true"
        class={[
          "pointer-events-none absolute inset-[-50%_-110%] rotate-29",
          "bg-[linear-gradient(90deg,transparent_41%,#1b294044_46%,#a1baff51_49%,#2e447a67_50%,#0c172d99_55%,transparent_61%)]",
          "blur-[13px]",
        ].join(" ")}
      />

      {/* Dark graphite overlay */}
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#070a10bb,transparent_80%)]"
      />
    </div>
  );
});
