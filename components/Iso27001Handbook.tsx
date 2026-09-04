'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ProgressActions from './ProgressActions';
import {
  annexControlGroups,
  capstoneDeliverables,
  clauseGroups,
  handbookModules,
  interviewQuestions,
  iso27001HandbookSlug,
  practicalExercises,
  quizQuestions,
  sourceLinks,
  totalAnnexControls,
  type AnnexControlGroup,
  type ClauseGroup,
} from '../lib/iso27001-handbook';

const progressStorageKey = 'robins-hood-iso27001-progress-v1';

const conceptCards = [
  {
    term: 'ISO',
    expansion: 'International Organization for Standardization',
    explanation: 'An independent international organization whose national standards-body members develop consensus standards. ISO publishes standards but does not certify organizations or individuals.',
  },
  {
    term: 'IEC',
    expansion: 'International Electrotechnical Commission',
    explanation: 'The international standards organization focused on electrical, electronic and related technologies. ISO and IEC jointly publish the ISO/IEC 27000 family.',
  },
  {
    term: 'ISO/IEC 27001:2022',
    expansion: 'Information security management systems requirements',
    explanation: 'The certifiable requirements standard. It tells an organization what its Information Security Management System must achieve, while allowing the organization to choose methods that fit its context and risk.',
  },
  {
    term: 'ISMS',
    expansion: 'Information Security Management System',
    explanation: 'A coordinated system of governance, risk decisions, controls, people, processes, evidence and improvement used to protect information. It is a management system, not a single tool or policy.',
  },
  {
    term: 'Certification body',
    expansion: 'Independent conformity assessment body',
    explanation: 'An external organization that audits a company ISMS and, if requirements are met, issues an organization certificate. ISO itself does not perform this certification.',
  },
  {
    term: 'Accreditation body',
    expansion: 'Independent oversight of certification competence',
    explanation: 'A body that evaluates whether a certification body is competent, impartial and consistent. Accreditation is not the same as certification and adds confidence to the certificate chain.',
  },
  {
    term: 'PECB',
    expansion: 'Originally Professional Evaluation and Certification Board',
    explanation: 'A personnel training and certification provider. Its Foundation credential is for individuals learning the concepts and requirements. It is different from an organization being certified to ISO/IEC 27001.',
  },
  {
    term: 'ISO/IEC 27002:2022',
    expansion: 'Information security controls guidance',
    explanation: 'A companion guidance standard that expands the control intent, attributes and implementation guidance. ISO/IEC 27001 contains requirements; ISO/IEC 27002 helps practitioners understand controls.',
  },
];

const misconceptions = [
  ['“ISO will certify our company.”', 'ISO publishes the standard. An external certification body audits and certifies the organization.'],
  ['“All 93 controls are mandatory.”', 'Clauses 4 through 10 are requirements. Necessary controls come from risk and requirements; Annex A is the completeness check. Exclusions require justification.'],
  ['“The ISMS is the security team.”', 'The ISMS crosses leadership, business processes, people, suppliers, facilities and technology within the defined scope.'],
  ['“A policy proves a control works.”', 'A policy supports control design. Operating evidence shows the control was actually performed and exceptions were handled.'],
  ['“No incidents means the ISMS is effective.”', 'Absence of detected incidents is not enough. Use risk, control, objective, audit and outcome evidence.'],
  ['“Certification eliminates risk.”', 'Certification gives time-bound assurance about conformity within a scope. It does not guarantee perfect security or zero incidents.'],
  ['“The auditor chooses our controls.”', 'Management and risk owners determine necessary treatment. Auditors evaluate the resulting system against criteria.'],
  ['“Correcting an issue closes the finding.”', 'Correction fixes the immediate condition. Corrective action addresses cause and must be checked for effectiveness.'],
] as const;

const auditConcepts = [
  ['First-party audit', 'An organization audits its own management system. This is the internal audit required by clause 9.2.'],
  ['Second-party audit', 'A customer or another interested party audits a supplier against agreed criteria.'],
  ['Third-party audit', 'An independent certification body audits for certification or surveillance.'],
  ['Audit programme', 'The risk-based arrangement for one or more audits over a period, including priorities, resources and coverage.'],
  ['Audit plan', 'The practical plan for one specific audit, including objectives, scope, criteria, timing and people.'],
  ['Audit criteria', 'The requirements used as the reference, such as ISO/IEC 27001, policies, contracts and procedures.'],
  ['Audit evidence', 'Verifiable records, statements of fact or observations relevant to the criteria. Evidence can be sampled.'],
  ['Audit finding', 'The evaluated result of comparing evidence with criteria, recorded as conformity, nonconformity or another defined observation.'],
] as const;

const policyStack = [
  ['Policy', 'Why and what', 'Leadership direction, principles and commitments.'],
  ['Standard', 'Required rule', 'Specific mandatory baseline, such as password or logging requirements.'],
  ['Procedure', 'Who, when and how', 'Repeatable steps, responsibilities, exceptions and retained evidence.'],
  ['Guideline', 'Recommended approach', 'Advice that supports judgment but is not automatically mandatory.'],
  ['Record', 'What happened', 'Evidence that an activity, decision or result occurred.'],
] as const;

function ModuleHeader({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro: string }) {
  return <header className="iso-section-header">
    <span>{number} / {eyebrow}</span>
    <h2>{title}</h2>
    <p>{intro}</p>
  </header>;
}

function ClauseGroupView({ group }: { group: ClauseGroup }) {
  return <section className="iso-clause-group">
    <header>
      <div><span>Clause {group.clause}</span><h3>{group.title}</h3><p>{group.purpose}</p></div>
      <aside><b>Memory line</b><p>{group.memory}</p></aside>
    </header>
    <div className="iso-clause-lessons">
      {group.lessons.map((lesson) => <details key={lesson.id} open={group.clause === '4' && lesson.id === '4.1'}>
        <summary><span>{lesson.id}</span><strong>{lesson.title}</strong><i>Open lesson</i></summary>
        <div className="iso-clause-detail">
          <section><b>What it requires</b><p>{lesson.requirement}</p></section>
          <section><b>How to do it</b><p>{lesson.practice}</p></section>
          <section><b>Useful evidence</b><p>{lesson.evidence}</p></section>
          <section className="iso-trap"><b>Common trap</b><p>{lesson.trap}</p></section>
        </div>
      </details>)}
    </div>
  </section>;
}

function ControlGroupView({ group, query }: { group: AnnexControlGroup; query: string }) {
  const controls = group.controls.filter((control) => `${control.id} ${control.title} ${control.intent} ${control.implementation} ${control.evidence}`.toLowerCase().includes(query.toLowerCase()));
  if (!controls.length) return null;
  return <section className={`iso-control-group control-${group.id}`} id={`controls-${group.id}`}>
    <header>
      <div><span>{group.code}</span><h3>{group.title}</h3><p>{group.memory}</p></div>
      <strong>{controls.length}<small>controls shown</small></strong>
    </header>
    <div className="iso-control-list">
      {controls.map((control) => <details key={control.id}>
        <summary><span>A.{control.id}</span><strong>{control.title}</strong><i>＋</i></summary>
        <div>
          <section><b>Intent</b><p>{control.intent}</p></section>
          <section><b>Implementation example</b><p>{control.implementation}</p></section>
          <section><b>Evidence to retain</b><p>{control.evidence}</p></section>
        </div>
      </details>)}
    </div>
  </section>;
}

export default function Iso27001Handbook() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [controlQuery, setControlQuery] = useState('');
  const [controlGroup, setControlGroup] = useState<'all' | AnnexControlGroup['id']>('all');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(progressStorageKey) ?? '[]');
        if (Array.isArray(saved)) setCompleted(saved.filter((item): item is string => typeof item === 'string'));
      } catch {
        setCompleted([]);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const progress = Math.round((completed.length / handbookModules.length) * 100);
  const answeredCount = Object.keys(quizAnswers).length;
  const correctCount = Object.entries(quizAnswers).filter(([index, answer]) => quizQuestions[Number(index)]?.answer === answer).length;
  const shownControlGroups = useMemo(() => controlGroup === 'all' ? annexControlGroups : annexControlGroups.filter((group) => group.id === controlGroup), [controlGroup]);

  function toggleModule(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(progressStorageKey, JSON.stringify(next));
      return next;
    });
  }

  function renderModuleComplete(id: string) {
    const studyModule = handbookModules.find((item) => item.id === id);
    const isComplete = completed.includes(id);
    return <div className={`iso-module-complete ${isComplete ? 'is-complete' : ''}`}>
      <div><span>{studyModule?.number} complete</span><strong>{studyModule?.title}</strong></div>
      <button type="button" onClick={() => toggleModule(id)}>{isComplete ? '✓ Completed' : 'Mark module complete'}</button>
    </div>;
  }

  return <main className="iso-handbook">
    <section className="iso-hero" id="top">
      <div className="iso-hero-grid" aria-hidden="true" />
      <div className="iso-hero-copy">
        <p className="eyebrow"><span /> International Organization for Standardization (ISO) + International Electrotechnical Commission (IEC)</p>
        <h1>ISO/IEC 27001:<br /><em>from zero to ready.</em></h1>
        <p>Learn the full 2022 management-system logic, practise every core artifact, review all 93 Annex A controls and build a dummy Information Security Management System (ISMS) before you enter official Professional Evaluation and Certification Board (PECB) Foundation training.</p>
        <div className="iso-hero-actions"><a href="#orientation">Start module 01 <span>↓</span></a><a href="#annex-a">Open all 93 controls</a></div>
        <ProgressActions slug={iso27001HandbookSlug} />
      </div>
      <aside className="iso-progress-card">
        <div className="iso-progress-ring" style={{ '--iso-progress': `${progress * 3.6}deg` } as React.CSSProperties}><div><strong>{progress}%</strong><span>complete</span></div></div>
        <div><span>{completed.length} of {handbookModules.length} modules</span><p>Your progress stays in this browser. No account or upload is required.</p></div>
        {completed.length > 0 && <button type="button" onClick={() => { setCompleted([]); window.localStorage.removeItem(progressStorageKey); }}>Reset module progress</button>}
      </aside>
      <div className="iso-hero-stats"><span><b>12</b> modules</span><span><b>93</b> controls</span><span><b>24</b> original questions</span><span><b>1</b> capstone ISMS</span></div>
    </section>

    <nav className="iso-module-ribbon" aria-label="Handbook modules">
      {handbookModules.map((module) => <a className={completed.includes(module.id) ? 'complete' : ''} href={`#${module.id}`} key={module.id}><span>{completed.includes(module.id) ? '✓' : module.number}</span><strong>{module.label}</strong><small>{module.minutes} min</small></a>)}
    </nav>

    <div className="iso-handbook-shell">
      <aside className="iso-handbook-toc">
        <span>Study route</span>
        <nav>{handbookModules.map((module) => <a className={completed.includes(module.id) ? 'complete' : ''} href={`#${module.id}`} key={module.id}><i>{completed.includes(module.id) ? '✓' : module.number}</i>{module.label}</a>)}</nav>
        <div><b>Exam boundary</b><p>This independent handbook prepares your knowledge. PECB currently requires completion of its official training course before the Foundation exam and certificate application.</p></div>
      </aside>

      <article className="iso-handbook-content">
        <section className="iso-module" id="orientation">
          <ModuleHeader number="01" eyebrow="Orientation" title="Know who publishes, audits and certifies what." intro="The most common beginner error is mixing up a standard, an organization certificate and an individual credential. Keep the two certification paths separate from the first day." />

          <div className="iso-concept-grid">{conceptCards.map((item) => <article key={item.term}><span>{item.term}</span><h3>{item.expansion}</h3><p>{item.explanation}</p></article>)}</div>

          <div className="iso-certification-map" aria-label="Certification and accreditation relationship">
            <header><span>The organization route</span><h3>Publication is not certification.</h3></header>
            <div>
              <article><span>01</span><b>ISO + IEC</b><p>Publish ISO/IEC 27001 requirements through international consensus.</p></article>
              <i>→</i>
              <article><span>02</span><b>Your organization</b><p>Defines scope, runs the ISMS, manages risk and retains evidence.</p></article>
              <i>→</i>
              <article><span>03</span><b>Certification body</b><p>Independently audits the organization and may issue a scoped certificate.</p></article>
              <i>←</i>
              <article><span>04</span><b>Accreditation body</b><p>Evaluates the certification body competence and impartiality.</p></article>
            </div>
            <aside><span>The individual route</span><p><strong>You → official PECB training → Foundation exam → certificate application.</strong> An individual credential does not certify your employer, and an organization certificate does not certify every employee.</p></aside>
          </div>

          <div className="iso-foundation-pair">
            <article><span>Security outcomes</span><h3>Confidentiality, integrity and availability</h3><ul><li><b>Confidentiality:</b> information is not disclosed to unauthorized people, processes or systems.</li><li><b>Integrity:</b> information remains accurate, complete and protected from unauthorized change.</li><li><b>Availability:</b> authorized users can access information and services when needed.</li></ul><p>Other properties can matter too, including authenticity, accountability, non-repudiation and reliability.</p></article>
            <article><span>Management-system loop</span><h3>Plan, Do, Check, Act</h3><ol><li><b>Plan:</b> understand context, scope, risk, controls and objectives.</li><li><b>Do:</b> provide support and operate controls and treatment plans.</li><li><b>Check:</b> monitor, measure, audit and review performance.</li><li><b>Act:</b> correct nonconformity and improve the system.</li></ol><p>The standard follows this logic even when it does not label every clause with the loop.</p></article>
          </div>

          <div className="iso-standard-map">
            <span>How the document fits together</span>
            <div><article><b>Clauses 0 to 3</b><p>Introduction, scope of the standard, normative references, terms and definitions.</p></article><article><b>Clauses 4 to 10</b><p>Auditable management-system requirements. “Shall” indicates a requirement.</p></article><article><b>Annex A</b><p>Reference set of 93 controls used to check that necessary treatment controls were not omitted.</p></article><article><b>ISO/IEC 27002</b><p>Separate implementation guidance for controls. “Should” generally signals a recommendation.</p></article></div>
          </div>

          <div className="iso-pecb-note"><span>PECB Foundation target</span><h3>Use this handbook before official training, not instead of it.</h3><p>The current PECB route has no professional-experience prerequisite, but it does require completion of the PECB ISO/IEC 27001:2022 Foundation training, passing the exam, applying for the credential and agreeing to the PECB Code of Ethics. Verify current rules when booking.</p><a href="https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation" target="_blank" rel="noreferrer">Check the official Foundation route ↗</a></div>
          {renderModuleComplete('orientation')}
        </section>

        <section className="iso-module" id="clauses-4-5">
          <ModuleHeader number="02" eyebrow="Clauses 4 and 5" title="Set the boundary, then make leadership accountable." intro="Context prevents a generic ISMS. Leadership turns that context into direction, authority, resources and business decisions." />
          {clauseGroups.filter((group) => ['4', '5'].includes(group.clause)).map((group) => <ClauseGroupView group={group} key={group.clause} />)}
          <div className="iso-company-thread"><span>Canopy Cloud example</span><p><strong>Canopy Cloud</strong> is a fictional 68-person Bengaluru software company operating a cloud platform that stores employee documents for business customers. Its scope covers product design, development, cloud operation and customer support. Payroll, its coworking provider and the underlying public-cloud provider are dependencies, not convenient exclusions.</p></div>
          {renderModuleComplete('clauses-4-5')}
        </section>

        <section className="iso-module" id="clause-6">
          <ModuleHeader number="03" eyebrow="Clause 6" title="Planning is where risk becomes controlled work." intro="Clause 6 is the intellectual center of the standard. It links context, information-security risk, necessary controls, the Statement of Applicability and measurable objectives." />
          {clauseGroups.filter((group) => group.clause === '6').map((group) => <ClauseGroupView group={group} key={group.clause} />)}
          <div className="iso-memory-board"><span>Clause 6.1.3 treatment sequence</span><ol><li>Choose treatment options.</li><li>Determine every control needed.</li><li>Compare those controls with Annex A.</li><li>Produce the Statement of Applicability.</li><li>Formulate the risk treatment plan.</li><li>Obtain risk-owner approval and residual-risk acceptance.</li></ol></div>
          {renderModuleComplete('clause-6')}
        </section>

        <section className="iso-module" id="clauses-7-8">
          <ModuleHeader number="04" eyebrow="Clauses 7 and 8" title="Support the system, then operate what was planned." intro="Good plans fail without competence, communication, controlled information and repeatable operations. These clauses turn design into daily behavior and evidence." />
          {clauseGroups.filter((group) => ['7', '8'].includes(group.clause)).map((group) => <ClauseGroupView group={group} key={group.clause} />)}
          <div className="iso-operating-control"><span>Control operating recipe</span><div><b>Owner</b><b>Frequency or trigger</b><b>Inputs</b><b>Steps and criteria</b><b>Exception route</b><b>Retained evidence</b></div><p>If one of these is missing, the control may exist on paper but operate unpredictably.</p></div>
          {renderModuleComplete('clauses-7-8')}
        </section>

        <section className="iso-module" id="clauses-9-10">
          <ModuleHeader number="05" eyebrow="Clauses 9 and 10" title="Evaluate honestly and improve deliberately." intro="Monitoring, internal audit and management review are different feedback channels. Corrective action turns detected failure into reduced recurrence." />
          {clauseGroups.filter((group) => ['9', '10'].includes(group.clause)).map((group) => <ClauseGroupView group={group} key={group.clause} />)}
          <div className="iso-correction-flow"><article><span>01</span><b>Detect</b><p>Identify the requirement and objective evidence of failure.</p></article><article><span>02</span><b>Correct</b><p>Contain consequences and restore the immediate condition.</p></article><article><span>03</span><b>Analyze</b><p>Determine causes and whether similar conditions exist elsewhere.</p></article><article><span>04</span><b>Act</b><p>Implement proportionate corrective action and needed ISMS change.</p></article><article><span>05</span><b>Verify</b><p>Test effectiveness before authorized closure.</p></article></div>
          {renderModuleComplete('clauses-9-10')}
        </section>

        <section className="iso-module" id="risk-lab">
          <ModuleHeader number="06" eyebrow="Risk lab" title="Build risk decisions that another person can follow." intro="The standard does not force one scoring formula. It does require a defined process that produces consistent, valid and comparable results." />

          <div className="iso-risk-statement"><span>Useful scenario pattern</span><p><b>Because</b> [condition or vulnerability], <b>a</b> [threat actor or event] <b>may</b> [affect an asset or process], <b>causing</b> [confidentiality, integrity or availability consequence and business impact].</p><small>Example: Because privileged support access uses persistent shared credentials, a stolen credential may expose several customer tenants, causing contractual breach, investigation cost and loss of trust.</small></div>

          <div className="iso-risk-workflow">{['Set context and criteria', 'Identify scenarios and owners', 'Analyze likelihood and impact', 'Evaluate and prioritize', 'Choose treatment and controls', 'Implement and verify', 'Accept residual risk', 'Monitor and reassess'].map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < 7 && <i>→</i>}</article>)}</div>

          <div className="iso-risk-method">
            <article><span>Likelihood scale</span><h3>1 Rare to 5 Almost certain</h3><p>Define observable anchors using history, exposure, threat capability, control reliability and change. Avoid choosing a number from intuition alone.</p></article>
            <article><span>Impact scale</span><h3>1 Insignificant to 5 Severe</h3><p>Define consequences for customers, legal duties, operations, finance, safety and reputation. Use the highest credible consequence or a documented aggregation rule.</p></article>
            <article><span>Simple example</span><h3>Likelihood × impact = risk level</h3><p>1 to 4 Low, 5 to 9 Medium, 10 to 16 High, 17 to 25 Critical. This is one possible method, not an ISO-mandated formula.</p></article>
          </div>

          <div className="iso-table-wrap">
            <div className="iso-table-title"><span>Sample risk register</span><p>Canopy Cloud, selected scenarios</p></div>
            <table className="iso-data-table"><thead><tr><th>ID</th><th>Scenario and owner</th><th>Inherent</th><th>Treatment and controls</th><th>Residual</th></tr></thead><tbody>
              <tr><td>R-01</td><td><b>Stolen administrator session exposes customer documents.</b><small>Owner: Chief Technology Officer</small></td><td><strong className="risk-high">20 Critical</strong><small>Likelihood 4 × Impact 5</small></td><td>Modify. Phishing-resistant authentication, separate privileged accounts, time-bound elevation, session monitoring.<small>A.5.15, A.5.18, A.8.2, A.8.5, A.8.16</small></td><td><strong className="risk-medium">8 Medium</strong><small>Likelihood 2 × Impact 4, accept after verification</small></td></tr>
              <tr><td>R-02</td><td><b>Cloud-region outage prevents customer access.</b><small>Owner: Head of Platform</small></td><td><strong className="risk-high">15 High</strong><small>Likelihood 3 × Impact 5</small></td><td>Modify. Recovery objectives, cross-zone redundancy, immutable backup and tested recovery runbook.<small>A.5.29, A.5.30, A.8.13, A.8.14</small></td><td><strong className="risk-medium">6 Medium</strong><small>Likelihood 2 × Impact 3</small></td></tr>
              <tr><td>R-03</td><td><b>Support supplier retains access after contract end.</b><small>Owner: Support Director</small></td><td><strong className="risk-high">12 High</strong><small>Likelihood 3 × Impact 4</small></td><td>Modify. Supplier inventory, contractual offboarding, identity expiry and monthly reconciliation.<small>A.5.19, A.5.20, A.5.22, A.5.18</small></td><td><strong className="risk-low">4 Low</strong><small>Likelihood 1 × Impact 4</small></td></tr>
            </tbody></table>
          </div>

          <div className="iso-treatment-options"><article><span>Avoid</span><p>Stop or change the activity that creates the risk.</p></article><article><span>Modify</span><p>Change likelihood or consequence using controls.</p></article><article><span>Share</span><p>Allocate part of the consequence through contract or insurance while retaining accountability.</p></article><article><span>Retain</span><p>Accept the risk within criteria and authority, with monitoring.</p></article></div>

          <div className="iso-table-wrap">
            <div className="iso-table-title"><span>Sample risk treatment plan</span><p>A plan is not complete until implementation and residual risk are verified.</p></div>
            <table className="iso-data-table"><thead><tr><th>Risk</th><th>Action and control owner</th><th>Measure</th><th>Due</th><th>Acceptance</th></tr></thead><tbody>
              <tr><td>R-01</td><td>Deploy time-bound privileged elevation and remove standing administrator rights.<small>Owner: Identity Lead</small></td><td>100% privileged production access uses approved elevation; zero shared accounts.</td><td>30 Nov</td><td>Chief Technology Officer after control test</td></tr>
              <tr><td>R-02</td><td>Run a region-loss recovery exercise against approved recovery objectives.<small>Owner: Platform Lead</small></td><td>Service restored within 4 hours; data loss below 1 hour.</td><td>15 Dec</td><td>Chief Operating Officer after exercise</td></tr>
            </tbody></table>
          </div>

          <div className="iso-risk-rules"><span>Five rules to remember</span><ol><li>A vulnerability is not automatically a complete risk statement.</li><li>Risk owners own business consequences and acceptance; control owners operate treatment.</li><li>Inherent and residual scoring must use defined criteria consistently.</li><li>Adding a control can create secondary risk, cost and dependency.</li><li>Risk is reassessed at planned intervals and after significant change.</li></ol></div>
          {renderModuleComplete('risk-lab')}
        </section>

        <section className="iso-module" id="soa">
          <ModuleHeader number="07" eyebrow="Statement of Applicability" title="Explain the control set, not just the checklist." intro="The Statement of Applicability (SoA) is the bridge between risk treatment and the implemented control environment. It is one of the fastest ways to understand an ISMS." />

          <div className="iso-soa-requirements"><article><span>1</span><b>Necessary controls</b><p>Include Annex A controls and any custom controls needed by risk, law, contract or business design.</p></article><article><span>2</span><b>Why included</b><p>Trace to risks, obligations, objectives or other requirements. “It is in Annex A” is weak reasoning.</p></article><article><span>3</span><b>Implementation status</b><p>State whether the control is implemented. Use consistent statuses and do not hide planned work.</p></article><article><span>4</span><b>Why excluded</b><p>For any excluded Annex A control, record a defensible reason based on scope, risk and requirements.</p></article></div>

          <div className="iso-table-wrap">
            <div className="iso-table-title"><span>Sample Statement of Applicability</span><p>Version 1.3, approved by the ISMS steering group</p></div>
            <table className="iso-data-table"><thead><tr><th>Control</th><th>Applicable?</th><th>Justification</th><th>Status and evidence</th></tr></thead><tbody>
              <tr><td>A.5.7 Threat intelligence</td><td><strong className="status-in">Yes</strong></td><td>Supports R-04 vulnerability exploitation and customer contractual monitoring requirements.</td><td>Implemented. Weekly intelligence review, tickets and detection updates.</td></tr>
              <tr><td>A.7.6 Working in secure areas</td><td><strong className="status-out">No</strong></td><td>The scoped organization operates no dedicated secure area. General offices and cloud data centers are addressed through other physical and supplier controls.</td><td>Excluded. Reassess if a secure processing room is introduced.</td></tr>
              <tr><td>A.8.13 Information backup</td><td><strong className="status-in">Yes</strong></td><td>Treats R-02 service outage and contractual recovery commitments.</td><td>Implemented. Backup reports and quarterly restore tests.</td></tr>
              <tr><td>A.8.30 Outsourced development</td><td><strong className="status-out">No</strong></td><td>No development activity in scope is outsourced. Supplier software and services remain covered by A.5.19 to A.5.23.</td><td>Excluded. Trigger review before engaging external developers.</td></tr>
            </tbody></table>
          </div>

          <div className="iso-soa-warning"><b>Do not exclude a control because implementation is difficult.</b><p>If a control is necessary but not yet implemented, keep it applicable, state the honest status, manage the associated risk and track the treatment action.</p></div>
          {renderModuleComplete('soa')}
        </section>

        <section className="iso-module iso-annex-module" id="annex-a">
          <ModuleHeader number="08" eyebrow="Annex A" title="Learn all 93 controls by purpose, action and evidence." intro="The controls are grouped into 37 organizational, 8 people, 14 physical and 34 technological controls. Search by control number, concept, implementation or evidence." />

          <div className="iso-control-browser">
            <label><span>⌕</span><input value={controlQuery} onChange={(event) => setControlQuery(event.target.value)} placeholder="Search controls, examples or evidence..." /></label>
            <div role="group" aria-label="Filter control group"><button className={controlGroup === 'all' ? 'active' : ''} onClick={() => setControlGroup('all')} type="button">All <b>{totalAnnexControls}</b></button>{annexControlGroups.map((group) => <button className={controlGroup === group.id ? 'active' : ''} onClick={() => setControlGroup(group.id)} type="button" key={group.id}>{group.title.replace(' controls', '')} <b>{group.controls.length}</b></button>)}</div>
          </div>

          <div className="iso-annex-memory"><span>4 themes</span><p><b>Organizational:</b> govern the work. <b>People:</b> guide the humans. <b>Physical:</b> protect the places. <b>Technological:</b> secure the systems.</p></div>

          <div className="iso-control-groups">{shownControlGroups.map((group) => <ControlGroupView group={group} query={controlQuery} key={group.id} />)}</div>
          {shownControlGroups.every((group) => !group.controls.some((control) => `${control.id} ${control.title} ${control.intent} ${control.implementation} ${control.evidence}`.toLowerCase().includes(controlQuery.toLowerCase()))) && <div className="iso-no-controls"><strong>No control matches that phrase.</strong><button type="button" onClick={() => { setControlQuery(''); setControlGroup('all'); }}>Reset control filters</button></div>}

          <div className="iso-control-study-tip"><span>Do not memorize 93 isolated titles</span><p>For each control, learn four things: the risk or requirement it supports, the intended outcome, one realistic implementation and one piece of operating evidence. Group controls around workflows such as identity, suppliers, incidents, continuity and secure development.</p></div>
          {renderModuleComplete('annex-a')}
        </section>

        <section className="iso-module" id="evidence">
          <ModuleHeader number="09" eyebrow="Evidence" title="Make the ISMS understandable, controlled and provable." intro="Documentation should make important decisions repeatable and evidence retrievable. More pages do not automatically mean more control." />

          <div className="iso-document-distinction"><article><span>Maintain</span><h3>Documents that guide current work</h3><p>Policies, methodologies, standards, procedures and plans must stay current, approved and available.</p></article><article><span>Retain</span><h3>Records that show what occurred</h3><p>Risk results, approvals, logs, completed reviews, audit results and decisions preserve objective evidence.</p></article></div>

          <div className="iso-policy-stack">{policyStack.map(([level, question, detail], index) => <article key={level}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{level}</b><small>{question}</small></div><p>{detail}</p></article>)}</div>

          <div className="iso-required-docs">
            <header><span>Core documented information</span><h3>Know the required outputs and the records that prove operation.</h3></header>
            <div>{['ISMS scope', 'Information-security policy', 'Risk assessment and treatment processes', 'Risk assessment results and risk treatment results', 'Statement of Applicability and risk treatment plan', 'Information-security objectives', 'Evidence of competence', 'Operational process evidence needed for confidence', 'Monitoring and measurement results', 'Internal-audit programme and results', 'Management-review results', 'Nonconformity and corrective-action results'].map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, '0')}</i>{item}</span>)}</div>
            <p>Other documents become necessary because of risk, applicable controls, law, contracts, complexity or the organization own decision. An asset register is commonly needed when A.5.9 applies even though the main clauses do not use that exact artifact name.</p>
          </div>

          <div className="iso-table-wrap">
            <div className="iso-table-title"><span>Sample asset register</span><p>Connect assets to owners, classification and risk.</p></div>
            <table className="iso-data-table"><thead><tr><th>ID</th><th>Asset and type</th><th>Owner</th><th>Classification</th><th>Location and dependency</th></tr></thead><tbody>
              <tr><td>AS-01</td><td><b>Customer document store</b><small>Information asset</small></td><td>Product Director</td><td>Restricted</td><td>Public-cloud object storage; encryption and identity services</td></tr>
              <tr><td>AS-02</td><td><b>Production source repository</b><small>Software asset</small></td><td>Engineering Director</td><td>Confidential</td><td>Hosted code platform; identity and build pipeline</td></tr>
              <tr><td>AS-03</td><td><b>Customer support laptops</b><small>Physical and technological assets</small></td><td>Support Director</td><td>Internal</td><td>Remote workforce; device-management service</td></tr>
            </tbody></table>
          </div>

          <div className="iso-evidence-test"><span>Evidence quality test</span><div><article><b>Relevant</b><p>Does it address the exact control and criterion?</p></article><article><b>Reliable</b><p>Can its source, integrity and meaning be trusted?</p></article><article><b>Sufficient</b><p>Does the sample support the conclusion over the review period?</p></article><article><b>Traceable</b><p>Can another competent person follow the decision?</p></article></div></div>

          <div className="iso-policy-examples"><article><span>Governing policy</span><h3>Information security policy</h3><p>Purpose, scope, principles, leadership commitments, responsibilities, exceptions and review.</p></article><article><span>Topic policy</span><h3>Access control policy</h3><p>Identity lifecycle, least privilege, authentication, privileged access, review and emergency access.</p></article><article><span>Procedure</span><h3>Quarterly access review</h3><p>Population, reviewer, evidence, conflicts, removals, overdue escalation and closure.</p></article><article><span>Record</span><h3>Completed third-quarter access review</h3><p>Dated population, reviewer decisions, exceptions, removal tickets and final approval.</p></article></div>
          {renderModuleComplete('evidence')}
        </section>

        <section className="iso-module" id="audit">
          <ModuleHeader number="10" eyebrow="Assurance" title="Audit the system, review it and correct what failed." intro="An audit gathers evidence against criteria. Management review makes leadership decisions. Corrective action addresses causes. Do not collapse them into one meeting." />

          <div className="iso-audit-concepts">{auditConcepts.map(([term, detail]) => <article key={term}><span>{term}</span><p>{detail}</p></article>)}</div>

          <div className="iso-audit-flow">{['Set objectives, scope and criteria', 'Select competent impartial auditors', 'Plan interviews and samples', 'Gather and verify evidence', 'Evaluate evidence against criteria', 'Report findings and conclusions', 'Correct and track actions', 'Verify effectiveness and close'].map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></article>)}</div>

          <div className="iso-finding-anatomy"><header><span>Finding anatomy</span><h3>Make every finding defensible.</h3></header><div><article><b>Criteria</b><p>Clause 9.2.2 and the internal-audit procedure require impartial auditor selection.</p></article><article><b>Condition</b><p>The infrastructure manager audited the configuration process they own.</p></article><article><b>Evidence</b><p>Audit plan IA-04, ownership record and interview confirmed the conflict.</p></article><article><b>Consequence</b><p>Objectivity was not demonstrated, weakening confidence in the conclusion.</p></article><article><b>Classification</b><p>Nonconformity under the organization defined finding scheme.</p></article></div></div>

          <div className="iso-management-review">
            <header><span>Management review</span><h3>Inputs become decisions.</h3></header>
            <div className="iso-review-columns"><section><b>Bring these inputs</b><ul><li>Status of previous actions</li><li>Internal and external changes</li><li>Changes in interested-party needs</li><li>Trends in nonconformity and corrective action</li><li>Monitoring and measurement results</li><li>Audit results and objective achievement</li><li>Interested-party feedback</li><li>Risk assessment and treatment status</li><li>Opportunities for improvement</li></ul></section><section><b>Record these outputs</b><ul><li>Decisions on improvement opportunities</li><li>Decisions on needed ISMS changes</li><li>Owners, resources and due dates</li><li>Updates to risk, objectives and plans</li><li>Evidence of top-management participation</li></ul></section></div>
          </div>

          <div className="iso-corrective-case"><span>Mini case</span><h3>Backup jobs succeeded, but restoration failed.</h3><p><b>Correction:</b> restore service using an alternate copy and repair the failed restore process. <b>Cause analysis:</b> the backup format changed, the restore runbook was not updated and tests sampled job completion rather than restoration. <b>Corrective action:</b> update change criteria, run automated integrity checks, test restoration quarterly and verify the next two cycles. <b>Effectiveness:</b> successful restoration within the approved objective using a representative sample.</p></div>
          {renderModuleComplete('audit')}
        </section>

        <section className="iso-module" id="exam">
          <ModuleHeader number="11" eyebrow="Practice" title="Test recognition, reasoning and explanation." intro="These are original study questions, not copied PECB questions. Use them to find weak concepts before official training and the current exam." />

          <div className="iso-exam-brief"><article><span>Current public PECB outline</span><strong>2 competency domains</strong><p>Fundamental ISMS principles and concepts; Information Security Management System requirements.</p></article><article><span>Current candidate handbook</span><strong>40 multiple-choice questions</strong><p>Always verify the latest official handbook for format, language, duration, permitted material and programme rules.</p></article><article><span>Best preparation</span><strong>Understand relationships</strong><p>Know who owns each decision, which clause applies, what evidence proves it and where Annex A fits.</p></article></div>

          <div className="iso-exam-method"><span>Question method</span><ol><li>Identify whether the stem asks about a requirement, control, role, process stage or evidence.</li><li>Notice words such as first, most appropriate, required, retained or approved.</li><li>Eliminate answers that shift accountability to ISO, PECB or the auditor.</li><li>Prefer the answer that follows the management-system sequence and defined criteria.</li><li>Do not invent a requirement merely because it sounds like good security practice.</li></ol></div>

          <div className="iso-quiz-header"><div><span>Foundation question bank</span><h3>{correctCount} correct from {answeredCount} answered</h3></div><button type="button" onClick={() => setQuizAnswers({})}>Reset answers</button></div>
          <div className="iso-quiz-list">{quizQuestions.map((item, index) => {
            const selected = quizAnswers[index];
            const answered = selected !== undefined;
            return <article className={answered ? (selected === item.answer ? 'correct' : 'incorrect') : ''} key={item.question}>
              <header><span>Q{String(index + 1).padStart(2, '0')}</span><small>{item.module}</small></header>
              <h3>{item.question}</h3>
              <div>{item.options.map((option, optionIndex) => <button className={answered && optionIndex === item.answer ? 'answer' : answered && optionIndex === selected ? 'selected-wrong' : ''} disabled={answered} onClick={() => setQuizAnswers((current) => ({ ...current, [index]: optionIndex }))} type="button" key={option}><i>{String.fromCharCode(65 + optionIndex)}</i>{option}</button>)}</div>
              {answered && <p><b>{selected === item.answer ? 'Correct.' : `Answer: ${String.fromCharCode(65 + item.answer)}.`}</b> {item.explanation}</p>}
            </article>;
          })}</div>

          <div className="iso-interview-section"><header><span>Interview preparation</span><h3>Answer simply, then add one practical example.</h3></header><div>{interviewQuestions.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong><i>Reveal model answer</i></summary><p>{item.answer}</p></details>)}</div></div>
          {renderModuleComplete('exam')}
        </section>

        <section className="iso-module" id="capstone">
          <ModuleHeader number="12" eyebrow="Capstone" title="Build Canopy Cloud's dummy ISMS from a blank page." intro="The capstone converts recognition into practitioner skill. Use the fictional company facts, make reasonable assumptions and keep every decision traceable." />

          <div className="iso-capstone-brief"><span>Company brief</span><h3>Canopy Cloud, business-to-business software as a service</h3><p>Sixty-eight employees in Bengaluru and remote locations design, develop, operate and support a cloud platform that stores employee documents for 140 business customers. The company uses a public-cloud provider, hosted source control, a customer-support supplier and a coworking office. It handles confidential customer information, releases weekly and promises four-hour service recovery for its core platform.</p><div><b>Goal</b><p>Prepare an audit-ready, risk-based ISMS for the scoped service.</p></div></div>

          <div className="iso-capstone-sprints">
            <article><span>Week 1</span><h3>Frame</h3><p>Context, interested parties, obligations, scope, leadership, policy and roles.</p><small>Checkpoint: the boundary is precise and dependencies are visible.</small></article>
            <article><span>Week 2</span><h3>Assess</h3><p>Methodology, asset register, ten risk scenarios, owners, treatment decisions and objectives.</p><small>Checkpoint: another learner can reproduce your scoring logic.</small></article>
            <article><span>Week 3</span><h3>Implement</h3><p>Statement of Applicability, treatment plan, topic policies, operating procedures and evidence samples.</p><small>Checkpoint: each selected control traces to a reason and evidence.</small></article>
            <article><span>Week 4</span><h3>Assure</h3><p>Measures, internal audit, findings, corrective action, management review and improvements.</p><small>Checkpoint: the feedback loop produces documented decisions.</small></article>
          </div>

          <div className="iso-deliverables"><header><span>12 deliverables</span><h3>Your dummy ISMS pack</h3></header><ol>{capstoneDeliverables.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></div>

          <div className="iso-practical-exercises"><header><span>Practice before you finish</span><h3>Eight short exercises</h3></header><div>{practicalExercises.map((exercise, index) => <article key={exercise.title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{exercise.title}</h4><p>{exercise.task}</p><small>Output: {exercise.output}</small></article>)}</div></div>

          <div className="iso-capstone-rubric"><span>Self-review rubric</span><div><article><b>Traceability</b><p>Can every control, objective and action be traced to context, risk or requirement?</p></article><article><b>Ownership</b><p>Does every risk, control, decision and due date have an accountable owner?</p></article><article><b>Operation</b><p>Do procedures define trigger, criteria, exception and evidence?</p></article><article><b>Assurance</b><p>Do samples support conclusions about design and operation?</p></article><article><b>Improvement</b><p>Do incidents, measures, audit and review lead to verified change?</p></article></div></div>

          <div className="iso-finish-line"><span>Completion test</span><h3>You are ready for official Foundation training when you can explain the system without reading the labels.</h3><p>Start with a business context, trace a risk into treatment and the Statement of Applicability, show how the control operates, identify its evidence, explain how it is evaluated and describe how failure becomes corrective action and improvement.</p><div><a href="#top">Return to progress overview ↑</a><Link href="/learning">Open My learning →</Link></div></div>
          {renderModuleComplete('capstone')}
        </section>

        <section className="iso-module iso-misconceptions" id="misconceptions">
          <ModuleHeader number="A" eyebrow="Misconceptions" title="Correct the shortcuts that weaken understanding." intro="Strong Foundation answers depend on keeping roles, requirements, controls and evidence separate." />
          <div>{misconceptions.map(([myth, reality], index) => <article key={myth}><span>{String(index + 1).padStart(2, '0')}</span><h3>{myth}</h3><p>{reality}</p></article>)}</div>
        </section>

        <section className="iso-module iso-sources" id="sources">
          <ModuleHeader number="B" eyebrow="Authoritative sources" title="Use the handbook as a map, then check the authority." intro="The standard text is copyrighted and should be obtained through ISO or an authorized national standards body. Exam rules can change, so confirm them with PECB before booking." />
          <div>{sourceLinks.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>Primary source</span><strong>{source.label}</strong><p>{source.detail}</p><i>↗</i></a>)}</div>
          <p className="iso-source-note">Educational guide only. This is not ISO, IEC, accreditation-body, certification-body or PECB training material, and it does not guarantee examination or certification outcomes.</p>
        </section>
      </article>
    </div>
  </main>;
}
