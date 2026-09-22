# Making lease balances available without a 34-minute DB lockout

**Legacy modernisation**

Checking one lease balance should not require recalculating every lease in the business. 
The existing stored procedure ran as a batch, blocked the LeaseCore application for about 
34 minutes and left displayed balances out of date (stale) between runs.

**At a glance:** Legacy procedure: 12,000+ lines · Old full batch: ~34 minutes · Individual API request: ~30 ms · Required overnight batch: 12–13 minutes

## The problem

The original stored procedure combined vehicle-lease calculations with old salary-packaging logic. It contained large commented-out sections and 36 unexplained constants (magic numbers). A payroll upload triggered an all-lease calculation and locked the system for roughly 34 minutes. There was no safe way to improve the performance until I could establish which financial rules were still active.

## My role

I investigated the procedure, confirmed the meaning of its financial inputs with the Head of Accounts, refactored the calculation and connected on-demand balance requests through the Node.js API. I also retained the batch process needed for payroll and transaction imports.

## How I changed it

### Build a controlled investigation environment

I created a local SQL Server database in Docker with about 150 active leases and 50 ended leases with complete histories. I stepped through the procedure with database debugging tools, identified dependencies between calculations and checked undocumented constants against the business rules.

### Refactor without silently changing balances

I removed code that could not be reached by the company’s vehicle-leasing workflows, then separated tax, lease-type, operating-cost and transaction-replay calculations into smaller units. After each change, I ran the original and modified procedure against the same leases and investigated differences before continuing.

### Separate single-lease requests from necessary batching

A calculation for an individual lease took about 20 ms at the database and around 30 ms through the monitored Node.js API in testing. I used the API route for on-demand balances because it provided a clearer place for logging and failure handling. The required full batch still blocked the application, but its runtime fell to 12–13 minutes and it was scheduled for 1:00 am rather than during normal business hours.

## The result

Staff and customers could request an up-to-date individual balance without triggering a database-wide batch. During the investigation I also found approximately $528,000 in negative balances on closed leases that the existing deficit reporting had missed. The accounts team introduced a weekly report and later recovered just over half of that identified amount.

The full-batch and individual-lease figures measure different operations: the change removed the need to run the batch just to display one current balance.

## Technology and methods

- **Database:** MSSQL, stored procedures, SQL debugging
- **API:** TypeScript, Node.js, Sentry
- **Validation:** Parallel old-versus-new calculation comparisons
- **Environment:** Docker, local database

## Related case studies

- [LeaseTrack customer portal](/work/customer-finance-portal/)
