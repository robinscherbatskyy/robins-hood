'use client';

import { useState } from 'react';

const layers = [
  { name: 'Entity-level controls', purpose: 'Set the control environment, oversight, ethics, competence, risk assessment and organization-wide monitoring.', example: 'The audit committee oversees financial reporting and receives significant control matters.', evidence: 'Charters, minutes, organization design, risk assessment and monitoring records.' },
  { name: 'Business-process controls', purpose: 'Keep transactions complete, accurate, authorized, valid, timely and properly recorded through a defined process.', example: 'A separate approver releases a vendor payment after reviewing the supporting invoice and receipt.', evidence: 'Process narrative, approval record, reconciliation, exception report and follow-up.' },
  { name: 'Application controls', purpose: 'Apply validation, calculation, authorization, workflow or interface logic inside a financially relevant application.', example: 'A three-way match blocks payment when purchase order, goods receipt and invoice disagree.', evidence: 'Configuration, rule logic, test transaction, exception output and change history.' },
  { name: 'ITGCs', purpose: 'Support reliable system operation and continued reliance on automated controls and reports.', example: 'Production changes require approved source, testing, segregation and controlled deployment.', evidence: 'Access, change, operations, backup, job-monitoring and incident records for the in-scope environment.' },
  { name: 'Information-produced-by-entity controls', purpose: 'Establish that reports, queries, spreadsheets and data used by another control are complete and accurate.', example: 'A reviewer reconciles report parameters and totals before using the report in a monthly control.', evidence: 'Report logic, parameters, source reconciliation, access, version and review evidence.' },
] as const;

const assuranceCycle = [
  ['Scope', 'Identify material accounts, disclosures, assertions, locations, processes, systems and service organizations.'],
  ['Understand', 'Use narratives and walkthroughs to follow a transaction and confirm the real control points.'],
  ['Design', 'Ask whether the control could prevent or detect a material misstatement if it operated as described.'],
  ['Test', 'Inspect implementation and operation for the defined population, period, precision and frequency.'],
  ['Evaluate', 'Assess exceptions, compensating controls, likelihood, magnitude and aggregation of deficiencies.'],
  ['Remediate', 'Correct the cause, preserve management ownership and retest enough operation before closure.'],
] as const;

export default function FinancialControlsExplorer() {
  const [active, setActive] = useState(2);
  const layer = layers[active];
  return <section className="financial-controls-explorer" id="financial-controls-map">
    <header><span>Financial control architecture</span><h2>SOX is the law. ICFR is the control objective. ITGC is one supporting layer.</h2><p>The Sarbanes-Oxley Act (SOX), Internal Control over Financial Reporting (ICFR), Information Technology General Controls (ITGCs) and application controls are connected, but they are not synonyms.</p></header>
    <div className="financial-control-layers" role="tablist" aria-label="Financial control layers">{layers.map((item, index) => <button className={active === index ? 'active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={active === index} type="button" key={item.name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong></button>)}</div>
    <article className="financial-control-detail" role="tabpanel"><header><span>Selected layer</span><h3>{layer.name}</h3></header><div><section><b>Purpose</b><p>{layer.purpose}</p></section><section><b>Example</b><p>{layer.example}</p></section><section><b>Evidence</b><p>{layer.evidence}</p></section></div></article>
    <div className="financial-assurance-cycle"><header><span>From scope to conclusion</span><strong>Management owns the controls; auditors evaluate within a defined scope.</strong></header>{assuranceCycle.map(([name, detail], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><b>{name}</b><p>{detail}</p>{index < assuranceCycle.length - 1 && <i>→</i>}</article>)}</div>
    <div className="financial-boundaries"><article><b>SOC 1</b><p>A service-auditor report about controls at a service organization relevant to user entities&rsquo; ICFR. Customers still assess scope, complementary user controls and their own reliance.</p></article><article><b>Reasonable assurance</b><p>A high but not absolute level of confidence. Judgment, sampling, collusion, management override and changing conditions limit certainty.</p></article><article><b>Material weakness</b><p>A deficiency, or combination, creating a reasonable possibility that a material misstatement will not be prevented or detected on time.</p></article></div>
  </section>;
}
