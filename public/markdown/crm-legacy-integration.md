# Connecting the lead-to-lease journey across three systems

**Business systems integration**

Customer information started in PipelineAxis CRM, then re-entered into QuoteCore
to prepare a quote that eventually reached LeaseCore if & when the lease settled.
Each hand-off created another opportunity for lost leads, inconsistent records and incomplete reporting.

**At a glance:** Systems: PipelineAxis, QuoteCore, LeaseCore · Reported conversion: –9 points at first · Expiry pipeline: Up to 3 months ahead · Approach: Incremental integration

## The problem

I inherited PipelineAxis with very little useful documentation. Users across sales, marketing,
operations and management depended on three separate systems that shared an SQL Server instance
but not a coherent customer workflow. Sales agents and management frequently bypassed PipelineAxis
and entered details directly into QuoteCore, teams & departments coordinated hand-offs through shared email
inboxes, MS Teams channels and other ad-hoc communication. These factors combined with the fact that none
of these systems passed identifiers to the others, it was virtually impossible to track leads, and reports
to be inaccurate. There was no reliable way to follow an enquiry through to a settled lease reliably

## My role

I traced the actual workflows with staff, mapped where each system stored and changed records,
developed the CRM-side integrations and worked with the IT manager, who owned QuoteCore and
coordinated the disabling of direct quote entry into QuoteCore. These acted as guardrails
supporting the intented business workflow; I did not replace all three platforms;
I connected the steps the business needed while leaving their critical existing operations intact.

## What I changed

### Bring website enquiries into the CRM

I mapped customer fields from PipelineAxis to QuoteCore and made the necessary UI refactor to support the
new integration along with the necessary backend logic to handle the quote creation and retrieval process.
The IT manager added the corresponding QuoteCore procedure, lead reference linkage and restriction on
manual quote creation. An agent could now create a quote from a PipelineAxis lead and receive its new
quote ID back in the agents UI.

### Find refinance opportunities from more than one source

I built a PipelineAxis module that combined LeaseCore lease dates and statuses with quote activity in QuoteCore. It excluded leases already ended or being refinanced and could assign upcoming opportunities to an agent up to three months before expiry. This avoided modifying an undocumented report inside LeaseCore.

### Create a linked quote without retyping the lead

I mapped customer fields from PipelineAxis to QuoteCore and made the necessary UI refactor to support the
new integration along with the necessary backend logic to handle the quote creation and retrieval process.
The IT manager added the corresponding QuoteCore procedure, lead reference linkage and restriction on
manual quote creation. An agent could now create a quote from a PipelineAxis lead and receive its new
quote ID back in the agents UI.

### Explain the reporting change

Once leads that previously disappeared before quoting became visible, the reported conversion rate initially fell by nine percentage points. I explained to management that the denominator had changed: the new report included enquiries the previous workflow had not recorded.

## The result

The business could trace a lead through quote creation and into the settled lease management system
and with less manual duplicate data entry. The refinance process made upcoming customer contacts visible
and was associated with a reported increase in retention of nearly one-third.

The conversion-rate drop was an improvement in measurement coverage, not evidence that sales performance had suddenly deteriorated.

## Technology and methods

- **CRM:** React, Redux, Node.js, Express.js, MSSQL
- **Legacy systems:** C# desktop quoting client, .NET lease platform
- **Integration:** Authenticated endpoint, cross-database stored procedure
- **Discovery:** Stakeholder interviews, workflow and reporting mapping

## Related case studies

- [Commercial engineering](/about/commercial-engineering/)
- [Qwik and HubSpot](/work/qwik-hubspot/)
