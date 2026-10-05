import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuMenu } from "@qwikest/icons/lucide";
import { navLinks } from "~/lib/site-link-sets";

const twButtonClasses = [
  "inline-flex min-h-11 min-w-11 items-center",
  "justify-center rounded-full border border-emerald-500",
  "p-2 text-zinc-100 hover:border-zinc-500 focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-emerald-500",
].join(" ");

const twMenuClasses = [
  "absolute top-full right-0 z-50 mt-3 w-48 space-y-1",
  "rounded-xl border border-zinc-800 bg-zinc-950 p-2",
  "text-sm text-zinc-100 shadow-xl",
].join(" ");

export default component$(() => {
  const menuOpen = useSignal(false);
  const menuRef = useSignal<HTMLElement>();
  const buttonRef = useSignal<HTMLElement>();

  const closeMenu = $(() => {
    menuOpen.value = false;
  });

  useOnDocument(
    "click",
    $((event: MouseEvent) => {
      if (
        menuOpen.value &&
        menuRef.value &&
        buttonRef.value &&
        !menuRef.value.contains(event.target as Node) &&
        !buttonRef.value.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }),
  );

  return (
    <div
      id="mobile-navigation"
      aria-label="Mobile navigation"
      ref={menuRef}
      class="relative sm:hidden"
      onKeyDown$={(event) => {
        if (event.key === "Escape" && menuOpen.value) {
          menuOpen.value = false;
          buttonRef.value?.focus();
        }
      }}
      onFocusOut$={(event, element) => {
        if (!element.contains(event.relatedTarget as Node | null)) {
          menuOpen.value = false;
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={menuOpen.value ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen.value}
        aria-controls="mobile-navigation-links"
        onClick$={() => {
          menuOpen.value = !menuOpen.value;
        }}
        class={twButtonClasses}
      >
        <span aria-hidden="true">
          <LuMenu />
        </span>
      </button>

      <nav
        id="mobile-navigation-links"
        class={[twMenuClasses, { hidden: !menuOpen.value }]}
      >
        {navLinks.map((link) => {
          const isAnchor = link.type === "anchor";
          return (
            <>
              {isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  class="block px-4 py-2 text-zinc-100 hover:bg-zinc-700"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  class="block px-4 py-2 text-zinc-100 hover:bg-zinc-700"
                >
                  {link.label}
                </Link>
              )}
            </>
          );
        })}
      </nav>
    </div>
  );
});
