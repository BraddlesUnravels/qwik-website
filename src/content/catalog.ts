import type { ProjectSummary } from "./types";

// Order reflects the recommended work-page reading path.
export const projectSummaries = [
  {
    slug: "autodash",
    path: "/projects/autodash",
    category: "Full-stack product delivery",
    title: "AutoDash · A new front door for 5,000+ customers",
    description: `
      LeaseCore had to stay. I built AutoDash so customers could manage their accounts while LeaseCore moved behind the scenes.
    `,
    featured: true,
    evidence: ["5,000+ migrated", "8 months"],
  },
  {
    slug: "access-control-demo",
    path: "/projects/access-control-demo",
    category: "Inspectable full-stack application",
    title: "Access Control Demo · What does each account do?",
    description:
      "Switch accounts in the live demo, try a forbidden action, and trace how the API, database and tests handle it.",
    featured: true,
    evidence: ["2 students + 1 admin", "PostgreSQL RLS"],
  },
  {
    slug: "azure-iac",
    path: "/projects/azure-iac",
    category: "Cloud infrastructure and deployment",
    title: "Two apps · One Azure release path.",
    description: `A shared Azure workflow that deploys the right version to the right environment, blocks risky infrastructure changes, and checks each sites health.`,
    featured: true,
    evidence: ["2 applications", "Public infrastructure code"],
  },
  {
    slug: "azure-access-and-secrets",
    path: "/projects/azure-access-and-secrets",
    category: "Cloud authorisation and permissions",
    title: "Preview a change · Only the deployer can apply it.",
    description: `I gave publishing, previewing, deploying and running each app separate permissions. Only the running app reads its secrets from Key Vault.`,
    featured: false,
    evidence: ["4 shared identities", "Azure Key Vault"],
  },
  {
    slug: "lease-balance-calculation",
    path: "/projects/lease-balance-calculation",
    category: "Legacy modernisation",
    title: "One lease balance · Why calculate them all?",
    description: `
      Calculating every balance locked LeaseCore for ~34 minutes. I untangled 12,000+ lines of SQL so customers could check their own balance on demand.
    `,
    featured: false,
    evidence: ["12,000+ lines of SQL", "~34 minute legacy batch"],
  },
  {
    slug: "site-rebuild",
    path: "/projects/site-rebuild",
    category: "Web development and CRM automation",
    title: "Website rebuild · More leads; the same campaigns",
    description: `
      I replaced WordPress with Qwik and connected enquiries to HubSpot. Recorded daily leads rose by nearly a third without more campaign activity.
    `,
    featured: true,
    evidence: ["3 months", "100 in 3 categories"],
  },
  {
    slug: "tqe-legacy-integration",
    path: "/projects/tqe-legacy-integration",
    category: "Business systems integration",
    title: "Lead to lease · Where did the leads go?",
    description: `
      Leads vanished from reports before quoting. I linked three systems so staff could track each enquiry through to lease settlement.
    `,
    featured: false,
    evidence: ["Torque", "QuoteCore", "LeaseCore"],
  },
  {
    slug: "autodash-migration",
    path: "/projects/autodash-migration",
    category: "Identity and migration",
    title: "5,000+ accounts · Same passwords, new portal",
    description: `Customers signed in as usual. On their first login, the new portal upgraded their password hash from SHA-1 to Argon2.`,
    featured: false,
    evidence: ["5,000+ Users", "SHA-1", "Argon2"],
  },
  {
    slug: "step-up-authentication",
    path: "/projects/step-up-authentication",
    category: "Application security",
    title: "Step-up auth · Extra checks only when needed",
    description:
      "Customers browse as usual. For sensitive changes, I built an API check that requires a fresh code.",
    featured: false,
    evidence: ["6-digit code", "SMS delivery", "5 minutes approval window"],
  },
  {
    slug: "ransomware-recovery",
    path: "/projects/ransomware-recovery",
    category: "Incident response",
    title: "Ransomware recovery · Back online by morning",
    description: `
      A ransom note appreared on a workstation screen. I isolated the network, and led network recovery workstation rebuild.
    `,
    featured: false,
    evidence: [
      "Crital Incident",
      "Parallel workstreams",
      "Incident Investigation",
    ],
  },
  {
    slug: "about-approach",
    path: "/about/approach",
    category: "How I work",
    title: "What sales leadership taught me about building software",
    description:
      "I use operational questions, workflow mapping and commercial context to work out what software actually needs to change.",
    featured: false,
    evidence: ["Fix the reports", "Missing lead data"],
  },
] as const satisfies readonly ProjectSummary[];

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
