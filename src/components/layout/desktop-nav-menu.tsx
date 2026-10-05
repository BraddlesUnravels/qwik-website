import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { navLinks } from "~/lib/site-link-sets";

export default component$(() => (
  <nav
    id="desktop-navigation"
    aria-label="Primary navigation"
    class="hidden items-center gap-5 text-sm sm:flex"
  >
    {navLinks.map((link) => {
      const isAnchor = link.type === "anchor";
      return isAnchor ? (
        <a
          key={link.href}
          href={link.href}
          class="rounded-full border border-zinc-700 px-4 py-2 text-zinc-100 hover:border-zinc-500"
        >
          {link.label}
        </a>
      ) : (
        <Link
          key={link.href}
          href={link.href}
          class="hidden text-zinc-400 hover:text-zinc-100 sm:inline"
        >
          {link.label}
        </Link>
      );
    })}
  </nav>
));
