'use client';

import { useState } from 'react';

const capabilities = [
  { id: 'edr', label: 'EDR', expansion: 'Endpoint Detection and Response', sits: 'Agent or sensor on laptops, workstations and servers.', sees: 'Processes, command lines, files, modules, users, connections and selected memory behavior.', does: 'Records endpoint activity, detects suspicious behavior, supports investigation and may isolate or remediate a host.', examples: 'Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne Singularity, Palo Alto Cortex XDR.', blind: 'It cannot fully explain activity on unmanaged devices, unsupported systems or network paths it does not observe.' },
  { id: 'ndr', label: 'NDR', expansion: 'Network Detection and Response', sits: 'Network sensor, packet broker, virtual tap or cloud traffic mirror.', sees: 'Flows, packets, protocols, sessions, Domain Name System activity and network behavior.', does: 'Finds suspicious communication, lateral movement, command-and-control patterns and unmanaged assets.', examples: 'Vectra AI, ExtraHop Reveal(x), Darktrace, Corelight with Zeek-based telemetry.', blind: 'Encryption, asymmetric routing and missing sensor placement can limit visibility.' },
  { id: 'siem', label: 'SIEM', expansion: 'Security Information and Event Management', sits: 'Central analytics platform receiving logs and alerts from many systems.', sees: 'Normalized events, identities, cloud activity, application records and alerts supplied by integrated sources.', does: 'Searches, correlates, retains and visualizes evidence and runs detection rules across sources.', examples: 'Microsoft Sentinel, Splunk Enterprise Security, Google Security Operations, IBM QRadar.', blind: 'A SIEM cannot infer what sources never send, repair poor timestamps or create context that was never captured.' },
  { id: 'soar', label: 'SOAR', expansion: 'Security Orchestration, Automation and Response', sits: 'Workflow and integration layer beside case management and the SIEM.', sees: 'Alerts, case context, enrichment results and connected-system actions.', does: 'Runs playbooks, gathers context, creates tasks and performs approved response actions.', examples: 'Palo Alto Cortex XSOAR, Splunk SOAR, Microsoft Sentinel playbooks, Tines.', blind: 'Automation can spread a bad assumption quickly. High-impact actions need limits, approvals and rollback.' },
  { id: 'xdr', label: 'XDR', expansion: 'Extended Detection and Response', sits: 'Vendor-integrated detection and response layer across several telemetry domains.', sees: 'A connected subset of endpoint, identity, email, network, cloud and application signals.', does: 'Correlates vendor telemetry into incidents and coordinates investigation or response.', examples: 'Microsoft Defender XDR, Palo Alto Cortex XDR, CrowdStrike Falcon, Trend Micro Vision One.', blind: 'The label is not a standard architecture. Coverage, openness, data retention and third-party integration differ.' },
] as const;

const pipeline = [
  ['Question', 'Describe the behavior and consequence worth detecting.'],
  ['Telemetry', 'Identify the exact event fields and coverage required.'],
  ['Logic', 'Write a testable hypothesis, rule or analytic.'],
  ['Triage', 'Give an analyst context, priority and next checks.'],
  ['Response', 'Define safe containment, escalation and evidence preservation.'],
  ['Feedback', 'Measure false positives, misses, coverage and attacker adaptation.'],
] as const;

export default function DetectionOperationsExplorer() {
  const [active, setActive] = useState<(typeof capabilities)[number]['id']>('edr');
  const item = capabilities.find((entry) => entry.id === active) ?? capabilities[0];
  return <section className="detection-explorer" id="detection-operations-map">
    <header><span>Detection engineering</span><h2>A product produces signals. An operating model produces detection.</h2><p>Follow the evidence from a behavior worth finding to an investigation and measured improvement. Then inspect where common technologies sit.</p></header>
    <div className="detection-pipeline">{pipeline.map(([name, detail], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><p>{detail}</p>{index < pipeline.length - 1 && <i>→</i>}</article>)}</div>
    <div className="detection-layout">
      <div className="detection-tabs" role="tablist" aria-label="Detection technologies">{capabilities.map((entry) => <button className={active === entry.id ? 'active' : ''} onClick={() => setActive(entry.id)} role="tab" aria-selected={active === entry.id} type="button" key={entry.id}><strong>{entry.label}</strong><span>{entry.expansion}</span></button>)}</div>
      <article className="detection-detail" role="tabpanel"><header><span>{item.label}</span><h3>{item.expansion}</h3></header><div><section><b>Where it sits</b><p>{item.sits}</p></section><section><b>What it sees</b><p>{item.sees}</p></section><section><b>What it does</b><p>{item.does}</p></section><section><b>Software examples</b><p>{item.examples}</p></section><section className="wide"><b>Boundary</b><p>{item.blind}</p></section></div></article>
    </div>
    <aside className="detection-example"><span>Mini detection specification</span><p><b>Hypothesis:</b> a stolen administrator session is being used for remote execution. <b>Signals:</b> privileged sign-in, new service creation, remote process start, unusual host pair and command line. <b>Triage:</b> verify change ticket, account owner, source device and process ancestry. <b>Response:</b> contain the host and revoke sessions only after confirming scope and business impact.</p></aside>
  </section>;
}
