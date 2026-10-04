import { component$ } from "@builder.io/qwik";
import { Container } from "../ui/container";
import { siteConfig } from "~/config/site";
import {
  LuGithub,
  LuLinkedin,
  LuMail,
  LuDownload,
} from "@qwikest/icons/lucide";
import { SeekIcon } from "../ui/seek-icon";
import { Typography } from "../ui/typography";
import { version } from "../../../package.json";

const year = new Date().getFullYear();

const socialLinks = [
  {
    icon: LuGithub,
    href: siteConfig.github,
    label: "GitHub",
  },
  {
    icon: LuLinkedin,
    href: siteConfig.linkedin,
    label: "LinkedIn",
  },
  {
    icon: SeekIcon,
    href: siteConfig.seek,
    label: "Seek",
  },
  {
    icon: LuMail,
    href: `mailto:${siteConfig.email}`,
    label: "Email",
  },
  {
    icon: LuDownload,
    href: siteConfig.resumePath,
    label: "Download Résumé",
  },
];

export default component$(() => {
  return (
    <footer class="border-t border-zinc-800">
      <Container>
        <div class="flex items-center py-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-8">
          <div id="site-footer-author" class="hidden flex-col gap-1 lg:flex">
            <Typography variant="small" tone="default" class="text-zinc-100">
              Bradley Laskey
            </Typography>
            <Typography variant="small" tone="default" class="text-zinc-100">
              Full Stack Developer
            </Typography>
          </div>
          <div
            id="site-footer-social-links"
            class="flex w-full min-w-0 flex-row items-center justify-between lg:flex-col lg:items-stretch"
          >
            <div class="flex min-w-0 flex-1 flex-nowrap justify-between gap-3 overflow-x-auto text-xs sm:justify-start sm:gap-5 sm:text-sm lg:mt-0.5 lg:justify-end">
              {socialLinks.map((link) => (
                <div key={link.label} class="shrink-0">
                  <a
                    href={link.href}
                    target="_blank"
                    class="flex flex-row items-center text-zinc-400 hover:text-zinc-100"
                  >
                    <link.icon class="h-5 w-5" />
                    <span class="ml-2">{link.label}</span>
                  </a>
                </div>
              ))}
            </div>
            <div id="site-footer-version" class="hidden justify-end sm:flex">
              <Typography
                id="site-footer-version"
                variant="small"
                tone="muted"
                class="mt-0.5 text-zinc-100"
              >
                {year} ·{" "}
                <span class="hidden md:inline lg:hidden">Bradley Laskey</span> v
                {version}
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
});
