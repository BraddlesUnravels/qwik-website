# Rebuilding a WordPress site with HubSpot intergration

**Web development and CRM automation**

The WordPress site was slow, difficult for marketing to update and only part of the route a prospective customer took into sales. The project needed a faster public website and a more reliable records of what happened after an enquiry.

**At a glance:** Delivery: 3 months · Lighthouse: 100 in 3 categories · Recorded daily leads: Nearly ⅓ more · Hosting: Azure

## The problem

The previous WordPress site scored roughly 50–60 in Lighthouse Performance and Accessibility and about 40 in SEO. Even small content changes depended on an external contractor. Meanwhile, offsite and social-media enquiries could move between spreadsheets, documents and email without becoming traceable CRM records.

An earlier project had already routed WordPress website enquiries into the old PipelineAxis CRM. This later project replaced the website and moved the lead process into HubSpot; 

## My role

I selected Qwik after considering Next.js and Astro, but niether could out-perform Qwik on the 
main requirements of performance and SEO. I rebuilt the main public website, built its server-side HubSpot connection 
and deployed the application to Azure. A second developer owned the blog. We worked together on shared SEO, metadata, 
structured data and analytics integration across the complete site.

## How I approached it

### Prioritise fast, indexable pages

The decision to use Qwik was based on its support for server-rendered content, its resumability model 
and control over page metadata. We used Partytown to move compatible third-party analytics work off 
the main thread, and added structured data and page-specific metadata. These choices supported the 
performance and discoverability requirements the project demanded.

### Keep lead creation behind the server

On form submission, the backend normalised the data and checked HubSpot for an existing contact 
using the available identifying details before creating a record when needed. 
It carried campaign UTMs, referral information and form origin into the lead workflow, 
where HubSpot handled agent allocation.

### Account for leads created away from the website

The wider operating process required offsite and social leads to enter HubSpot before progressing. This replaced informal hand-offs and gave sales and marketing a more complete record to use alongside qualified Aircall call data.

## The result

The Azure-hosted site achieved Lighthouse scores of 100 for Performance, Accessibility and Best Practices during 
testing and benchmarking including production testing. Recorded daily leads increased by just under one-third 
without a corresponding increase in campaign activity, suggesting that more existing demand was being captured and made visible. 
Staff also reported substantially fewer complaints about customers not receiving a response.

The change improved capture and visibility of leads; it was not measured as a change in site traffic or sales conversion.

## Technology and methods

- **Website:** Qwik, TypeScript, server rendering, structured data
- **Performance:** Partytown, Lighthouse
- **CRM:** HubSpot API, UTM and referral attribution
- **Delivery:** Azure; joint integration with blog developer

## Related case studies

- [CRM legacy integration](/work/crm-legacy-integration/)
