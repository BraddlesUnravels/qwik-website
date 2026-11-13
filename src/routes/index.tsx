import { component$ } from "@builder.io/qwik";
import PageHeader from "~/components/ui/home-page-header";
import ProjectList from "~/components/ui/project-display/project-list";
import { Typography } from "~/components/ui/typography";
import { createSeoHead } from "~/lib/seo";
import { MobileBackToTop } from "~/components/ui/mobile-back-to-top-button";

export default component$(() => {
  return (
    <main id="main-page-content">
      <PageHeader />

      <ProjectList />

      <section id="approach" class="scroll-mt-24">
        <div class="mx-auto grid w-full gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-32">
          <div>
            <Typography variant="eyebrow">How I work</Typography>
            <Typography as="h2" variant="heading-2" class="mt-5">
              Start with the real workflow.
            </Typography>
          </div>
          <div class="text-ink-soft grid gap-6 text-lg">
            <Typography as="p">
              I ask people to show me what actually happens, inspect the systems
              and data behind it, and separate symptoms from causes before
              deciding what to build.
            </Typography>
            <Typography as="p">
              I favour solutions that fit the environment the business has.
              Sometimes that is a clean new application; sometimes it is a
              careful boundary around a legacy system that cannot yet be
              replaced.
            </Typography>
            <Typography as="p">
              In either case, I make the trade-offs visible and keep the result
              tied to a customer, security or operational need.
            </Typography>
          </div>
        </div>
      </section>

      <MobileBackToTop />
    </main>
  );
});

export const head = createSeoHead({
  title: "Full Stack Developer",
  description:
    "Full Stack Developer specialising in TypeScript, React, Node.js, business systems, legacy modernisation and secure customer applications.",
  path: "/",
});
