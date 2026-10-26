import { component$ } from "@builder.io/qwik";
import { Container } from "../ui/container";
import DesktopNavMenu from "./desktop-nav-menu";
import MobileNavMenu from "./mobile-nav-menu";

export default component$(() => {
  return (
    <header
      id="site-header"
      class="sticky top-0 z-50 border-b border-zinc-800/80 backdrop-blur-sm"
    >
      <Container>
        <div class="flex min-h-20 items-center justify-between gap-6">
          <a href="/" class="font-semibold tracking-tight text-zinc-100">
            BL
          </a>

          <DesktopNavMenu />

          <MobileNavMenu />
        </div>
      </Container>
    </header>
  );
});
