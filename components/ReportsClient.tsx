'use client';

import { useMemo, useState } from 'react';
import { evidenceItems } from '../lib/resources';

export default function ReportsClient() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('All');
  const [authority, setAuthority] = useState('All');
  const domains = ['All', ...Array.from(new Set(evidenceItems.flatMap((item) => item.domains))).sort()];
  const authorities = ['All', ...Array.from(new Set(evidenceItems.map((item) => item.authority))).sort()];
  const filtered = useMemo(() => evidenceItems.filter((item) => {
    const haystack = `${item.title} ${item.publisher} ${item.summary} ${item.useItFor} ${item.domains.join(' ')}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (domain === 'All' || item.domains.includes(domain)) && (authority === 'All' || item.authority === authority);
  }), [query, domain, authority]);

  return <section className="evidence-browser">
    <div className="evidence-tools">
      <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reports, publishers, facts or domains…" /></label>
      <select value={domain} onChange={(event) => setDomain(event.target.value)} aria-label="Filter by domain">{domains.map((item) => <option key={item}>{item}</option>)}</select>
      <select value={authority} onChange={(event) => setAuthority(event.target.value)} aria-label="Filter by source class">{authorities.map((item) => <option key={item}>{item}</option>)}</select>
    </div>
    <div className="evidence-count"><span>{filtered.length} sources</span><p>Checked 30 August 2026 · third-party material stays at the source</p></div>
    <div className="evidence-grid">{filtered.map((item) => <article className={item.featured ? 'featured' : ''} key={item.id}>
      <div className="evidence-spine"><span>{item.id}</span><b>{item.type}</b></div>
      <div className="evidence-copy">
        <div className="evidence-badges"><span>{item.status}</span><span>{item.authority}</span><span>{item.access}</span></div>
        <small>{item.publisher}</small><h2>{item.title}</h2><p>{item.summary}</p>
        <div className="evidence-domain-row">{item.domains.map((tag) => <i key={tag}>{tag}</i>)}</div>
        <dl><div><dt>Published</dt><dd>{item.published}</dd></div><div><dt>Data period</dt><dd>{item.dataPeriod}</dd></div><div><dt>Scope</dt><dd>{item.geography}</dd></div><div><dt>Format</dt><dd>{item.format}</dd></div></dl>
        <details><summary><span>How to use it well</span><i>＋</i></summary><div><strong>{item.useItFor}</strong><p>{item.caveat}</p></div></details>
        <a href={item.url} target="_blank" rel="noreferrer">Open at the source <span>↗</span></a>
      </div>
    </article>)}</div>
    {!filtered.length && <div className="no-results"><strong>No source matches every filter.</strong><button onClick={() => { setQuery(''); setDomain('All'); setAuthority('All'); }} type="button">Reset filters</button></div>}
  </section>;
}
