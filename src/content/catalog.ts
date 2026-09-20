import type { CaseStudySummary } from "./types";

export const caseStudySummaries: CaseStudySummary[] = [
  {
    slug: "customer-finance-portal",
    path: "/work/customer-finance-portal/",
    category: "Full-stack product delivery",
    title: "Secure customer finance portal",
    description:
      "How I replaced external access to a vulnerable legacy platform with a secure customer finance portal for more than 5,000 users.",
    featured: true,
    evidence: ["5,000+ customers", "8-month delivery"],
  },
  {
    slug: "customer-migration",
    path: "/work/customer-migration/",
    category: "Identity and migration",
    title: "Migrating 5,000 customers without a blanket password reset",
    description:
      "How I combined pre-migration with just-in-time credential upgrading to move customers safely from SHA-1 to Argon2.",
    featured: true,
    evidence: ["5,000+ accounts", "SHA-1 → Argon2"],
  },
  {
    slug: "step-up-authentication",
    path: "/work/step-up-authentication/",
    category: "Application security",
    title: "Step-up authentication for sensitive customer actions",
    description:
      "How I added recent identity assurance around high-risk actions while keeping ordinary portal use straightforward.",
    featured: true,
    evidence: ["Server enforced", "Five-minute approval"],
  },
  {
    slug: "crm-legacy-integration",
    path: "/work/crm-legacy-integration/",
    category: "Legacy integration",
    title: "Connecting a custom CRM to legacy business systems",
    description:
      "How I inherited an undocumented sales CRM and connected lead, quote and lease workflows across three isolated business systems.",
    featured: true,
    evidence: ["Three systems", "~⅓ retention uplift"],
  },
  {
    slug: "lease-balance-calculation",
    path: "/work/lease-balance-calculation/",
    category: "Performance and financial systems",
    title:
      "Replacing a blocking lease-balance batch with on-demand calculation",
    description:
      "How I reverse-engineered more than 12,000 lines of financial SQL and made current balances available without locking the system.",
    featured: true,
    evidence: ["34 min → 30 ms", "$528k identified"],
  },
  {
    slug: "qwik-hubspot",
    path: "/work/qwik-hubspot/",
    category: "Web performance and CRM automation",
    title: "Replacing WordPress and automating HubSpot leads",
    description:
      "How I rebuilt an underperforming website in Qwik and connected enquiries, attribution and ownership directly to HubSpot.",
    featured: true,
    evidence: ["Three Lighthouse 100s", "~⅓ more recorded leads"],
  },
  {
    slug: "ransomware-recovery",
    path: "/work/ransomware-recovery/",
    category: "Incident response",
    title: "Ransomware response and critical-system recovery",
    description:
      "My contribution to containing a ransomware incident, restoring end-user systems and investigating how the compromise occurred.",
    featured: false,
    evidence: ["Overnight recovery", "Parallel workstreams"],
  },
  {
    slug: "access-control-demo",
    path: "/work/access-control-demo/",
    category: "Inspectable portfolio system",
    title: "Live access-control portfolio application",
    description:
      "A focused application that lets employers inspect role, ownership and database enforcement rather than relying only on résumé claims.",
    featured: true,
    evidence: ["PostgreSQL RLS", "Azure + Bicep"],
  },
];

export const commercialEngineeringSummary: CaseStudySummary = {
  slug: "commercial-engineering",
  path: "/about/commercial-engineering/",
  category: "Commercial engineering",
  title: "How sales leadership made me a better developer",
  description:
    "Why my earlier commercial experience helps me uncover the real workflow problem and build software people will adopt.",
  featured: false,
  evidence: ["Workflow discovery", "~98% resolved"],
};
