import type { CaseStudy } from "../types";

export default {
  slug: "crm-legacy-integration",
  path: "/work/crm-legacy-integration/",
  category: "Business systems integration",
  title: "Connecting the lead-to-lease journey across three systems",
  description: `
      I inherited a thinly documented CRM and built practical connections 
      to a legacy desktop quoting tool and a legacy lease-management platform.
    `,
  introduction: `
      Customer information started in PipelineAxis CRM, then re-entered into QuoteCore 
      to prepare a quote that eventually reached LeaseCore if & when the lease settled. 
      Each hand-off created another opportunity for lost leads, inconsistent records and incomplete reporting.
    `,
  featured: true,
  metrics: [
    { label: "Systems", value: "PipelineAxis, QuoteCore, LeaseCore" },
    { label: "Reported conversion", value: "–9 points at first" },
    { label: "Expiry pipeline", value: "Up to 3 months ahead" },
    { label: "Approach", value: "Incremental integration" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
          I inherited PipelineAxis with very little useful documentation. Users across sales, marketing, 
          operations and management depended on three separate systems that shared an SQL Server instance 
          but not a coherent customer workflow. Sales agents and management frequently bypassed PipelineAxis 
          and entered details directly into QuoteCore, teams & departments coordinated hand-offs through shared email 
          inboxes, MS Teams channels and other ad-hoc communication. These factors combined with the fact that none 
          of these systems passed identifiers to the others, it was virtually impossible to track leads, and reports 
          to be inaccurate. There was no reliable way to follow an enquiry through to a settled lease reliably
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I traced the actual workflows with staff, mapped where each system stored and changed records, 
          developed the CRM-side integrations and worked with the IT manager, who owned QuoteCore and 
          coordinated the disabling of direct quote entry into QuoteCore. These acted as guardrails 
          supporting the intented business workflow; I did not replace all three platforms; 
          I connected the steps the business needed while leaving their critical existing operations intact.
        `,
      ],
    },
    {
      title: "What I changed",
      subsections: [
        {
          title: "Bring website enquiries into the CRM",
          paragraphs: [
            `
              I created a web lead endpoint in PipelineAxis and connected the then-WordPress website through 
              a custom PHP server action making an HTTP POST request to the web lead endpoint. 
              Website submissions entered PipelineAxis’s existing workload-aware allocation process instead 
              of an inbox or team channel. This was an earlier integration, separate from the later Qwik 
              and HubSpot rebuild.
            `,
          ],
        },
        {
          title: "Find refinance opportunities from more than one source",
          paragraphs: [
            `
              I built a PipelineAxis module that combined LeaseCore lease dates and statuses with quote activity in QuoteCore. 
              It excluded leases already ended or being refinanced and could assign upcoming opportunities to an agent up to 
              three months before expiry. This avoided modifying an undocumented report inside LeaseCore.
            `,
          ],
        },
        {
          title: "Create a linked quote without retyping the lead",
          paragraphs: [
            `
              I mapped customer fields from PipelineAxis to QuoteCore and made the necessary UI refactor to support the 
              new integration along with the necessary backend logic to handle the quote creation and retrieval process.
              The IT manager added the corresponding QuoteCore procedure, lead reference linkage and restriction on 
              manual quote creation. An agent could now create a quote from a PipelineAxis lead and receive its new 
              quote ID back in the agents UI.
            `,
          ],
        },
        {
          title: "Explain the reporting change",
          paragraphs: [
            `
              Once leads that previously disappeared before quoting became visible, the reported conversion rate 
              initially fell by nine percentage points. I explained to management that the denominator had changed: 
              the new report included enquiries the previous workflow had not recorded.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          The business could trace a lead through quote creation and into the settled lease management system 
          and with less manual duplicate data entry. The refinance process made upcoming customer contacts visible 
          and was associated with a reported increase in retention of nearly one-third.
        `,
        `
          The conversion-rate drop was an improvement in measurement coverage, not evidence that sales 
          performance had suddenly deteriorated.
        `,
      ],
    },
  ],
  technologies: [
    { label: "CRM", value: "React, Redux, Node.js, Express.js, MSSQL" },
    {
      label: "Legacy systems",
      value: "C# desktop quoting client, .NET lease platform",
    },
    {
      label: "Integration",
      value: "Authenticated endpoint, cross-database stored procedure",
    },
    {
      label: "Discovery",
      value: "Stakeholder interviews, workflow and reporting mapping",
    },
  ],
  related: [
    { label: "Commercial engineering", href: "/about/commercial-engineering/" },
    { label: "Qwik and HubSpot", href: "/work/qwik-hubspot/" },
  ],
} satisfies CaseStudy;
