import { component$, useStylesScoped$ } from "@builder.io/qwik";
// Logos
import javascriptIcon from "~/media/logos/JS-logo.svg?url&no-inline";
import typescriptIcon from "~/media/logos/typescript-logo.svg?url&no-inline";
import qwikIcon from "~/media/logos/qwik-logo.svg?url&no-inline";
import reactIcon from "~/media/logos/react-logo.svg?url&no-inline";
import nextjsIcon from "~/media/logos/nextjs-logo.svg?url&no-inline";
import tailwindIcon from "~/media/logos/tailwind-logo.svg?url&no-inline";
import muiIcon from "~/media/logos/mui-logo.svg?url&no-inline";
import nodeIcon from "~/media/logos/node-logo.svg?url&no-inline";
import expressIcon from "~/media/logos/express-logo.svg?url&no-inline";
import elysiaIcon from "~/media/logos/elysiajs-logo.svg?url&no-inline";
import bunIcon from "~/media/logos/bun-logo.svg?url&no-inline";
import npmIcon from "~/media/logos/npm-logo.svg?url&no-inline";
import sqlServerIcon from "~/media/logos/microsoft-sql-logo.svg?url&no-inline";
import mysqlIcon from "~/media/logos/mysql-logo.svg?url&no-inline";
import postgresIcon from "~/media/logos/postgres-logo.svg?url&no-inline";
import prismaIcon from "~/media/logos/prisma-logo.svg?url&no-inline";
import typeormIcon from "~/media/logos/typeorm-logo.svg?url&no-inline";
import drizzleIcon from "~/media/logos/drizzle-logo.svg?url&no-inline";
import supabaseIcon from "~/media/logos/supabase-logo.svg?url&no-inline";
import cypressIcon from "~/media/logos/cypress-circle-logo.svg?url&no-inline";
import vitestIcon from "~/media/logos/vitest-logo.svg?url&no-inline";
import dockerIcon from "~/media/logos/docker-logo.svg?url&no-inline";
import githubActionsIcon from "~/media/logos/github-actions-logo.svg?url&no-inline";
import iacIcon from "~/media/logos/iac-logo.svg?url&no-inline";

const technologies = [
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "Qwik", icon: qwikIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "MUI", icon: muiIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "Express.js", icon: expressIcon },
  { name: "Elysia.js", icon: elysiaIcon },
  { name: "Bun", icon: bunIcon },
  { name: "npm", icon: npmIcon },
  { name: "Microsoft SQL Server", icon: sqlServerIcon },
  { name: "MySQL", icon: mysqlIcon },
  { name: "PostgreSQL", icon: postgresIcon },
  { name: "Prisma", icon: prismaIcon },
  { name: "TypeORM", icon: typeormIcon },
  { name: "Drizzle", icon: drizzleIcon },
  { name: "Supabase", icon: supabaseIcon },
  { name: "Cypress", icon: cypressIcon },
  { name: "Vitest", icon: vitestIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "GitHub Actions", icon: githubActionsIcon },
  { name: "Infrastructure as Code", icon: iacIcon },
] as const;

const carouselCopies = [
  {
    id: "original",
    isDuplicate: false,
  },
  {
    id: "duplicate",
    isDuplicate: true,
  },
] as const;

export const TechnologyCarousel = component$(() => {
  useStylesScoped$(`
    .carousel-stage {
      position: relative;
      height: 5rem;
    }

    .carousel-list {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: max-content;
      gap: 2.5rem;
      padding-right: 2.5rem;
      will-change: transform;
      animation: carousel-scroll 45s linear infinite;
    }

    .carousel-list--duplicate {
      animation-delay: -22.5s;
    }

    .technology-card {
      display: flex;
      flex: 0 0 6rem;
      width: 6rem;
      min-width: 6rem;
      max-width: 6rem;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    @media (hover: hover) {
      .carousel:hover .carousel-list {
        animation-play-state: paused;
      }
    }

    @keyframes carousel-scroll {
      from {
        transform: translate3d(100%, 0, 0);
      }

      to {
        transform: translate3d(-100%, 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-list {
        animation: none;
        transform: none;
      }

      .carousel-list--duplicate {
        display: none;
      }
    }
  `);

  return (
    <div
      class="carousel relative w-full overflow-hidden py-5"
      aria-label="Technologies used"
    >
      <div
        id="carousel-left-fade"
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-30 bg-linear-to-r from-[#070a10bb] to-transparent"
      />

      <div
        id="carousel-right-fade"
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-30 bg-linear-to-l from-[#070a10bb] to-transparent"
      />

      <div class="carousel-stage">
        {carouselCopies.map(({ id, isDuplicate }) => (
          <div
            key={id}
            class={
              isDuplicate
                ? "carousel-list carousel-list--duplicate"
                : "carousel-list"
            }
            aria-hidden={isDuplicate ? "true" : undefined}
          >
            {technologies.map((technology) => (
              <div
                key={`${id}-${technology.name}`}
                class="technology-card group"
              >
                <img
                  src={technology.icon}
                  width={48}
                  height={48}
                  loading="eager"
                  draggable={false}
                  alt=""
                  class="block h-12 w-12 object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />

                <span class="w-full text-center text-xs whitespace-nowrap text-slate-400 transition-colors group-hover:text-white">
                  {technology.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
