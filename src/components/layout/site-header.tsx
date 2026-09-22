import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Container } from "../ui/container";

export default component$(() => {
  return (
    <header
      id="site-header"
      class="sticky top-0 z-50 border-b border-zinc-800/80 backdrop-blur-sm"
    >
      <Container>
        <div class="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" class="font-semibold tracking-tight text-zinc-100">
            Bradley Laskey
          </Link>

          <nav
            aria-label="Primary navigation"
            class="flex items-center gap-5 text-sm"
          >
            <Link
              href="/#selected-work"
              class="hidden text-zinc-400 hover:text-zinc-100 sm:inline"
            >
              Work
            </Link>

            <Link
              href="/about/commercial-engineering/"
              class="hidden text-zinc-400 hover:text-zinc-100 sm:inline"
            >
              Approach
            </Link>

            <a
              href="mailto:bradley.laskey1990@gmail.com"
              class="rounded-full border border-zinc-700 px-4 py-2 text-zinc-100 hover:border-zinc-500"
            >
              Contact
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
});
