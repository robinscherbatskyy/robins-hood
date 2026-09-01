'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { glossary, organizations } from '../lib/ecosystem';
import { caseStudies, evidenceItems } from '../lib/resources';
import { topics } from '../lib/topics';
import { frameworkCatalog } from '../lib/frameworks';
import { toolCatalog } from '../lib/tool-catalog';
import { matchesSearch, searchScore } from '../lib/search-ranking';

const nav = [
  ['Pillars', '/pillars'],
  ['Deep dives', '/learn'],
  ['Paths', '/paths'],
  ['Industries', '/industries'],
  ['Cases', '/cases'],
  ['Resources', '/resources'],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function openSearch() {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : searchButtonRef.current;
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSelectedIndex(0);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  useEffect(() => {
    const saved = window.localStorage.getItem('robins-hood-theme') ?? window.localStorage.getItem('nexus-theme');
    const selected = saved === 'dark' ? 'dark' : 'light';
    const timer = window.setTimeout(() => {
      setTheme(selected);
      document.documentElement.dataset.theme = selected;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        openSearch();
      }
      if (event.key === 'Escape') closeSearch();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics.filter((topic) => topic.featured).slice(0, 6).map((topic) => ({ kind: 'Topic', title: topic.title, detail: topic.categoryLabel, href: `/learn/${topic.slug}` }));
    const topicResults = topics.filter((topic) => matchesSearch(q, topic.title, topic.summary, topic.categoryLabel, topic.subtrack)).sort((a, b) => searchScore(q, a.title, a.categoryLabel, a.summary) - searchScore(q, b.title, b.categoryLabel, b.summary) || a.title.localeCompare(b.title)).slice(0, 8).map((topic) => ({ kind: 'Topic', title: topic.title, detail: topic.categoryLabel, href: `/learn/${topic.slug}` }));
    const glossaryResults = glossary.filter((term) => matchesSearch(q, term.term, term.expansion, term.meaning, term.howItWorks, term.whyItMatters, term.commonConfusion, term.where, term.boundary, term.example, ...(term.aliases ?? []), ...(term.related ?? []))).sort((a, b) => searchScore(q, a.term, a.expansion ?? a.category, `${a.meaning} ${a.howItWorks ?? ''} ${a.example}`) - searchScore(q, b.term, b.expansion ?? b.category, `${b.meaning} ${b.howItWorks ?? ''} ${b.example}`) || a.term.localeCompare(b.term)).slice(0, 8).map((term) => ({ kind: 'Glossary', title: term.term, detail: term.expansion ?? term.category, href: `/glossary?q=${encodeURIComponent(term.term)}#glossary-index` }));
    const orgResults = organizations.filter((org) => matchesSearch(q, org.acronym, org.name, org.description)).slice(0, 4).map((org) => ({ kind: 'Organization', title: org.acronym, detail: org.name, href: `/organizations#org-${org.acronym.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }));
    const reportResults = evidenceItems.filter((item) => matchesSearch(q, item.title, item.publisher, item.summary, ...item.domains)).slice(0, 3).map((item) => ({ kind: 'Report', title: item.title, detail: item.publisher, href: '/reports' }));
    const caseResults = caseStudies.filter((item) => matchesSearch(q, item.title, item.industry, item.situation, ...item.domains)).slice(0, 3).map((item) => ({ kind: 'Case', title: item.title, detail: item.industry, href: `/cases/${item.slug}` }));
    const frameworkResults = frameworkCatalog.filter((item) => matchesSearch(q, item.shortName, item.fullName, item.owner, ...item.domains, ...(item.aliases ?? []))).slice(0, 3).map((item) => ({ kind: 'Framework', title: item.shortName, detail: item.fullName, href: `/frameworks/${item.slug}` }));
    const toolResults = toolCatalog.filter((item) => matchesSearch(q, item.name, item.expansion, item.family, item.purpose, ...item.keywords)).slice(0, 4).map((item) => ({ kind: 'Tool', title: item.name, detail: item.family, href: `/tools/${item.slug}` }));
    return [...glossaryResults, ...toolResults, ...frameworkResults, ...topicResults, ...reportResults, ...caseResults, ...orgResults]
      .sort((a, b) => searchScore(q, a.title, a.detail) - searchScore(q, b.title, b.detail) || a.title.localeCompare(b.title))
      .slice(0, 14);
  }, [query]);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('robins-hood-theme', next);
  }

  function isActive(href: string) {
    if (href === '/resources') return ['/resources', '/reports', '/glossary', '/organizations', '/frameworks', '/tools', '/linux', '/red-blue'].some((route) => pathname.startsWith(route));
    return pathname.startsWith(href);
  }

  const isHome = pathname === '/';
  return (
    <>
      <header className={`global-header ${isHome ? 'over-hero' : 'solid'}`}>
        <Link className="brand" href="/" aria-label="Robin’s Hood home">
          <span className="brand-image-wrap" aria-hidden="true"><Image className="brand-image" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/robins-hood-mark.png`} alt="" width={42} height={42} priority unoptimized /></span>
          <span>ROBIN’S <b>HOOD</b></span>
        </Link>
        <nav className="global-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link className={isActive(href) ? 'active' : ''} href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="global-actions">
          <Link className="learning-action" href="/learning">My learning</Link>
          <button ref={searchButtonRef} className="search-button" onClick={openSearch} type="button"><span>⌕</span> Search <kbd>⌘ K</kbd></button>
          <button className="theme-button" onClick={toggleTheme} type="button" aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '◐' : '◑'}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-expanded={menuOpen} aria-label="Open navigation">{menuOpen ? '×' : '☰'}</button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}<Link href="/learning">My learning<span>→</span></Link></nav>}
      </header>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Robin’s Hood" onMouseDown={(event) => { if (event.currentTarget === event.target) closeSearch(); }}>
          <div className="command-palette">
            <div className="command-input"><span>⌕</span><input ref={inputRef} role="combobox" aria-autocomplete="list" aria-controls="command-search-results" aria-expanded="true" aria-activedescendant={results[selectedIndex] ? `command-result-${selectedIndex}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setSelectedIndex(0); }} onKeyDown={(event) => {
              if (event.key === 'ArrowDown') { event.preventDefault(); setSelectedIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0))); }
              if (event.key === 'ArrowUp') { event.preventDefault(); setSelectedIndex((current) => Math.max(current - 1, 0)); }
              if (event.key === 'Home') { event.preventDefault(); setSelectedIndex(0); }
              if (event.key === 'End') { event.preventDefault(); setSelectedIndex(Math.max(results.length - 1, 0)); }
              if (event.key === 'Enter' && results[selectedIndex]) { event.preventDefault(); router.push(results[selectedIndex].href); closeSearch(); }
            }} placeholder="Search topics, terms, tools, frameworks and cases…" /><button onClick={closeSearch} type="button">ESC</button></div>
            <div className="command-label">{query ? `${results.length} matching results` : 'Suggested starting points'}</div>
            <div className="command-results" id="command-search-results" role="listbox">
              {results.map((result, index) => <Link id={`command-result-${index}`} role="option" aria-selected={index === selectedIndex} className={index === selectedIndex ? 'selected' : ''} href={result.href} onMouseEnter={() => setSelectedIndex(index)} key={`${result.kind}-${result.title}-${index}`}><span className="result-kind">{result.kind}</span><div><strong>{result.title}</strong><small>{result.detail}</small></div><i>↗</i></Link>)}
              {!results.length && <div className="empty-search"><strong>No exact match.</strong><span>Try a broader concept or open the full library.</span><Link href="/learn">Browse all topics →</Link></div>}
            </div>
            <div className="command-shortcuts"><Link href="/learning">My learning</Link><Link href="/red-blue">Attack and defense guide</Link><Link href="/glossary#glossary-index">Glossary</Link><Link href="/tools">Tool map</Link><Link href="/frameworks">Frameworks</Link></div>
            <div className="command-footer"><span>↑ ↓ Navigate</span><span>Enter Open</span><span>ESC Close</span></div>
          </div>
        </div>
      )}
    </>
  );
}
