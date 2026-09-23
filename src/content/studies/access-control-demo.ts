import type { CaseStudy } from "../types";

export default {
  slug: "access-control-demo",
  path: "/work/access-control-demo/",
  category: "Inspectable full-stack application",
  title: "Access Control Demo: security you can inspect",
  description: `
      I built a small, deployed application so employers can test permissions and follow 
      the enforcement from the interface to the API, database and tests.
    `,
  introduction: `
      My professional code lives in proprietary repositories. to address this I built a deliberately 
      small consultation-management application to make my full-stack, security and deployment work 
      reviewable rather than asking employers to take it on trust.
    `,
  featured: true,
  metrics: [
    { label: "Roles", value: "2 students + 1 admin" },
    { label: "Data boundary", value: "PostgreSQL RLS" },
    { label: "Test focus", value: "Forbidden requests" },
    { label: "Deployment", value: "Azure Container Apps" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
          A screenshot can demonstrate a user interface, but it cannot prove that one account is 
          prevented from reading another account’s records or that an administrator cannot perform a forbidden write. 
          I wanted an employer to be able to test those rules in a working system and locate the implementation.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I designed, implemented, tested and deployed the application independently. I kept the domain small: 
          students manage consultations they own, while an administrator can view consultations across students 
          but cannot change them. Two student demonstration accounts make same-role ownership restrictions visible.
        `,
      ],
    },
    {
      title: "How I built it",
      subsections: [
        {
          title: "Make permissions visible without trusting the interface",
          paragraphs: [
            `
              The interface exposes actions appropriate to each account, but Next.js Route Handlers 
              independently verify the access-gate session, authenticated Supabase user, application role, 
              request data, ownership and permitted status transitions. A student’s record lookup or 
              mutation is scoped to both the consultation ID and their own user ID.
            `,
          ],
        },
        {
          title: "Enforce the same rules in the database",
          paragraphs: [
            `
              PostgreSQL row-level security limits students to their own rows and gives administrators read-only access. 
              Column grants prevent callers from changing ownership or protected lifecycle fields; 
              triggers enforce status rules. Students cancel consultations by changing their status, not deleting records. 
              The database controls are deliberate protection beneath the API checks.
            `,
          ],
        },
        {
          title: "Test denial, not just happy paths",
          paragraphs: [
            `
              Route tests check unauthenticated, wrong-role and cross-student requests. SQL tests exercise row policies, 
              restricted columns and forbidden lifecycle changes under authenticated database roles. 
              A container-stage harness applies real migrations and exercises the assembled production image.
            `,
          ],
        },
        {
          title: "Make the demo easy to review",
          paragraphs: [
            `
              A separate invitation gate limits access to the shared demo accounts without granting an application role. 
              The reviewer can choose either student or the read-only administrator, try a permitted action, 
              then see the corresponding forbidden access fail. Docker, GitHub Actions, Bicep, Azure Container Apps 
              and Key Vault-backed secrets make delivery and infrastructure inspectable too.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          The result is a focused demonstration of working code: an employer can compare what different accounts 
          can see and change, then trace the same rule through the route handler, SQL policy, automated test and 
          deployment configuration. It is a personal demonstration, not a claim of production customer adoption 
          or an externally audited security product.
        `,
      ],
    },
  ],
  technologies: [
    {
      label: "Application",
      value: "Next.js, React, TypeScript, Tailwind CSS, Valibot",
    },
    {
      label: "Data and identity",
      value: "Supabase Auth, PostgreSQL, row-level security",
    },
    {
      label: "Testing",
      value: "Route-handler tests, SQL policy tests, container integration",
    },
    {
      label: "Delivery",
      value: "Docker, GitHub Actions, Bicep, Azure Container Apps, Key Vault",
    },
  ],
  related: [
    { label: "Step-up authentication", href: "/work/step-up-authentication/" },
  ],
} satisfies CaseStudy;
