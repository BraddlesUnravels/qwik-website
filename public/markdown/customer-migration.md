# Moving 5,000+ accounts without a blanket password reset

**Identity and migration**

The old customer portal used four-digit usernames and SHA-1 password hashes. A forced reset across thousands of infrequent users would have created expired links and support calls at exactly the point the business needed a stable cutover.

**At a glance:** Accounts: 5,000+ · Legacy hash: SHA-1 · New hash: Argon2 · Pilot: 21 employees

## The problem

LeaseCore’s old portal was poorly documented and used four-digit usernames that customers often forgot. The migration had to change the customer-facing authentication system while avoiding a mass password-reset exercise. Because some customers did not sign in for months, a short-lived reset campaign would have left many people with expired links.

## My role

I investigated the legacy hash format and login flow, implemented the staged account and credential migration in LeaseTrack, tested failure paths and prepared a cutover with a rollback option.

## How the migration worked

### Confirm the legacy hash rather than guess

The stored format suggested SHA-1. I registered about 100 development users with known passwords and compared the resulting legacy hashes with output from a custom script. Repeated matches established how the old application handled those passwords.

### Separate account records from credential conversion

Eligible active accounts were created in the new portal in advance. The password was not converted during that bulk step; each account remained unverified until its owner successfully signed in. New eligible accounts could still originate in the legacy staff workflow during the transition.

### Upgrade only after the user proves the password

On a first sign-in, LeaseTrack matched the customer’s email to the pre-migrated account, located the associated legacy hash and verified the submitted password using the confirmed legacy algorithm. It then stored an Argon2 hash and cleared the legacy hash. Email confirmation and SMS MFA completed the new-portal verification journey.

### Pilot and retain a rollback path

I simulated successful and failing migrations against development data, then piloted the release with 21 employees who had active leases. The release-day redirect from the old portal could be removed and a prepared script could reactivate old portal accounts if a serious migration problem appeared.

## The result

More than 5,000 customer accounts moved to the new portal without a blanket password reset. Customers could use the password they already knew for their first login, while the new system replaced the underlying credential after successful verification. The old four-digit identifier was removed from their normal sign-in journey, and staff reported a substantial reduction in forgotten-username calls.

This was a hybrid approach: account records moved ahead of release, while credential conversion happened just in time.

## Technology and methods

- **Authentication:** Legacy SHA-1 verification, Argon2, email confirmation, SMS MFA
- **Application:** TypeScript, Node.js, Express.js
- **Data:** MSSQL, migration scripts
- **Rollout:** Internal pilot, redirect, rollback preparation

## Related case studies

- [LeaseTrack customer portal](/work/customer-finance-portal/)
- [Step-up authentication](/work/step-up-authentication/)
