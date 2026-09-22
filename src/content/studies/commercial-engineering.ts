import type { CaseStudy } from "../types";

export default {
  slug: "commercial-engineering",
  path: "/about/commercial-engineering/",
  category: "How I work",
  title: "What sales leadership taught me about building software",
  description: `
      I use operational questions, workflow mapping and commercial context to work out 
      what software actually needs to change and how it will be adopted by users.
    `,
  introduction: `
      My earlier sales-management experience helps me distinguish a requested feature from the underlying problem. 
      One CRM reporting project shows why that matters: the reports & dashboards were being asked to report on 
      leads the business had never recorded.
    `,
  featured: false,
  metrics: [
    { label: "Initial request", value: "Fix the reports" },
    { label: "Underlying issue", value: "Missing lead data" },
    { label: "Focus", value: "Workflow + adoption" },
    { label: "Teams", value: "Sales and marketing" },
  ],
  sections: [
    {
      title: "The request",
      paragraphs: [
        `
          Sales and marketing believed their reports & dashboards were incorrect. Marketing wanted to 
          follow a lead to its source, client company and outcome. Sales wanted dependable conversion and commission reporting. 
          It would have been easy to start by editing a dashboard or its calculations.
        `,
      ],
    },
    {
      title: "What I investigated",
      paragraphs: [
        `
          I asked marketing how leads reached agents and asked sales what happened after a lead was allocated. 
          Website enquiries already entered the CRM, but social-media and offsite leads often arrived through 
          spreadsheets, email, MS Teams or direct hand-offs. Agents also avoided entering the same customer 
          details into both PipelineAxis and QuoteCore.
        `,
        `
          I mapped those real workflows with department heads, including where each report obtained its data. 
          Where needed I stepped through the entry fields in each system where data being captured impacted reporting outcomes.
          The reports were largely showing the records they had recorded; the missing records and unlinked 
          stages were the more important problem.
        `,
      ],
    },
    {
      title: "What I changed",
      subsections: [
        {
          title: "Make the required data useful to the people entering it",
          paragraphs: [
            `
              I made quote and commission information clearer in each agent’s 
              PipelineAxis profile, so agents could see why a complete lead origin 
              mattered to their own tracking. I also made it possible to transfer 
              customer details from PipelineAxis into QuoteCore instead of retyping them.
            `,
          ],
        },
        {
          title: "Resolve a real trade-off between data quality and privacy",
          paragraphs: [
            `
              Marketing needed to identify the customer’s employer, but a public dropdown of all 
              client companies would have exposed a commercially sensitive client list or forcing 
              customners to enter thier work email addresses. 
              The balance was between data quality and privacy. I changed the workflow to request a work email 
              to support automatic company matching on domain, while still accepting personal addresses; 
              the agent supplied an employer when no reliable match was available.
            `,
          ],
        },
        {
          title: "Make the workflow the default",
          paragraphs: [
            `
              I worked with the QuoteCore system owner so agents could create linked quotes directly from PipelineAxis 
              leads then have the linked QuoteCore record automatically open on thier screen. 
              This enabled marketing to follow lead outcomes while reducing duplicated work for sales.
            `,
          ],
        },
      ],
    },
    {
      title: "What changed",
      paragraphs: [
        `
          Sales could enter the core information once and see a clearer connection between complete records and commission tracking. 
          Marketing gained better visibility of lead origins and associated companies. These changes addressed roughly 98% of the 
          reporting issues related to lead origin and employer matching; this demonstrates the effectiveness of the workflow improvements.
        `,
        `
          The wider lesson is practical: before building the requested fix, find out how people actually perform the work 
          and what would make the improved workflow worth using.
        `,
      ],
    },
  ],
  technologies: [
    {
      label: "Systems",
      value: "PipelineAxis CRM, QuoteCore, React, Node.js, MSSQL",
    },
    { label: "Methods", value: "Stakeholder interviews, workflow mapping" },
    {
      label: "Integration",
      value: "Linked quote hand-off, shared identifiers",
    },
    {
      label: "Business context",
      value: "Commission visibility, lead attribution, employer matching",
    },
  ],
  related: [
    {
      label: "PipelineAxis CRM integration",
      href: "/work/crm-legacy-integration/",
    },
  ],
} satisfies CaseStudy;
