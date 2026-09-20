import type { CaseStudy } from "../types";

export default {
  slug: "ransomware-recovery",
  path: "/work/ransomware-recovery/",
  category: "Incident response",
  title: "Ransomware response and critical-system recovery",
  description:
    "My contribution to containing a ransomware incident, restoring end-user systems and investigating how the compromise occurred.",
  introduction:
    "I handled initial containment, owned the network and end-user recovery stream and later led the initial investigation with an external specialist. The IT manager owned server and database restoration.",
  featured: false,
  metrics: [
    { label: "Containment", value: "Immediate" },
    { label: "Critical recovery", value: "By 9:00 am" },
    { label: "Workstreams", value: "Parallel" },
    { label: "Follow-up", value: "Remediation" },
  ],
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Some workstations displayed ransom notices while others were still in use. Three connected applications supporting CRM, quoting and lease management were affected, but the entry point and extent of access were initially unknown.",
      ],
    },
    {
      title: "Responsibility",
      paragraphs: [
        "As the first technical responder, I stopped system use, isolated the environment, brought in the part-time IT manager and briefed the board. We split recovery so database and server work could proceed in parallel with network and device restoration.",
      ],
    },
    {
      title: "Solution",
      subsections: [
        {
          title: "Containment and evidence",
          paragraphs: [
            "I disconnected external connectivity, isolated the internal network, shut down business applications and retained company devices onsite. Before restoration, I captured available volatile memory and process information.",
          ],
        },
        {
          title: "Parallel recovery",
          paragraphs: [
            "I created six clean Windows installation drives and processed workstations in parallel, reinstalling Microsoft 365 and the local quoting client. Network-connected devices were reset before reconnection.",
          ],
        },
        {
          title: "Investigation and prevention",
          paragraphs: [
            "The external specialist and I traced the entry point to a malicious attachment from a compromised partner. Email scanning was strengthened and I ran department-specific workshops. Later inspection also exposed plaintext database credentials in a compiled legacy client.",
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "Critical applications and enough clean equipment were available by 9:00 am the next day. Protected backups limited database loss to changes after the latest backup, while lower-priority restoration continued over three weeks.",
        "The investigation identified the entry point and a serious credential weakness without claiming a complete reconstruction of every attacker action.",
      ],
    },
  ],
  technologies: [
    {
      label: "Containment",
      value: "Network isolation, shutdown, device control",
    },
    { label: "Evidence", value: "Volatile memory and process capture" },
    {
      label: "Recovery",
      value: "Windows reimaging, Microsoft 365, network resets",
    },
    { label: "Follow-up", value: "External IR support, training, remediation" },
  ],
  lesson:
    "Stop the spread, preserve what evidence you can, divide ownership clearly, restore in business-priority order and remain honest about what the evidence does not prove.",
  related: [],
} satisfies CaseStudy;
