import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { navLinks } from "~/lib/site-link-sets";

const anchorContact =
  "rounded-full border border-zinc-700 px-4 py-2 text-zinc-100 hover:border-zinc-500";
const anchorDownload =
  "hidden items-center gap-1 text-zinc-400 hover:text-zinc-100 sm:flex sm:flex-row";

export default component$(() => (
  <nav
    id="desktop-navigation"
    aria-label="Primary navigation"
    class="hidden items-center gap-5 text-sm sm:flex"
  >
    {navLinks.map((link) => {
      const Icon = link.icon;
      const isAnchor = link.type === "anchor";
      return isAnchor || link.download ? (
        <a
          aria-label={link.label}
          key={link.href}
          href={link.href}
          download={link.download}
          class={isAnchor && !link.download ? anchorContact : anchorDownload}
        >
          <span>{link.label}</span>
          {Icon && <Icon class="h-4 w-4" aria-hidden="true" />}
        </a>
      ) : (
        <Link
          aria-label={link.label}
          key={link.href}
          href={link.href}
          class="hidden items-center gap-1 text-zinc-400 hover:text-zinc-100 sm:flex sm:flex-row"
        >
          <span class="mr-1">{link.label}</span>
          {Icon && <Icon class="h-4 w-4" aria-hidden="true" />}
        </Link>
      );
    })}
  </nav>
));
