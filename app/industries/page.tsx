import type { Metadata } from 'next';
import { industries } from '../../lib/ecosystem';
import IndustryChainExplorer from '../../components/IndustryChainExplorer';

export const metadata: Metadata = { title: 'Industry Domains: Robin’s Hood', description: 'See how technology, systems, security, governance and risk change across major industries.' };

const industryGuideSlugs: Record<string, string> = {
  manufacturing: 'manufacturing-and-industrial-operations',
  'technology-services': 'technology-saas-and-professional-services',
  'public-sector': 'government-public-services-education-and-nonprofits',
  'transport-logistics': 'transportation-logistics-aviation-automotive-and-maritime',
  healthcare: 'healthcare-and-life-sciences',
  retail: 'retail-e-commerce-and-consumer-services',
  telecommunications: 'telecommunications-media-and-entertainment',
  energy: 'energy-utilities-and-critical-infrastructure',
};

export default function IndustriesPage() {
  return <main className="inner-page industries-page">
    <section className="page-hero industries-hero compact-collection-hero"><p className="eyebrow dark"><span /> One knowledge spine, many operating realities</p><div><h1>Technology changes<br /><em>when the stakes change.</em></h1><p>Compare the value chains, systems, crown jewels, failure modes and control priorities of nine major domains.</p></div><aside><strong>09</strong><span>industry lenses</span><i>Global · neutral</i></aside></section>
    <section className="industry-intro"><div><span>How priorities change</span><strong>The same technology can carry a very different consequence.</strong></div><p><strong>A failed login is inconvenient in retail, dangerous during emergency care, and potentially systemic in critical infrastructure.</strong> Banking emphasizes transaction and ledger integrity. Manufacturing puts safety and physical continuity first. Healthcare joins patient care, privacy and device availability.</p></section>
    <IndustryChainExplorer />
    <section className="industry-grid">{industries.map((industry, index) => <article id={industry.slug} className="industry-card" key={industry.slug}>
      <header><span>{String(index + 1).padStart(2, '0')}</span><h2>{industry.title}</h2><p>{industry.tagline}</p></header>
      <div className="industry-chain-preview"><span>Operating stages</span><div>{industry.valueChain.map((step, stageIndex) => <b key={step}><i>{stageIndex + 1}</i>{step}</b>)}</div><a href="#industry-operating-map">Open interactive map ↑</a></div>
      <div className="industry-decision-lens"><span>Decision in context</span><p>{industry.caseStudy}</p><div><b>Control priorities</b><ol>{industry.priorities.map((item) => <li key={item}>{item}</li>)}</ol></div></div>
      <div className="industry-columns"><div><h3>Systems you meet</h3><ul>{industry.systems.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>What must be protected</h3><ul>{industry.crownJewels.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Primary risk families</h3><ul>{industry.risks.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      <a href={`/learn/${industryGuideSlugs[industry.slug] ?? industry.slug}`}>Open the complete domain guide →</a>
    </article>)}</section>
  </main>;
}
