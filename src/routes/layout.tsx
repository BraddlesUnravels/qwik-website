import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import EdgeLitBackDrop from "~/components/layout/background";
import SiteHeader from "~/components/layout/site-header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 5,
    staleWhileRevalidate: 60 * 60 * 24 * 7,
  });
};

export default component$(() => {
  return (
    <div id="layout" class="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      {/* 
        No negative z-index: #layout doesn't form a stacking context, 
        so -z would paint behind its own bg-zinc-950 fill. 
        DOM order alone keeps this behind the content below. 
      */}
      <div class="fixed inset-0 overflow-hidden">
        <EdgeLitBackDrop />
      </div>
      {/* Must be positioned (relative) to paint above the fixed background regardless of DOM order. */}
      <div class="relative">
        <SiteHeader />
        <Slot />
      </div>
    </div>
  );
});
