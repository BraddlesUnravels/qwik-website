import type { DocumentHeadValue } from "@builder.io/qwik-city";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

const siteName = "Bradley Laskey — Full Stack Developer";
const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, "");

export const createSeoHead = ({
  title,
  description,
  path,
  type = "website",
}: SeoInput): DocumentHeadValue => {
  const canonicalUrl = configuredSiteUrl
    ? `${configuredSiteUrl}${path}`
    : undefined;

  return {
    title: `${title} | Bradley Laskey`,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: siteName },
      ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
  };
};
