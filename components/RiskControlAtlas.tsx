const riskTypes = [
  ['Strategic', 'Choices about markets, purpose, competition, investment and long-term direction fail to produce the intended outcome.', 'Demand change, failed acquisition, concentration in one product'],
  ['Operational', 'People, process, systems, facilities or suppliers fail to deliver an important service.', 'Processing error, capacity failure, supplier outage'],
  ['Financial', 'Funding, liquidity, credit, market prices, tax or financial reporting create loss or threaten viability.', 'Cash shortfall, counterparty default, valuation error'],
  ['Legal and compliance', 'The organization breaches a law, regulation, license, contract or enforceable obligation.', 'Privacy breach, sanctions violation, missed filing'],
  ['Conduct', 'Decisions or behavior create unfair customer, employee or market outcomes.', 'Mis-selling, conflict of interest, discriminatory treatment'],
  ['Technology and cyber', 'Technology failure or malicious activity affects confidentiality, integrity, availability, safety or resilience.', 'Account takeover, ransomware, failed deployment'],
  ['Third party and concentration', 'A supplier, fourth party, region, platform or shared dependency fails or becomes unsuitable.', 'Two vendors depend on the same identity provider'],
  ['Model and decision', 'A model is unsuitable, wrong, misused or operated beyond its validated limits.', 'Biased decision model, pricing model drift'],
  ['Project and change', 'A transformation fails to deliver scope, quality, adoption, cost, timing or intended benefits.', 'Migration delay, weak adoption, unsafe cutover'],
  ['People', 'Capacity, capability, culture, welfare, succession or key-person dependency affects objectives.', 'Critical skill loss, burnout, poor segregation of duties'],
  ['Safety and environmental', 'Activities harm people, physical assets or the environment.', 'Unsafe machine state, contamination, severe weather exposure'],
  ['Reputational', 'Stakeholders lose justified trust because of an underlying event, behavior or response.', 'Opaque incident response amplifies customer harm'],
];

const treatments = [
  ['Avoid', 'Do not begin, or stop, the activity creating the exposure.', 'Retire an unsupported internet-facing service.'],
  ['Reduce', 'Change likelihood, impact, duration, velocity or detectability.', 'Add strong authentication, segmentation and recovery.'],
  ['Share or transfer', 'Allocate defined consequences through contracts, insurance or partnership.', 'Cyber insurance absorbs covered financial loss, while operational responsibility remains.'],
  ['Accept or retain', 'Keep the residual exposure through authorized, informed and time-bounded decision.', 'A service owner accepts a low-impact exception until replacement.'],
  ['Pursue or enhance', 'Take more uncertainty deliberately where upside supports the objective.', 'Pilot a new channel with limits and rapid learning.'],
  ['Investigate', 'Gather evidence before committing to an irreversible treatment.', 'Run a technical spike and supplier due diligence.'],
];

const riskStates = [
  ['Inherent risk', 'Exposure under an explicitly stated reference condition before crediting the specified controls.', 'An analytical baseline used to understand why treatment is needed. It is not always a literally observable no-control world.'],
  ['Current residual risk', 'Exposure remaining after considering controls and treatments that actually operate today.', 'Planned controls receive no credit. Documented controls receive credit only to the extent their effectiveness is supported.'],
  ['Target residual risk', 'Expected exposure after planned treatments achieve defined and validated outcomes.', 'A forecast used for investment and sequencing, not the current risk position.'],
  ['Accepted or retained risk', 'Current residual exposure that authorized management explicitly decides to retain.', 'Acceptance needs scope, conditions, duration, monitoring and an authority within delegated limits.'],
];

const riskRoles = [
  ['Governing body', 'Sets direction, oversees material risk and approves or challenges risk appetite.', 'Does not operate day-to-day controls.'],
  ['Executive management', 'Implements direction, allocates resources and resolves material trade-offs.', 'Accountability is not removed by creating a committee.'],
  ['Risk owner', 'Owns the affected objective and secures treatment or acceptance decisions.', 'May not operate the individual controls.'],
  ['Acceptance authority', 'Accepts defined residual exposure within delegated limits and conditions.', 'Authority comes from governance policy, not automatically from a risk or security title.'],
  ['Control owner', 'Ensures a control is suitably designed, implemented, monitored and improved.', 'Ownership does not prove operation.'],
  ['Control operator', 'Performs the control and produces complete, timely evidence.', 'Should not approve their own work when independence is part of the objective.'],
  ['First line', 'Owns objectives, risks and controls through everyday decisions and work.', 'Risk ownership does not transfer to oversight functions.'],
  ['Second line', 'Provides methods, advice, monitoring, support and credible challenge.', 'Should not quietly own first-line decisions it must challenge.'],
  ['Internal Audit', 'Provides independent assurance and advice to the governing body and management.', 'Does not design controls, own remediation or accept management risk.'],
];

const controlLifecycle = [
  ['Objective', 'Which condition or scenario must change?'],
  ['Design', 'Who does what, for which population, when and with what evidence?'],
  ['Implement', 'Has the design been configured, communicated and validated?'],
  ['Operate', 'Did it run when required across the complete population?'],
  ['Evidence', 'Can another reviewer identify source, performer, date and result?'],
  ['Test', 'Is it suitably designed and operating effectively?'],
  ['Remediate', 'What fixes the cause, not only the exception?'],
  ['Retest', 'Did remediation work, and what could make the control stale?'],
  ['Change or retire', 'Is it still necessary, effective and compatible with the process?'],
];

export default function RiskControlAtlas() {
  return <section className="risk-control-atlas" id="risk-control-atlas">
    <header><span>Risk and control reference</span><h2>Risk is not a color on a heat map.</h2><p><strong>Think of risk like weather on a journey.</strong> The destination is the objective, the storm is uncertainty, controls are the equipment and decisions that change exposure, and evidence tells you whether they worked. A useful risk statement names the objective, cause, event, consequence and decision.</p></header>

    <div className="risk-state-section"><header><span>Four states people confuse</span><h3>Say which risk position you are discussing.</h3><p>The word residual is incomplete unless the reader knows which controls were credited, how effective they are and whether the value is current or target.</p></header><div>{riskStates.map(([title, definition, boundary], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{definition}</p><small>{boundary}</small></article>)}</div></div>

    <div className="risk-treatment-section"><header><span>Six treatment choices</span><h3>Mitigation is only one option.</h3></header><div>{treatments.map(([title, definition, example], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{definition}</p><small>{example}</small></article>)}</div></div>

    <div className="risk-taxonomy-section"><header><span>Risk taxonomy</span><h3>Twelve categories for ownership and reporting.</h3><p>Categories help people route expertise and aggregate exposure. They do not replace a specific risk scenario.</p></header><div className="risk-taxonomy-grid">{riskTypes.map(([title, definition, example], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title} risk</h3><p>{definition}</p><small>Example</small><strong>{example}</strong></article>)}</div></div>

    <div className="risk-role-section"><header><span>Who owns what</span><h3>Risk, control and assurance are different accountabilities.</h3></header><div>{riskRoles.map(([title, responsibility, boundary], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{responsibility}</p><small>{boundary}</small></article>)}</div></div>

    <ControlFunctionExplorer />

    <div className="control-life-cycle"><header><span>Control lifecycle</span><h3>A control needs a life after design.</h3></header><div>{controlLifecycle.map(([title, question], index) => <article key={title}><i>{String(index + 1).padStart(2, '0')}</i><b>{title}</b><small>{question}</small></article>)}</div></div>
  </section>;
}
import ControlFunctionExplorer from './ControlFunctionExplorer';

