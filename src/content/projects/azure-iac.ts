import type { Project } from "../types";
import { content } from "../catalog";
import IacReleaseDiagram from "~/media/diagrams/azure-iac-release-path.svg?url&no-inline";
import IacReleasePath from "~/media/diagrams/azure-iac-release-path.svg";

export default {
  ...content.iac,
  category: "Cloud infrastructure and deployment",
  title: "Azure infrastructure I can build on",
  description: `
    The Azure infrastructure behind my personal applications, organised
    around reusable components, clear responsibilities and repeatable releases.
  `,
  introduction: `
    I brought patterns I've used in commercial projects into the infrastructure
    behind my portfolio and Access Control Demo. This is a small, public example
    of how I organise cloud resources, keep application requirements separate
    and make deployments repeatable.
  `,
  featured: true,
  metrics: [
    {
      label: "Current use",
      value: "2 applications",
      description: "My portfolio website and Access Control Demo.",
    },
    {
      label: "Infrastructure",
      value: "Reusable modules",
      description:
        "Shared Bicep resource definitions with application-specific configuration.",
    },
    {
      label: "Deployment",
      value: "1 shared workflow",
      description:
        "Both applications deploy through the same GitHub Actions workflow.",
    },
    {
      label: "Verification",
      value: "Before + after",
      description:
        "Configuration and change checks before deployment; website health checks afterwards.",
    },
  ],
  sections: [
    {
      title: "Start with what can be shared",
      paragraphs: [
        `
          My portfolio uses Qwik and the Access Control Demo uses Next.js, but
          both need similar hosting and deployment capabilities. I kept each
          application's code, tests and container build in its own repository,
          and brought the Azure resource definitions and deployment checks
          together here.
        `,
        `
          Bicep modules define resources I can reuse, while each application
          has its own settings for capacity, health checks and approved secret
          references. Shared services, such as the container registry, sit
          separately from the setup each application needs.
        `,
        `
          That gives me a starting point for another project, with a clear
          place for the requirements that differ.
        `,
      ],
    },
    {
      title: "Keep a release focused",
      paragraphs: [
        `
          I separated initial infrastructure setup from application updates
          so a routine release only needs permission to change a limited set
          of resources.
        `,
        `
          Before deploying, the shared workflow verifies the application's
          source and packaged version, checks its settings and previews the
          proposed Azure changes. It stops the release if the proposed 
          changes would delete resources or affect other applications or shared services.
        `,
        `
          Afterwards, it checks the deployed image, domain bindings and
          website health. Automated tests cover accepted and rejected inputs,
          while runbooks document release and recovery steps. If the final
          checks fail, recovery remains manual.
        `,
      ],
      images: [
        {
          src: IacReleaseDiagram,
          fullSrc: IacReleasePath,
          w: 640,
          h: 1100,
          tone: "diagram",
          alt: `
            The portfolio website and Access Control Demo feed into shared release checks, 
            an Azure change preview, production deployment and live website checks. 
            Recovery after a failed final check is manual.
          `,
          caption:
            "Both applications use these release checks. The workflow verifies the live result after deployment.",
        },
      ],
    },
    {
      title: "Build out as the projects change",
      paragraphs: [
        `
          Today, both live applications use one supported deployment pattern:
          a single container per application on Azure Container Apps. The
          repository also includes experimental definitions for other
          arrangements, including a separate frontend, API and PostgreSQL
          database.
        `,
        `
          Those additional stacks remain prototypes. Supporting another
          deployment pattern would mean extending the templates, validation
          and workflow where needed. The existing layout gives that work a
          place to go.
        `,
      ],
    },
    {
      title: "What I want to carry forward",
      paragraphs: [
        `
          I want to carry useful infrastructure work from one project into
          the next. Keeping the Azure definitions separate from application
          code gives me a familiar starting point while leaving room for
          different frameworks and hosting needs. I can extend it as those
          needs become real.
        `,
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
