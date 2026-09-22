# Helping restore critical systems after a ransomware incident

**Incident response**

On a Monday morning March 2024, staff began finding ransom messages on their workstations. Three critical business applications and their databases were affected, and the priority was to limit further damage and restore a workable environment.

**At a glance:** Initial response: Containment · Recovery: Parallel workstreams · Critical service: Next morning · Further restoration: About 3 weeks

## The incident

I encountered the first affected workstation and quickly found others showing the same ransom message,
I immediatly took action stopping all workstation activity, in the meantime, staff reported of difficulty
accessing LeaseCore, meaning that critical business operations were aleady offline.

## My role

I stopped device use, isolated external connectivity and the internal environment, shut down business applications,
contacted the part-time IT manager scanned the network for immediate threats then briefed the board on next steps.
When he arrived, we divided the recovery: he took responsibility for servers and databases, while I took responsibility
for the network and end-user devices.

## What I did

### Contain and preserve available evidence

Initial containment, network scanning, and evidence preservation steps included keeping company devices onsite
and capturing available volatile memory and process information before server restoration began.
The IT manager confirmed that protected database backups were available; I did not perform the database recovery myself.

### Rebuild devices while server restoration proceeded

I prepared six clean Windows installation drives and reimaged machines in parallel, then restored Microsoft 365 and the locally installed quoting client. I also reset affected network-connected equipment as part of preparing the environment for reconnection.

### Investigate and improve the follow-up

After recovery I worked with an external incident-response specialist on the initial investigation. We traced the likely entry route to a malicious attachment from a compromised partner financier. This led to strengthened email scanning and I delivered security workshops for business teams. Later, while investigating an application error, I found plaintext database credentials embedded in a compiled legacy client. That finding was an additional exposure; it did not prove how the attackers obtained database access.

## The result

Working in parallel, we restored critical applications and enough clean equipment for business to resume by about 9:00 am the following morning. Lower-priority recovery continued over the next three weeks. Available backups limited the required database reconstruction, but the investigation did not establish every attacker action.

My contribution covered containment, evidence preservation, device and network restoration, and follow-up investigation;
server and database recovery remained with the IT manager.

## Technology and methods

- **Response:** Network isolation, application shutdown, device control
- **Network:** arp-scan, nmap, wireshark, tcpdump
- **Recovery:** Windows reimaging, Microsoft 365, network-device reset
- **Investigation:** Volatile memory capture, external incident-response support
- **Follow-up:** Email controls, staff security workshops

## Related case studies

- [LeaseTrack customer portal](/work/customer-finance-portal/)
