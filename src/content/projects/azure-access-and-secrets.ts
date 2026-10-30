import type { Project } from "../types";
import azureIacAccessBoundaries from "~/media/diagrams/azure-iac-access-boundaries.svg?url&no-inline";
import azureIacAccessBoundariePath from "~/media/diagrams/azure-iac-access-boundaries.svg";

export default {
  slug: "azure-access-and-secrets",
  path: "/projects/azure-access-and-secrets",
  category: "Cloud permissions and sensitive settings",
  title: "Separate permissions for publishing, deployment and runtime",
  description:
    "I separated the identities used to publish, preview, deploy and run each application, and kept runtime secret values in Azure Key Vault.",
  introduction:
    "The same automated identity should not need to publish software, change infrastructure and read an application’s sensitive settings. In my Azure infrastructure project, I separated those jobs and defined how each application receives the secret values it needs to run.",
  featured: false,
  metrics: [
    {
      label: "Identity design",
      value: "4 jobs per app",
      description: "Publish, plan, deploy and run.",
    },
    {
      label: "GitHub sign-in",
      value: "Short-lived tokens",
      description: "Short-lived tokens for GitHub sign-in.",
    },
    {
      label: "Secret storage",
      value: "Azure Key Vault",
      description: "Secrets are kept in Azure Key Vault.",
    },
    {
      label: "Related work",
      value: "Shared Azure release process",
    },
  ],
  sections: [
    {
      title: "What I needed",
      paragraphs: [
        "The portfolio website and Access Control Demo share cloud services, but their release tasks have different access needs. A process that previews a change should not also need permission to apply it. Routine releases should not require permission to alter identities or rewrite the secret store.",
      ],
    },
    {
      title: "My contribution",
      paragraphs: [
        "I defined separate publisher, planner, deployer and runtime identities for each application. I configured short-lived GitHub-to-Azure authentication, the role assignments and the approved secret references. Foundation setup and permission changes remain separate operator work.",
      ],
    },
    {
      title: "Give each job a defined role",
      paragraphs: [
        "The publisher writes the packaged application to its image repository. The planner reads infrastructure and previews changes. The deployer updates Container Apps using a custom role without registry, Key Vault or permission writes. The runtime identity can read its application image and approved secrets.",
      ],
      images: [
        {
          src: azureIacAccessBoundaries,
          fullSrc: azureIacAccessBoundariePath,
          w: 640,
          h: 1000,
          tone: "diagram",
          alt: "Publish, plan, deploy and runtime permissions.",
          caption: "Separate roles and runtime secrets.",
        },
      ],
    },
    {
      title: "Keep secret values out of release configuration",
      paragraphs: [
        "GitHub authenticates to Azure with short-lived identity tokens rather than a stored Azure password. For runtime settings, the release configuration carries approved secret names. Azure resolves the corresponding values from Key Vault using the application’s runtime identity.",
      ],
    },
    {
      title: "Match the boundary to the control",
      paragraphs: [
        "The deployment role is scoped to the shared Azure resource group. Workflow checks restrict a routine release to the selected application and reject unrelated changes. The role definition and the release checks provide different parts of that control.",
      ],
    },
    {
      title: "The result",
      paragraphs: [
        "The repository makes the access design explicit: which identity performs each job, which permissions its role defines, and how runtime settings reach the application. This supports the shared release process while keeping routine deployment separate from foundation and permission changes.",
      ],
    },
  ],
  technologies: [
    {
      label: "Identity",
      value: "OIDC, managed identities",
    },
    {
      label: "Permissions",
      value:
        "Azure role assignments, custom roles, registry repository conditions",
    },
    {
      label: "Sensitive settings",
      value: "Azure Key Vault, runtime secret references",
    },
    {
      label: "Definition and checks",
      value: "Azure Bicep, configuration validation, automated tests",
    },
  ],
  repoUrl: "https://github.com/BraddlesUnravels/iac",
  related: [
    {
      label: "The shared Azure release process",
      href: "/projects/azure-iac",
    },
    {
      label: "Access Control Demo",
      href: "/projects/access-control-demo",
    },
  ],
} satisfies Project;
