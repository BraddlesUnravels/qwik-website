import type { Project } from "../types";
import WebsiteLanding from "~/media/site-rebuild/company-website-landing.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import LeaseCalculator from "~/media/site-rebuild/company-website-lease-calculator-monthly.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import EmployeeEnquiry from "~/media/site-rebuild/company-contact-form-employee.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";

export default {
  slug: "site-rebuild-with-intergration-hubspot",
  path: "/projects/site-rebuild-with-intergration-hubspot",
  category: "Web development and CRM automation",
  title: "Rebuilding a WordPress site with HubSpot intergration",
  description: `
    I rebuilt the public website in Qwik and implemented a server-side lead flow 
    that made enquiries and campaign attribution easier to follow.
  `,
  introduction: `
    The WordPress site was slow, difficult for marketing to update and only part of 
    the route a prospective customer took into sales. The project needed a faster public 
    website and a more reliable records of what happened after an enquiry.
  `,
  featured: true,
  images: [
    {
      ...WebsiteLanding,
      alt: "Inside Edge homepage with vehicle imagery and an estimate form.",
      caption:
        "The rebuilt Inside Edge homepage gives visitors a direct route into a lease estimate.",
    },
  ],
  metrics: [
    { label: "Delivery", value: "3 months" },
    { label: "Lighthouse", value: "100 in 3 categories" },
    { label: "Recorded daily leads", value: "Nearly ⅓ more" },
    { label: "Hosting", value: "Azure" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
          The previous WordPress site scored roughly 50–60 in Lighthouse Performance and 
          Accessibility and about 40 in SEO. Even small content changes depended on an external contractor. 
          Meanwhile, offsite and social-media enquiries could move between spreadsheets, documents and email 
          without becoming traceable CRM records.
        `,
        `
          An earlier project had already routed WordPress website enquiries into the old PipelineAxis CRM. 
          This later project replaced the website and moved the lead process into HubSpot.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I selected Qwik after considering Next.js and Astro, but niether could out-perform Qwik on the 
          main requirements of performance and SEO. I rebuilt the main public website, built its server-side HubSpot connection 
          and deployed the application to Azure. A second developer owned the blog. We worked together on shared SEO, metadata, 
          structured data and analytics integration across the complete site.
        `,
      ],
    },
    {
      title: "How I approached it",
      images: [
        {
          ...LeaseCalculator,
          alt: "Lease calculator showing entered values, a monthly estimate and a contact toggle.",
          caption:
            "The calculator turns vehicle and salary inputs into an estimate and offers a contact option.",
        },
        {
          ...EmployeeEnquiry,
          alt: "Employee enquiry form with contact details, employer details and an enquiry reason.",
          caption:
            "The employee enquiry form collects the details needed for the server-side lead workflow.",
        },
      ],
      subsections: [
        {
          title: "Prioritise fast, indexable pages",
          paragraphs: [
            `
              The decision to use Qwik was based on its support for server-rendered content, its resumability model 
              and control over page metadata. We used Partytown to move compatible third-party analytics work off 
              the main thread, and added structured data and page-specific metadata. These choices supported the 
              performance and discoverability requirements the project demanded.
            `,
          ],
        },
        {
          title: "Keep lead creation behind the server",
          paragraphs: [
            `
              On form submission, the backend normalised the data and checked HubSpot for an existing contact 
              using the available identifying details before creating a record when needed. 
              It carried campaign UTMs, referral information and form origin into the lead workflow, 
              where HubSpot handled agent allocation.
            `,
          ],
        },
        {
          title: "Account for leads created away from the website",
          paragraphs: [
            `
              The wider operating process required offsite and social media leads to enter HubSpot before progressing. 
              This replaced informal hand-offs and gave sales and marketing a more complete record to use 
              alongside qualified Aircall call data.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          The Azure-hosted site achieved Lighthouse scores of 100 for Performance, Accessibility and Best Practices during 
          testing and benchmarking including production testing. Recorded daily leads increased by just under one-third 
          without a corresponding increase in campaign activity, suggesting that more existing demand was being captured and made visible. 
          Staff also reported substantially fewer complaints about customers not receiving a response.
        `,
        "The change improved capture and visibility of leads; it was not measured as a change in site traffic or sales conversion.",
      ],
    },
  ],
  technologies: [
    {
      label: "Website",
      value: "Qwik, TypeScript, server rendering, structured data",
    },
    { label: "Performance", value: "Partytown, Lighthouse" },
    { label: "CRM", value: "HubSpot API, UTM and referral attribution" },
    {
      label: "Delivery",
      value: "Azure; joint integration with blog developer",
    },
  ],
  related: [
    {
      label: "CRM legacy integration",
      href: "/projects/crm-legacy-integration/",
    },
  ],
} satisfies Project;
