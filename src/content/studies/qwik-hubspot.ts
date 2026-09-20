import type { CaseStudy } from "../types";

export default {
  slug: "qwik-hubspot",
  path: "/work/qwik-hubspot/",
  category: "Web performance and CRM automation",
  title: "Replacing WordPress and automating HubSpot leads",
  description:
    "How I rebuilt an underperforming website in Qwik and connected enquiries, attribution and ownership directly to HubSpot.",
  introduction:
    "The old website was slow, difficult to change and disconnected from the commercial systems that needed its enquiries. The important result was making customer intent traceable from submission onward.",
  featured: true,
  metrics: [
    { label: "Delivery", value: "3 months" },
    { label: "Lighthouse", value: "3 × 100" },
    { label: "Recorded leads", value: "~⅓ increase" },
    { label: "Platform", value: "Qwik + Azure" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "The WordPress site scored roughly 50–60 for performance and accessibility and about 40 for SEO. Minor content changes depended on a slow external contractor.",
        "Lead handling was fragmented across the website, social media, spreadsheets, presentations and email. Marketing and sales therefore lacked a complete record of response, attribution and conversion.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I selected the framework, rebuilt the main website, implemented the server-side HubSpot integration and deployed it to Azure within three months. A second developer owned the blog, and we integrated structured data, analytics isolation and final SEO work.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Qwik for the actual constraint",
          paragraphs: [
            "SEO and initial delivery were the priorities. Qwik provided server-rendered content without a large hydration step, document-head control and Partytown isolation for analytics scripts.",
          ],
        },
        {
          title: "Server-side HubSpot integration",
          paragraphs: [
            "The backend normalised form data, matched contacts by name, phone and email and created records only when needed. Campaign UTMs, referral codes and form origin travelled with each lead into round-robin ownership.",
          ],
        },
        {
          title: "One visible lead workflow",
          paragraphs: [
            "Offsite and social leads also had to enter HubSpot before progressing, removing spreadsheet and email hand-offs. Website attribution could then be assessed alongside qualified Aircall activity.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "The Azure-hosted site achieved Lighthouse scores of 100 for Performance, Accessibility and Best Practices. Technical SEO improved through server rendering, metadata, structured data and isolated analytics.",
        "Recorded daily leads increased by just under one-third without more campaign activity, exposing demand that had previously been invisible. Complaints from customers who received no response fell to almost none.",
      ],
    },
  ],
  technologies: [
    { label: "Front end", value: "Qwik, TypeScript, semantic HTML" },
    {
      label: "Performance",
      value: "SSR, resumability, Partytown, structured data",
    },
    { label: "CRM", value: "HubSpot APIs, matching, attribution, round robin" },
    { label: "Delivery", value: "Azure hosting, three-month replacement" },
  ],
  lesson:
    "The site scores mattered, but the commercially important change was connecting customer intent to a workflow the business could see, allocate and measure.",
  related: [
    { label: "CRM legacy integration", href: "/work/crm-legacy-integration/" },
  ],
} satisfies CaseStudy;
