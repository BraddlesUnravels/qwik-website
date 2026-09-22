# Step-up authentication without interrupting routine portal use

**Application security**

Signing in with MFA establishes a session; it does not guarantee that the same person is still present when an account holder later downloads sensitive documents or changes recovery details. I designed a second check for actions where a compromised session would have greater consequences.

**At a glance:** Approval window: 5 minutes · Challenge: 6-digit code · Enforcement: Server middleware · Client flow: Hold and resume

## The problem

LeaseTrack already had MFA at sign-in. Requiring the same challenge for every routine interaction would have been disruptive, but trusting a long-lived session for password changes, document downloads and changes to primary contact details would have left higher-consequence operations exposed to an unattended or compromised session.

## My role

I designed and implemented the step-up flow in the React/Redux client and Node.js server, including its route classification, challenge state, short approval period, and verification of new contact methods before those methods could be trusted.

## How it worked

### Classify protected requests on the server

A central route-and-HTTP-method list identified operations requiring fresh assurance. The interface could open the challenge in advance, but server middleware independently checked a protected request before its business handler ran. A direct API call therefore could not rely on a missing button or a client-side flag to bypass the control.

### Hold the action and resume it once

The React client kept the requested action and its form data in central Redux state, opened a consistent six-digit verification flow and retried the action after approval. Routine portal use did not require a repeat challenge, and a successful approval could be reused for protected operations during its five-minute session-bound window.

### Keep the proof on the server

After verification, the client received a public approval identifier and expiry. The server session retained a separate secret and derived hash; middleware checked the identifier, session state and expiry before allowing the operation. Missing, expired or mismatched approval data stopped the action and cleared the approval state.

### Treat a new contact channel as a separate trust decision

Changing an email address or phone number also required proving control of the proposed new destination. The new contact record was not persisted until the code sent to that destination was verified.

## The result

Sensitive operations gained a fresh, server-enforced check while normal use remained uninterrupted. Customers did not need to refill a form after completing the challenge. I validated the intended success and denial paths through structured manual and integration testing.

## Technology and methods

- **Client:** Typescript, React, Redux, central verification dialog
- **API:** Typescript, Node.js, Express, route/method middleware
- **Assurance:** Email/SMS challenges, session-bound approval
- **Validation:** Direct API, expiry, replay and failure-path checks
- **Testing:** Indepentant unit tests, staged integration tests

## Related case studies

- [LeaseTrack customer portal](/work/customer-finance-portal/)
- [Customer migration](/work/customer-migration/)
