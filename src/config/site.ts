export const siteConfig = {
  name: "Bradley Laskey",
  title: "Bradley Laskey | Full Stack Developer",
  description:
    "Full-stack developer building secure customer applications, modernising legacy systems and connecting production workflows.",
  /**
   * Canonical origin is intentionally unset until a verified production domain
   * is configured and passed as PUBLIC_SITE_URL at Docker build time.
   * Do not invent an Azure FQDN or placeholder hostname here.
   */
  url: undefined as string | undefined,
  email: "bradley.laskey1990@gmail.com",
  resumePath: "/Bradley_Laskey_Full_Stack_Developer_Resume_2026.pdf",
  socialImagePath: "/social/portfolio-og.jpg",
} as const;

/**
 * Builds an absolute URL only when a verified canonical origin is configured.
 * Throws rather than emitting placeholder hostnames into public markup.
 */
export const absoluteUrl = (path: string): string => {
  if (!siteConfig.url) {
    throw new Error(
      "Site origin is not configured. Set a verified PUBLIC_SITE_URL before building absolute URLs.",
    );
  }

  return new URL(path, siteConfig.url).toString();
};
