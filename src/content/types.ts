export type CaseStudyMetric = {
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

export type CaseStudyImage = OptimizedImage & {
  alt: string;
  caption: string;
};

export type CaseStudySubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
};

export type CaseStudySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: CaseStudySubsection[];
  images?: CaseStudyImage[];
};

export type CaseStudy = {
  slug: string;
  path: string;
  category: string;
  title: string;
  description: string;
  introduction: string;
  featured: boolean;
  metrics: CaseStudyMetric[];
  images?: CaseStudyImage[];
  sections: CaseStudySection[];
  technologies: CaseStudyMetric[];
  lesson?: string;
  repoUrl?: string;
  related: Array<{ label: string; href: string }>;
};

export type CaseStudySummary = Pick<
  CaseStudy,
  "slug" | "path" | "category" | "title" | "description" | "featured"
> & {
  evidence: [string, string];
};

export const asStudy = (study: unknown): study is CaseStudy => {
  return study !== null && typeof study === "object" && "title" in study;
};
