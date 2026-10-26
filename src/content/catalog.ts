import type { ProjectSummary } from "./types";

// Order reflects the recommended work-page reading path.
export const projectSummaries: ProjectSummary[] = [
  {
    slug: "autodash",
    path: "/projects/autodash",
    category: "Full-stack product delivery",
    title: "LeaseTrack: a new portal around a legacy lease platform",
    description:
      "I built a customer finance portal that let the business withdraw public access to an ageing platform without retiring the system it still depended on.",
    featured: true,
    evidence: ["5,000+ migrated", "8 months"],
  },
  {
    slug: "access-control-demo",
    path: "/projects/access-control-demo",
    category: "Inspectable full-stack application",
    title: "Access Control Demo: security you can inspect",
    description:
      "I built a small, deployed application so employers can test permissions and follow the enforcement from the interface to the API, database and tests.",
    featured: true,
    evidence: ["2 students + 1 admin", "PostgreSQL RLS"],
  },
  {
    slug: "lease-balance-calculation",
    path: "/projects/lease-balance-calculation",
    category: "Legacy modernisation",
    title: "Making lease balances available without a 34-minute lockout",
    description:
      "I untangled a 12,000-line SQL calculation, separated the business rules and made individual lease balances available on demand.",
    featured: false,
    evidence: ["12,000+ lines", "~34 minutes"],
  },
  {
    slug: "crm-legacy-integration",
    path: "/projects/crm-legacy-integration",
    category: "Business systems integration",
    title: "Connecting the lead-to-lease journey across three systems",
    description:
      "I inherited a thinly documented CRM and built practical connections to a desktop quoting tool and a legacy lease-management platform.",
    featured: false,
    evidence: ["PipelineAxis, PackEdge, LeaseCore", "–9 points at first"],
  },
  {
    slug: "site-rebuild",
    path: "/projects/site-rebuild",
    category: "Web development and CRM automation",
    title: "Rebuilding a WordPress site and connecting leads to HubSpot",
    description:
      "I rebuilt the public website in Qwik and implemented a server-side lead flow that made enquiries and campaign attribution easier to follow.",
    featured: true,
    evidence: ["3 months", "100 in 3 categories"],
  },
  {
    slug: "autodash-migration",
    path: "/projects/autodash-migration",
    category: "Identity and migration",
    title: "Moving 5,000+ accounts without a blanket password reset",
    description:
      "I pre-migrated eligible customer accounts, then upgraded each password from a legacy SHA-1 hash to Argon2 when its owner returned.",
    featured: true,
    evidence: ["5,000+", "SHA-1"],
  },
  {
    slug: "step-up-authentication",
    path: "/projects/step-up-authentication",
    category: "Application security",
    title: "Step-up authentication without interrupting routine portal use",
    description:
      "I added fresh identity checks to sensitive customer actions and enforced them at the API, not just in the React interface.",
    featured: false,
    evidence: ["5 minutes", "6-digit code"],
  },
  {
    slug: "ransomware-recovery",
    path: "/projects/ransomware-recovery",
    category: "Incident response",
    title: "Helping restore critical systems after a ransomware incident",
    description:
      "I handled initial containment, owned network and workstation restoration, and worked with an external specialist on the subsequent investigation.",
    featured: false,
    evidence: ["Containment", "Parallel workstreams"],
  },
];

export const engineeringApproach: ProjectSummary = {
  slug: "about-approach",
  path: "/about/approach",
  category: "How I work",
  title: "What sales leadership taught me about building software",
  description:
    "I use operational questions, workflow mapping and commercial context to work out what software actually needs to change.",
  featured: false,
  evidence: ["Fix the reports", "Missing lead data"],
};
