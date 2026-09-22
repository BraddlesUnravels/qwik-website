export type CaseStudyMetric = {
  label: string;
  value: string;
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
  sections: CaseStudySection[];
  technologies: CaseStudyMetric[];
  lesson?: string;
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
