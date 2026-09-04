export type CategoryKey =
  | 'orientation'
  | 'business'
  | 'systems'
  | 'software'
  | 'cloud'
  | 'cyber'
  | 'governance'
  | 'risk'
  | 'data'
  | 'ai'
  | 'emerging'
  | 'industries'
  | 'people'
  | 'ecosystem';

type LegacyCategoryKey =
  | 'start'
  | 'business'
  | 'foundations'
  | 'systems'
  | 'software'
  | 'security'
  | 'identity'
  | 'vapt'
  | 'cloud'
  | 'data-ai'
  | 'grc'
  | 'industries'
  | 'professional'
  | 'organizations';

export type Topic = {
  id: string;
  slug: string;
  title: string;
  category: CategoryKey;
  categoryLabel: string;
  subtrack: string;
  summary: string;
  readTime: number;
  depth: 'Foundation' | 'Applied' | 'Advanced';
  featured: boolean;
};

export const categories: Record<CategoryKey, { label: string; short: string; description: string; color: string }> = {
  orientation: { label: 'Orientation & systems thinking', short: 'Orientation', description: 'See the whole operating model, choose a route and connect business, people and technology.', color: 'lime' },
  business: { label: 'Business, product & operations', short: 'Business', description: 'Why organizations exist, how value flows and how products, processes, projects, services and money connect.', color: 'blue' },
  systems: { label: 'Computing, systems & infrastructure', short: 'Systems', description: 'Hardware, operating systems, networks, databases, integration, architecture and operations.', color: 'violet' },
  software: { label: 'Software engineering & delivery', short: 'Software', description: 'How useful software is discovered, designed, built, tested, operated and retired.', color: 'indigo' },
  cloud: { label: 'Cloud, platforms & resilience', short: 'Cloud', description: 'Operating adaptable, reliable services across modern computing platforms.', color: 'sky' },
  cyber: { label: 'Cybersecurity, identity & VAPT', short: 'Cybersecurity', description: 'Architecture, identity, defensive operations, incident response, application security and authorized testing.', color: 'cyan' },
  governance: { label: 'Governance, compliance & assurance', short: 'Governance', description: 'Direction, policy, obligations, control design, audit, privacy and accountable oversight.', color: 'amber' },
  risk: { label: 'Enterprise risk & resilience', short: 'Risk', description: 'Uncertainty, trade-offs, third parties, continuity and the resilience of important services.', color: 'orange' },
  data: { label: 'Data, analytics & information management', short: 'Data', description: 'Data lifecycles, architecture, quality, lineage, analytics and privacy engineering.', color: 'teal' },
  ai: { label: 'Artificial intelligence', short: 'AI', description: 'Traditional AI, machine learning, deep learning, language, generation, agents, evaluation, security and responsible operation.', color: 'rose' },
  emerging: { label: 'Emerging technology', short: 'Emerging', description: 'Blockchain, quantum, connected devices, industrial systems, robotics, digital twins, edge and spatial computing.', color: 'lime' },
  industries: { label: 'Industry & business domains', short: 'Industries', description: 'How common technology and risk ideas change across real operating environments.', color: 'green' },
  people: { label: 'People & professional capability', short: 'People', description: 'Social skill, communication, relationships, leadership, negotiation and live reasoning.', color: 'purple' },
  ecosystem: { label: 'Organizations, standards & market landscape', short: 'Ecosystem', description: 'Institutions, standards bodies, agencies, communities and commercial providers worth knowing.', color: 'slate' },
};

const raw: Array<[LegacyCategoryKey, string, string]> = [
  ['start', 'How to Use the Knowledge Atlas', 'Choose a goal, understand the reading levels and use the atlas as either a guided course or a reference.'],
  ['start', 'Business-to-Technology Map', 'Connect an objective to processes, people, information, applications, infrastructure, risk, controls and evidence.'],
  ['start', 'The End-to-End Digital Service Journey', 'Follow a digital service from an idea and requirements through operation, incidents, improvement and retirement.'],

  ['business', 'Business Models, Value Chains and Operating Models', 'Understand how an organization creates value, earns or allocates money, organizes work and measures whether the model is healthy.'],
  ['business', 'Process Mapping, Bottlenecks and Continuous Improvement', 'Trace work, decisions, hand-offs, queues, waste, failure demand and feedback using practical process models.'],
  ['business', 'Product Management, Service Design and Customer Experience', 'Connect user needs, product outcomes, service journeys, roadmaps, discovery, delivery and learning.'],
  ['business', 'Business Analysis, Requirements and Acceptance Criteria', 'Turn ambiguous needs into testable outcomes, rules, constraints, assumptions and acceptance criteria.'],
  ['business', 'Project, Program and Portfolio Management', 'Distinguish projects, programs, products and portfolios while managing scope, time, cost, dependencies and benefits.'],
  ['business', 'Strategy, Metrics, Objectives and Decision-Making', 'Translate direction into choices, measurable outcomes, leading and lagging indicators and explicit trade-offs.'],
  ['business', 'Finance, Budgeting and Unit Economics for Technology', 'Read basic financial statements, understand cost, investment, return, total cost of ownership and unit economics.'],
  ['business', 'Procurement, Contracts and Vendor Management', 'Follow a purchase from need and market scan through due diligence, negotiation, contracting, performance and exit.'],
  ['business', 'Organizational Change, Adoption and Benefits Realization', 'Help people move from a new capability being delivered to it being understood, adopted and producing value.'],
  ['business', 'Customer, Service and Operational Management', 'Connect demand, capacity, service levels, quality, exceptions, support, complaints and continuous improvement.'],

  ['foundations', 'Computing Fundamentals', 'Understand bits, instructions, processors, memory, input and output, abstraction, performance and why computers behave as they do.'],
  ['foundations', 'Hardware, Firmware and Endpoint Devices', 'See how computers, mobile devices, servers, embedded devices and firmware form a working endpoint.'],
  ['foundations', 'Operating Systems and Processes', 'Learn kernels, processes, memory, users, files, services, permissions and the boundary between applications and hardware.'],
  ['foundations', 'Linux Foundations, Filesystem and Shell', 'Learn distributions, the kernel, shells, terminals, paths, the filesystem hierarchy, text streams, pipes and safe command-line habits.'],
  ['foundations', 'Linux Users, Groups and File Permissions', 'Understand user and group identity, read-write-execute permissions, binary-to-octal mapping, chmod, chown, umask and special permission bits.'],
  ['foundations', 'Linux Processes, Services, Logs and Networking', 'Trace processes, signals, systemd services, journals, sockets, ports, Domain Name System queries and common troubleshooting evidence.'],
  ['foundations', 'Linux Administration, Patching and Hardening', 'Operate packages, updates, remote access, configuration, logging, backups and secure baselines with verifiable change.'],
  ['foundations', 'System Hardening, Baselines and Verification', 'Reduce attack surface through trusted installation, patching, least functionality, access, file permissions, connection controls, logging, recovery and drift verification.'],
  ['foundations', 'Data Representation, Storage and File Systems', 'Understand encoding, formats, compression, disks, file systems and how information survives and moves.'],
  ['foundations', 'Programming and Automation Foundations', 'Learn logic, languages, scripts, libraries, debugging and when automation is the right tool.'],
  ['foundations', 'IT Operations and Service Management', 'Connect services, incidents, requests, problems, changes, assets, configuration and support models.'],
  ['foundations', 'Enterprise Architecture and Technology Lifecycle', 'Relate business, information, application and infrastructure architecture to technology selection and retirement.'],

  ['systems', 'Network Foundations and Protocol Models', 'Build a mental model of packets, layers, protocols, local networks and wide-area communication.'],
  ['systems', 'Addressing, Naming and Routing', 'Understand Internet Protocol addresses, subnetting, the Domain Name System, switching and how traffic finds a path.'],
  ['systems', 'The Internet, Web and Transport Security', 'Trace browsers, servers, Hypertext Transfer Protocol, certificates and Transport Layer Security through one request.'],
  ['systems', 'Man-in-the-Middle, Spoofing and Transport Trust', 'Understand how adversaries intercept, relay or redirect communications through local-network spoofing, rogue wireless access, name manipulation, malicious proxies, downgrade paths and broken certificate validation.'],
  ['systems', 'Enterprise Network Architecture and Segmentation', 'Learn zones, firewalls, proxies, remote access, segmentation and modern boundary design.'],
  ['systems', 'Servers, Virtualization and Containers', 'Compare physical servers, virtual machines, hypervisors, containers and their isolation boundaries.'],
  ['systems', 'Databases, Caches, Storage and Messaging', 'Compare relational and non-relational databases, queues, caches, object storage and performance patterns.'],
  ['systems', 'APIs, Integration and Distributed Systems', 'Understand Application Programming Interfaces, service communication, events, consistency, dependencies and failure.'],
  ['systems', 'Systems Administration and Observability', 'Use configuration, patching, logs, metrics, traces and capacity signals to understand operational health.'],

  ['software', 'Product Discovery and Requirements', 'Turn user and business needs into clear requirements, constraints, acceptance criteria and measurable outcomes.'],
  ['software', 'Software Development Life Cycle and Delivery Methods', 'Compare sequential, iterative, Agile, Scrum, Kanban and DevOps approaches across the complete lifecycle.'],
  ['software', 'Software and System Architecture', 'Understand components, interfaces, design patterns, monoliths, microservices and architectural trade-offs.'],
  ['software', 'Source Control, Builds and Dependencies', 'Learn version control, branching, build systems, packages and why dependency choices affect delivery.'],
  ['software', 'Software Quality and Testing', 'Connect unit, integration, system, performance, usability, security and acceptance testing to risk.'],
  ['software', 'Continuous Integration, Delivery, Release and Deployment', 'Understand pipelines, environments, approvals, release strategies, rollback and safe change.'],
  ['software', 'Secure SDLC, DevSecOps and Software Supply Chain', 'Build security requirements, threat modelling, secure coding, automated checks and provenance into delivery.'],
  ['software', 'Software Vulnerability Families and Secure Coding', 'Distinguish memory-safety failures, unsafe input, injection, race conditions, broken access control and insecure design, then connect each weakness to prevention, testing and business impact.'],
  ['software', 'Maintenance, Technical Debt and Secure Retirement', 'Manage support, refactoring, updates, migration, decommissioning and responsible data disposal.'],

  ['security', 'Cybersecurity Goals and Principles', 'Connect confidentiality, integrity, availability, authenticity, accountability, safety, privacy and resilience.'],
  ['security', 'Threat Actors, Motives and Attack Lifecycles', 'Understand adversaries, insiders, common objectives, attack paths and opportunities for defense.'],
  ['security', 'Malware, Ransomware and Unwanted Software', 'Distinguish viruses, worms, Trojans, spyware, rootkits, botnets, ransomware and fileless behavior while connecting delivery, execution, persistence, impact and recovery.'],
  ['security', 'Threats, Vulnerabilities, Exposure and Risk', 'Separate closely related security terms and combine them into realistic business scenarios.'],
  ['security', 'Security Architecture and Design Principles', 'Apply defense in depth, least privilege, separation, secure defaults, resilience and Zero Trust.'],
  ['security', 'Cryptography, Certificates and Key Management', 'Understand encryption, hashing, signatures, Public Key Infrastructure and safe key lifecycles.'],
  ['security', 'Core Security Control Families', 'Map endpoint, network, application, email, data, physical and administrative controls to their purpose.'],
  ['security', 'Security Operations, Detection and Threat Intelligence', 'Connect telemetry, alerts, Security Information and Event Management, endpoint detection, hunting and intelligence.'],
  ['security', 'Detection Engineering, Telemetry and Coverage Validation', 'Turn threat hypotheses into observable behavior, reliable telemetry, tested analytics, analyst decisions and measured detection coverage.'],
  ['security', 'EDR, NDR, XDR and Detection Technology Landscape', 'Understand where endpoint, network and extended detection capabilities sit, which signals they use and how teams operate them.'],
  ['security', 'SIEM, SOAR and Security Analytics Platforms', 'See how Security Information and Event Management and Security Orchestration, Automation and Response collect, correlate and act on evidence.'],
  ['security', 'Firewalls, WAFs, Proxies and Secure Gateways', 'Compare network firewalls, Web Application Firewalls, proxies, secure web gateways and their deployment boundaries.'],
  ['security', 'Email, DNS, Browser and Collaboration Security', 'Trace common human-facing attack paths and the layered controls that filter, isolate, authenticate and investigate them.'],
  ['security', 'DLP, CASB, SSE and SASE Data-Protection Controls', 'Place Data Loss Prevention, Cloud Access Security Brokers, Security Service Edge and Secure Access Service Edge in a modern architecture.'],
  ['security', 'Exposure Management, ASM, BAS and Control Validation', 'Connect attack-surface management, breach-and-attack simulation and continuous validation to remediation decisions.'],
  ['security', 'Incident Response, Digital Forensics and Recovery', 'Move from preparation and triage through containment, investigation, recovery and organizational learning.'],
  ['security', 'Social Engineering, Security Awareness and Human Risk', 'Understand manipulation, usable security, reporting culture, physical behavior and human-centered controls.'],

  ['identity', 'Digital Identity, Directories and the Identity Lifecycle', 'Follow identity proofing, accounts, attributes, directories and lifecycle states for people and machines.'],
  ['identity', 'Authentication and Authenticators', 'Compare passwords, multifactor authentication, passkeys, biometrics, sessions and account recovery.'],
  ['identity', 'Password Attacks, Offline Cracking and Authentication Defense', 'Distinguish wordlists, brute force, rainbow tables, offline hash cracking, online guessing, spraying and credential stuffing while designing safer authentication and authorized tests.'],
  ['identity', 'Authorization and Access-Control Models', 'Compare role-based, attribute-based, rule-based and discretionary access decisions.'],
  ['identity', 'Federation, Single Sign-On and Identity Protocols', 'Understand directories, Kerberos, Security Assertion Markup Language, OAuth and OpenID Connect at a practical level.'],
  ['identity', 'Privileged, Service and Machine Identity Security', 'Protect administrator accounts, secrets, keys, workloads and other non-human identities.'],
  ['identity', 'Identity Governance and Administration', 'Operate joiner-mover-leaver processes, ownership, segregation of duties, reviews and certification.'],
  ['identity', 'Identity Threats and Zero-Trust Access', 'Recognize credential attacks, session theft, misuse, adaptive access and identity-centered detection.'],

  ['vapt', 'Ethics, Authorization, Scope and Rules of Engagement', 'Define permission, boundaries, stop conditions, safety, evidence handling and communication before any test.'],
  ['vapt', 'Reconnaissance, Attack Surfaces and Testing Methodology', 'Use discovery, enumeration, threat modelling and prioritization to plan an ethical assessment.'],
  ['vapt', 'Vulnerability Management Lifecycle', 'Connect discovery, validation, scoring, business priority, remediation, exceptions and verification.'],
  ['vapt', 'Network, Host and Wireless Security Testing', 'Understand assessment concepts for infrastructure, services, configurations and wireless environments.'],
  ['vapt', 'Web, API and Mobile Application Testing', 'Assess authentication, access control, input handling, sessions, business logic and client risks.'],
  ['vapt', 'Cloud, Container and Infrastructure-as-Code Testing', 'Examine identity, exposed services, images, orchestration, configurations and deployment templates.'],
  ['vapt', 'Safe Exploitation Validation and Post-Exploitation Concepts', 'Prove impact safely, understand privilege and movement, preserve evidence and clean up completely.'],
  ['vapt', 'Reporting, Remediation, Retesting and Collaborative Testing', 'Turn evidence into clear findings, practical fixes, verified closure and purple-team learning.'],

  ['cloud', 'Cloud Fundamentals and Shared Responsibility', 'Compare service and deployment models, elasticity, consumption economics and changing responsibility boundaries.'],
  ['cloud', 'Cloud Architecture, Landing Zones and Governance', 'Organize accounts, subscriptions, networks, identity, guardrails and hybrid or multi-cloud design.'],
  ['cloud', 'Cloud Workload, Data and Security Posture', 'Manage configuration, logging, keys, storage, workloads and posture across a cloud estate.'],
  ['cloud', 'Containers, Kubernetes, Serverless and Edge Platforms', 'Understand modern execution models, orchestration, isolation and operating concerns.'],
  ['cloud', 'Infrastructure as Code and Platform Engineering', 'Create repeatable infrastructure, policy as code and paved paths for safe developer autonomy.'],
  ['cloud', 'Reliability Engineering, High Availability and Disaster Recovery', 'Use service objectives, redundancy, failure design, backups, recovery and testing to build resilience.'],
  ['cloud', 'Business Continuity and Crisis Management', 'Connect critical services, impact analysis, continuity strategies, exercises and dependency failure.'],

  ['data-ai', 'Data Lifecycle, Classification and Protection', 'Follow data through creation, use, sharing, retention, archival, destruction and proportionate safeguards.'],
  ['data-ai', 'Data Architecture, Quality, Lineage and Governance', 'Understand pipelines, warehouses, lakes, ownership, catalogues, quality and traceability.'],
  ['data-ai', 'Privacy Engineering and De-Identification', 'Apply data minimization, purpose limitation, anonymization, pseudonymization and privacy by design.'],
  ['data-ai', 'Data Modeling, Relational and Non-Relational Databases', 'Model entities, relationships and access patterns, then choose storage technology based on consistency, scale and use.'],
  ['data-ai', 'Data Pipelines, ETL, ELT, Streaming and Integration', 'Understand how data is extracted, transformed, validated, moved in batches or streams and monitored end to end.'],
  ['data-ai', 'Warehouses, Lakes, Lakehouses and Analytical Platforms', 'Compare common analytical architectures, their governance boundaries, cost patterns and ideal workloads.'],
  ['data-ai', 'Analytics, BI, Metrics and Experimentation', 'Move from a question to trustworthy metrics, dashboards, analysis, experiments, interpretation and action.'],
  ['data-ai', 'Master Data, Metadata, Catalogues and Data Products', 'Understand shared business entities, ownership, discoverability, semantic consistency and data-as-a-product practices.'],
  ['data-ai', 'Artificial Intelligence and Machine Learning Foundations', 'Understand data, training, inference, models, evaluation and lifecycle roles without the hype.'],
  ['data-ai', 'Machine Learning Types, Training, Features and Inference', 'Compare supervised, unsupervised and reinforcement learning while tracing features, training, validation and live predictions.'],
  ['data-ai', 'Neural Networks, Deep Learning and Foundation Models', 'Build an intuitive model of neural networks, embeddings, transformers and large reusable models without hiding their limits.'],
  ['data-ai', 'Natural Language Processing, Computer Vision and Multimodal AI', 'Understand how systems work with language, images, audio, video and structured data, and why each modality needs task-specific evaluation.'],
  ['data-ai', 'Responsible AI, AI Governance and AI Security', 'Connect fairness, transparency, robustness, accountability, model risk and adversarial threats.'],
  ['data-ai', 'Generative AI, Large Language Models, Retrieval and Agents', 'Learn how generation, retrieval-augmented systems and agentic workflows work and fail.'],
  ['data-ai', 'AI System Architecture: Context, Retrieval, Tools and Memory', 'Place prompts, system instructions, vector stores, tool calls, memory, policy controls and human review in one architecture.'],
  ['data-ai', 'AI Evaluation, Benchmarks, Red Teaming and Guardrails', 'Evaluate usefulness, correctness, safety, bias, robustness and cost before and after an AI system reaches users.'],
  ['data-ai', 'MLOps, LLMOps, Model Monitoring and Incident Response', 'Operate data, experiments, models, prompts and agents with versioning, deployment, observability, rollback and learning.'],
  ['data-ai', 'AI Agents, Orchestration and Human Oversight', 'Understand planning, tools, permissions, memory and autonomy boundaries, including when a person must review or intervene.'],
  ['data-ai', 'AI Security Threats and Secure Deployment Patterns', 'Map data poisoning, model theft, prompt injection, tool abuse, leakage and supply-chain risks to layered controls.'],
  ['data-ai', 'AI Product Strategy, Economics and Adoption', 'Decide whether an AI use case creates enough value, has usable data, can be evaluated and fits the operating model.'],
  ['data-ai', 'AI History, Pioneers, Labs and Technology Ecosystem', 'Follow major ideas, researchers, institutions, open communities, model developers, infrastructure providers and application layers.'],
  ['data-ai', 'Internet of Things, Operational Technology, Robotics and Digital Twins', 'Connect computing to physical processes, safety, lifecycle and cyber-physical risk.'],
  ['data-ai', 'Emerging Technology and Horizon Scanning', 'Evaluate distributed ledgers, quantum technology, spatial computing and advanced connectivity without chasing hype.'],
  ['data-ai', 'Blockchain and Distributed Ledger Technology', 'Understand shared ledgers, blocks, hashes, consensus, smart contracts, wallets, oracles, finality and when a conventional database is the better choice.'],
  ['data-ai', 'Quantum Computing and Post-Quantum Cryptography', 'Learn qubits, superposition, entanglement, useful problem classes, limitations, cryptographic impact and migration through cryptographic agility.'],
  ['data-ai', 'Robotics, Autonomous Systems and Drones', 'Connect perception, localization, planning, control, actuation, safe states and accountable human supervision.'],
  ['data-ai', 'Digital Twins and Cyber-Physical Systems', 'Connect a physical asset, telemetry, model, simulation and control feedback while testing synchronization and model validity.'],
  ['data-ai', 'Edge Computing, 5G and Connected Environments', 'Place computing near physical activity to manage latency, bandwidth, disconnected operation, data locality and a wider attack surface.'],
  ['data-ai', 'Spatial Computing, Augmented and Virtual Reality', 'Understand spatial mapping, sensors, immersive interaction, privacy, safety, accessibility and the difference between AR, VR and XR.'],

  ['grc', 'Governance, Accountability and Policy Systems', 'Understand boards, management, ownership, policy hierarchy, committees and the Three Lines Model.'],
  ['grc', 'Enterprise, Technology and Cyber Risk Management', 'Move from context and identification through treatment, acceptance, monitoring and informed decision.'],
  ['grc', 'Risk Foundations, Taxonomies, Appetite and Tolerance', 'Separate uncertainty, event, cause, consequence, appetite, tolerance, capacity, velocity and interconnected risk.'],
  ['grc', 'Scenario Analysis, Stress Testing and Risk Quantification', 'Build decision-useful scenarios, estimate ranges, test assumptions and communicate uncertainty without false precision.'],
  ['grc', 'Business Continuity, Disaster Recovery and Crisis Management', 'Connect critical services, impact analysis, continuity strategies, technical recovery, crisis decisions and exercises.'],
  ['grc', 'Model Risk, Decision Risk and Independent Validation', 'Govern models and automated decisions through purpose, limitations, validation, monitoring, challenge and retirement.'],
  ['grc', 'Insurance, Risk Transfer and Treatment Economics', 'Compare avoidance, reduction, transfer and acceptance while considering incentives, exclusions and residual exposure.'],
  ['grc', 'Operational, Financial, Conduct, Project and Reputational Risk', 'Understand major enterprise risk families, their owners, interactions, indicators and consequences.'],
  ['grc', 'Control Design, Operation, Testing and Evidence', 'Distinguish control intent, implementation, operation, evidence and effectiveness.'],
  ['grc', 'Laws, Regulations, Contracts and Compliance Obligations', 'Understand how obligations arise, differ by jurisdiction and translate into organizational action.'],
  ['grc', 'Audit, Assurance, Attestation and Certification', 'Compare their purpose, independence, scope, evidence, sampling, findings and limitations.'],
  ['grc', 'Internal Audit Planning, Engagements, Findings and Follow-Up', 'Follow an internal audit function and engagement from mandate and risk-based planning through evidence, reporting, action validation and quality improvement.'],
  ['grc', 'SOX, ICFR, ITGC and Application Controls', 'Connect Sarbanes-Oxley financial-reporting obligations to scoping, entity and business-process controls, technology dependencies, testing and deficiency evaluation.'],
  ['grc', 'Framework and Standards Navigator', 'Relate International Organization for Standardization, NIST, COBIT, ITIL, CIS and sector standards.'],
  ['grc', 'ISO/IEC 27001:2022 Self-Study Handbook', 'Follow a complete zero-to-exam-ready route through the ISMS requirements, risk treatment, Statement of Applicability, all 93 Annex A controls, evidence, audit and a practical capstone.'],
  ['grc', 'Privacy and Data-Protection Governance', 'Connect lawful processing, rights, records, impact assessments, incidents and international transfers.'],
  ['grc', 'Third-Party and Supply-Chain Risk', 'Manage due diligence, contracts, monitoring, concentration, fourth parties, resilience and exit.'],
  ['grc', 'Operational Resilience and Cyber-Crisis Governance', 'Protect important services through tolerances, scenarios, executive decisions and coordinated response.'],
  ['grc', 'Metrics, Maturity, Culture and Executive Reporting', 'Use performance and risk indicators, maturity models, dashboards, incentives and ethical reporting well.'],

  ['industries', 'Financial Services', 'Explore banking, payments, capital markets, insurance and fintech processes, systems, risks and institutions.'],
  ['industries', 'Manufacturing and Industrial Operations', 'Explore plants, supply chains, operational technology, safety, quality and production continuity.'],
  ['industries', 'Healthcare and Life Sciences', 'Explore care delivery, health data, medical devices, laboratories, pharmaceuticals and patient safety.'],
  ['industries', 'Retail, E-commerce and Consumer Services', 'Explore merchandising, payments, customer data, platforms, fraud and seasonal resilience.'],
  ['industries', 'Government, Public Services, Education and Nonprofits', 'Explore public trust, citizen services, constrained resources, accessibility and national obligations.'],
  ['industries', 'Telecommunications, Media and Entertainment', 'Explore network infrastructure, subscribers, content, spectrum, platforms and large-scale availability.'],
  ['industries', 'Energy, Utilities and Critical Infrastructure', 'Explore generation, transmission, industrial control, safety, reliability and national importance.'],
  ['industries', 'Transportation, Logistics, Aviation, Automotive and Maritime', 'Explore connected fleets, routing, safety, global supply chains and operational continuity.'],
  ['industries', 'Technology, SaaS and Professional Services', 'Explore multi-tenant platforms, client delivery, intellectual property and shared infrastructure.'],

  ['professional', 'Social Skills and Professional Presence', 'Build confidence, warmth, boundaries, etiquette, body language and natural conversation.'],
  ['professional', 'Listening, Empathy, Conflict and Cross-Cultural Communication', 'Understand people accurately, respond constructively and repair misunderstanding.'],
  ['professional', 'Networking and Long-Term Relationship Building', 'Use thoughtful outreach, events, follow-up, reciprocity and maintenance to build real relationships.'],
  ['professional', 'Professional Writing and Executive Communication', 'Write useful email, chat, reports, summaries and recommendations for the audience that must act.'],
  ['professional', 'Presentation, Storytelling, Facilitation and Public Speaking', 'Structure ideas, design visuals, deliver with clarity and handle questions without losing the room.'],
  ['professional', 'Leadership, Teamwork, Delegation and Feedback', 'Create clarity, trust, ownership, coaching, effective meetings and influence without authority.'],
  ['professional', 'Negotiation and Stakeholder Management', 'Work with interests, alternatives, trade-offs, objections and difficult conversations to reach durable agreements.'],
  ['professional', 'General Interviews, Case Reasoning and Insightful Questions', 'Prepare evidence, reason aloud, handle uncertainty, structure cases and ask genuinely useful questions.'],

  ['organizations', 'How the Global Institution Ecosystem Works', 'Distinguish regulators, standards bodies, agencies, associations, certification bodies and commercial companies.'],
  ['organizations', 'Internet and Technical Standards Organizations', 'Understand ISO, IEC, IETF, IEEE, W3C, ICANN, 3GPP and how their outputs differ.'],
  ['organizations', 'Cybersecurity Agencies and Community Organizations', 'Know NIST, CISA, ENISA, national response teams, CIS, MITRE, OWASP, FIRST and CSA.'],
  ['organizations', 'Governance, Audit and Professional Bodies', 'Know ISACA, ISC2, IIA, AICPA, IFAC, CompTIA, SANS Institute and GIAC in context.'],
  ['organizations', 'Privacy, Data and AI Institutions', 'Understand privacy regulators, data-protection boards, OECD, UNESCO and AI safety institutions.'],
  ['organizations', 'Financial, Banking and Payment Institutions', 'Know BIS, BCBS, FATF, IMF, World Bank, IOSCO, SWIFT, PCI SSC and national regulators.'],
  ['organizations', 'Sector Regulators and Industry Alliances', 'Map healthcare, energy, industrial, automotive, telecom, aviation and maritime bodies.'],
  ['organizations', 'Major Technology Ecosystem Map', 'Navigate widely encountered cloud, enterprise, network, security, data and artificial intelligence providers neutrally.'],
];

const featureSlugs = new Set([
  'business-to-technology-map',
  'network-foundations-and-protocol-models',
  'software-development-life-cycle-and-delivery-methods',
  'cybersecurity-goals-and-principles',
  'digital-identity-directories-and-the-identity-lifecycle',
  'security-operations-detection-and-threat-intelligence',
  'detection-engineering-telemetry-and-coverage-validation',
  'enterprise-technology-and-cyber-risk-management',
  'internal-audit-planning-engagements-findings-and-follow-up',
  'sox-icfr-itgc-and-application-controls',
  'iso-iec-27001-2022-self-study-handbook',
  'artificial-intelligence-and-machine-learning-foundations',
  'linux-users-groups-and-file-permissions',
  'emerging-technology-and-horizon-scanning',
  'financial-services',
  'manufacturing-and-industrial-operations',
  'social-skills-and-professional-presence',
  'how-the-global-institution-ecosystem-works',
]);

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const subtrackLabels: Record<LegacyCategoryKey, string> = {
  start: 'Getting oriented',
  business: 'Business, product & operations',
  foundations: 'Computing foundations',
  systems: 'Networks, infrastructure & operations',
  software: 'Software delivery',
  security: 'Security foundations & defense',
  identity: 'Identity & access',
  vapt: 'VAPT & application security',
  cloud: 'Cloud & platform engineering',
  'data-ai': 'Data, AI & emerging technology',
  grc: 'Governance, risk & assurance',
  industries: 'Industry domain',
  professional: 'Professional capability',
  organizations: 'Institution & market ecosystem',
};

function resolvePillar(category: LegacyCategoryKey, title: string): CategoryKey {
  if (category === 'start') return 'orientation';
  if (category === 'business') return 'business';
  if (category === 'foundations' || category === 'systems') return 'systems';
  if (category === 'software') return 'software';
  if (category === 'cloud') return 'cloud';
  if (category === 'security' || category === 'identity' || category === 'vapt') return 'cyber';
  if (category === 'data-ai') {
    if (/(Internet of Things|Operational Technology|Emerging Technology|Blockchain|Distributed Ledger|Quantum|Robotics|Autonomous Systems|Drones|Digital Twins|Cyber-Physical|Edge Computing|5G|Spatial Computing|Augmented|Virtual Reality)/.test(title)) return 'emerging';
    return /(Artificial Intelligence|Machine Learning|Neural Networks|Deep Learning|Natural Language Processing|Computer Vision|Multimodal AI|Responsible AI|Generative AI|^AI |MLOps|LLMOps)/.test(title) ? 'ai' : 'data';
  }
  if (category === 'grc') return /(Risk|Resilience|Continuity|Crisis|Insurance|Scenario|Stress Testing)/.test(title) ? 'risk' : 'governance';
  if (category === 'industries') return 'industries';
  if (category === 'professional') return 'people';
  return 'ecosystem';
}

export const topics: Topic[] = raw.map(([legacyCategory, title, summary], index) => {
  const slug = slugify(title);
  const depth: Topic['depth'] = index < 24 ? 'Foundation' : index % 5 === 0 ? 'Advanced' : 'Applied';
  const category = resolvePillar(legacyCategory, title);
  return {
    id: `RH-${String(index + 1).padStart(3, '0')}`,
    slug,
    title,
    category,
    categoryLabel: categories[category].label,
    subtrack: subtrackLabels[legacyCategory],
    summary,
    readTime: 10 + (index % 5) * 4,
    depth,
    featured: featureSlugs.has(slug),
  };
});

export const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export function topicsForCategory(category: CategoryKey) {
  return topics.filter((topic) => topic.category === category);
}
