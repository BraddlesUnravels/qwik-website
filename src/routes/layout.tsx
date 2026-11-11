import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import RootContainer, { ContentContainer } from "~/components/ui/container";
import EdgeLitBackDrop from "~/components/layout/background";
import SiteHeader from "~/components/layout/site-header";
import SiteFooter from "~/components/layout/site-footer";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 5,
    staleWhileRevalidate: 60 * 60,
  });
};

export const onHead = onGet;

export default component$(() => {
  return (
    <RootContainer>
      {/* RootContainer's isolated stacking context keeps this behind the UI. */}
      <EdgeLitBackDrop />

      <SiteHeader />

      <ContentContainer id="content-container">
        <Slot />
      </ContentContainer>

      <SiteFooter />
    </RootContainer>
  );
});
