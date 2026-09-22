import type { CaseStudy } from "../types";

export default {
  slug: "crm-legacy-integration",
  path: "/work/crm-legacy-integration/",
  category: "Business systems integration",
  title: "Connecting the lead-to-lease journey across three systems",
  description: "I inherited a thinly documented CRM and built practical connections to a desktop quoting tool and a legacy lease-management platform.",
  introduction: "Customer information started in PipelineAxis CRM, was re-entered into PackEdge to prepare a quote and eventually reached LeaseCore once the lease settled. Each hand-off created another opportunity for lost leads, inconsistent records and incomplete reporting.",
  featured: true,
  metrics: [
    { label: "Systems", value: "PipelineAxis, PackEdge, LeaseCore" },
    { label: "Reported conversion", value: "–9 points at first" },
    { label: "Expiry pipeline", value: "Up to 3 months ahead" },
    { label: "Approach", value: "Incremental integration" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        "I inherited PipelineAxis with very little useful documentation. Users across sales, marketing, operations and management depended on three separate systems that shared a SQL Server instance but not a coherent customer workflow. Sales agents re-entered details into PackEdge, teams coordinated hand-offs through shared email inboxes and reports could not reliably follow an enquiry through to a settled lease.",
      ],
    },
    {
      title: "My role",
      paragraphs: [
        "I traced the actual workflows with staff, mapped where each system stored and changed records, developed the CRM-side integrations and worked with the IT manager, who owned PackEdge, on the quoting-system changes. I did not replace all three platforms; I connected the steps the business needed while leaving their critical existing operations intact.",
      ],
    },
    {
      title: "What I changed",
      subsections: [
        {
          title: "Bring website enquiries into the CRM",
          paragraphs: [
            "I created a lead endpoint in PipelineAxis and connected the then-WordPress website through a custom PHP server action. Website submissions entered PipelineAxis’s existing workload-aware allocation process instead of an inbox. This was an earlier integration, separate from the later Qwik and HubSpot rebuild.",
          ],
        },
        {
          title: "Find refinance opportunities from more than one source",
          paragraphs: [
            "I built a PipelineAxis module that combined LeaseCore lease dates and statuses with quote activity in PackEdge. It excluded leases already ended or being refinanced and could assign upcoming opportunities to an agent up to three months before expiry. This avoided modifying an undocumented report inside LeaseCore.",
          ],
        },
        {
          title: "Create a linked quote without retyping the lead",
          paragraphs: [
            "I mapped customer fields from PipelineAxis to PackEdge and built the CRM-side transfer. The IT manager added the corresponding PackEdge stored procedure, quote reference field and restriction on manual quote creation. An agent could create a quote from a PipelineAxis lead and receive its new quote ID back in the CRM.",
          ],
        },
        {
          title: "Explain the reporting change",
          paragraphs: [
            "Once leads that previously disappeared before quoting became visible, the reported conversion rate initially fell by nine percentage points. I explained to management that the denominator had changed: the new report included enquiries the previous workflow had not recorded.",
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        "The business could trace an enquiry through quote creation and into the settled lease workflow with less repeated entry. The refinance process made upcoming customer contacts visible and was associated with a reported increase in retention of nearly one-third.",
        "The conversion-rate drop was an improvement in measurement coverage, not evidence that sales performance had suddenly deteriorated.",
      ],
    },
  ],
  technologies: [
    { label: "CRM", value: "React, Redux, Node.js, Express.js, MSSQL" },
    { label: "Legacy systems", value: "C# desktop quoting client, .NET lease platform" },
    { label: "Integration", value: "Authenticated endpoint, cross-database stored procedure" },
    { label: "Discovery", value: "Stakeholder interviews, workflow and reporting mapping" },
  ],
  related: [
    { label: "Commercial engineering", href: "/about/commercial-engineering/" },
    { label: "Qwik and HubSpot", href: "/work/qwik-hubspot/" },
  ],
} satisfies CaseStudy;
