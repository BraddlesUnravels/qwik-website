import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 5,
    staleWhileRevalidate: 60 * 60 * 24 * 7,
  });
};

export default component$(() => {
  return (
    <div class="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <a
        href="#main-content"
        class="sr-only z-50 rounded-md bg-zinc-100 px-4 py-2 text-zinc-950 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <SiteHeader />
      <Slot />
      <SiteFooter />
    </div>
  );
});
