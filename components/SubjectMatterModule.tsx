import Link from 'next/link';
import AiSystemExplorer from './AiSystemExplorer';
import ControlFunctionExplorer from './ControlFunctionExplorer';
import CyberFoundationsExplorer from './CyberFoundationsExplorer';
import DetectionOperationsExplorer from './DetectionOperationsExplorer';
import FinancialControlsExplorer from './FinancialControlsExplorer';
import IdentityLifecycleExplorer from './IdentityLifecycleExplorer';
import InternalAuditExplorer from './InternalAuditExplorer';
import LinuxPermissionsLab from './LinuxPermissionsLab';
import PasswordDefenseExplorer from './PasswordDefenseExplorer';
import RiskControlAtlas from './RiskControlAtlas';
import SoftwareWeaknessExplorer from './SoftwareWeaknessExplorer';

const aiSlugs = new Set([
  'artificial-intelligence-and-machine-learning-foundations',
  'generative-ai-large-language-models-retrieval-and-agents',
  'ai-system-architecture-context-retrieval-tools-and-memory',
  'ai-agents-orchestration-and-human-oversight',
]);

const identitySlugs = new Set([
  'digital-identity-directories-and-the-identity-lifecycle',
  'authorization-and-access-control-models',
  'identity-governance-and-administration',
  'privileged-service-and-machine-identity-security',
]);

const detectionSlugs = new Set([
  'security-operations-detection-and-threat-intelligence',
  'detection-engineering-telemetry-and-coverage-validation',
  'edr-ndr-xdr-and-detection-technology-landscape',
  'siem-soar-and-security-analytics-platforms',
]);

const riskSlugs = new Set([
  'enterprise-technology-and-cyber-risk-management',
  'risk-foundations-taxonomies-appetite-and-tolerance',
  'operational-financial-conduct-project-and-reputational-risk',
]);

const auditSlugs = new Set([
  'governance-accountability-and-policy-systems',
  'audit-assurance-attestation-and-certification',
  'control-design-operation-testing-and-evidence',
  'internal-audit-planning-engagements-findings-and-follow-up',
]);

export function subjectModuleLink(slug: string) {
  if (slug === 'cybersecurity-goals-and-principles') return { href: '#cyber-foundations', label: 'Cybersecurity essentials' };
  if (slug === 'software-vulnerability-families-and-secure-coding') return { href: '#weakness-atlas', label: 'Weakness field guide' };
  if (slug === 'password-attacks-offline-cracking-and-authentication-defense') return { href: '#password-defense', label: 'Authentication defense model' };
  if (slug === 'linux-users-groups-and-file-permissions') return { href: '#linux-permission-lab', label: 'Permission lab' };
  if (slug === 'core-security-control-families') return { href: '#control-functions', label: 'Control functions' };
  if (aiSlugs.has(slug)) return { href: '#ai-system-map', label: 'AI architecture' };
  if (identitySlugs.has(slug)) return { href: '#identity-lifecycle-map', label: 'Identity model' };
  if (detectionSlugs.has(slug)) return { href: '#detection-operations-map', label: 'Detection map' };
  if (riskSlugs.has(slug)) return { href: '#risk-control-atlas', label: 'Risk atlas' };
  if (slug === 'control-design-operation-testing-and-evidence') return { href: '#control-functions', label: 'Control functions and testing' };
  if (auditSlugs.has(slug)) return { href: '#internal-audit', label: 'Audit model' };
  if (slug === 'sox-icfr-itgc-and-application-controls') return { href: '#financial-controls-map', label: 'Financial controls' };
  return undefined;
}

export default function SubjectMatterModule({ slug }: { slug: string }) {
  if (slug === 'cybersecurity-goals-and-principles') return <CyberFoundationsExplorer />;
  if (slug === 'software-vulnerability-families-and-secure-coding') return <SoftwareWeaknessExplorer />;
  if (slug === 'password-attacks-offline-cracking-and-authentication-defense') return <PasswordDefenseExplorer />;
  if (slug === 'linux-users-groups-and-file-permissions') return <section className="article-section subject-module" id="linux-permission-lab"><header className="subject-module-header"><div><span>Interactive Linux model</span><h2>Turn rwx bits into a permission you can explain.</h2></div><Link href="/linux">Open the complete Linux learning lab →</Link></header><LinuxPermissionsLab /></section>;
  if (slug === 'core-security-control-families') return <ControlFunctionExplorer />;
  if (aiSlugs.has(slug)) return <AiSystemExplorer />;
  if (identitySlugs.has(slug)) return <IdentityLifecycleExplorer />;
  if (detectionSlugs.has(slug)) return <DetectionOperationsExplorer />;
  if (riskSlugs.has(slug)) return <RiskControlAtlas />;
  if (slug === 'control-design-operation-testing-and-evidence') return <><ControlFunctionExplorer /><InternalAuditExplorer /></>;
  if (auditSlugs.has(slug)) return <InternalAuditExplorer />;
  if (slug === 'sox-icfr-itgc-and-application-controls') return <FinancialControlsExplorer />;
  return null;
}
