import { component$ } from "@builder.io/qwik";
import { Container } from "../ui/container";
import { siteConfig } from "~/config/site";

export const SiteFooter = component$(() => {
  return (
    <footer class="mt-24 border-t border-zinc-800">
      <Container>
        <div class="grid gap-8 py-10 sm:grid-cols-2 sm:items-end">
          <div>
            <p class="font-semibold text-zinc-100">Bradley Laskey</p>

            <p class="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Full-stack developer building secure customer applications and
              modernising production systems.
            </p>
          </div>

          <div class="flex flex-wrap gap-5 text-sm sm:justify-end">
            <a
              href={`mailto:${siteConfig.email}`}
              class="text-zinc-400 hover:text-zinc-100"
            >
              Email
            </a>

            <a
              href={siteConfig.resumePath}
              class="text-zinc-400 hover:text-zinc-100"
            >
              Résumé
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
});
