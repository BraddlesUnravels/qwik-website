import type { Project } from "../types";
import DemoAuthorization from "~/media/diagrams/demo-authorization.svg?url&no-inline";
import DemoAuthorizationPath from "~/media/diagrams/demo-authorization.svg";
import StudentDashboard from "~/media/access-control-demo/desktop-student-account.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import RoleSelection from "~/media/access-control-demo/desktop-user-select-close-up.png?w=640;960;1280&format=webp&quality=80&withoutEnlargement&as=img";
import AdministratorDashboard from "~/media/access-control-demo/desktop-administrator-account.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import StudentMobileActions from "~/media/access-control-demo/mobile-student-actions.png?w=240;400;640&format=webp&quality=80&withoutEnlargement&as=img";
import StudentDashboardFull from "~/media/access-control-demo/desktop-student-account.png?url&no-inline";
import RoleSelectionFull from "~/media/access-control-demo/desktop-user-select-close-up.png?url&no-inline";
import AdministratorDashboardFull from "~/media/access-control-demo/desktop-administrator-account.png?url&no-inline";
import StudentMobileActionsFull from "~/media/access-control-demo/mobile-student-actions.png?url&no-inline";

export default {
  slug: "access-control-demo",
  path: "/projects/access-control-demo",
  category: "Inspectable full-stack application",
  title: "Access Control Demo: security you can inspect",
  description: `
      I built a small, deployed application so employers can test permissions and follow
      the enforcement from the interface to the API, database and tests.
    `,
  introduction: `
      My professional code lives in proprietary repositories. To address this, I built a deliberately
      small consultation-management application to make my full-stack, security and deployment work
      reviewable rather than asking employers to take it on trust.
    `,
  featured: true,
  images: [
    {
      ...StudentDashboard,
      fullSrc: StudentDashboardFull,
      tone: "dark",
      alt: "Student consultation dashboard with a creation form and existing consultations.",
      caption:
        "The student dashboard brings consultation creation and the signed-in student’s records together.",
    },
  ],
  metrics: [
    {
      label: "Roles",
      value: "2 students + 1 admin",
      description:
        "Compare account ownership and read-only administrator access.",
    },
    {
      label: "Data boundary",
      value: "PostgreSQL RLS",
      description: "Database policies enforce access beneath the API checks.",
    },
    {
      label: "Test focus",
      value: "Forbidden requests",
      description:
        "Tests cover unauthenticated, wrong-role and cross-student access.",
    },
    {
      label: "Deployment",
      value: "Azure Container Apps",
      description: "Containerised delivery with GitHub Actions and Bicep.",
    },
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
      images: [
        {
          ...RoleSelection,
          fullSrc: RoleSelectionFull,
          tone: "dark",
          alt: "Demo account selector offering Student 01, Student 02 and Administrator roles.",
          caption:
            "Two student accounts and a read-only administrator let reviewers compare ownership and role boundaries.",
        },
      ],
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
      images: [
        {
          src: DemoAuthorization,
          fullSrc: DemoAuthorizationPath,
          w: 854,
          h: 1055,
          tone: "diagram",
          alt: "Consultation requests pass through the visitor gate, role and ownership checks, then PostgreSQL row-level security and column grants.",
          caption:
            "Requests pass through the visitor gate, role and ownership checks, and database policies. The visitor gate does not grant an application role.",
        },
        {
          ...AdministratorDashboard,
          fullSrc: AdministratorDashboardFull,
          tone: "dark",
          alt: "Administrator dashboard displaying consultations from multiple students.",
          caption:
            "The administrator interface lists consultations across students without offering student editing controls.",
        },
      ],
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
      images: [
        {
          ...StudentMobileActions,
          fullSrc: StudentMobileActionsFull,
          tone: "dark",
          alt: "Mobile student consultation list with reschedule, mark incomplete and cancel controls.",
          caption:
            "On mobile, students can reschedule a consultation or change its status from the consultation card.",
        },
      ],
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
  repoUrl: "https://github.com/BraddlesUnravels/access-control-demo",
  related: [
    {
      label: "Step-up authentication",
      href: "/projects/step-up-authentication/",
    },
  ],
} satisfies Project;
