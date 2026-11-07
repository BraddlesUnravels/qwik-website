import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { navLinks } from "~/lib/site-link-sets";
import { GitHubNavButton } from "~/components/ui/github-repo-button";

const linkClass =
  "hidden items-center gap-1 text-zinc-400 hover:text-zinc-100 sm:flex sm:flex-row";

export default component$(() => (
  <nav
    id="desktop-navigation"
    aria-label="Primary navigation"
    class="hidden items-center gap-5 text-sm sm:flex"
  >
    {navLinks.map((link) => {
      const Icon = link.icon;
      const isGitHub = link.href.includes("github");

      return isGitHub ? (
        <GitHubNavButton url={link.href} />
      ) : (
        <Link
          id={`link-comp-${link.label}`}
          key={link.href}
          href={link.href}
          prefetch={link.prefetch ? link.prefetch : false}
          aria-label={link.label}
          class={linkClass}
        >
          <span class="mr-1">{link.label}</span>
          {Icon && <Icon class="h-4 w-4" aria-hidden="true" />}
        </Link>
      );
    })}
  </nav>
));
