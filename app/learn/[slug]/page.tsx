import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlossaryTermLink from '../../../components/GlossaryTermLink';
import InteractiveGuideDiagram from '../../../components/InteractiveGuideDiagram';
import ProgressActions from '../../../components/ProgressActions';
import Iso27001Handbook from '../../../components/Iso27001Handbook';
import OsiModelExplorer from '../../../components/OsiModelExplorer';
import SubjectMatterModule, { subjectModuleLink } from '../../../components/SubjectMatterModule';
import { estimateGuideReadTime, getGuide } from '../../../lib/guides';
import { guideOpenerFor } from '../../../lib/guide-openers';
import { iso27001HandbookSlug } from '../../../lib/iso27001-handbook';
import { categories, topicBySlug, topics, topicsForCategory } from '../../../lib/topics';

function businessImpactFor(title: string, category: string) {
  const value = title.toLowerCase();
  if (/identity|authentication|authorization|privileged|federation|access/.test(value)) return 'Weak identity decisions can become account takeover, fraud, unauthorized change, data exposure and persistent access through legitimate channels.';
  if (/network|routing|dns|transport|middle|spoof|firewall|gateway/.test(value)) return 'Network and trust failures can redirect transactions, expose credentials, interrupt services and let a local compromise reach systems with much larger consequences.';
  if (/incident|forensic|recovery|ransomware|malware/.test(value)) return 'The quality and speed of decisions affect downtime, evidence preservation, legal duties, recovery cost and confidence that the threat has actually been removed.';
  if (/risk|resilien|continuity|crisis|insurance/.test(value)) return 'Clear scenarios and thresholds help leaders spend before disruption, accept exposure deliberately and protect the services whose failure would be intolerable.';
  if (/audit|assurance|control|sox|compliance|governance/.test(value)) return 'Poorly defined ownership or evidence can hide a failed control, create false assurance, delay remediation and expose the organization to financial, legal and trust consequences.';
  if (/ai|machine learning|model|agent|language/.test(value)) return 'A useful model can still create harmful decisions, leakage, unsafe actions, unexpected cost or regulatory exposure when data, authorization, evaluation and human review are weak.';
  if (/software|development|testing|source|release|deployment/.test(value)) return 'Small delivery mistakes can become customer harm, outage, security exposure and expensive rework when requirements, dependencies, testing, rollback or ownership are unclear.';
  if (/cloud|container|kubernetes|serverless|platform/.test(value)) return 'Cloud speed magnifies good and bad decisions. Identity, configuration, cost, regional dependency and recovery gaps can propagate across many services quickly.';
  if (/data|analytics|database|pipeline|metadata/.test(value)) return 'Incorrect meaning, lineage, access or quality can produce wrong decisions, privacy harm, failed reporting and expensive reconciliation even when the platform is available.';
  const byCategory: Record<string, string> = {
    business: 'The concept matters when it changes customer value, operating cost, decision speed, service quality or the organization’s ability to adapt.',
    systems: 'A hidden dependency or weak operating practice can turn a healthy component into a failed user service and a long, expensive diagnosis.',
    cyber: 'A security weakness matters through the business action, information, safety, continuity or trust that an attacker could affect.',
    governance: 'Direction without ownership and evidence creates activity without confidence, leaving important obligations and risks unresolved.',
    people: 'Communication quality changes whether people understand the decision, raise concerns, coordinate action and follow through under pressure.',
    industries: 'The same technical event can become financial loss, patient harm, production stoppage, public distrust or a safety incident depending on the domain.',
  };
  return byCategory[category] ?? 'The value appears in better decisions, clearer ownership, fewer avoidable failures and evidence that the intended outcome was actually achieved.';
}

function LeadParagraph({ text, emphasize }: { text: string; emphasize: boolean }) {
  if (!emphasize) return <p>{text}</p>;
  const match = text.match(/^(.+?[.!?])(?:\s+)(.+)$/);
  return match ? <p><strong>{match[1]}</strong> {match[2]}</p> : <p><strong>{text}</strong></p>;
}

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicBySlug.get(slug);
  if (!topic) return { title: 'Guide not found | Robin’s Hood' };
  return {
    title: `${topic.title} | Robin’s Hood`,
    description: topic.summary,
    openGraph: { title: topic.title, description: topic.summary, images: [] },
    twitter: { card: 'summary', title: topic.title, description: topic.summary, images: [] },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topicBySlug.get(slug);
  if (!topic) notFound();
  if (topic.slug === iso27001HandbookSlug) return <Iso27001Handbook />;

  const guide = getGuide(topic);
  const readTime = estimateGuideReadTime(guide);
  const categoryTopics = topicsForCategory(topic.category);
  const topicIndex = categoryTopics.findIndex((item) => item.slug === topic.slug);
  const previous = categoryTopics[topicIndex - 1];
  const next = categoryTopics[topicIndex + 1];
  const relatedPool = topics.filter((item) => item.slug !== topic.slug && (item.category === topic.category || item.featured));
  const offset = (Number(topic.id.slice(-2)) || 0) % Math.max(1, relatedPool.length - 4);
  const related = relatedPool.slice(offset, offset + 4);
  const subjectLink = subjectModuleLink(topic.slug);
  const opener = guideOpenerFor(topic.slug, topic);
  const showDiagram = guide.diagramViews.length > 0;

  return <main className="article-page">
    <div className="article-breadcrumb"><Link href="/learn">Library</Link><span>›</span><Link href={`/learn?category=${topic.category}`}>{topic.categoryLabel}</Link><span>›</span><b>{topic.id}</b></div>
    <div className="article-layout">
      <aside className="article-sidebar">
        <Link className="sidebar-back" href="/pillars">← Consolidated pillars</Link>
        <span className={`sidebar-category accent-${categories[topic.category].color}`}>{topic.categoryLabel}</span>
        <nav aria-label={`${topic.categoryLabel} topics`}>{categoryTopics.map((item, index) => <Link className={item.slug === topic.slug ? 'active' : ''} href={`/learn/${item.slug}`} key={item.slug}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</Link>)}</nav>
      </aside>

      <article className="knowledge-article">
        <header className="article-header">
          <div className="article-meta"><span>{topic.depth}</span><span>{readTime} min complete guide</span><span>{guide.sourceCoverage}</span><span>{topic.id}</span></div>
          <h1>{topic.title}</h1>
          <p>{guide.promise}</p>
          <ProgressActions slug={topic.slug} />
        </header>

        <section className="article-section subject-entry" id="start">
          <div className="section-kicker">Field brief</div><h2>{topic.title}, without the fog.</h2>
          <div className="guide-field-brief">
            <article className="definition"><span>Definition</span><p><strong>{guide.promise}</strong> {guide.mentalModel}</p>{guide.plainLanguage.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
            <article><span>Why the organization cares</span><p>{businessImpactFor(topic.title, topic.category)}</p></article>
            <article><span>Concrete situation</span><strong>{guide.example.title}</strong><p>{guide.example.context}</p></article>
            <article><span>Practitioner first moves</span><ol>{guide.example.steps.slice(0, 4).map((step) => <li key={step}>{step}</li>)}</ol>{topic.slug === 'network-foundations-and-protocol-models' && <a className="subject-jump" href="#osi-model">Open the seven-layer OSI explainer ↓</a>}</article>
          </div>
          {opener && <div className="guide-analogy"><span>Human analogy</span><p>{opener.analogy}</p></div>}
          {guide.curated && <div className="key-ideas compact">{guide.keyIdeas.map((idea) => <article key={idea.title}><span>Key distinction</span><h3>{idea.title}</h3><p>{idea.text}</p></article>)}</div>}
        </section>

        {topic.slug === 'network-foundations-and-protocol-models' && <OsiModelExplorer />}

        <SubjectMatterModule slug={topic.slug} />

        <section className="article-section" id="deep-model">
          <div className="section-kicker">Technical breakdown</div><h2>Understanding {topic.title.toLowerCase()} in practice.</h2>
          <div className="deep-section-list">{guide.deepSections.map((section, index) => <article key={`${section.eyebrow}-${section.title}`}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><div><small>{section.eyebrow}</small><h3>{section.title}</h3></div></header>
            <div className="deep-section-copy">{section.paragraphs.map((paragraph, paragraphIndex) => <LeadParagraph text={paragraph} emphasize={paragraphIndex === 0} key={`${paragraphIndex}-${paragraph}`} />)}</div>
            <div className="deep-section-insight"><div><span>Put it to work</span><p>{section.checkpoint}</p></div></div>
          </article>)}</div>
        </section>

        {showDiagram && <section className="article-section" id="big-picture">
          <div className="section-kicker">Process or lifecycle</div><h2>Use the sequence when order changes the result.</h2>
          <InteractiveGuideDiagram views={guide.diagramViews} />
        </section>}

        <section className="article-section" id="terms">
          <div className="section-kicker">Terms in context</div><h2>The vocabulary you need to speak precisely.</h2>
          <p className="section-intro">Hover or focus a term for a quick definition. Open it to see the full glossary entry and related domain terms.</p>
          <div className="guide-term-grid">{guide.terms.map((term) => <GlossaryTermLink term={term} key={term.term} />)}</div>
        </section>

        {guide.curated && <section className="article-section" id="comparison" data-depth-block="applied">
          <div className="section-kicker">Make the distinction</div><h2>{guide.comparison.title}</h2><p className="section-intro">{guide.comparison.intro}</p>
          <div className="comparison-table" role="table" aria-label={guide.comparison.title}>
            <div role="row"><span role="columnheader">Concept</span><span role="columnheader">Use it for</span><span role="columnheader">Do not confuse it with</span></div>
            {guide.comparison.rows.map((row) => <div role="row" key={row.concept}><strong role="cell">{row.concept}</strong><p role="cell">{row.useItFor}</p><p role="cell">{row.doNotConfuseItWith}</p></div>)}
          </div>
        </section>}

        {guide.placement && <section className="article-section" id="placement" data-depth-block="applied">
          <div className="section-kicker">Technology landscape</div><h2>What it is, where it sits and what it can do.</h2>
          <p className="landscape-intro">{guide.placement.plain}</p>
          <div className="placement-map">{guide.placement.locations.map((item, index) => <article key={item.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.name}</h3><p>{item.detail}</p>{index < guide.placement!.locations.length - 1 && <i>→</i>}</article>)}</div>
          <div className="landscape-columns"><div><span>Core capabilities</span><ul>{guide.placement.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Provider examples, not rankings</span>{guide.placement.examples.map((item) => <article key={`${item.provider}-${item.product}`}><b>{item.provider}</b><strong>{item.product}</strong><p>{item.note}</p></article>)}</div></div>
          <div className="callout boundary-note"><span className="callout-label">△ Selection boundary</span><p>{guide.placement.boundary}</p></div>
        </section>}

        {guide.relevantTools.length > 0 && <section className="article-section" id="tools" data-depth-block="advanced">
          <div className="section-kicker">Practical tool map</div><h2>Where tools sit, what they can prove and where they stop.</h2>
          <div className="tool-landscape">{guide.relevantTools.map((tool) => <article key={tool.slug}>
            <header><div><span>{tool.family}</span><h3><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></h3>{tool.expansion && <small>{tool.expansion}</small>}</div><a href={tool.officialUrl} target="_blank" rel="noreferrer">Official source ↗</a></header>
            <div><section><b>Placement</b><p>{tool.placement}</p></section><section><b>Purpose</b><p>{tool.purpose}</p></section></div>
            <ul>{tool.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
            <p className="tool-boundary"><strong>Boundary</strong>{tool.boundary}</p><Link className="tool-profile-link" href={`/tools/${tool.slug}`}>Open placement and capability profile →</Link>
          </article>)}</div>
        </section>}

        {guide.history && <section className="article-section history-section" id="history">
          <div className="section-kicker">Origins and people</div><h2>{guide.history.title}</h2><p>{guide.history.story}</p>
          <div className="history-names">{guide.history.names.map((name, index) => <span key={name}><i>{String(index + 1).padStart(2, '0')}</i>{name}</span>)}</div>
        </section>}

        <section className="article-section" id="worked-example">
          <div className="section-kicker">Worked situation</div><h2>Use the idea in a realistic decision.</h2>
          <details className="expandable example-block" open>
            <summary><span>Worked example</span><strong>{guide.example.title}</strong><i>＋</i></summary>
            <div className="expandable-content"><p>{guide.example.context}</p><ol>{guide.example.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="example-lesson"><b>What this teaches</b><p>{guide.example.lesson}</p></div></div>
          </details>
        </section>

        <section className="article-section" id="evidence">
          <div className="section-kicker">Decision and evidence</div><h2>Know what to ask and what to retain.</h2>
          <div className="decision-evidence-grid"><div><span>Decision lenses</span>{guide.decisionLenses.map((lens) => <article key={lens.title}><b>{lens.title}</b><p>{lens.detail}</p></article>)}</div><div><span>Evidence checklist</span><ol>{guide.evidenceChecklist.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</li>)}</ol></div></div>
        </section>

        <section className="article-section" id="judgment">
          <div className="section-kicker">Common pitfalls</div><h2>Where reasoning slips.</h2><div className="pitfall-grid">{guide.pitfalls.map((pitfall) => <div className="pitfall" key={pitfall}><span>!</span><p>{pitfall}</p></div>)}</div>
        </section>

        {guide.deepDive.length > 0 && <section className="article-section" id="deep-dive" data-depth-block="advanced">
          <div className="section-kicker">Go deeper</div><h2>Questions for practitioner depth.</h2>
          <details className="expandable deep-block"><summary><span>Advanced</span><strong>Architecture, trade-offs and edge cases</strong><i>＋</i></summary><div className="expandable-content"><ul>{guide.deepDive.map((item) => <li key={item}>{item}</li>)}</ul></div></details>
        </section>}

        {guide.practice.length > 0 && <section className="article-section" id="knowledge-check" data-depth-block="applied">
          <div className="section-kicker">Knowledge check</div><h2>Can you use the idea?</h2>
          <div className="quiz-list">{guide.practice.map((item, index) => <details key={item.question}><summary><span>Q{index + 1}</span><strong>{item.question}</strong><i>Reveal answer</i></summary><p>{item.answer}</p></details>)}</div>
        </section>}

        <section className="article-section" id="connections">
          <div className="section-kicker">Continue learning</div><h2>See the connections.</h2>
          <div className="related-grid">{related.map((item) => <Link href={`/learn/${item.slug}`} key={item.slug}><span>{item.categoryLabel}</span><strong>{item.title}</strong><p>{item.summary}</p><i>→</i></Link>)}</div>
        </section>

        <section className="article-section sources-section" id="sources">
          <div className="section-kicker">Source notes</div><h2>Read the authority, not only the summary.</h2>
          <p>Check the edition, publication date, jurisdiction, product version and local applicability before relying on a fast-moving source.</p>
          <div className="source-list">{guide.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>Primary reference</span><strong>{source.label}</strong><i>↗</i></a>)}</div>
        </section>

        <nav className="article-pagination">{previous ? <Link href={`/learn/${previous.slug}`}><span>Previous</span><strong>← {previous.title}</strong></Link> : <span />}{next ? <Link className="next" href={`/learn/${next.slug}`}><span>Next</span><strong>{next.title} →</strong></Link> : <Link className="next" href="/paths"><span>Next</span><strong>Choose a learning path →</strong></Link>}</nav>
      </article>

      <aside className="article-outline"><span>On this page</span><a href="#start">Field brief</a>{topic.slug === 'network-foundations-and-protocol-models' && <a href="#osi-model">OSI model</a>}{subjectLink && <a href={subjectLink.href}>{subjectLink.label}</a>}<a href="#deep-model">Technical breakdown</a>{showDiagram && <a href="#big-picture">Process or lifecycle</a>}<a href="#terms">Terms</a>{guide.curated && <a href="#comparison">Comparison</a>}{guide.placement && <a href="#placement">Technology landscape</a>}{guide.relevantTools.length > 0 && <a href="#tools">Tools</a>}<a href="#worked-example">Worked example</a><a href="#evidence">Decision and evidence</a>{guide.deepDive.length > 0 && <a href="#deep-dive">Advanced questions</a>}{guide.practice.length > 0 && <a href="#knowledge-check">Knowledge check</a>}<a href="#sources">Sources</a></aside>
    </div>
  </main>;
}
