export const assurancePillarsContent = {
  cyber: {
    slug: "cybersecurity-identity-vapt",
    title: "Cybersecurity, Identity & VAPT",
    purpose:
      "Protect valuable services, information, people, and physical operations from misuse, disruption, manipulation, and loss. This pillar connects security principles to identity, architecture, engineering, operations, vulnerability management, authorized testing, incident response, and recovery. It treats cybersecurity as a business capability supported by technology, human judgment, governance, and evidence.",
    sections: [
      {
        order: 1,
        id: "security-purpose-and-boundaries",
        title: "Security purpose, properties, and boundaries",
        body:
          "Cybersecurity exists to protect objectives, not simply devices. Start with the service or outcome that matters, then identify the people, information, applications, infrastructure, suppliers, and physical processes that make it possible. Confidentiality limits inappropriate disclosure. Integrity protects correctness and completeness. Availability keeps services and information usable when needed. Authenticity supports confidence that an entity or message is genuine, while accountability makes important actions traceable. Privacy, safety, and resilience may be equally important depending on the domain. A hospital may prioritize patient safety and continuity; a payment platform may emphasize integrity, availability, and fraud resistance. The security boundary includes support processes, administrator tools, recovery channels, third parties, and human decisions, not only production systems. Useful security therefore begins with a service map, data flows, ownership, and trust boundaries. Product lists come later, after the organization understands what must be protected, from whom, under which conditions, and with what acceptable level of disruption or loss.",
      },
      {
        order: 2,
        id: "threat-scenarios-and-exposure",
        title: "Threat scenarios, vulnerabilities, exposure, and risk",
        body:
          "A threat is a potential cause of harm, such as a criminal group, malicious insider, accident, or natural event. A vulnerability is a weakness that could be used or triggered. Exposure describes how reachable or susceptible an asset is. Risk is the effect of uncertainty on an objective, expressed through a plausible scenario and its consequences. A useful scenario connects an actor or cause, a target, a path, a weakness, an event, and a business impact. For example, stolen support credentials could permit unauthorized account recovery, leading to fraudulent transactions and regulatory notification. Threat intelligence adds context about observed actors, techniques, infrastructure, and campaigns, but it does not predict the future. Frameworks such as MITRE ATT&CK help teams describe adversary behavior and examine defensive coverage. Prioritization should combine service importance, exploitability, exposure, threat activity, existing controls, and potential impact. A high technical severity does not always create the highest business risk, and a modest weakness can become critical when it sits on a trusted path to a vital service.",
      },
      {
        order: 3,
        id: "security-architecture-and-controls",
        title: "Security architecture and layered controls",
        body:
          "Security architecture translates objectives and threat scenarios into boundaries, patterns, and control responsibilities. Defense in depth places independent safeguards along an attack path so that one failure does not determine the outcome. Least privilege limits access to what a task requires. Separation of duties prevents one identity from completing a sensitive process alone. Secure defaults, segmentation, isolation, encryption, approved paths, and recoverable designs reduce both likelihood and impact. Zero Trust is an architectural approach that continuously evaluates identity, device, resource, and context; it is not a single product and does not make networks irrelevant. Controls can be preventive, detective, corrective, or recovery focused, and they may be administrative, technical, or physical. Good design states the control objective, owner, enforcement point, failure mode, and expected evidence. It also accounts for usability because people bypass controls that make legitimate work unreasonably difficult. Architecture should assume credentials can be stolen, components can fail, and suppliers can be compromised, then preserve critical outcomes through containment, detection, and recovery.",
      },
      {
        order: 4,
        id: "identity-access-and-trust",
        title: "Identity, access, privilege, and trust",
        body:
          "Digital identity connects a person, service, device, or workload to accounts, attributes, authenticators, and permissions. Identity proofing establishes who or what an entity is. Authentication tests a claim, while authorization decides what the authenticated entity may do in the current context. The joiner, mover, and leaver lifecycle should create, change, review, and remove access as the underlying relationship changes. Identity Governance and Administration supports requests, approvals, role design, segregation of duties, certification, and lifecycle evidence. Privileged Access Management protects powerful administrator access through vaulting, approval, session control, and monitoring. Single Sign-On can simplify access and improve centralized control, but it also makes the identity provider a critical dependency. Multifactor authentication reduces many credential attacks, yet recovery processes, session tokens, help desks, and legacy protocols can remain weak paths. Machine identities deserve the same discipline as human identities because secrets, certificates, API keys, and workload roles often hold broad access. Effective identity security combines narrow entitlements, strong authenticators, contextual decisions, rapid revocation, and meaningful review.",
      },
      {
        order: 5,
        id: "data-cryptography-and-protection",
        title: "Data protection, cryptography, and key management",
        body:
          "Data protection follows information from collection and creation through use, sharing, retention, archival, and destruction. Classification describes sensitivity and criticality so that safeguards match the consequence of disclosure, alteration, or loss. Minimization reduces unnecessary collection, access, copies, and retention. Encryption protects readable content when implemented with suitable algorithms and sound key management. Hashing supports integrity checks and password protection when used with appropriate salts and work factors. Digital signatures support integrity, origin, and nonrepudiation in defined contexts. Public Key Infrastructure manages certificates and trust relationships, but expired certificates, exposed private keys, and weak issuance processes can undermine it. Data Loss Prevention can inspect and restrict selected transfers, though it depends on classification, context, tuning, and business workflow. Backups protect availability only when they are complete, isolated where appropriate, monitored, and regularly restored in tests. The strongest design combines access control, encryption, tokenization or masking, logging, retention rules, and recovery. Privacy requirements also shape purpose, transparency, individual rights, location, and permissible sharing.",
      },
      {
        order: 6,
        id: "secure-engineering-cloud-and-supply-chain",
        title: "Secure engineering, cloud, and software supply chains",
        body:
          "Secure engineering brings protection into discovery, design, build, test, release, operation, and retirement. Requirements should include abuse cases, data sensitivity, identity boundaries, logging, recovery, and safe failure. Threat modeling examines how trust and data move through a design before defects become expensive. Code review, Static Application Security Testing, Dynamic Application Security Testing, Software Composition Analysis, secret scanning, container checks, and Infrastructure as Code scanning provide different evidence and should not be treated as interchangeable. Findings need ownership, context, remediation standards, and verified closure. In cloud environments, shared responsibility changes which party operates each layer, but the customer still must configure identity, networks, data, workloads, and telemetry appropriately. Software supply chain security covers source control, dependencies, build services, artifacts, deployment credentials, and update channels. A Software Bill of Materials improves visibility, while signed artifacts and provenance help teams verify origin and build history. Safe delivery uses protected pipelines, small changes, staged rollout, monitoring, rollback, and rapid patching without turning every low value finding into a release blocker.",
      },
      {
        order: 7,
        id: "security-operations-detection-response",
        title: "Security operations, detection, and threat intelligence",
        body:
          "Security operations turns telemetry into decisions. Endpoints, identity systems, networks, cloud platforms, applications, and data services generate events. Collection and normalization make selected evidence searchable. Detection logic identifies suspicious combinations, an alert requests attention, triage adds context, and a case organizes investigation. An incident exists when facts justify coordinated response to material harm or policy breach. Security Information and Event Management supports centralized search, correlation, detection, and retention. Security Orchestration, Automation and Response coordinates repeatable workflows. Endpoint Detection and Response observes hosts, while Network Detection and Response examines network behavior. Extended Detection and Response correlates several security surfaces. None of these labels guarantees coverage or outcome. Useful operations require reliable data, tuned detections, clear severity, practiced playbooks, sufficient retention, authority to act, and analysts who understand the business. Threat intelligence should improve a specific decision such as prioritization, hunting, blocking, or attribution confidence. Measure detection coverage, investigation quality, containment time, recurring causes, and service impact instead of celebrating alert volume or raw ingestion.",
      },
      {
        order: 8,
        id: "vulnerability-management-and-vapt",
        title: "Vulnerability management and authorized security testing",
        body:
          "Vulnerability management is a continuous lifecycle of discovery, validation, prioritization, treatment, exception handling, and verification. It covers missing patches, unsafe configuration, exposed services, weak design, insecure code, and unsupported technology. Asset ownership and reachability often matter as much as a severity score. Vulnerability Assessment and Penetration Testing combines systematic weakness discovery with authorized attempts to validate selected attack paths and impact. Before testing, written permission, scope, rules of engagement, safety constraints, evidence handling, communication paths, and stop conditions must be explicit. Reconnaissance, scanning, manual testing, exploitation, and post exploitation activities stay within that authority. A good finding explains the affected asset, evidence, realistic consequence, root cause, likelihood factors, and practical remediation. Retesting confirms whether the weakness and its variants are actually closed. Red teaming evaluates broader defensive outcomes against an agreed objective, while purple teaming lets offensive and defensive specialists learn together. Testing is a sample under particular conditions, not proof that an environment is secure. Continuous asset visibility, engineering fixes, and control validation must continue between assessments.",
      },
      {
        order: 9,
        id: "incident-response-recovery-and-learning",
        title: "Incident response, recovery, and learning",
        body:
          "Incident response prepares an organization to make sound decisions under uncertainty. Preparation establishes roles, severity criteria, communication paths, legal and privacy involvement, evidence procedures, suppliers, tooling, and decision authority. Detection and triage determine whether suspicious activity is credible and material. Containment limits further harm while preserving critical services and evidence. Eradication removes causes and persistence. Recovery restores trustworthy operation, monitors for recurrence, and manages customer or partner consequences. Digital forensics helps establish what happened, when, how, and to which systems or data, but perfect certainty may be impossible. Business continuity and disaster recovery provide alternate processes, backups, capacity, and restoration priorities when technology cannot be recovered immediately. Executive communication should distinguish verified facts, working hypotheses, decisions, and unknowns. Exercises reveal gaps before a crisis, especially at handoffs between technical, legal, operational, and leadership teams. After action reviews should be candid and evidence based, without becoming blame rituals. The outcome is not merely closure of a ticket; it is safer architecture, improved playbooks, stronger controls, addressed root causes, and reduced recurrence.",
      },
    ],
    flow: [
      { label: "Objective and service", detail: "Name the outcome, owner, users, and acceptable disruption." },
      { label: "Assets and data", detail: "Map information, applications, infrastructure, suppliers, and critical dependencies." },
      { label: "Identity and trust", detail: "Locate trust boundaries, privileged paths, credentials, and machine identities." },
      { label: "Threat scenarios", detail: "Connect plausible causes, weaknesses, attack paths, and business consequences." },
      { label: "Control design", detail: "Place preventive, detective, corrective, and recovery controls along each path." },
      { label: "Telemetry and validation", detail: "Collect evidence, test controls, assess vulnerabilities, and tune detections." },
      { label: "Response and recovery", detail: "Contain harm, preserve evidence, restore service, and communicate decisions." },
      { label: "Learning", detail: "Fix root causes, reassess residual risk, and improve architecture and practice." },
    ],
    terms: [
      { term: "IAM", expanded: "Identity and Access Management", meaning: "The policies, processes, and technology used to manage identities, authentication, and access." },
      { term: "IGA", expanded: "Identity Governance and Administration", meaning: "Identity lifecycle, access requests, approvals, role design, reviews, and evidence." },
      { term: "PAM", expanded: "Privileged Access Management", meaning: "Controls for powerful human and machine access, including vaulting, approval, sessions, and rotation." },
      { term: "MFA", expanded: "Multifactor Authentication", meaning: "Authentication using factors from more than one category, designed to reduce reliance on a single secret." },
      { term: "SSO", expanded: "Single Sign-On", meaning: "A user authenticates through a central service and accesses connected applications without separate sign-ins." },
      { term: "PKI", expanded: "Public Key Infrastructure", meaning: "Roles, policies, certificates, keys, and processes used to establish cryptographic trust." },
      { term: "VAPT", expanded: "Vulnerability Assessment and Penetration Testing", meaning: "Authorized discovery and validation of security weaknesses within an agreed scope." },
      { term: "SIEM", expanded: "Security Information and Event Management", meaning: "A platform for collecting, searching, correlating, detecting, and retaining security relevant events." },
      { term: "SOAR", expanded: "Security Orchestration, Automation and Response", meaning: "Workflow technology that coordinates tools, evidence, approvals, and response actions." },
      { term: "EDR", expanded: "Endpoint Detection and Response", meaning: "Endpoint telemetry, behavioral detection, investigation, and authorized host response." },
      { term: "NDR", expanded: "Network Detection and Response", meaning: "Network traffic or metadata analysis for behavioral detection, investigation, and response." },
      { term: "XDR", expanded: "Extended Detection and Response", meaning: "Correlation and response across several security surfaces such as endpoint, identity, email, cloud, and network." },
      { term: "DLP", expanded: "Data Loss Prevention", meaning: "Controls that identify and restrict selected handling or movement of sensitive data." },
      { term: "WAF", expanded: "Web Application Firewall", meaning: "A control that inspects web traffic and applies rules to reduce selected application attacks." },
      { term: "SBOM", expanded: "Software Bill of Materials", meaning: "An inventory of software components and dependencies used to improve supply chain visibility." },
    ],
    providerCategories: [
      { category: "Workforce identity and access", purpose: "Authentication, federation, conditional access, and lifecycle integration.", examples: ["Microsoft Entra", "Okta", "Ping Identity"] },
      { category: "Privileged access", purpose: "Vaulting, rotation, approval, and monitoring for powerful access.", examples: ["CyberArk", "BeyondTrust", "Delinea"] },
      { category: "Endpoint and extended detection", purpose: "Host telemetry, detection, investigation, containment, and cross-surface correlation.", examples: ["CrowdStrike", "Microsoft", "Palo Alto Networks", "SentinelOne"] },
      { category: "SIEM and security analytics", purpose: "Central event collection, search, detection, case management, and orchestration.", examples: ["Splunk", "Microsoft Sentinel", "Google Security Operations", "Elastic Security"] },
      { category: "Network and application protection", purpose: "Firewalling, secure access, web application protection, and network visibility.", examples: ["Palo Alto Networks", "Fortinet", "Cisco", "Cloudflare", "F5"] },
      { category: "Cloud security posture and workload protection", purpose: "Configuration assessment, cloud entitlement analysis, workload protection, and exposure visibility.", examples: ["Wiz", "Palo Alto Networks Prisma Cloud", "Microsoft Defender for Cloud", "Orca Security"] },
      { category: "Vulnerability and application security", purpose: "Asset assessment, code and dependency analysis, exposure prioritization, and remediation workflow.", examples: ["Tenable", "Qualys", "Rapid7", "Snyk", "Checkmarx", "Veracode"] },
    ],
    providerNote:
      "These are examples of capability categories and providers, not rankings or purchase recommendations. Verify current product scope, deployment model, data location, integration depth, licensing, accessibility, and operating effort against the actual architecture and risk scenarios.",
    caseStudy: {
      title: "A contractor account becomes a route into order fulfillment",
      classification: "Fictional composite based on common incident patterns",
      context:
        "A retailer gives a logistics contractor federated access to a cloud order portal. The contract ends, but the sponsor does not close the identity record. An attacker obtains the contractor's password through phishing, uses a weak recovery path to bypass the normal sign-in challenge, and exports customer addresses before changing shipment rules. Fulfillment slows while teams determine which orders can be trusted.",
      sequence: [
        "Identity telemetry shows a new country, unusual recovery activity, and a bulk export, but the signals initially enter separate queues.",
        "The Security Operations Center correlates the events, revokes sessions, disables the account, preserves cloud and application evidence, and restricts the affected workflow.",
        "Operations switches urgent orders to a verified manual queue while data, privacy, legal, and customer teams assess notification and correction duties.",
        "The investigation finds a failed leaver control, an overbroad role, a recovery design gap, and insufficient correlation between identity and application events.",
      ],
      decisions: [
        "Contain the account immediately or preserve access briefly for observation, considering active customer harm.",
        "Determine which orders and records remain trustworthy before restoring automated fulfillment.",
        "Choose notification based on verified data and applicable obligations, not speculation.",
      ],
      outcome:
        "The retailer restores validated orders, notifies affected parties where required, time bounds contractor access, narrows export privileges, hardens recovery, joins identity and application detections, and tests the revised offboarding control. The case links business operations, people, cloud, data, governance, and enterprise resilience to cybersecurity.",
    },
    misconceptions: [
      { claim: "Cybersecurity is the security team's job.", correction: "Security specialists provide expertise, but service owners, engineers, identity teams, suppliers, users, leaders, and assurance functions all own part of the outcome." },
      { claim: "Zero Trust means trusting nobody.", correction: "It means making explicit, contextual, least privilege access decisions and continuously checking relevant signals." },
      { claim: "MFA stops account takeover.", correction: "It reduces many attacks, but recovery, session theft, help desk manipulation, malicious applications, and weak factors still require controls." },
      { claim: "A passed penetration test proves security.", correction: "A test samples an agreed scope and time. It cannot prove the absence of unknown weaknesses or future change." },
      { claim: "A critical score is always the top remediation priority.", correction: "Severity matters, but exposure, service importance, threat activity, compensating controls, and realistic consequence determine priority." },
      { claim: "Buying more tools creates defense in depth.", correction: "Layers help only when their coverage, independence, ownership, evidence, and response paths are understood and operated." },
    ],
    linkedPillars: [
      { pillar: "Business, Product & Operations", href: "/learn?category=business", relationship: "Defines the outcomes, processes, users, and consequences security must protect." },
      { pillar: "Computing, Systems & Infrastructure", href: "/learn?category=systems", relationship: "Explains the hosts, networks, protocols, databases, and trust boundaries where controls operate." },
      { pillar: "Software Engineering & Delivery", href: "/learn?category=software", relationship: "Builds security requirements, testing, provenance, release safety, and remediation into the lifecycle." },
      { pillar: "Cloud, Platforms & Resilience", href: "/learn?category=cloud", relationship: "Places identity, posture, workload, network, logging, backup, and recovery controls in cloud architectures." },
      { pillar: "Data, Analytics & Information Management", href: "/learn?category=data", relationship: "Provides classification, lineage, quality, retention, access, and privacy context for protection." },
      { pillar: "Artificial Intelligence & Emerging Technology", href: "/learn?category=ai", relationship: "Adds model, prompt, agent, data, and tool abuse scenarios to the security architecture." },
      { pillar: "Governance, Compliance & Assurance", href: "/learn?category=governance", relationship: "Sets accountability, policy, obligations, evidence, independent challenge, and oversight." },
      { pillar: "Enterprise Risk & Resilience", href: "/learn?category=risk", relationship: "Connects technical scenarios to appetite, treatment, continuity, crisis decisions, and residual exposure." },
      { pillar: "People & Professional Capability", href: "/learn?category=people", relationship: "Strengthens usable security, reporting culture, crisis communication, and resistance to manipulation." },
    ],
  },
  governance: {
    slug: "governance-compliance-assurance",
    title: "Governance, Compliance & Assurance",
    purpose:
      "Create accountable direction, translate obligations and risk decisions into workable policy and controls, and produce credible evidence about whether those arrangements operate as intended. This pillar connects boards, management, control owners, compliance, privacy, risk, internal audit, external assurance, and frontline teams without treating governance as paperwork or compliance as the same thing as safety.",
    sections: [
      {
        order: 1,
        id: "governance-purpose-and-accountability",
        title: "Governance purpose and accountable direction",
        body:
          "Governance is the system by which an organization is directed, overseen, and held accountable. It establishes purpose, values, decision rights, acceptable boundaries, and the information leaders need for oversight. A board or equivalent governing body does not operate every control. It approves direction, challenges management, monitors material outcomes, and remains accountable for duties that cannot simply be delegated away. Management translates direction into an operating model, assigns owners, allocates resources, and resolves conflicts. Good accountability names a person or body with authority, competence, capacity, and a clear obligation to explain results. Committees are useful when their mandate, membership, escalation route, and decisions are explicit; otherwise they can diffuse ownership. Governance must also reflect stakeholders, including customers, employees, investors, regulators, partners, and affected communities. The practical test is whether the right people make timely, informed, traceable decisions about meaningful matters. Charters, minutes, dashboards, and policies support that system, but documents do not substitute for judgment, challenge, behavior, or follow through.",
      },
      {
        order: 2,
        id: "decision-rights-and-three-lines",
        title: "Decision rights, ownership, and the Three Lines Model",
        body:
          "Decision rights state who may decide, who must be consulted, who executes, and who can challenge or escalate. A RACI chart can clarify who is Responsible, Accountable, Consulted, and Informed, but it cannot repair unclear authority or overloaded owners. The Institute of Internal Auditors' Three Lines Model describes complementary roles. First line management owns and manages objectives, risks, and controls through everyday work. Second line functions provide expertise, frameworks, monitoring, support, and challenge in areas such as risk, compliance, privacy, and security. Third line internal audit provides independent and objective assurance and advice to the governing body and management. External regulators, auditors, and assurance providers sit outside this internal arrangement and have distinct mandates. Independence is not isolation: assurance teams need access to people and evidence while preserving objectivity. Small organizations may combine roles, so conflicts must be recognized and compensated through review or external support. Clear escalation thresholds, protected challenge, documented acceptance, and consequences for unresolved action make the model real rather than ceremonial.",
      },
      {
        order: 3,
        id: "obligations-and-compliance",
        title: "Obligations, applicability, and compliance",
        body:
          "Organizations face laws, regulations, licenses, court orders, contracts, standards, internal commitments, and voluntary codes. These sources have different authority. A legal requirement in one jurisdiction is not automatically universal, and a standard becomes mandatory only through adoption, contract, policy, or applicable rule. Compliance begins by identifying the organization, service, data, location, customer, and activity in scope. An obligation register records the source, clause, owner, applicability rationale, interpretation, required action, evidence, and change history. Subject matter experts should resolve ambiguity instead of copying generic checklists. Related requirements can map to common control objectives so that one well designed process supports several obligations without hiding important differences. Regulatory change management monitors new and amended duties, assesses impact, updates policies and controls, trains affected people, and verifies implementation. Compliance demonstrates conformity with specified requirements; it does not prove that every material risk is controlled. A compliant design can still fail through poor operation, and an organization can face serious emerging risks before a rule addresses them. Governance therefore combines compliance with risk judgment, ethics, and stakeholder expectations.",
      },
      {
        order: 4,
        id: "policy-framework-and-exceptions",
        title: "Policy architecture, standards, procedures, and exceptions",
        body:
          "A policy hierarchy turns direction into usable expectations. A policy states mandatory intent, scope, principles, ownership, and consequences. Standards define required rules or minimum criteria, such as authentication strength or retention periods. Procedures describe repeatable steps, while guidelines offer recommended approaches where judgment remains appropriate. Local work instructions may add operational detail. Each document needs an owner, approver, audience, version, effective date, review trigger, and relationship to superior documents and controls. Plain language, accessible formats, and role based training improve adoption. Acknowledgement proves receipt, not understanding or behavior. Exceptions should be explicit decisions, not quiet noncompliance. A sound exception records the requirement, reason, affected scope, risk assessment, compensating controls, accountable approver, expiry date, and remediation plan. Waivers and risk acceptances should follow defined authority and receive periodic review. Policy management also needs change control so outdated rules do not conflict with new systems or obligations. The aim is a coherent instruction system that enables consistent decisions, not a large library that employees cannot navigate or apply.",
      },
      {
        order: 5,
        id: "risk-to-control-design",
        title: "From objectives and risk to control design",
        body:
          "A control is an action or condition intended to modify risk or support an objective. Control design starts with a clear objective and scenario, not with a catalog. A control objective states the result required, such as ensuring that privileged access is approved, limited, and traceable. The control description then names who performs what action, on which population, at what frequency or trigger, using which system, with what evidence, and how exceptions are handled. Preventive controls reduce the chance of an event. Detective controls identify events or control failures. Corrective and recovery controls limit consequences and restore operation. Manual controls can address judgment and unusual cases; automated controls can improve consistency and coverage but inherit system configuration and data risks. Key controls deserve special attention because their failure materially changes exposure, yet supporting controls may determine whether they work. Design should also prevent duplication, conflicting instructions, and control fatigue. A control library connects risks, obligations, processes, systems, owners, evidence, tests, and issues so that change in one place can be assessed across the whole environment.",
      },
      {
        order: 6,
        id: "control-operation-and-evidence",
        title: "Control operation, evidence, and traceability",
        body:
          "Operating effectiveness asks whether a suitably designed control actually worked across the relevant period and population. Evidence should be sufficient, relevant, reliable, and traceable to the control performance. Examples include approved records, configuration exports, system logs, reconciliations, review notes, tickets, training results, and exception decisions. A screenshot without context may not identify the system, date, population, performer, or completeness. Automatically generated evidence can improve scale, but teams must validate the source, query, permissions, time window, and transformation. Evidence retention should reflect legal, contractual, audit, investigative, and privacy needs. Control owners monitor performance and correct failures; performers execute the activity; evidence owners may maintain the underlying records. These roles should not be assumed to be the same. Testing selects samples or analyzes a full population according to the method and risk. Deviations require evaluation because one exception may be isolated or may reveal a systemic design problem. Continuous control monitoring can surface changes quickly, but it still needs thresholds, ownership, investigation, and reliable data. Evidence exists to support decisions, not to fill folders.",
      },
      {
        order: 7,
        id: "assurance-audit-and-certification",
        title: "Assurance, audit, assessment, and certification",
        body:
          "Assurance increases confidence in information, processes, controls, or outcomes through an evidence based evaluation. Confidence depends on scope, criteria, competence, method, evidence quality, timing, and independence. Self assessment helps owners find gaps but provides less independent challenge. Second line review can compare operations with policy and risk expectations. Internal audit provides independent and objective assurance to the governing body and management. External audit or attestation follows a defined engagement and criteria, while certification states that a specified scope met a scheme's requirements at a point or period. None of these conclusions extends beyond its stated boundary. An unqualified report does not mean zero risk, and a certification does not guarantee that every service or future change is secure. An assurance map shows important objectives and risks, existing assurance providers, scope, timing, and gaps or duplication. Risk based planning directs finite review capacity to material uncertainty. Findings should state criteria, condition, cause, consequence, and agreed action. Quality review, auditor independence, management response, and tracked remediation determine whether assurance improves the organization rather than merely producing reports.",
      },
      {
        order: 8,
        id: "privacy-data-and-ai-governance",
        title: "Privacy, data, and AI governance",
        body:
          "Privacy governance connects lawful and ethical data use to ownership, design, operations, and individual rights. A data inventory and processing record explain what information is collected, from whom, for which purpose, on what basis, where it moves, who receives it, and how long it remains. Data protection impact assessments examine high risk processing before launch and document mitigations and residual concerns. Privacy by design favors purpose limitation, minimization, appropriate access, transparency, accuracy, security, and controlled retention. Data governance adds accountable owners and stewards, quality rules, definitions, lineage, metadata, and issue management. AI governance extends these disciplines to models, prompts, training data, evaluations, human oversight, third party systems, and automated decisions. Use cases should have a named owner, permitted purpose, risk classification, evaluation criteria, deployment approval, monitoring, incident path, and retirement plan. Fairness, explainability, robustness, security, intellectual property, safety, and contestability matter differently by context. A central committee can set common rules, but domain owners must remain accountable for actual outcomes. Governance should enable valuable use with proportionate safeguards, not reduce innovation to a yes or no gate.",
      },
      {
        order: 9,
        id: "reporting-issues-and-improvement",
        title: "Metrics, issues, remediation, and continuous improvement",
        body:
          "Governance reporting should help a defined audience make a decision. Leading indicators show changing conditions or control activity; lagging indicators show realized outcomes such as incidents, losses, breaches, or missed obligations. Counts need denominators, trends, thresholds, and context. Ninety overdue actions means something different across one hundred and ten thousand total actions. A Key Risk Indicator signals movement in exposure, while a Key Performance Indicator tracks performance against an intended result. Neither is useful without an owner and response. Issues should record the affected objective, evidence, root cause, consequence, severity rationale, responsible owner, due date, dependencies, and validation method. Management actions need realistic milestones, not repeated extensions that conceal acceptance. Closure requires evidence that the agreed outcome is achieved and sustainable. Material residual exposure should be accepted only by authorized leaders who understand the consequences. Dashboards should distinguish facts, forecasts, assumptions, and gaps in data quality. Periodic governance effectiveness reviews examine whether committees, policies, controls, assurance, and escalation actually improve decisions. Mature governance learns from exceptions, incidents, complaints, audit work, regulatory change, and frontline feedback.",
      },
    ],
    flow: [
      { label: "Context and objectives", detail: "Define purpose, stakeholders, strategy, services, values, and the environment in which decisions occur." },
      { label: "Authority and accountability", detail: "Set governing mandates, decision rights, ownership, challenge, and escalation routes." },
      { label: "Obligations and risk", detail: "Determine applicable duties, commitments, scenarios, appetite, and material priorities." },
      { label: "Policy and control design", detail: "Translate direction into usable rules, control objectives, ownership, and exceptions." },
      { label: "Operation and evidence", detail: "Perform controls, preserve reliable records, monitor deviations, and correct failures." },
      { label: "Assurance", detail: "Evaluate design and operation using a defined scope, criteria, method, evidence, and level of independence." },
      { label: "Decision and reporting", detail: "Present material facts, uncertainty, residual exposure, and choices to the authorized audience." },
      { label: "Remediation and learning", detail: "Address root causes, validate closure, update the system, and reassess governance effectiveness." },
    ],
    terms: [
      { term: "Governance", meaning: "The system by which an organization is directed, overseen, and held accountable." },
      { term: "Accountability", meaning: "The obligation to own a result, exercise authority, and explain decisions and performance." },
      { term: "Compliance", meaning: "Conformity with an applicable requirement such as law, regulation, contract, standard, or policy." },
      { term: "RACI", expanded: "Responsible, Accountable, Consulted, and Informed", meaning: "A role mapping aid that clarifies participation in a decision or activity." },
      { term: "Three Lines Model", meaning: "A model distinguishing management ownership, risk and compliance support and challenge, and independent internal audit assurance." },
      { term: "Control objective", meaning: "A concise statement of the result a control or set of controls is intended to achieve." },
      { term: "Control", meaning: "An action or condition intended to modify risk or support achievement of an objective." },
      { term: "Design effectiveness", meaning: "Whether a control, if performed as designed, could reasonably achieve its objective." },
      { term: "Operating effectiveness", meaning: "Whether a suitably designed control operated consistently across the relevant scope and period." },
      { term: "Assurance", meaning: "An evidence based evaluation that increases confidence in information, controls, processes, or outcomes." },
      { term: "Audit", meaning: "A systematic and documented examination against defined criteria, performed with an appropriate level of objectivity and independence." },
      { term: "Attestation", meaning: "An independent practitioner's conclusion about subject matter measured or evaluated against suitable criteria." },
      { term: "Exception", meaning: "An approved, time bound departure from a requirement with documented rationale, risk, safeguards, owner, and expiry." },
      { term: "Segregation of duties", meaning: "Dividing incompatible responsibilities so one person cannot complete a sensitive process without oversight." },
      { term: "Evidence", meaning: "Information used to support a conclusion, with quality judged by sufficiency, relevance, reliability, and traceability." },
    ],
    providerCategories: [
      { category: "Integrated risk and control platforms", purpose: "Risk registers, control libraries, obligations, testing, issues, workflows, and reporting.", examples: ["ServiceNow Integrated Risk Management", "Archer", "MetricStream", "LogicGate"] },
      { category: "Compliance automation", purpose: "Control mapping, evidence collection, readiness workflows, and selected framework monitoring.", examples: ["Vanta", "Drata", "Secureframe"] },
      { category: "Audit management", purpose: "Audit universe, planning, workpapers, findings, action tracking, and committee reporting.", examples: ["AuditBoard", "TeamMate+", "Diligent HighBond"] },
      { category: "Privacy and data governance", purpose: "Processing inventories, assessments, rights workflows, consent, data mapping, and governance records.", examples: ["OneTrust", "TrustArc", "BigID"] },
      { category: "Board and policy governance", purpose: "Board materials, entity records, policy publication, acknowledgement, and lifecycle workflow.", examples: ["Diligent", "NAVEX", "PowerDMS"] },
    ],
    providerNote:
      "The examples illustrate market categories, not rankings. A platform can support workflow and evidence, but it cannot decide applicability, create accountability, guarantee control quality, or supply independent judgment. Validate current features, access controls, integrations, data residency, reporting, and total operating effort.",
    caseStudy: {
      title: "A healthcare software provider enters a new market before its controls catch up",
      classification: "Fictional composite based on common governance failures",
      context:
        "A growing healthcare software provider signs its first regional hospital group. Sales commits to privacy, security, availability, and subcontractor terms using an old control schedule. Product launches a generative support feature that can retrieve ticket attachments. No single owner reconciles the contract, regional privacy duties, AI review, cloud logging, and supplier arrangements. An internal review later finds that sensitive attachments can enter the feature and that some evidence covers only the corporate network, not the hosted service.",
      sequence: [
        "A cross functional team establishes applicability, maps data and suppliers, and separates contractual promises from internal assumptions.",
        "Management pauses sensitive attachment retrieval, assigns service, privacy, model, and control owners, and records a time bound exception for the remaining gap.",
        "Engineering adds scoped retrieval, access logging, retention rules, evaluation, and human review while compliance updates the obligation and control map.",
        "Internal audit independently tests the redesigned controls and reports residual limitations to the audit committee before full rollout.",
      ],
      decisions: [
        "Decide whether to pause the whole service or only the unsafe feature based on patient, customer, contractual, and operational consequences.",
        "Determine which commitments require customer communication and which evidence can legitimately support assurance.",
        "Set acceptance authority and expiry for residual risks that cannot be removed before launch." 
      ],
      outcome:
        "The provider renegotiates inaccurate promises, establishes a market entry governance gate, links contracts to controls and evidence, and requires privacy and AI review for material feature changes. The case connects business, software, cloud, data, AI, cybersecurity, risk, and people to governance and assurance.",
    },
    misconceptions: [
      { claim: "Governance means more approvals.", correction: "Good governance clarifies authority, information, boundaries, and escalation. It can remove unnecessary approval while strengthening accountability." },
      { claim: "Compliance and security are the same.", correction: "Compliance tests specified requirements. Security manages broader and changing threats to objectives, including risks not yet addressed by a rule." },
      { claim: "A certification proves the whole organization is safe.", correction: "Certification applies to stated criteria, scope, timing, and method. It does not guarantee every system, supplier, or future change." },
      { claim: "The second line owns all risk and controls.", correction: "First line management owns objectives, risks, and controls. Second line functions support, monitor, and challenge." },
      { claim: "Collected evidence proves a control worked.", correction: "Evidence must be relevant, reliable, complete enough, and traceable to the control, population, and period." },
      { claim: "Closing an audit action closes the risk.", correction: "Closure shows an agreed action was completed and validated. Residual risk may remain and needs an explicit decision." },
    ],
    linkedPillars: [
      { pillar: "Business, Product & Operations", href: "/learn?category=business", relationship: "Provides objectives, strategy, processes, economics, contracts, and service ownership for governance decisions." },
      { pillar: "Computing, Systems & Infrastructure", href: "/learn?category=systems", relationship: "Shows the technical scope, dependencies, configuration, and records behind control claims." },
      { pillar: "Software Engineering & Delivery", href: "/learn?category=software", relationship: "Turns policy and control objectives into requirements, delivery gates, testing, evidence, and change management." },
      { pillar: "Cloud, Platforms & Resilience", href: "/learn?category=cloud", relationship: "Clarifies shared responsibility, platform guardrails, service continuity, supplier boundaries, and technical evidence." },
      { pillar: "Data, Analytics & Information Management", href: "/learn?category=data", relationship: "Supplies ownership, classification, lineage, quality, retention, and privacy foundations." },
      { pillar: "Artificial Intelligence & Emerging Technology", href: "/learn?category=ai", relationship: "Adds model accountability, permitted use, evaluation, human oversight, safety, and monitoring." },
      { pillar: "Cybersecurity, Identity & VAPT", href: "/learn?category=cyber", relationship: "Implements and validates protection while generating incidents, findings, and evidence for oversight." },
      { pillar: "Enterprise Risk & Resilience", href: "/learn?category=risk", relationship: "Frames uncertainty, appetite, treatment, acceptance, continuity, and material reporting." },
      { pillar: "People & Professional Capability", href: "/learn?category=people", relationship: "Enables ethical leadership, effective challenge, clear writing, negotiation, training, and accountable follow through." },
    ],
  },
  risk: {
    slug: "enterprise-risk-resilience",
    title: "Enterprise Risk & Resilience",
    purpose:
      "Help organizations pursue objectives while making uncertainty visible, comparable, and actionable. This pillar connects enterprise risk management, scenario analysis, appetite, treatment, third party and concentration risk, operational resilience, business continuity, disaster recovery, crisis management, monitoring, and learning. It treats resilience as the ability to sustain important outcomes through disruption, not merely as a set of recovery documents.",
    sections: [
      {
        order: 1,
        id: "objectives-uncertainty-and-value",
        title: "Objectives, uncertainty, and value",
        body:
          "Risk is the effect of uncertainty on objectives. It can threaten value, create opportunity, or produce outcomes different from what was planned. The starting point is therefore an explicit objective with an owner, time horizon, stakeholders, and measures of success. A label such as technology risk is too broad until it is connected to a decision or consequence. Enterprise Risk Management provides a coordinated view across strategic, financial, operational, legal, technology, cyber, people, safety, climate, and reputational concerns. It should support choices rather than operate as a parallel reporting process. Uncertainty comes from incomplete knowledge, variation, assumptions, external change, interdependence, and human behavior. Some uncertainty can be reduced through evidence or control; some must be accepted to pursue value. Risk ownership belongs with the person accountable for the affected objective, not automatically with the risk function. Specialists facilitate methods, aggregation, challenge, and reporting. A mature conversation states what the organization is trying to achieve, what could help or hinder it, how much uncertainty it can bear, and what decision is required now.",
      },
      {
        order: 2,
        id: "taxonomies-and-scenarios",
        title: "Risk taxonomies, scenarios, and causal structure",
        body:
          "A risk taxonomy groups related concerns so leaders can assign expertise, aggregate exposure, and report consistently. Categories are useful indexes, not explanations of how harm occurs. A scenario is more actionable when it states cause, event, consequence, affected objective, time horizon, and relevant dependencies. For example, failure of a sole identity provider during peak trading could block staff and customer access, delay orders, breach service commitments, and reduce revenue. The same event can create cyber, operational, financial, legal, and reputational effects, so forcing it into one silo hides the system. Cause and consequence analysis, bow tie diagrams, process maps, dependency maps, and fault trees reveal preventive barriers, escalation factors, recovery measures, and points of concentration. Risk statements should avoid vague formulas that merely combine threat and impact labels. They should also distinguish a present issue from a future uncertainty: an expired certificate is an issue, while the chance that unmanaged certificate renewal disrupts a service is a risk scenario. Clear scenarios make assessment, control design, testing, ownership, and executive choice substantially easier.",
      },
      {
        order: 3,
        id: "identification-and-assessment",
        title: "Risk identification and assessment",
        body:
          "Risk identification combines several views because no single workshop reveals the full environment. Strategic analysis examines markets, policy, technology, and competitors. Process and service mapping exposes dependencies and failure points. Incident, complaint, loss, audit, and near miss data reveal where assumptions have already failed. Threat intelligence, supplier information, horizon scanning, and scenario exercises add external and forward looking evidence. Assessment estimates likelihood, frequency, severity, velocity, duration, and uncertainty using methods appropriate to the decision. Qualitative scales can support comparison when definitions and evidence thresholds are consistent. Quantitative analysis can express ranges, distributions, expected loss, or stress outcomes, but precision must not exceed the quality of data and assumptions. Inherent risk describes exposure before specified controls, while residual risk describes exposure after considering them. Both depend on the scenario and reference state. Assessors should record evidence, assumptions, confidence, control dependencies, and sensitivity to change. Independent challenge tests optimism, inconsistent scoring, and missing consequences. The result should identify a decision, not merely produce a color on a heat map.",
      },
      {
        order: 4,
        id: "appetite-tolerance-and-decisions",
        title: "Risk appetite, tolerance, capacity, and decisions",
        body:
          "Risk appetite describes the types and amount of risk an organization is willing to pursue or retain. Risk capacity is the maximum exposure it could absorb without threatening viability or mandatory constraints. Tolerance translates appetite into measurable boundaries for a particular objective, service, or risk type. Limits and triggers support daily action, while escalation rules identify who decides when a boundary is approached or breached. These concepts should influence planning, investment, product design, supplier choices, and change approval, not remain in an annual statement. Appetite can vary: an organization may accept experimentation in an internal prototype but have very low tolerance for patient safety failure or unauthorized payment. A breach of tolerance is information requiring action and escalation, not automatic proof of misconduct. Available responses include avoiding the activity, reducing likelihood or impact, sharing or transferring some consequence, accepting residual exposure, pursuing an opportunity, or gathering more evidence. Acceptance must name the authorized decision maker, scope, rationale, duration, conditions, and monitoring. Good risk decisions expose tradeoffs and opportunity cost rather than pretending every risk can be minimized simultaneously.",
      },
      {
        order: 5,
        id: "treatment-and-control-portfolios",
        title: "Risk treatment and control portfolios",
        body:
          "Risk treatment changes a scenario through choices about design, process, people, technology, contracts, finance, or exit. Avoidance stops the exposure by not beginning or by ending an activity. Reduction changes likelihood, impact, duration, or detectability. Transfer or sharing, through insurance or contract for example, can redistribute financial consequences but rarely removes operational, legal, or reputational responsibility. Acceptance retains the exposure under defined authority. Treatment plans should state the target outcome, owner, actions, resources, dependencies, milestones, residual risk, and evidence of completion. Controls work as a portfolio along the causal path. Preventive barriers lower event likelihood; detection and response limit escalation; continuity and recovery reduce consequence. Concentrating all investment on prevention leaves the organization brittle when prevention fails. Cost benefit analysis should include implementation, friction, operating expense, control failure, and displaced opportunity. Treatment also creates secondary risk, such as dependence on a new vendor or complexity introduced by a manual workaround. Once implemented, effectiveness must be validated and residual exposure reassessed. Closing the project task is not the same as achieving the risk outcome.",
      },
      {
        order: 6,
        id: "third-party-and-concentration-risk",
        title: "Third party, supply chain, and concentration risk",
        body:
          "Organizations depend on cloud platforms, software vendors, data processors, logistics partners, contractors, utilities, and fourth parties they may never contract directly. Third party risk management begins before procurement by defining the service, data, access, criticality, substitutability, geography, and failure consequences. Due diligence should be proportionate and evidence based. A questionnaire alone cannot establish control effectiveness, and a certification applies only to its stated scope and period. Contracts can set security, privacy, service, audit, notification, continuity, subcontracting, data return, and exit expectations, but the organization must monitor performance and enforce material terms. Concentration risk arises when many important services depend on one provider, region, component, identity platform, network route, or skill set. Each supplier may appear acceptable alone while the combined dependency exceeds appetite. Continuous monitoring should combine operational metrics, incidents, financial and geopolitical signals, assurance reports, material changes, and relationship knowledge. Exit plans need data portability, alternative capacity, transition time, retained expertise, and tested procedures. Resilience depends on understanding the entire dependency chain, not merely scoring individual vendors.",
      },
      {
        order: 7,
        id: "operational-resilience",
        title: "Operational resilience and important services",
        body:
          "Operational resilience focuses on delivering important services within tolerable disruption, even when severe events occur. Begin with the customer, market, safety, or public outcome, then identify the end to end service that produces it. Set an impact tolerance describing the maximum acceptable disruption, which may combine duration, transaction volume, data loss, customer harm, and geographic reach. Map the people, processes, information, applications, infrastructure, facilities, suppliers, and decision makers required to remain within that tolerance. This view often reveals dependencies that separate business continuity, technology, cyber, and supplier teams have not connected. Resilience options include redundancy, diverse routes, manual alternatives, spare capacity, graceful degradation, data reconciliation, alternate suppliers, and rapid decision authority. Redundancy helps only when components do not share the same hidden failure mode. Scenario tests should be severe but plausible and should challenge the whole service, including communications, workarounds, and restoration sequencing. The goal is not uninterrupted operation at any cost. It is a deliberate ability to protect the most important outcomes and recover in an orderly, trustworthy way.",
      },
      {
        order: 8,
        id: "continuity-recovery-and-crisis",
        title: "Business continuity, disaster recovery, and crisis management",
        body:
          "Business continuity prepares alternate ways to sustain priority activities during disruption. A Business Impact Analysis identifies critical activities, dependencies, minimum resource needs, recovery priorities, and the consequences of delay. The Recovery Time Objective states the target time to restore a capability. The Recovery Point Objective states the maximum targeted period of data loss measured backward from disruption. These targets must align with service impact tolerance and actual technical architecture. Disaster recovery focuses on restoring technology and data through backups, replication, alternate environments, rebuild procedures, and validation. Crisis management coordinates strategic decisions, priorities, welfare, legal duties, communication, and external relationships when normal authority or information flows are strained. Plans should be short enough to use, role based, accessible during system failure, and supported by current contact and dependency information. Exercises range from walkthroughs to technical recovery tests and full simulations. They should test decisions and evidence, not reward scripted success. Recovery is complete only when service integrity, security, data reconciliation, customer impact, and accumulated work are understood, not when servers merely start.",
      },
      {
        order: 9,
        id: "monitoring-aggregation-and-learning",
        title: "Monitoring, aggregation, escalation, and learning",
        body:
          "Risk monitoring tracks conditions that could change exposure or require a decision. Key Risk Indicators should have a defined scenario, data source, owner, threshold, response, and known limitation. Good signals may include supplier incidents, unpatched critical paths, liquidity headroom, staff attrition in scarce roles, service error rates, unresolved control failures, or forecast weather severity. Aggregation examines how scenarios combine across business units, services, suppliers, regions, and time. Simple addition can mislead because dependencies create correlation, cascading failure, or diversification. Stress tests and reverse stress tests explore conditions that could threaten objectives or viability. Reporting should distinguish current exposure, trend, forecast, uncertainty, control effectiveness, accepted exceptions, and requested decisions. Escalation needs clear triggers and an audience with authority to act. Incidents and near misses provide unusually valuable evidence because they reveal actual system behavior. Lessons should update assumptions, scenarios, controls, continuity plans, appetite, and investment priorities. A risk register is therefore a living decision record, not the enterprise risk system itself. Mature organizations combine structured review with frontline reporting and external horizon scanning.",
      },
    ],
    flow: [
      { label: "Context and objective", detail: "Define the outcome, owner, stakeholders, time horizon, success measures, and constraints." },
      { label: "Scenario and dependencies", detail: "Describe cause, event, consequence, affected service, and connected internal and external dependencies." },
      { label: "Assessment", detail: "Estimate exposure, velocity, duration, confidence, and the contribution of existing controls." },
      { label: "Appetite decision", detail: "Compare exposure with appetite, tolerance, capacity, obligations, and available opportunity." },
      { label: "Treatment", detail: "Avoid, reduce, share, accept, pursue, or investigate further through owned and funded action." },
      { label: "Resilience design", detail: "Add containment, continuity, recovery, alternative capacity, and crisis decision paths." },
      { label: "Monitor and escalate", detail: "Track indicators, incidents, control performance, dependencies, and threshold breaches." },
      { label: "Learn and adapt", detail: "Test assumptions, validate treatment, update scenarios, and change priorities as the environment evolves." },
    ],
    terms: [
      { term: "ERM", expanded: "Enterprise Risk Management", meaning: "A coordinated approach to managing uncertainty across objectives, risk types, business units, and decision levels." },
      { term: "Risk owner", meaning: "The person accountable for managing uncertainty affecting an objective and for securing an authorized decision." },
      { term: "Inherent risk", meaning: "Exposure under a stated reference condition before considering the specified controls." },
      { term: "Residual risk", meaning: "Exposure remaining after considering the design and operation of specified controls and treatments." },
      { term: "Risk appetite", meaning: "The types and amount of risk an organization is willing to pursue or retain while seeking objectives." },
      { term: "Risk capacity", meaning: "The maximum exposure an organization could absorb without threatening viability or mandatory constraints." },
      { term: "Risk tolerance", meaning: "A measurable boundary for variation or exposure around a particular objective, service, or risk type." },
      { term: "KRI", expanded: "Key Risk Indicator", meaning: "A signal used to monitor changing exposure and trigger review or action." },
      { term: "BIA", expanded: "Business Impact Analysis", meaning: "Analysis of critical activities, dependencies, recovery needs, and consequences of disruption." },
      { term: "RTO", expanded: "Recovery Time Objective", meaning: "The target elapsed time for restoring a capability after disruption." },
      { term: "RPO", expanded: "Recovery Point Objective", meaning: "The maximum targeted period of data loss measured backward from the disruption." },
      { term: "Impact tolerance", meaning: "The maximum disruption to an important service that the organization is willing or able to tolerate." },
      { term: "Scenario analysis", meaning: "Structured examination of plausible causes, events, consequences, dependencies, and decisions." },
      { term: "Stress testing", meaning: "Evaluation of performance or resilience under severe but plausible conditions." },
      { term: "Concentration risk", meaning: "Exposure created when multiple important outcomes depend on the same provider, region, component, route, or resource." },
    ],
    providerCategories: [
      { category: "Enterprise risk and control platforms", purpose: "Risk registers, assessments, controls, issues, workflows, aggregation, and reporting.", examples: ["ServiceNow Integrated Risk Management", "Archer", "MetricStream", "LogicGate"] },
      { category: "Third party risk management", purpose: "Supplier inventory, due diligence, monitoring, issues, contract evidence, and lifecycle workflow.", examples: ["OneTrust", "Prevalent", "ProcessUnity", "SecurityScorecard", "BitSight"] },
      { category: "Business continuity and operational resilience", purpose: "Business impact analysis, plans, dependencies, exercises, incidents, and recovery coordination.", examples: ["Fusion Risk Management", "Castellan", "ServiceNow Business Continuity Management"] },
      { category: "Crisis communication and mass notification", purpose: "Emergency notification, response coordination, stakeholder updates, and accountability for acknowledgement.", examples: ["Everbridge", "OnSolve"] },
      { category: "Risk quantification and scenario modeling", purpose: "Structured frequency and loss modeling, simulation, sensitivity analysis, and decision support.", examples: ["Safe Security", "RiskLens", "Resolver"] },
    ],
    providerNote:
      "These examples are category illustrations, not rankings. Technology can improve workflow, dependency data, modeling, and evidence, but risk quality still depends on clear objectives, sound scenarios, reliable inputs, challenge, ownership, and decisions. Confirm current product scope, methodology, integrations, data controls, and implementation effort.",
    caseStudy: {
      title: "A fulfillment network discovers its backup supplier shares the same dependency",
      classification: "Fictional composite based on common resilience patterns",
      context:
        "An online retailer maps its peak season order service and identifies two warehouse software suppliers, treating them as independent recovery options. During a regional network provider outage, both suppliers lose their authentication connection because each relies on the same identity platform and telecommunications route. Warehouse staff can see printed pick lists but cannot confirm stock movements, customer service cannot trust delivery estimates, and payment captures begin to age toward contractual deadlines.",
      sequence: [
        "The crisis team prioritizes safety, order integrity, customer promises, and payment deadlines instead of trying to restore every function at once.",
        "Operations activates a controlled manual process with numbered batches, dual checks, offline stock capture, and later reconciliation rather than accepting uncontrolled shipment.",
        "Technology restores a restricted local authentication mode, while legal, finance, customer, supplier, and communications teams manage commitments and downstream impact.",
        "The review finds that supplier assessments considered each vendor separately and missed shared identity, network, and regional concentration." 
      ],
      decisions: [
        "Choose which service elements can degrade safely while remaining within the impact tolerance.",
        "Balance rapid shipment against inventory and payment integrity when systems of record are unavailable.",
        "Decide whether to invest in true dependency diversity, tested offline capability, or a lower accepted peak capacity." 
      ],
      outcome:
        "The retailer redesigns the service map, establishes dependency level concentration limits, tests offline reconciliation, and includes fourth party evidence in supplier reviews. It also aligns recovery time and data loss targets with customer impact tolerance. The case connects business operations, systems, cloud, identity, data, governance, contracts, finance, and people to enterprise risk and resilience.",
    },
    misconceptions: [
      { claim: "Risk management is about avoiding risk.", correction: "Organizations take risk to create value. Risk management makes exposure and tradeoffs explicit so authorized people can choose well." },
      { claim: "A heat map is a risk assessment.", correction: "A heat map is one display. A useful assessment includes objective, scenario, evidence, assumptions, controls, uncertainty, and a decision." },
      { claim: "Insurance transfers the risk.", correction: "Insurance may transfer defined financial consequences. Operational disruption, customer harm, legal duties, and reputation often remain." },
      { claim: "Two suppliers provide resilience.", correction: "They provide resilience only if they do not share critical hidden dependencies and the organization can switch in time." },
      { claim: "Business continuity belongs to the continuity team.", correction: "Service owners, technology, facilities, people, suppliers, communications, legal, and leadership all own parts of continuity." },
      { claim: "Recovery is complete when systems are online.", correction: "Trustworthy recovery also requires security validation, data reconciliation, backlog handling, customer impact assessment, and stable operation." },
    ],
    linkedPillars: [
      { pillar: "Business, Product & Operations", href: "/learn?category=business", relationship: "Defines objectives, value chains, service priorities, economics, suppliers, and operational consequences." },
      { pillar: "Computing, Systems & Infrastructure", href: "/learn?category=systems", relationship: "Reveals technical dependencies, single points of failure, observability, capacity, and restoration paths." },
      { pillar: "Software Engineering & Delivery", href: "/learn?category=software", relationship: "Manages change risk, quality, deployment safety, technical debt, supply chain exposure, and rollback." },
      { pillar: "Cloud, Platforms & Resilience", href: "/learn?category=cloud", relationship: "Provides shared responsibility, availability architecture, backup, disaster recovery, platform concentration, and failure testing." },
      { pillar: "Data, Analytics & Information Management", href: "/learn?category=data", relationship: "Supports trustworthy metrics, lineage, critical data identification, recovery priorities, and reconciliation." },
      { pillar: "Artificial Intelligence & Emerging Technology", href: "/learn?category=ai", relationship: "Introduces model uncertainty, automation dependence, new concentration, safety, evaluation, and emerging risk." },
      { pillar: "Cybersecurity, Identity & VAPT", href: "/learn?category=cyber", relationship: "Contributes threat scenarios, vulnerability exposure, incident response, control validation, and cyber recovery." },
      { pillar: "Governance, Compliance & Assurance", href: "/learn?category=governance", relationship: "Sets appetite, authority, obligations, controls, evidence, challenge, acceptance, and oversight." },
      { pillar: "People & Professional Capability", href: "/learn?category=people", relationship: "Strengthens risk communication, dissent, crisis leadership, negotiation, welfare, exercises, and coordinated action." },
    ],
  },
} as const;
