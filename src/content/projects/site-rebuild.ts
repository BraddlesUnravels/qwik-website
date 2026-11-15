import type { Project } from "../types";
import { content } from "../catalog";
// imgs
import WebsiteLanding from "~/media/site-rebuild/company-website-landing.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import LeaseCalculator from "~/media/site-rebuild/company-website-lease-calculator-monthly.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
import EmployeeEnquiry from "~/media/site-rebuild/company-contact-form-employee.png?w=640;960;1280;1600&format=webp&quality=80&withoutEnlargement&as=img";
// imgs paths
import WebsiteLandingFull from "~/media/site-rebuild/company-website-landing.png?url&no-inline";
import LeaseCalculatorFull from "~/media/site-rebuild/company-website-lease-calculator-monthly.png?url&no-inline";
import EmployeeEnquiryFull from "~/media/site-rebuild/company-contact-form-employee.png?url&no-inline";

export default {
  ...content.siteRebuild,
  category: "Web development and CRM automation",
  title: "New site · More leads captured",
  description: `
    I replaced WordPress with Qwik and connected enquiries to HubSpot,
    helping the business record nearly a third more leads without increasing
    campaign activity.
  `,
  introduction: `
    A month into rebuilding Inside Edge’s public website, I gave the board
    two options. They could extend the three-month deadline or bring in a
    second developer to keep the launch on schedule. The business was moving
    sales and marketing to HubSpot at the same time, and I was responsible
    for rebuilding the main site, connecting its enquiry forms and getting
    it live on Azure.
  `,
  featured: true,
  images: [
    {
      ...WebsiteLanding,
      fullSrc: WebsiteLandingFull,
      alt: "Inside Edge homepage with vehicle imagery and an estimate form.",
      caption:
        "The rebuilt homepage gave visitors a direct route into a lease estimate.",
    },
  ],
  metrics: [
    {
      label: "Delivery Deadline",
      value: "3 months",
      description: "The rebuilt site went live on schedule without downtime.",
    },
    {
      label: "Lighthouse Score",
      value: "3 x 100%",
      description:
        "Performance, Accessibility and Best Practices all scored 100.",
    },
    {
      label: "Recorded daily leads",
      value: "Incresed ~1/4",
      description:
        "Existing demand became visible without additional campaign activity.",
    },
    {
      label: "Lead allocation",
      value: "Automated",
      description:
        "HubSpot assigned website enquiries through the sales workflow.",
    },
  ],
  sections: [
    {
      title: "Dividing the work around our strengths",
      paragraphs: [
        `
          When my colleague joined, she took on the blog while I continued
          with the main site. I built the HubSpot integration, drawing on my
          API experience, and she brought her technical SEO experience to
          the project.
        `,
        `
          Once the forms were connected, I joined her on the SEO work across
          both parts of the site. It was an area I wanted to understand better.
        `,
      ],
    },
    {
      title: "Getting the page on screen sooner",
      images: [
        {
          ...LeaseCalculator,
          fullSrc: LeaseCalculatorFull,
          alt: "Lease calculator showing entered values, a monthly estimate and a contact toggle.",
          caption:
            "Visitors could review estimated lease costs and request a follow-up directly from the calculator.",
        },
      ],
      paragraphs: [
        `
          The old WordPress site was slow, and even small content changes
          depended on an external contractor.
        `,
        `
          I considered Next.js and Astro before choosing Qwik. It let me send
          rendered HTML from the server and load interaction code as visitors
          needed it. Across the site and blog, we added page-specific metadata
          and structured data. We also used Partytown to run compatible
          analytics scripts in a browser worker so they competed less with
          page rendering.
        `,
        `
          The lease calculator was one of the main features of the site.
          Visitors could start an estimate from the homepage, see a breakdown
          of their costs and ask for a follow-up.
        `,
      ],
    },
    {
      title: "Giving sales a record to work from",
      images: [
        {
          ...EmployeeEnquiry,
          fullSrc: EmployeeEnquiryFull,
          alt: "Employee enquiry form with contact details, employer details and an enquiry reason.",
          caption:
            "Website enquiries entered the same HubSpot workflow used to track attribution and sales follow-up.",
        },
      ],
      paragraphs: [
        `
          I’d already connected the WordPress forms to the internal CRM. 
          As the business grew, enquiries started coming in through more 
          social media platforms and advertising channels. Marketing needed 
          to see which campaigns were bringing in enquiries, and sales 
          needed to know who was responsible for following up.
        `,
        `
          I built the HubSpot integration on the server. It normalised the
          form data and checked for an existing contact using the visitor’s
          name, phone number and email. If it found no match, it created a
          new contact.
        `,
        `
          It also recorded which form the visitor used and kept any campaign
          or referral details, so marketing could trace enquiries back to
          Google, social media and other advertising channels. HubSpot
          assigned each website enquiry in rotation, taking agents’
          workloads into account.
        `,
        `
          The business also required offsite BDM enquiries to be logged in
          HubSpot before they progressed. Marketing could then review website
          enquiries and their campaign details alongside qualified calls from
          the new Aircall system.
        `,
      ],
    },
    {
      title: "What changed after launch",
      paragraphs: [
        `
          We went live on Azure within three months, without downtime.
          In testing, the site scored 100 in Lighthouse for Performance,
          Accessibility and Best Practices.
        `,
        `
          Inside Edge recorded an avergae increase of ~25% in lead capture without
          increasing campaign activity. Staff reported far fewer complaints
          from people who had asked to be contacted and never heard back.
          Sales managers also had a more complete lead count to work from
          when setting targets.
        `,
      ],
    },
  ],
  technologies: [
    {
      label: "Website",
      value: "Qwik, TypeScript, server rendering",
    },
    {
      label: "Performance and SEO",
      value: "Partytown, structured data, metadata, Lighthouse",
    },
    {
      label: "CRM",
      value: "HubSpot API, attribution and lead allocation",
    },
    {
      label: "Delivery",
      value: "Azure, collaborative delivery",
    },
  ],
  related: [
    {
      label: "CRM legacy integration",
      href: "/projects/tqe-legacy-integration",
    },
  ],
} satisfies Project;
