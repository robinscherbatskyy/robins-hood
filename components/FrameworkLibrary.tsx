'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { frameworkCatalog } from '../lib/frameworks';

const types = ['All', ...new Set(frameworkCatalog.map((item) => item.authorityType))];

export default function FrameworkLibrary() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return frameworkCatalog.filter((item) => {
      const searchable = [item.shortName, item.fullName, item.owner, item.jurisdiction, item.status, ...item.domains, ...(item.aliases ?? [])].join(' ').toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (type === 'All' || item.authorityType === type);
    });
  }, [query, type]);

  return <section className="framework-library" aria-label="Framework reference library">
    <div className="framework-tools">
      <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search GDPR, DPDP, AI, NIST, ISO, OWASP…" /></label>
      <select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter by authority type">{types.map((item) => <option key={item}>{item}</option>)}</select>
    </div>
    <div className="framework-count"><span>{results.length} references</span><p>Version, scope and legal phase are kept visible. Open an entry before relying on its name alone.</p></div>
    <div className="framework-grid">
      {results.map((item) => <Link className="framework-card" href={`/frameworks/${item.slug}`} key={item.slug}>
        <div className="framework-card-top"><span>{item.authorityType}</span><i>{item.status}</i></div>
        <h2>{item.shortName}</h2>
        <h3>{item.fullName}</h3>
        <p>{item.purpose}</p>
        <div className="framework-card-meta"><span>{item.currentEdition}</span><span>{item.owner}</span></div>
        <b>Open the complete reference <span>→</span></b>
      </Link>)}
    </div>
    {!results.length && <div className="no-results"><strong>No exact framework match.</strong><p>Try an acronym, owner, domain or authority type.</p><button type="button" onClick={() => { setQuery(''); setType('All'); }}>Reset library</button></div>}
  </section>;
}
