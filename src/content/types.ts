export type ProjectMetric = {
  label: string;
  value: string;
  description?: string;
};

// Plain metadata from an image import ending in `&as=img`.
// Strings and dimensions can safely cross the routeLoader$ boundary.
export type OptimizedImage = {
  src: string;
  srcset?: string;
  w: number;
  h: number;
};

export type ProjectImage = OptimizedImage & {
  alt: string;
  caption: string;
  fullSrc?: string;
  tone?: "dark" | "diagram";
};

export type ProjectSlug = ProjectSummary[][number]["slug"];

export type ProjectMedia = {
  id: string;
  title: string;
  label: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  seconds: number;
  caption: string;
};

export type ProjectSubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
};

export type ProjectSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: ProjectSubsection[];
  images?: ProjectImage[];
  videos?: ProjectMedia[];
};

export type Project = {
  slug: string;
  path: string;
  category: string;
  title: string;
  description: string;
  introduction: string;
  featured: boolean;
  metrics: ProjectMetric[];
  images?: ProjectImage[];
  videos?: ProjectMedia[];
  sections: ProjectSection[];
  technologies: ProjectMetric[];
  lesson?: string;
  repoUrl?: string;
  related: Array<{ label: string; href: string }>;
};

export type ProjectSummary = Pick<
  Project,
  "slug" | "path" | "category" | "title" | "description" | "featured"
> & {
  evidence: [string, string];
};

export type DataConnection = EventTarget & {
  readonly saveData?: boolean;
};

export const isProject = (value: unknown): value is Project => {
  return value !== null && typeof value === "object" && "title" in value;
};
