'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toolCatalog } from '../lib/tool-catalog';

const families = ['All', ...new Set(toolCatalog.map((tool) => tool.family))];

export default function ToolLibrary() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('All');
  const tools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return toolCatalog.filter((tool) => {
      const searchable = [tool.name, tool.expansion, tool.family, tool.purpose, tool.placement, ...tool.capabilities, ...tool.keywords].filter(Boolean).join(' ').toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (family === 'All' || tool.family === family);
    });
  }, [query, family]);

  return <section className="tool-library">
    <div className="framework-tools tool-tools"><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Nmap, Linux, Kubernetes, EDR, data, RAG..." /></label><select value={family} onChange={(event) => setFamily(event.target.value)} aria-label="Filter by tool family">{families.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="tool-library-count"><span>{tools.length} tools and platforms</span><p>Provider examples explain placement and capability. They are not endorsements or substitutes for requirements.</p></div>
    <div className="tool-grid">{tools.map((tool) => <Link href={`/tools/${tool.slug}`} className="tool-card" key={tool.slug}>
      <span>{tool.family}</span><h2>{tool.name}</h2>{tool.expansion ? <h3>{tool.expansion}</h3> : null}<p>{tool.purpose}</p>
      <div>{tool.capabilities.slice(0, 3).map((capability) => <b key={capability}>{capability}</b>)}</div><i>Open placement and capability map →</i>
    </Link>)}</div>
    {!tools.length && <div className="no-results"><strong>No tool matches this combination.</strong><p>Try a capability, deployment location or broader security family.</p><button type="button" onClick={() => { setQuery(''); setFamily('All'); }}>Reset tools</button></div>}
  </section>;
}
