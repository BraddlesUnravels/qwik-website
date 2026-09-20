import type { CaseStudy } from "../types";

export default {
  slug: "commercial-engineering",
  path: "/about/commercial-engineering/",
  category: "Commercial engineering",
  title: "How sales leadership made me a better developer",
  description:
    "Why my earlier commercial experience helps me uncover the real workflow problem and build software people will adopt.",
  introduction:
    "My earlier sales and leadership experience changed how I approach software: a feature request is evidence to investigate, not necessarily the real requirement.",
  featured: false,
  metrics: [
    { label: "Initial request", value: "Fix reports" },
    { label: "Actual issue", value: "Missing data" },
    { label: "Stakeholders", value: "4 groups" },
    { label: "Problems resolved", value: "~98%" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Sales and marketing believed their reports were wrong. Marketing needed source, pipeline and client-company visibility; sales needed defensible conversion and commission figures.",
        "Tracing the inputs showed that leads moved through spreadsheets, email and face-to-face hand-offs. Agents also avoided entering the same customer into both the CRM and quoting application. The reports were being asked to analyse records that often did not exist.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I aligned the groups around the minimum information each needed, determined where it should be captured and designed a workflow staff had a practical reason to follow without exposing commercially sensitive client information.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Investigate the real process",
          paragraphs: [
            "I mapped documented and actual behaviour with department heads. Once everyone could see that a dashboard cannot reconstruct data that was never recorded, the discussion moved from blame to shared requirements.",
          ],
        },
        {
          title: "Design for adoption",
          paragraphs: [
            "Commission visibility made complete lead origins meaningful to agents, while one-action transfer into the quoting application removed most duplicate entry.",
          ],
        },
        {
          title: "Balance matching with confidentiality",
          paragraphs: [
            "Work-email domains provided the strongest automatic employer match without publishing the client list. Personal addresses remained accepted, with a manual fallback before progression.",
          ],
        },
        {
          title: "Guard the hand-off",
          paragraphs: [
            "Leads began in the CRM and manual quote creation outside the linked workflow was disabled. Marketing gained traceability while sales entered core details once.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "The changes resolved approximately 98% of reporting problems related to lead origin and employer matching. Sales stopped duplicating core entry, marketing could track progress and the software, workflow and incentives began supporting the same result.",
      ],
    },
  ],
  technologies: [
    {
      label: "Systems",
      value: "React/Redux CRM, Node.js/Express, MSSQL, C# client",
    },
    {
      label: "Integration",
      value: "Stored-procedure hand-off, linked identifiers",
    },
    { label: "Discovery", value: "Interviews, observation, workflow mapping" },
    {
      label: "Change",
      value: "Commission visibility, data rules, reduced duplication",
    },
  ],
  lesson:
    "I am comfortable challenging a requested feature without dismissing the concern behind it and translating operational evidence into software people will adopt.",
  related: [
    { label: "CRM legacy integration", href: "/work/crm-legacy-integration/" },
  ],
} satisfies CaseStudy;
