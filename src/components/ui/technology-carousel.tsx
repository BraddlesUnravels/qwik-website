import { component$, useStylesScoped$ } from "@builder.io/qwik";

const technologies = [
  // Languages
  { name: "JavaScript", icon: "/icon/logo/JS-logo.svg" },
  { name: "TypeScript", icon: "/icon/logo/typescript-logo.svg" },

  // Front-end
  { name: "Qwik", icon: "/icon/logo/qwik-logo.svg" },
  { name: "React", icon: "/icon/logo/react-logo.svg" },
  { name: "Next.js", icon: "/icon/logo/nextjs-logo.svg" },
  { name: "Tailwind CSS", icon: "/icon/logo/tailwind-logo.svg" },
  { name: "MUI", icon: "/icon/logo/mui-logo.svg" },

  // Back-end and runtimes
  { name: "Node.js", icon: "/icon/logo/node-logo.svg" },
  { name: "Express.js", icon: "/icon/logo/express-logo.svg" },
  { name: "Elysia.js", icon: "/icon/logo/elysiajs-logo.svg" },
  { name: "Bun", icon: "/icon/logo/bun-logo.svg" },
  { name: "npm", icon: "/icon/logo/npm-logo.svg" },

  // Databases
  {
    name: "Microsoft SQL Server",
    icon: "/icon/logo/microsoft-sql-logo.svg",
  },
  { name: "MySQL", icon: "/icon/logo/mysql-logo.svg" },
  { name: "PostgreSQL", icon: "/icon/logo/postgres-logo.svg" },

  // Data access and back-end platforms
  { name: "Prisma", icon: "/icon/logo/prisma-logo.svg" },
  { name: "TypeORM", icon: "/icon/logo/typeorm-logo.svg" },
  { name: "Drizzle", icon: "/icon/logo/drizzle-logo.svg" },
  { name: "Supabase", icon: "/icon/logo/supabase-logo.svg" },

  // Testing
  { name: "Cypress", icon: "/icon/logo/cypress-circle-logo.svg" },
  { name: "Vitest", icon: "/icon/logo/vitest-logo.svg" },

  // DevOps and cloud
  { name: "Docker", icon: "/icon/logo/docker-logo.svg" },
  {
    name: "GitHub Actions",
    icon: "/icon/logo/github-actions-logo.svg",
  },
  {
    name: "Infrastructure as Code",
    icon: "/icon/logo/iac-logo.svg",
  },
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
