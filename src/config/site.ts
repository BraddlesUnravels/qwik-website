export const siteConfig = {
  name: "Bradley Laskey",
  title: "Bradley Laskey | Full Stack Developer",
  description:
    "Full-stack developer building secure customer applications, modernising legacy systems and connecting production workflows.",
  url: "https://REPLACE-WITH-FINAL-DOMAIN",
  email: "bradley.laskey1990@gmail.com",
  resumePath: "/Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf",
  socialImagePath: "/social/portfolio-og.jpg",
} as const;

export const absoluteUrl = (path: string) =>
  new URL(path, siteConfig.url).toString();
