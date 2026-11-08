import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ContentContainer } from "../ui/container";
import DesktopNavMenu from "./desktop-nav-menu";
import MobileNavMenu from "./mobile-nav-menu";
import { twMerge } from "tailwind-merge";

const linkClass =
  "font-semibold tracking-tight text-zinc-100 transition duration-200 hover:text-emerald-400 active:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500";

export default component$(() => {
  return (
    <header
      id="site-header"
      class="sticky top-0 z-50 w-full border-b border-zinc-800/80 backdrop-blur-sm"
    >
      <ContentContainer>
        <div class="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" class={twMerge(linkClass)}>
            BL
          </Link>

          <DesktopNavMenu />

          <MobileNavMenu />
        </div>
      </ContentContainer>
    </header>
  );
});
