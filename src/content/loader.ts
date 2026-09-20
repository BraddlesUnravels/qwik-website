import type { CaseStudy } from "./types";
import { caseStudySummaries } from "./catalog";

type StudyModule = { default: CaseStudy };
type StudyLoader = () => Promise<StudyModule>;

const studyModules = import.meta.glob<StudyModule>([
  "./studies/*.ts",
  "!./studies/commercial-engineering.ts",
]);

const loadersBySlug = Object.fromEntries(
  Object.entries(studyModules).map(([path, loader]) => {
    const filename = path.split("/").at(-1) ?? "";
    return [filename.replace(/\.ts$/, ""), loader as StudyLoader];
  }),
) as Record<string, StudyLoader>;

const workSlugs = new Set(caseStudySummaries.map(({ slug }) => slug));

export const loadCaseStudy = async (slug: string) => {
  if (!workSlugs.has(slug)) return undefined;
  const loader = loadersBySlug[slug];
  return loader ? (await loader()).default : undefined;
};
