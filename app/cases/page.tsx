import type { Metadata } from 'next';
import CasesClient from '../../components/CasesClient';
import { caseStudies } from '../../lib/resources';

export const metadata: Metadata = { title: "Case Studies: Robin's Hood", description: 'Documented incidents and fictional decision cases linking technology, security, risk, governance and industries.' };

export default function CasesPage() {
  const realCount = caseStudies.filter((item) => item.type === 'Documented case').length;
  return <main className="inner-page cases-page">
    <section className="page-hero cases-hero"><p className="eyebrow dark"><span /> Knowledge becomes judgment through cases</p><div><h1>Follow the system<br /><em>when reality bites.</em></h1><p>Documented incidents and clearly labeled fictional composites. Trace the facts, dependencies, decisions, controls and lessons across more than one discipline.</p></div><aside><strong>{caseStudies.length}</strong><span>case files</span><i>{realCount} documented · {caseStudies.length - realCount} composite</i></aside></section>
    <CasesClient />
  </main>;
}
