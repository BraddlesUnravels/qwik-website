import type { Project } from "../types";
import BalanceDesktop from "~/media/autodash/Lease_Detail_Page_Desktop(redacted).png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import BalanceMobile from "~/media/autodash/Lease_Detail_Page_Mobile(redacted).png?w=240;400&format=webp&quality=80&withoutEnlargement&as=img";
import BalanceBoundary from "~/media/diagrams/balance-source-boundary.svg?url&no-inline";
import BalanceDesktopFull from "~/media/autodash/Lease_Detail_Page_Desktop(redacted).png?url&no-inline";
import BalanceMobileFull from "~/media/autodash/Lease_Detail_Page_Mobile(redacted).png?url&no-inline";

export default {
  slug: "lease-balance-calculation",
  path: "/projects/lease-balance-calculation",
  category: "Legacy modernisation",
  title: "Making lease balances available without a 34-minute DB lockout",
  description: `
    I untangled a 12,000-line SQL calculation, separated the business rules 
    and made individual lease balances available on demand.
  `,
  introduction: `
    Checking one lease balance should not require recalculating every lease in the business. 
    The existing stored procedure ran as a batch, blocked the LeaseCore application for about 
    34 minutes and left displayed balances out of date (stale) between runs.
  `,
  featured: true,
  images: [
    {
      ...BalanceDesktop,
      fullSrc: BalanceDesktopFull,
      alt: "AutoDash lease-details page with a balance breakdown, budget indicators and transaction history.",
      caption:
        "The lease-details interface brings balances, budgets and transaction history into one view. The screenshot illustrates the interface, not calculation timing.",
    },
  ],
  metrics: [
    { label: "Legacy procedure", value: "12,000+ lines" },
    { label: "Old full batch", value: "~34 minutes" },
    { label: "Individual API request", value: "~30 ms" },
    { label: "Required overnight batch", value: "12–13 minutes" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
          The original stored procedure combined vehicle-lease calculations with old salary-packaging logic. 
          It contained large commented-out sections and 36 unexplained constants (magic numbers). 
          A payroll upload triggered an all-lease calculation and locked the system for roughly 34 minutes. 
          There was no safe way to improve the performance until I could establish which financial rules were still active.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I investigated the procedure, confirmed the meaning of its financial inputs with the Head of Accounts, 
          refactored the calculation and connected on-demand balance requests through the Node.js API. 
          I also retained the batch process needed for payroll and transaction imports.
        `,
      ],
    },
    {
      title: "How I changed it",
      images: [
        {
          src: BalanceBoundary,
          fullSrc: BalanceBoundary,
          w: 1017,
          h: 358,
          alt: "React lease-detail requests mapped to stored-procedure calls, with unavailable SQL bodies marked as an evidence boundary.",
          caption:
            "The diagram maps the application calls visible in the reviewed source. The stored-procedure bodies were unavailable in that source snapshot, so it does not verify the SQL refactor or timings described here.",
        },
      ],
      subsections: [
        {
          title: "Build a controlled investigation environment",
          paragraphs: [
            `
              I created a local LeaseCore SQL Server database using Docker with about 150 active leases and 50 
              ended leases with complete histories. I stepped through the procedure with database 
              debugging tools, identified dependencies between calculations and checked undocumented 
              constants against the business rules.
            `,
          ],
        },
        {
          title: "Refactor without silently changing balances",
          paragraphs: [
            `
              I removed code that could not be reached by the company’s vehicle-leasing workflows, 
              then separated tax, lease-type, operating-cost and transaction-replay calculations into smaller units. 
              After each change, I ran the original and modified procedure against the same leases and investigated 
              differences before continuing.
            `,
          ],
        },
        {
          title: "Separate single-lease requests from necessary batching",
          paragraphs: [
            `
              A calculation for an individual lease took about 20 ms at the database and around 30 ms through 
              the monitored Node.js API in testing. I used the API route for on-demand balances because it 
              provided a clearer place for logging and failure handling. The required full batch still blocked 
              the application, but its runtime fell to 12–13 minutes and it was scheduled for 1:00 am rather than 
              during normal business hours.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      images: [
        {
          ...BalanceMobile,
          fullSrc: BalanceMobileFull,
          alt: "Mobile AutoDash lease-details page showing the balance breakdown and budget indicators.",
          caption:
            "The mobile lease view presents the balance breakdown and budget indicators in a single column.",
        },
      ],
      paragraphs: [
        `
          Staff and customers could request an up-to-date individual balance without triggering a database-wide batch. 
          During the investigation I also found approximately $528,000 in negative balances on closed leases that the 
          existing deficit reporting had missed. The accounts team introduced a weekly report and later recovered just 
          over half of that identified amount.
        `,
        `
          The full-batch and individual-lease figures measure different operations: the change removed the need to run 
          the batch just to display one current balance.
        `,
      ],
    },
  ],
  technologies: [
    { label: "Database", value: "MSSQL, stored procedures, SQL debugging" },
    { label: "API", value: "TypeScript, Node.js, Sentry" },
    {
      label: "Validation",
      value: "Parallel old-versus-new calculation comparisons",
    },
    { label: "Environment", value: "Docker, local database" },
  ],
  related: [
    {
      label: "AutoDash customer portal",
      href: "/projects/autodash/",
    },
  ],
} satisfies Project;
