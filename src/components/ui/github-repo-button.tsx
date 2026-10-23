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

export const GithubRepoButton = component$(({ url }: GithubRepoButtonProps) => {
  if (!url) return;
  return (
    <a class={twAnchor} href={url} target="_blank">
      <LuGithub />
      &nbsp;<span>GitHub Repo</span>
    </a>
  );
});
