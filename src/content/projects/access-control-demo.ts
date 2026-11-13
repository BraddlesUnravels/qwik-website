import type { Project } from "../types";
import { projectVideos } from "../project-media";
import DemoAuthorization from "~/media/diagrams/demo-authorization.svg?url&no-inline";
import DemoAuthorizationPath from "~/media/diagrams/demo-authorization.svg";
import RoleSelection from "~/media/access-control-demo/imgs/desktop-user-select-close-up.png?w=640;960;1280&format=webp&quality=80&withoutEnlargement&as=img";
import RoleSelectionFull from "~/media/access-control-demo/imgs/desktop-user-select-close-up.png?url&no-inline";

export default {
  slug: "access-control-demo",
  path: "/projects/access-control-demo",
  category: "Access Control Demo",
  title: "Access control you can explore",
  description: `
    A live booking application where you can switch accounts
    and see how permissions work.
  `,
  introduction: `
    Most of my commercial work lives in systems I can't share. I built this
    demo to give potential employers something they could explore for
    themselves, from the way it behaves on screen to the decisions behind it.
  `,
  featured: true,
  metrics: [
    {
      label: "Built and deployed",
      value: "Live on Azure",
      description:
        "A working consultation management application hosted on Azure.",
    },
    {
      label: "Three accounts",
      value: "2 students + 1 admin",
      description:
        "Students manage their own bookings; an administrator can view both.",
    },
    {
      label: "Access checks",
      value: "Server + database",
      description:
        "Authorization & permission controls at each stage layering security.",
    },
    {
      label: "Testing",
      value: "Allowed + denied",
      description:
        "Automated tests check that permitted actions succeed and forbidden actions fail.",
    },
  ],
  sections: [
    {
      title: "Three accounts, three perspectives",
      paragraphs: [
        `
          I chose a small consultation-booking application to make the idea
          easy to follow. It has two student accounts and an administrator.
        `,
        `
          Create a booking as one student, then switch to the other. The booking
          is no longer visible: both students have the same role, but each can
          only access their own records.
        `,
        `
          The administrator can see bookings from both accounts, but can't
          change them. That was a deliberate choice: needing an overview
          doesn't always mean needing permission to edit.
        `,
      ],
      videos: [
        {
          ...projectVideos["access-ownership-desktop"],
          caption:
            "Two students see their own bookings. The administrator can view both.",
        },
      ],
    },
    {
      title: "Ensuring the rules hold",
      paragraphs: [
        `
          Those permissions also need to hold when someone sends a request
          directly, outside the application's screen controls.
        `,
        `
          The server checks who is making the request, what they're allowed
          to do and which records they can access. The database applies its
          own restrictions, enforcing those boundaries independently.
        `,
        `
          I tested both permitted and forbidden actions, including attempts
          to access another student's booking, make changes as the
          administrator and attempts to alter cancelled bookings. Separate tests check
          the database rules directly, while automated integration tests exercise the
          application inside its production container.
        `,
      ],
      images: [
        {
          src: DemoAuthorization,
          fullSrc: DemoAuthorizationPath,
          w: 854,
          h: 1055,
          tone: "diagram",
          alt: "Consultation requests pass through the visitor gate, role and ownership checks, then PostgreSQL row-level security and column grants.",
          caption:
            "Requests pass through the visitor gate, server checks and database policies. The visitor gate does not grant an application role.",
        },
      ],
    },
    {
      title: "Taking it live",
      paragraphs: [
        `
          Supabase was new to me. Its built-in account management and database
          tools gave me more time to focus on permissions and keeping what
          users see consistent with the underlying data.
        `,
        `
          I packaged the application in Docker and deployed it to Azure
          Container Apps. The infrastructure is defined in code, and GitHub
          Actions runs the checks and deployment process.
        `,
      ],
    },
    {
      title: "Key takeaways",
      paragraphs: [
        `
          Having worked with SQL Server, MySQL and SQLite, I particularly
          enjoyed PostgreSQL's control over individual records and columns.
          It was straightforward to configure at this scale, and I could see
          its value in larger systems where people need different levels of
          access to shared data.
        `,
        `
          I'd use PostgreSQL and Supabase again. The detailed controls earned
          their place here because permissions were central to the project;
          for an application with simpler needs, I'd be comfortable choosing
          a lighter setup.
        `,
      ],
    },
    {
      title: "Try it yourself",
      paragraphs: [
        `
          Open the demo using the live demo button at the top of the page,
          then choose an account to use. Then switch between the students 
          and administrator to explore what each can see and do.
        `,
      ],
      images: [
        {
          ...RoleSelection,
          fullSrc: RoleSelectionFull,
          tone: "dark",
          alt: "Demo account selector offering Student 01, Student 02 and Administrator accounts.",
          caption:
            "Choose an account to explore what each user can see and do.",
        },
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
