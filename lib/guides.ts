import { Topic } from './topics';
import { buildGuideEnrichment, type GuideEnrichment } from './guide-enrichment';

export type Guide = GuideEnrichment & {
  curated: boolean;
  promise: string;
  outcomes: string[];
  mentalModel: string;
  plainLanguage: string[];
  flow: string[];
  keyIdeas: Array<{ title: string; text: string }>;
  example: { title: string; context: string; steps: string[]; lesson: string };
  pitfalls: string[];
  deepDive: string[];
  practice: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  placement?: {
    plain: string;
    locations: Array<{ name: string; detail: string }>;
    capabilities: string[];
    examples: Array<{ provider: string; product: string; note: string }>;
    boundary: string;
  };
  history?: { title: string; story: string; names: string[] };
};

const sourceSets: Record<Topic['category'], Array<{ label: string; url: string }>> = {
  orientation: [
    { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
    { label: 'MDN learning and documentation patterns', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
  ],
  business: [
    { label: 'APM Body of Knowledge', url: 'https://www.apm.org.uk/body-of-knowledge/' },
    { label: 'ITIL service-management overview', url: 'https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1' },
  ],
  systems: [
    { label: 'Internet Engineering Task Force: standards and RFCs', url: 'https://www.ietf.org/standards/' },
    { label: 'NIST Computer Security Resource Center', url: 'https://csrc.nist.gov/' },
    { label: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/' },
    { label: 'Cisco Networking Academy', url: 'https://www.netacad.com/' },
  ],
  software: [
    { label: 'NIST Secure Software Development Framework', url: 'https://csrc.nist.gov/Projects/ssdf' },
    { label: 'OWASP Software Assurance Maturity Model', url: 'https://owaspsamm.org/' },
  ],
  cyber: [
    { label: 'Cisco CCST Cybersecurity exam and training outline', url: 'https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccst-cybersecurity.html' },
    { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
    { label: 'NIST NICE Workforce Framework for Cybersecurity', url: 'https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started' },
    { label: 'CIS Critical Security Controls', url: 'https://www.cisecurity.org/controls' },
    { label: 'NIST Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-4/' },
    { label: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
  ],
  cloud: [
    { label: 'Cloud Security Alliance guidance', url: 'https://cloudsecurityalliance.org/research/guidance' },
    { label: 'NIST Cloud Computing Program', url: 'https://www.nist.gov/programs-projects/nist-cloud-computing-program-nccp' },
  ],
  data: [
    { label: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
    { label: 'DAMA International: data management resources', url: 'https://www.dama.org/' },
  ],
  ai: [
    { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    { label: 'Stanford Artificial Intelligence Index', url: 'https://hai.stanford.edu/ai-index' },
  ],
  emerging: [
    { label: 'NIST Post-Quantum Cryptography project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
    { label: 'NIST Internet of Things cybersecurity program', url: 'https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program' },
    { label: 'World Wide Web Consortium emerging web standards', url: 'https://www.w3.org/standards/' },
  ],
  governance: [
    { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
    { label: 'The Institute of Internal Auditors: Three Lines Model', url: 'https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/' },
  ],
  risk: [
    { label: 'ISO 31000 risk management overview', url: 'https://www.iso.org/iso-31000-risk-management.html' },
    { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
  ],
  industries: [
    { label: 'NIST industry resources', url: 'https://www.nist.gov/' },
    { label: 'World Economic Forum: industries', url: 'https://www.weforum.org/communities/industry-and-business/' },
  ],
  people: [
    { label: 'Harvard Program on Negotiation', url: 'https://www.pon.harvard.edu/' },
    { label: 'Toastmasters International: public speaking resources', url: 'https://www.toastmasters.org/resources' },
  ],
  ecosystem: [
    { label: 'International Organization for Standardization', url: 'https://www.iso.org/home.html' },
    { label: 'Internet Engineering Task Force', url: 'https://www.ietf.org/' },
  ],
};

const categoryLens: Record<Topic['category'], { mental: string; ideas: Array<{ title: string; text: string }>; flow: string[]; pitfalls: string[] }> = {
  orientation: {
    mental: 'Begin with the outcome, trace the system that produces it, then examine uncertainty, controls, evidence and learning.',
    ideas: [
      { title: 'Purpose before parts', text: 'A technology choice only makes sense in relation to the outcome it is meant to support.' },
      { title: 'Relationships explain behavior', text: 'Dependencies and hand-offs often cause more surprises than individual components.' },
      { title: 'Evidence closes the loop', text: 'Useful knowledge connects an idea to what a practitioner would observe, measure or verify.' },
    ],
    flow: ['Objective', 'Process', 'System', 'Risk', 'Control', 'Evidence', 'Improve'],
    pitfalls: ['Starting with products instead of problems', 'Memorizing isolated definitions', 'Treating a diagram as reality rather than a useful model'],
  },
  business: {
    mental: 'An organization turns needs and resources into outcomes through a value proposition, operating model, processes, decisions and feedback.',
    ideas: [
      { title: 'Value before activity', text: 'Busy work is not automatically valuable; connect every process and investment to an outcome someone needs.' },
      { title: 'Operating model', text: 'Roles, processes, information, technology, suppliers and governance explain how strategy becomes repeatable action.' },
      { title: 'Economics', text: 'Cost, benefit, timing, risk and opportunity cost belong in technology decisions from the start.' },
    ],
    flow: ['Need', 'Value proposition', 'Operating model', 'Process', 'Measure', 'Learn'],
    pitfalls: ['Automating a broken process', 'Using activity as a substitute for outcomes', 'Ignoring adoption and operating cost'],
  },
  systems: {
    mental: 'A service is a chain of components that communicate through interfaces while carrying data, state and failure.',
    ideas: [
      { title: 'Boundaries', text: 'A clear boundary reveals ownership, trust, interfaces and where assumptions change.' },
      { title: 'Dependencies', text: 'A reliable component can still be part of an unreliable service when dependencies are fragile.' },
      { title: 'Observability', text: 'Logs, metrics and traces turn hidden behavior into evidence an operator can investigate.' },
    ],
    flow: ['Client', 'Network', 'Service', 'Data', 'Response', 'Telemetry'],
    pitfalls: ['Treating the network as invisible', 'Ignoring downstream dependencies', 'Collecting signals without a decision they support'],
  },
  software: {
    mental: 'Software delivery is a continuous decision system: from understanding a need to operating and retiring a change safely.',
    ideas: [
      { title: 'Outcome', text: 'A feature is useful only when it changes a user or business outcome in the intended way.' },
      { title: 'Feedback', text: 'Short feedback loops expose wrong assumptions before they become expensive.' },
      { title: 'Operability', text: 'A change is incomplete until it can be observed, supported, recovered and eventually retired.' },
    ],
    flow: ['Discover', 'Define', 'Design', 'Build', 'Verify', 'Release', 'Operate', 'Retire'],
    pitfalls: ['Starting with a solution', 'Testing only expected behavior', 'Treating deployment as the end of the lifecycle'],
  },
  cyber: {
    mental: 'Security protects an objective by understanding assets, plausible harm, exposure and the controls that reduce uncertainty.',
    ideas: [
      { title: 'Scenario over label', text: 'A useful risk describes how harm could occur, not merely a broad category such as cyber risk.' },
      { title: 'Defense in depth', text: 'Independent layers make one control failure less likely to become a complete compromise.' },
      { title: 'Residual risk', text: 'Controls reduce risk; they do not prove that uncertainty has disappeared.' },
    ],
    flow: ['Objective', 'Asset', 'Threat', 'Exposure', 'Impact', 'Control', 'Evidence'],
    pitfalls: ['Equating compliance with security', 'Buying tools without an operating model', 'Calling every weakness critical'],
  },
  cloud: {
    mental: 'Cloud changes who operates each layer, but responsibility still follows data, identity, configuration, application behavior and service outcomes.',
    ideas: [
      { title: 'Shared responsibility', text: 'The provider and customer boundary depends on the service being consumed.' },
      { title: 'Guardrails', text: 'Safe defaults and automated policy make good decisions easier at scale.' },
      { title: 'Failure design', text: 'Resilience comes from expecting component failure and testing recovery behavior.' },
    ],
    flow: ['Account', 'Identity', 'Network', 'Workload', 'Data', 'Observe', 'Recover'],
    pitfalls: ['Assuming the provider secures everything', 'Creating resources without ownership', 'Having backups without restoration tests'],
  },
  data: {
    mental: 'Data becomes useful when its meaning, source, quality, ownership, movement and permitted use remain understandable across the lifecycle.',
    ideas: [
      { title: 'Meaning', text: 'A field name is not enough; shared definitions and context keep metrics and decisions consistent.' },
      { title: 'Lineage', text: 'Knowing where data came from and how it changed supports debugging, trust, privacy and assurance.' },
      { title: 'Fitness for purpose', text: 'Quality is contextual: the same dataset can be suitable for one decision and unsafe for another.' },
    ],
    flow: ['Purpose', 'Create', 'Store', 'Transform', 'Use', 'Share', 'Retain or destroy'],
    pitfalls: ['Collecting data without a defined purpose', 'Confusing a dashboard with truth', 'Ignoring ownership and lineage'],
  },
  ai: {
    mental: 'Data and intelligent systems create value through a lifecycle of collection, transformation, decision, monitoring and accountable human use.',
    ideas: [
      { title: 'Purpose', text: 'The legitimate purpose should shape which data is collected and how long it is retained.' },
      { title: 'Evaluation', text: 'Fluent or plausible output is not evidence that a model is accurate or appropriate.' },
      { title: 'Human accountability', text: 'Automation changes work; it does not automatically transfer responsibility.' },
    ],
    flow: ['Purpose', 'Data', 'Model', 'Evaluate', 'Use', 'Monitor', 'Retire'],
    pitfalls: ['Beginning with novelty rather than need', 'Using unapproved sensitive data', 'Treating a system prompt as a security boundary'],
  },
  emerging: {
    mental: 'An emerging technology deserves adoption only when scientific feasibility, product maturity, operating fit, safety, security, economics, standards and exit risk support the intended outcome.',
    ideas: [
      { title: 'Evidence before enthusiasm', text: 'Separate a laboratory result, a useful prototype, a supportable product and proven organizational value.' },
      { title: 'System boundary', text: 'New capability still depends on identity, data, networks, software, suppliers, operations and accountable people.' },
      { title: 'Reversibility', text: 'Experiments need cost limits, learning goals, stop conditions and an exit path before dependency grows.' },
    ],
    flow: ['Need', 'Evidence', 'Maturity', 'Experiment', 'Evaluate', 'Govern', 'Adopt or stop'],
    pitfalls: ['Confusing novelty with value', 'Scaling before standards and operations are ready', 'Ignoring long-lived security and supplier dependency'],
  },
  governance: {
    mental: 'Governance sets direction; risk informs decisions; controls change exposure; evidence supports assurance and improvement.',
    ideas: [
      { title: 'Accountability', text: 'Clear ownership identifies who decides, who acts and who provides independent challenge.' },
      { title: 'Evidence', text: 'A policy describes intent; evidence helps show whether the intended behavior occurred.' },
      { title: 'Assurance', text: 'The level of confidence depends on scope, method, independence and evidence quality.' },
    ],
    flow: ['Objective', 'Risk', 'Decision', 'Control', 'Evidence', 'Assurance', 'Improve'],
    pitfalls: ['Treating a framework as a checklist', 'Confusing certification with universal safety', 'Reporting metrics that do not support a decision'],
  },
  risk: {
    mental: 'Risk is the effect of uncertainty on an objective; useful risk work turns plausible scenarios into explicit choices, treatments and monitored residual exposure.',
    ideas: [
      { title: 'Objective', text: 'Risk only has meaning in relation to something a person or organization is trying to achieve.' },
      { title: 'Scenario', text: 'A clear cause-event-consequence chain is more actionable than a broad label such as operational risk.' },
      { title: 'Decision', text: 'Assessment informs a choice: avoid, reduce, transfer, accept, pursue or gather more evidence.' },
    ],
    flow: ['Context', 'Objective', 'Scenario', 'Analyze', 'Treat', 'Accept', 'Monitor'],
    pitfalls: ['Using precise numbers without evidence', 'Treating a heat map as the decision', 'Ignoring concentration and connected risk'],
  },
  industries: {
    mental: 'Every industry combines a value chain, important data, enabling systems, human roles, failure consequences and oversight.',
    ideas: [
      { title: 'Value chain', text: 'Begin with how the domain creates value before mapping technology or risk.' },
      { title: 'Crown jewels', text: 'The most important assets may be safety, service continuity, trust or market integrity: not only data.' },
      { title: 'Context', text: 'The same control can have different consequences in a bank, hospital, factory or public service.' },
    ],
    flow: ['Customer need', 'Value chain', 'Systems', 'Data', 'Risk', 'Control', 'Outcome'],
    pitfalls: ['Copying controls without domain context', 'Assuming one regulator is universal', 'Ignoring physical or societal consequences'],
  },
  people: {
    mental: 'Professional skill combines a clear purpose, accurate listening, structured expression, sound judgment and respectful follow-through.',
    ideas: [
      { title: 'Curiosity', text: 'Good conversation begins with a genuine desire to understand rather than perform.' },
      { title: 'Structure', text: 'A simple structure helps another person follow your reasoning without making you sound scripted.' },
      { title: 'Trust', text: 'Reliability grows from clarity, honest limits, respectful behavior and consistent follow-through.' },
    ],
    flow: ['Prepare', 'Listen', 'Clarify', 'Respond', 'Confirm', 'Follow through'],
    pitfalls: ['Talking to impress rather than connect', 'Confusing confidence with certainty', 'Using a framework as a memorized script'],
  },
  ecosystem: {
    mental: 'Institutional authority depends on mandate: a regulator, standards body, public agency, community and vendor do not play the same role.',
    ideas: [
      { title: 'Authority', text: 'Ask whether an output is law, regulation, a standard, guidance, community knowledge or commercial advice.' },
      { title: 'Scope', text: 'Jurisdiction, audience and version determine whether a publication applies.' },
      { title: 'Primary source', text: 'Use the issuing organization when accuracy, editions and definitions matter.' },
    ],
    flow: ['Mandate', 'Publication', 'Adoption', 'Implementation', 'Evidence', 'Feedback'],
    pitfalls: ['Equating fame with authority', 'Using outdated editions', 'Treating vendor material as neutral regulation'],
  },
};

const detailed: Record<string, Partial<Guide>> = {
  'business-to-technology-map': {
    promise: 'See one complete chain from a human or business goal to technology, risk, controls and evidence.',
    outcomes: ['Draw the layers of a digital service', 'Explain why business and technical language must connect', 'Trace a failure to its business consequence'],
    mentalModel: 'Technology is an operating system for an outcome. Start with the outcome, map the process, then identify the people, information, applications and infrastructure that make it possible.',
    plainLanguage: [
      'A business objective describes the result an organization wants. A process is the repeatable work that produces that result. Technology enables, constrains and records that process.',
      'Risk appears when uncertainty could affect the objective. Controls change how likely or harmful a scenario is. Evidence helps people judge whether the controls and process behaved as intended.',
    ],
    flow: ['Objective', 'Process', 'People', 'Information', 'Application', 'Infrastructure', 'Risk', 'Control', 'Evidence'],
    example: {
      title: 'Cedar Services launches online leave requests',
      context: 'A fictional services company wants employees to request leave without email chains.',
      steps: ['Define the outcome: accurate, timely approval', 'Map employee, manager and payroll roles', 'Design the portal, identity service, workflow and record store', 'Identify access, availability and data-integrity risks', 'Add approval, logging, backup and review controls', 'Monitor completion time, errors and unusual access'],
      lesson: 'The portal is only one component. The useful system includes people, policy, data, integrations, controls and feedback.',
    },
  },
  'software-development-life-cycle-and-delivery-methods': {
    promise: 'Understand software as a living service, not a one-time coding exercise.',
    outcomes: ['Explain each lifecycle stage', 'Place quality and security decisions early', 'Compare delivery methods without dogma'],
    mentalModel: 'The Software Development Life Cycle (SDLC) is the complete set of decisions used to move from a problem to a supported and eventually retired service.',
    plainLanguage: [
      'Different teams use different labels, but every responsible delivery effort must understand the need, make design choices, build, verify, release, operate and retire.',
      'Agile, sequential and hybrid methods organize feedback differently. None removes the need for clear objectives, evidence, ownership or control.',
    ],
    flow: ['Discover', 'Define', 'Design', 'Build', 'Verify', 'Release', 'Operate', 'Retire'],
    example: {
      title: 'A safer password-reset feature',
      context: 'A fictional product team needs to reduce support calls without making account takeover easier.',
      steps: ['Define the user problem and abuse cases', 'Specify token lifetime, single use and neutral error messages', 'Design identity checks and recovery paths', 'Test expected and malicious behavior', 'Release gradually with monitoring', 'Review failed resets and support outcomes'],
      lesson: 'Security is not a final test; it changes requirements, design, implementation, release and monitoring.',
    },
  },
  'software-vulnerability-families-and-secure-coding': {
    promise: 'Learn why common software weaknesses occur, how they become business incidents and which design and verification techniques interrupt them.',
    outcomes: ['Distinguish memory corruption, unsafe input, injection, race conditions and broken access control', 'Choose preventive design and testing techniques for each weakness family', 'Translate a technical defect into a service, data and business consequence'],
    mentalModel: 'A software vulnerability begins with an unsafe assumption at a boundary: about memory size, input meaning, execution order, identity, authority, cryptography or the trustworthiness of the device itself.',
    plainLanguage: [
      'A buffer is a bounded memory area. Writing beyond its limit can corrupt another value, crash a process, expose data or alter execution. An image file with malicious dimensions can trigger an incorrect allocation or an arithmetic overflow before the program copies the image data.',
      'Input validation checks whether data has an expected type, length, range, format and business meaning. It is necessary but not sufficient. Parameterized queries, safe parsers, contextual output encoding, bounded memory operations and server-side authorization prevent untrusted data from becoming a command or an unauthorized action.',
      'A race condition appears when correct behavior depends on timing or order. Time-of-check to time-of-use is the classic pattern: a program checks an object, another operation changes it, then the program uses a condition that is no longer true. Atomic operations, transactions, invariants and idempotency make correctness survive concurrency.',
      'Access control must be enforced at the trusted service boundary for every requested action and object. File permissions and login controls also assume the platform remains trusted. Physical possession can bypass the operating system by removing storage or booting another environment, which is why full-disk encryption, secure boot and physical controls matter.',
      'Do not invent security algorithms. Use maintained, reviewed libraries and protocols, manage keys and dependencies, keep secure defaults enabled and document the threat assumptions the mechanism is meant to satisfy.',
    ],
    keyIdeas: [
      { title: 'Validate, then use safely', text: 'Validation rejects unacceptable data. Safe interfaces ensure accepted data remains data rather than becoming code, a query, a path or markup.' },
      { title: 'Preserve the invariant', text: 'Concurrency control is successful when the rule that must always be true remains true under overlap, retry, failure and reordering.' },
      { title: 'Authorize the object and action', text: 'A valid session does not imply access to every record, function, tenant or workflow transition.' },
      { title: 'Physical possession changes the model', text: 'Operating-system permissions alone do not protect powered-off storage from an attacker who controls the device.' },
    ],
    flow: ['Untrusted source', 'Parsing and validation', 'Sensitive operation', 'Authorization and state', 'Output or side effect', 'Evidence and recovery'],
    pitfalls: ['Checking input length but missing integer overflow in the allocation calculation', 'Escaping one context and reusing the value in a different context', 'Testing sequential happy paths while ignoring retries and concurrent requests', 'Performing authorization only in the interface', 'Creating custom cryptography or disabling certificate validation to make an integration work'],
    example: {
      title: 'A malicious image reaches a document service',
      context: 'A fictional customer portal accepts images for identity documents. The parser trusts dimensions in the file header, multiplies them without checked arithmetic and allocates a smaller buffer than the later decoder expects.',
      steps: ['Treat file contents and metadata as untrusted', 'Parse with a maintained library in a low-privilege isolated process', 'Check dimensions, decoded size and arithmetic before allocation', 'Apply memory-safety protections and fuzz the parser with malformed inputs', 'Limit processing time, memory and output size', 'Record parser failure, request identity, file hash and service health without storing unnecessary sensitive content'],
      lesson: 'The defect is not merely a bad image. It is an unsafe trust decision that can become memory corruption, resource exhaustion, code execution, data exposure and customer-facing outage.',
    },
    deepDive: [
      'Compare a stack buffer overflow, heap overflow, out-of-bounds read and integer overflow. Explain which memory operation fails and what evidence a sanitizer or crash dump can provide.',
      'Design negative authorization tests for a multi-tenant invoice Application Programming Interface. Cover another user, another role, another tenant, a disabled account and a direct call that bypasses the interface.',
      'Model a double-spend race. Identify the business invariant, unsafe check-and-update sequence, atomic enforcement point, idempotency behavior and evidence that concurrent tests must retain.',
    ],
    practice: [
      { question: 'An upload endpoint rejects files larger than 10 MB. Why can a tiny image still trigger a buffer or allocation failure?', answer: 'Transport size is not decoded size. Compressed data or malicious dimensions can expand dramatically, and width multiplied by height, channels or bytes per pixel can overflow an integer. Validate each dimension and the checked arithmetic result, cap decoded resources and use a maintained parser inside a constrained process.' },
      { question: 'A developer validates that a customerId is numeric before using it in a parameterized query. What major control can still be missing?', answer: 'Authorization. Parameterization prevents the value from changing query structure, and numeric validation constrains format, but the server must still prove that the authenticated subject may access that customer object in the current tenant and workflow context.' },
      { question: 'A balance check and a debit are both correct when tested separately. Two simultaneous withdrawals overspend the account. What must change?', answer: 'The invariant must be enforced atomically at the authoritative state boundary, for example through a transaction, conditional update or database constraint. Also define idempotency and retry behavior, then test overlapping requests and retain timestamps, transaction identifiers and final state.' },
    ],
    sources: [
      { label: 'MITRE Common Weakness Enumeration', url: 'https://cwe.mitre.org/' },
      { label: 'NIST Secure Software Development Framework', url: 'https://csrc.nist.gov/Projects/ssdf' },
      { label: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
      { label: 'CISA Secure by Design', url: 'https://www.cisa.gov/securebydesign' },
    ],
  },
  'cybersecurity-goals-and-principles': {
    promise: 'Build a durable security mental model that works beyond products and acronyms.',
    outcomes: ['Connect an asset to a threat scenario', 'Choose preventive, detective and recovery controls', 'Explain residual risk honestly'],
    mentalModel: 'Cybersecurity protects objectives by understanding valuable assets, plausible harmful scenarios, exposure and the controls that reduce uncertainty.',
    plainLanguage: [
      'Confidentiality limits inappropriate disclosure. Integrity protects correctness and completeness. Availability keeps information and services usable when needed.',
      'Authenticity, accountability, privacy, safety and resilience matter too. Which properties matter most depends on the objective and domain.',
    ],
    flow: ['Objective', 'Asset', 'Threat scenario', 'Vulnerability', 'Impact', 'Control', 'Evidence'],
    example: {
      title: 'Protecting a payroll file',
      context: 'A payroll process depends on sensitive, accurate and timely employee information.',
      steps: ['Classify the file and identify users', 'Limit access by role and business need', 'Encrypt transfer and storage', 'Log access and changes', 'Review entitlements', 'Test restoration and error correction'],
      lesson: 'One asset can require confidentiality, integrity and availability controls for different reasons.',
    },
  },
  'malware-ransomware-and-unwanted-software': {
    promise: 'Recognize malware by behavior and purpose, then connect prevention, evidence, containment and recovery to the business service at risk.',
    outcomes: ['Distinguish major malware families without using “virus” as a catch-all', 'Trace delivery, execution, persistence, command and control, theft and impact', 'Choose safe evidence and response actions for a suspected infection'],
    mentalModel: 'Malware is software or code used to perform unauthorized behavior. Family names describe how it spreads, hides, persists or creates impact; they do not replace analysis of the actual behavior on the affected system.',
    plainLanguage: [
      'A virus attaches to a host file and replicates when that host runs. A worm spreads autonomously between systems. A Trojan relies on deceptive appearance or delivery. Spyware collects information, a keylogger captures input, a rootkit hides privileged presence, and a bot joins compromised devices under coordinated control.',
      'Ransomware is an impact and extortion model rather than one technical family. Modern incidents may combine credential theft, legitimate remote tools, data theft, encryption and pressure against customers or partners. “Fileless” activity often abuses scripts, memory and trusted administration tools, but it still leaves behavior and evidence.',
      'Defenders should ask what executed, under which identity, how it arrived, what changed, where it communicated, what it accessed and whether the affected service can be restored cleanly. A product verdict is a lead, not the complete incident conclusion.',
    ],
    keyIdeas: [
      { title: 'Family describes behavior', text: 'Use virus, worm, Trojan, rootkit or spyware only when the defining behavior is supported by evidence.' },
      { title: 'Ransomware is an operation', text: 'Identity abuse, discovery, lateral movement, theft, encryption, extortion and recovery failure can all be part of one campaign.' },
      { title: 'Clean recovery is a security decision', text: 'Restoration must verify identity, persistence, configuration, data integrity and the weakness that allowed entry.' },
    ],
    flow: ['Delivery or access', 'Execution', 'Persistence', 'Privilege and discovery', 'Command and control', 'Collection or impact', 'Contain and recover'],
    pitfalls: ['Calling every malicious program a virus', 'Deleting a file before preserving useful evidence', 'Rebuilding one host while stolen identities and persistence remain active', 'Treating backup existence as proof of clean and timely recovery'],
    example: {
      title: 'The invoice that became a service outage',
      context: 'A fictional finance user opens a convincing supplier document. A script launches a trusted system tool, creates persistence, contacts an external service and uses the user session to reach a shared folder. Hours later, files are encrypted while stolen administrator credentials are used against backups.',
      steps: ['Isolate affected paths without shutting down evidence sources blindly', 'Preserve the message, process tree, script, persistence, connections and identity events', 'Revoke active sessions and protect recovery administration', 'Hunt for the same behavior and infrastructure across the estate', 'Rebuild from trusted sources and restore tested data', 'Correct the entry path, privilege, segmentation, detection and backup gaps'],
      lesson: 'The harmful program is only one part of the incident. Identity, network reachability, administration and recovery design determine the final consequence.',
    },
    deepDive: [
      'Compare signature, behavioral and reputation-based detection. Which malware stages can each observe, and how could an attacker evade the signal?',
      'Design a ransomware exercise that validates identity containment, critical-service continuity, backup isolation, restoration integrity and executive decisions without using live destructive code.',
      'Explain why removing the detected binary may not remove scheduled tasks, stolen tokens, new accounts, modified cloud keys or command channels.',
    ],
    practice: [
      { question: 'A workstation alert labels a file as a Trojan. What must an analyst establish before declaring the incident contained?', answer: 'Confirm execution, process ancestry, persistence, network communication, affected identities, accessed data, lateral activity and related indicators. Containment must address active sessions and reachable systems, not only quarantine the named file. Preserve enough evidence to explain the path and verify that recovery removed every known foothold.' },
      { question: 'Why is “we have immutable backups” an incomplete ransomware answer?', answer: 'Backups do not prove recovery time, clean administration, dependency readiness, identity integrity, application consistency or that stolen data will not be used for extortion. Exercise restoration into a controlled environment, verify data and service behavior, and protect the people and credentials that can alter the recovery path.' },
      { question: 'A program spreads automatically but does not encrypt data. Is it ransomware?', answer: 'Automatic spread supports the worm label. Ransomware describes disruption or extortion involving denied access, commonly encryption but sometimes other mechanisms. Classify observed behavior separately: propagation, persistence, collection, command and control, impact and motive may belong to different parts of the analysis.' },
    ],
    sources: [
      { label: 'CISA StopRansomware guidance', url: 'https://www.cisa.gov/stopransomware' },
      { label: 'MITRE ATT&CK Enterprise techniques', url: 'https://attack.mitre.org/techniques/enterprise/' },
      { label: 'NIST incident response publications', url: 'https://csrc.nist.gov/projects/incident-response' },
    ],
  },
  'password-attacks-offline-cracking-and-authentication-defense': {
    promise: 'Understand how password guessing actually works so you can design storage, authentication and authorized audits that resist it.',
    outcomes: ['Separate offline cracking from online login guessing', 'Explain wordlists, rules, masks, brute force, rainbow tables, spraying and credential stuffing', 'Choose password storage, verifier and monitoring controls that match the attack path'],
    mentalModel: 'A password attack supplies candidate secrets to a verifier. The decisive question is whether the attacker is computing against a stolen verifier offline or submitting guesses to a live authentication service.',
    plainLanguage: [
      'A wordlist is a text file containing candidate passwords, usually ordered or selected because people are likely to choose them. A dictionary attack tries those candidates. Rules can transform them, while a mask describes likely positions. Brute force explores every candidate in a defined character space.',
      'Offline cracking begins after password hashes or an encrypted artifact are obtained. There is no account lockout or live-service rate limit. Resistance depends on password unpredictability, a unique salt, a suitable slow password-hashing scheme, its cost factor and the attacker’s compute.',
      'Online guessing talks to a live verifier. Brute force targets a login, password spraying tries a small number of common passwords across many accounts, and credential stuffing replays username-password pairs from another breach. Throttling, blocklists, passkeys, multi-factor authentication, device and network context, and distributed-pattern detection can change the result.',
      'Rainbow tables are precomputed time-memory trade-off lookups. A unique salt makes the same password produce different stored hashes and prevents one reusable table from solving many accounts. Salt is not secret and does not replace a slow password-hashing scheme.',
      'Tools have different placement. hashcat, John the Ripper, Ophcrack, RainbowCrack and L0phtCrack operate on approved offline material. THC Hydra and Medusa submit attempts to live services, which creates lockout, alerting, availability and legal risk.',
    ],
    keyIdeas: [
      { title: 'A wordlist is candidate data', text: 'It is commonly a line-oriented text file of likely passwords, not a magic exploit and not necessarily an ordinary language dictionary.' },
      { title: 'Salt defeats reuse, not guessing', text: 'Unique salts stop precomputed results from being reused across accounts, while a slow password hash raises the cost of every new guess.' },
      { title: 'Online tests touch production controls', text: 'A login tester can lock accounts, interrupt service, create alerts and expose real credentials. Authority and stop conditions are part of the technical method.' },
      { title: 'Passwords are one layer', text: 'Long unique passwords, password managers, passkeys and phishing-resistant multi-factor authentication address different failure paths.' },
    ],
    flow: ['Candidate model', 'Offline hash or live verifier', 'Guess evaluation', 'Signal and rate controls', 'Successful or rejected attempt', 'Response and evidence'],
    pitfalls: ['Calling every password attack brute force', 'Running a live-service tester when an offline or synthetic test answers the question', 'Treating recovered passwords as ordinary report data', 'Assuming complexity rules prevent predictable passwords', 'Believing a salt compensates for a fast password hash'],
    example: {
      title: 'A safe enterprise password audit',
      context: 'A fictional organization wants to understand whether legacy Windows passwords and its public login resist common guessing without exposing real users to an uncontrolled test.',
      steps: ['Obtain written authority and separate the offline and online questions', 'Use an approved copy of test hashes or synthetic accounts rather than harvesting production secrets unnecessarily', 'Protect the audit system, inputs, recovered values and output as sensitive evidence', 'Apply a defined candidate corpus, time budget and stop condition to the offline test', 'Test the live verifier with synthetic accounts, low rates and active service-owner monitoring', 'Report weakness patterns, storage and control gaps without publishing recovered credentials', 'Reset affected secrets, improve storage and authentication controls, and verify the new state'],
      lesson: 'The result is not “the tool cracked passwords.” The result explains which verifier, candidate model and control boundary failed, what business access was exposed and which change measurably improves resistance.',
    },
    deepDive: [
      'Compare a wordlist, rule, mask and exhaustive search. For a fixed audit budget, explain how each candidate model changes coverage and what it cannot prove.',
      'Model a stolen password database containing unique salts and a modern work factor. Explain which attack advantages remain, which are removed and how defenders should respond after disclosure.',
      'Design detection for password spraying that spans source, account, application and time. Explain why per-account lockout can miss the pattern and can also be abused for denial of service.',
    ],
    practice: [
      { question: 'Two users chose the same password, but their stored hashes differ. What likely caused this, and what protection does it provide?', answer: 'Unique salts cause the password-hashing scheme to produce different verifier values for the same password. This prevents direct equality comparison and reusable precomputed rainbow-table lookups across accounts. It does not make a predictable password unguessable, so the password hash must also be deliberately expensive and the password should be long and unique.' },
      { question: 'Why is THC Hydra against a login page fundamentally different from hashcat against an approved hash file?', answer: 'Hydra submits attempts to a live verifier and can trigger throttling, account lockout, alerts, privacy exposure and service disruption. hashcat evaluates candidates locally against copied verifier material, so no live account control can slow it, but the sensitive hashes and any recovered credentials create strict evidence-handling obligations. Both require authority, but their technical risk and defenses differ.' },
      { question: 'A company locks an account after five failures. Why can password spraying still work, and what should a defender add?', answer: 'Spraying distributes a few likely passwords across many accounts so each account remains below a simple threshold. Add cross-account and cross-source analytics, rate controls at several dimensions, block known weak passwords at enrollment, phishing-resistant multi-factor authentication or passkeys, and a safe response that does not let an attacker lock the whole workforce.' },
    ],
    sources: [
      { label: 'NIST SP 800-63B Authentication and Authenticator Management', url: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { label: 'MITRE ATT&CK Brute Force T1110', url: 'https://attack.mitre.org/techniques/T1110/' },
      { label: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
      { label: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    ],
  },
  'digital-identity-directories-and-the-identity-lifecycle': {
    promise: 'Follow a person or machine identity from proofing to final removal.',
    outcomes: ['Separate identity, account and access', 'Trace joiner-mover-leaver controls', 'Recognize evidence that access is governed'],
    mentalModel: 'Identity management keeps a reliable relationship between a real entity, its digital representation, its authenticators and its permissions over time.',
    plainLanguage: [
      'Identification states who or what an entity claims to be. Authentication tests that claim. Authorization decides what the authenticated identity may do in the current context.',
      'Directories store identities and attributes. Governance assigns ownership, approval and review so access changes when the underlying relationship changes.',
    ],
    flow: ['Establish', 'Request', 'Approve', 'Provision', 'Use', 'Review', 'Change', 'Remove'],
    example: {
      title: 'Temporary contractor access',
      context: 'A contractor needs reporting access for eight weeks.',
      steps: ['Verify identity and sponsor', 'Approve a narrow role', 'Require strong authentication', 'Set automatic expiry', 'Log sensitive actions', 'Review and remove access at the end'],
      lesson: 'The safest access decision includes purpose, owner, scope and time: not only a username.',
    },
  },
  'security-operations-detection-and-threat-intelligence': {
    promise: 'See how raw technical signals become an informed security decision.',
    outcomes: ['Separate event, alert, case and incident', 'Explain SIEM and EDR in plain language', 'Use threat intelligence with context'],
    mentalModel: 'Security operations collects useful signals, applies detection logic, investigates context and coordinates proportionate action.',
    plainLanguage: [
      'Security Information and Event Management (SIEM) collects and analyzes security-relevant events from many systems. Endpoint Detection and Response (EDR) records endpoint activity and supports investigation and response.',
      'Neither capability acts intelligently by itself. Coverage, configuration, data quality, detection design, operating process and analyst judgment determine the result.',
    ],
    flow: ['Telemetry', 'Detection', 'Alert', 'Triage', 'Case', 'Contain', 'Recover', 'Learn'],
    example: {
      title: 'An unusual sign-in becomes a case',
      context: 'A fictional user signs in from a new country and immediately downloads sensitive reports.',
      steps: ['Confirm signal quality and user context', 'Inspect identity, endpoint and application evidence', 'Assess business impact and active risk', 'Contain the session if justified', 'Communicate with the owner', 'Document cause and improve detection'],
      lesson: 'A suspicious signal is a reason to investigate, not automatic proof of compromise.',
    },
  },
  'edr-ndr-xdr-and-detection-technology-landscape': {
    promise: 'Place endpoint, network and cross-surface detection tools in the architecture: and understand what work they actually enable.',
    outcomes: ['Expand EDR, NDR and XDR correctly', 'Show where each capability runs and sends data', 'Compare prevention, detection, investigation and response'],
    mentalModel: 'Endpoint Detection and Response watches hosts; Network Detection and Response watches network behavior; Extended Detection and Response correlates evidence across several security surfaces.',
    plainLanguage: [
      'Endpoint Detection and Response (EDR) commonly uses a software agent on laptops, servers and cloud workloads. The agent records selected activity, detects suspicious behavior and can support response actions such as isolating a host or stopping a process.',
      'Network Detection and Response (NDR) observes network traffic or metadata through sensors, taps, virtual network mirrors or cloud integrations. Extended Detection and Response (XDR) joins endpoint, identity, email, cloud, application or network signals into one investigation and response layer.',
      'These labels describe capability families, not guaranteed outcomes. Coverage, tuning, permissions, telemetry quality, retention, integrations and a practiced operating team determine whether the tool helps.',
    ],
    flow: ['Host / workload', 'Agent or sensor', 'Telemetry', 'Detection', 'Correlated incident', 'Investigation', 'Response'],
    placement: {
      plain: 'Think of a sensing and response fabric. Some components live directly on a host, some observe networks, and the analytics and management plane is commonly delivered as a cloud service or an organization-managed platform.',
      locations: [
        { name: 'Endpoint / host', detail: 'An EDR agent runs on employee devices, servers and often cloud workloads to observe process, file, memory, user and connection activity.' },
        { name: 'Network / cloud fabric', detail: 'NDR sensors inspect packets or flow metadata from network taps, switches, virtual networks and cloud traffic-mirroring services.' },
        { name: 'Management & analytics', detail: 'A central console correlates alerts, stores evidence, supports hunting and sends authorized response commands.' },
        { name: 'Security Operations Center', detail: 'Analysts and incident responders triage, investigate, contain, recover and improve detections using the platform.' },
      ],
      capabilities: ['Malware and behavioral prevention', 'Continuous endpoint or network telemetry', 'Detection and alerting', 'Threat hunting and investigation', 'Host isolation and process or file response', 'Cross-surface correlation and automated workflows'],
      examples: [
        { provider: 'Microsoft', product: 'Defender for Endpoint / Defender XDR', note: 'Endpoint protection plus correlation across identity, email, applications and other Microsoft security services.' },
        { provider: 'CrowdStrike', product: 'Falcon Insight XDR', note: 'Endpoint-centered detection and response extended through the Falcon platform and integrations.' },
        { provider: 'Palo Alto Networks', product: 'Cortex XDR', note: 'Correlates endpoint, network, cloud and other security data for detection and response.' },
        { provider: 'SentinelOne', product: 'Singularity Endpoint / XDR', note: 'Endpoint, identity and cloud telemetry with cross-source correlation and response.' },
        { provider: 'Cisco, Vectra AI and ExtraHop', product: 'XDR or NDR portfolios', note: 'Examples of broader cross-domain or network-centered detection approaches.' },
      ],
      boundary: 'A product name is not an architecture. Verify supported operating systems, data sources, data location, response permissions, retention, licensing and current product naming before selection.',
    },
    sources: [
      { label: 'Microsoft Defender XDR documentation', url: 'https://learn.microsoft.com/en-us/defender-xdr/' },
      { label: 'SentinelOne Singularity XDR platform', url: 'https://www.sentinelone.com/platform/singularity-xdr-protection/' },
      { label: 'MITRE ATT&CK Evaluations', url: 'https://attackevals.mitre-engenuity.org/' },
    ],
  },
  'siem-soar-and-security-analytics-platforms': {
    promise: 'Understand the security-operations data plane: what it collects, how it detects and where automation belongs.',
    outcomes: ['Expand SIEM and SOAR', 'Trace logs from source to investigation', 'Explain the operating and cost trade-offs'],
    mentalModel: 'Security Information and Event Management (SIEM) centralizes and analyzes security-relevant data; Security Orchestration, Automation and Response (SOAR) coordinates repeatable response workflows across tools.',
    plainLanguage: [
      'A SIEM does not simply store every log. Teams decide which sources matter, parse and normalize them, enrich events with context, apply detection logic, group findings into cases and retain evidence for investigation or obligations.',
      'SOAR connects tools and people through playbooks. A playbook might enrich an alert, request approval, disable an account and record each action. High-impact automation needs clear permissions, testing, human checkpoints and rollback.',
    ],
    flow: ['Sources', 'Collect', 'Parse', 'Enrich', 'Detect', 'Investigate', 'Orchestrate', 'Learn'],
    placement: {
      plain: 'SIEM and SOAR usually sit above the organization’s endpoints, identity systems, cloud platforms, applications and network controls. They consume evidence from those systems and coordinate action back through integrations.',
      locations: [
        { name: 'Data sources', detail: 'Identity, endpoint, firewall, cloud, application, database and Software-as-a-Service systems emit logs, events and alerts.' },
        { name: 'Collection layer', detail: 'Agents, connectors, APIs, event streams or collectors transport and transform telemetry.' },
        { name: 'Analytics platform', detail: 'Cloud-native, self-managed or hybrid platforms retain searchable data and run rules, analytics and investigations.' },
        { name: 'Response layer', detail: 'SOAR playbooks integrate with ticketing, identity, endpoint, network and communication systems.' },
      ],
      capabilities: ['Collection and normalization', 'Search and threat hunting', 'Correlation and detection engineering', 'Incident and case management', 'Threat-intelligence enrichment', 'Playbooks and response orchestration', 'Compliance-oriented reporting and retention'],
      examples: [
        { provider: 'Microsoft', product: 'Microsoft Sentinel', note: 'Cloud-native SIEM with analytics, hunting, incidents and playbooks in the Microsoft Defender portal.' },
        { provider: 'Google Cloud', product: 'Google Security Operations', note: 'Unified SIEM, SOAR and threat-intelligence capabilities delivered as a cloud service.' },
        { provider: 'Splunk', product: 'Splunk Enterprise Security', note: 'Security analytics and SIEM with integrated or add-on SOAR and behavior analytics.' },
        { provider: 'IBM', product: 'QRadar SIEM', note: 'Centralized security visibility, detection, investigation and compliance-oriented capabilities.' },
        { provider: 'Elastic', product: 'Elastic Security', note: 'Search and analytics platform used for SIEM, detection, investigation and endpoint-related use cases.' },
      ],
      boundary: 'Ingestion volume, retention, parsing, detection ownership and analyst workflow often matter more than the number of advertised features. Estimate data economics and operating effort before choosing a platform.',
    },
    sources: [
      { label: 'Microsoft Sentinel overview', url: 'https://learn.microsoft.com/en-us/azure/sentinel/overview' },
      { label: 'Google Security Operations', url: 'https://cloud.google.com/security/products/security-operations' },
      { label: 'Splunk Enterprise Security', url: 'https://www.splunk.com/en_us/products/enterprise-security.html' },
      { label: 'IBM QRadar SIEM', url: 'https://www.ibm.com/products/qradar-siem' },
    ],
  },
  'firewalls-wafs-proxies-and-secure-gateways': {
    promise: 'See where traffic-control technologies sit, which layer they understand and why one firewall cannot protect every boundary.',
    outcomes: ['Compare network and application-layer controls', 'Place each control in a traffic path', 'Recognize deployment and bypass limitations'],
    mentalModel: 'A traffic control observes a specific path and decides whether to allow, block, transform, inspect or record communication using the context available at that point.',
    plainLanguage: [
      'A network firewall commonly filters connections using addresses, ports, protocols, sessions, identity or application signatures. A Web Application Firewall (WAF) specializes in Hypertext Transfer Protocol traffic and can detect or block patterns aimed at web applications and Application Programming Interfaces (APIs).',
      'A forward proxy represents users or devices going outward. A reverse proxy represents a service to incoming clients. Secure web gateways inspect and control web access; cloud and service-edge products may deliver these controls from provider locations.',
    ],
    flow: ['User / client', 'Forward control', 'Network', 'Reverse control / WAF', 'Application', 'Data'],
    placement: {
      plain: 'Placement follows the traffic path: at a site edge, between network zones, on a host, in a cloud virtual network, at a global edge or directly in front of an application.',
      locations: [
        { name: 'Perimeter or branch', detail: 'Physical or virtual next-generation firewalls enforce north-south traffic policy and often virtual private network access.' },
        { name: 'Internal zones', detail: 'Segmentation firewalls restrict movement between user, server, sensitive and operational environments.' },
        { name: 'Cloud network', detail: 'Cloud-native security groups, network firewalls and gateways filter virtual networks and workloads.' },
        { name: 'Application edge', detail: 'A reverse proxy, content-delivery network or WAF protects web and API traffic before it reaches the application.' },
      ],
      capabilities: ['Connection and state filtering', 'Application or identity-aware policy', 'Network address translation and virtual private networking', 'Intrusion prevention and malware inspection', 'Web and API attack filtering', 'Rate limiting, bot controls and traffic logging'],
      examples: [
        { provider: 'Palo Alto Networks, Fortinet, Cisco and Check Point', product: 'Enterprise network-firewall portfolios', note: 'Common commercial examples for physical, virtual and cloud firewall use cases.' },
        { provider: 'Cloudflare, Akamai and Fastly', product: 'Edge WAF and application-security services', note: 'Global edge services commonly combine reverse proxying, WAF, denial-of-service protection and bot controls.' },
        { provider: 'Amazon Web Services, Microsoft Azure and Google Cloud', product: 'Cloud-native firewall and WAF services', note: 'Provider-integrated controls for virtual networks, load balancers, applications and APIs.' },
      ],
      boundary: 'Encrypted traffic, unknown applications, direct-to-origin paths, misconfiguration and allowed-but-malicious behavior can limit visibility. Use application authorization and secure design as well as traffic controls.',
    },
  },
  'email-dns-browser-and-collaboration-security': {
    promise: 'Trace the controls around the places where people click, sign in, open files, resolve names and share information.',
    outcomes: ['Map a message or web request through its control points', 'Expand important email-authentication terms', 'Compare filtering, isolation, identity and response capabilities'],
    mentalModel: 'Human-facing security is a chain: establish who sent or requested something, inspect content and destination, reduce risky behavior, protect the session and make reporting easy.',
    plainLanguage: [
      'Email security combines sender authentication, reputation, content analysis, attachment or link inspection, impersonation detection and post-delivery response. Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC) help receiving systems evaluate whether a domain authorized and authenticated a message; they do not prove that every message is safe.',
      'Domain Name System (DNS) filtering can prevent connections to known or policy-prohibited destinations. Browser security may use managed settings, extension control, safe browsing, isolation or an enterprise browser. Collaboration platforms add external-sharing, application, identity and Data Loss Prevention (DLP) controls.',
      'People still need a fast reporting path and a response team. If reporting feels risky or pointless, the organization loses one of its best sensors.',
    ],
    flow: ['Sender / user', 'Identity & domain trust', 'Gateway / DNS', 'Content & destination analysis', 'Browser / collaboration policy', 'User decision', 'Report & respond'],
    placement: {
      plain: 'Controls sit at several layers: in public DNS records, at an email or web gateway, inside the cloud productivity platform, on the endpoint or browser and in the central detection and response workflow.',
      locations: [
        { name: 'Domain & identity', detail: 'SPF, DKIM, DMARC, strong authentication and conditional access establish useful trust signals.' },
        { name: 'Message / web gateway', detail: 'Cloud or organization-managed services filter senders, links, files, sites and data movement.' },
        { name: 'Endpoint & browser', detail: 'Agents, managed browsers and isolation controls protect sessions, downloads, extensions and local behavior.' },
        { name: 'Collaboration platform', detail: 'Native controls govern sharing, guest access, third-party applications, content and audit events.' },
        { name: 'Security operations', detail: 'Analysts investigate reported messages, revoke sessions, remove content and improve policy.' },
      ],
      capabilities: ['Sender and domain authentication', 'Spam, malware and impersonation detection', 'Link rewriting or time-of-click analysis', 'Attachment sandboxing', 'DNS and web-category filtering', 'Browser isolation or enterprise-browser policy', 'Collaboration sharing and application governance', 'User reporting and post-delivery remediation'],
      examples: [
        { provider: 'Microsoft', product: 'Defender for Office 365 / Edge for Business', note: 'Email, collaboration, link, attachment, browser and incident capabilities within the Microsoft ecosystem.' },
        { provider: 'Google', product: 'Google Workspace security / Chrome Enterprise', note: 'Native Gmail, collaboration, identity and managed-browser controls.' },
        { provider: 'Proofpoint and Mimecast', product: 'Email and collaboration security portfolios', note: 'Examples of specialist secure-email-gateway, awareness, continuity and data-protection services.' },
        { provider: 'Cloudflare, Cisco and Zscaler', product: 'DNS, secure web gateway and browser security services', note: 'Examples of cloud-delivered destination filtering, web inspection and isolation approaches.' },
      ],
      boundary: 'No single filter establishes truth. Verify domain alignment, platform coverage, privacy impact, false-positive handling, direct access paths and the speed of post-delivery response.',
    },
    sources: [
      { label: 'DMARC.org overview', url: 'https://dmarc.org/overview/' },
      { label: 'Microsoft Defender for Office 365 documentation', url: 'https://learn.microsoft.com/en-us/defender-office-365/mdo-about' },
      { label: 'Google Workspace security center', url: 'https://support.google.com/a/answer/7492003' },
    ],
  },
  'exposure-management-asm-bas-and-control-validation': {
    promise: 'Move from an endless list of findings to evidence about reachable assets, plausible attack paths and controls that actually work.',
    outcomes: ['Expand ASM, BAS and CTEM', 'Separate discovery, prioritization and validation', 'Place commercial capability families without treating them as interchangeable'],
    mentalModel: 'Exposure management joins what exists, how it can be reached, what matters, whether defenses hold and who can change the result.',
    plainLanguage: [
      'Attack Surface Management (ASM) continuously discovers and monitors internet-facing or internal assets and exposures. Breach and Attack Simulation (BAS) runs controlled attack behaviors to test whether selected controls prevent or detect them. Continuous Threat Exposure Management (CTEM) is a broader program for scoping, discovering, prioritizing, validating and mobilizing treatment.',
      'A scanner finding is not automatically a business-critical exposure. Asset ownership, reachability, identity paths, exploit activity, safety, service importance and compensating controls change the priority.',
      'Validation must be authorized and safe. The goal is decision evidence, not dramatic exploitation or a dashboard score.',
    ],
    flow: ['Scope', 'Discover assets', 'Find exposures', 'Add threat & business context', 'Validate paths / controls', 'Mobilize treatment', 'Verify & monitor'],
    placement: {
      plain: 'The program consumes data from external discovery, cloud and identity platforms, vulnerability scanners, configuration tools, endpoint and network controls, business inventories and controlled validation systems.',
      locations: [
        { name: 'External viewpoint', detail: 'ASM services observe domains, addresses, certificates, cloud services and reachable applications from outside.' },
        { name: 'Internal estate', detail: 'Agents, scanners and APIs inventory endpoints, servers, applications, cloud resources, identities and configurations.' },
        { name: 'Attack-path analytics', detail: 'Graph and context layers connect reachability, privilege, vulnerabilities, misconfiguration and business importance.' },
        { name: 'Validation plane', detail: 'BAS or authorized testing safely exercises selected behaviors against controls and detections.' },
        { name: 'Remediation workflow', detail: 'Owners receive prioritized action, exceptions are governed and closure is verified.' },
      ],
      capabilities: ['External and internal asset discovery', 'Vulnerability and misconfiguration context', 'Attack-path or toxic-combination analysis', 'Threat-intelligence prioritization', 'Safe control testing and adversary emulation', 'Ownership, ticketing and exception workflow', 'Retesting and exposure trend reporting'],
      examples: [
        { provider: 'Tenable, Qualys and Rapid7', product: 'Exposure and vulnerability-management platforms', note: 'Examples spanning discovery, vulnerability context, prioritization and remediation workflow.' },
        { provider: 'Microsoft, Palo Alto Networks and CrowdStrike', product: 'Exposure-management capabilities', note: 'Examples integrated with broader endpoint, cloud, identity and security-operations ecosystems.' },
        { provider: 'Pentera, AttackIQ and SafeBreach', product: 'Automated security validation / BAS platforms', note: 'Examples focused on controlled attack execution and validation of defensive controls.' },
      ],
      boundary: 'Market labels overlap. Verify asset coverage, safety controls, validation depth, identity and cloud visibility, data handling, remediation ownership and whether the platform measures exposure or merely counts findings.',
    },
    sources: [
      { label: 'NIST vulnerability management resources', url: 'https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/vulnerability-management' },
      { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
      { label: 'Gartner Hype Cycle for Security Operations, 2026 public reprint', url: 'https://www.gartner.com/doc/reprints?id=1-2NII8O1N&ct=260610&st=sb' },
    ],
  },
  'dlp-casb-sse-and-sase-data-protection-controls': {
    promise: 'Untangle four overlapping labels by starting with the data path, user, application and enforcement point.',
    outcomes: ['Expand DLP, CASB, SSE and SASE', 'Place each in a modern hybrid architecture', 'Explain why discovery, policy and response must work together'],
    mentalModel: 'Data Loss Prevention (DLP) is a control capability; a Cloud Access Security Broker (CASB) governs cloud-service use; Security Service Edge (SSE) combines cloud-delivered security services; Secure Access Service Edge (SASE) combines that security edge with wide-area networking.',
    plainLanguage: [
      'DLP identifies sensitive information and applies policy when data is used, stored or moved through endpoints, email, collaboration, cloud services or networks. It needs classification, context, exception handling and investigation: not only pattern matching.',
      'CASB capabilities discover cloud use and apply visibility, access, threat and data controls through APIs or in-line traffic. SSE commonly includes secure web gateway, CASB, Zero Trust Network Access and related controls. SASE adds software-defined wide-area networking to that cloud-delivered security model.',
    ],
    flow: ['User / workload', 'Identity & device context', 'Security edge', 'Application / internet', 'Data policy', 'Monitor & respond'],
    placement: {
      plain: 'These capabilities can run on endpoints, inside productivity platforms, through cloud-service APIs, at a provider edge or in the network path. The same organization may use several enforcement points.',
      locations: [
        { name: 'Endpoint', detail: 'An agent can inspect copy, print, upload, removable-media and application activity.' },
        { name: 'Cloud application', detail: 'Native controls or CASB API connections inspect stored content, permissions and service activity.' },
        { name: 'Traffic path', detail: 'Proxies and security-edge points inspect permitted web and Software-as-a-Service traffic.' },
        { name: 'Network & branch', detail: 'SASE designs connect users and sites through software-defined networking and cloud-delivered security policy.' },
      ],
      capabilities: ['Sensitive-data discovery and classification', 'Policy enforcement and user coaching', 'Cloud-app discovery and governance', 'Zero Trust Network Access', 'Secure web and Software-as-a-Service traffic control', 'Incident workflow and evidence'],
      examples: [
        { provider: 'Microsoft', product: 'Microsoft Purview and Defender for Cloud Apps', note: 'Information-protection, DLP and cloud-application security capabilities across Microsoft and connected services.' },
        { provider: 'Netskope', product: 'Netskope One', note: 'Cloud-delivered SSE and SASE capabilities including CASB, web, data and private-access controls.' },
        { provider: 'Zscaler', product: 'Zero Trust Exchange', note: 'Cloud security platform for internet, private-application and data-protection use cases.' },
        { provider: 'Palo Alto Networks and Cloudflare', product: 'Prisma SASE / Cloudflare One', note: 'Examples combining cloud-delivered connectivity and security services.' },
      ],
      boundary: 'Policies can interrupt legitimate work and encourage unsafe workarounds. Begin with data purpose, classification, user journey, legal context and an exception process before broad enforcement.',
    },
  },
  'privileged-service-and-machine-identity-security': {
    promise: 'Protect the identities that can change systems, move secrets or act without a person present.',
    outcomes: ['Separate human privilege, service accounts and workload identities', 'Place PAM, vaults and cloud identity controls', 'Explain rotation, session control and just-in-time access'],
    mentalModel: 'A privileged identity is a powerful path to an outcome. Reduce standing power, protect the credential, constrain the session and preserve evidence.',
    plainLanguage: [
      'Privileged Access Management (PAM) governs powerful human and system access through vaulting, approval, just-in-time elevation, session brokering, monitoring and rapid removal. It is more than a password vault.',
      'Service and machine identities include application accounts, workload identities, certificates, keys, tokens and secrets. Because no person types their password, ownership, purpose, rotation, non-exportable credentials and workload identity federation become important.',
      'Cloud platforms also have native roles, managed identities and secrets services. A commercial PAM platform may complement rather than replace those controls.',
    ],
    flow: ['Identity & owner', 'Request / workload proof', 'Policy & approval', 'Issue short-lived access', 'Use constrained session', 'Observe & record', 'Revoke / rotate', 'Review'],
    placement: {
      plain: 'A central policy and secrets layer connects to identity providers, directories, endpoints, servers, databases, network devices, cloud control planes, delivery pipelines and critical applications.',
      locations: [
        { name: 'Human administrator', detail: 'A person authenticates strongly and requests a named role or session for a bounded purpose.' },
        { name: 'PAM broker / vault', detail: 'The platform approves, issues, rotates or injects credentials and may proxy or record sessions.' },
        { name: 'Workload identity', detail: 'An application proves its runtime identity and receives a short-lived token instead of storing a long-lived secret.' },
        { name: 'Target system', detail: 'Servers, databases, cloud, network and business systems enforce the resulting permissions.' },
        { name: 'Governance & SOC', detail: 'Owners review access while security operations monitors misuse and identity threats.' },
      ],
      capabilities: ['Credential and secret vaulting', 'Just-in-time and time-bound elevation', 'Approval and policy workflow', 'Session proxying, isolation and recording', 'Password, key and certificate rotation', 'Workload identity federation', 'Discovery of unmanaged privileged accounts', 'Review, evidence and threat detection'],
      examples: [
        { provider: 'CyberArk, BeyondTrust and Delinea', product: 'Privileged-access security platforms', note: 'Widely encountered examples spanning vaulting, elevation, session control and identity security.' },
        { provider: 'HashiCorp', product: 'Vault', note: 'Secrets management, dynamic credentials, encryption and machine-identity workflows.' },
        { provider: 'Amazon Web Services, Microsoft Azure and Google Cloud', product: 'Native identity and secrets services', note: 'Managed identities, role assumption, secret stores, key services and short-lived cloud credentials.' },
      ],
      boundary: 'Verify target coverage, emergency access, session privacy, high-availability design, recovery, application migration effort and whether “passwordless” removes or merely moves the secret.',
    },
    sources: [
      { label: 'NIST Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-4/' },
      { label: 'CyberArk privileged access management overview', url: 'https://www.cyberark.com/what-is/privileged-access-management/' },
      { label: 'HashiCorp Vault documentation', url: 'https://developer.hashicorp.com/vault/docs' },
    ],
  },
  'enterprise-technology-and-cyber-risk-management': {
    promise: 'Turn uncertainty into a clear, accountable decision rather than a colored box.',
    outcomes: ['Write a cause-event-impact statement', 'Distinguish inherent and residual risk', 'Connect treatment to evidence'],
    mentalModel: 'Risk management helps people make decisions when outcomes are uncertain. It combines context, plausible scenarios, consequence, controls, ownership and monitoring.',
    plainLanguage: [
      'Inherent risk describes exposure before considering the controls being assessed. Residual risk describes the remaining exposure after those controls and their limitations.',
      'A risk score can support comparison, but it never replaces the scenario, assumptions and decision.',
    ],
    flow: ['Context', 'Identify', 'Analyze', 'Evaluate', 'Treat', 'Accept', 'Monitor'],
    example: {
      title: 'A critical software supplier discloses a vulnerability',
      context: 'A supplier component is present in several customer services.',
      steps: ['Confirm affected population', 'Assess exploitability and service criticality', 'Apply temporary protections', 'Prioritize updates by impact', 'Verify remediation', 'Review supplier and inventory controls'],
      lesson: 'Good risk work makes both the immediate decision and the long-term control improvement visible.',
    },
  },
  'artificial-intelligence-and-machine-learning-foundations': {
    promise: 'Understand artificial intelligence without treating fluency as intelligence or novelty as value.',
    outcomes: ['Separate training and inference', 'Explain evaluation and human oversight', 'Assess a use case by value, feasibility and risk'],
    mentalModel: 'An artificial intelligence system uses learned patterns to produce a prediction, classification, recommendation or generated output within a larger human and technical process.',
    plainLanguage: [
      'Training adjusts a model using data and an objective. Inference uses the trained model on new input. Evaluation asks whether the behavior is useful, safe and appropriate for the intended context.',
      'A confident output may still be wrong. Access controls, data governance, testing, monitoring and human accountability remain part of the system.',
    ],
    flow: ['Purpose', 'Data', 'Train', 'Evaluate', 'Deploy', 'Use', 'Monitor', 'Retire'],
    example: {
      title: 'A support assistant with boundaries',
      context: 'Cedar Services proposes a generative assistant for customer questions.',
      steps: ['Define approved questions and data', 'Enforce retrieval permissions', 'Evaluate accuracy and harmful behavior', 'Escalate sensitive decisions to people', 'Log and monitor use', 'Pause or retire when risk exceeds value'],
      lesson: 'The model is one component; the governed service includes data, tools, permissions, people and fallback behavior.',
    },
    history: {
      title: 'From a research question to an operating layer',
      story: 'Artificial intelligence grew through several overlapping traditions: symbolic reasoning, statistics, machine learning, neural networks, reinforcement learning and human-computer interaction. Progress has arrived in waves because ideas, data, computing power, evaluation and practical applications have not matured at the same speed. No single person or company invented the whole field.',
      names: ['Alan Turing: machine intelligence questions', 'John McCarthy: coined “artificial intelligence”', 'Marvin Minsky: early AI research', 'Geoffrey Hinton, Yann LeCun and Yoshua Bengio: deep-learning research', 'Fei-Fei Li: large-scale visual datasets and human-centered AI', 'Judea Pearl: probabilistic reasoning and causality'],
    },
  },
  'ai-system-architecture-context-retrieval-tools-and-memory': {
    promise: 'Trace an AI application beyond the chat box: from identity and context to data, models, tools, actions and evidence.',
    outcomes: ['Draw a complete generative-AI architecture', 'Separate model behavior from application behavior', 'Place retrieval, tools, memory and guardrails correctly'],
    mentalModel: 'An AI application is a governed software system in which a model receives context, may retrieve data or call tools, produces an output or action and remains subject to identity, policy, validation and monitoring.',
    plainLanguage: [
      'The user interface sends a request to an application layer. That layer establishes identity and permissions, assembles instructions and context, may retrieve approved information, calls a model and validates the result before showing it or allowing an action.',
      'Retrieval-Augmented Generation (RAG) adds selected external information to the model’s context. A vector database may help find semantically similar material, but it does not replace authorization, source quality, freshness or citation checks.',
      'An agent adds a loop that can plan, choose tools, observe results and continue. Every tool expands the action surface, so permissions, spending limits, approval gates, isolation and complete audit trails become essential.',
    ],
    flow: ['User', 'Identity & policy', 'Application', 'Context / retrieval', 'Model', 'Tools', 'Validation', 'Output / action', 'Monitoring'],
    placement: {
      plain: 'The model may run through a hosted Application Programming Interface, a managed cloud platform, a private cloud deployment, an on-premises cluster or a local device. The application and control layers still belong to the organization using it.',
      locations: [
        { name: 'Experience layer', detail: 'Web, mobile, productivity or business applications collect the request and communicate limitations.' },
        { name: 'Orchestration layer', detail: 'Application code manages prompts, context windows, retrieval, tool selection, state, policy and fallbacks.' },
        { name: 'Model layer', detail: 'A hosted or self-managed model performs inference using the supplied context and learned parameters.' },
        { name: 'Data & tool layer', detail: 'Search indexes, databases, business APIs, code environments and workflow tools provide grounded information or actions.' },
        { name: 'Control & evidence layer', detail: 'Identity, secrets, filters, evaluations, tracing, logs, human review and incident response surround every layer.' },
      ],
      capabilities: ['Generation and transformation', 'Semantic retrieval', 'Classification and extraction', 'Tool use and workflow execution', 'Conversation or task state', 'Evaluation, tracing and policy enforcement'],
      examples: [
        { provider: 'OpenAI, Anthropic, Google and Cohere', product: 'Hosted model and developer platforms', note: 'Examples of providers offering models and APIs; capabilities, data terms and regions differ.' },
        { provider: 'Microsoft Azure, Amazon Web Services and Google Cloud', product: 'Managed AI platforms', note: 'Cloud platforms combine model access, data, evaluation, governance and deployment services.' },
        { provider: 'Meta, Mistral AI and open-source communities', product: 'Open-weight model ecosystems', note: 'Models may be self-hosted or offered by third parties; licenses and operational requirements vary.' },
        { provider: 'NVIDIA and specialized infrastructure providers', product: 'Accelerated computing and inference stack', note: 'Hardware, systems software and deployment tooling support training and inference.' },
      ],
      boundary: 'Provider examples describe the market, not endorsement. Verify model version, data-use terms, retention, region, evaluation results, price and safety behavior for the actual use case.',
    },
  },
  'ai-history-pioneers-labs-and-technology-ecosystem': {
    promise: 'Understand who shaped artificial intelligence and how research, compute, data, models and applications form today’s ecosystem.',
    outcomes: ['Recognize major eras without a hero-only history', 'Map research labs, infrastructure and application layers', 'Evaluate claims of pioneering or leadership critically'],
    mentalModel: 'AI progress is an ecosystem story: mathematical ideas, public research, benchmark datasets, specialized hardware, software frameworks, capital, product distribution and social institutions reinforce one another.',
    plainLanguage: [
      'The 1956 Dartmouth workshop helped establish artificial intelligence as a named research field, but its foundations reach into logic, statistics, neuroscience, control theory, linguistics and computing. Expert systems, statistical learning and deep learning each changed what practitioners could build.',
      'Modern foundation models depend on large-scale data, accelerated hardware, distributed training, model architecture, post-training, evaluation and application engineering. “Pioneer” may mean a foundational idea, a public dataset, a systems breakthrough, a laboratory, an open tool or a widely adopted product.',
    ],
    flow: ['Ideas', 'Research', 'Data', 'Compute', 'Models', 'Platforms', 'Applications', 'Governance'],
    history: {
      title: 'A field built by many communities',
      story: 'The field repeatedly moved between ambitious general goals and narrower systems that worked. Periods of reduced funding: often called AI winters: followed unmet expectations. New data, computing and methods later revived progress. This is why the atlas separates durable mechanisms from market hype.',
      names: ['Alan Turing', 'John McCarthy', 'Marvin Minsky', 'Allen Newell and Herbert Simon', 'Judea Pearl', 'Geoffrey Hinton, Yann LeCun and Yoshua Bengio', 'Fei-Fei Li', 'Demis Hassabis and many interdisciplinary teams'],
    },
    sources: [
      { label: 'Stanford Artificial Intelligence Index 2026', url: 'https://hai.stanford.edu/ai-index' },
      { label: 'Association for the Advancement of Artificial Intelligence', url: 'https://aaai.org/' },
      { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
  },
  'detection-engineering-telemetry-and-coverage-validation': {
    promise: 'Build detections from attacker behavior and observable evidence, then prove that the complete analyst workflow works.',
    outcomes: ['Write a detection hypothesis', 'Map behavior to a suitable telemetry source', 'Measure analytic and operational coverage'],
    mentalModel: 'Detection is an evidence pipeline: define behavior worth finding, collect the right signals, test logic, support an analyst decision, respond safely and learn from misses.',
    plainLanguage: [
      'A detection rule is not useful merely because it produces alerts. It should describe a behavior, name the data fields that make the behavior observable, explain important exclusions and give the analyst enough context to decide what to do next.',
      'Coverage has several layers. A log source may be enabled but absent on important assets. Events may arrive but omit a required field. An analytic may run but never be validated. An alert may fire but reach the wrong queue. Each boundary needs its own test.',
      'Threat intelligence helps prioritize behavior, infrastructure and campaigns, but indicators expire and context changes. Durable detection also looks for tactics and techniques expressed through local systems and identities.',
    ],
    flow: ['Threat hypothesis', 'Telemetry requirement', 'Collection', 'Detection logic', 'Validation', 'Triage', 'Response', 'Coverage feedback'],
    example: {
      title: 'Detecting suspicious remote service creation',
      context: 'A security team wants to detect lateral movement without alerting on every legitimate administration task.',
      steps: ['Describe the suspicious behavior and affected assets', 'Identify service-creation, sign-in, process and network evidence', 'Add approved administration context and service-account exclusions', 'Replay a safe authorized test', 'Confirm alert routing and analyst instructions', 'Measure coverage across in-scope servers', 'Tune with documented rationale and retest'],
      lesson: 'The analytic is one control inside a chain of telemetry, context, people, authority and response.',
    },
    deepDive: ['How would you distinguish data-source coverage, technique coverage and response coverage?', 'Which test can show a parser or field mapping changed without warning?', 'When does suppressing a known administrator create an unacceptable blind spot?'],
    practice: [
      { question: 'An analytic has a low false-positive rate but only 40 percent of critical servers send the required event. Is the detection effective?', answer: 'No. Precision among observed events does not compensate for poor sensor and asset coverage. Report the analytic quality and coverage gap separately.' },
      { question: 'Why should a detection specification name a decision, not only a query?', answer: 'The decision defines the evidence, severity, triage context, authority and safe response that make the query operationally useful.' },
      { question: 'What is the strongest evidence that a detection path works?', answer: 'A controlled end-to-end validation showing expected behavior produced the required event, reached the analytic, created the right case and supported the intended analyst and response action.' },
    ],
    sources: [
      { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
      { label: 'MITRE Cyber Analytics Repository', url: 'https://car.mitre.org/' },
      { label: 'Sigma rule specification', url: 'https://sigmahq.io/docs/' },
    ],
  },
  'internal-audit-planning-engagements-findings-and-follow-up': {
    promise: 'Understand how Internal Audit earns and communicates independent, evidence-based assurance.',
    outcomes: ['Explain the function mandate and Three Lines boundaries', 'Plan and perform a risk-based engagement', 'Write and follow up a decision-useful finding'],
    mentalModel: 'Internal Audit moves from an independent mandate to a risk-based plan, scoped evidence, a supported conclusion and verified follow-up while management retains ownership of decisions and controls.',
    plainLanguage: [
      'The governing body authorizes Internal Audit through a charter, protects access and independence, and receives important conclusions. The Chief Audit Executive manages the function, resources, quality and communication.',
      'An engagement begins with an objective, scope, criteria and work program. Auditors understand the process, select evidence, test with professional skepticism, discuss factual accuracy and reach a conclusion no broader than the work supports.',
      'A strong finding connects criteria, condition, cause and consequence. Management agrees an outcome, owner and date. Follow-up asks whether the risk was addressed, not only whether a document was uploaded.',
    ],
    flow: ['Mandate', 'Risk-based plan', 'Engagement survey', 'Scope and criteria', 'Evidence', 'Conclusion', 'Report', 'Follow-up', 'Quality'],
    example: {
      title: 'Privileged access review audit',
      context: 'Internal Audit evaluates whether production administrator access remains justified and independently reviewed.',
      steps: ['Confirm the objective, population, systems and review period', 'Walk through account creation, elevation, review and removal', 'Test completeness of the account population', 'Sample approvals and inspect reviewer competence and precision', 'Investigate exceptions and compensating controls', 'Connect the finding to plausible misuse and accountability', 'Agree management action and later retest the changed process'],
      lesson: 'A signed access list is not enough. Assurance depends on population completeness, reviewer judgment, evidence, independence and timely remediation.',
    },
    deepDive: ['How does an audit universe differ from an asset inventory?', 'When can Internal Audit advise without assuming management responsibility?', 'How should a limitation in available evidence affect the reported conclusion?'],
    practice: [
      { question: 'Management asks Internal Audit to design the control and later certify it. What is the issue?', answer: 'Designing and owning the control creates a self-review threat. Internal Audit may advise with safeguards, but management must decide, implement and own the control.' },
      { question: 'A sample has no exceptions. Does that prove the control population was effective?', answer: 'Not by itself. The conclusion also depends on population completeness, sampling method, period, control frequency, evidence quality and whether the test addressed the stated objective.' },
      { question: 'What makes a finding actionable rather than merely descriptive?', answer: 'Clear criteria, evidence-based condition, root cause, consequence, accountable outcome, owner, due date and a follow-up method tied to residual risk.' },
    ],
    sources: [
      { label: 'The IIA Global Internal Audit Standards', url: 'https://www.theiia.org/en/standards/' },
      { label: 'The IIA Three Lines Model', url: 'https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/' },
    ],
  },
  'sox-icfr-itgc-and-application-controls': {
    promise: 'Connect financial-reporting assertions to business processes, applications, technology controls, evidence and scoped assurance.',
    outcomes: ['Separate SOX, ICFR, ITGC and application controls', 'Trace a financial assertion into systems and controls', 'Explain testing, deficiencies and service-organization reliance'],
    mentalModel: 'Reliable financial reporting depends on a scoped chain from material accounts and assertions through business processes, information, application logic and supporting technology controls.',
    plainLanguage: [
      'The Sarbanes-Oxley Act (SOX) is United States legislation. Section 404 concerns management assessment of Internal Control over Financial Reporting (ICFR) and, for applicable issuers, auditor attestation under defined rules and standards.',
      'ICFR is broader than technology. Entity-level and business-process controls address how transactions are authorized, processed, recorded and reported. Automated application controls can be reliable only when relevant access, change and operations dependencies are understood.',
      'Information Technology General Controls (ITGCs) commonly cover access to programs and data, program changes, computer operations and program development. Scoping should follow financial-reporting risk and actual dependencies, not a generic list of every technology control.',
    ],
    flow: ['Material account', 'Assertion', 'Process and transaction', 'Application and report', 'Control and IT dependency', 'Test', 'Deficiency evaluation', 'Remediation and retest'],
    example: {
      title: 'Automated three-way match in accounts payable',
      context: 'A company relies on an enterprise application to stop payment when purchase order, receipt and invoice do not agree.',
      steps: ['Identify the financial assertion and misstatement risk', 'Confirm configuration and the population of relevant transactions', 'Walk through normal, exception and override behavior', 'Test the automated match and exception workflow', 'Assess access and change controls supporting continued reliance', 'Validate reports used by the reviewer', 'Evaluate exceptions and retest remediation'],
      lesson: 'The application rule, input data, override access, change process and exception review form one reliance chain.',
    },
    deepDive: ['When can a control be key for ICFR even if it is not labeled a finance control?', 'How do complementary user entity controls affect reliance on a SOC 1 report?', 'How do severity, likelihood and magnitude differ when evaluating a control deficiency?'],
    practice: [
      { question: 'A SOC 1 Type 2 report has an unmodified opinion. Can the customer assume every relevant control is covered?', answer: 'No. The customer must inspect system scope, period, control objectives, exceptions, subservice organizations and complementary user entity controls, then map them to its own ICFR risks.' },
      { question: 'An automated control was configured correctly, but developers can change production logic without approval. Why does this matter?', answer: 'Weak change control can undermine continued reliance on the automated control. The team must assess the actual dependency, exposure period, evidence and any compensating controls.' },
      { question: 'Why is a security vulnerability not automatically a SOX deficiency?', answer: 'SOX deficiency evaluation follows the vulnerability through the in-scope financial-reporting process, likelihood of misstatement, potential magnitude and related controls. The security issue may be serious for another objective without affecting ICFR.' },
    ],
    sources: [
      { label: 'Sarbanes-Oxley Act of 2002', url: 'https://www.govinfo.gov/app/details/PLAW-107publ204/summary' },
      { label: 'SEC rules on management reporting under Section 404', url: 'https://www.sec.gov/rules-regulations/2003/03/managements-report-internal-control-over-financial-reporting-certification-disclosure-exchange-act' },
      { label: 'PCAOB Auditing Standard 2201', url: 'https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201' },
    ],
  },
  'financial-services': {
    promise: 'Trace money, messages, decisions and controls beyond the customer screen.',
    outcomes: ['Map a financial-service value chain', 'Separate authorization, clearing, settlement and reconciliation', 'Recognize why integrity and resilience matter'],
    mentalModel: 'Financial services transform trust, information and capital through tightly controlled processes, records and shared infrastructures.',
    plainLanguage: [
      'A payment shown as successful may still pass through authorization, screening, message exchange, clearing, settlement and reconciliation.',
      'Different institutions and jurisdictions implement these stages differently. A message, an accounting record and the final movement of value are related but distinct.',
    ],
    flow: ['Customer', 'Channel', 'Identity', 'Authorize', 'Process', 'Clear', 'Settle', 'Reconcile'],
    example: {
      title: 'A high-value transfer with unusual behavior',
      context: 'Harbor Bank, a fictional institution, receives a transfer request from a new device.',
      steps: ['Authenticate and assess context', 'Apply transaction and fraud controls', 'Record the decision', 'Process and exchange messages', 'Settle obligations', 'Reconcile and investigate exceptions'],
      lesson: 'Financial control balances speed, customer experience, fraud prevention, accurate books and regulatory obligation.',
    },
  },
  'manufacturing-and-industrial-operations': {
    promise: 'See how digital systems interact with production, quality, equipment and human safety.',
    outcomes: ['Map an industrial value chain', 'Distinguish IT and OT', 'Reason about remote access, change and recovery safely'],
    mentalModel: 'Manufacturing combines enterprise planning with operational technology that monitors or changes physical processes.',
    plainLanguage: [
      'Operational Technology (OT) includes hardware and software that observes or controls physical activity. Failure can affect production, equipment, quality, the environment or safety.',
      'Industrial change often needs production windows, vendor validation, safety review, compensating controls and tested rollback.',
    ],
    flow: ['Plan', 'Source', 'Produce', 'Inspect', 'Store', 'Deliver', 'Maintain'],
    example: {
      title: 'Emergency vendor maintenance',
      context: 'ForgeWorks, a fictional manufacturer, needs remote vendor support for a stopped production line.',
      steps: ['Verify person, company and urgent need', 'Approve time-limited access', 'Use a controlled path and monitored session', 'Coordinate with operations and safety', 'Record changes and test production', 'Remove access and review cause'],
      lesson: 'Safety, availability and physical consequences change what a proportionate security response looks like.',
    },
  },
  'social-skills-and-professional-presence': {
    promise: 'Make other people feel heard while expressing yourself with clarity, warmth and appropriate confidence.',
    outcomes: ['Use a natural conversation rhythm', 'Read signals without overinterpreting them', 'Repair misunderstanding respectfully'],
    mentalModel: 'Good social skill is a feedback loop: notice, listen, acknowledge, add value, check understanding and adjust.',
    plainLanguage: [
      'Professional presence is not constant talking or artificial confidence. It is calm attention, clear intent, respectful boundaries and behavior that helps a group make progress.',
      'Non-verbal behavior provides clues, not certainty. Use context and questions instead of assuming what one gesture means.',
    ],
    flow: ['Notice', 'Ask', 'Listen', 'Acknowledge', 'Contribute', 'Invite', 'Follow up'],
    example: {
      title: 'Joining a conversation at an event',
      context: 'A small group is discussing an unfamiliar topic.',
      steps: ['Approach during a natural pause', 'Introduce yourself briefly', 'Ask a relevant open question', 'Listen before adding a related point', 'Avoid dominating the turn', 'Leave politely and remember one follow-up'],
      lesson: 'Curiosity and conversational balance usually create a stronger impression than trying to sound expert.',
    },
  },
  'how-the-global-institution-ecosystem-works': {
    promise: 'Know whose publication carries authority, whose advice is voluntary and whose material is commercial.',
    outcomes: ['Classify institution types', 'Check jurisdiction and version', 'Find and use the primary source'],
    mentalModel: 'Institutions sit in an ecosystem of mandate, publication, adoption, implementation, evidence and feedback.',
    plainLanguage: [
      'A regulator may enforce legal requirements. A standards body develops agreed specifications. A public agency publishes guidance. A professional or community organization shares practice. A vendor sells a product or service.',
      'Before relying on a publication, ask who issued it, where it applies, whether it is binding and which edition is current.',
    ],
    flow: ['Mandate', 'Publish', 'Adopt', 'Implement', 'Assess', 'Improve'],
    example: {
      title: 'Evaluating a well-known framework',
      context: 'A team finds a checklist from a famous organization and considers calling it mandatory.',
      steps: ['Identify organization type', 'Read scope and intended audience', 'Check version and official source', 'Determine legal or contractual adoption', 'Map it to the actual objective', 'Document limits and complementary sources'],
      lesson: 'Fame and usefulness do not automatically create legal authority.',
    },
  },
};

type LearningDepth = Pick<Guide, 'deepDive' | 'practice'>;

const networkDepth: LearningDepth = {
  deepDive: [
    'Trace encapsulation across application data, a transport segment, an Internet Protocol packet, a link-layer frame and a physical signal. At each boundary, identify which header is added and which device reads it.',
    'Diagnose by evidence rather than layer slogans: compare name resolution, route and neighbor state, packet capture, transport handshake, Transport Layer Security negotiation and application response.',
    'Model Maximum Transmission Unit, fragmentation, retransmission, congestion control and asymmetric routing as interacting causes of slow or intermittent service.',
    'Explain what encryption hides and what endpoints, flow records, certificate metadata, Domain Name System logs and application traces can still reveal.',
  ],
  practice: [
    { question: 'A client resolves the correct address and completes a Transmission Control Protocol handshake, but the browser fails before receiving Hypertext Transfer Protocol headers. Which Open Systems Interconnection layers are already evidenced, where would you investigate next and why?', answer: 'Name resolution and basic network reachability are working, and the completed transport handshake supports layer 3 and layer 4 connectivity. Investigate the Transport Layer Security handshake and application or reverse-proxy logs next. A certificate, cipher, Server Name Indication, proxy policy or application failure can occur after transport succeeds, so calling this a network outage would overstate the evidence.' },
    { question: 'A large request fails across one tunnel while small requests succeed. What mechanism is a stronger hypothesis than a generic firewall problem, and which observations would test it?', answer: 'A path Maximum Transmission Unit or fragmentation problem is plausible. Compare packet sizes, Don\'t Fragment behavior, Internet Control Message Protocol packet-too-big messages, retransmissions and a packet capture on both sides of the tunnel. A successful small request shows reachability but does not prove that the path can carry the larger packets needed by the full exchange.' },
    { question: 'A load balancer returns 502 immediately, but back-end hosts appear healthy. How would you separate a layer 7 routing error from a layer 4 connection failure?', answer: 'Check whether the load balancer selected the expected pool, host header, path rule and health state, then inspect its back-end connection attempt. A reset, timeout or failed handshake points toward transport or reachability; a completed back-end connection followed by an invalid or missing application response points toward application protocol, routing or service behavior.' },
  ],
};

const mitmDepth: LearningDepth = {
  deepDive: [
    'Separate path control from cryptographic trust. Map local address resolution, wireless association, name resolution, routing, proxy configuration, certificate validation, encrypted transport and application identity as distinct decisions.',
    'Compare passive observation, relay, redirection and active modification. State which are possible when traffic is plaintext, correctly encrypted, terminated by an approved proxy or protected by end-to-end application signatures.',
    'Trace an evil-twin or Address Resolution Protocol spoofing scenario from victim connection through name lookup, gateway selection, certificate presentation, credential entry and defender evidence.',
    'Design validation in an isolated authorized segment. Use test accounts and synthetic traffic, avoid collecting unrelated communications, and remove every rogue route, resolver, certificate and access point after the exercise.',
  ],
  practice: [
    { question: 'A user joins a rogue wireless access point, but the browser establishes a valid HTTPS connection to the correct hostname with a trusted certificate. What can the access-point operator observe, and what remains protected?', answer: 'The operator can observe connection metadata such as addresses, timing, volume and usually the requested resolver path unless it is separately protected. Correctly validated Transport Layer Security protects the HTTP content and credentials from simple interception. The operator may still block, delay or redirect traffic, and compromised endpoints, trusted enterprise proxies, deceptive hostnames or accepted certificate warnings change the conclusion.' },
    { question: 'A tester successfully poisons a local Address Resolution Protocol cache but cannot read an authenticated application session. Did the control fail?', answer: 'The local network allowed path manipulation, so Layer 2 protections or monitoring may be weak. The application session may still be protected because certificate validation and encrypted transport are independent controls. Report both facts: interception position was achieved, content compromise was not. Then test whether traffic can be downgraded, whether warnings can be induced, and whether defenders detect the gateway or Media Access Control change.' },
    { question: 'Employees receive a certificate warning only on one office network. Which evidence should be compared before blaming the website?', answer: 'Compare the presented certificate chain and fingerprint, Server Name Indication and hostname, client trust store, proxy configuration, Domain Name System answer, gateway and Address Resolution Protocol state, wireless access point identity, and a known-good connection from another path. A sanctioned inspection proxy, rogue proxy, captive portal, resolver manipulation or local clock problem can all produce different evidence.' },
  ],
};

const linuxPermissionDepth: LearningDepth = {
  deepDive: [
    'Evaluate access using the effective user, supplementary groups, parent-directory permissions, Access Control Lists and mandatory controls, not the file mode in isolation.',
    'Treat directory read, write and execute differently: listing names, creating or removing directory entries and traversing to an inode are separate abilities.',
    'Calculate creation modes from the requested mode and umask, then verify the result rather than reading a umask value as a permission.',
    'Use set-group-ID directories, the sticky bit and narrow ownership deliberately. Treat set-user-ID programs as privileged code that requires exceptional review.',
  ],
  practice: [
    { question: 'A file is mode 0640 and owned by alice:analytics; its parent directory is mode 2770 and owned by root:analytics. Bob belongs to analytics. Can Bob read, modify, delete and replace the file?', answer: 'Bob can read through the group read bit but cannot modify file contents because group write is absent. The parent directory grants the group write and execute permissions, so Bob can normally delete or rename the directory entry and create a replacement, even though he cannot write the original inode. The set-group-ID bit makes new entries inherit the analytics group; a sticky bit or Access Control List would change the deletion analysis.' },
    { question: 'A process requests mode 0666 for a new file and 0777 for a new directory under umask 0027. What modes result, and why is subtraction an unsafe mental shortcut?', answer: 'The file becomes 0640 and the directory becomes 0750 because the umask clears selected bits: requested mode AND the inverse of the mask. Bit clearing is the general rule; arithmetic subtraction can produce the right answer in simple cases but hides the bitwise behavior and becomes error-prone when requested bits are already absent.' },
    { question: 'Why can chmod 777 fail to solve an access problem and simultaneously create a security problem?', answer: 'The failure may come from a missing parent-directory execute bit, wrong ownership, an Access Control List, Security-Enhanced Linux, a read-only mount or application identity, none of which 0777 necessarily fixes. It also grants every local identity permission to modify or replace the object, damaging integrity and increasing privilege-escalation paths. Diagnose the actual denial and grant the narrow permission to the correct identity.' },
  ],
};

const linuxHardeningDepth: LearningDepth = {
  deepDive: [
    'Build hardening as a maintained baseline: minimal packages and services, verified repositories, patch policy, secure boot and time, identity, remote access, firewall, logging, backups and configuration drift.',
    'Separate package installation from activation, kernel or library update from process restart, and successful backup from successful restoration.',
    'Design Secure Shell access around keys, restricted administrative paths, sudo accountability, emergency access and recovery from a broken authentication dependency.',
    'Test changes in the service context. A secure setting that prevents monitoring, recovery or a required workload can create a different operational risk.',
  ],
  practice: [
    { question: 'A critical library is patched on disk, but a long-running service still maps the old version. Is the vulnerability remediated, and what evidence closes the change?', answer: 'Not necessarily. The running process may continue using the vulnerable code until it is restarted, and a kernel update may require a reboot. Evidence should include the installed package version, affected-process or reboot assessment, controlled restart, service health and security verification, and rollback readiness.' },
    { question: 'An administrator disables password authentication over Secure Shell but the organization depends on one central key-distribution service. What resilience control is missing?', answer: 'The design needs a tested break-glass path that does not silently recreate permanent shared privilege. Use protected emergency credentials or keys, console access, strong approval and alerting, short validity, post-use rotation and regular exercises. Centralization improves control but also concentrates failure.' },
    { question: 'A benchmark recommends disabling a service that an application health check uses locally. How should the team decide?', answer: 'Confirm the control objective and actual exposure, then test the dependency and alternatives. Restricting the service to a local socket, a narrower interface or authenticated access may satisfy the objective without breaking monitoring. Record the deviation or tailored setting, owner, rationale, verification and review trigger instead of applying the benchmark mechanically.' },
  ],
};

const controlDepth: LearningDepth = {
  deepDive: [
    'Classify a control separately by function, nature, timing, frequency, automation, ownership and the risk scenario it changes. One control can occupy several labels.',
    'Distinguish a control objective, design, implementation, operation and operating effectiveness. A policy or screenshot alone does not prove all five.',
    'Evaluate deterrent and directive controls through changed behavior and compliance, not merely publication. Evaluate recovery through exercised restoration, not backup existence.',
    'Require compensating controls to address the same objective with comparable assurance, an owner, evidence, limitations and an expiry or reassessment point.',
  ],
  practice: [
    { question: 'A policy requires multi-factor authentication, an identity platform enforces it and a security team alerts on bypass attempts. Identify the control functions and explain why this is not one control.', answer: 'The policy is directive, the enforced challenge is primarily preventive and the bypass alert is detective. They have different operators, failure modes and evidence. Treating them as one control can hide a failure in enforcement behind evidence that the policy merely exists.' },
    { question: 'A legacy finance system cannot segregate invoice creation and approval for a small office. What would make a daily independent reconciliation a credible compensating control?', answer: 'It must address the same unauthorized or erroneous payment objective with sufficient precision and timeliness. An independent reviewer needs a complete population, reliable source data, defined exception criteria, retained evidence, escalation and periodic assessment of whether the legacy limitation still justifies compensation. Management should document remaining exposure rather than calling it equivalent by default.' },
    { question: 'A recovery plan is reviewed annually and every backup job reports success. Which conclusion is still unsupported?', answer: 'There is no evidence that the important service can be restored within required time and data-loss limits or that restored data is usable and trustworthy. Recovery effectiveness requires exercised restoration, dependency and access validation, measured Recovery Time Objective and Recovery Point Objective performance, exception handling and lessons captured.' },
  ],
};

const riskDepth: LearningDepth = {
  deepDive: [
    'Separate inherent, current residual and target risk. State exactly which control set and time horizon each assessment assumes.',
    'Write cause-event-consequence scenarios tied to objectives, affected groups and decision thresholds instead of using a risk category as the risk statement.',
    'Compare avoidance, reduction, transfer, acceptance and pursuit through cost, timing, feasibility, secondary effects and accountability.',
    'Examine aggregation, concentration, common-cause failure, velocity and uncertainty. Individually tolerable exposures can become unacceptable together.',
  ],
  practice: [
    { question: 'A cloud outage scenario is rated after considering multi-region failover that has been designed but never exercised. Is this inherent or residual risk, and what qualification is required?', answer: 'It is intended as a residual assessment because a control is being considered, but the control\'s operating effectiveness is unproven. The assessment should explicitly distinguish designed residual exposure from evidenced current residual exposure, increase uncertainty or conservatism, and assign a test before relying on the lower rating.' },
    { question: 'Insurance covers some incident-response cost. Which parts of risk are transferred, and which remain?', answer: 'Only covered financial consequences within limits, conditions and exclusions are transferred to the insurer. Service disruption, customer harm, regulatory duty, management time, reputation, uninsured loss and the obligation to maintain controls remain with the organization. Transfer changes consequence financing, not the underlying event probability.' },
    { question: 'Three suppliers are individually within concentration limits but all depend on the same identity provider and cloud region. What risk is missing from the vendor-by-vendor view?', answer: 'The portfolio has common-cause and fourth-party concentration risk. One shared dependency can disable several nominally diverse suppliers at once. Map underlying service dependencies, assess aggregate consequence, set joint thresholds and test alternatives or continuity paths at the portfolio level.' },
  ],
};

const identityDepth: LearningDepth = {
  deepDive: [
    'Separate identity proofing, identification, authentication, federation, authorization, session management and governance. A successful sign-in proves neither entitlement nor current business need.',
    'Trace joiner, mover and leaver events from authoritative source through approval, provisioning, application enforcement, review and removal, including failure queues and manual exceptions.',
    'Model birthright, requested, privileged, emergency, service and machine access with different owners, expiry, credential and evidence requirements.',
    'Test toxic combinations and role design against real transaction capability, including access obtained through nested groups, local accounts, cloud roles and application-specific grants.',
  ],
  practice: [
    { question: 'A user is removed from the corporate directory, but an application session remains valid for eight hours. Which identity lifecycle stages succeeded, which control failed and what would reduce the gap?', answer: 'The authoritative termination and directory deprovisioning may have succeeded, while session revocation at the application boundary failed or was never integrated. Reduce the gap with short-lived tokens, revocation or continuous access evaluation, application logout integration, high-risk session termination and evidence that downstream sessions and local accounts were removed.' },
    { question: 'An access review shows a user has no direct privileged role, but two nested groups combine to permit vendor creation and payment approval. What should the reviewer conclude?', answer: 'The effective authorization creates a toxic combination even though no single direct grant appears privileged. Reviews must resolve group nesting and application permissions into effective business actions, evaluate Segregation of Duties rules, remove or redesign access, and test that the application enforces the intended restriction.' },
    { question: 'A workload uses a long-lived shared client secret stored in a deployment pipeline. How should its identity design change?', answer: 'Give the workload a unique, owned machine identity and prefer platform attestation or workload identity federation for short-lived credentials. Scope authorization narrowly, protect and audit token issuance, rotate any remaining secret, remove copies from logs and pipeline variables, and define revocation and emergency replacement.' },
  ],
};

const detectionDepth: LearningDepth = {
  deepDive: [
    'Trace a detection from threat hypothesis to required behavior, telemetry source, collection path, schema, analytic, alert grouping, triage evidence, response and post-incident tuning.',
    'Measure coverage in several dimensions: relevant techniques, assets, identities, data-source health, analytic quality, investigation readiness and response authority.',
    'Distinguish an event, detection signal, alert, case and confirmed incident. Each transition requires evidence and judgment.',
    'Use threat intelligence to change a decision: collection, prioritization, hypothesis or response. An indicator feed without context and expiry can increase noise.',
  ],
  practice: [
    { question: 'An endpoint rule detects encoded PowerShell, but half of the server estate sends only authentication logs. Can the team claim enterprise detection coverage?', answer: 'No. The analytic may work on covered endpoints, but asset and telemetry coverage is incomplete. Report technique coverage separately from sensor deployment and data health, identify the unobserved population and compensating evidence, and test the rule across representative endpoint versions and administrative activity.' },
    { question: 'A correlation rule suddenly produces no alerts after a log-source upgrade. No attacks are known. What should the team test before calling the environment quiet?', answer: 'Test telemetry freshness, volume, parsing, field names, timestamps, normalization, identity and host enrichment, rule execution and known-positive replay. A silent analytic can indicate broken collection or schema drift. Detection health needs canaries or expected events, not confidence based on alert absence.' },
    { question: 'A threat-intelligence feed labels an address malicious, but it is a widely shared cloud address used by a business supplier. What is the proportionate response?', answer: 'Do not block solely on the label. Check source confidence, observation age, indicator context, local connections, domain or certificate evidence, supplier activity and endpoint behavior. Use the indicator to enrich or prioritize investigation, then apply a time-bound block only if local risk and collateral impact justify it.' },
  ],
};

const aiFoundationDepth: LearningDepth = {
  deepDive: [
    'Separate a statistical model\'s training objective from the product outcome. Offline accuracy can coexist with poor calibration, unfair impact, unsafe workflow or no business value.',
    'Design evaluation around representative slices, error cost, baseline comparison, drift, uncertainty and human escalation, not one aggregate benchmark.',
    'Trace training data, features, model version, inference input, output, downstream action and appeal path as one accountable decision system.',
    'Ask when a deterministic rule, search, workflow or conventional statistical method is simpler, cheaper and easier to assure than machine learning.',
  ],
  practice: [
    { question: 'A fraud model improves overall accuracy but doubles false declines for a small customer segment. Can the team claim improvement?', answer: 'Not without evaluating the objective and error distribution. Overall accuracy can hide a harmful slice. Compare false-positive and false-negative costs by representative segment, calibration, operational review capacity and customer remedy, then decide whether thresholds, data, model or the use case must change.' },
    { question: 'A model\'s validation score remains stable while live decisions deteriorate. Name two mechanisms that explain the gap and the evidence needed.', answer: 'Input or concept drift may make the validation sample unrepresentative, and application changes may alter preprocessing, thresholds or downstream use. Compare live feature distributions, labels when available, calibration, pipeline versions, decision thresholds, override rates and outcome metrics. Monitoring the model artifact alone is insufficient.' },
    { question: 'When should a human approval step not be described as an effective AI control?', answer: 'When reviewers lack time, context, authority, training or a practical way to disagree, the step may be automation bias disguised as oversight. Test decision quality, reversal rates, workload, escalation, interface design and accountability, and move control earlier or constrain automation if meaningful review cannot occur.' },
  ],
};

const ragDepth: LearningDepth = {
  deepDive: [
    'Trace retrieval from document authorization and ingestion through chunking, embedding, indexing, query transformation, ranking, context assembly, generation, citation and freshness controls.',
    'Separate grounding from correctness. Retrieved text can be irrelevant, stale, poisoned, contradictory or outside the user\'s authorization.',
    'Evaluate retrieval and generation independently with recall, ranking quality, answer faithfulness, citation support, abstention, latency and cost.',
    'Treat system instructions as application context, not an authorization boundary. Enforce data and tool permissions outside the model.',
  ],
  practice: [
    { question: 'A Retrieval-Augmented Generation assistant cites an approved document but gives a claim the document does not support. Which subsystem failed and how would you test it?', answer: 'Retrieval may have found a relevant source while generation failed faithfulness, or chunking removed the qualifying context. Inspect the retrieved passages, rank, assembled prompt and exact cited span. Evaluate retrieval relevance separately from entailment or citation support, and require abstention when evidence is insufficient.' },
    { question: 'Two employees ask the same question, but only one is permitted to see the underlying document. Where must authorization be enforced?', answer: 'Authorization must constrain retrieval before protected chunks enter model context, using the authenticated user and current source permissions. It should also apply at source ingestion, cache, conversation history, citations and any tool call. Asking the model not to reveal unauthorized text is not an access control.' },
    { question: 'A policy update is in the source repository but answers remain stale for a day. Map the likely freshness failure points.', answer: 'Check source change detection, ingestion queue, parsing, chunk replacement, embedding generation, index commit, cache invalidation and retrieval ranking. Record document and index versions in traces so an answer can be tied to the exact knowledge snapshot. Fresh source content does not prove fresh retrieval.' },
  ],
};

const agentDepth: LearningDepth = {
  deepDive: [
    'Model an agent loop as observe, plan, choose tool, authorize, execute, validate and continue or stop. Put policy and evidence at every action boundary.',
    'Give each tool the least authority, data scope, network reach, spending limit and execution time needed for one task. Separate read from write and reversible from irreversible action.',
    'Treat memory as governed state with provenance, sensitivity, retention, correction and deletion, not an unlimited transcript.',
    'Define stop conditions, approval gates, idempotency, rollback and incident containment before increasing autonomy.',
  ],
  practice: [
    { question: 'An agent can draft and send supplier payments through one tool. Why is a human confirmation prompt inside the conversation insufficient?', answer: 'The model can misinterpret, be prompt-injected or present an incomplete summary, while the tool still holds excessive end-to-end authority. Separate preparation from approval and execution, enforce payment limits and beneficiary controls outside the model, use a trusted confirmation surface, require strong identity, preserve idempotency and log the exact approved transaction.' },
    { question: 'A tool call times out, so the agent retries and creates a duplicate order. Which engineering controls were missing?', answer: 'The action lacked idempotency or a stable request key, reliable status reconciliation and a retry policy aware of side effects. The agent should query outcome state before retrying, use idempotent APIs or transactional design, cap retries, surface uncertainty and route unresolved cases to a person.' },
    { question: 'An agent stores a user correction in long-term memory, then applies it to another user. What boundaries failed?', answer: 'Identity and tenant scoping, provenance, purpose limitation and memory retrieval policy failed. Memory should be tied to the correct subject and context, classified, time-bound, inspectable and correctable, with shared knowledge separated from personal state. Retrieval must enforce the same authorization as the source.' },
  ],
};

const learningDepthBySlug: Record<string, LearningDepth> = {
  'network-foundations-and-protocol-models': networkDepth,
  'man-in-the-middle-spoofing-and-transport-trust': mitmDepth,
  'linux-users-groups-and-file-permissions': linuxPermissionDepth,
  'linux-administration-patching-and-hardening': linuxHardeningDepth,
  'core-security-control-families': controlDepth,
  'control-design-operation-testing-and-evidence': controlDepth,
  'enterprise-technology-and-cyber-risk-management': riskDepth,
  'risk-foundations-taxonomies-appetite-and-tolerance': riskDepth,
  'digital-identity-directories-and-the-identity-lifecycle': identityDepth,
  'authorization-and-access-control-models': identityDepth,
  'identity-governance-and-administration': identityDepth,
  'security-operations-detection-and-threat-intelligence': detectionDepth,
  'artificial-intelligence-and-machine-learning-foundations': aiFoundationDepth,
  'generative-ai-large-language-models-retrieval-and-agents': ragDepth,
  'ai-system-architecture-context-retrieval-tools-and-memory': ragDepth,
  'ai-agents-orchestration-and-human-oversight': agentDepth,
};

const applicationByCategory: Record<Topic['category'], { organization: string; situation: string; steps: string[]; lesson: string }> = {
  orientation: { organization: 'Northstar Cooperative', situation: 'A leadership team is funding a new member service before the operating dependencies are understood.', steps: ['State the member outcome and the decision to be made', 'Map the people, process, information and system boundaries', 'Identify the most important dependency and failure scenario', 'Assign an owner and an observable measure', 'Test the map with the operators who do the work', 'Update the decision when evidence changes'], lesson: 'A map earns its place when it exposes a missing dependency, owner or decision.' },
  business: { organization: 'Harbor Kitchens', situation: 'Customer complaints are rising even though every team reports that its own target is green.', steps: ['Define the customer outcome behind the metric', 'Walk one real request across every handoff', 'Measure waiting, rework, exceptions and failure demand', 'Separate local efficiency from end-to-end performance', 'Change one bottleneck and set a review window', 'Compare customer outcome and full cost after the change'], lesson: 'Optimizing one team can make the whole service worse. End-to-end evidence keeps the operating model honest.' },
  systems: { organization: 'Cedar Commerce', situation: 'Checkout becomes intermittent after a routine infrastructure change, while individual servers still look healthy.', steps: ['Reproduce the user-visible symptom and record its scope', 'Trace name resolution, route, connection, service and data dependencies', 'Compare logs, metrics, traces and configuration changes by time', 'Form one falsifiable hypothesis at a boundary', 'Run the smallest safe test and observe the result', 'Restore service, document cause and add a signal for recurrence'], lesson: 'Component health is not service health. Good diagnosis connects the user symptom to a boundary and a test.' },
  software: { organization: 'ParcelWorks', situation: 'A small address-validation change increases failed deliveries after release.', steps: ['Reconstruct the intended requirement and acceptance criteria', 'Compare the changed code, dependency and configuration', 'Inspect test coverage for real address variants', 'Use production telemetry to locate the failure path', 'Roll back or constrain the change safely', 'Add a representative test and monitor the corrected outcome'], lesson: 'A change is not successful because deployment completed. The user outcome and recovery behavior decide.' },
  cloud: { organization: 'Juniper Health', situation: 'A managed cloud service is available, but the application cannot recover after a regional interruption.', steps: ['Write the service objective, recovery time and recovery point', 'Mark provider and customer responsibility for every layer', 'Map regional dependencies, identities, data and configuration', 'Restore into an isolated environment from known backups', 'Measure the real recovery path and missing automation', 'Update architecture, runbook, ownership and exercise schedule'], lesson: 'A provider availability promise is not the same as customer service recovery.' },
  cyber: { organization: 'Meridian Payroll', situation: 'Several employees receive convincing sign-in messages and one account begins unusual activity.', steps: ['Preserve the messages, identity events and endpoint evidence', 'Describe the likely attack path and affected business actions', 'Contain sessions and credentials without destroying evidence', 'Search for related activity across identity, endpoint, email and network data', 'Recover accounts and validate important transactions', 'Improve prevention, detection, reporting and response using the observed gap'], lesson: 'Security becomes useful when controls interrupt a plausible harm path and leave evidence for action.' },
  governance: { organization: 'Westbridge Group', situation: 'A policy says privileged access is reviewed quarterly, but no one can show the reviewed population or resolved exceptions.', steps: ['Identify the objective, obligation and accountable owner', 'Define the complete population and review criteria', 'Collect evidence from authoritative systems', 'Separate performance, review and independent challenge', 'Track exceptions to an owner and due date', 'Report coverage, overdue items and residual exposure to the right forum'], lesson: 'A written control is intent. Population, execution, evidence and follow-up make it governable.' },
  risk: { organization: 'Atlas Logistics', situation: 'Three critical suppliers appear acceptable individually but share the same cloud region and identity provider.', steps: ['Name the business objective and intolerable consequence', 'Write cause, event and consequence as a scenario', 'Map shared dependencies and aggregate exposure', 'Separate inherent, current residual and target risk', 'Compare reduction, transfer, avoidance and acceptance', 'Record the decision, owner, trigger and review date'], lesson: 'Portfolio risk can hide behind reassuring supplier-by-supplier scores.' },
  data: { organization: 'Maple Retail', situation: 'Two executive dashboards report different values for active customers.', steps: ['Agree the decision and business definition of active customer', 'Locate source systems and owners', 'Trace filters, joins, transformations and timing', 'Profile completeness, duplication and edge cases', 'Reconcile the measures and document lineage', 'Publish the approved definition with quality and freshness signals'], lesson: 'A dashboard disagreement is often a meaning and lineage problem before it is a visualization problem.' },
  ai: { organization: 'Willow Support', situation: 'A support assistant answers fluently but sometimes invents policy details and exposes material outside the user’s role.', steps: ['Define the task, prohibited outcomes and escalation path', 'Separate retrieval quality from answer quality', 'Enforce source authorization before context reaches the model', 'Evaluate faithfulness, abstention and important user groups', 'Log model, prompt, sources, tools and human overrides', 'Constrain deployment until measured failures are acceptable'], lesson: 'Grounding improves context, but authorization, truthfulness and safe action require system controls outside the model.' },
  emerging: { organization: 'ForgeWorks', situation: 'A vendor proposes an unproven technology for a safety-relevant production process.', steps: ['State the problem without naming the proposed technology', 'Separate research evidence, prototype results and production claims', 'Assess standards, suppliers, integration, security and maintainability', 'Run a bounded trial with success and stop criteria', 'Test failure, recovery and operator understanding', 'Adopt, redesign or stop based on evidence and exit cost'], lesson: 'A reversible experiment should buy knowledge before the organization buys dependency.' },
  industries: { organization: 'Riverline Services', situation: 'A common technology design must be adapted to an industry where outage, integrity and safety consequences differ.', steps: ['Map the value chain and important customer or public outcome', 'Identify crown jewels and systems of record', 'Describe dominant failure and abuse scenarios', 'Apply legal, safety and operating constraints', 'Choose controls and recovery targets that fit the consequence', 'Test the design with domain operators and affected users'], lesson: 'Industry context changes what proportionate reliability, control and evidence look like.' },
  people: { organization: 'Oakfield Delivery', situation: 'A technically correct proposal keeps stalling because teams understand the problem differently.', steps: ['Ask each group what decision it believes is being made', 'Listen for incentives, constraints and missing definitions', 'Explain the proposal in the audience’s language', 'Make trade-offs and uncertainties explicit', 'Record the decision, owner and next action', 'Follow up and invite correction before assumptions harden'], lesson: 'Communication succeeds when people can make the intended decision and act on it.' },
  ecosystem: { organization: 'Beacon Assurance', situation: 'A team treats a popular framework, a certification and a legal obligation as if they carried the same authority.', steps: ['Identify the issuing body and its mandate', 'Check jurisdiction, scope, audience and current version', 'Separate law, regulation, standard, guidance and commercial certification', 'Find how the requirement entered the organization', 'Use the primary source to map the exact obligation', 'Record limitations, adoption choices and review dates'], lesson: 'The name on a publication matters less than its mandate, scope and adoption route.' },
};

function defaultExample(topic: Topic): Guide['example'] {
  const scenario = applicationByCategory[topic.category];
  const title = topic.title.toLowerCase();
  const subjectSituation =
    /network|routing|addressing|dns|transport|spoof|middle/.test(title) ? 'Users can reach some services but not others after a network change, and an unexpected certificate warning suggests that routing, name resolution or trust may also have changed.' :
    /linux|operating system|process|service|hardening|patch/.test(title) ? 'A production host needs a security update, but the service owner cannot explain its active processes, configuration dependencies, permission model or tested rollback.' :
    /identity|authentication|authorization|federation|privileged|access/.test(title) ? 'A worker changes role while old privileges, active sessions and a service account remain connected to sensitive systems.' :
    /cryptograph|certificate|key management/.test(title) ? 'A certificate is nearing expiry while the team lacks a complete inventory of keys, owners, dependent services and safe rotation procedures.' :
    /incident|forensic|recovery/.test(title) ? 'Suspicious identity and endpoint activity appears during a critical business period, forcing the team to balance containment, evidence preservation and service continuity.' :
    /detection|siem|soar|edr|ndr|xdr|telemetry|threat intelligence/.test(title) ? 'The monitoring platform produces thousands of alerts, but analysts cannot show which important behaviors are covered, which data is missing or which response decision each alert supports.' :
    /firewall|proxy|gateway|email|browser|dlp|casb|sase|exposure/.test(title) ? 'A control is widely deployed and reported as healthy, yet a realistic abuse path crosses an unmonitored identity, application or data boundary.' :
    /vulnerab|testing|reconnaissance|exploitation|post-exploitation/.test(title) ? 'An authorized assessment finds a high-severity weakness, but reachability, business context, safe proof, remediation ownership and retest evidence are incomplete.' :
    /software|source|build|dependenc|delivery|release|deployment|quality/.test(title) ? 'A small application change passes the normal pipeline but fails for a real user path that crosses an undocumented dependency and cannot be rolled back cleanly.' :
    /cloud|container|kubernetes|serverless|infrastructure as code|platform engineering/.test(title) ? 'A repeatable cloud deployment creates a public exposure and a regional dependency because the template encoded a weak default that no team explicitly owned.' :
    /data|database|analytics|pipeline|warehouse|metadata|privacy/.test(title) ? 'Two teams use the same business term but produce different results because source timing, transformation rules, permitted use and ownership are not aligned.' :
    /artificial intelligence|machine learning|neural|language model|agent|mlops|llmops|ai /.test(title) ? 'A model performs well in a demonstration but fails on real inputs, retrieves information outside the user’s authority and has no reliable escalation or rollback path.' :
    /blockchain|quantum|robot|drone|digital twin|edge|5g|spatial|emerging/.test(title) ? 'A vendor demonstration is compelling, but the organization has not separated scientific feasibility from production reliability, integration, safety, security and exit cost.' :
    /audit|assurance|control|sox|compliance|governance|policy/.test(title) ? 'A management report says the requirement is met, but the population, operating period, exceptions, reviewer competence and retained evidence cannot support that conclusion.' :
    /risk|resilien|continuity|crisis|third-party|supply-chain|insurance/.test(title) ? 'Several exposures look acceptable in isolation, but a shared supplier, identity service and recovery dependency could affect the same important service at once.' :
    /communication|leadership|negotiation|interview|networking|listening|presentation/.test(title) ? 'A sound recommendation is stalled because stakeholders disagree about the decision, consequence, evidence and who must act next.' :
    scenario.situation;
  return {
    title: `${topic.title}: a decision at ${scenario.organization}`,
    context: `${scenario.organization}, a fictional organization, faces this situation: ${subjectSituation}`,
    steps: [`State what ${topic.title.toLowerCase()} must help the team decide or protect`, ...scenario.steps.slice(1, 5), 'Retain the evidence, owner, limitation and next review trigger'],
    lesson: `For ${topic.title.toLowerCase()}, ${scenario.lesson.charAt(0).toLowerCase()}${scenario.lesson.slice(1)}`,
  };
}

function defaultDepth(topic: Topic): string[] {
  return [
    `Draw the working boundary for ${topic.title.toLowerCase()}. Include owners, users, inputs, outputs, dependencies, trust changes and the evidence produced at each important step.`,
    `Choose one realistic ${topic.title.toLowerCase()} failure or misuse scenario. Explain the first user-visible symptom, the most useful diagnostic signal, the immediate response and the longer-term design change.`,
    `Compare a minimal ${topic.title.toLowerCase()} implementation with a mature one. State which additional cost buys reliability, safety, speed, assurance or reversibility, and which complexity adds little value.`,
  ];
}

function defaultPractice(topic: Topic): Guide['practice'] {
  const shortTitle = topic.title.toLowerCase();
  return [
    { question: `A team says it has implemented ${shortTitle}, but it cannot name an owner, decision, measure or retained evidence. What is missing?`, answer: `For ${shortTitle}, the team has described an activity or artifact, not an operating capability. Define its intended outcome, accountable owner, scope, decision rights, complete population, execution frequency, exceptions, evidence and measure. Then test one real instance from beginning to end instead of accepting the label as proof.` },
    { question: `A control or process for ${shortTitle} works in a demonstration but fails during a real exception. How should the team investigate?`, answer: `Reconstruct the actual ${shortTitle} path with timestamps and source evidence. Compare the designed path with the path taken, including identity, configuration, dependencies, queues, manual handoffs and fallback behavior. Identify the first meaningful divergence, correct the immediate issue, and add a test or signal for that exception.` },
    { question: `What would make a proposed improvement to ${shortTitle} proportionate rather than merely more complex?`, answer: `Tie the ${shortTitle} improvement to a specific outcome or plausible harm. Estimate coverage, failure reduction, operating effort, delay, user impact, new dependencies and recovery. Prefer the smallest change that produces observable benefit, set a review date, and remove it if evidence does not justify the continuing cost.` },
  ];
}

export function getGuide(topic: Topic): Guide {
  const lens = categoryLens[topic.category];
  const override = detailed[topic.slug] ?? {};
  const learningDepth = learningDepthBySlug[topic.slug];
  const base = {
    curated: Boolean(detailed[topic.slug]),
    promise: override.promise ?? topic.summary,
    outcomes: override.outcomes ?? [
      `Explain what ${topic.title.toLowerCase()} is, why it exists and where it sits`,
      `Recognize its important parts, boundaries and common points of failure`,
      `Apply it to a realistic decision and identify the evidence that would support a conclusion`,
    ],
    mentalModel: override.mentalModel ?? `${topic.title} applies a broader operating principle: ${lens.mental}`,
    plainLanguage: override.plainLanguage ?? [
      topic.summary,
    ],
    flow: override.flow ?? lens.flow,
    keyIdeas: override.keyIdeas ?? lens.ideas,
    example: override.example ?? defaultExample(topic),
    pitfalls: override.pitfalls ?? lens.pitfalls.map((pitfall) => `${pitfall} when working with ${topic.title.toLowerCase()}`),
    deepDive: override.deepDive ?? learningDepth?.deepDive.map((item) => `Apply this to ${topic.title.toLowerCase()}: ${item.charAt(0).toLowerCase()}${item.slice(1)}`) ?? defaultDepth(topic),
    practice: override.practice ?? learningDepth?.practice.map((item) => ({
      question: `In the context of ${topic.title.toLowerCase()}, ${item.question.charAt(0).toLowerCase()}${item.question.slice(1)}`,
      answer: `For ${topic.title.toLowerCase()}, ${item.answer.charAt(0).toLowerCase()}${item.answer.slice(1)}`,
    })) ?? defaultPractice(topic),
    sources: override.sources ?? sourceSets[topic.category],
    placement: override.placement,
    history: override.history,
  };
  return { ...base, ...buildGuideEnrichment(topic, base) };
}

export function estimateGuideReadTime(guide: Guide) {
  const visible = [
    guide.promise,
    ...guide.outcomes,
    guide.mentalModel,
    ...guide.plainLanguage,
    ...guide.keyIdeas.flatMap((idea) => [idea.title, idea.text]),
    ...guide.deepSections.flatMap((section) => [section.title, ...section.paragraphs]),
    ...guide.terms.flatMap((term) => [term.term, term.expansion ?? '', term.meaning, term.where ?? '', term.example]),
    ...guide.deepDive,
    ...guide.practice.flatMap((item) => [item.question, item.answer]),
    ...guide.relevantTools.flatMap((tool) => [tool.name, tool.expansion ?? '', tool.placement, tool.purpose, ...tool.capabilities, tool.boundary]),
    ...(guide.placement ? [guide.placement.plain, ...guide.placement.locations.flatMap((item) => [item.name, item.detail]), ...guide.placement.capabilities, ...guide.placement.examples.flatMap((item) => [item.provider, item.product, item.note]), guide.placement.boundary] : []),
    ...(guide.history ? [guide.history.title, guide.history.story, ...guide.history.names] : []),
    ...guide.sources.map((source) => source.label),
  ];
  const appliedMaterial = [
    guide.comparison.title,
    guide.comparison.intro,
    ...guide.comparison.rows.flatMap((row) => [row.concept, row.useItFor, row.doNotConfuseItWith]),
    ...guide.evidenceChecklist,
    ...guide.decisionLenses.flatMap((lens) => [lens.title, lens.detail]),
    ...guide.practitionerChecklist,
    guide.example.title,
    guide.example.context,
    ...guide.example.steps,
    guide.example.lesson,
    ...guide.pitfalls,
  ];
  const words = [...visible, ...appliedMaterial].join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(6, Math.ceil(words / 210));
}
