export type EvidenceItem = {
  id: string;
  title: string;
  publisher: string;
  type: 'Report' | 'Research index' | 'Threat landscape' | 'Survey' | 'Regulatory briefing' | 'Standard & toolkit';
  domains: string[];
  authority: 'Public / multilateral' | 'Academic' | 'Industry research' | 'Vendor research' | 'Analyst research' | 'Standards owner';
  published: string;
  dataPeriod: string;
  access: 'Open' | 'Registration may be required' | 'Reprint access';
  format: 'HTML + PDF' | 'PDF' | 'Interactive + PDF' | 'HTML';
  geography: string;
  status: 'Current' | 'Foundational';
  summary: string;
  useItFor: string;
  caveat: string;
  url: string;
  featured?: boolean;
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'EV-001', title: 'Hype Cycle for Security Operations, 2026', publisher: 'Gartner', type: 'Report', domains: ['Cybersecurity', 'AI', 'Risk'], authority: 'Analyst research', published: '05 June 2026', dataPeriod: 'Market-maturity snapshot published June 2026', access: 'Reprint access', format: 'HTML', geography: 'Global', status: 'Current', featured: true,
    summary: 'A maturity-oriented view of technologies and services used to identify, validate and manage threats and exposures in security operations.',
    useItFor: 'Understanding market language, innovation maturity and which security-operations capabilities deserve deeper evaluation.',
    caveat: 'Gartner research is copyrighted and should be read at the source. A Hype Cycle is not a product ranking or buying decision. Pentera provides this sponsor-hosted reprint; access may require registration.',
    url: 'https://www.gartner.com/doc/reprints?id=1-2NII8O1N&ct=260610&st=sb',
  },
  {
    id: 'EV-002', title: 'Global Cybersecurity Outlook 2026', publisher: 'World Economic Forum, in collaboration with Accenture', type: 'Report', domains: ['Cybersecurity', 'Risk', 'Governance', 'Industries'], authority: 'Industry research', published: '12 January 2026', dataPeriod: 'Survey fielded 25 August to 1 October 2025; 2026 outlook', access: 'Open', format: 'Interactive + PDF', geography: 'Global', status: 'Current', featured: true,
    summary: 'Executive and policy perspectives on artificial intelligence, cyber-enabled fraud, geopolitics, supply chains, resilience and cyber inequity.',
    useItFor: 'Connecting technical security to economic, societal and leadership decisions.',
    caveat: 'The survey included 804 qualified participants from 92 countries. Results describe this respondent population and its perceptions; they are not universal incident frequencies.',
    url: 'https://www.weforum.org/publications/global-cybersecurity-outlook-2026/',
  },
  {
    id: 'EV-003', title: '2026 Data Breach Investigations Report', publisher: 'Verizon', type: 'Threat landscape', domains: ['Cybersecurity', 'Risk', 'Industries'], authority: 'Industry research', published: '19 May 2026', dataPeriod: 'Incidents from November 2024 to October 2025', access: 'Open', format: 'HTML + PDF', geography: 'Global', status: 'Current', featured: true,
    summary: 'A large, contributed dataset of security incidents and confirmed breaches, with patterns by action, actor, asset, industry and region.',
    useItFor: 'Testing whether priorities reflect observed breach patterns and comparing industry lenses.',
    caveat: 'Contributor data is not a random sample of every incident. Follow Verizon’s citation and figure-reuse instructions.',
    url: 'https://www.verizon.com/business/resources/reports/dbir/',
  },
  {
    id: 'EV-004', title: 'X-Force Threat Intelligence Index 2026', publisher: 'IBM X-Force', type: 'Threat landscape', domains: ['Cybersecurity', 'AI', 'Industries'], authority: 'Vendor research', published: '25 February 2026', dataPeriod: '2025 investigations and telemetry', access: 'Registration may be required', format: 'HTML + PDF', geography: 'Global', status: 'Current',
    summary: 'Incident-response, vulnerability and threat observations emphasizing public-facing exploitation, identity, ransomware and artificial-intelligence-related exposure.',
    useItFor: 'Comparing threat observations with other datasets and identifying defensive hypotheses to validate locally.',
    caveat: 'The dataset comes from a security provider’s visibility and customer base. Treat product recommendations as vendor perspective.',
    url: 'https://www.ibm.com/reports/threat-intelligence',
  },
  {
    id: 'EV-005', title: 'The 2026 AI Index Report', publisher: 'Stanford Institute for Human-Centered AI', type: 'Research index', domains: ['AI', 'Data', 'Governance', 'People'], authority: 'Academic', published: '13 April 2026', dataPeriod: 'Primarily 2025, with historical series and selected data through March 2026', access: 'Open', format: 'Interactive + PDF', geography: 'Global', status: 'Current', featured: true,
    summary: 'A broad, data-rich view of research, technical performance, responsible artificial intelligence, economy, science, medicine, education, policy and public opinion.',
    useItFor: 'Separating measurable trends from hype and locating evidence for AI strategy or governance discussions.',
    caveat: 'Each chart has its own source and methodology. Read the chapter notes before comparing metrics.',
    url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
  },
  {
    id: 'EV-006', title: 'Global Risks Report 2026', publisher: 'World Economic Forum', type: 'Report', domains: ['Risk', 'Governance', 'Industries', 'AI'], authority: 'Industry research', published: '14 January 2026', dataPeriod: '2026, 2028 and 2036 outlooks', access: 'Open', format: 'Interactive + PDF', geography: 'Global', status: 'Current',
    summary: 'A multi-horizon view of interconnected economic, environmental, geopolitical, societal and technological risks based on expert perception and thematic analysis.',
    useItFor: 'Practicing systems thinking, risk interconnection and scenario planning across domains.',
    caveat: 'The perception survey is not a forecast. Use it to explore plausible concerns and connections, not to claim certainty.',
    url: 'https://www.weforum.org/publications/global-risks-report-2026/',
  },
  {
    id: 'EV-007', title: 'ENISA Threat Landscape 2025', publisher: 'European Union Agency for Cybersecurity', type: 'Threat landscape', domains: ['Cybersecurity', 'Governance', 'Industries'], authority: 'Public / multilateral', published: '01 October 2025; revised 09 January 2026', dataPeriod: 'July 2024 to June 2025', access: 'Open', format: 'HTML + PDF', geography: 'European Union context', status: 'Current',
    summary: 'A threat-centric analysis of thousands of incidents affecting the European cyber ecosystem.',
    useItFor: 'Adding European public-sector context to commercial threat reports and studying threat categories and affected sectors.',
    caveat: 'Its incident visibility, terminology and regional scope differ from other datasets.',
    url: 'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025',
  },
  {
    id: 'EV-008', title: 'M-Trends 2026', publisher: 'Google Cloud Mandiant', type: 'Threat landscape', domains: ['Cybersecurity', 'Cloud', 'Industries'], authority: 'Vendor research', published: '23 March 2026', dataPeriod: 'More than 500,000 investigation hours in 2025', access: 'Registration may be required', format: 'PDF', geography: 'Global customer investigations', status: 'Current',
    summary: 'Front-line incident investigation observations on attacker behavior, affected environments and defensive opportunities.',
    useItFor: 'Understanding dwell time, initial access, response patterns and the gap between theoretical and observed attacks.',
    caveat: 'Findings reflect Mandiant engagements and should be triangulated with other sources.',
    url: 'https://cloud.google.com/security/resources/m-trends',
  },
  {
    id: 'EV-009', title: 'Microsoft Digital Defense Report 2025', publisher: 'Microsoft', type: 'Threat landscape', domains: ['Cybersecurity', 'Identity', 'AI', 'Cloud'], authority: 'Vendor research', published: '16 October 2025', dataPeriod: 'Metric-specific; primarily January to June 2025, with historical comparisons', access: 'Open', format: 'HTML + PDF', geography: 'Global Microsoft ecosystem', status: 'Current',
    summary: 'Threat-intelligence and defensive observations spanning identity, cloud, cybercrime, nation-state activity and artificial intelligence.',
    useItFor: 'Comparing identity and cloud trends with independent and other-provider reports.',
    caveat: 'The telemetry and recommendations reflect Microsoft’s ecosystem and product perspective.',
    url: 'https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2025',
  },
  {
    id: 'EV-010', title: '2025 DORA Report: State of AI-Assisted Software Development', publisher: 'DORA / Google Cloud and research partners', type: 'Report', domains: ['Software', 'AI', 'People'], authority: 'Industry research', published: '23 September 2025', dataPeriod: '2025 research program', access: 'Open', format: 'HTML + PDF', geography: 'Global respondent population', status: 'Current',
    summary: 'Research on how artificial intelligence affects software development and how organizational capability amplifies positive or negative outcomes.',
    useItFor: 'Grounding delivery and AI-adoption discussions in system-level evidence rather than tool enthusiasm.',
    caveat: 'Read the measurement framework and respondent methodology before applying findings to one team.',
    url: 'https://dora.dev/research/2025/dora-report/',
  },
  {
    id: 'EV-011', title: 'CNCF Annual Cloud Native Survey: The Infrastructure of AI’s Future', publisher: 'Cloud Native Computing Foundation', type: 'Survey', domains: ['Cloud', 'Software', 'AI'], authority: 'Industry research', published: '20 January 2026', dataPeriod: '2025 survey', access: 'Open', format: 'PDF', geography: 'Global cloud-native respondent population', status: 'Current',
    summary: 'Adoption and maturity signals for Kubernetes, cloud-native practices, GitOps, Continuous Integration and Continuous Delivery and artificial-intelligence workloads.',
    useItFor: 'Understanding cloud-native adoption patterns and the convergence of AI infrastructure with platform engineering.',
    caveat: 'Community and respondent selection affect representativeness; vendor or foundation framing should be visible.',
    url: 'https://www.cncf.io/wp-content/uploads/2026/01/CNCF_Annual_Survey_Report_final.pdf',
  },
  {
    id: 'EV-012', title: '2026 OT Cybersecurity Year in Review', publisher: 'Dragos', type: 'Threat landscape', domains: ['Cybersecurity', 'Manufacturing', 'Energy', 'Risk'], authority: 'Vendor research', published: '17 February 2026', dataPeriod: '2025 telemetry, engagements and research', access: 'Registration may be required', format: 'HTML + PDF', geography: 'Global industrial environments', status: 'Current',
    summary: 'Operational Technology (OT) threat groups, ransomware, vulnerabilities, visibility and field observations across industrial environments.',
    useItFor: 'Adding physical-process and industrial context to enterprise security priorities.',
    caveat: 'Findings reflect the provider’s intelligence fabric and customer engagements; product material is not neutral standards guidance.',
    url: 'https://www.dragos.com/ot-cybersecurity-year-in-review',
  },
  {
    id: 'EV-013', title: 'Annual Economic Report 2026', publisher: 'Bank for International Settlements', type: 'Report', domains: ['Banking', 'Risk', 'AI'], authority: 'Public / multilateral', published: '28 June 2026', dataPeriod: '2025-2026 economic review', access: 'Open', format: 'HTML + PDF', geography: 'Global financial system', status: 'Current',
    summary: 'Analysis of the global economy, public debt, central banking, non-bank finance, trust in money and digital innovation.',
    useItFor: 'Understanding macro-financial context around banking technology, resilience and digital money.',
    caveat: 'This is macroeconomic and policy analysis, not investment advice or a forecast of one market.',
    url: 'https://www.bis.org/publ/arpdf/ar2026e.htm',
  },
  {
    id: 'EV-014', title: 'Global Financial Stability Report: April 2026', publisher: 'International Monetary Fund', type: 'Report', domains: ['Banking', 'Risk', 'Governance'], authority: 'Public / multilateral', published: '14 April 2026', dataPeriod: 'April 2026 assessment', access: 'Open', format: 'HTML + PDF', geography: 'Global financial system', status: 'Current',
    summary: 'An assessment of financial-stability risks, market amplification channels, non-bank institutions, cross-border flows and policy responses.',
    useItFor: 'Linking technology and operational risk to the wider financial system and institutional context.',
    caveat: 'Macroeconomic assessments change as conditions and data change; use the publication date visibly.',
    url: 'https://www.imf.org/en/publications/gfsr/issues/2026/04/14/global-financial-stability-report-april-2026',
  },
  {
    id: 'EV-015', title: 'NIST Cybersecurity Framework 2.0', publisher: 'National Institute of Standards and Technology', type: 'Standard & toolkit', domains: ['Governance', 'Risk', 'Cybersecurity', 'Industries'], authority: 'Standards owner', published: '26 February 2024', dataPeriod: 'Current framework version checked August 2026', access: 'Open', format: 'HTML + PDF', geography: 'United States origin / global use', status: 'Foundational',
    summary: 'A voluntary, outcome-based framework organized around Govern, Identify, Protect, Detect, Respond and Recover.',
    useItFor: 'Structuring cybersecurity outcomes and conversations without turning a framework into a product checklist.',
    caveat: 'Voluntary use does not replace applicable laws, contracts, sector rules or detailed technical standards.',
    url: 'https://www.nist.gov/cyberframework',
  },
];

export type DataSnapshot = {
  value: string;
  label: string;
  context: string;
  source: string;
  url: string;
  domain: string;
};

export const dataSnapshots: DataSnapshot[] = [
  { value: '94%', label: 'of surveyed respondents expected AI to be the most significant driver of cybersecurity change in 2026', context: 'World Economic Forum Global Cybersecurity Outlook 2026 survey; perception-based, not an incident frequency.', source: 'WEF 2026', url: 'https://www.weforum.org/publications/global-cybersecurity-outlook-2026/in-full/3-the-trends-reshaping-cybersecurity/', domain: 'Cybersecurity × AI' },
  { value: '48%', label: 'of breaches in the cited 2026 DBIR infographic involved a third party', context: 'Verizon contributor dataset; validate the full report methodology and cited wording before reuse.', source: 'Verizon DBIR 2026', url: 'https://www.verizon.com/business/resources/reports/dbir/', domain: 'Third-party risk' },
  { value: '+44%', label: 'year-over-year increase in attacks that began with exploitation of public-facing applications', context: 'Observed in IBM X-Force 2025 incident-response and investigation data; provider visibility is not a population-wide incident rate.', source: 'IBM X-Force 2026', url: 'https://www.ibm.com/reports/threat-intelligence', domain: 'Application security' },
  { value: '362', label: 'documented AI incidents in 2025 cited by the Stanford AI Index', context: 'AI Incident Database count cited in the Responsible AI chapter; reporting coverage affects the trend.', source: 'Stanford AI Index 2026', url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai', domain: 'Responsible AI' },
  { value: '3,300', label: 'industrial organizations reported by Dragos as affected by ransomware activity in 2025', context: 'Dragos intelligence and engagement visibility; manufacturing represented more than two-thirds of victims in its dataset.', source: 'Dragos 2026', url: 'https://www.dragos.com/blog/dragos-2026-ot-cybersecurity-year-in-review', domain: 'Manufacturing × OT' },
  { value: '82%', label: 'of container users in the CNCF survey reported Kubernetes in production', context: '2025 CNCF Annual Cloud Native Survey respondent population; not every organization worldwide.', source: 'CNCF 2026', url: 'https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/', domain: 'Cloud × AI' },
];

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  type: 'Documented case' | 'Fictional composite';
  industry: string;
  domains: string[];
  difficulty: 'Foundation' | 'Applied' | 'Advanced';
  readTime: number;
  situation: string;
  learn: string;
  facts: string[];
  connections: string[];
  decision: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'crowdstrike-channel-file-291', title: 'When a security update disrupted Windows systems worldwide', year: '2024', type: 'Documented case', industry: 'Technology & cross-industry', domains: ['Software', 'Cloud', 'Resilience', 'Cybersecurity'], difficulty: 'Applied', readTime: 14,
    situation: 'A CrowdStrike content configuration update for the Windows sensor caused system crashes on affected hosts, turning a protective dependency into a widespread availability event.',
    learn: 'Release guardrails, staged rollout, dependency concentration, observability, rollback and recovery at scale.',
    facts: ['The event was a technical defect, not a cyberattack.', 'The published root-cause summary describes a mismatch between expected and supplied input fields.', 'Recovery depended on coordinated action across the provider, customers and partners.'],
    connections: ['Secure SDLC', 'Change and release management', 'Endpoint security', 'Third-party concentration', 'Business continuity'],
    decision: 'If a high-privilege security agent needs rapid content updates, which tests, rollout stages, stop conditions and offline recovery paths would you require?',
    sourceLabel: 'CrowdStrike Root Cause Analysis', sourceUrl: 'https://www.crowdstrike.com/en-us/blog/channel-file-291-rca-available/',
  },
  {
    slug: 'tsb-it-migration', title: 'A banking migration where data moved but service failed', year: '2018 / enforcement 2022', type: 'Documented case', industry: 'Banking', domains: ['Systems', 'Software', 'Governance', 'Risk'], difficulty: 'Advanced', readTime: 16,
    situation: 'TSB migrated customer and corporate services to a new platform. The data migration succeeded, but technical failures caused prolonged disruption across digital, branch and telephone banking.',
    learn: 'Operational resilience, outsourcing governance, complex change, customer impact and executive accountability.',
    facts: ['UK regulators described the migration as ambitious, complex and high risk.', 'The disruption affected all branches and a significant proportion of customers.', 'Regulators identified governance, operational-risk and outsourcing failings.'],
    connections: ['Banking services', 'SDLC and cutover', 'Third-party risk', 'Impact tolerance', 'Crisis communication'],
    decision: 'What evidence would be necessary before approving cutover, and which conditions should trigger pause, rollback or customer-protection measures?',
    sourceLabel: 'UK Financial Conduct Authority enforcement summary', sourceUrl: 'https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings',
  },
  {
    slug: 'knight-capital-deployment', title: 'One server, dormant code and uncontrolled market orders', year: '2012 / enforcement 2013', type: 'Documented case', industry: 'Capital markets', domains: ['Software', 'Risk', 'Governance', 'Banking'], difficulty: 'Advanced', readTime: 14,
    situation: 'Knight Capital deployed new trading code to seven of eight servers. The remaining server retained dormant functionality that was triggered and sent erroneous orders into the market.',
    learn: 'Deployment consistency, dead code, automated limits, testing, incident response and market-risk controls.',
    facts: ['The United States Securities and Exchange Commission identified inadequate deployment and testing controls.', 'A second technician was not required to review the deployment.', 'The firm reported a pre-tax trading loss of about $440 million.'],
    connections: ['CI/CD', 'Segregation of duties', 'Automated guardrails', 'Operational risk', 'Observability'],
    decision: 'Which control should stop harm if deployment, code behavior and human review all fail independently?',
    sourceLabel: 'United States SEC order and press release', sourceUrl: 'https://www.sec.gov/newsroom/press-releases/2013-222',
  },
  {
    slug: 'solarwinds-supply-chain', title: 'A trusted software update became an attack path', year: '2020', type: 'Documented case', industry: 'Technology & government', domains: ['Cybersecurity', 'Software', 'Identity', 'Risk'], difficulty: 'Advanced', readTime: 16,
    situation: 'Attackers compromised the SolarWinds Orion software build system and inserted a vulnerability into updates distributed to customers.',
    learn: 'Software supply-chain trust, build-system security, identity abuse, detection, disclosure and systemic third-party risk.',
    facts: ['SolarWinds stated that relevant updates were released between March and June 2020.', 'The company’s filing distinguished the build-system compromise from the source-code repository.', 'CISA issued emergency direction and supply-chain compromise guidance.'],
    connections: ['Secure builds', 'SBOM and provenance', 'Privileged identity', 'Threat hunting', 'Material disclosure'],
    decision: 'How would you verify a supplier update, limit its privilege and hunt for compromise without assuming that a valid signature proves safe behavior?',
    sourceLabel: 'SolarWinds SEC filing', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1739942/000162828020017451/swi-20201214.htm',
  },
  {
    slug: 'equifax-breach', title: 'A known vulnerability met weak asset and patch visibility', year: '2017', type: 'Documented case', industry: 'Consumer data & financial services', domains: ['Cybersecurity', 'Data', 'Governance', 'Risk'], difficulty: 'Applied', readTime: 13,
    situation: 'Equifax disclosed a large breach involving personal data. Public oversight examined vulnerability remediation, asset visibility, detection and organizational response.',
    learn: 'Vulnerability management is a lifecycle of inventory, ownership, validation, remediation, verification and escalation: not a scan.',
    facts: ['The United States Government Accountability Office reviewed actions taken by Equifax and federal agencies.', 'The case is widely used to examine how control gaps combine across layers.', 'Personal-data concentration increased the consequence of compromise.'],
    connections: ['Asset inventory', 'Patch governance', 'Data minimization', 'Detection', 'Breach response'],
    decision: 'How would you prove that every affected system: not just the systems visible to one scanner: was remediated?',
    sourceLabel: 'United States GAO-18-559', sourceUrl: 'https://www.gao.gov/products/gao-18-559',
  },
  {
    slug: 'change-healthcare', title: 'A healthcare dependency became a nationwide care and payment disruption', year: '2024', type: 'Documented case', industry: 'Healthcare', domains: ['Cybersecurity', 'Resilience', 'Third-party risk', 'Privacy'], difficulty: 'Advanced', readTime: 15,
    situation: 'A ransomware incident at Change Healthcare disrupted healthcare and billing information systems, affecting providers, payment flows, patient care and privacy obligations.',
    learn: 'Systemic concentration, identity, continuity of care, provider cash flow, protected health information and regulatory response.',
    facts: ['The United States Department of Health and Human Services described the incident as a threat to patient care and essential operations.', 'Federal guidance addressed temporary flexibility to keep funds flowing.', 'Privacy and breach investigations continued alongside operational recovery.'],
    connections: ['Healthcare value chain', 'Business continuity', 'Critical third party', 'MFA', 'Breach notification'],
    decision: 'Which critical transactions need an independent continuity path when one clearing or technology intermediary is unavailable?',
    sourceLabel: 'United States HHS incident resources', sourceUrl: 'https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html',
  },
  {
    slug: 'ariane-501', title: 'Reused software met a flight profile it was not designed to handle', year: '1996', type: 'Documented case', industry: 'Aerospace', domains: ['Software', 'Systems', 'Risk', 'Safety'], difficulty: 'Applied', readTime: 12,
    situation: 'Ariane 5 Flight 501 failed shortly after launch. The inquiry examined inertial reference software, conversion behavior, redundancy and the suitability of reused assumptions.',
    learn: 'Context changes, numeric limits, common-mode failure, redundant identical software and safety-oriented verification.',
    facts: ['The launcher behaved nominally for roughly the first 36 seconds.', 'Both inertial reference systems failed in the event sequence.', 'The independent inquiry produced corrective recommendations.'],
    connections: ['Requirements', 'Software reuse', 'Boundary testing', 'Common-mode failure', 'Safety engineering'],
    decision: 'When reusing a proven component, how will you revalidate every environmental assumption and failure behavior in the new system?',
    sourceLabel: 'European Space Agency inquiry summary', sourceUrl: 'https://www.esa.int/esapub/bulletin/bullet87/inbrie87.htm',
  },
  {
    slug: 'harbor-bank-transfer', title: 'The unusual high-value transfer', year: 'Teaching case', type: 'Fictional composite', industry: 'Banking', domains: ['Identity', 'Fraud', 'Risk', 'Communication'], difficulty: 'Foundation', readTime: 10,
    situation: 'Harbor Bank receives a high-value transfer from a known customer using a new device, followed by unusual account changes and an urgent call.',
    learn: 'Clarifying evidence, balancing customer friction and loss, segregation of duties, escalation and decision records.',
    facts: ['The organization and event are fictional.', 'Some signals may be legitimate; no single alert proves fraud.', 'The exercise is designed for structured reasoning, not a memorized answer.'],
    connections: ['Authentication', 'Transaction monitoring', 'Fraud operations', 'Customer communication', 'Evidence'],
    decision: 'What would you pause, verify and communicate now: and which evidence would cause you to release or block the payment?',
    sourceLabel: 'Robin’s Hood fictional teaching composite', sourceUrl: '/learn/financial-services',
  },
  {
    slug: 'forgeworks-vendor-access', title: 'Emergency vendor access to a stopped production line', year: 'Teaching case', type: 'Fictional composite', industry: 'Manufacturing', domains: ['OT', 'Identity', 'Safety', 'Resilience'], difficulty: 'Applied', readTime: 11,
    situation: 'ForgeWorks needs a supplier engineer to diagnose a stopped line remotely while operations, security and safety teams have incomplete information.',
    learn: 'Time-bounded identity, monitored access, safety coordination, change evidence, rollback and production recovery.',
    facts: ['The organization and event are fictional.', 'Operational Technology (OT) decisions can have physical and safety consequences.', 'The safest response still needs to consider urgent production needs.'],
    connections: ['Remote access', 'PAM', 'Segmentation', 'Change control', 'Safety'],
    decision: 'Design the narrowest safe access path and define who can stop the session, approve change and confirm physical recovery.',
    sourceLabel: 'Robin’s Hood fictional teaching composite', sourceUrl: '/learn/manufacturing-and-industrial-operations',
  },
  {
    slug: 'cedar-ai-assistant', title: 'An AI support assistant asks for more access', year: 'Teaching case', type: 'Fictional composite', industry: 'Technology & services', domains: ['AI', 'Data', 'Identity', 'Governance'], difficulty: 'Applied', readTime: 12,
    situation: 'Cedar Services wants an artificial-intelligence assistant to answer customer questions and take simple account actions, but the prototype retrieves restricted documents and sometimes invents policy details.',
    learn: 'Purpose, retrieval authorization, evaluation, human escalation, tool permissions, monitoring and retirement criteria.',
    facts: ['The organization and event are fictional.', 'Retrieval does not automatically enforce source authorization.', 'Fluent output is not evidence of correctness.'],
    connections: ['RAG', 'Prompt injection', 'Least privilege', 'AI evaluation', 'Human oversight'],
    decision: 'Which questions may the assistant answer, which actions may it take, and what evidence must exist before expanding either boundary?',
    sourceLabel: 'Robin’s Hood fictional teaching composite', sourceUrl: '/learn/ai-system-architecture-context-retrieval-tools-and-memory',
  },
  {
    slug: 'british-library-ransomware-recovery', title: 'When the backups survived but the platform did not', year: '2023 / review 2024', type: 'Documented case', industry: 'Public sector and cultural institutions', domains: ['Cybersecurity', 'Identity', 'Resilience', 'Data'], difficulty: 'Advanced', readTime: 22,
    situation: 'The British Library ransomware incident combined likely privileged credential compromise, incomplete early investigation, legacy technology, data duplication and destructive impact. Protected collection backups existed, yet full recovery still required clean infrastructure and supportable applications.',
    learn: 'Why backup is not the same as recoverability, and how identity, segmentation, monitoring, lifecycle, data minimization and crisis command form one resilience system.',
    facts: ['The Library identified a major incident on 28 October 2023 and attributed it to the Rhysida ransomware group.', 'Its review says a Terminal Services server was the likely entry route, but the exact access method could not be established.', 'About 600 GB of files were exfiltrated, while secure collection backups survived.'],
    connections: ['Privileged access', 'Multi-Factor Authentication', 'Network segmentation', 'Legacy modernization', 'Recovery architecture'],
    decision: 'If funding covers only three improvements, which combination best interrupts entry, limits blast radius and preserves recoverability?',
    sourceLabel: 'British Library cyber incident review', sourceUrl: 'https://www.bl.uk/files/v5dwkion/production/99206a2d1e9f07b35712b78f7d75fbb09560c08d.pdf/british-library-cyber-incident-review-8-march-2024.pdf?dl=',
  },
  {
    slug: 'storm-0558-cloud-signing-key', title: 'A stolen signing key turned forged tokens into trusted access', year: '2023 / review 2024', type: 'Documented case', industry: 'Cloud and government services', domains: ['Cloud', 'Identity', 'Cryptography', 'Governance'], difficulty: 'Advanced', readTime: 23,
    situation: 'Storm-0558 used tokens signed with a Microsoft consumer signing key to access Exchange Online mailboxes. A separate validation flaw allowed the tokens to reach enterprise accounts, while the exact method used to obtain the key remained unknown.',
    learn: 'Cryptographic blast radius, token validation, provider responsibility, secure-by-default logging, behavioral detection and evidence-aware incident communication.',
    facts: ['The incident affected 22 organizations and more than 500 individuals.', 'The Cyber Safety Review Board described the intrusion as preventable.', 'The United States Department of State detected anomalous activity and alerted Microsoft.'],
    connections: ['Key management', 'Cloud shared responsibility', 'Token security', 'Cross-tenant detection', 'Provider governance'],
    decision: 'How would you detect malicious access when the presented token has a technically valid signature?',
    sourceLabel: 'Cyber Safety Review Board report', sourceUrl: 'https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf',
  },
  {
    slug: 'mgm-resorts-operational-disruption', title: 'Containment protected data but disrupted a physical-service business', year: '2023', type: 'Documented case', industry: 'Hospitality and gaming', domains: ['Cybersecurity', 'Resilience', 'Privacy', 'Operations'], difficulty: 'Advanced', readTime: 19,
    situation: 'MGM Resorts shut down certain systems after identifying unauthorized activity. The containment decision disrupted guest-facing and property operations, while restoration, privacy assessment, communication and financial reporting proceeded in parallel.',
    learn: 'Containment trade-offs, graceful degradation, digital-to-physical dependencies, restoration tiers, data retention and material incident reporting.',
    facts: ['MGM estimated an approximately $100 million negative impact to Adjusted Property EBITDAR.', 'By 5 October, domestic property operations had returned to normal and virtually all guest-facing systems had been restored.', 'Primary company filings do not establish the initial access method.'],
    connections: ['Business impact analysis', 'Service dependency mapping', 'Offline operations', 'Data retention', 'Materiality'],
    decision: 'When is a broad shutdown justified, and which physical and customer services must retain a safe fallback?',
    sourceLabel: 'MGM 5 October SEC filing', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm',
  },
  {
    slug: 'capital-one-cloud-risk-governance', title: 'Cloud migration moved faster than cloud risk governance', year: '2015 to 2020', type: 'Documented case', industry: 'Banking', domains: ['Cloud', 'Governance', 'Risk', 'Audit'], difficulty: 'Advanced', readTime: 21,
    situation: 'The Office of the Comptroller of the Currency found that Capital One did not establish sufficiently effective risk-assessment processes before migrating significant technology operations to public cloud, and identified control, challenge, audit and Board-accountability weaknesses.',
    learn: 'Cloud control ownership, risk assessment before material change, three lines, alert disposition, audit capability and traceable remediation.',
    facts: ['The Office of the Comptroller of the Currency assessed an $80 million civil money penalty in 2020.', 'Findings included weaknesses in network security controls, Data Loss Prevention and alert disposition.', 'The case concerns cloud governance and control execution, not proof that public cloud is inherently unsafe.'],
    connections: ['Three lines model', 'Cloud governance', 'Control inventory', 'Internal audit', 'Board oversight'],
    decision: 'What evidence should block a material cloud migration until first-line controls, second-line challenge and third-line assurance are credible?',
    sourceLabel: 'Office of the Comptroller of the Currency penalty announcement', sourceUrl: 'https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html',
  },
  {
    slug: 'okta-support-system-session-tokens', title: 'Support files carried live administrator sessions across a trust boundary', year: '2023', type: 'Documented case', industry: 'Identity and cloud services', domains: ['Identity', 'Cloud', 'Third-party risk', 'Security operations'], difficulty: 'Advanced', readTime: 20,
    situation: 'An attacker accessed customer support files at Okta. Some HTTP Archive files contained live session tokens, and the incident exposed weaknesses in browser-profile policy, service credentials, diagnostic-file handling and the interpretation of file-access logs.',
    learn: 'Authentication versus session security, support-system trust boundaries, safe diagnostics, consistent logging and provider-customer detection.',
    facts: ['Okta reported that files associated with 134 customers were accessed.', 'Stolen session tokens were used to hijack legitimate sessions belonging to five customers.', 'The main root-cause source is a vendor self-report and should be read with that limitation.'],
    connections: ['Session tokens', 'Service accounts', 'Support systems', 'Log semantics', 'Shared responsibility'],
    decision: 'How would you redesign diagnostic upload, support access and privileged sessions so one file cannot become a reusable administrator identity?',
    sourceLabel: 'Okta root cause and remediation report', sourceUrl: 'https://sec.okta.com/articles/2023/11/unauthorized-access-oktas-support-case-management-system-root-cause/',
  },
  {
    slug: 'moveit-transfer-zero-day', title: 'A managed file-transfer zero-day became a many-organization data path', year: '2023', type: 'Documented case', industry: 'Cross-industry software supply chain', domains: ['Application security', 'Data', 'Third-party risk', 'Vulnerability management'], difficulty: 'Advanced', readTime: 20,
    situation: 'CL0P exploited a previously unknown SQL injection vulnerability in internet-facing MOVEit Transfer systems, deployed a web shell and stole data from a product designed to concentrate sensitive transfers between organizations.',
    learn: 'Known exploitation, internet asset inventory, emergency patching, compromise assessment, data minimization and software concentration risk.',
    facts: ['CVE-2023-34362 allowed unauthorized access to the MOVEit Transfer database.', 'CISA added the vulnerability to its Known Exploited Vulnerabilities catalog.', 'The incident should be described as exploitation, persistence, data theft and extortion, not assumed encryption at every victim.'],
    connections: ['Internet exposure', 'SQL injection', 'Web shells', 'Data lineage', 'Supplier response'],
    decision: 'Why is patch confirmation not enough to close the incident, and what historical evidence is required before returning service?',
    sourceLabel: 'CISA and FBI joint MOVEit advisory', sourceUrl: 'https://www.cisa.gov/sites/default/files/2023-06/aa23-158a-stopransomware-cl0p-ransomware-gang-exploits-moveit-vulnerability_7.pdf',
  },
];
