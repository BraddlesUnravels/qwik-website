# Bradley Laskey’s portfolio website

I built this site to show the systems I’ve worked on, what I changed and how I checked the results. It’s a server-rendered Qwik and Qwik City site with case studies, screenshots and recorded workflows. The [portfolio](https://www.braddlesunravels.online/) runs on Bun in Azure Container Apps.

## Run it locally

Install Bun 1.3.12, the version pinned in [package.json](package.json), then run these commands from the repo root.

```sh
bun install --frozen-lockfile
bun run dev
```

Open the URL Vite prints. The site runs with the checked-in content and assets. The live demo button needs [server-side configuration](doc/runtime.md#live-demo-redirect).

## Working on the site

| Task                                          | Guide                                   |
| --------------------------------------------- | --------------------------------------- |
| Run a local build or find a route             | [Development](doc/development.md)       |
| Update a project card or case study           | [Portfolio content](doc/content.md)     |
| Add a screenshot, diagram or video            | [Project media](doc/media.md)           |
| Change typography, navigation or interactions | [UI and accessibility](doc/ui.md)       |
| Run tests or troubleshoot a CI check          | [Testing](doc/testing.md)               |
| Configure the demo redirect, SEO or server    | [Runtime configuration](doc/runtime.md) |
| Run the container or publish a release        | [Deployment](doc/deployment.md)         |

[Audit notes](doc/audit.md) record the gaps I found and the checks I ran.
