import type { CaseStudy } from "../types";

export default {
  slug: "customer-migration",
  path: "/work/customer-migration/",
  category: "Identity and migration",
  title: "Moving 5,000+ accounts without a disruptive password reset",
  description: `
    I pre-migrated eligible customer accounts, then upgraded each password 
    from a legacy SHA-1 hash to Argon2 when its owner returned.
  `,
  introduction: `
    The old customer portal used four-digit usernames and SHA-1 password hashes. 
    A forced reset across thousands of infrequent users would have created expired links 
    and support calls at exactly the point the business needed a stable cutover.
  `,
  featured: true,
  metrics: [
    { label: "Accounts", value: "5,000+" },
    { label: "Legacy hash", value: "SHA-1" },
    { label: "New hash", value: "Argon2" },
    { label: "Pilot", value: "21 employees" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
          LeaseCore’s old portal was poorly documented and used four-digit usernames that 
          customers often forgot. The migration had to change the customer-facing authentication 
          system while avoiding a mass password-reset exercise. Because some customers did not 
          sign in for months, a short-lived reset campaign would have left many people with expired links.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I investigated the legacy hash format and login flow, implemented the staged account and credential 
          migration in LeaseTrack, tested failure paths and prepared a cutover with a rollback option.
        `,
      ],
    },
    {
      title: "How the migration worked",
      subsections: [
        {
          title: "Confirm the legacy hash rather than guess",
          paragraphs: [
            `
              The stored format suggested SHA-1. I registered about 100 development users with known 
              passwords and compared the resulting legacy hashes with output from a custom script. 
              Repeated matches established how the old application handled those passwords.
            `,
          ],
        },
        {
          title: "Separate account records from credential conversion",
          paragraphs: [
            `
              Eligible active accounts were created in the new portal in advance. 
              The password was not converted during that bulk step; each account remained unverified 
              until its owner successfully signed in. New eligible accounts could still originate 
              in the legacy staff workflow during the transition.
            `,
          ],
        },
        {
          title: "Upgrade only after the user proves the password",
          paragraphs: [
            `
              On a first sign-in, LeaseTrack matched the customer’s email to the pre-migrated account, 
              located the associated legacy hash and verified the submitted password using the confirmed 
              legacy algorithm. It then stored an Argon2 hash and cleared the legacy hash. 
              Email confirmation and SMS MFA completed the new-portal verification journey.
            `,
          ],
        },
        {
          title: "Pilot and retain a rollback path",
          paragraphs: [
            `
              I simulated successful and failing migrations against development data, then piloted the release 
              with 21 employees who had active leases. The release-day redirect from the old portal could be 
              removed and a prepared script could reactivate old portal accounts if a serious migration problem appeared.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          More than 5,000 customer accounts moved to the new portal without a blanket password reset. 
          Customers could use the password they already knew for their first login, while the new system 
          replaced the underlying credential after successful verification. The old four-digit identifier 
          was removed from their normal sign-in journey, and staff reported a substantial reduction 
          in forgotten-username calls.
        `,
        "This was a hybrid approach: account records moved ahead of release, while credential conversion happened just in time.",
      ],
    },
  ],
  technologies: [
    {
      label: "Authentication",
      value: "Legacy SHA-1 verification, Argon2, email confirmation, SMS MFA",
    },
    { label: "Application", value: "TypeScript, Node.js, Express.js" },
    { label: "Data", value: "MSSQL, migration scripts" },
    {
      label: "Rollout",
      value: "Internal pilot, redirect, rollback preparation",
    },
  ],
  related: [
    {
      label: "LeaseTrack customer portal",
      href: "/work/customer-finance-portal/",
    },
    { label: "Step-up authentication", href: "/work/step-up-authentication/" },
  ],
} satisfies CaseStudy;
