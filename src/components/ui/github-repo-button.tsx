import { component$, type HTMLAttributes } from "@builder.io/qwik";
import { LuGithub } from "@qwikest/icons/lucide";

interface GithubRepoButtonProps extends HTMLAttributes<HTMLButtonElement> {
  url?: string;
}

const twAnchor = [
  "inline-flex items-center gap-1 rounded-md",
  "border border-gray-500 bg-gray-300 px-2",
  "py-2 text-xs font-semibold text-black shadow-sm",
  "transition-colors hover:bg-gray-400",
  "focus-visible:ring-4 focus-visible:ring-gray-500",
  "focus-visible:outline-none",
].join(" ");

export const GithubRepoButton = component$<GithubRepoButtonProps>(
  ({ url }) =>
    url && (
      <a class={twAnchor} href={url} target="_blank">
        <LuGithub class="text-color-black h-4 w-4" />
        &nbsp;<span>GitHub Repo</span>
      </a>
    ),
);

export const GitHubNavButton = component$<{ url?: string }>(
  ({ url }) =>
    url && (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        class={[
          "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full",
          "border border-zinc-700 px-4 text-sm font-medium text-zinc-300",
          "transition-colors hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        ].join(" ")}
      >
        <span>GitHub</span>
        <LuGithub class="size-4" aria-hidden="true" />
      </a>
    ),
);
