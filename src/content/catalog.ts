import type { ProjectSummary } from "./types";

export const content = {
  autodash: { slug: "autodash", path: "/projects/autodash" },
  aca: { slug: "access-control-demo", path: "/projects/access-control-demo" },
  iac: { slug: "azure-iac", path: "/projects/azure-iac" },
  azure: {
    slug: "azure-access-and-secrets",
    path: "/projects/azure-access-and-secrets",
  },
  integration: {
    slug: "tqe-legacy-integration",
    path: "/projects/tqe-legacy-integration",
  },
  financialSql: {
    slug: "lease-balance-calculation",
    path: "/projects/lease-balance-calculation",
  },
  siteRebuild: { slug: "site-rebuild", path: "/projects/site-rebuild" },
  migration: {
    slug: "autodash-migration",
    path: "/projects/autodash-migration",
  },
  stepUp: {
    slug: "step-up-authentication",
    path: "/projects/step-up-authentication",
  },
  ransomware: {
    slug: "ransomware-recovery",
    path: "/projects/ransomware-recovery",
  },
  approach: { slug: "about-approach", path: "/about/approach" },
};

// Order reflects the recommended work-page reading path.
export const projectSummaries = [
  {
    ...content.autodash,
    priority: 1,
    changeFreq: "weekly",
    category: "Full-stack product delivery",
    title: "AutoDash · From concept to cloud",
    description: `
      I built a new customer finance portal with clearer budgets and secure
      self-service, carefully controlling access to the vulnerable platform
      the business still relied on.
    `,
    featured: true,
    evidence: [
      "5,000+ customers migrated",
      "8 month delivery",
      "Deployed on Azure",
    ],
  },
  {
    ...content.aca,
    priority: 1,
    changeFreq: "weekly",
    category: "Application Security",
    title: "Same app. Different access.",
    description: `
      A live booking app demonstrating least privilege across the server and database.
      Students manage their own bookings; administrators have read-only access.
    `,
    featured: true,
    evidence: ["Live demo", "Layered security", "2 students + 1 admin"],
  },
  {
    ...content.iac,
    priority: 1,
    changeFreq: "weekly",
    category: "Cloud infrastructure and deployment",
    title: "Two apps · One Azure release path.",
    description: `A shared Azure workflow that deploys the right version to the right environment, blocks risky infrastructure changes, and checks each sites health.`,
    featured: true,
    evidence: ["2 applications", "Public infrastructure code"],
  },
  {
    ...content.azure,
    priority: 0.8,
    changeFreq: "weekly",
    category: "Cloud authorisation and permissions",
    title: "Preview a change · Only the deployer can apply it.",
    description: `I gave publishing, previewing, deploying and running each app separate permissions. Only the running app reads its secrets from Key Vault.`,
    featured: false,
    evidence: ["4 shared identities", "Azure Key Vault"],
  },
  {
    ...content.financialSql,
    priority: 0.8,
    changeFreq: "weekly",
    category: "Legacy modernisation",
    title: "Financial SQL · On-Demand Balances",
    description: `
      I untangled more than 12,000 lines of financial SQL so 
      customers and staff could get a current balance on demand
    `,
    featured: false,
    evidence: ["12,000+ lines of SQL", "Financial SQL"],
  },
  {
    ...content.siteRebuild,
    priority: 1,
    changeFreq: "weekly",
    category: "Web development and CRM automation",
    title: "Website rebuild · More leads; the same campaigns",
    description: `
      I replaced WordPress with Qwik and connected enquiries to HubSpot. Recorded daily leads rose by nearly a third without more campaign activity.
    `,
    featured: true,
    evidence: ["3 months", "100 in 3 categories"],
  },
  {
    ...content.integration,
    priority: 0.9,
    changeFreq: "weekly",
    category: "Business systems integration",
    title: "Lead to lease · Where did the leads go?",
    description: `
      Leads vanished from reports before quoting. I linked three systems so staff could track each enquiry through to lease settlement.
    `,
    featured: false,
    evidence: ["Torque", "QuoteCore", "LeaseCore"],
  },
  {
    ...content.migration,
    priority: 0.9,
    changeFreq: "weekly",
    category: "Identity and migration",
    title: "5,000+ accounts · Same passwords, new portal",
    description: `Customers signed in as usual. On their first login, the new portal upgraded their password hash from SHA-1 to Argon2.`,
    featured: false,
    evidence: ["5,000+ Users", "SHA-1", "Argon2"],
  },
  {
    ...content.stepUp,
    priority: 0.9,
    changeFreq: "weekly",
    category: "Application security",
    title: "Step-up auth · Extra checks only when needed",
    description:
      "Customers browse as usual. For sensitive changes, I built an API check that requires a fresh code.",
    featured: false,
    evidence: ["6-digit code", "SMS delivery", "5 minutes approval window"],
  },
  {
    ...content.ransomware,
    priority: 0.9,
    changeFreq: "weekly",
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
    ...content.approach,
    priority: 0.8,
    changeFreq: "monthly",
    category: "How I work",
    title: "What sales leadership taught me about building software",
    description:
      "I use operational questions, workflow mapping and commercial context to work out what software actually needs to change.",
    featured: false,
    evidence: ["Fix the reports", "Missing lead data"],
  },
] as const satisfies readonly ProjectSummary[];

export const engineeringApproach: Omit<
  ProjectSummary,
  "priority" | "changeFreq"
> = {
  ...content.approach,
  category: "How I work",
  title: "What sales leadership taught me about building software",
  description:
    "I use operational questions, workflow mapping and commercial context to work out what software actually needs to change.",
  featured: false,
  evidence: ["Fix the reports", "Missing lead data"],
};
