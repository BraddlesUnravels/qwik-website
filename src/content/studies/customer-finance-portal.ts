import type { CaseStudy } from "../types";

export default {
  slug: "customer-finance-portal",
  path: "/work/customer-finance-portal/",
  category: "Full-stack product delivery",
  title: "Secure customer finance portal",
  description:
    "How I replaced external access to a vulnerable legacy platform with a secure customer finance portal for more than 5,000 users.",
  introduction:
    "I designed and delivered a secure customer finance portal that removed customer-facing access from a vulnerable legacy platform without taking the business-critical lease-management system itself offline.",
  featured: true,
  metrics: [
    { label: "Customers", value: "5,000+" },
    { label: "Delivery", value: "8 months" },
    { label: "Responsibility", value: "End to end" },
    { label: "Platform", value: "React + Node.js" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "A security review identified vulnerabilities ranging from low to critical in the existing lease-management platform. Thirteen dependencies were deprecated and unsupported, but the application still held customer accounts, financial balances and historical transactions and could not simply be switched off.",
        "The customer portal was part of the same platform. Removing external access therefore risked taking away lease information, claims, documents and support functions used by thousands of customers.",
        "The portal also relied on forgettable four-digit identifiers, displayed balances that could remain stale until a batch process ran and forced routine account changes through manual support workflows.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I worked with the board to define a first release focused on reducing the external attack surface while preserving the lease platform the business still required. I owned the work from discovery and architecture through implementation, deployment and production support.",
      ],
      bullets: [
        "Mapped legacy database interactions, stored procedures and server calculations.",
        "Designed the portal data model, REST API and customer journeys.",
        "Built the React client and Node.js API, including authentication and authorisation.",
        "Established staging, CI/CD, monitoring and Azure infrastructure.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "A controlled boundary around the legacy platform",
          paragraphs: [
            "Approximately 98% of the required data already lived in MSSQL. I added clearly owned tables for portal users, credentials, MFA, preferences, activity and reporting while keeping controlled access to the lease data the business depended on.",
            "Where legacy stored procedures remained necessary, I treated them as explicit integration boundaries and added targeted indexes for transaction access.",
          ],
        },
        {
          title: "Workflows verified before implementation",
          paragraphs: [
            "I mapped customer and staff workflows, listened to customer calls and moved prototypes through directors, department heads and frontline users. Requests were assessed against the release goal so useful improvements did not turn the project into an unrestricted redesign.",
          ],
        },
        {
          title: "Secure self-service",
          bullets: [
            "Email-based sign-in and migration from legacy hashes to Argon2.",
            "JWT invitations, email and SMS MFA, password recovery and step-up authentication.",
            "Current balances, transactions and budget-allocation visualisations.",
            "Claims, secure documents, customer messaging and self-service account changes.",
          ],
        },
        {
          title: "Production delivery",
          paragraphs: [
            "The release used Docker, GitHub Actions, Azure Bicep, a dedicated staging environment, Sentry and Grafana. Employees who also held leases validated the production journey before public cutover.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "The portal entered production in November 2024 and moved more than 5,000 customers. Customers gained current balances, clearer budgets, secure document access and self-service account changes.",
        "Calls about forgotten four-digit usernames fell to almost none, and staff no longer needed to prepare repeated emails or explain stale figures. Most importantly, the business disabled external access to the vulnerable legacy portal while retaining the internal platform it still needed.",
      ],
    },
  ],
  technologies: [
    { label: "Front end", value: "TypeScript, React 19, Redux, Material UI" },
    { label: "Back end", value: "Node.js, Express.js, REST APIs" },
    { label: "Data", value: "MSSQL, stored procedures, targeted indexing" },
    { label: "Security", value: "JWT, MFA, Argon2, step-up authentication" },
    {
      label: "Delivery",
      value: "Docker, GitHub Actions, Bicep, Azure, Sentry, Grafana",
    },
  ],
  related: [
    { label: "Customer migration", href: "/work/customer-migration/" },
    { label: "Step-up authentication", href: "/work/step-up-authentication/" },
    {
      label: "Lease balance calculation",
      href: "/work/lease-balance-calculation/",
    },
  ],
} satisfies CaseStudy;
