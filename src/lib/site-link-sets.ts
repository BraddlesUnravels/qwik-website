import type { JSXNode } from "@builder.io/qwik";
import type { IconProps } from "@qwikest/icons";
import { LuDownload } from "@qwikest/icons/lucide";

interface NavLink {
  label: string;
  href: string;
  icon?: (props: IconProps) => JSXNode;
  download?: boolean;
  type: "link" | "anchor";
}
export const navLinks: NavLink[] = [
  {
    label: "Résumé",
    href: "/Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf",
    type: "anchor",
    icon: LuDownload,
    download: true,
  },
  {
    label: "Projects",
    href: "/#selected-work",
    type: "link",
  },
  {
    label: "Approach",
    href: "/about/commercial-engineering",
    type: "link",
  },
  {
    label: "Contact",
    href: "mailto:bradley.laskey1990@gmail.com",
    type: "anchor",
  },
];
