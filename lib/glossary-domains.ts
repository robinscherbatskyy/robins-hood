export type GlossaryDomain = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
};

export const glossaryDomains: GlossaryDomain[] = [
  { slug: 'business-operations', label: 'Business, product and operations', shortLabel: 'Business', description: 'Strategy, value, finance, operating models, products, projects and management.', color: 'lime' },
  { slug: 'computing-linux', label: 'Computing and Linux', shortLabel: 'Computing & Linux', description: 'Hardware, operating systems, shells, filesystems, services and administration.', color: 'cyan' },
  { slug: 'networks-internet', label: 'Networks and internet', shortLabel: 'Networks', description: 'Addressing, routing, protocols, web infrastructure and connectivity.', color: 'sky' },
  { slug: 'software-delivery', label: 'Software and delivery', shortLabel: 'Software', description: 'Software engineering, architecture, testing, SDLC and DevSecOps.', color: 'indigo' },
  { slug: 'cloud-platforms', label: 'Cloud and platforms', shortLabel: 'Cloud', description: 'Cloud services, containers, platform engineering, reliability and shared responsibility.', color: 'blue' },
  { slug: 'data-analytics', label: 'Data and analytics', shortLabel: 'Data', description: 'Data architecture, quality, governance, databases, analytics and protection.', color: 'rose' },
  { slug: 'artificial-intelligence', label: 'Artificial intelligence', shortLabel: 'AI', description: 'Machine Learning, neural networks, generative AI, retrieval, agents and AI operations.', color: 'violet' },
  { slug: 'emerging-technology', label: 'Emerging technology', shortLabel: 'Emerging tech', description: 'Blockchain, quantum, robotics, digital twins, edge and spatial technology.', color: 'amber' },
  { slug: 'cybersecurity-architecture', label: 'Cybersecurity and architecture', shortLabel: 'Cybersecurity', description: 'Security principles, threats, architecture, cryptography and protective controls.', color: 'orange' },
  { slug: 'identity-access', label: 'Identity and access', shortLabel: 'Identity', description: 'Identity proofing, authentication, authorization, privilege and federation.', color: 'teal' },
  { slug: 'security-operations-tools', label: 'Security operations and tools', shortLabel: 'Security ops & tools', description: 'Detection, response, VAPT, attack-surface work and practical security tools.', color: 'red' },
  { slug: 'governance-assurance', label: 'Governance and assurance', shortLabel: 'Governance', description: 'Policies, controls, audit, evidence, standards, frameworks and assurance.', color: 'slate' },
  { slug: 'privacy-law', label: 'Privacy and law', shortLabel: 'Privacy & law', description: 'Privacy roles, processing principles, individual rights, laws and regulatory duties.', color: 'pink' },
  { slug: 'risk-resilience', label: 'Risk and resilience', shortLabel: 'Risk & resilience', description: 'Risk methods, continuity, disaster recovery, crisis management and resilience.', color: 'green' },
  { slug: 'industry-ot', label: 'Industry and operational technology', shortLabel: 'Industry & OT', description: 'Sector operations, industrial systems, safety and cyber-physical environments.', color: 'brown' },
  { slug: 'people-professional', label: 'People and professional skills', shortLabel: 'People', description: 'Communication, interviews, leadership, networking, negotiation and collaboration.', color: 'purple' },
];

const categoryDomains: Record<string, string> = {
  Business: 'business-operations', Management: 'business-operations', Operations: 'business-operations',
  Foundations: 'computing-linux', Systems: 'computing-linux', Linux: 'computing-linux',
  Networking: 'networks-internet', Internet: 'networks-internet',
  Software: 'software-delivery', 'Secure development': 'software-delivery',
  Cloud: 'cloud-platforms', Platform: 'cloud-platforms',
  Data: 'data-analytics', Analytics: 'data-analytics',
  'Artificial intelligence': 'artificial-intelligence',
  'Emerging technology': 'emerging-technology', Quantum: 'emerging-technology', Blockchain: 'emerging-technology',
  Security: 'cybersecurity-architecture', 'Security architecture': 'cybersecurity-architecture', Cryptography: 'cybersecurity-architecture',
  Identity: 'identity-access',
  'Security operations': 'security-operations-tools', 'Security testing': 'security-operations-tools', 'Security tool': 'security-operations-tools', 'Common confusion': 'security-operations-tools',
  GRC: 'governance-assurance', Control: 'governance-assurance', Governance: 'governance-assurance', Framework: 'governance-assurance', Assurance: 'governance-assurance',
  Privacy: 'privacy-law', Law: 'privacy-law', Regulation: 'privacy-law',
  Risk: 'risk-resilience', Resilience: 'risk-resilience',
  Industry: 'industry-ot', 'Operational technology': 'industry-ot',
  Professional: 'people-professional',
};

export function domainSlugForTerm(term: { category: string; domainSlug?: string }) {
  return term.domainSlug ?? categoryDomains[term.category] ?? 'governance-assurance';
}

export function glossaryDomainBySlug(slug: string) {
  return glossaryDomains.find((domain) => domain.slug === slug);
}

export function glossaryTermAnchor(term: string) {
  return `term-${term.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}
