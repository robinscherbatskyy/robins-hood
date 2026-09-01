import { assurancePillarsContent } from './pillar-content-assurance';
import { pillarDrafts } from './pillar-content-human';
import { consolidatedTechnicalPillars } from './pillar-content-technical';

export type PillarCategory = 'business' | 'systems' | 'software' | 'cloud' | 'data' | 'ai' | 'emerging' | 'cyber' | 'governance' | 'risk' | 'people';

export type PillarGuide = {
  slug: string;
  category: PillarCategory;
  number: string;
  title: string;
  subtitle: string;
  question: string;
  purpose: string;
  readTime: number;
  accent: string;
  flowIntro?: string;
  flow: Array<{ label: string; detail?: string }>;
  chapters: Array<{ title: string; body: string }>;
  terms: Array<{ term: string; expansion?: string; meaning: string }>;
  caseStudy: { title: string; classification?: string; context: string; steps: string[]; decisions?: string[]; decisionGuidance?: string[]; lesson: string };
  misconceptions: Array<{ belief: string; correction: string }>;
  relatedPillars: Array<{ slug: string; title: string; relationship: string }>;
  providerCategories?: Array<{ category: string; purpose: string; examples: readonly string[] }>;
  providerNote?: string;
  pioneers?: Array<{ name: string; context: string }>;
  sources: Array<{ label: string; url: string }>;
};

type PillarMeta = Pick<PillarGuide, 'slug' | 'category' | 'number' | 'subtitle' | 'question' | 'readTime' | 'accent' | 'sources'>;

const slugByPillar = {
  business: 'business-product-operations', systems: 'systems-infrastructure', software: 'software-sdlc-delivery', cloud: 'cloud-resilience', data: 'data-analytics',
  ai: 'artificial-intelligence', emerging: 'emerging-technology', cyber: 'cybersecurity-identity-vapt', governance: 'governance-compliance-assurance', risk: 'enterprise-risk-resilience', people: 'people-professional-capability',
} as const;

const titleByPillar = {
  business: 'Business, Product & Operations', systems: 'Systems & Infrastructure', software: 'Software, SDLC & Delivery', cloud: 'Cloud & Resilience', data: 'Data & Analytics',
  ai: 'Artificial Intelligence & Emerging Technology', emerging: 'Artificial Intelligence & Emerging Technology', cyber: 'Cybersecurity, Identity & VAPT', governance: 'Governance, Compliance & Assurance', risk: 'Enterprise Risk & Resilience', people: 'People & Professional Capability',
} as const;

const sources = {
  business: [
    { label: 'OECD guidance on corporate governance', url: 'https://www.oecd.org/corporate/principles-corporate-governance/' },
    { label: 'Association for Project Management Body of Knowledge', url: 'https://www.apm.org.uk/body-of-knowledge/' },
    { label: 'ITIL service management overview', url: 'https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1' },
  ],
  systems: [
    { label: 'Internet Engineering Task Force standards', url: 'https://www.ietf.org/standards/' },
    { label: 'NIST Computer Security Resource Center', url: 'https://csrc.nist.gov/' },
    { label: 'Linux Foundation learning resources', url: 'https://www.linuxfoundation.org/resources' },
  ],
  software: [
    { label: 'NIST Secure Software Development Framework', url: 'https://csrc.nist.gov/Projects/ssdf' },
    { label: 'OWASP Software Assurance Maturity Model', url: 'https://owaspsamm.org/' },
    { label: 'Agile Manifesto', url: 'https://agilemanifesto.org/' },
  ],
  cloud: [
    { label: 'NIST Cloud Computing Program', url: 'https://www.nist.gov/programs-projects/nist-cloud-computing-program-nccp' },
    { label: 'Cloud Security Alliance guidance', url: 'https://cloudsecurityalliance.org/research/guidance' },
    { label: 'Cloud Native Computing Foundation', url: 'https://www.cncf.io/' },
  ],
  data: [
    { label: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
    { label: 'DAMA International resources', url: 'https://www.dama.org/' },
    { label: 'W3C data activity', url: 'https://www.w3.org/groups/activity/data/' },
  ],
  ai: [
    { label: 'NIST Artificial Intelligence Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    { label: 'Stanford Artificial Intelligence Index', url: 'https://hai.stanford.edu/ai-index' },
    { label: 'OECD Artificial Intelligence Principles', url: 'https://oecd.ai/en/ai-principles' },
  ],
  emerging: [
    { label: 'NIST Post-Quantum Cryptography project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
    { label: 'NIST Cybersecurity for the Internet of Things program', url: 'https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program' },
    { label: 'International Electrotechnical Commission emerging technology resources', url: 'https://www.iec.ch/emerging-technologies' },
  ],
  cyber: [
    { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
    { label: 'MITRE ATT&CK knowledge base', url: 'https://attack.mitre.org/' },
    { label: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
    { label: 'CISA cybersecurity resources', url: 'https://www.cisa.gov/topics/cybersecurity-best-practices' },
  ],
  governance: [
    { label: 'The IIA Three Lines Model', url: 'https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/' },
    { label: 'ISACA COBIT resources', url: 'https://www.isaca.org/resources/cobit' },
    { label: 'ISO management system standards', url: 'https://www.iso.org/management-system-standards.html' },
  ],
  risk: [
    { label: 'ISO 31000 risk management overview', url: 'https://www.iso.org/iso-31000-risk-management.html' },
    { label: 'NIST risk management resources', url: 'https://csrc.nist.gov/projects/risk-management' },
    { label: 'World Economic Forum Global Risks', url: 'https://www.weforum.org/publications/global-risks-report-2026/' },
  ],
  people: [
    { label: 'Harvard Program on Negotiation', url: 'https://www.pon.harvard.edu/' },
    { label: 'Toastmasters public speaking resources', url: 'https://www.toastmasters.org/resources' },
    { label: 'PMI power skills resources', url: 'https://www.pmi.org/learning/thought-leadership/power-skills' },
  ],
} satisfies Record<PillarCategory, Array<{ label: string; url: string }>>;

const meta: Record<PillarCategory, PillarMeta> = {
  business: { slug: slugByPillar.business, category: 'business', number: '01', subtitle: 'Trace value from customer need through strategy, operations, economics, delivery, adoption, and measurable benefit.', question: 'How does an organization turn a real need into sustainable value?', readTime: 18, accent: 'blue', sources: sources.business },
  systems: { slug: slugByPillar.systems, category: 'systems', number: '02', subtitle: 'Understand the compute, operating systems, networks, storage, identity, configuration, and operations beneath every digital service.', question: 'What actually has to work for a digital service to work?', readTime: 18, accent: 'violet', sources: sources.systems },
  software: { slug: slugByPillar.software, category: 'software', number: '03', subtitle: 'Follow software from discovery and design through build, testing, release, operation, maintenance, and retirement.', question: 'How does a need become dependable software and stay dependable?', readTime: 19, accent: 'indigo', sources: sources.software },
  cloud: { slug: slugByPillar.cloud, category: 'cloud', number: '04', subtitle: 'Use cloud platforms deliberately through shared responsibility, governed foundations, resilience, recovery, and cost judgment.', question: 'How do on-demand platforms change architecture, responsibility, and failure?', readTime: 18, accent: 'sky', sources: sources.cloud },
  data: { slug: slugByPillar.data, category: 'data', number: '05', subtitle: 'Turn recorded events into trustworthy information through meaning, quality, lineage, analysis, privacy, and lifecycle control.', question: 'How does raw data become information people can safely use?', readTime: 19, accent: 'teal', sources: sources.data },
  ai: { slug: slugByPillar.ai, category: 'ai', number: '06', subtitle: 'Understand traditional AI, machine learning, generative systems and agents, then evaluate blockchain, quantum, robotics, connected devices and other frontier technologies with the same evidence-first discipline.', question: 'How do intelligent and emerging technologies become useful, reliable, governable and worth adopting?', readTime: 42, accent: 'rose', sources: [...sources.ai, ...sources.emerging] },
  emerging: { slug: slugByPillar.emerging, category: 'emerging', number: '07', subtitle: 'Evaluate blockchain, quantum, connected devices, industrial systems, robotics, digital twins, edge and spatial computing without chasing novelty.', question: 'When is an emerging technology ready to solve a real problem responsibly?', readTime: 21, accent: 'lime', sources: sources.emerging },
  cyber: { slug: slugByPillar.cyber, category: 'cyber', number: '07', subtitle: 'Connect security principles to identity, architecture, defensive operations, VAPT, incident response and recovery.', question: 'How do people protect valuable outcomes from misuse, disruption, manipulation and loss?', readTime: 22, accent: 'cyan', sources: sources.cyber },
  governance: { slug: slugByPillar.governance, category: 'governance', number: '08', subtitle: 'Create accountable direction, workable policy and controls, credible evidence, assurance, compliance, privacy and oversight.', question: 'Who decides, who owns, what must happen and how do we know it did?', readTime: 22, accent: 'amber', sources: sources.governance },
  risk: { slug: slugByPillar.risk, category: 'risk', number: '09', subtitle: 'Make uncertainty actionable through scenarios, appetite, treatment, third-party thinking, continuity and operational resilience.', question: 'How should an organization pursue value when the future is uncertain?', readTime: 22, accent: 'orange', sources: sources.risk },
  people: { slug: slugByPillar.people, category: 'people', number: '10', subtitle: 'Build social skill, communication, networking, presenting, leadership, negotiation, interviewing and live reasoning.', question: 'How do you turn knowledge into trust, influence, clear decisions and professional growth?', readTime: 20, accent: 'purple', sources: sources.people },
};

const platformExamples: Partial<Record<PillarCategory, NonNullable<PillarGuide['providerCategories']>>> = {
  business: [
    { category: 'Enterprise resource planning', purpose: 'Connect finance, purchasing, inventory, production and other core operating records.', examples: ['SAP S/4HANA', 'Oracle Fusion Cloud ERP', 'Microsoft Dynamics 365'] },
    { category: 'Customer and service operations', purpose: 'Manage customer relationships, cases, sales activity, service commitments and workflow.', examples: ['Salesforce', 'ServiceNow', 'HubSpot'] },
    { category: 'Work and portfolio delivery', purpose: 'Plan products, projects, dependencies, capacity, decisions and delivery evidence.', examples: ['Jira', 'Azure DevOps', 'Asana', 'Monday.com'] },
    { category: 'Business intelligence', purpose: 'Turn governed operational data into measures, trends, forecasts and decision views.', examples: ['Microsoft Power BI', 'Tableau', 'Looker'] },
  ],
  systems: [
    { category: 'Operating systems', purpose: 'Manage hardware resources, processes, memory, files, users, services and device interaction.', examples: ['Red Hat Enterprise Linux', 'Ubuntu', 'Windows Server'] },
    { category: 'Virtualization and containers', purpose: 'Isolate and schedule workloads across shared compute while standardizing deployment.', examples: ['VMware vSphere', 'Kubernetes', 'Docker', 'Red Hat OpenShift'] },
    { category: 'Infrastructure automation', purpose: 'Describe, configure and repeat infrastructure changes with reviewable definitions.', examples: ['Ansible', 'Terraform', 'OpenTofu', 'Puppet'] },
    { category: 'Observability and operations', purpose: 'Collect metrics, logs and traces, visualize behavior and coordinate response.', examples: ['Prometheus', 'Grafana', 'Datadog', 'Dynatrace'] },
  ],
  software: [
    { category: 'Source and delivery platforms', purpose: 'Manage code, review, work tracking, automated build, release and provenance.', examples: ['GitHub', 'GitLab', 'Azure DevOps', 'Bitbucket'] },
    { category: 'Continuous integration and delivery', purpose: 'Build, test, package, approve and deploy repeatable software changes.', examples: ['GitHub Actions', 'Jenkins', 'GitLab CI/CD', 'Argo CD'] },
    { category: 'Code quality and application security', purpose: 'Analyze source, dependencies, secrets, infrastructure definitions and running applications.', examples: ['SonarQube', 'Semgrep', 'Snyk', 'Checkmarx', 'Veracode'] },
    { category: 'Reliability and product telemetry', purpose: 'Connect releases to errors, performance, user behavior and operational outcomes.', examples: ['Sentry', 'Datadog', 'New Relic', 'OpenTelemetry'] },
  ],
  cloud: [
    { category: 'Public cloud platforms', purpose: 'Provide managed compute, storage, networking, identity, data, integration and application services.', examples: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud'] },
    { category: 'Cloud foundations and policy', purpose: 'Create repeatable accounts, networks, identity boundaries, policy and infrastructure definitions.', examples: ['Terraform', 'OpenTofu', 'AWS Control Tower', 'Azure Policy'] },
    { category: 'Containers and platform engineering', purpose: 'Schedule portable workloads and provide paved paths for development teams.', examples: ['Kubernetes', 'Red Hat OpenShift', 'Backstage', 'Argo CD'] },
    { category: 'Reliability and cost management', purpose: 'Observe service health, test objectives, allocate consumption and manage cloud economics.', examples: ['Grafana Cloud', 'Datadog', 'CloudHealth', 'Apptio Cloudability'] },
  ],
  data: [
    { category: 'Operational databases and warehouses', purpose: 'Store transactional state or analytical history using defined models and access patterns.', examples: ['PostgreSQL', 'Microsoft SQL Server', 'Snowflake', 'Google BigQuery'] },
    { category: 'Lakehouse and processing', purpose: 'Combine scalable storage, engineering, analytics and Machine Learning workloads.', examples: ['Databricks', 'Apache Spark', 'Amazon Redshift'] },
    { category: 'Pipelines and transformation', purpose: 'Move, schedule, test and transform data into reusable governed datasets.', examples: ['Apache Airflow', 'dbt', 'Fivetran', 'Azure Data Factory'] },
    { category: 'Catalog, quality and lineage', purpose: 'Discover data, assign ownership, trace movement, manage definitions and test quality.', examples: ['Microsoft Purview', 'Collibra', 'Alation', 'Informatica'] },
  ],
  people: [
    { category: 'Communication and collaboration', purpose: 'Support meetings, shared work, facilitation and distributed team coordination.', examples: ['Microsoft Teams', 'Slack', 'Zoom', 'Miro'] },
    { category: 'Presentation and audience interaction', purpose: 'Design a clear narrative, support visual explanation and collect live feedback.', examples: ['Microsoft PowerPoint', 'Canva', 'Mentimeter', 'Slido'] },
    { category: 'Professional presence and relationship management', purpose: 'Maintain a credible profile, learn from communities and follow relationships thoughtfully.', examples: ['LinkedIn', 'Notion', 'Airtable'] },
  ],
};

const platformNote = 'These names illustrate capability categories, not rankings or purchase recommendations. Product scope changes. Verify current features, accessibility, deployment, data handling, integration, licensing, skills and operating effort against the real use case.';

function keyForLabel(label: string): PillarCategory {
  const value = label.toLowerCase();
  if (value.includes('business')) return 'business';
  if (value.includes('system') || value.includes('infrastructure')) return 'systems';
  if (value.includes('software') || value.includes('sdlc')) return 'software';
  if (value.includes('cloud')) return 'cloud';
  if (value.includes('data')) return 'data';
  if (value.includes('emerging') || value.includes('iot') || value.includes('quantum') || value.includes('robot')) return 'emerging';
  if (value.includes('artificial') || value.includes('ai ')) return 'ai';
  if (value.includes('cyber') || value.includes('identity')) return 'cyber';
  if (value.includes('governance') || value.includes('compliance')) return 'governance';
  if (value.includes('risk') || value.includes('resilience')) return 'risk';
  return 'people';
}

function related(label: string, relationship: string) {
  const detectedKey = keyForLabel(label);
  const key = detectedKey === 'emerging' ? 'ai' : detectedKey;
  return { slug: slugByPillar[key], title: titleByPillar[key], relationship };
}

function humanPillar(key: keyof typeof pillarDrafts, pillarMeta: PillarMeta): PillarGuide {
  const raw = pillarDrafts[key];
  const flow = 'conversationFlow' in raw ? raw.conversationFlow : raw.lifecycle;
  return {
    ...pillarMeta, title: raw.title, purpose: raw.purpose,
    flow: flow.map((label) => ({ label })),
    chapters: raw.sections.map((section) => ({ title: section.title, body: section.body })),
    terms: raw.terms.map((item) => ({ term: item.term, expansion: 'fullForm' in item ? item.fullForm : undefined, meaning: item.definition })),
    caseStudy: { title: raw.example.title, context: raw.example.context, steps: [...raw.example.steps], lesson: raw.example.lesson },
    misconceptions: raw.misconceptions.map((item) => ({ belief: item.claim, correction: item.correction })),
    relatedPillars: raw.relatedPillars.map((item) => related(item.id, item.reason)),
    pioneers: 'history' in raw ? raw.history.map((item) => ({ name: item.name, context: item.context })) : undefined,
    providerCategories: platformExamples[pillarMeta.category],
    providerNote: platformExamples[pillarMeta.category] ? platformNote : undefined,
  };
}

function artificialIntelligencePillar(pillarMeta: PillarMeta): PillarGuide {
  const base = humanPillar('ai', pillarMeta);
  const emerging = emergingTechnologyPillar(meta.emerging);
  const relatedPillars = [...base.relatedPillars, ...emerging.relatedPillars]
    .filter((item) => item.slug !== pillarMeta.slug)
    .filter((item, index, collection) => collection.findIndex((candidate) => candidate.slug === item.slug) === index);
  return {
    ...base,
    title: 'Artificial Intelligence & Emerging Technology',
    purpose: 'Build a complete mental model of Artificial Intelligence from rules and traditional prediction through Machine Learning, Deep Learning, natural-language systems, generative models and agents. Then use the same outcome, evidence, maturity and lifecycle lens for blockchain, quantum, robotics, connected devices, digital twins, edge and spatial computing. Connect every capability to data, security, governance, economics, people and the operating workflow where its outputs become decisions or physical actions.',
    flowIntro: 'Move from a real outcome to evidence, system design, bounded use and continuous evaluation. Frontier technology earns adoption through proof, not novelty.',
    flow: [
      { label: 'Define the outcome', detail: 'Name the user, decision, action and consequence.' },
      { label: 'Choose the approach', detail: 'Compare rules, models, platforms and simpler alternatives.' },
      { label: 'Build the evidence', detail: 'Establish data, maturity, evaluation and domain validity.' },
      { label: 'Bound the system', detail: 'Set permissions, human oversight, safe states and stop conditions.' },
      { label: 'Test in context', detail: 'Challenge usefulness, failure, security, safety, cost and scale.' },
      { label: 'Operate and govern', detail: 'Monitor outcomes, changes, incidents, suppliers and drift.' },
      { label: 'Expand, revise or stop', detail: 'Use evidence to adopt, constrain, replace or retire.' },
    ],
    chapters: [...base.chapters.slice(0, 7), ...emerging.chapters],
    terms: [
      { term: 'AI', expansion: 'Artificial Intelligence', meaning: 'The broad field of creating computer systems that perform tasks associated with perception, language, learning, reasoning or action.' },
      { term: 'ML', expansion: 'Machine Learning', meaning: 'Methods that learn patterns from examples rather than requiring every rule to be manually written.' },
      { term: 'Deep Learning', meaning: 'Machine Learning using multilayer neural networks to learn complex representations from data.' },
      { term: 'NLP', expansion: 'Natural Language Processing', meaning: 'Methods used to analyze, understand or generate human language.' },
      { term: 'Transformer', meaning: 'A neural-network architecture centered on attention that supports large-scale sequence and multimodal models.' },
      { term: 'Foundation model', meaning: 'A broadly trained model that can support many later tasks through prompting, retrieval, adapters or fine-tuning.' },
      { term: 'LLM', expansion: 'Large Language Model', meaning: 'A foundation model trained to predict and generate language or multimodal token sequences from context.' },
      { term: 'Generative AI', meaning: 'AI that creates new text, images, audio, video, code or other content from learned patterns and current context.' },
      { term: 'RAG', expansion: 'Retrieval-Augmented Generation', meaning: 'A pattern that retrieves relevant approved material and supplies it as context before generation.' },
      { term: 'Grounding', meaning: 'Connecting an output to defined evidence, data or operational state so claims can be checked.' },
      { term: 'AI agent', meaning: 'A system that interprets a goal, plans or selects steps, uses permitted tools and continues within defined stop and approval conditions.' },
      { term: 'AI evaluation', meaning: 'Representative testing of the complete AI system for usefulness, correctness, safety, robustness, cost and context-specific failure.' },
      { term: 'MLOps', expansion: 'Machine Learning Operations', meaning: 'Lifecycle practices for versioning, releasing, observing, responding to and retiring data, models and related system components.' },
      ...emerging.terms,
    ],
    relatedPillars,
    providerCategories: [
      { category: 'Model development and experimentation', purpose: 'Build, train, adapt and evaluate statistical, deep-learning and foundation-model systems.', examples: ['PyTorch', 'TensorFlow', 'Hugging Face', 'scikit-learn'] },
      { category: 'Managed AI and agent platforms', purpose: 'Access models, retrieval, tools, safety controls, evaluations and managed deployment services.', examples: ['OpenAI', 'Microsoft Azure AI', 'Amazon Bedrock', 'Google Vertex AI'] },
      { category: 'Machine Learning operations and observability', purpose: 'Track experiments, versions, releases, performance, drift, cost and incidents across the model lifecycle.', examples: ['MLflow', 'Weights & Biases', 'Arize AI', 'Fiddler AI'] },
      { category: 'Data, retrieval and vector infrastructure', purpose: 'Prepare governed context, search embeddings and connect model outputs to traceable information.', examples: ['Databricks', 'Snowflake', 'Pinecone', 'Weaviate'] },
      { category: 'Connected, physical and frontier systems', purpose: 'Prototype and operate ledgers, robotics, digital twins, edge workloads and quantum experiments.', examples: ['Hyperledger Fabric', 'ROS 2', 'NVIDIA Omniverse', 'IBM Quantum'] },
    ],
    providerNote: 'Provider names are examples of where capabilities may sit, not rankings. Product names and scope change. Validate the deployment model, data use, model behavior, tool permissions, regional availability, lock-in, cost, safety evidence and operating ownership before adoption.',
    sources: pillarMeta.sources,
  };
}

function emergingTechnologyPillar(pillarMeta: PillarMeta): PillarGuide {
  const aiSource = pillarDrafts.ai;
  return {
    ...pillarMeta,
    title: 'Emerging Technology',
    purpose: 'Evaluate new technology through evidence, maturity, domain fit and long-term operating consequences. Separate scientific feasibility from a prototype, a supported product and repeatable organizational value while keeping safety, security, standards, skills, economics, interoperability and exit risk visible.',
    flowIntro: 'A responsible horizon-scanning process turns novelty into a bounded learning decision, then makes adoption or stopping explicit.',
    flow: ['Define the outcome', 'Check scientific evidence', 'Assess product maturity', 'Map dependencies and consequence', 'Run a bounded experiment', 'Compare value and harm', 'Adopt, monitor or stop'].map((label) => ({ label })),
    chapters: [
      { title: aiSource.sections[7].title, body: aiSource.sections[7].body },
      { title: aiSource.sections[8].title, body: aiSource.sections[8].body },
      { title: 'Blockchain and distributed ledgers', body: 'A distributed ledger keeps shared state across several participants using replicated records and an agreed consensus method. Blocks, hashes and digital signatures can make alteration visible, while smart contracts execute defined rules on the ledger. Permissionless networks allow broad participation and usually rely on economic incentives. Permissioned networks restrict participation and governance to known organizations. The design is valuable when several parties need shared state but cannot or should not give one party complete control. It is a poor fit when one accountable organization can operate a normal database more simply. Teams must examine privacy, finality, key custody, oracle trust, throughput, legal responsibility, software upgrade governance, energy or infrastructure cost and how mistakes are corrected.' },
      { title: 'Quantum computing and cryptographic agility', body: 'Quantum computers use qubits and quantum operations to exploit selected physical effects such as superposition and entanglement. They are not faster for every task. Potentially useful areas include some simulation, optimization and cryptographic problems, while error correction, scale and practical advantage remain major constraints. Cryptographic planning matters now because sufficiently capable future systems could threaten widely used public-key methods and because long-lived encrypted data can be captured today. Post-Quantum Cryptography uses algorithms designed to resist known classical and quantum attacks. Organizations should inventory algorithms, certificates, protocols, libraries and long-lived data, then build cryptographic agility so methods can be replaced through tested migration rather than emergency change.' },
      { title: 'Robotics and autonomous systems', body: 'A robot or autonomous system connects sensing, perception, localization, planning, control and actuation in a physical feedback loop. The system must reason with incomplete or noisy observations while remaining inside speed, space, power and safety constraints. Autonomy exists on a spectrum. A person may command every step, supervise exceptions or only define goals. Safe design identifies the operational domain, expected hazards, safe states, emergency stops, human takeover, degraded modes, maintenance, security and evidence needed for assurance. A warehouse robot, drone and surgical robot may share components but have very different consequences and approval requirements. Simulation supports learning, but field tests and operational monitoring are still required.' },
      { title: 'Digital twins and cyber-physical feedback', body: 'A digital twin is a maintained digital representation of a physical asset, process or environment. Telemetry updates the model, analysis or simulation produces insight, and a person or control system may send a change back to the physical world. Value comes from better monitoring, design, maintenance or optimization, not from the label. Model validity, synchronization delay, sensor quality, identity and command authorization determine trust. A stale or simplified twin can produce confident but unsafe recommendations. Teams should define the physical boundary, update frequency, model assumptions, acceptable error, control authority, manual fallback and evidence that the twin still represents reality.' },
      { title: 'Edge, advanced connectivity and spatial computing', body: 'Edge computing places selected processing near a device, user or physical process to reduce latency, preserve bandwidth, keep operating during network loss or satisfy data-location needs. Fifth-generation mobile networks can provide new connectivity patterns, but coverage, slicing, supplier and device assumptions must be validated. Spatial computing combines sensing, mapping and digital content with physical environments through Augmented Reality, Virtual Reality or Extended Reality. These systems collect sensitive location, movement, audio and visual data and can affect attention or physical safety. Architecture decisions should compare edge and central processing, offline behavior, updates, identity, privacy, attack surface, accessibility, content integrity and how the experience fails safely.' },
    ],
    terms: [
      { term: 'DLT', expansion: 'Distributed Ledger Technology', meaning: 'A system in which several participants maintain synchronized records under a shared governance and consensus model.' },
      { term: 'Blockchain', meaning: 'A ledger structure that links batches of records using cryptographic hashes so later alteration becomes visible.' },
      { term: 'Consensus', meaning: 'The method participants use to agree which transactions and state are accepted.' },
      { term: 'Smart contract', meaning: 'Code executed according to a ledger’s rules to update shared state when defined conditions are met.' },
      { term: 'Qubit', meaning: 'A quantum information unit whose state is manipulated through quantum operations and measured to produce classical results.' },
      { term: 'PQC', expansion: 'Post-Quantum Cryptography', meaning: 'Classical cryptographic algorithms designed to resist known attacks from both classical and quantum computers.' },
      { term: 'Cryptographic agility', meaning: 'The ability to inventory and replace cryptographic algorithms, keys, protocols and implementations through controlled change.' },
      { term: 'IoT', expansion: 'Internet of Things', meaning: 'Connected physical devices that sense, process, communicate or act through software and networks.' },
      { term: 'OT', expansion: 'Operational Technology', meaning: 'Hardware and software that monitors or controls physical equipment and processes.' },
      { term: 'PLC', expansion: 'Programmable Logic Controller', meaning: 'A rugged controller used to execute deterministic logic for industrial equipment.' },
      { term: 'SCADA', expansion: 'Supervisory Control and Data Acquisition', meaning: 'Systems that supervise, visualize and collect data from distributed industrial processes.' },
      { term: 'Digital twin', meaning: 'A maintained digital representation linked to a physical asset or process for monitoring, simulation or optimization.' },
      { term: 'Edge computing', meaning: 'Processing placed near the source of data or action rather than only in a distant central platform.' },
      { term: 'AR', expansion: 'Augmented Reality', meaning: 'Digital information overlaid on a view of the physical environment.' },
      { term: 'VR', expansion: 'Virtual Reality', meaning: 'An immersive digitally generated environment presented through specialized interfaces.' },
    ],
    caseStudy: {
      title: 'A manufacturer evaluates a predictive-maintenance digital twin',
      classification: 'Fictional composite',
      context: 'A plant wants to combine equipment sensors, an edge gateway and a digital twin to predict bearing failure without allowing the experimental system to issue unsafe control commands.',
      steps: ['Define the maintenance outcome and current failure cost.', 'Validate sensor quality and the physical assumptions inside the model.', 'Keep control commands outside the pilot and require engineer approval.', 'Test network loss, stale telemetry, wrong predictions and safe manual operation.', 'Compare avoided downtime with lifecycle cost, supplier dependency and security risk.', 'Adopt, revise or stop through an explicit evidence-based gate.'],
      decisions: ['Which physical actions may the system recommend or perform?', 'How stale may the model become before outputs are blocked?', 'Which evidence would justify expansion beyond one line?'],
      lesson: 'The emerging component is only one part of a cyber-physical operating system. Value and safety depend on data, physical assumptions, people, access, recovery and lifecycle ownership.',
    },
    misconceptions: [
      { belief: 'Emerging means ready for production.', correction: 'A field can be important while products, standards, skills and operating evidence remain immature.' },
      { belief: 'Blockchain is a better database.', correction: 'A conventional database is usually simpler when one accountable operator can maintain trusted state.' },
      { belief: 'Quantum computing makes every calculation faster.', correction: 'Quantum advantage is problem-specific and practical systems face large engineering constraints.' },
      { belief: 'Connecting a physical asset automatically makes it smart.', correction: 'Connectivity adds value only when sensing, decisions, control, maintenance and failure behavior are sound.' },
      { belief: 'A successful pilot proves scale.', correction: 'Scale changes reliability, security, support, cost, interoperability, supplier and governance conditions.' },
    ],
    relatedPillars: [
      { slug: slugByPillar.systems, title: titleByPillar.systems, relationship: 'Supplies devices, operating systems, networks, edge compute and observable infrastructure.' },
      { slug: slugByPillar.ai, title: titleByPillar.ai, relationship: 'Provides perception, prediction and language components used inside some emerging systems.' },
      { slug: slugByPillar.cyber, title: titleByPillar.cyber, relationship: 'Protects device identity, software, commands, networks, keys and recovery paths.' },
      { slug: slugByPillar.risk, title: titleByPillar.risk, relationship: 'Frames uncertain benefit, safety, concentration, continuity and reversible experimentation.' },
      { slug: slugByPillar.business, title: titleByPillar.business, relationship: 'Connects novelty to an outcome, operating model, adoption path and full lifecycle economics.' },
    ],
    sources: pillarMeta.sources,
  };
}

function technicalPillar(raw: (typeof consolidatedTechnicalPillars)[number], pillarMeta: PillarMeta): PillarGuide {
  return {
    ...pillarMeta, title: raw.title, purpose: raw.purpose, flowIntro: raw.flow.explanation,
    flow: raw.flow.steps.map((label) => ({ label })),
    chapters: raw.sections.map((section) => ({ title: section.title, body: section.explanation })),
    terms: raw.coreTerms.map((item) => ({ term: item.term, expansion: item.fullForm, meaning: item.meaning })),
    caseStudy: { title: raw.crossDomainExample.title, context: raw.crossDomainExample.scenario, steps: [], lesson: 'The outcome depends on several pillars working as one system. Follow the dependencies, decisions, safeguards, and recovery path rather than isolating one technical component.' },
    misconceptions: raw.misconceptions.map((item) => ({ belief: item.misconception, correction: item.correction })),
    relatedPillars: raw.linkages.map((item) => related(item.pillar, item.connection)),
    providerCategories: platformExamples[pillarMeta.category],
    providerNote: platformExamples[pillarMeta.category] ? platformNote : undefined,
  };
}

function assurancePillar(key: keyof typeof assurancePillarsContent, pillarMeta: PillarMeta): PillarGuide {
  const raw = assurancePillarsContent[key];
  const decisionGuidance: Record<keyof typeof assurancePillarsContent, string[]> = {
    cyber: [
      'Contain immediately because customer records and order integrity are already at risk. Revoke sessions and restrict the workflow while preserving logs, tokens, recovery events and application evidence. Observation is justified only inside a controlled environment where no additional customer harm can occur.',
      'Do not restore the whole queue because the application is available. Reconcile changed shipment rules, exported records, actor sessions and order history against a trusted source. Release validated batches in stages, watch for new anomalies and keep a manual exception route.',
      'Build a verified data-impact matrix covering record type, person, jurisdiction, exposure, consequence and timing. Legal and privacy owners should apply the relevant duties, document uncertainty and update notifications as facts change. Avoid both premature certainty and silent delay.',
    ],
    governance: [
      'Pause the unsafe retrieval feature first, because the defect is bounded and the wider service supports care operations. Pause the whole service only if investigation shows shared access, logging or data-flow weaknesses that cannot be isolated. Record the authority, evidence, customer effect and restart criteria.',
      'Map every promise to its source, scope, owner, control and evidence period. Communicate commitments that are inaccurate, breached or material to the customer decision. Assurance should use only evidence that covers the hosted service, relevant population and stated period.',
      'Residual exposure should be accepted by the business or service leader who owns the affected objective, with privacy, security and legal challenge. State the boundary, compensating controls, monitoring, expiry date, remediation milestone and conditions that force escalation or shutdown.',
    ],
    risk: [
      'Prioritize the end-to-end outcomes inside the impact tolerance: safe warehouse work, trustworthy orders, honest customer promises and payment deadlines. Allow controlled degradation only where later reconciliation is possible. Stop any workaround that creates irreversible safety, inventory, privacy or financial harm.',
      'Use numbered offline batches, dual checks, timestamped stock movement, capped shipment value and a reconciliation owner. Ship only the volume the manual control can verify. A smaller trustworthy flow is preferable to rapid movement that creates unknown inventory and payment positions.',
      'Choose a portfolio, not a slogan: remove the shared identity and network dependency for the most critical path, maintain a tested offline mode for the tolerable period and explicitly accept lower capacity beyond it. Fund the option that changes measured impact-tolerance results, then retest the full service.',
    ],
  };
  return {
    ...pillarMeta, title: raw.title, purpose: raw.purpose,
    flow: raw.flow.map((item) => ({ label: item.label, detail: item.detail })),
    chapters: raw.sections.map((section) => ({ title: section.title, body: section.body })),
    terms: raw.terms.map((item) => ({ term: item.term, expansion: 'expanded' in item ? item.expanded : undefined, meaning: item.meaning })),
    caseStudy: { title: raw.caseStudy.title, classification: raw.caseStudy.classification, context: raw.caseStudy.context, steps: [...raw.caseStudy.sequence], decisions: [...raw.caseStudy.decisions], decisionGuidance: decisionGuidance[key], lesson: raw.caseStudy.outcome },
    misconceptions: raw.misconceptions.map((item) => ({ belief: item.claim, correction: item.correction })),
    relatedPillars: raw.linkedPillars.map((item) => related(item.pillar, item.relationship)),
    providerCategories: raw.providerCategories.map((item) => ({ category: item.category, purpose: item.purpose, examples: item.examples })),
    providerNote: raw.providerNote,
  };
}

export const pillars: PillarGuide[] = [
  humanPillar('business', meta.business),
  technicalPillar(consolidatedTechnicalPillars[0], meta.systems),
  technicalPillar(consolidatedTechnicalPillars[1], meta.software),
  technicalPillar(consolidatedTechnicalPillars[2], meta.cloud),
  technicalPillar(consolidatedTechnicalPillars[3], meta.data),
  artificialIntelligencePillar(meta.ai),
  assurancePillar('cyber', meta.cyber),
  assurancePillar('governance', meta.governance),
  assurancePillar('risk', meta.risk),
  humanPillar('people', meta.people),
];

export const pillarBySlug = new Map(pillars.map((pillar) => [pillar.slug, pillar]));
pillarBySlug.set('artificial-intelligence-emerging-technology', pillars.find((pillar) => pillar.category === 'ai')!);
pillarBySlug.set('emerging-technology', pillars.find((pillar) => pillar.category === 'ai')!);
export const pillarSlugByCategory = new Map(pillars.map((pillar) => [pillar.category, pillar.slug]));
pillarSlugByCategory.set('emerging', slugByPillar.ai);
