import type { Project } from "../types";
import IacReleaseDiagram from "~/media/diagrams/azure-iac-release-path.svg?url&no-inline";
import IacReleaseDiagramPath from "~/media/diagrams/azure-iac-release-path.svg";

export default {
  slug: "azure-iac",
  path: "/projects/azure-iac",
  category: "Cloud infrastructure and deployment",
  title: "One Azure release process for two web applications",
  description:
    "I built a shared Azure release process that checks the version and destination, previews infrastructure changes and checks the website after deployment.",
  introduction:
    "My portfolio website and Access Control Demo have separate code repositories but share the same release needs. I built reusable Azure infrastructure and a common deployment process so both applications follow the same checks when a new version goes live.",
  featured: true,
  metrics: [
    {
      label: "Applications",
      value: ">=2",
      description: "Currently 2 apps. This site and the domo site",
    },
    {
      label: "Release process",
      value: "1 shared path",
      description: "Single workflow for both apps",
    },
    {
      label: "Automated tests",
      value: "112",
      description: "Checks configuration and deployment behaviour.",
    },
    {
      label: "Infastructure as Code",
      value: "Small IaC Demo",
      description: "Showcases a slice of my commercial skills",
    },
  ],
  sections: [
    {
      title: "What I needed",
      paragraphs: [
        "A working application build is only part of a release. The intended version needs to reach the right application without changing unrelated resources or disrupting shared services. I wanted one repeatable process across my projects, with clear ownership of application code and cloud infrastructure.",
      ],
    },
    {
      title: "My contribution",
      paragraphs: [
        "I built the Azure resource definitions, shared release workflow, configuration checks and automated tests. I also wrote the release and recovery runbooks. Each application repository owns its code, tests, packaged application and database migrations; the infrastructure repository owns the hosting resources and release rules.",
      ],
    },
    {
      title: "How a release reaches the website",
      paragraphs: [
        "The workflow checks the source repository and release commit against GitHub, then checks the application settings and destination against a centrally maintained configuration. It deploys a fixed packaged version, identified by its image digest, rather than a moving label such as “latest”.",
        "Before applying a release, the workflow inspects Azure’s preview of the proposed changes. Its checks reject deletions, unrelated resource changes and changes to the shared image registry or secret store. The preview runs again immediately before deployment.",
      ],
      images: [
        {
          src: IacReleaseDiagram,
          fullSrc: IacReleaseDiagramPath,
          w: 640,
          h: 1100,
          tone: "diagram",
          alt: "The portfolio website and Access Control Demo share source and configuration checks, a change preview, production deployment and website checks. A failed final check requires manual recovery.",
          caption:
            "The proposed changes are checked before deployment. Website checks run after the change has been applied.",
        },
      ],
    },
    {
      title: "Check the deployed result",
      paragraphs: [
        "After deployment, the workflow checks the configured application image, domain bindings and health endpoint. For this portfolio, it also requests the homepage and Access Control Demo project page. Temporary failures are retried within a time limit.",
        "A persistent failure marks the workflow unsuccessful. It does not undo the deployment; recovery is a manual operation through the release process.",
      ],
    },
    {
      title: "The result",
      paragraphs: [
        "Two deployed applications use one production release path, with their own settings and identities. The infrastructure project has 112 automated tests covering invalid requests as well as accepted ones, including mismatched source details, unapproved settings, forbidden infrastructure changes and failed website checks.",
        "The repository gives reviewers a concrete way to inspect how I take an application from a source commit to a deployed service, including the checks and operational decisions around that change.",
      ],
    },
  ],
  technologies: [
    {
      label: "Infrastructure",
      value: "Azure Bicep, Azure Container Apps",
    },
    {
      label: "Delivery",
      value: "GitHub Actions, Azure Container Registry, image digests",
    },
    {
      label: "Validation",
      value: "Node.js, JSON Schema, Azure what-if, automated tests",
    },
    {
      label: "Operations",
      value: "HTTP checks, domain bindings, release and recovery runbooks",
    },
  ],
  repoUrl: "https://github.com/BraddlesUnravels/iac",
  related: [
    {
      label: "Separate permissions and sensitive settings",
      href: "/projects/azure-access-and-secrets",
    },
    {
      label: "Access Control Demo",
      href: "/projects/access-control-demo",
    },
  ],
} satisfies Project;
