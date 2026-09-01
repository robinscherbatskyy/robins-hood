import { glossary, industries, organizations, type GlossaryTerm, type Industry } from './ecosystem';
import { pillars, type PillarCategory, type PillarGuide } from './pillars';
import { toolCatalog, type ToolProfile } from './tool-catalog';
import type { Topic } from './topics';

export type DeepSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  takeaway: string;
  checkpoint: string;
};

export type DiagramNode = { id: string; label: string; detail: string; group?: string };
export type DiagramEdge = { from: string; to: string; label?: string; kind?: 'normal' | 'feedback' | 'risk' | 'control' };
export type DiagramView = {
  id: string;
  label: string;
  title: string;
  intro: string;
  type: 'flow' | 'cycle' | 'layers' | 'network';
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type ComparisonRow = { concept: string; useItFor: string; doNotConfuseItWith: string };

export type GuideEnrichment = {
  sourceCoverage: string;
  deepSections: DeepSection[];
  diagramViews: DiagramView[];
  terms: GlossaryTerm[];
  comparison: { title: string; intro: string; rows: ComparisonRow[] };
  evidenceChecklist: string[];
  decisionLenses: Array<{ title: string; detail: string }>;
  practitionerChecklist: string[];
  relevantTools: ToolProfile[];
};

export type GuideSeed = {
  mentalModel: string;
  flow: string[];
  pitfalls: string[];
  keyIdeas: Array<{ title: string; text: string }>;
};

const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'that', 'this', 'through', 'about', 'your', 'their', 'what', 'when', 'where', 'how', 'why', 'are', 'not', 'one', 'its', 'use', 'using', 'management', 'foundations', 'foundation', 'systems', 'system', 'technology', 'technologies']);

function tokens(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+]+/g, ' ').split(/\s+/).filter((token) => token.length > 2 && !stopWords.has(token));
}

function scoreText(needles: string[], haystack: string) {
  const normalized = haystack.toLowerCase();
  const words = new Set(normalized.replace(/[^a-z0-9+]+/g, ' ').split(/\s+/).filter(Boolean));
  return needles.reduce((score, token) => {
    if (token.includes(' ')) return score + (normalized.includes(token) ? 3 : 0);
    return score + (words.has(token) ? 2 : 0);
  }, 0);
}

function splitSentences(value: string) {
  return value.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [value];
}

function paragraphize(value: string) {
  const sentences = splitSentences(value);
  const groups: string[] = [];
  const perParagraph = sentences.length > 8 ? 3 : 2;
  for (let index = 0; index < sentences.length; index += perParagraph) groups.push(sentences.slice(index, index + perParagraph).join(' '));
  return groups;
}

const adjacentPillars: Record<Topic['category'], PillarCategory[]> = {
  orientation: ['business', 'systems', 'governance'],
  business: ['risk', 'systems'],
  systems: ['software', 'cyber'],
  software: ['systems', 'cyber'],
  cloud: ['systems', 'risk'],
  cyber: ['systems', 'governance'],
  governance: ['risk', 'business'],
  risk: ['governance', 'business'],
  data: ['governance', 'ai'],
  ai: ['data', 'governance'],
  emerging: ['systems', 'risk', 'ai'],
  industries: ['business', 'risk', 'systems'],
  people: ['business', 'risk'],
  ecosystem: ['governance', 'cyber'],
};

function pillarForCategory(category: Topic['category']) {
  return pillars.find((pillar) => pillar.category === category);
}

function selectChapters(topic: Topic) {
  const searchTokens = tokens(`${topic.title} ${topic.summary} ${topic.subtrack}`);
  const primary = pillarForCategory(topic.category);
  const pool: Array<{ pillar: PillarGuide; title: string; body: string; score: number }> = [];
  const candidates = [primary, ...adjacentPillars[topic.category].map((category) => pillars.find((pillar) => pillar.category === category))].filter(Boolean) as PillarGuide[];

  candidates.forEach((pillar) => pillar.chapters.forEach((chapter) => {
    const titleScore = scoreText(searchTokens, chapter.title) * 4;
    const bodyScore = scoreText(searchTokens, chapter.body);
    const primaryBoost = pillar === primary ? 7 : 0;
    const specificity = titleScore > 0 ? 3 : 0;
    pool.push({ pillar, title: chapter.title, body: chapter.body, score: titleScore + bodyScore + primaryBoost + specificity });
  }));

  if (!primary) {
    return pool
      .sort((a, b) => b.score - a.score)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index)
      .slice(0, 4);
  }

  const chosen: typeof pool = [];
  const primaryChoices = pool.filter((item) => item.pillar === primary).sort((a, b) => b.score - a.score).slice(0, 3);
  chosen.push(...primaryChoices);
  const adjacentChoice = pool.filter((item) => item.pillar !== primary && !chosen.some((choice) => choice.title === item.title)).sort((a, b) => b.score - a.score)[0];
  if (adjacentChoice) chosen.push(adjacentChoice);
  return chosen.slice(0, 4);
}

const checkpointByCategory: Record<Topic['category'], string> = {
  orientation: 'Can you trace one outcome through people, process, systems, risk, control and evidence without skipping a hand-off?',
  business: 'Which customer or organizational outcome changes, and how would you know the change was worth its full lifecycle cost?',
  systems: 'Which dependency fails first, what does a user experience, and which signal would reveal the cause?',
  software: 'Which assumption is this stage testing, and what prevents an unsafe change from reaching or remaining in production?',
  cloud: 'Which responsibilities remain with the customer for this service model, and how is recovery tested?',
  cyber: 'Which asset, threat path, control, evidence and residual risk are actually in scope?',
  governance: 'Who decides, who performs, who challenges, and what retained evidence supports the conclusion?',
  risk: 'What cause-event-consequence scenario could affect the objective, and which decision follows from the assessment?',
  data: 'Can a consumer trace the meaning, source, transformation, owner, quality and permitted use of the data?',
  ai: 'What evidence shows the complete AI system is useful, safe enough and governable for this exact context?',
  emerging: 'Which evidence separates scientific promise, a working prototype, a supportable product and proven value in this context?',
  industries: 'What is the primary consequence here: financial integrity, safety, care, continuity, rights or public trust?',
  people: 'What did the other person need to understand, decide or feel able to do after the interaction?',
  ecosystem: 'Is this law, regulation, standard, guidance, community practice or commercial advice, and where does it apply?',
};

function chapterSections(topic: Topic): DeepSection[] {
  const chapters = selectChapters(topic);
  const terms = selectTerms(topic).slice(0, 6);
  const focusTerms = terms.slice(0, 4).map((term) => term.term);
  const definitionLines = terms.slice(0, 3).map((term) => `${term.term}: ${term.meaning}`).join(' ');
  const distinctionLines = terms.slice(3, 6).map((term) => `${term.term} belongs here because ${term.where ?? term.example}`).join(' ');
  const primary = chapters[0];
  const secondary = chapters[1] ?? chapters[0];
  const failureByCategory: Record<Topic['category'], string> = {
    orientation: 'The model fails when a neat diagram hides a real owner, dependency, exception or affected person.',
    business: 'The most common failure is local optimization: a team improves its own activity while customer delay, rework, risk or full lifecycle cost gets worse.',
    systems: 'A service usually fails at a boundary: name resolution, routing, identity, capacity, state, dependency, configuration or recovery behavior.',
    software: 'A change becomes harmful when an unstated requirement, unsafe dependency, untested path, release condition or missing rollback reaches real users.',
    cloud: 'Cloud failures spread quickly through shared identity, policy, configuration, region, quota, automation and data dependencies.',
    cyber: 'Security failure is a path, not a label. An actor reaches an exposed condition, gains capability, affects an objective and leaves evidence of varying quality.',
    governance: 'The design fails when an obligation has no owner, a control has no complete population, or evidence cannot show what actually happened over time.',
    risk: 'The assessment fails when broad labels or scores replace a plausible scenario, explicit assumptions, treatment choices and an authorized residual-risk decision.',
    data: 'Data failure can begin with ambiguous meaning, poor source quality, an incorrect transformation, unauthorized use or a lifecycle action that never occurred.',
    ai: 'AI failure may come from data, retrieval, prompts, tools, permissions, evaluation, human reliance or monitoring even when the model itself is operating normally.',
    emerging: 'Novel technology becomes dangerous when a prototype is mistaken for a supportable product and dependency grows before standards, operations and exit are ready.',
    industries: 'A familiar technical failure changes meaning when it can affect financial integrity, patient safety, physical production, public trust or critical continuity.',
    people: 'The interaction fails when the other person cannot understand the point, surface disagreement, make the decision or act on a clear commitment.',
    ecosystem: 'The conclusion fails when a publication is used outside its mandate, jurisdiction, edition, audience or adoption route.',
  };
  const namedFocus = focusTerms.length ? focusTerms.join(', ') : topic.subtrack;
  const work = [
    `State the decision or outcome that ${topic.title.toLowerCase()} must support`,
    `Inspect the real boundary, owner and dependencies behind ${namedFocus}`,
    'Observe one normal instance and one exception from authoritative evidence',
    'Test the smallest safe change or hypothesis and compare the result',
    'Record the conclusion, limitation, owner and next review trigger',
  ].map((step, index) => `${index + 1}. ${step}`).join(' ');
  const evidence = [
    `scope and accountable owner for ${topic.title.toLowerCase()}`,
    `current design, configuration or decision record for ${namedFocus}`,
    'a time-stamped normal execution and a meaningful exception',
    'the observed result, unresolved limitation and follow-up owner',
  ].join('; ');
  return [
    {
      eyebrow: 'Meaning and boundary',
      title: `Define ${topic.title.toLowerCase()} precisely`,
      paragraphs: [topic.summary, definitionLines || `Use ${topic.title.toLowerCase()} for the decision named here, and keep adjacent ideas separate until their relationship is explicit.`, distinctionLines || `The useful boundary is the purpose, owner, affected system and evidence needed for a real decision.`],
      takeaway: `For ${topic.title.toLowerCase()}, a useful definition names the decision it supports and the claim it cannot prove.`,
      checkpoint: `Which two terms in ${topic.title.toLowerCase()} are most often confused, and what different decision does each support?`,
    },
    {
      eyebrow: primary?.pillar.title ?? 'System mechanics',
      title: 'How it works inside a real system',
      paragraphs: primary ? [`Read ${topic.title.toLowerCase()} through the working parts that matter here: ${namedFocus}.`, ...paragraphize(primary.body).slice(0, 2)] : [`Place ${topic.title.toLowerCase()} inside the people, process, information and technology that produce the outcome. Name the inputs, decisions, outputs, dependencies and trust changes.`, `Then compare intended design with observed operation. A diagram, policy or configuration is evidence of intent, not proof of complete and effective behavior.`],
      takeaway: `${topic.title} becomes understandable when its boundary, dependencies and observable behavior are considered together.`,
      checkpoint: `Which upstream dependency and downstream consumer would expose a weak assumption in ${topic.title.toLowerCase()}?`,
    },
    {
      eyebrow: secondary?.pillar.title ?? 'Failure and consequence',
      title: 'Failure modes and business consequence',
      paragraphs: [`For ${topic.title.toLowerCase()}, ${failureByCategory[topic.category].charAt(0).toLowerCase()}${failureByCategory[topic.category].slice(1)}`, secondary ? paragraphize(secondary.body).slice(0, 2).join(' ') : `Describe the first observable symptom, the affected objective, the people making decisions and the point where the consequence can still be limited.`, `Translate a failure of ${topic.title.toLowerCase()} into the concrete result: delay, incorrect action, fraud, disclosure, unsafe operation, cost, legal exposure, lost trust or inability to recover.`],
      takeaway: `The technical severity of ${topic.title.toLowerCase()} matters only after it is connected to a consequence and time horizon.`,
      checkpoint: `What would a user, operator and accountable leader each notice first if ${topic.title.toLowerCase()} failed?`,
    },
    {
      eyebrow: 'Practitioner method',
      title: 'What to do and what to retain',
      paragraphs: [`For ${topic.title.toLowerCase()}, work in this order: ${work}`, `Retain ${evidence}. Each item should identify scope, time, source, owner and limitation so another reviewer can reproduce the conclusion.`],
      takeaway: `A practitioner proves ${topic.title.toLowerCase()} through an observable task, an owned decision and reproducible evidence.`,
      checkpoint: `Which task could you perform this week to prove that ${topic.title.toLowerCase()} works outside a demonstration?`,
    },
  ];
}

const industrySlugMap: Record<string, string> = {
  'manufacturing-and-industrial-operations': 'manufacturing',
  'healthcare-and-life-sciences': 'healthcare',
  'retail-e-commerce-and-consumer-services': 'retail',
  'government-public-services-education-and-nonprofits': 'public-sector',
  'telecommunications-media-and-entertainment': 'telecommunications',
  'energy-utilities-and-critical-infrastructure': 'energy',
  'transportation-logistics-aviation-automotive-and-maritime': 'transport-logistics',
  'technology-saas-and-professional-services': 'technology-services',
};

function industryForTopic(topic: Topic): Industry | undefined {
  return industries.find((industry) => industry.slug === topic.slug || industry.slug === industrySlugMap[topic.slug]);
}

function industrySections(topic: Topic, industry: Industry): DeepSection[] {
  return [
    {
      eyebrow: 'Value chain', title: 'How value moves through the domain',
      paragraphs: [`${industry.title} creates value through a connected chain: ${industry.valueChain.join(' -> ')}. Each hand-off moves information, authority, money, materials or service responsibility. A failure at one stage can surface later as delay, incorrect records, unsafe action or lost trust.`, `Use the chain to locate the customer or public outcome before discussing products. Then mark the systems, teams, suppliers and evidence at every boundary. This keeps technology choices tied to the actual operating model.`],
      takeaway: 'The value chain is the anchor for system, risk and control decisions.', checkpoint: `Which step in ${industry.title.toLowerCase()} has the greatest concentration or hand-off risk?`,
    },
    {
      eyebrow: 'Operating system', title: 'Systems, data and critical dependencies',
      paragraphs: [`Common enabling systems include ${industry.systems.join(', ')}. They exchange identities, transactions, operational state and records. A technically healthy component can still produce a failed service when upstream data, a shared identity provider, a network path or a supplier is unavailable.`, `Map the important service end to end. Include manual work, third parties, recovery tooling and the teams who interpret exceptions. The most important assets are ${industry.crownJewels.join(', ')}.`],
      takeaway: 'An important service is wider than the application that users see.', checkpoint: 'Which hidden dependency would not appear in a conventional application inventory?',
    },
    {
      eyebrow: 'Risk and control', title: 'Failure modes and proportionate safeguards',
      paragraphs: [`The primary risk families include ${industry.risks.join(', ')}. Do not treat them as isolated labels. Write a cause-event-consequence scenario and connect it to an objective, exposed dependency and affected group.`, `Priority safeguards include ${industry.priorities.join(', ')}. Their design must reflect the domain. A safety-critical environment, for example, may require controlled maintenance windows and manual operation where an ordinary office system would favor rapid automated change.`],
      takeaway: 'Consequence determines control strength, recovery design and decision authority.', checkpoint: 'Which control would reduce likelihood, which would limit impact, and which would support recovery?',
    },
    {
      eyebrow: 'Applied judgment', title: 'Use a case to test the whole chain',
      paragraphs: [industry.caseStudy, `Work the case from five perspectives: the person receiving the service, the operator, the technology owner, the risk or assurance function and the accountable executive. Each sees different evidence and time pressure. A sound response makes immediate safety or continuity decisions while preserving enough evidence to learn and improve.`],
      takeaway: 'Cases expose relationships that a definition cannot show.', checkpoint: 'What would you do in the first 30 minutes, and what evidence would change that decision?',
    },
  ];
}

function ecosystemSections(topic: Topic): DeepSection[] {
  const searchTokens = tokens(`${topic.title} ${topic.summary}`);
  const selected = organizations.map((organization) => ({ organization, score: scoreText(searchTokens, `${organization.acronym} ${organization.name} ${organization.type} ${organization.description}`) })).sort((a, b) => b.score - a.score).slice(0, 6).map((item) => item.organization);
  return [
    {
      eyebrow: 'Authority', title: 'Start with mandate, not fame',
      paragraphs: ['Institutions influence practice in different ways. Legislatures create law, regulators supervise or enforce within a jurisdiction, standards bodies publish agreed specifications, public agencies issue guidance, professional bodies shape practice, communities maintain shared knowledge and vendors describe their products.', 'The same document may be voluntary in one context and mandatory in another because a law, regulator, contract or internal policy adopts it. Always record issuer, publication type, version, jurisdiction, audience and adoption route.'],
      takeaway: 'Authority comes from mandate and applicability, not popularity.', checkpoint: checkpointByCategory.ecosystem,
    },
    {
      eyebrow: 'Source method', title: 'Use the primary publication correctly',
      paragraphs: ['Begin at the issuing organization. Check the current edition, corrections, implementation dates and whether supporting guidance has a different status from the underlying obligation. Keep a copy or stable citation of the version used in a decision.', 'Commercial summaries can help with orientation, but they may omit limits or frame a problem around a product. Use them as interpretation, then return to the source for definitions and scope.'],
      takeaway: 'A source note should explain what the document can and cannot prove.', checkpoint: 'Could another reviewer reproduce your applicability decision from the retained source record?',
    },
    {
      eyebrow: 'Institution map', title: `Organizations most connected to ${topic.title}`,
      paragraphs: selected.slice(0, 3).map((organization) => `${organization.acronym} (${organization.name}) is a ${organization.type.toLowerCase()} with ${organization.region} relevance. ${organization.description} Important limit: ${organization.limitation}`),
      takeaway: 'Keep organization type and limitation visible beside every recommendation.', checkpoint: 'Which of these organizations can enforce, and which can only publish or influence?',
    },
    {
      eyebrow: 'Verification', title: 'Turn external material into an internal decision',
      paragraphs: ['Map the publication to the objective, obligation, risk or design choice it informs. Assign an owner, note assumptions, retain the version, decide what implementation evidence is required and set a review trigger.', 'Recheck when the law changes, a standard is revised, a product changes, the organization enters a new jurisdiction or the service and data boundary changes. Applicability is a maintained decision, not a one-time search result.'],
      takeaway: 'External authority becomes useful through traceable internal ownership and evidence.', checkpoint: 'What event would make the current interpretation stale?',
    },
  ];
}

const domainAliases: Record<Topic['category'], string[]> = {
  orientation: ['business', 'systems', 'risk', 'grc'], business: ['business', 'management', 'operations'], systems: ['systems', 'networking', 'foundations', 'operations'],
  software: ['software'], cloud: ['cloud'], cyber: ['security', 'security operations', 'security architecture', 'security testing', 'identity'], governance: ['grc', 'control'],
  risk: ['risk', 'resilience'], data: ['data'], ai: ['artificial intelligence'], emerging: ['emerging technology', 'systems', 'industry'], industries: ['industry'], people: ['professional'], ecosystem: ['grc', 'security', 'business'],
};

const preferredTermsBySlug: Record<string, string[]> = {
  'cybersecurity-goals-and-principles': ['Confidentiality', 'Integrity', 'Availability', 'Authenticity', 'Accountability', 'Non-repudiation', 'Data at rest', 'Data in transit', 'Data in use', 'Defense in depth'],
  'threat-actors-motives-and-attack-lifecycles': ['Threat actor', 'Attack vector', 'Initial access', 'Persistence', 'Privilege escalation', 'Lateral movement', 'Command and control', 'Exfiltration', 'Cyber kill chain', 'MITRE ATT&CK'],
  'malware-ransomware-and-unwanted-software': ['Malware', 'Virus', 'Worm', 'Trojan', 'Rootkit', 'Spyware', 'Keylogger', 'Botnet', 'Ransomware', 'Command and control'],
  'software-vulnerability-families-and-secure-coding': ['Buffer overflow', 'Stack overflow', 'Heap overflow', 'Memory safety', 'Input validation', 'Injection', 'Race condition', 'TOCTOU', 'Broken access control', 'Custom cryptography'],
  'password-attacks-offline-cracking-and-authentication-defense': ['Wordlist', 'Dictionary attack', 'Password cracking', 'Offline password cracking', 'Online password guessing', 'Rainbow table', 'Brute-force attack', 'Password spraying', 'Credential stuffing', 'Salt'],
  'threats-vulnerabilities-exposure-and-risk': ['Threat', 'Vulnerability', 'Exposure', 'Exploit', 'Zero-day', 'Attack surface', 'Inherent risk', 'Residual risk', 'Risk treatment', 'Control'],
  'social-engineering-security-awareness-and-human-risk': ['Phishing', 'Vishing', 'Smishing', 'Pretexting', 'Baiting', 'Tailgating', 'Shoulder surfing', 'Business email compromise', 'MFA fatigue', 'Security awareness'],
  'network-foundations-and-protocol-models': ['OSI model', 'TCP/IP', 'Packet', 'Frame', 'TCP', 'UDP', 'IP', 'ARP', 'DNS', 'Network port'],
  'man-in-the-middle-spoofing-and-transport-trust': ['Man-in-the-middle (MITM)', 'ARP spoofing', 'DNS spoofing', 'Evil twin', 'TLS stripping', 'Downgrade attack', 'Replay attack', 'TLS', 'Certificate', 'DNS'],
  'linux-foundations-filesystem-and-shell': ['Linux', 'Linux distribution', 'Kernel', 'Shell', 'Terminal', 'Filesystem hierarchy', 'Pipe', 'Process', 'Daemon', 'File descriptor'],
  'linux-users-groups-and-file-permissions': ['Linux', 'File permission', 'rwx', 'Octal permission', 'chmod', 'chown', 'umask', 'setuid', 'setgid', 'Sticky bit'],
  'core-security-control-families': ['Control', 'Directive control', 'Deterrent control', 'Preventive control', 'Compensating control', 'Detective control', 'Corrective control', 'Recovery control', 'Segregation of duties', 'Evidence'],
  'enterprise-technology-and-cyber-risk-management': ['Risk', 'Inherent risk', 'Residual risk', 'Target risk', 'Risk appetite', 'Risk tolerance', 'Risk owner', 'Control owner', 'Risk treatment', 'Key risk indicator'],
  'risk-foundations-taxonomies-appetite-and-tolerance': ['Risk', 'Inherent risk', 'Residual risk', 'Target risk', 'Risk appetite', 'Risk tolerance', 'Risk capacity', 'Risk velocity', 'Risk owner', 'Risk register'],
  'audit-assurance-attestation-and-certification': ['Internal Audit', 'Audit', 'Assurance', 'Attestation', 'Certification', 'Reasonable assurance', 'Audit sampling', 'Management assertion', 'Audit committee', 'Three Lines Model'],
  'control-design-operation-testing-and-evidence': ['Control', 'Control owner', 'Control operator', 'Control design', 'Operating effectiveness', 'Evidence', 'Audit sampling', 'Compensating control', 'ITGC', 'Application control'],
  'internal-audit-planning-engagements-findings-and-follow-up': ['Internal Audit', 'Chief Audit Executive', 'Audit committee', 'Three Lines Model', 'Audit universe', 'Audit sampling', 'Finding', 'Reasonable assurance', 'Professional skepticism', 'Quality assurance and improvement program'],
  'sox-icfr-itgc-and-application-controls': ['SOX', 'ICFR', 'ITGC', 'Application control', 'Entity-level control', 'Financial statement assertion', 'Material weakness', 'Significant deficiency', 'SOC 1', 'Reasonable assurance'],
  'digital-identity-directories-and-the-identity-lifecycle': ['Digital identity', 'Identity proofing', 'Directory service', 'Authentication', 'Authorization', 'Federation', 'Session', 'SCIM', 'Joiner-mover-leaver', 'Service account'],
  'identity-governance-and-administration': ['Identity governance and administration', 'Joiner-mover-leaver', 'Segregation of duties', 'SoD', 'Access review', 'Role mining', 'Birthright access', 'Toxic combination', 'Control owner', 'SCIM'],
  'security-operations-detection-and-threat-intelligence': ['SOC', 'Security telemetry', 'EDR', 'NDR', 'SIEM', 'SOAR', 'XDR', 'IOC', 'TTP', 'Threat intelligence'],
  'detection-engineering-telemetry-and-coverage-validation': ['Detection engineering', 'Security telemetry', 'Data source', 'Analytic', 'Alert', 'Triage', 'False positive', 'Threat hunting', 'TTP', 'Detection coverage'],
  'edr-ndr-xdr-and-detection-technology-landscape': ['EDR', 'NDR', 'XDR', 'Security telemetry', 'Detection engineering', 'Alert', 'Incident', 'False positive', 'Threat hunting', 'SOC'],
  'siem-soar-and-security-analytics-platforms': ['SIEM', 'SOAR', 'Security telemetry', 'Detection engineering', 'Correlation rule', 'Alert', 'Incident', 'Playbook', 'SOC', 'Threat hunting'],
  'artificial-intelligence-and-machine-learning-foundations': ['Artificial intelligence', 'Machine Learning', 'Model', 'Training', 'Inference', 'Feature', 'Label', 'Loss', 'Precision', 'Recall'],
  'generative-ai-large-language-models-retrieval-and-agents': ['Generative AI', 'LLM', 'Token', 'Context window', 'Embedding', 'RAG', 'Grounding', 'Vector database', 'Agent', 'Guardrail'],
  'ai-system-architecture-context-retrieval-tools-and-memory': ['LLM', 'System prompt', 'Context window', 'Embedding', 'RAG', 'Grounding', 'Vector database', 'Tool call', 'Agent', 'Guardrail'],
  'ai-agents-orchestration-and-human-oversight': ['Agent', 'Tool call', 'System prompt', 'Context window', 'Memory', 'Guardrail', 'Human in the loop', 'Prompt injection', 'Authorization', 'Audit trail'],
};

function selectTerms(topic: Topic) {
  const searchTokens = tokens(`${topic.title} ${topic.summary}`);
  const aliases = domainAliases[topic.category];
  const preferred = preferredTermsBySlug[topic.slug] ?? [];
  const preferredIndex = new Map(preferred.map((term, index) => [term.toLowerCase(), index]));
  const ranked = glossary.map((term) => {
    const content = `${term.term} ${term.expansion ?? ''} ${term.meaning} ${term.where ?? ''} ${term.example}`;
    const lexical = scoreText(searchTokens, content) * 4;
    const domain = aliases.includes(term.category.toLowerCase()) ? 3 : 0;
    const explicit = preferredIndex.has(term.term.toLowerCase()) ? 100 - (preferredIndex.get(term.term.toLowerCase()) ?? 0) : 0;
    return { term, score: explicit + lexical + (lexical > 0 ? domain : 0), explicit };
  }).filter((item) => item.explicit > 0 || item.score >= 8).sort((a, b) => b.score - a.score || a.term.term.localeCompare(b.term.term));
  return ranked.slice(0, 10).map((item) => item.term);
}

const comparisons: Record<Topic['category'], { title: string; intro: string; rows: ComparisonRow[] }> = {
  orientation: { title: 'Do not collapse the chain', intro: 'These ideas connect, but each answers a different question.', rows: [
    { concept: 'Objective', useItFor: 'Describe the outcome that matters.', doNotConfuseItWith: 'A project output or tool purchase.' },
    { concept: 'Risk', useItFor: 'Describe uncertainty that could affect the objective.', doNotConfuseItWith: 'A weakness or issue without consequence.' },
    { concept: 'Control and evidence', useItFor: 'Change exposure and support a conclusion.', doNotConfuseItWith: 'A policy statement or confident claim.' },
  ] },
  business: { title: 'Choose the right unit of work', intro: 'Business language becomes clearer when the unit and decision are explicit.', rows: [
    { concept: 'Product', useItFor: 'Manage an enduring capability and its outcomes.', doNotConfuseItWith: 'A temporary delivery effort.' },
    { concept: 'Project or program', useItFor: 'Coordinate bounded change and related benefits.', doNotConfuseItWith: 'Permanent ownership of a service.' },
    { concept: 'Process or operating model', useItFor: 'Explain repeatable work and the system around it.', doNotConfuseItWith: 'An organization chart alone.' },
  ] },
  systems: { title: 'Separate component, service and evidence', intro: 'Operational reasoning fails when different levels are treated as one.', rows: [
    { concept: 'Component', useItFor: 'Describe one technical part and its interface.', doNotConfuseItWith: 'The user-facing service outcome.' },
    { concept: 'Reliability and resilience', useItFor: 'Reduce failure and continue or recover through disruption.', doNotConfuseItWith: 'Availability at one moment.' },
    { concept: 'Logs, metrics and traces', useItFor: 'Record events, measurements and request journeys.', doNotConfuseItWith: 'A complete explanation without context.' },
  ] },
  software: { title: 'Keep delivery terms precise', intro: 'Closely related delivery activities have different decisions and evidence.', rows: [
    { concept: 'Build', useItFor: 'Turn source and dependencies into a versioned artifact.', doNotConfuseItWith: 'Releasing that artifact for use.' },
    { concept: 'Release', useItFor: 'Authorize a version for a population or purpose.', doNotConfuseItWith: 'The technical act of deployment.' },
    { concept: 'Deployment', useItFor: 'Move and configure a version in an environment.', doNotConfuseItWith: 'Proof that users received value.' },
  ] },
  cloud: { title: 'Responsibility changes by service model', intro: 'Cloud labels describe different abstraction and control boundaries.', rows: [
    { concept: 'Infrastructure as a Service', useItFor: 'Consume compute, network and storage while managing more of the stack.', doNotConfuseItWith: 'Provider responsibility for guest systems and data.' },
    { concept: 'Platform as a Service', useItFor: 'Consume a managed runtime or data platform.', doNotConfuseItWith: 'No responsibility for identity, code or configuration.' },
    { concept: 'Software as a Service', useItFor: 'Consume an application capability.', doNotConfuseItWith: 'No responsibility for users, data, settings or continuity.' },
  ] },
  cyber: { title: 'Build a cause and control model', intro: 'Security terms are useful only when their relationship stays clear.', rows: [
    { concept: 'Threat', useItFor: 'Describe a potential cause of harm.', doNotConfuseItWith: 'A weakness that makes harm possible.' },
    { concept: 'Vulnerability or exposure', useItFor: 'Describe a weakness and the conditions that make it reachable.', doNotConfuseItWith: 'Business impact by itself.' },
    { concept: 'Risk and control', useItFor: 'Connect a scenario to consequence and treatment.', doNotConfuseItWith: 'A severity score or product feature.' },
  ] },
  governance: { title: 'Separate direction, execution and assurance', intro: 'A document hierarchy and an assurance conclusion do different jobs.', rows: [
    { concept: 'Policy', useItFor: 'Set approved direction and boundaries.', doNotConfuseItWith: 'Step-by-step work instructions.' },
    { concept: 'Standard and procedure', useItFor: 'Make requirements precise and explain execution.', doNotConfuseItWith: 'Evidence that execution occurred.' },
    { concept: 'Assessment, audit and certification', useItFor: 'Provide different scopes and levels of confidence.', doNotConfuseItWith: 'A universal guarantee of safety or compliance.' },
  ] },
  risk: { title: 'Use risk language for decisions', intro: 'These boundaries prevent false precision and accidental acceptance.', rows: [
    { concept: 'Risk appetite', useItFor: 'Express the amount and type of risk an organization is willing to pursue or retain.', doNotConfuseItWith: 'A specific operating threshold.' },
    { concept: 'Risk tolerance', useItFor: 'Set a measurable boundary around an objective or exposure.', doNotConfuseItWith: 'Maximum survivable capacity.' },
    { concept: 'Inherent and residual risk', useItFor: 'Compare exposure before and after controls.', doNotConfuseItWith: 'A claim that controls remove uncertainty.' },
  ] },
  data: { title: 'Keep meaning, movement and storage separate', intro: 'A data platform is a chain of distinct responsibilities.', rows: [
    { concept: 'Data and metadata', useItFor: 'Record facts and describe their meaning, structure and ownership.', doNotConfuseItWith: 'The same information serving the same purpose.' },
    { concept: 'ETL and ELT', useItFor: 'Choose when transformation occurs relative to loading.', doNotConfuseItWith: 'Batch versus streaming timing.' },
    { concept: 'Warehouse, lake and lakehouse', useItFor: 'Choose storage and management patterns for analytical use.', doNotConfuseItWith: 'Guaranteed data quality or governance.' },
  ] },
  ai: { title: 'Separate model, system and decision', intro: 'Most AI failures come from treating the model as the whole product.', rows: [
    { concept: 'Training', useItFor: 'Learn parameters from examples or feedback.', doNotConfuseItWith: 'Using the trained model in production.' },
    { concept: 'Inference', useItFor: 'Produce a prediction or generated output from current input.', doNotConfuseItWith: 'Proof that the result is correct or safe.' },
    { concept: 'Model, application and agent', useItFor: 'Distinguish prediction, product orchestration and multi-step tool use.', doNotConfuseItWith: 'One interchangeable level of autonomy.' },
  ] },
  emerging: { title: 'Separate maturity from momentum', intro: 'A compelling demonstration does not establish readiness for a dependable operating environment.', rows: [
    { concept: 'Research result', useItFor: 'Show that an effect or method is possible under stated conditions.', doNotConfuseItWith: 'A supportable product or repeatable organizational benefit.' },
    { concept: 'Prototype or pilot', useItFor: 'Test feasibility, workflow and assumptions in a bounded setting.', doNotConfuseItWith: 'Evidence of security, scale, interoperability or lifecycle support.' },
    { concept: 'Production adoption', useItFor: 'Operate a governed capability with owners, service levels, controls and exit.', doNotConfuseItWith: 'A permanent commitment to one vendor or architecture.' },
  ] },
  industries: { title: 'Translate controls through consequence', intro: 'The same word can imply very different stakes across domains.', rows: [
    { concept: 'Information Technology', useItFor: 'Support information processing and business services.', doNotConfuseItWith: 'Every system that changes a physical process.' },
    { concept: 'Operational Technology', useItFor: 'Monitor or control physical activity.', doNotConfuseItWith: 'An ordinary office endpoint.' },
    { concept: 'Safety, continuity and privacy', useItFor: 'Name distinct primary consequences.', doNotConfuseItWith: 'One generic severity label.' },
  ] },
  people: { title: 'Use the structure that matches the moment', intro: 'A framework should support thinking, not replace listening.', rows: [
    { concept: 'STAR', useItFor: 'Explain evidence from a past experience.', doNotConfuseItWith: 'A structure for every live opinion question.' },
    { concept: 'PREP', useItFor: 'Answer an unexpected question with a clear point and example.', doNotConfuseItWith: 'A full case-analysis method.' },
    { concept: 'SCQA', useItFor: 'Build a decision narrative from context to answer.', doNotConfuseItWith: 'A list of facts without a governing message.' },
  ] },
  ecosystem: { title: 'Classify the source before using it', intro: 'Authority, adoption and commercial interest must stay visible.', rows: [
    { concept: 'Law or regulation', useItFor: 'Identify binding duties within scope and jurisdiction.', doNotConfuseItWith: 'A voluntary technical standard.' },
    { concept: 'Standard or framework', useItFor: 'Define agreed requirements, outcomes or practices.', doNotConfuseItWith: 'Automatic legal applicability.' },
    { concept: 'Guidance or vendor material', useItFor: 'Interpret practice or a specific product.', doNotConfuseItWith: 'Neutral universal authority.' },
  ] },
};

function evidenceForTopic(topic: Topic, terms: GlossaryTerm[]) {
  const focus = terms.slice(0, 3).map((term) => term.term).join(', ') || topic.subtrack;
  return [
    `Purpose, scope and accountable owner for ${topic.title}`,
    `Current ${topic.title.toLowerCase()} boundary and dependency record covering ${focus}`,
    `Authoritative input, design, configuration or decision record for ${topic.title}`,
    `One time-stamped normal execution and one meaningful ${topic.title.toLowerCase()} exception`,
    `Observed ${topic.title.toLowerCase()} outcome, diagnostic signal and safe test result`,
    `Open ${topic.title.toLowerCase()} limitation, follow-up owner and review trigger`,
  ];
}

function decisionLensesForTopic(topic: Topic, terms: GlossaryTerm[]) {
  const first = terms[0]?.term ?? topic.subtrack;
  const second = terms[1]?.term ?? 'the main dependency';
  return [
    { title: 'Purpose', detail: `Which real decision, service or obligation requires ${topic.title.toLowerCase()}?` },
    { title: 'Mechanism', detail: `How do ${first} and ${second} change the result inside the working system?` },
    { title: 'Failure', detail: `Which assumption about ${topic.title.toLowerCase()} could fail first, and who would notice?` },
    { title: 'Evidence', detail: `Which observation would support the conclusion, and which limitation would remain?` },
  ];
}

function practitionerStepsForTopic(topic: Topic, terms: GlossaryTerm[]) {
  const focus = terms.slice(0, 3).map((term) => term.term).join(', ') || topic.subtrack;
  return [
    `Define the decision and boundary for ${topic.title}`,
    `Map the owner, users, dependencies and ${focus}`,
    `Observe a complete normal instance from source evidence`,
    `Test one realistic exception or failure safely`,
    `Connect the result to business consequence and trade-offs`,
    `Record the decision, evidence, limitation and next review`,
  ];
}

const stageDetails: Record<string, string> = {
  objective: 'Name the outcome, affected people and accountable owner before selecting a method or product.',
  purpose: 'State the legitimate need, success condition and boundary that guide every later choice.',
  process: 'Trace work, decisions, hand-offs, exceptions and ownership as they operate in reality.',
  people: 'Identify users, operators, decision makers, reviewers and groups affected by failure.',
  identity: 'Establish who or what is acting and the context used to make an access decision.',
  network: 'Follow the communication path, trust boundaries and controls that traffic crosses.',
  data: 'Track meaning, source, sensitivity, transformation, access and retention.',
  service: 'Treat the user-facing outcome as a dependency chain, not one application or server.',
  risk: 'Write a plausible cause-event-consequence scenario and the uncertainty around it.',
  control: 'Place preventive, detective, corrective and recovery measures where they can change the scenario.',
  evidence: 'Define the observation, record or test that supports a conclusion and its limitations.',
  monitor: 'Watch performance, exposure and thresholds that should trigger another decision.',
  improve: 'Use outcomes, incidents and assurance findings to change the design or operating process.',
  recover: 'Restore the important service within agreed time and data-loss objectives, then verify integrity.',
  retire: 'Remove access, data, dependencies and obligations safely when the capability is no longer needed.',
  telemetry: 'Collect the minimum useful logs, metrics, traces, flows and events needed to distinguish normal behavior, failure and suspicious activity.',
  discover: 'Clarify the user need, operating context, constraints, assumptions and most important questions before selecting a solution.',
  define: 'Turn the need into explicit outcomes, boundaries, requirements, measures and acceptance criteria.',
  design: 'Choose components, interfaces, trust boundaries, failure behavior and trade-offs before implementation makes them expensive to change.',
  build: 'Create the smallest reviewable change, keep dependencies controlled and preserve traceability to the intended outcome.',
  verify: 'Use proportionate tests and evidence to decide whether the result meets requirements and handles important failure cases.',
  release: 'Move a known version through an approved path with ownership, monitoring, rollback and communication.',
  operate: 'Run the service, observe health and security, handle demand and incidents, and keep configuration within approved boundaries.',
  learn: 'Compare actual outcomes with assumptions, then change the product, control, process or decision model.',
};

function stageDetail(label: string, topic: Topic, index: number, sections: DeepSection[]) {
  const labelTokens = tokens(label);
  for (const token of labelTokens) if (stageDetails[token]) return stageDetails[token];
  const section = sections[index % sections.length];
  if (section?.takeaway) return section.takeaway;
  const paragraph = section?.paragraphs[0];
  if (paragraph) return paragraph.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');
  return `Make ${label.toLowerCase()} explicit by naming its purpose, owner, boundary, failure conditions and evidence.`;
}

function edgeChain(nodes: DiagramNode[], feedback = false): DiagramEdge[] {
  const edges: DiagramEdge[] = nodes.slice(0, -1).map((node, index) => ({ from: node.id, to: nodes[index + 1].id, kind: 'normal' }));
  if (feedback && nodes.length > 2) edges.push({ from: nodes[nodes.length - 1].id, to: nodes[0].id, label: 'feedback', kind: 'feedback' });
  return edges;
}

function buildDiagrams(topic: Topic, seed: GuideSeed, sections: DeepSection[]): DiagramView[] {
  const sequenceGuides = new Set([
    'the-end-to-end-digital-service-journey',
    'business-models-value-chains-and-operating-models',
    'process-mapping-bottlenecks-and-continuous-improvement',
    'enterprise-architecture-and-technology-lifecycle',
    'software-development-life-cycle-and-delivery-methods',
    'continuous-integration-delivery-release-and-deployment',
    'secure-sdlc-devsecops-and-software-supply-chain',
    'threat-actors-motives-and-attack-lifecycles',
    'incident-response-digital-forensics-and-recovery',
    'digital-identity-directories-and-the-identity-lifecycle',
    'vulnerability-management-lifecycle',
    'data-lifecycle-classification-and-protection',
    'data-pipelines-etl-elt-streaming-and-integration',
    'mlops-llmops-model-monitoring-and-incident-response',
    'enterprise-technology-and-cyber-risk-management',
  ]);
  if (!sequenceGuides.has(topic.slug)) return [];
  const processNodes = seed.flow.map((label, index) => ({ id: `flow-${index + 1}`, label, detail: stageDetail(label, topic, index, sections), group: index < Math.ceil(seed.flow.length / 2) ? 'Understand' : 'Act' }));
  const lifecycle = /(lifecycle|cycle|continuous|incident|development|risk|identity|vulnerability|interview|negotiation)/i.test(topic.title);
  return [
    { id: 'process', label: lifecycle ? 'Lifecycle' : 'Sequence', title: `${topic.title}: working sequence`, intro: 'Select a stage to inspect its purpose, decision and relationship to the next step.', type: lifecycle ? 'cycle' : 'flow', nodes: processNodes, edges: edgeChain(processNodes, lifecycle) },
  ];
}

function relevantTools(topic: Topic) {
  if (!['systems', 'software', 'cloud', 'cyber', 'data', 'ai', 'emerging'].includes(topic.category)) return [];
  const searchTokens = tokens(`${topic.title} ${topic.summary} ${topic.subtrack}`);
  const categoryDefaults: Partial<Record<Topic['category'], string[]>> = {
    systems: ['network', 'protocol', 'host'], software: ['software', 'pipeline', 'source code'], cloud: ['cloud', 'container'], cyber: ['security', 'detection', 'vulnerability'], data: ['database'], ai: ['model', 'inference', 'evaluation'], emerging: ['iot', 'internet', 'network'],
  };
  const defaultTokens = categoryDefaults[topic.category] ?? [];
  return toolCatalog.map((tool, index) => {
    const content = `${tool.name} ${tool.family} ${tool.purpose} ${tool.keywords.join(' ')}`;
    const specific = scoreText(searchTokens, content) * 5;
    const broad = scoreText(defaultTokens, content);
    return { tool, score: specific + broad, index };
  }).filter((item) => item.score >= 4).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 6).map((item) => item.tool);
}

export function buildGuideEnrichment(topic: Topic, seed: GuideSeed): GuideEnrichment {
  const industry = topic.category === 'industries' ? industryForTopic(topic) : undefined;
  const deepSections = industry ? industrySections(topic, industry) : topic.category === 'ecosystem' ? ecosystemSections(topic) : chapterSections(topic);
  const terms = selectTerms(topic);
  return {
    sourceCoverage: topic.category === 'industries' || topic.category === 'ecosystem' ? 'Handbook + domain references' : 'Handbook + primary references',
    deepSections,
    diagramViews: buildDiagrams(topic, seed, deepSections),
    terms,
    comparison: comparisons[topic.category],
    evidenceChecklist: evidenceForTopic(topic, terms),
    decisionLenses: decisionLensesForTopic(topic, terms),
    practitionerChecklist: practitionerStepsForTopic(topic, terms),
    relevantTools: relevantTools(topic),
  };
}
