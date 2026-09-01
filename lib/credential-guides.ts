import type { FrameworkRecord } from './frameworks';

export type CredentialGuide = {
  label: string;
  organization: string;
  individual: string;
  assessment: string;
  prerequisites: string;
  register: string;
  registerUrl: string;
  teaches: string[];
  bestFor: string;
};

const internalAuditGuide: CredentialGuide = {
  label: 'Standard and professional credential',
  organization: 'The Global Internal Audit Standards apply to an internal audit function. The function demonstrates conformance through its Quality Assurance and Improvement Program, including internal assessment and an external quality assessment at least once every five years. This is not the same as giving the company a CIA certificate.',
  individual: 'The Certified Internal Auditor, or CIA, is an individual credential issued by The Institute of Internal Auditors. The standard three-part route covers internal audit fundamentals, engagement work and management of the internal audit function. The Internal Audit Practitioner route is an accessible entry point and can waive CIA Part 1 when its conditions are met.',
  assessment: 'Traditional CIA route: three computer-based multiple-choice exams. Part 1 has 125 questions in 150 minutes. Parts 2 and 3 each have 100 questions in 120 minutes. Approved challenge routes use a separate one-part examination.',
  prerequisites: 'Education and experience depend on the route. A master’s degree generally requires one year of relevant experience; a bachelor’s degree generally requires two. Students or candidates without a degree can begin with the Internal Audit Practitioner route. Always confirm the live eligibility table before applying.',
  register: 'Create or sign in to The IIA Certification Candidate Management System, submit the application and documents, then register and schedule each approved exam part.',
  registerUrl: 'https://www.theiia.org/en/certifications/cia',
  teaches: ['Governance, independence and ethics', 'Risk-based planning', 'Engagement planning and fieldwork', 'Evidence, findings and communication', 'Managing and improving an internal audit function'],
  bestFor: 'Internal auditors, risk and control professionals, assurance specialists, compliance professionals and people moving into audit leadership.',
};

function isoGuide(item: FrameworkRecord): CredentialGuide {
  return {
    label: 'Organization certification and optional personal training',
    organization: `${item.shortName} applies to a defined organizational scope. Where the standard is certifiable, an independent certification body audits that scope. ISO and IEC publish standards; they do not audit companies or issue the certificate themselves.`,
    individual: `People may take implementer, auditor or lead-auditor courses from training and personnel-certification providers. Those are provider credentials, not a certificate issued by ISO. Check the syllabus, examination scheme, experience requirements and recognition of the specific provider.`,
    assessment: `For a management-system certification, the usual route includes readiness and scope work, a Stage 1 review, a Stage 2 implementation audit, corrective action where needed, surveillance audits and periodic recertification. Exact steps depend on the standard and certification body.`,
    prerequisites: `An organization needs a real, operating management system and evidence within the proposed scope. Individual course prerequisites vary by provider; foundational subject knowledge is commonly recommended before lead-implementer or lead-auditor training.`,
    register: `Organizations choose and contract with a competent certification body, preferably one whose accreditation can be verified. Individuals register directly with their selected training or personnel-certification provider.`,
    registerUrl: 'https://www.iso.org/certification.html',
    teaches: item.structure.slice(0, 6),
    bestFor: item.applicableTo,
  };
}

function nistGuide(item: FrameworkRecord): CredentialGuide {
  return {
    label: 'Public guidance, not a NIST certification',
    organization: `NIST publishes ${item.shortName} as public guidance or a technical reference. NIST does not certify or endorse an organization’s implementation of the Cybersecurity Framework, and it does not issue a general organization certificate for using this publication. Contracts, regulators or authorization programs may still require defined evidence.`,
    individual: `There is no official NIST practitioner exam for this publication. Commercial courses may issue completion badges or map their own exams to NIST material, but those credentials are not issued or endorsed by NIST.`,
    assessment: `A practitioner normally defines scope, applies or tailors the publication, records decisions and tests evidence. In Risk Management Framework contexts, an Authorizing Official makes a system-risk decision; that decision is not a generic personal certification.`,
    prerequisites: `No NIST exam prerequisite applies because NIST does not run an exam for this framework. Useful preparation includes system architecture, risk, controls and the companion publications referenced by the guide.`,
    register: `No registration is required to read or use the publication. Start with the official NIST page and download the current document and quick-start material.`,
    registerUrl: item.officialUrl,
    teaches: item.structure.slice(0, 6),
    bestFor: item.applicableTo,
  };
}

function defaultGuide(item: FrameworkRecord): CredentialGuide {
  const isLaw = item.authorityType === 'Law or regulation' || item.authorityType === 'Directive';
  return {
    label: isLaw ? 'Legal obligation, not a course certificate' : 'Assessment and credential boundary',
    organization: isLaw ? `${item.shortName} applies when its legal scope and role tests are met. A training certificate does not make an organization compliant.` : item.certificationOrAssurance,
    individual: isLaw ? `A person can study the law through professional education, but the authority does not award a universal practitioner certificate that substitutes for legal analysis.` : `Individual credentials, when available, are separate from an organization-level assessment. Verify the issuing body, examination, prerequisites, renewal rules and the exact claim the credential supports.`,
    assessment: item.certificationOrAssurance,
    prerequisites: isLaw ? `Start with jurisdiction, role, subject matter, commencement and applicable exemptions. Professional-course prerequisites depend on the provider.` : `Requirements depend on the exact assessment or credential scheme. Do not infer them from the framework name alone.`,
    register: isLaw ? `There is no general compliance exam to register for. Use the official legal source and the competent authority for current guidance.` : `Use the official owner’s page to identify recognized assessment, training or credential routes.`,
    registerUrl: item.officialUrl,
    teaches: item.structure.slice(0, 6),
    bestFor: item.applicableTo,
  };
}

export function credentialGuideFor(item: FrameworkRecord): CredentialGuide {
  if (item.slug === 'global-internal-audit-standards') return internalAuditGuide;
  if (item.owner.includes('National Institute of Standards and Technology')) return nistGuide(item);
  if (item.owner.includes('International Organization for Standardization') || item.shortName.startsWith('ISO')) return isoGuide(item);
  return defaultGuide(item);
}
