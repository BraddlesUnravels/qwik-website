import type { CaseStudy } from "../types";

export default {
  slug: "ransomware-recovery",
  path: "/work/ransomware-recovery/",
  category: "Incident response",
  title: "Restoring critical systems after a ransomware incident",
  description: `
    I handled initial containment, owned network and workstation restoration, 
    and worked with an external specialist on the subsequent investigation.
  `,
  introduction: `
    On a Monday morning March 2024, staff began finding ransom messages on their workstations. 
    Three critical business applications and their databases were affected, and the priority was 
    to limit further damage and restore a workable environment.
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
        I encountered the first affected workstation and quickly found others showing the same ransom message, 
        I immediatly took action stopping all workstation activity, in the meantime, staff reported of difficulty 
        accessing LeaseCore, meaning that critical business operations were aleady offline.
        `,
      ],
    },
    {
      title: "My role",
      paragraphs: [
        `
        I stopped device use, isolated external connectivity and the internal environment, shut down business applications, 
        contacted the part-time IT manager scanned the network for immediate threats then briefed the board on next steps. 
        When he arrived, we divided the recovery: he took responsibility for servers and databases, while I took responsibility 
        for the network and end-user devices.
        `,
      ],
    },
    {
      title: "What I did",
      subsections: [
        {
          title: "Contain and preserve available evidence",
          paragraphs: [
            `
            Initial containment, network scanning, and evidence preservation steps included keeping company devices onsite 
            and capturing available volatile memory and process information before server restoration began. 
            The IT manager confirmed that protected database backups were available; I did not perform the database recovery myself.
            `,
          ],
        },
        {
          title: "Rebuild devices while server restoration proceeded",
          paragraphs: [
            `
            I prepared six clean Windows installation drives and reimaged machines in parallel, then restored Microsoft 365 
            and the locally installed quoting client. I also reset affected network-connected equipment as part of preparing 
            the environment for reconnection.
            `,
          ],
        },
        {
          title: "Investigate and improve the follow-up",
          paragraphs: [
            `
            After recovery I worked with an external incident-response specialist on the initial investigation. 
            We traced the likely entry route to a malicious attachment from a compromised partner, strengthened 
            email scanning and I delivered security workshops for business teams. Later, while investigating an 
            application error, I found plaintext database credentials embedded in a compiled legacy client. That 
            finding was an additional exposure; it did not prove how the attackers obtained database access.
            `,
          ],
        },
      ],
    },
    {
      title: "The result",
      paragraphs: [
        `
        Working in parallel, we restored critical applications and enough clean equipment for business to resume by about 9:00 am 
        the following morning. Lower-priority recovery continued over the next three weeks. Available backups limited the required 
        database reconstruction, but the investigation did not establish every attacker action.
        `,
        `
        My contribution covered containment, evidence preservation, device and network restoration, and follow-up investigation; 
        server and database recovery remained with the IT manager.
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
    { label: "Network scanning", value: "arp-scan, nmap, wireshark, tcpdump" },
    {
      label: "Evidence preservation",
      value: "Volatile memory capture, process information capture",
    },
    {
      label: "Recovery",
      value:
        "Windows reimaging, network device reconfiguration, network-device reset",
    },
    {
      label: "Investigation",
      value: "Volatile memory capture, external incident-response support",
    },
    { label: "Follow-up", value: "Email controls, staff security workshops" },
  ],
  related: [
    {
      label: "LeaseTrack customer portal",
      href: "/work/customer-finance-portal/",
    },
  ],
} satisfies CaseStudy;
