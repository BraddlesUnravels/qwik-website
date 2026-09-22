import type { CaseStudy } from "../types";

export default {
  slug: "step-up-authentication",
  path: "/work/step-up-authentication/",
  category: "Application security",
  title: "Step-up authentication without interrupting routine portal use",
  description:
    "I added fresh identity checks to sensitive customer actions and enforced them at the API, not just in the React interface.",
  introduction: `
    Signing in with MFA establishes a session; it does not guarantee that the same 
    person is still present when an account holder later downloads sensitive documents or changes recovery details. 
    I designed a second check for actions where a compromised session would have greater consequences.
    `,
  featured: false,
  metrics: [
    { label: "Approval window", value: "5 minutes" },
    { label: "Challenge", value: "6-digit code" },
    { label: "Enforcement", value: "Server middleware" },
    { label: "Client flow", value: "Hold and resume" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        `
        LeaseTrack already had MFA at sign-in. Requiring the same challenge for every routine interaction would have been disruptive, 
        but trusting a long-lived session for password changes, document downloads and changes to primary contact details would have 
        left higher-consequence operations exposed to an unattended or compromised session.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
        I designed and implemented the step-up flow in the React/Redux client and Node.js server, including its route classification, 
        challenge state, short approval period, and verification of new contact methods before those methods could be trusted.
        `,
      ],
    },
    {
      title: "How it worked",
      subsections: [
        {
          title: "Classify protected requests on the server",
          paragraphs: [
            `
            A central route-and-HTTP-method list identified operations requiring fresh assurance. 
            The interface could open the challenge in advance, but server middleware independently checked a protected 
            request before its business handler ran. A direct API call therefore could not rely on a missing button or 
            a client-side flag to bypass the control.
            `,
          ],
        },
        {
          title: "Hold the action and resume it once",
          paragraphs: [
            `
            The React client kept the requested action and its form data in central Redux state, 
            opened a consistent six-digit verification flow and retried the action after approval. 
            Routine portal use did not require a repeat challenge, and a successful approval could be 
            reused for protected operations during its five-minute session-bound window.
            `,
          ],
        },
        {
          title: "Keep the proof on the server",
          paragraphs: [
            `
            After verification, the client received a public approval identifier and expiry. 
            The server session retained a separate secret and derived hash; middleware checked the identifier, 
            session state and expiry before allowing the operation. Missing, expired or mismatched approval data 
            stopped the action and cleared the approval state.
            `,
          ],
        },
        {
          title: "Treat a new contact channel as a separate trust decision",
          paragraphs: [
            `
            Changing an email address or phone number also required proving control of the proposed new destination. 
            The new contact record was not persisted until the code sent to that destination was verified.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
        Sensitive operations gained a fresh, server-enforced check while normal use remained uninterrupted.
        Customers did not need to refill a form after completing the challenge.
        I validated the intended success and denial paths through structured manual and integration testing. 
        `,
      ],
    },
  ],
  technologies: [
    { label: "Client", value: "React, Redux, central verification dialog" },
    { label: "API", value: "Node.js, Express, route/method middleware" },
    {
      label: "Assurance",
      value: "Email/SMS challenges, session-bound approval",
    },
    {
      label: "Validation",
      value: "Direct API, expiry, replay and failure-path checks",
    },
    {
      label: "Testing",
      value: "Indepentant unit tests, staged integration tests",
    },
  ],
  related: [
    {
      label: "LeaseTrack customer portal",
      href: "/work/customer-finance-portal/",
    },
    { label: "Customer migration", href: "/work/customer-migration/" },
  ],
} satisfies CaseStudy;
