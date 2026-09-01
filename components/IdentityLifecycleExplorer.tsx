'use client';

import { useState } from 'react';

const stages = [
  { name: 'Prove', decision: 'Is this person, workload or device the claimed subject?', evidence: 'Proofing record, authoritative source and confidence level.', failure: 'Weak enrollment creates a trusted account for the wrong subject.' },
  { name: 'Create', decision: 'Which digital identity and accounts should exist?', evidence: 'Named owner, purpose, identity record and approved account request.', failure: 'Orphaned or duplicate accounts obscure accountability.' },
  { name: 'Grant', decision: 'Which access is necessary for the current role and task?', evidence: 'Role or attribute policy, approval, segregation check and expiry.', failure: 'Bundled roles create toxic combinations or excessive standing access.' },
  { name: 'Use', decision: 'Does this request match identity, context, resource and policy?', evidence: 'Authentication, authorization and session telemetry.', failure: 'A valid credential is treated as proof that every action is legitimate.' },
  { name: 'Change', decision: 'What must change when role, location, risk or ownership changes?', evidence: 'Authoritative event, access delta, approval and completed propagation.', failure: 'Old access survives a transfer and combines with new permissions.' },
  { name: 'Review', decision: 'Is access still justified and independently understandable?', evidence: 'Resource-owner attestation, usage data, exceptions and remediation.', failure: 'Reviewers approve unfamiliar access without context or consequence.' },
  { name: 'Remove', decision: 'Which accounts, tokens, sessions, keys and downstream rights must end?', evidence: 'Disablement timestamps, revocation results and reconciliation.', failure: 'A disabled directory account leaves live sessions or application access.' },
] as const;

const layers = [
  ['Identity proofing', 'Establish who or what the subject is.'],
  ['Authentication', 'Test an authenticator such as a passkey, token or certificate.'],
  ['Federation', 'Carry a trusted identity assertion between security domains.'],
  ['Authorization', 'Decide whether the subject may perform the requested action.'],
  ['Session', 'Maintain, constrain and end the authenticated interaction.'],
  ['Governance', 'Assign ownership, review access, find conflicts and preserve evidence.'],
] as const;

export default function IdentityLifecycleExplorer() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];
  return <section className="identity-explorer" id="identity-lifecycle-map">
    <header><span>Identity operating model</span><h2>An account is one record inside a lifecycle.</h2><p>Identity security joins authoritative facts, authentication, access policy, sessions, ownership and timely removal. Select a stage to inspect the real decision.</p></header>
    <div className="identity-lifecycle" role="tablist" aria-label="Identity lifecycle">{stages.map((item, index) => <button className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} role="tab" aria-selected={selected === index} type="button" key={item.name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong>{index < stages.length - 1 && <i>→</i>}</button>)}</div>
    <article className="identity-stage-detail" role="tabpanel"><header><span>Lifecycle decision</span><h3>{stage.name}</h3></header><div><section><b>Ask</b><p>{stage.decision}</p></section><section><b>Retain</b><p>{stage.evidence}</p></section><section><b>Failure mode</b><p>{stage.failure}</p></section></div></article>
    <div className="identity-layer-map"><header><span>Do not collapse these layers</span><strong>Identity is not the same as authentication</strong></header>{layers.map(([name, detail], index) => <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><b>{name}</b><p>{detail}</p></div>)}</div>
    <aside className="identity-example"><span>Worked access decision</span><p><b>Subject:</b> Priya, finance analyst. <b>Resource:</b> vendor master. <b>Action:</b> change bank details. <b>Context:</b> managed device, approved network, normal hours. <b>Policy:</b> analyst may propose but cannot approve. <b>Result:</b> permit creation of a pending change, require a separate approver and log both decisions.</p></aside>
  </section>;
}
