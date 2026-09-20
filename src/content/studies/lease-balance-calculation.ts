import type { CaseStudy } from "../types";

export default {
  slug: "lease-balance-calculation",
  path: "/work/lease-balance-calculation/",
  category: "Performance and financial systems",
  title: "Replacing a blocking lease-balance batch with on-demand calculation",
  description:
    "How I reverse-engineered more than 12,000 lines of financial SQL and made current balances available without locking the system.",
  introduction:
    "One customer asking for a current balance depended on a calculation that updated every eligible lease and made the system unavailable for an average of 34 minutes.",
  featured: true,
  metrics: [
    { label: "Before", value: "34 minutes" },
    { label: "Per lease", value: "~30 ms" },
    { label: "SQL reviewed", value: "12,000+ lines" },
    { label: "Deficits found", value: "$528k" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "A single poorly documented stored procedure calculated all lease balances, locked the application during its 34-minute run and left figures stale between payroll imports.",
        "The procedure mixed active vehicle-lease rules with obsolete salary-packaging logic and contained 36 unexplained constants. Financial equivalence had to be proven before performance could be improved safely.",
      ],
    },
    {
      title: "Responsibility",
      bullets: [
        "Separate active rules from unreachable historical code.",
        "Map calculation boundaries and clarify financial constants.",
        "Preserve results while introducing modular execution.",
        "Support both individual requests and required overnight batches.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Repeatable investigation",
          paragraphs: [
            "I built a Docker-based database with 150 active and 50 reconciled ended leases. VS Code database debugging and breakpoints let me trace the procedure repeatedly in seconds rather than waiting for full production-scale runs.",
          ],
        },
        {
          title: "Incremental modularisation",
          paragraphs: [
            "I isolated FBT, LCA, lease-type, operating-cost and transaction-replay logic. After each change, original and modified procedures ran against the same data and every difference was investigated.",
          ],
        },
        {
          title: "Separate individual and batch work",
          paragraphs: [
            "An individual calculation ran in approximately 20 ms in SQL and 30 ms through the monitored Node.js API. Required full batches fell to 12–13 minutes and moved to a scheduled 1:00 am process.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "Customers and staff could request current balances without triggering a database-wide calculation or business-hours lockout.",
        "The investigation also uncovered approximately $528,000 in negative balances on closed leases. A weekly deficit report and a $2,000 balance limit were introduced, and the accounts team later recovered just over half of the identified total.",
      ],
    },
  ],
  technologies: [
    {
      label: "Database",
      value: "MSSQL, stored procedures, functions, debugging",
    },
    { label: "Application", value: "TypeScript, Node.js, API orchestration" },
    { label: "Environment", value: "Docker, representative lease data" },
    {
      label: "Validation",
      value: "Side-by-side output comparison, reconciled balances",
    },
  ],
  lesson:
    "The difficult part was not making SQL faster; it was creating enough evidence to change a financial calculation safely, one verified boundary at a time.",
  related: [
    {
      label: "Customer finance portal",
      href: "/work/customer-finance-portal/",
    },
  ],
} satisfies CaseStudy;
