import type { CaseStudy } from "../types";

export default {
  slug: "ransomware-recovery",
  path: "/work/ransomware-recovery/",
  category: "Incident response",
  title: "Restoring critical systems after a ransomware incident",
  description: `
    I handled initial containment and recovery, helped investigate a likely source of
    exposed database credentials, and introduced security awareness and threat reporting.
  `,
  introduction: `
    In March 2024, a ransomware incident disrupted three business-critical applications and
    their databases. I handled initial containment, led network and workstation restoration,
    and worked with an external specialist on the subsequent investigation. We identified 8Base
    ransomware and later found a likely source of exposed database credentials in a legacy desktop
    application. My follow-up work established security training and a reporting channel for
    suspicious emails, and I gained authority to begin moving on-premises infrastructure to Azure.
  `,
  featured: false,
  metrics: [
    { label: "Initial response", value: "Containment" },
    { label: "Recovery", value: "Parallel workstreams" },
    { label: "Critical service", value: "Next morning" },
    { label: "Further restoration", value: "About 3 weeks" },
  ],
  sections: [
    {
      title: "The incident",
      paragraphs: [
        `
          On Monday morning the 4th of March 2024, I was asked to look at a workstation displaying a ransom message.
          Other machines were affected, and staff were already having difficulty accessing LeaseCore.
          I stopped workstation activity and moved to contain the incident before more systems were affected.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
          I isolated the office from external connectivity, stopped access to the affected business applications, 
          contacted the part-time IT manager and briefed the board on next steps. We divided the recovery into 
          parallel workstreams: he took responsibility for servers and databases, while I took responsibility for 
          the network and end-user devices. I also preserved available evidence before server restoration began.
        `,
      ],
    },
    {
      title: "What I did",
      subsections: [
        {
          title: "Contain the incident and preserve evidence",
          paragraphs: [
            `
              I stopped device use, isolated the network and kept company-issued devices onsite.
              I investigated the immediate scope of the incident and captured available volatile memory
              and process information before the IT manager began restoring the servers. He confirmed
              that protected database backups were available and led the server and database recovery.
            `,
          ],
        },
        {
          title: "Restore a usable working environment",
          paragraphs: [
            `
              I prepared six clean Windows installation drives and reimaged workstations in parallel.
              I then reinstalled Microsoft 365 and the locally installed quoting client, and reset
              affected network-connected equipment as part of preparing the environment for reconnection.
              This work ran alongside the server and database restoration.
            `,
          ],
        },
        {
          title: "Investigate the intrusion and the likely credential exposure",
          paragraphs: [
            `
              Following the recovery, I worked with an external incident-response specialist to
              investigate how the attack unfolded. We identified the ransomware as 8Base, a variant
              of the Phobos ransomware family, and traced the likely initial entry point to a
              malicious email attachment received from a compromised partner financier.
            `,
            `
              The investigation also uncovered a significant vulnerability in PackEdge, our locally
              installed quoting application. Its compiled executable contained database credentials
              in readable plaintext. Because PackEdge connected directly to the database, we identified
              this as the most likely source of the credentials used by the attackers to access our databases.
            `,
            `
              However, the available logs and memory dumps did not provide sufficient evidence to confirm
              that the attackers had obtained the credentials from PackEdge. The finding nevertheless
              exposed a serious security weakness, and required that the application’s owner remediate 
              the vulnerability.
            `,
          ],
        },
        {
          title: "Turn the investigation into practical prevention",
          paragraphs: [
            `
              I required the owner of PackEdge to address the plaintext database credentials bundled
              with the installed client. I also asked the IT manager to strengthen email scanning and
              threat detection in our Microsoft environment. Those were separate remediation requests;
              my role was to identify the risks and press for them to be addressed.
            `,
            `
              I implemented twice yearly cybersecurity awareness training focused on email diligence, tailoring
              sessions to situations employees encountered in their day-to-day work. I also made
              cybersecurity training mandatory for new employees during onboarding.
            `,
            `
              I set up a dedicated cyber-threat reporting inbox so anyone in the business could ask
              for help with a suspicious email, attachment or other potential threat. Most reports
              were false alarms, but the inbox gave staff a clear action to take instead of making
              the decision alone. It also surfaced a highly targeted spear-phishing campaign aimed
              at the operations manager and both directors.
            `,
          ],
        },
        {
          title: "Establish a path away from on-premises infrastructure",
          paragraphs: [
            `
              The longer-term outcome was that I was given authority to begin moving on-premises
              infrastructure to Azure. The incident and follow-up investigation turned infrastructure
              modernisation from a proposed improvement into an authorised workstream. That authority
              was the outcome at this stage; it should not be confused with a completed cloud migration.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
          Working in parallel, we restored critical applications and enough clean equipment for the
          business to resume by 9:00 am the following morning. Lower-priority restoration
          continued over the next three weeks. Protected backups limited the amount of database data
          requiring reconstruction.
        `,
        `
          My contribution covered initial containment, evidence preservation, network and workstation
          restoration, investigation, security-awareness training and the new threat-reporting process.
          The IT manager remained responsible for server and database restoration. The investigation
          identified a likely initial email entry point and a separate, plausible source of database
          credential exposure. The intrusion and investigation led to my being authorised to start 
          moving on-premises infrastructure to Azure.
        `,
      ],
    },
  ],
  technologies: [
    {
      label: "Response",
      value:
        "Network isolation, application shutdown, device control, network scanning",
    },
    { label: "Network scanning", value: "arp-scan, nmap, Wireshark, tcpdump" },
    {
      label: "Evidence preservation",
      value: "Volatile memory capture, process information capture",
    },
    {
      label: "Recovery",
      value: "Windows reimaging, Microsoft 365, network-device reset",
    },
    {
      label: "Investigation",
      value:
        "External incident-response support, 8Base / Phobos identification, compiled-client examination",
    },
    {
      label: "Follow-up",
      value:
        "Credential remediation request, Microsoft email scanning and detection request, employee and onboarding training, threat-reporting inbox, Azure migration authority",
    },
  ],
  related: [
    {
      label: "LeaseTrack customer portal",
      href: "/work/customer-finance-portal/",
    },
  ],
} satisfies CaseStudy;
