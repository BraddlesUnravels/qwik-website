import type { CaseStudy } from "../types";

export default {
  slug: "step-up-authentication",
  path: "/work/step-up-authentication/",
  category: "Application security",
  title: "Step-up authentication for sensitive customer actions",
  description:
    "How I added recent identity assurance around high-risk actions while keeping ordinary portal use straightforward.",
  introduction:
    "Signing in with MFA did not mean every later action should be trusted automatically. Sensitive operations required fresh identity evidence while routine portal use remained uninterrupted.",
  featured: true,
  metrics: [
    { label: "Approval", value: "5 minutes" },
    { label: "Enforcement", value: "Server-side" },
    { label: "Challenge", value: "Email or SMS" },
    { label: "Default", value: "Fail closed" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "A valid session could remain open after its owner stepped away or be taken from a compromised device. An attacker could then change credentials, replace trusted contact details or download sensitive documents.",
        "Prompting for MFA on every write would have been frustrating; relying on hidden interface controls would not have protected the API.",
      ],
    },
    {
      title: "Responsibility",
      bullets: [
        "Protect high-consequence operations without interrupting routine use.",
        "Enforce the control even when the interface is bypassed.",
        "Expire approval quickly and fail closed.",
        "Keep validation secrets and decision-making on the server.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Risk-based route classification",
          paragraphs: [
            "A central server list matched protected routes and HTTP methods. Password changes, document downloads and primary-contact changes required recent assurance, while low-risk activity did not.",
          ],
        },
        {
          title: "Hold and resume",
          paragraphs: [
            "The React and Redux client retained the original action, opened one application-level verification dialog and replayed the action once after successful verification. Customers did not lose completed form data.",
          ],
        },
        {
          title: "Server-authoritative approval",
          paragraphs: [
            "Middleware ran before protected route handlers. The server retained a secret and derived hash; the browser received only a public identifier and expiry. Missing, expired or mismatched state cleared approval and stopped the business action.",
          ],
        },
        {
          title: "Denial-path validation",
          bullets: [
            "Missing, malformed, expired and valid approvals.",
            "Direct API requests, replay and cross-session identifiers.",
            "Cancellation, provider failure and successful held-action replay.",
            "Verification of proposed email addresses and phone numbers before persistence.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "High-consequence actions required recent, same-session identity assurance before their route handlers ran. Customers completed one short challenge and retained the action they had already started.",
        "The defensible result is the control itself: direct endpoint access could not bypass it, while ordinary portal interactions did not become repeated authentication ceremonies.",
      ],
    },
  ],
  technologies: [
    { label: "Client", value: "React, Redux, central verification dialog" },
    { label: "Server", value: "TypeScript, Node.js, Express.js, middleware" },
    { label: "Identity", value: "Email and SMS MFA, expiring challenges, JWT" },
    {
      label: "Controls",
      value: "Session binding, server-held secrets, expiry, replay protection",
    },
  ],
  lesson:
    "I would now automate the complete route, expiry, replay, session-isolation and hold-and-resume matrix in CI and consider narrower action-category binding.",
  related: [
    { label: "Customer migration", href: "/work/customer-migration/" },
    {
      label: "Customer finance portal",
      href: "/work/customer-finance-portal/",
    },
  ],
} satisfies CaseStudy;
