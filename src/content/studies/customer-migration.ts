import type { CaseStudy } from "../types";

export default {
  slug: "customer-migration",
  path: "/work/customer-migration/",
  category: "Identity and migration",
  title: "Migrating 5,000 customers without a blanket password reset",
  description:
    "How I combined pre-migration with just-in-time credential upgrading to move customers safely from SHA-1 to Argon2.",
  introduction:
    "The safest technical option is not always the least disruptive customer option. This migration improved password security without creating thousands of expired links, support calls or inaccessible accounts.",
  featured: true,
  metrics: [
    { label: "Accounts", value: "5,000+" },
    { label: "Legacy", value: "SHA-1" },
    { label: "Replacement", value: "Argon2" },
    { label: "Cutover", value: "Rollback ready" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Customers used four-digit usernames and SHA-1 password hashes, and many returned only occasionally. A mass password-reset campaign would have produced expired links, missed migration windows and a large support burden.",
        "Transforming every account and credential in one irreversible operation would also have enlarged the failure surface during cutover.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "I identified the legacy authentication mechanism, selected the migration strategy, implemented the new login flow, tested partial and failure states and prepared the rollback process.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Verify before building",
          paragraphs: [
            "I created approximately 100 test users with known passwords and compared custom SHA-1 output with hashes produced by the legacy application. Consistent matches gave me evidence for the migration logic rather than relying on format recognition alone.",
          ],
        },
        {
          title: "Separate account and credential migration",
          paragraphs: [
            "Eligible active accounts were created in the new portal before release, but each password moved only when its owner returned and proved knowledge of it.",
          ],
        },
        {
          title: "Upgrade on first sign-in",
          steps: [
            "Find the unverified migrated account by email.",
            "Retrieve the linked legacy username and SHA-1 hash.",
            "Verify the submitted password using the proven legacy algorithm.",
            "Hash the confirmed password with Argon2.",
            "Store the new credential and nullify the legacy hash.",
            "Complete expiring email confirmation and SMS MFA.",
          ],
        },
        {
          title: "Controlled cutover",
          paragraphs: [
            "Twenty-one employees with active leases completed a production pilot. On release day, traffic redirected to the new portal while a script remained ready to reactivate legacy accounts if a serious exception appeared.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "More than 5,000 customers moved without a blanket reset. They retained passwords they already knew while the system replaced the underlying credential after successful verification.",
        "Four-digit usernames disappeared from the customer journey, forgotten-identifier calls fell substantially and external access to the old portal was retired through a reversible migration boundary.",
      ],
    },
  ],
  technologies: [
    { label: "Application", value: "TypeScript, Node.js, Express.js, React" },
    { label: "Data", value: "MSSQL, scripted account preparation" },
    { label: "Identity", value: "SHA-1 verification, Argon2, JWT, SMS MFA" },
    {
      label: "Controls",
      value: "Production pilot, redirect cutover, rollback script",
    },
  ],
  lesson:
    "Migration strategy should reflect how customers actually use a service. Pre-creating accounts produced a predictable starting point; converting credentials only when customers returned limited disruption.",
  related: [
    {
      label: "Customer finance portal",
      href: "/work/customer-finance-portal/",
    },
    { label: "Step-up authentication", href: "/work/step-up-authentication/" },
  ],
} satisfies CaseStudy;
