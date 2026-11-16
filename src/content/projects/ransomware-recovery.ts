import { content } from "../catalog";
import type { Project } from "../types";

export default {
  ...content.ransomware,
  category: "Cyber Security & Incident Response",
  title: "Ransomware recovery · An overnight rebuild",
  description: `
    I contained an 8Base ransomware incident and rebuilt network and staff systems,
    helping restore critical operations by the following morning.
  `,
  introduction: `
    The morning of Monday 4 March 2024, an administration colleague asked why his computer was
    displaying a ransom message. Some staff were still working; other machines were
    already locked. The incident affected all systems business relied on to manage customers, 
    quotes and leases.

    I handled the initial response, took responsibility for network and workstation
    recovery, and later led the initial investigation with external specialist
    support. The IT manager owned server and database restoration.
  `,
  featured: false,
  metrics: [
    {
      label: "Immediate response",
      value: "Containment",
      description:
        "Isolated the network, stopped workstation use, briefed board",
    },
    {
      label: "Recovery approach",
      value: "Working in parallel",
      description:
        "I rebuilt the network and staff devices while the IT manager restored servers and databases.",
    },
    {
      label: "Critical services",
      value: "9 am Tuesday",
      description:
        "Available the morning after discovery; wider restoration continued.",
    },
    {
      label: "Infection source",
      value: "Confirmed",
      description:
        "An email attachment was identified; use of exposed credentials remained unproven.",
    },
  ],
  sections: [
    {
      title: "Stopping work to contain the incident",
      paragraphs: [
        `
          I stopped staff from using company systems, disconnected the office from
          external connectivity and shut down the business applications. I called the
          part-time IT manager in and briefed the board, recommending that staff go
          home while company-issued devices stayed onsite.
        `,
        `
          When the IT manager arrived, he confirmed that all three application
          databases were encrypted, but protected backups were available. Before
          server restoration began, I captured a memory dump to preserve evidence of
          the systems' running state.
        `,
      ],
    },
    {
      title: "Two people, parallel recovery",
      paragraphs: [
        `
          I proposed dividing the recovery: the IT manager would restore servers and
          databases while I rebuilt the network and end-user environment.
        `,
        `
          Using clean Windows installation media from Microsoft, I prepared six USB
          drives and rebuilt six workstations at a time. Each needed its existing
          operating system erased, Windows installed afresh, and Microsoft 365 and
          the QuoteCore desktop quoting application reinstalled. I also factory-reset
          network-connected equipmen from the router to the printers printers.
        `,
        `
          We worked through the night and had business-critical systems back online by
          9 am Tuesday. Recovery of lower-priority systems continued over the next
          three weeks.
        `,
      ],
    },
    {
      title: "Identifying the ransomware and tracing its entry",
      paragraphs: [
        `
          I was asked to lead the initial investigation. With limited post-incident
          forensic experience, I brought in an external specialist to help reconstruct
          what had happened.
        `,
        `
          Together, we identified the malware as the Phobos ransomware variant used
          by 8Base and confirmed that the infection had arrived through an email
          attachment from a financier partner that had itself suffered a ransomware
          attack.
        `,
        `
          We tightened email-scanning sensitivity, accepting more legitimate messages
          being flagged for review. I also ran department-specific workshops around
          the emails and attachments staff handled in their daily work.
        `,
        `
          In February 2025, an international operation led to the arrest of
          alleged 8Base operators and disrupted the group's infrastructure.
        `,
      ],
    },
    {
      title: "Exposed credentials, an unconfirmed route",
      paragraphs: [
        `
          The investigation had established how the infection entered, but the route
          to database access remained unresolved.
        `,
        `
          About a month later, a QuoteCore update produced a database authentication
          error on a staff member's machine. I opened the application's compiled
          executable in a text editor and found database credentials stored in
          plaintext.
        `,
        `
          Those credentials exposed a viable route into the database. However, no logs
          or alerts established that the attackers had used them. The discovery
          confirmed a credential exposure; its role in the incident remained unproven.
        `,
      ],
    },
    {
      title: "Results",
      paragraphs: [
        `
          Working with the IT manager, I helped restore critical operations by the
          following morning, while the wider recovery continued over three weeks. His
          protected backups made database restoration possible; my work rebuilt the
          network and staff devices needed to use those systems.
        `,
        `
          The follow-up established the infection source, strengthened email controls
          and uncovered a database credential exposure. My responsibilities expanded
          to include broader vulnerability remediation, with authority to act on
          security weaknesses.
        `,
      ],
    },
  ],
  technologies: [
    {
      label: "Containment",
      value: "Network isolation, service shutdown and device control",
    },
    {
      label: "Evidence preservation",
      value: "Volatile memory and process capture",
    },
    {
      label: "Recovery",
      value: "Windows reimaging, Linux and network-device reset",
    },
    {
      label: "Investigation",
      value:
        "External incident-response support and compiled-client examination",
    },
    {
      label: "Prevention",
      value: "Email scanning, staff workshops and vulnerability remediation",
    },
  ],
  lesson: `
    Finding exposed credentials a month later reinforced a practical lesson for me:
    getting systems running again and understanding how they were compromised are
    separate jobs.
  `,
  related: [
    {
      label: "8Base ransomware: Background and Phobos connection",
      href: "https://brandefense.io/knowledge-hub/ransomware-groups/8base/",
    },
    {
      label: "US Department of Justice: 8Base arrests and disruption",
      href: "https://www.justice.gov/opa/pr/phobos-ransomware-affiliates-arrested-coordinated-international-disruption",
    },
  ],
} satisfies Project;
