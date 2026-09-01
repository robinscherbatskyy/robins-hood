'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { caseStudies } from '../lib/resources';

export default function CasesClient() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('All');
  const [kind, setKind] = useState('All');
  const industries = ['All', ...Array.from(new Set(caseStudies.map((item) => item.industry))).sort()];
  const filtered = useMemo(() => caseStudies.filter((item) => {
    const hit = `${item.title} ${item.situation} ${item.learn} ${item.domains.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return hit && (industry === 'All' || item.industry === industry) && (kind === 'All' || item.type === kind);
  }), [query, industry, kind]);

  return <section className="cases-browser">
    <div className="case-tools"><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a failure, decision, industry or concept…" /></label><select value={industry} onChange={(event) => setIndustry(event.target.value)}>{industries.map((item) => <option key={item}>{item}</option>)}</select><select value={kind} onChange={(event) => setKind(event.target.value)}><option>All</option><option>Documented case</option><option>Fictional composite</option></select></div>
    <div className="case-grid">{filtered.map((item, index) => <article className="case-card" id={item.slug} key={item.slug}>
      <header><span>{String(index + 1).padStart(2, '0')}</span><div className="case-badges"><b>{item.type}</b><i>{item.difficulty}</i><i>{item.readTime} min</i></div></header>
      <small>{item.industry} · {item.year}</small><h2>{item.title}</h2><p>{item.situation}</p>
      <div className="case-learn"><span>What this case teaches</span><strong>{item.learn}</strong></div>
      <div className="case-tags">{item.domains.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <details><summary><span>Preview the evidence</span><i>＋</i></summary><div className="case-file"><section><h3>Verified or declared facts</h3><ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></section><section><h3>Connection map</h3><div>{item.connections.map((connection) => <span key={connection}>{connection}</span>)}</div></section><blockquote><span>Pause and decide</span><p>{item.decision}</p></blockquote></div></details>
      <Link className="case-open-link" href={`/cases/${item.slug}`}><span>Open full case file</span><small>Timeline · causal chain · controls · evidence · 10-question case lab</small><b>→</b></Link>
    </article>)}</div>
  </section>;
}
