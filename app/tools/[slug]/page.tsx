import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toolCatalog } from '../../../lib/tool-catalog';
import { topics } from '../../../lib/topics';

type Props = { params: Promise<{ slug: string }> };

const ignoredWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'tool', 'platform', 'security', 'system']);
function words(value: string) { return value.toLowerCase().replace(/[^a-z0-9+]+/g, ' ').split(/\s+/).filter((word) => word.length > 2 && !ignoredWords.has(word)); }

export function generateStaticParams() { return toolCatalog.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolCatalog.find((item) => item.slug === slug);
  return tool ? { title: `${tool.name}: Robin's Hood`, description: tool.purpose } : {};
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolCatalog.find((item) => item.slug === slug);
  if (!tool) notFound();
  const related = toolCatalog.filter((item) => item.slug !== tool.slug && (item.family === tool.family || item.keywords.some((keyword) => tool.keywords.includes(keyword)))).slice(0, 4);
  const toolWords = new Set(words(`${tool.name} ${tool.expansion ?? ''} ${tool.family} ${tool.purpose} ${tool.placement} ${tool.keywords.join(' ')}`));
  const relatedGuides = topics.map((topic) => ({ topic, score: words(`${topic.title} ${topic.summary} ${topic.subtrack}`).reduce((total, word) => total + (toolWords.has(word) ? 1 : 0), 0) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title)).slice(0, 5).map((item) => item.topic);

  return <main className="inner-page tool-detail-page">
    <section className="tool-detail-hero"><div className="framework-breadcrumb"><Link href="/tools">Tool library</Link><span>→</span><span>{tool.name}</span></div><p className="eyebrow dark"><span /> {tool.family}</p><h1>{tool.name}</h1>{tool.expansion ? <h2>{tool.expansion}</h2> : null}<p>{tool.purpose}</p></section>
    <section className="tool-placement-map"><header><span>At a glance</span><h2>Know the capability before the product name.</h2></header><div className="tool-fact-grid"><article><span>Placement</span><p>{tool.placement}</p></article><article><span>Useful capability</span><p>{tool.capabilities.slice(0, 2).join('; ')}</p></article><article><span>Decision boundary</span><p>{tool.boundary}</p></article></div></section>
    <section className="tool-detail-grid"><article><span>Capability map</span><h2>What it can help a team do</h2><div className="tool-capability-list">{tool.capabilities.map((capability, index) => <div key={capability}><b>{String(index + 1).padStart(2, '0')}</b><strong>{capability}</strong></div>)}</div></article><aside><span>Safe-use boundary</span><h2>Capability does not equal authority.</h2><p>{tool.boundary}</p><a href={tool.officialUrl} target="_blank" rel="noreferrer">Open official product or project source ↗</a></aside></section>
    <section className="tool-questions"><header><span>Before adopting or using it</span><h2>Questions that prevent tool-first thinking</h2></header><div><p><b>Coverage</b> Which assets, identities, interfaces, repositories or regions are outside its view?</p><p><b>Evidence</b> What raw evidence supports the output, and how long is that evidence retained?</p><p><b>Action</b> Which responses are automatic, which need approval, and how are mistakes reversed?</p><p><b>Operations</b> Who tunes, validates, updates and monitors the tool itself?</p><p><b>Risk</b> What new privilege, data concentration, failure dependency or cost does it introduce?</p><p><b>Outcome</b> Which measurable decision or risk changes when the tool is used well?</p></div></section>
    <section className="tool-related"><header><span>Compare nearby capabilities</span><h2>Similar tools can occupy different control layers.</h2></header><div>{related.map((item) => <Link href={`/tools/${item.slug}`} key={item.slug}><span>{item.family}</span><strong>{item.name}</strong><p>{item.purpose}</p><b>Compare profile →</b></Link>)}</div></section>
    {relatedGuides.length > 0 && <section className="tool-related tool-guide-links"><header><span>Learn the surrounding discipline</span><h2>A tool makes more sense inside the concept it supports.</h2></header><div>{relatedGuides.map((item) => <Link href={`/learn/${item.slug}`} key={item.slug}><span>{item.categoryLabel}</span><strong>{item.title}</strong><p>{item.summary}</p><b>Open guide →</b></Link>)}</div></section>}
  </main>;
}
