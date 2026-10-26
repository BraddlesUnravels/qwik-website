import { component$ } from "@builder.io/qwik";
import { Typography } from "../ui/typography";
import type { CaseStudy } from "~/content/types";

const fallback = [{ label: "View all case studies", href: "/#selected-work" }];

export const CaseStudyRelatedLinks = component$<{
  links: CaseStudy["related"];
}>(({ links }) => (
  <footer class="bg-canvas-soft/70 border-t border-white/8">
    <div class="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <Typography
        as="p"
        class="text-brand-bright font-mono text-xs font-semibold tracking-[0.16em] uppercase"
      >
        Continue exploring
      </Typography>

      <div class="mt-6 flex flex-wrap gap-3">
        {(links.length ? links : fallback).map((link) => (
          <a
            key={link.href}
            href={link.href}
            class="text-ink hover:border-brand/50 hover:bg-brand/10 rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold transition"
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  </footer>
));
