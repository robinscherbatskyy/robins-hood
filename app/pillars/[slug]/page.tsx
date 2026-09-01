import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ControlFunctionExplorer from '../../../components/ControlFunctionExplorer';
import InternalAuditExplorer from '../../../components/InternalAuditExplorer';
import RiskControlAtlas from '../../../components/RiskControlAtlas';
import { pillarBySlug, pillars } from '../../../lib/pillars';
import { categories, topics } from '../../../lib/topics';

function structureChapter(body: string) {
  const sentences = body.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [body];
  const paragraphs: string[] = [];
  const groupSize = sentences.length > 9 ? 3 : 2;
  for (let index = 0; index < sentences.length; index += groupSize) paragraphs.push(sentences.slice(index, index + groupSize).join(' '));
  return paragraphs;
}

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pillar = pillarBySlug.get(slug);
  if (!pillar) return { title: 'Pillar not found | Robin’s Hood' };
  return {
    title: `${pillar.title} | Robin’s Hood`,
    description: pillar.subtitle,
    openGraph: { title: pillar.title, description: pillar.subtitle, images: [] },
    twitter: { card: 'summary', title: pillar.title, description: pillar.subtitle, images: [] },
  };
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = pillarBySlug.get(slug);
  if (!pillar) notFound();
  const deepDives = topics.filter((topic) => topic.category === pillar.category);
  const emergingDives = pillar.category === 'ai' ? topics.filter((topic) => topic.category === 'emerging') : [];

  return <main className={`pillar-page accent-${pillar.accent}`}>
    <div className="pillar-breadcrumb"><Link href="/pillars">Core pillars</Link><span>›</span><b>{pillar.number}</b><span>›</span><strong>{categories[pillar.category].short}</strong></div>

    <section className="pillar-hero">
      <div className="pillar-hero-number">{pillar.number}</div>
      <div className="pillar-hero-copy"><p>{pillar.question}</p><h1>{pillar.title}</h1><strong>{pillar.subtitle}</strong><div><p>{pillar.purpose}</p></div></div>
      <aside><span>Consolidated pillar</span><b>{pillar.readTime} min</b><small>{pillar.chapters.length} chapters · {pillar.terms.length} defined terms</small></aside>
    </section>

    {pillar.category === 'risk' && <RiskControlAtlas />}

    {pillar.category === 'cyber' && <><ControlFunctionExplorer compact /><section className="pillar-resource-callout"><div><span>Interactive resource</span><h2>Move from security foundations into realistic attack and defense scenarios.</h2><p>The standalone Attack and Defense Guide connects attack paths, telemetry, controls, tools, response and authorized validation. Use the attack perspective, defense perspective or connected view.</p></div><Link href="/red-blue">Open the Attack and Defense Guide →</Link></section></>}

    {pillar.category === 'governance' && <InternalAuditExplorer />}

    <section className="pillar-reading-shell">
      <aside className="pillar-toc"><span>In this pillar</span>{pillar.category === 'risk' && <a href="#risk-control-atlas"><i>R</i>Risk and control atlas</a>}{pillar.category === 'cyber' && <a href="#control-functions"><i>C</i>Control functions</a>}{pillar.category === 'governance' && <a href="#internal-audit"><i>A</i>Internal Audit</a>}{pillar.chapters.map((chapter, index) => <a href={`#chapter-${index + 1}`} key={chapter.title}><i>{String(index + 1).padStart(2, '0')}</i>{chapter.title}</a>)}<a href="#terms"><i>T</i>Core terms</a>{pillar.pioneers && <a href="#pioneers"><i>H</i>History and pioneers</a>}{pillar.providerCategories && <a href="#landscape"><i>L</i>Capability landscape</a>}<a href="#case"><i>C</i>Connected case</a><a href="#misconceptions"><i>M</i>Misconceptions</a><a href="#linkages"><i>↗</i>Actual linkages</a>{emergingDives.length > 0 && <a href="#emerging-technology"><i>E</i>Emerging technology</a>}<a href="#deep-dives"><i>D</i>Deep dives</a></aside>

      <article className="pillar-reading">
        <header className="pillar-index"><span>Reading map</span><h2>Build the model in order.</h2><p>Every chapter is full reading material. Use the narrower deep dives only after this consolidated foundation.</p><div>{pillar.chapters.map((chapter, index) => <a href={`#chapter-${index + 1}`} key={chapter.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{chapter.title}</strong><small>Core concept</small></a>)}</div></header>

        {pillar.chapters.map((chapter, index) => {
          const connection = pillar.relatedPillars[index % pillar.relatedPillars.length];
          const readingBlocks = structureChapter(chapter.body);
          return <section className="pillar-chapter" id={`chapter-${index + 1}`} key={chapter.title}>
            <header><span>Chapter {String(index + 1).padStart(2, '0')} · foundation to judgment</span><h2>{chapter.title}</h2></header>
            <div className="pillar-prose">{readingBlocks.map((paragraph, paragraphIndex) => <p key={`${paragraphIndex}-${paragraph}`}>{paragraph}</p>)}</div>
            {connection && <div className="pillar-connection"><span>Actual linkage · {connection.title}</span><p>{connection.relationship}</p></div>}
          </section>;
        })}

        <section className="pillar-reference-section" id="terms">
          <header><span>Core vocabulary</span><h2>Learn the full form and the actual job.</h2><p>An acronym is useful only when you understand the capability, boundary, and decision behind it.</p></header>
          <div className="pillar-term-grid">{pillar.terms.map((item) => <article key={item.term}><span>{item.term}</span>{item.expansion && <strong>{item.expansion}</strong>}<p>{item.meaning}</p></article>)}</div>
        </section>

        {pillar.pioneers && <section className="pillar-pioneers" id="pioneers"><header><span>Origins and people</span><h2>Ideas have a history.</h2><p>These people represent important milestones, not a claim that progress came from individuals working alone.</p></header><div>{pillar.pioneers.map((person, index) => <article key={person.name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{person.name}</strong><p>{person.context}</p></article>)}</div></section>}

        {pillar.providerCategories && <section className="pillar-landscape" id="landscape"><header><span>Capability landscape</span><h2>Where tools sit and what they are for.</h2><p>Categories explain the job. Provider names are examples, not endorsements or rankings.</p></header><div>{pillar.providerCategories.map((item) => <article key={item.category}><span>{item.category}</span><p>{item.purpose}</p><div>{item.examples.map((example) => <b key={example}>{example}</b>)}</div></article>)}</div>{pillar.providerNote && <blockquote>{pillar.providerNote}</blockquote>}</section>}

        <section className="pillar-case" id="case">
          <header><span>Connected case</span><h2>{pillar.caseStudy.title}</h2>{pillar.caseStudy.classification && <small>{pillar.caseStudy.classification}</small>}<p>{pillar.caseStudy.context}</p></header>
          {pillar.caseStudy.steps.length > 0 && <ol className="pillar-case-sequence">{pillar.caseStudy.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{step}</p></div></li>)}</ol>}
          {pillar.caseStudy.decisions && <div className="pillar-decisions"><span>Decisions to work through</span><div className="pillar-decision-list">{pillar.caseStudy.decisions.map((decision, index) => <article key={decision}>
            <header><i>{String(index + 1).padStart(2, '0')}</i><p>{decision}</p></header>
            <details><summary><span>Open a model approach</span><b>＋</b></summary><div>
              <section><strong>Recommended position</strong><p>{pillar.caseStudy.decisionGuidance?.[index] ?? `Start with the protected outcome in ${pillar.caseStudy.title}. Choose the least irreversible action that limits material harm, names an accountable owner and keeps the next decision open as evidence improves.`}</p></section>
              <section><strong>Evidence to request</strong><p>Ask for the current service and dependency map, affected population, time-stamped operational evidence, control state, known exceptions, accountable owners and the criteria that would change this decision.</p></section>
              <section><strong>What a strong answer includes</strong><p>A clear priority, confirmed facts separated from assumptions, at least two realistic options, consequences for stakeholders, a reversible next step, a stop condition and a named decision owner.</p></section>
            </div></details>
          </article>)}</div></div>}
          <details className="pillar-model-analysis"><summary><span>Open the full model analysis</span><b>＋</b></summary><div><strong>Read the case as a connected system</strong><p>{pillar.caseStudy.lesson}</p><ol><li>State the outcome that must be protected and the consequence of delay.</li><li>Trace people, process, information, technology, supplier and control dependencies.</li><li>Separate verified evidence, reasonable inference and unknowns.</li><li>Choose an action, owner, boundary, review time and evidence that would trigger a different action.</li></ol></div></details>
          <blockquote><span>What this teaches</span><p>{pillar.caseStudy.lesson}</p></blockquote>
        </section>

        <section className="pillar-misconceptions" id="misconceptions"><header><span>Reasoning checks</span><h2>Common shortcuts that fail.</h2></header><div>{pillar.misconceptions.map((item) => <article key={item.belief}><strong>“{item.belief}”</strong><p>{item.correction}</p></article>)}</div></section>

        <section className="pillar-linkages" id="linkages"><header><span>The connected system</span><h2>See exactly how this pillar links outward.</h2></header><div>{pillar.relatedPillars.map((item) => <Link href={`/pillars/${item.slug}`} key={item.slug}><span>Connected pillar</span><strong>{item.title}</strong><p>{item.relationship}</p><i>→</i></Link>)}</div></section>

        {emergingDives.length > 0 && <section className="pillar-emerging-radar" id="emerging-technology"><header><span>Distinct reference track</span><h2>Emerging technology is related to AI, but it is not the same subject.</h2><p>Use this separate track for blockchain, quantum computing, connected devices, robotics, digital twins, edge and spatial systems. Each guide asks about maturity, evidence, operating fit, safety, security, economics and exit risk.</p></header><div>{emergingDives.map((topic) => <Link href={`/learn/${topic.slug}`} key={topic.slug}><span>{topic.id}</span><strong>{topic.title}</strong><p>{topic.summary}</p><i>→</i></Link>)}</div><Link className="emerging-resource-link" href="/resources">See the reference collections →</Link></section>}

        <section className="pillar-deep-dives" id="deep-dives"><header><span>Supporting library</span><h2>Open a narrower guide when you need depth.</h2><p>This pillar is the complete reading path. These pages isolate one subject for revision, examples, practice, or technical reference.</p></header><div>{deepDives.map((topic) => <Link href={`/learn/${topic.slug}`} key={topic.slug}><strong>{topic.title}</strong><p>{topic.summary}</p><footer><span>{topic.id}</span><small>{topic.readTime} min →</small></footer></Link>)}</div></section>

        <section className="pillar-sources"><header><span>Primary references</span><h2>Continue at the source.</h2></header><div>{pillar.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><strong>{source.label}</strong><span>↗</span></a>)}</div></section>
      </article>
    </section>

    <nav className="pillar-next">{pillar.relatedPillars.slice(0, 3).map((item) => <Link href={`/pillars/${item.slug}`} key={item.slug}><span>Continue to</span><strong>{item.title}</strong><i>→</i></Link>)}</nav>
  </main>;
}
