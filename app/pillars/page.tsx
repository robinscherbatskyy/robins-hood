import type { Metadata } from 'next';
import Link from 'next/link';
import { pillars } from '../../lib/pillars';

export const metadata: Metadata = {
  title: 'Core Knowledge Pillars | Robin’s Hood',
  description: 'Ten substantial, connected guides covering business, systems, software, cloud, data, AI and emerging technology, cybersecurity, governance, risk and people.',
};

export default function PillarsPage() {
  return <main className="inner-page pillars-page">
    <section className="page-hero pillars-hero">
      <p className="eyebrow dark"><span /> The primary reading experience</p>
      <div><h1>Ten complete pillars.<br /><em>One working system.</em></h1><p>Read each pillar as a substantial handbook chapter. Learn the foundations, see where each idea sits, follow realistic examples, then open a narrower deep dive only when you need it.</p></div>
      <aside><strong>{pillars.length}</strong><span>consolidated guides</span><i>Content first · connected</i></aside>
    </section>
    <section className="pillar-principle-strip compact-principle-strip">
      <div><span>01</span><strong>Understand the purpose</strong><p>Begin with the outcome and the problem the discipline solves.</p></div>
      <div><span>02</span><strong>Map the moving parts</strong><p>Place systems, people, decisions, information, and controls.</p></div>
      <div><span>03</span><strong>Apply the judgment</strong><p>Use cases, evidence, tradeoffs, and cross-pillar links.</p></div>
    </section>
    <section className="pillar-overview-grid">
      {pillars.map((pillar) => <Link className={`pillar-overview-card accent-${pillar.accent}`} href={`/pillars/${pillar.slug}`} key={pillar.slug}>
        <header><small>{pillar.readTime} min complete read</small></header>
        <h2>{pillar.title}</h2>
        <p>{pillar.subtitle}</p>
        <div><span>{pillar.chapters.length} chapters</span><span>{pillar.terms.length} core terms</span></div>
        <footer className="pillar-card-footer"><span>{pillar.number}</span><b>Read the complete pillar →</b></footer>
      </Link>)}
    </section>
  </main>;
}
