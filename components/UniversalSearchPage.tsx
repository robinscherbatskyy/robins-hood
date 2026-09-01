'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { glossary, organizations } from '../lib/ecosystem';
import { frameworkCatalog } from '../lib/frameworks';
import { caseStudies, evidenceItems } from '../lib/resources';
import { matchesSearch, searchScore } from '../lib/search-ranking';
import { toolCatalog } from '../lib/tool-catalog';
import { topics } from '../lib/topics';

type SearchResult = { kind: string; title: string; detail: string; body: string; href: string };

const allResults: SearchResult[] = [
  ...glossary.map((item) => ({ kind: 'Glossary', title: item.term, detail: item.expansion ?? item.category, body: [item.meaning, item.howItWorks, item.whyItMatters, item.commonConfusion, item.where, item.boundary, item.example, ...(item.aliases ?? []), ...(item.related ?? [])].filter(Boolean).join(' '), href: `/glossary?q=${encodeURIComponent(item.term)}#glossary-index` })),
  ...toolCatalog.map((item) => ({ kind: 'Tool', title: item.name, detail: item.family, body: `${item.expansion ?? ''} ${item.purpose} ${item.placement} ${item.keywords.join(' ')}`, href: `/tools/${item.slug}` })),
  ...frameworkCatalog.map((item) => ({ kind: 'Framework', title: item.shortName, detail: item.fullName, body: `${item.owner} ${item.purpose} ${item.domains.join(' ')} ${(item.aliases ?? []).join(' ')}`, href: `/frameworks/${item.slug}` })),
  ...topics.map((item) => ({ kind: 'Guide', title: item.title, detail: item.categoryLabel, body: `${item.summary} ${item.subtrack}`, href: `/learn/${item.slug}` })),
  ...caseStudies.map((item) => ({ kind: 'Case', title: item.title, detail: item.industry, body: `${item.situation} ${item.domains.join(' ')}`, href: `/cases/${item.slug}` })),
  ...evidenceItems.map((item) => ({ kind: 'Report', title: item.title, detail: item.publisher, body: `${item.summary} ${item.domains.join(' ')}`, href: '/reports' })),
  ...organizations.map((item) => ({ kind: 'Organization', title: item.acronym, detail: item.name, body: [item.description, item.type, item.placement, item.practitionerUse, ...(item.products ?? []), ...(item.capabilities ?? []), ...(item.competitors ?? [])].filter(Boolean).join(' '), href: `/organizations#org-${item.acronym.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` })),
];

export default function UniversalSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = (searchParams.get('q') ?? '').trim();
  const [draft, setDraft] = useState(query);
  const results = useMemo(() => query ? allResults
    .filter((item) => matchesSearch(query, item.title, item.detail, item.body))
    .sort((a, b) => searchScore(query, a.title, a.detail, a.body) - searchScore(query, b.title, b.detail, b.body) || a.title.localeCompare(b.title))
    .slice(0, 60) : [], [query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = draft.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  }

  return <main className="inner-page search-page">
    <section className="page-hero compact-collection-hero"><p className="eyebrow dark"><span /> Search the whole atlas</p><div><h1>One query.<br /><em>Every collection.</em></h1><p>Exact terms come first, followed by relevant tools, frameworks, guides, cases, reports and organizations.</p></div><aside><strong>{results.length}</strong><span>visible results</span><i>{query || 'Enter a query'}</i></aside></section>
    <section className="universal-search">
      <form onSubmit={submit} role="search"><span>⌕</span><input autoFocus name="q" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Try RAG, RBAC, SOX, Nmap or internal audit" /><button type="submit">Search</button></form>
      {query && <div className="universal-search-summary"><strong>Results for “{query}”</strong><span>{results.length} matches across the atlas</span></div>}
      {results.length ? <div className="universal-search-results">{results.map((result, index) => <Link href={result.href} key={`${result.kind}-${result.title}-${index}`}><span>{result.kind}</span><div><strong>{result.title}</strong><small>{result.detail}</small><p>{result.body}</p></div><i>→</i></Link>)}</div> : query ? <div className="no-results"><strong>No result matched “{query}”.</strong><p>Try a full form, a broader word, or browse the glossary.</p><Link href="/glossary#glossary-index">Open the glossary →</Link></div> : null}
    </section>
  </main>;
}
