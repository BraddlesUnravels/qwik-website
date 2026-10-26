import type { Project } from "./types";
import { projectSummaries } from "./catalog";

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

const workSlugs = new Set(projectSummaries.map(({ slug }) => slug));

export const loadProject = async (slug: string) => {
  if (!workSlugs.has(slug)) return;
  const loader = loadersBySlug[slug];
  return loader ? (await loader()).default : undefined;
};
