import type { CaseStudy } from "../types";

export default {
  slug: "access-control-demo",
  path: "/work/access-control-demo/",
  category: "Inspectable portfolio system",
  title: "Live access-control portfolio application",
  description:
    "A focused application that lets employers inspect role, ownership and database enforcement rather than relying only on résumé claims.",
  introduction:
    "I built this application so an employer can test an allowed action, see a forbidden action fail and inspect the server check, database policy, denial test and deployment definition behind that behaviour.",
  featured: true,
  metrics: [
    { label: "Boundaries", value: "3 layers" },
    { label: "Roles", value: "Student + admin" },
    { label: "Database", value: "PostgreSQL RLS" },
    { label: "Delivery", value: "Azure + Bicep" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Most of my production work is proprietary. Screenshots could show interface work but not authentication, ownership enforcement, database controls, denial testing or deployment architecture.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I designed, built, tested and deployed a deliberately narrow consultation-management application so every security boundary could be understood without first learning a large business domain.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Role and ownership model",
          paragraphs: [
            "Two student accounts demonstrate isolation between users with the same role. Students manage only their own consultations; a read-only administrator can see all consultations but cannot mutate them.",
          ],
        },
        {
          title: "Defence in depth",
          paragraphs: [
            "Next.js Route Handlers check the portfolio gate, Supabase identity, application role, validated input, owner and lifecycle transition. PostgreSQL RLS, column grants and triggers repeat critical rules beneath the server boundary.",
          ],
        },
        {
          title: "Controlled reviewer access",
          paragraphs: [
            "Invitation codes are stored as HMAC-SHA256 digests, redeemed atomically and exchanged for signed HTTP-only cookies. Gate access and application roles remain separate concerns.",
          ],
        },
        {
          title: "Tests that prove denial",
          bullets: [
            "Unauthenticated, wrong-role and cross-owner requests fail before mutation.",
            "Browser-supplied ownership is ignored and invalid lifecycle changes are rejected.",
            "SQL policy tests prove isolation, administrator immutability and deletion denial.",
            "A container harness exercises real migrations and the production image.",
          ],
        },
        {
          title: "Infrastructure is part of the evidence",
          paragraphs: [
            "Bicep defines Container Apps, ingress, probes, logging and Key Vault integration. GitHub uses OpenID Connect, the image runs as a non-root user and releases use immutable commit tags.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "A reviewer can perform an allowed operation and verify that the same data or mutation is unavailable to another owner or role, then trace the behaviour through application tests, database policies and infrastructure code.",
        "The project demonstrates full-stack TypeScript, authentication, authorisation, RLS, runtime validation, denial testing, containers, CI/CD, infrastructure as code and Azure deployment in one focused system.",
      ],
    },
  ],
  technologies: [
    {
      label: "Application",
      value: "Next.js, React, TypeScript, Tailwind, Valibot",
    },
    {
      label: "Identity and data",
      value: "Supabase Auth, PostgreSQL, RLS, triggers",
    },
    {
      label: "Testing",
      value: "Route, SQL policy and container integration tests",
    },
    {
      label: "Delivery",
      value: "Docker, GitHub Actions, Azure, Bicep, OIDC, Key Vault",
    },
  ],
  lesson:
    "For a public customer system I would replace shared demo users with individual MFA accounts, move rate limiting to shared infrastructure and add durable audit logging and formal recovery procedures.",
  related: [],
} satisfies CaseStudy;
