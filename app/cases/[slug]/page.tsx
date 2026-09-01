import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseDetailBySlug, caseDetails } from '../../../lib/case-details';
import { caseStudies } from '../../../lib/resources';
import { topics } from '../../../lib/topics';

export function generateStaticParams() {
  return caseDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((candidate) => candidate.slug === slug);
  return item ? { title: `${item.title} | Robin’s Hood case file`, description: item.learn } : { title: 'Case not found | Robin’s Hood' };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = caseStudies.find((candidate) => candidate.slug === slug);
  const detail = caseDetailBySlug.get(slug);
  if (!item || !detail) notFound();

  const tokens = `${item.title} ${item.industry} ${item.domains.join(' ')}`.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 3);
  const relatedTopics = topics.map((topic) => ({ topic, score: tokens.filter((token) => `${topic.title} ${topic.summary} ${topic.categoryLabel}`.toLowerCase().includes(token)).length })).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 6).map((entry) => entry.topic);

  return <main className="case-detail-page">
    <div className="case-detail-breadcrumb"><Link href="/cases">Case studies</Link><span>›</span><b>{item.type}</b><span>›</span><strong>{item.year}</strong></div>

    <header className="case-detail-hero">
      <div><div className="case-detail-tags"><span>{item.difficulty}</span><span>{item.readTime} min</span><span>{item.industry}</span></div><h1>{item.title}</h1><p>{detail.thesis}</p></div>
      <aside><span>Case file</span><strong>{String(caseStudies.findIndex((candidate) => candidate.slug === slug) + 1).padStart(2, '0')}</strong><small>{detail.timeline.length} timeline events<br />{detail.quiz.length} advanced questions</small></aside>
    </header>

    <nav className="case-detail-nav" aria-label="Case file sections"><a href="#boundary">Evidence boundary</a><a href="#timeline">Timeline</a><a href="#causal-chain">Causal chain</a><a href="#controls">Controls</a><a href="#evidence">Evidence</a><a href="#quiz">Case lab</a><a href="#sources">Sources</a></nav>

    <article className="case-detail-reading">
      <section className="case-reading-section" id="boundary"><header><span>01 · Read this first</span><h2>Keep fact, assessment and teaching inference separate.</h2></header><div className="case-boundary"><b>Factual boundary</b><p>{detail.factualBoundary}</p></div><p className="case-situation">{item.situation}</p><div className="case-fact-grid">{item.facts.map((fact, index) => <div key={fact}><span>{String(index + 1).padStart(2, '0')}</span><p>{fact}</p></div>)}</div></section>

      <section className="case-reading-section" id="timeline"><header><span>02 · Sequence</span><h2>Timeline: what happened and what was known when.</h2></header><div className="case-timeline">{detail.timeline.map((event, index) => <article key={`${event.date}-${index}`}><div><span>{String(index + 1).padStart(2, '0')}</span><i /></div><section><small>{event.status}</small><h3>{event.date}</h3><p>{event.event}</p></section></article>)}</div></section>

      <section className="case-reading-section" id="causal-chain"><header><span>03 · System analysis</span><h2>Trace the causal chain, not only the visible failure.</h2></header><div className="case-causal-chain">{detail.causalChain.map((stage, index) => <article key={`${stage.stage}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><small>{stage.confidence}</small><h3>{stage.stage}</h3><p>{stage.explanation}</p>{index < detail.causalChain.length - 1 && <i>→</i>}</article>)}</div></section>

      <section className="case-reading-section" id="controls"><header><span>04 · Control design</span><h2>Place controls where they interrupt the case.</h2></header><div className="case-control-table"><div><span>Layer</span><span>Control or design change</span><span>Evidence expected</span></div>{detail.controls.map((control) => <div key={control.layer}><strong>{control.layer}</strong><p>{control.control}</p><p>{control.expectedEvidence}</p></div>)}</div></section>

      <section className="case-reading-section" id="evidence"><header><span>05 · Investigation and assurance</span><h2>Evidence to request before reaching a conclusion.</h2></header><div className="case-evidence-grid">{detail.evidenceToInspect.map((evidence, index) => <div key={evidence}><span>{String(index + 1).padStart(2, '0')}</span><strong>{evidence}</strong></div>)}</div><blockquote><span>Pause and decide</span><p>{item.decision}</p></blockquote></section>

      <section className="case-reading-section" id="quiz"><header><span>06 · Advanced case lab</span><h2>Ten difficult questions. Build an argument before revealing guidance.</h2><p>These are application questions, not trivia. A good answer uses the facts, names uncertainty, compares options, and ends in a defensible decision.</p></header><div className="case-quiz-list">{detail.quiz.map((question, index) => <details key={question.question}><summary><span>Q{String(index + 1).padStart(2, '0')}</span><strong>{question.question}</strong><i>Reveal model guidance</i></summary><div><p>{question.answerGuidance}</p><section><b>Strong answer includes</b>{question.rubric.map((item) => <span key={item}>{item}</span>)}</section></div></details>)}</div></section>

      {relatedTopics.length > 0 && <section className="case-reading-section" id="connections"><header><span>07 · Continue learning</span><h2>Open the concepts behind the case.</h2></header><div className="case-related-grid">{relatedTopics.map((topic) => <Link href={`/learn/${topic.slug}`} key={topic.slug}><span>{topic.categoryLabel}</span><strong>{topic.title}</strong><p>{topic.summary}</p><i>→</i></Link>)}</div></section>}

      <section className="case-reading-section" id="sources"><header><span>08 · Source record</span><h2>Verify the case at the source.</h2></header><div className="case-source-list">{detail.sources.map((source) => <a href={source.url} target={source.url.startsWith('http') ? '_blank' : undefined} rel={source.url.startsWith('http') ? 'noreferrer' : undefined} key={source.url}><div><span>{source.publisher}</span><strong>{source.label}</strong>{source.caveat && <small>{source.caveat}</small>}</div><i>↗</i></a>)}</div></section>

      <nav className="case-detail-pagination"><Link href="/cases">← All case studies</Link><Link href={`/cases/${caseStudies[(caseStudies.findIndex((candidate) => candidate.slug === slug) + 1) % caseStudies.length].slug}`}>Next case →</Link></nav>
    </article>
  </main>;
}
