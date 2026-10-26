import type { JSXNode } from "@builder.io/qwik";
import type { IconProps } from "@qwikest/icons";
import { LuDownload } from "@qwikest/icons/lucide";

interface NavLink {
  label: string;
  href: string;
  type: "link" | "anchor";
  icon?: (props: IconProps) => JSXNode;
  download?: string;
  prefetch?: boolean;
}
export const navLinks: NavLink[] = [
  {
    label: "Résumé",
    href: "/Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf",
    type: "link",
    icon: LuDownload,
    download: "Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf",
    prefetch: false,
  },
  {
    label: "Projects",
    href: "/#selected-projects",
    type: "link",
  },
  {
    label: "About",
    href: "/about/approach",
    type: "link",
  },
  {
    label: "Contact",
    href: "mailto:bradley.laskey1990@gmail.com",
    type: "anchor",
  },
];
