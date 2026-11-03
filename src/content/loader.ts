import type { Project } from "./types";
import { projectSummaries } from "./catalog";
import { projectMedia } from "./project-media";

type ProjectModule = { default: Project };
type ProjectLoader = () => Promise<ProjectModule>;

const projectModules = import.meta.glob<ProjectModule>([
  "./projects/*.ts",
  "!./about/approach.ts",
]);

const loadersBySlug = Object.fromEntries(
  Object.entries(projectModules).map(([path, loader]) => {
    const filename = path.split("/").at(-1) ?? "";
    return [filename.replace(/\.ts$/, ""), loader];
  }),
) as Record<string, ProjectLoader>;

// const workSlugs = new Set(projectSummaries.map(({ slug }) => slug));

export const loadProject = async (
  slug: string,
): Promise<Project | undefined> => {
  const summary = projectSummaries.find((project) => project.slug === slug);
  if (!summary) return;
  const loader = loadersBySlug[slug];
  if (!loader) return;
  return {
    ...(await loader()).default,
    ...summary,
    videos: projectMedia[summary.slug],
  };
};
