'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, CategoryKey, topics } from '../lib/topics';

const filterGroups: Array<{ label: string; keys: CategoryKey[] }> = [
  { label: 'Start here', keys: ['orientation'] },
  { label: '10 core pillars', keys: ['business', 'systems', 'software', 'cloud', 'data', 'ai', 'emerging', 'cyber', 'governance', 'risk', 'people'] },
  { label: 'Apply', keys: ['industries'] },
  { label: 'Reference', keys: ['ecosystem'] },
];

const pillarRoutes: Partial<Record<CategoryKey, string>> = {
  business: '/pillars/business-product-operations',
  systems: '/pillars/systems-infrastructure',
  software: '/pillars/software-sdlc-delivery',
  cloud: '/pillars/cloud-resilience',
  data: '/pillars/data-analytics',
  ai: '/pillars/artificial-intelligence',
  emerging: '/pillars/artificial-intelligence',
  cyber: '/pillars/cybersecurity-identity-vapt',
  governance: '/pillars/governance-compliance-assurance',
  risk: '/pillars/enterprise-risk-resilience',
  people: '/pillars/people-professional-capability',
};

export default function LibraryClient() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | CategoryKey>('all');
  const [depth, setDepth] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get('category');
    const requestedQuery = params.get('q');
    const timer = window.setTimeout(() => {
      if (requestedCategory && requestedCategory in categories) setCategory(requestedCategory as CategoryKey);
      if (requestedQuery) setQuery(requestedQuery);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const filtered = useMemo(() => topics.filter((topic) => {
    const matchesQuery = `${topic.title} ${topic.summary} ${topic.categoryLabel}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === 'all' || topic.category === category) && (depth === 'all' || topic.depth === depth);
  }), [query, category, depth]);
  const selectedPillar = category === 'all' ? undefined : pillarRoutes[category];
  const selectedCategory = category === 'all' ? undefined : categories[category];

  return (
    <section className="library-workspace">
      <aside className="library-filters">
        <span className="filter-title">Navigate the atlas</span>
        <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')} type="button"><i />All topics <b>{topics.length}</b></button>
        {filterGroups.map((group) => <div className="filter-group" key={group.label}><span className="filter-section">{group.label}</span>{group.keys.map((key) => { const item = categories[key]; return <button className={category === key ? 'active' : ''} onClick={() => setCategory(key)} type="button" key={key}><i className={item.color} />{item.short}<b>{topics.filter((topic) => topic.category === key).length}</b></button>; })}</div>)}
      </aside>
      <div className="library-main">
        <div className="library-toolbar">
          <label className="library-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the complete atlas…" /></label>
          <select value={depth} onChange={(event) => setDepth(event.target.value)} aria-label="Filter by depth"><option value="all">All depth levels</option><option>Foundation</option><option>Applied</option><option>Advanced</option></select>
        </div>
        <div className="result-summary"><span>{filtered.length} guides</span><p>{category === 'all' ? 'The complete connected library' : categories[category].description}</p></div>
        {selectedPillar && selectedCategory && <Link className="library-pillar-return" href={selectedPillar}><span>Primary reading</span><div><strong>Read the complete {selectedCategory.short} pillar</strong><p>Build the full mental model, then return here for focused technical depth.</p></div><i>→</i></Link>}
        <div className="topic-grid">
          {filtered.map((topic) => <Link className={`topic-card accent-${categories[topic.category].color}`} href={`/learn/${topic.slug}`} key={topic.id}>
            <div className="topic-card-top"><i>{topic.depth}</i></div>
            <h2>{topic.title}</h2><p>{topic.summary}</p>
            <div className="topic-card-bottom"><span>{topic.id}</span><span>{topic.categoryLabel}</span><span>{topic.readTime} min →</span></div>
          </Link>)}
        </div>
        {!filtered.length && <div className="no-results"><strong>No guide matches every filter.</strong><p>Remove a filter or try a broader phrase.</p><button onClick={() => { setQuery(''); setCategory('all'); setDepth('all'); }} type="button">Reset filters</button></div>}
      </div>
    </section>
  );
}
