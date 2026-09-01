'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type LearningTopic = { slug: string; title: string; categoryLabel: string; summary: string; readTime: number };

export default function LearningDashboard({ topics }: { topics: LearningTopic[] }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [complete, setComplete] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [tab, setTab] = useState<'saved' | 'complete' | 'recent'>('saved');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSaved(topics.filter((topic) => window.localStorage.getItem(`robins-hood-saved:${topic.slug}`) === '1').map((topic) => topic.slug));
      setComplete(topics.filter((topic) => window.localStorage.getItem(`robins-hood-complete:${topic.slug}`) === '1').map((topic) => topic.slug));
      try { setRecent(JSON.parse(window.localStorage.getItem('robins-hood-recent') ?? '[]').filter((item: unknown) => typeof item === 'string')); } catch { setRecent([]); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [topics]);

  const slugs = tab === 'saved' ? saved : tab === 'complete' ? complete : recent;
  const selected = useMemo(() => slugs.map((slug) => topics.find((topic) => topic.slug === slug)).filter((item): item is LearningTopic => Boolean(item)), [slugs, topics]);
  const inProgress = recent.filter((slug) => !complete.includes(slug));

  function clearItem(slug: string) {
    if (tab === 'saved') {
      window.localStorage.removeItem(`robins-hood-saved:${slug}`);
      setSaved((items) => items.filter((item) => item !== slug));
    } else if (tab === 'complete') {
      window.localStorage.removeItem(`robins-hood-complete:${slug}`);
      setComplete((items) => items.filter((item) => item !== slug));
    } else {
      const next = recent.filter((item) => item !== slug);
      window.localStorage.setItem('robins-hood-recent', JSON.stringify(next));
      setRecent(next);
    }
  }

  return <section className="learning-dashboard">
    <div className="learning-stats">
      <article><span>Saved</span><strong>{saved.length}</strong><p>Guides held for later.</p></article>
      <article><span>Completed</span><strong>{complete.length}</strong><p>Guides you marked complete.</p></article>
      <article><span>In progress</span><strong>{inProgress.length}</strong><p>Recently opened, not yet complete.</p></article>
    </div>
    <div className="learning-tabs" role="tablist" aria-label="Learning collections">
      <button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')} role="tab" aria-selected={tab === 'saved'} type="button">Saved</button>
      <button className={tab === 'complete' ? 'active' : ''} onClick={() => setTab('complete')} role="tab" aria-selected={tab === 'complete'} type="button">Completed</button>
      <button className={tab === 'recent' ? 'active' : ''} onClick={() => setTab('recent')} role="tab" aria-selected={tab === 'recent'} type="button">Recently viewed</button>
    </div>
    {selected.length ? <div className="learning-list">{selected.map((topic, index) => <article key={topic.slug}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{topic.categoryLabel} · {topic.readTime} min</small><h2><Link href={`/learn/${topic.slug}`}>{topic.title}</Link></h2><p>{topic.summary}</p></div><div><Link href={`/learn/${topic.slug}`}>Continue →</Link><button onClick={() => clearItem(topic.slug)} type="button">Remove</button></div></article>)}</div> : <div className="learning-empty"><span>Nothing here yet</span><h2>Your atlas will remember what matters to you.</h2><p>Open a deep dive to save it, mark it complete or add it to your recent history.</p><Link href="/learn">Browse all guides →</Link></div>}
  </section>;
}
