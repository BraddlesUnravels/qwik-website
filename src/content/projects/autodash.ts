import type { Project } from "../types";
import { projectVideos } from "../project-media";
import LegacyApplHome from "~/media/legacy-portal/legacy-portal-account-home.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import LegacyApplHomePath from "~/media/legacy-portal/legacy-portal-account-home.png?url&no-inline";

export default {
  slug: "autodash",
  path: "/projects/autodash",
  category: "Full-stack product delivery",
  title: "AutoDash · A new front door for 5,000+ customers",
  description: `
    I built a customer finance portal that let the business withdraw public
    access to an ageing platform while keeping essential internal processes running.
  `,
  introduction: `
    A security review identified vulnerabilities in LeaseCore, the system holding
    the business's customer accounts, transactions and lease balances. I delivered
    AutoDash to replace its customer-facing portal while keeping the internal
    platform in service.
  `,
  featured: true,
  videos: projectVideos["autodash-lease-workflow-desktop"],
  metrics: [
    {
      label: "Customers",
      value: "5,000+ migrated",
      description: "Moved from the legacy finance portal",
    },
    {
      label: "Delivery",
      value: "8 months",
      description: "Extended from six months for additional security work",
    },
    {
      label: "Release",
      value: "November 2024",
      description: "Production cutover completed without downtime",
    },
    {
      label: "Scope",
      value: "Full-stack ownership",
      description: "Discovery through to production support",
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
            "The customer portal AutoDash replaced, while the business continued using LeaseCore internally.",
        },
      ],
      paragraphs: [
        `
          A security review had identified vulnerabilities and unsupported
          dependencies in LeaseCore. It held the business's customer accounts,
          transactions and lease balances, so taking the whole platform offline
          was not practical. Its public portal also provided services customers
          still needed to manage their leases.
        `,
        `
          The existing portal while limited, could still show balances (calculated as of the previous payroll), and sent routine
          account changes through support staff. The business needed to reduce
          exposure while keeping its core lease system running.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I worked with the board to define the first release around two
          priorities: reduce exposure of the legacy application and preserve
          the customer services already in use. I owned delivery from discovery
          and architecture through the database, API, interface, security,
          deployment and production support.
        `,
        `
          The original six-month target became an eight-month delivery as we
          added security and self-service capabilities. Extra verification for
          sensitive changes let customers update contact and payment details
          online, replacing phone calls and manual processing.
        `,
      ],
    },
    {
      title: "How I built it",
      videos: [projectVideos["autodash-lease-workflow-mobile"]],
      subsections: [
        {
          title: "Keep the data connected",
          paragraphs: [
            `
              Most of the information AutoDash needed already lived in the
              LeaseCore MSSQL database. Rather than add another database and
              synchronisation problem, I added portal-owned tables for accounts,
              authentication, preferences and activity alongside the existing
              lease data.
            `,
            `
              A TypeScript API controlled access to the data and reused legacy
              stored procedures where necessary. This avoided duplicating
              information, though the remaining dependency on those procedures
              limited what I could test independently.
            `,
          ],
        },
        {
          title: "Build around everyday frustrations",
          paragraphs: [
            `
              I mapped the existing workflows, reviewed prototypes with
              directors and frontline staff, and listened to customer calls to
              identify recurring problems. That work shaped email-based
              sign-in, clearer transactions, downloadable documents and
              self-service account changes.
            `,
            `
              Customers could also see budget allocations alongside spending
              across categories such as fuel, maintenance, registration and
              tyres. This made it easier to understand how much remained in
              each part of their annual vehicle budget.
            `,
          ],
        },
        {
          title: "Prepare for release",
          paragraphs: [
            `
              I made a staging version of the portal available to staff before launch.
              Some employees also held leases through the business, so they could try
              it using their own customer accounts. Their feedback helped me refine
              the interface before the wider customer release.
            `,
            `
              I set up automated deployments to Azure, giving me a repeatable way to
              release the application and subsequent updates. I also added error
              tracking and monitoring to help investigate problems after release.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          AutoDash entered production on 14 November 2024, and more than 5,000
          customers moved to the new portal. Customers gained current lease
          balances, clearer budgets, document access and the ability to make
          account changes themselves.
        `,
        `
          Staff reported far fewer calls about forgotten usernames and routine
          profile updates. They could direct customers to self-service
          documents and clearer financial information instead of preparing
          repeated emails or explaining stale balances over the phone.
        `,
        `
          The business was able to withdraw all public access to the old system and its 
          portal. While keeping the critical business services available internally.
        `,
      ],
    },
    {
      title: "What I took from it",
      paragraphs: [
        `
          My sales-management experience helped me decide what to build.
          Listening across customer calls gave me a way to check staff feedback
          against recurring problems. It also helped me explain which
          improvements justified extra time before release and which could
          wait until the replacement was in use.
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
