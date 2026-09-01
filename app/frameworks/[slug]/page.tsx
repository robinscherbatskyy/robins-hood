import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { frameworkBySlug, frameworkCatalog, frameworkTypeSummary } from '../../../lib/frameworks';
import { credentialGuideFor } from '../../../lib/credential-guides';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return frameworkCatalog.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = frameworkBySlug.get(slug);
  return item ? { title: `${item.shortName}: Robin's Hood`, description: item.purpose } : {};
}

export default async function FrameworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = frameworkBySlug.get(slug);
  if (!item) notFound();
  const complements = item.complementary.map((related) => frameworkBySlug.get(related)).filter(Boolean);
  const credential = credentialGuideFor(item);

  return <main className="inner-page framework-detail-page">
    <section className="framework-detail-hero">
      <div className="framework-breadcrumb"><Link href="/frameworks">Framework library</Link><span>→</span><span>{item.shortName}</span></div>
      <div className="framework-detail-title"><div><p className="eyebrow dark"><span /> {item.authorityType}</p><h1>{item.shortName}</h1><h2>{item.fullName}</h2></div><aside><span>{item.status}</span><strong>{item.currentEdition}</strong><small>Reviewed {item.checkedAt}</small></aside></div>
      <p className="framework-thesis">{item.purpose}</p>
    </section>

    <section className="framework-identity-strip">
      <div><span>Owner</span><strong>{item.owner}</strong></div>
      <div><span>Jurisdiction</span><strong>{item.jurisdiction}</strong></div>
      <div><span>Who may be in scope</span><strong>{item.applicableTo}</strong></div>
    </section>

    <section className="framework-credential-guide">
      <header><span>{credential.label}</span><h2>Who is assessed, who can earn a credential, and where to begin.</h2></header>
      <div className="framework-credential-grid">
        <article><span>Organization</span><p>{credential.organization}</p></article>
        <article><span>Individual</span><p>{credential.individual}</p></article>
        <article><span>Exam or assessment</span><p>{credential.assessment}</p></article>
        <article><span>Prerequisites</span><p>{credential.prerequisites}</p></article>
      </div>
      <div className="framework-credential-action"><div><span>What it teaches</span>{credential.teaches.map((part) => <b key={part}>{part}</b>)}</div><div><span>Best suited to</span><p>{credential.bestFor}</p><strong>{credential.register}</strong><a href={credential.registerUrl} target="_blank" rel="noreferrer">Open the official starting point ↗</a></div></div>
    </section>

    <section className="framework-reading-grid">
      <article className="framework-reading-main">
        <section><span>01 · What kind of authority is this?</span><h2>{item.authorityType}</h2><p>{frameworkTypeSummary(item.authorityType)}</p><div className="framework-status-note"><strong>Current position</strong><p>{item.statusDetail}</p></div></section>
        <section><span>02 · How it is organized</span><h2>Read the structure before selecting controls.</h2><ol className="framework-structure-list">{item.structure.map((part, index) => <li key={part}><b>{String(index + 1).padStart(2, '0')}</b><span>{part}</span></li>)}</ol></section>
        {item.timeline?.length ? <section><span>03 · Commencement timeline</span><h2>Different provisions take effect at different times.</h2><div className="framework-timeline">{item.timeline.map((phase) => <div key={`${phase.date}-${phase.detail}`}><b>{phase.date}</b><i>{phase.status}</i><p>{phase.detail}</p></div>)}</div></section> : null}
        <section><span>{item.timeline?.length ? '04' : '03'} · Implementation</span><h2>Use it to make decisions and create evidence.</h2><div className="framework-use-grid">{item.usefulFor.map((use) => <div key={use}><span>Use case</span><strong>{use}</strong></div>)}</div></section>
        <section><span>{item.timeline?.length ? '05' : '04'} · Evidence map</span><h2>A claim becomes credible when it leaves a trace.</h2><div className="framework-evidence-chain">{item.evidence.map((evidence, index) => <div key={evidence}><b>{index + 1}</b><span>{evidence}</span>{index < item.evidence.length - 1 ? <i>→</i> : null}</div>)}</div></section>
        <section><span>{item.timeline?.length ? '06' : '05'} · Assurance boundary</span><h2>What can be certified, attested or assessed?</h2><p>{item.certificationOrAssurance}</p><div className="framework-boundaries"><strong>Do not confuse it with</strong>{item.notEquivalentTo.map((boundary) => <span key={boundary}>{boundary}</span>)}</div></section>
      </article>

      <aside className="framework-reading-side">
        <div><span>Domains</span>{item.domains.map((domain) => <b key={domain}>{domain}</b>)}</div>
        {item.aliases?.length ? <div><span>Also searched as</span>{item.aliases.map((alias) => <b key={alias}>{alias}</b>)}</div> : null}
        <div><span>Source of truth</span><p>Always confirm the official text, current edition, local adoption and any transitional dates before making a compliance claim.</p><a href={item.officialUrl} target="_blank" rel="noreferrer">Open official source ↗</a></div>
      </aside>
    </section>

    <section className="framework-connections"><header><span>Connected governance stack</span><h2>Useful frameworks usually complement one another.</h2><p>A legal duty, a management system, a risk method, a control catalog and an assurance report answer different questions.</p></header><div>{complements.map((related) => related ? <Link href={`/frameworks/${related.slug}`} key={related.slug}><span>{related.authorityType}</span><strong>{related.shortName}</strong><p>{related.purpose}</p><b>Open reference →</b></Link> : null)}</div></section>
  </main>;
}
