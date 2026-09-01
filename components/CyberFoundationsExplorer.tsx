import Link from 'next/link';

const modules = [
  {
    number: '01',
    title: 'Security language that does not blur together',
    definition: 'An asset is something worth protecting. A threat is a possible cause of harm. A vulnerability is a weakness. An exploit is a method that uses a weakness. Exposure describes whether the weakness is reachable. Risk connects a plausible event to consequence and uncertainty. A control changes the likelihood, impact, detectability or recovery path.',
    analogy: 'A cracked window is a vulnerability. A burglar is a threat actor. An unlocked alley makes the window exposed. Climbing through it is exploitation. Stolen stock and interrupted trading are impacts. Locks, lighting, alarms and insurance perform different control jobs.',
    example: 'An internet-facing payroll portal has an unpatched authentication flaw. Exploit code is public, but the business impact depends on reachable accounts, privileges, payroll approval rules, monitoring and recovery.',
    impact: 'Account takeover can lead to fraudulent payments, personal-data exposure, payroll disruption, investigation cost and loss of employee trust.',
    actions: ['Write one cause-event-consequence scenario.', 'Name the affected service and data.', 'Confirm reachability and exploit preconditions.', 'Map preventive, detective and recovery controls.', 'Record residual risk and the decision owner.'],
    links: [['Threats and risk', '/learn/threats-vulnerabilities-exposure-and-risk'], ['Risk foundations', '/learn/risk-foundations-taxonomies-appetite-and-tolerance']],
  },
  {
    number: '02',
    title: 'Security objectives and the states of data',
    definition: 'Confidentiality limits inappropriate disclosure. Integrity protects correctness and completeness. Availability keeps information and services usable. Authenticity supports confidence that an entity or message is genuine. Accountability makes important actions traceable. Privacy, safety and resilience add objectives that matter in many real systems.',
    analogy: 'A sealed medical envelope needs privacy and confidentiality, but the correct patient name protects integrity, the clinician signature supports authenticity, the delivery record supports accountability, and timely arrival supports availability and safety.',
    example: 'Data can be at rest in storage, in transit across a network, or in use by a process. Encryption at rest does not protect a record after an authorized application decrypts and displays it to the wrong user.',
    impact: 'A service may stay online while producing wrong decisions. Availability alone cannot prove that transactions, diagnoses or records are trustworthy.',
    actions: ['Name the dominant objective for the service.', 'Trace sensitive data at rest, in transit and in use.', 'Mark trust and authorization changes.', 'Define an integrity check and a recovery test.', 'Choose evidence for each objective.'],
    links: [['Security goals', '/learn/cybersecurity-goals-and-principles'], ['Data protection', '/learn/data-lifecycle-classification-and-protection']],
  },
  {
    number: '03',
    title: 'Threat actors, motives and attack paths',
    definition: 'Threat actors include cybercriminals, insiders, state-linked groups, competitors, activists, opportunists and third parties. Motives include money, intelligence, disruption, influence, revenge and curiosity. An attack path links the actor, entry point, technique, privilege, target and intended consequence.',
    analogy: 'A detective does not protect a building by memorizing a list of criminals. They ask who might want access, what they want, which route is plausible, what evidence the route leaves and where it can be interrupted.',
    example: 'A criminal group buys stolen credentials, signs into remote access, discovers shared services, steals data and encrypts systems. Initial access, lateral movement and impact need different observations and controls.',
    impact: 'A missed path can turn one compromised account into fraud, extortion, prolonged outage or a reportable breach.',
    actions: ['Use MITRE ATT&CK to describe behavior, not to claim complete coverage.', 'Map high-value identities and reachable systems.', 'Identify the earliest reliable prevention point.', 'Identify telemetry for later stages.', 'Exercise escalation and containment.'],
    links: [['Actors and lifecycles', '/learn/threat-actors-motives-and-attack-lifecycles'], ['Malware and ransomware', '/learn/malware-ransomware-and-unwanted-software'], ['Attack and defense guide', '/red-blue']],
  },
  {
    number: '04',
    title: 'Networks, layers and transport trust',
    definition: 'Networks move frames and packets between interfaces and routes. Protocol layers separate responsibilities such as local delivery, addressing, transport, sessions and application meaning. Security depends on knowing which layer produced an observation and which trust decision it can support.',
    analogy: 'A parcel has local handling, a street address, a delivery route and contents with their own meaning. Inspecting the delivery truck cannot tell you whether the signed contract inside is legitimate.',
    example: 'A user joins an evil-twin wireless network. The attacker can manipulate local routing and name resolution, but correctly validated Transport Layer Security still protects the application session unless trust is also subverted.',
    impact: 'Weak segmentation or transport trust can expose credentials, redirect transactions, enable lateral movement or create an outage that appears to be an application problem.',
    actions: ['Trace DNS, address, route, transport and application steps.', 'Validate certificates and secure protocol versions.', 'Segment by trust and consequence.', 'Collect flow, firewall and resolver evidence.', 'Test from the user path, not only the server.'],
    links: [['OSI and TCP/IP', '/learn/network-foundations-and-protocol-models'], ['MITM and spoofing', '/learn/man-in-the-middle-spoofing-and-transport-trust']],
  },
  {
    number: '05',
    title: 'Identity, authentication and authorization',
    definition: 'Identity describes an entity and its attributes. Authentication establishes confidence in a claimed identity. Authorization decides what that identity may do in context. Accounting records relevant actions. Federation carries identity assertions between trust domains. Sessions preserve an authenticated state over time.',
    analogy: 'A passport identifies and authenticates a traveler, a boarding pass authorizes one journey, the gate checks context, and the flight record creates accountability. One document cannot safely perform every job.',
    example: 'A contractor leaves, but a federated account and long-lived refresh token remain active. Password reset alone does not revoke every session or downstream entitlement.',
    impact: 'Identity failure can enable account takeover, fraud, data access, unsafe administration and silent persistence through legitimate channels.',
    actions: ['Map joiner, mover and leaver events.', 'Prefer phishing-resistant authentication for material access.', 'Separate normal, privileged and machine identities.', 'Review authorization at the resource.', 'Test session revocation and recovery.'],
    links: [['Identity lifecycle', '/learn/digital-identity-directories-and-the-identity-lifecycle'], ['Access models', '/learn/authorization-and-access-control-models']],
  },
  {
    number: '06',
    title: 'Cryptography, certificates and keys',
    definition: 'Encryption protects confidentiality. Hashing produces a fixed-length digest used for integrity and comparison. A Message Authentication Code combines a secret with integrity. A digital signature supports integrity, origin authentication and non-repudiation within a wider legal and operational context. Certificates bind public keys to named subjects through a trust system.',
    analogy: 'Encryption is a locked box, hashing is a tamper-evident fingerprint, a signature is a seal tied to a signer, and a certificate is an identity card that helps others decide whether to trust the public key.',
    example: 'A database is encrypted, but the application key is stored beside it and every administrator can retrieve both. The algorithm may be strong while key management makes the control weak.',
    impact: 'Lost or misused keys can expose data, block recovery, break trusted communication or make legitimate records impossible to verify.',
    actions: ['Define the property required before choosing an algorithm.', 'Inventory keys, certificates and owners.', 'Protect generation, storage, use, rotation and revocation.', 'Remove obsolete protocols and ciphers.', 'Test recovery before a key or certificate expires.'],
    links: [['Cryptography', '/learn/cryptography-certificates-and-key-management'], ['Transport security', '/learn/the-internet-web-and-transport-security']],
  },
  {
    number: '07',
    title: 'Controls across endpoint, network, application and cloud',
    definition: 'Administrative, technical and physical describe how a control is implemented. Directive, deterrent, preventive, compensating, detective, corrective and recovery describe the job it performs. One control can have more than one function, and one scenario normally needs independent layers.',
    analogy: 'A smoke-free sign is directive, visible enforcement deters, fire-resistant material prevents spread, a detector identifies smoke, suppression corrects the immediate condition and evacuation plus restoration support recovery.',
    example: 'Endpoint Detection and Response may block known behavior, record process activity, isolate a host and support investigation. It does not replace email security, identity controls, segmentation, backups or response authority.',
    impact: 'Tool overlap can create cost without coverage. A single point of control can turn configuration failure into complete exposure.',
    actions: ['Map each control to a scenario and function.', 'Define population and coverage.', 'Test design and operating effectiveness separately.', 'Confirm failure independence.', 'Retain time-bound evidence and exceptions.'],
    links: [['Control families', '/learn/core-security-control-families'], ['Architecture principles', '/learn/security-architecture-and-design-principles']],
  },
  {
    number: '08',
    title: 'Vulnerability and exposure management',
    definition: 'Vulnerability management finds, validates, prioritizes, remediates and verifies weaknesses. Exposure management adds reachable assets, identities, attack paths and control effectiveness. Severity is one input. Business context, exploitability, exposure and consequence decide priority.',
    analogy: 'A building survey may find many cracked tiles, but the open fire door beside a crowded exit deserves attention first. A defect list is not yet a risk decision.',
    example: 'A critical library flaw exists on 500 hosts. Only twelve are internet-facing, but one internal instance runs under a privileged service identity that reaches payment systems. Both reachability and blast radius matter.',
    impact: 'Poor prioritization wastes remediation capacity, leaves exploitable paths open and creates misleading “percent patched” reporting.',
    actions: ['Maintain an owned asset and software inventory.', 'Validate findings and reachable conditions.', 'Add threat and business context.', 'Assign remediation or a time-bound exception.', 'Retest and monitor recurrence.'],
    links: [['Vulnerability lifecycle', '/learn/vulnerability-management-lifecycle'], ['Exposure validation', '/learn/exposure-management-asm-bas-and-control-validation']],
  },
  {
    number: '09',
    title: 'Detection, triage and incident response',
    definition: 'Telemetry is raw observable evidence. An analytic evaluates evidence. An alert requests attention. Triage decides whether and how to investigate. A case organizes work. An incident is a managed event that threatens objectives and requires coordinated response. Forensics preserves and interprets evidence under a defined method.',
    analogy: 'A smoke sensor reading is telemetry, a threshold creates an alert, a dispatcher triages it, responders open an incident, and an investigation determines cause and lessons. More alarms do not automatically create better safety.',
    example: 'An identity provider reports impossible travel. The analyst checks device, session, network and user context before deciding whether to revoke access, isolate an endpoint or close a benign alert.',
    impact: 'Slow or noisy detection increases dwell time, service disruption and investigation cost. Unsafe containment can destroy evidence or interrupt critical operations.',
    actions: ['Start with behavior worth detecting.', 'Confirm required telemetry and retention.', 'Write analyst decisions and escalation criteria.', 'Test with safe simulations.', 'Measure coverage, quality, time and outcome.'],
    links: [['Security operations', '/learn/security-operations-detection-and-threat-intelligence'], ['Incident response', '/learn/incident-response-digital-forensics-and-recovery']],
  },
  {
    number: '10',
    title: 'Governance, ethics and practitioner readiness',
    definition: 'Cybersecurity work operates under business objectives, law, policy, contracts, ethics and explicit authority. Technical ability does not create permission. A practitioner must know the task, evidence, decision owner, escalation path and limits of the method being used.',
    analogy: 'A locksmith may know how to open a door, but authorization, identity, scope and evidence determine whether opening it is professional service or unlawful entry.',
    example: 'A tester finds a possible weakness outside the agreed address range. The right action is to stop, preserve minimal evidence and request authorization, not to continue because the flaw looks important.',
    impact: 'Uncontrolled testing can cause outages, privacy violations, damaged evidence, contractual breach and legal exposure even when the intent was defensive.',
    actions: ['Get written scope and stop conditions.', 'Use the least harmful test that answers the question.', 'Protect evidence and personal data.', 'Communicate material changes quickly.', 'Translate findings into owners, fixes and verified closure.'],
    links: [['Rules of engagement', '/learn/ethics-authorization-scope-and-rules-of-engagement'], ['NICE-style work skills', '/paths#path-cybersecurity-generalist']],
  },
] as const;

export default function CyberFoundationsExplorer() {
  return <section className="article-section cyber-foundations" id="cyber-foundations">
    <header className="cyber-foundations-header">
      <div><span>Cybersecurity essentials</span><h2>Concept, consequence, example and action in one place.</h2></div>
      <p>Use this map as a first pass before opening a specialist guide. Each module separates closely related terms, shows a concrete situation and ends with work a practitioner should be able to perform.</p>
    </header>
    <div className="cyber-module-index" aria-label="Cybersecurity essentials modules">
      {modules.map((module) => <a href={`#cyber-module-${module.number}`} key={module.number}><span>{module.number}</span>{module.title}</a>)}
    </div>
    <div className="cyber-module-list">
      {modules.map((module, index) => <details id={`cyber-module-${module.number}`} open={index < 2} key={module.number}>
        <summary><span>{module.number}</span><strong>{module.title}</strong><i>＋</i></summary>
        <div className="cyber-module-body">
          <section><small>Definition</small><p>{module.definition}</p></section>
          <section className="cyber-analogy"><small>Analogy</small><p>{module.analogy}</p></section>
          <section><small>Concrete example</small><p>{module.example}</p></section>
          <section><small>Business impact</small><p>{module.impact}</p></section>
          <section className="cyber-actions"><small>Practitioner actions</small><ol>{module.actions.map((action) => <li key={action}>{action}</li>)}</ol></section>
          <nav>{module.links.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}</nav>
        </div>
      </details>)}
    </div>
  </section>;
}
