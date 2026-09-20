import type { CaseStudy } from "../types";

export default {
  slug: "crm-legacy-integration",
  path: "/work/crm-legacy-integration/",
  category: "Legacy integration",
  title: "Connecting a custom CRM to legacy business systems",
  description:
    "How I inherited an undocumented sales CRM and connected lead, quote and lease workflows across three isolated business systems.",
  introduction:
    "The reported problem was inaccurate dashboards. The underlying problem was that leads, quotes and lease outcomes moved through three isolated systems with repeated manual hand-offs.",
  featured: true,
  metrics: [
    { label: "Systems", value: "3 connected" },
    { label: "Retention", value: "~⅓ uplift" },
    { label: "Reporting", value: "End to end" },
    { label: "Stack", value: "React + MSSQL" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "I inherited a custom CRM with four vague pages of documentation. It operated beside an installed C# quoting application and a .NET lease-management platform, each backed by a separate database on the same SQL Server.",
        "Customer details were entered repeatedly, hand-offs occurred through shared inboxes and staff searched multiple systems to reconstruct customer status. Reports reflected incomplete and inconsistently linked data rather than a single observable workflow.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I mapped the applications and interviewed users across sales, marketing, operations, accounts, management and the board. I established where data originated, which system should own each stage and where integration could remove duplicate work without destabilising critical applications.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Bring web leads directly into the CRM",
          paragraphs: [
            "I added an authenticated lead endpoint and connected website submissions to workload-aware allocation, replacing inbox-based handling with a visible record.",
          ],
        },
        {
          title: "Create a reliable end-of-lease workflow",
          paragraphs: [
            "A new CRM module combined lease data with recent quote activity, excluded ended or already-refinanced leases and created opportunities up to three months before expiry.",
          ],
        },
        {
          title: "Link leads to quotes",
          paragraphs: [
            "A controlled stored-procedure boundary transferred required customer data into the quoting database and returned the new quote identifier to the CRM. Disabling manual quote creation prevented leads from bypassing traceability.",
          ],
        },
        {
          title: "Make reporting honest",
          paragraphs: [
            "Including previously invisible leads initially reduced reported conversion by nine percentage points. I explained that this was an accuracy correction, not a sudden performance decline, giving leadership reliable data to improve.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "The integrations created a traceable path from enquiry through quote and settled lease. Duplicate entry fell, attribution improved and sales management could see work that had not progressed.",
        "The end-of-lease workflow helped increase retention by nearly one-third. Conversion later recovered by more than the initial nine-point drop using the more complete data.",
      ],
    },
  ],
  technologies: [
    {
      label: "CRM",
      value: "TypeScript, React, Redux, Node.js, Express.js, MSSQL",
    },
    {
      label: "Legacy",
      value: "C# desktop client, .NET application, SQL Server",
    },
    {
      label: "Integration",
      value: "REST, stored procedures, linked identifiers",
    },
    {
      label: "Delivery",
      value: "User discovery, staged releases, staff training",
    },
  ],
  lesson:
    "An inaccurate dashboard can be a data-capture problem wearing a reporting label. The process had to become observable before the report could become trustworthy.",
  related: [
    { label: "Commercial engineering", href: "/about/commercial-engineering/" },
    { label: "Qwik and HubSpot", href: "/work/qwik-hubspot/" },
  ],
} satisfies CaseStudy;
