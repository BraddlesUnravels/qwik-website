interface NavLink {
  label: string;
  href: string;
  type: "link" | "anchor";
}
export const navLinks: NavLink[] = [
  {
    label: "Work",
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
