import type { Project } from "../types";
// import { projectVideos } from "../project-media";
// import DesktopLogin from "~/media/autodash/imgs/AutoDash-Desktop-Login.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
// import MobileLogin from "~/media/autodash/imgs/AutoDash-Mobile-Login.png?w=240;400&format=webp&quality=80&withoutEnlargement&as=img";
// import DocumentsDesktop from "~/media/autodash/imgs/Lease_Docx_Page_Desktop(redacted).png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import LegacyApplHome from "~/media/legacy-portal/legacy-portal-account-home.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import LegacyApplHomePath from "~/media/legacy-portal/legacy-portal-account-home.png?url&no-inline";

export default {
  slug: "autodash",
  path: "/projects/autodash",
  category: "Full-stack product delivery",
  title: "AutoDash · A new front door for 5,000+ customers",
  description: `
    I built a customer finance portal that let the business withdraw public access 
    to an ageing platform without retiring the system it still depended on.
  `,
  introduction: `
    The business needed to take a vulnerable legacy customer portal offline, 
    but the same platform (LeaseCore) held the lease data and financial processes 
    staff relied on every day. I owned the delivery of AutoDash, a replacement 
    customer-facing application that kept those internal processes available.
  `,
  featured: true,
  // videos: projectVideos["autodash-lease-workflow-desktop"],
  metrics: [
    {
      label: "Customers",
      value: "5,000+ migrated",
      description: "Moved from legacy finance portal",
    },
    {
      label: "Delivery",
      value: "8 months",
      description: "I delayed release by 2 months, due to security hardening",
    },
    {
      label: "Release",
      value: "November 2024",
      description: "Production went live on schedule with no downtime",
    },
    {
      label: "Scope",
      value: "Full-stack ownership",
      description: "Taken from concept to release",
    },
  ],
  sections: [
    {
      title: "The problem",
      images: [
        {
          ...LegacyApplHome,
          fullSrc: LegacyApplHomePath,
          alt: "Legacy customer portal home screen with its original navigation and vehicle banner.",
          caption:
            "The previous customer portal, before AutoDash replaced public access. This is the legacy interface, not the new application.",
        },
      ],
      paragraphs: [
        `
          A security review had identified vulnerabilities in LeaseCore, including unsupported dependencies. 
          The business could not retire LeaseCore immediately: it stored customer accounts, transactions 
          and lease balances, and its public portal still let customers view budgets, submit claims and request support. 
          Simply switching off external access would have removed services customers needed.
        `,
        `
          The existing portal also used four-digit usernames, could display balances that had not been 
          recalculated since the last batch, and routed ordinary changes through support staff.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I worked with the board to define the first release around two constraints: 
          reduce exposure of the legacy application and preserve the customer journeys 
          already in use. I was responsible for discovery, architecture, database and API work, 
          the React interface, authentication, deployment and production support. A six-month 
          target became an eight-month delivery as we included additional self-service and security work.
        `,
      ],
    },
    {
      title: "How I built it",
      subsections: [
        {
          title: "Keep the existing business data where it belonged",
          paragraphs: [
            `
              Most of the information AutoDash needed already lived in the LeaseCore MSSQL database. 
              Rather than introduce a third database and another synchronisation problem, I added portal-owned 
              tables for identities, MFA, preferences and activity alongside the existing lease data. 
              The Node.js API exposed controlled operations and reused legacy stored procedures where they remained necessary. 
              This kept the legacy dependency explicit; it did not remove all of its testing limitations.
            `,
          ],
        },
        {
          title: "Design around actual customer and staff behaviour",
          paragraphs: [
            `
              I mapped the old database and application workflows, listened to customer calls and reviewed prototypes 
              with directors, managers and frontline staff. Feedback shaped the budget breakdown, clearer transactions, 
              downloadable documents and the self-service changes that had previously required manual support. 
              I kept the first release focused on replacing the existing customer journey rather than rebuilding 
              internal lease management.
            `,
          ],
        },
        {
          title: "Deliver and operate the replacement",
          paragraphs: [
            `
              I built the React client and the Express API in TypeScript, 
              implemented email-based sign-in, MFA and authorisation, and prepared the customer migration. 
              Docker, GitHub Actions, Azure Bicep, staging, Sentry and Grafana supported deployment and production 
              troubleshooting. Employees with active leases tested the live journey before customer cutover.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          AutoDash went into production on 14 November 2024 and supported the migration of more than 5,000 customers. 
          Customers gained current lease information, more understandable budgets, documents and self-service account changes. 
          Staff reported far fewer calls about forgotten usernames and routine profile updates.
        `,
        `
          The key architectural outcome was the separation of public customer access from the older portal while keeping 
          the internal lease-management (LeaseCore) platform in service.
        `,
      ],
    },
  ],
  technologies: [
    { label: "Client", value: "React, TypeScript, Redux, Material UI" },
    { label: "API", value: "Node.js, TypeScript, Express, REST" },
    {
      label: "Data",
      value: "MSSQL, existing stored procedures, targeted indexing",
    },
    { label: "Security", value: "MFA, Argon2, step-up authentication" },
    {
      label: "Delivery",
      value: "Docker, GitHub Actions, Azure, Bicep, Sentry, Grafana",
    },
  ],
  related: [
    { label: "Customer migration", href: "/projects/autodash-migration/" },
    {
      label: "Step-up authentication",
      href: "/projects/step-up-authentication/",
    },
    {
      label: "On-demand balances",
      href: "/projects/lease-balance-calculation/",
    },
    {
      label: "Azure IaC",
      href: "/projects/azure-iac/",
    },
  ],
} satisfies Project;
