'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { glossary, GlossaryTerm } from '../lib/ecosystem';
import { domainSlugForTerm, glossaryDomainBySlug, glossaryDomains, glossaryTermAnchor } from '../lib/glossary-domains';
import { topics } from '../lib/topics';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function searchText(term: GlossaryTerm) {
  return [term.term, term.expansion, term.category, term.meaning, term.howItWorks, term.whyItMatters, term.commonConfusion, term.where, term.example, ...(term.aliases ?? []), ...(term.related ?? [])].filter(Boolean).join(' ').toLowerCase();
}

const guideStopWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'that', 'this', 'model', 'system', 'security', 'management']);
const exactGuideHints: Record<string, string> = {
  'osi model': 'network-foundations-and-protocol-models', 'tcp/ip': 'network-foundations-and-protocol-models', packet: 'network-foundations-and-protocol-models', frame: 'network-foundations-and-protocol-models', tcp: 'network-foundations-and-protocol-models', udp: 'network-foundations-and-protocol-models', ip: 'network-foundations-and-protocol-models', arp: 'network-foundations-and-protocol-models', dns: 'addressing-naming-and-routing',
  rag: 'generative-ai-large-language-models-retrieval-and-agents', llm: 'generative-ai-large-language-models-retrieval-and-agents', 'context window': 'generative-ai-large-language-models-retrieval-and-agents', embedding: 'generative-ai-large-language-models-retrieval-and-agents', grounding: 'generative-ai-large-language-models-retrieval-and-agents',
  'man-in-the-middle (mitm)': 'man-in-the-middle-spoofing-and-transport-trust', 'arp spoofing': 'man-in-the-middle-spoofing-and-transport-trust', 'dns spoofing': 'man-in-the-middle-spoofing-and-transport-trust', 'evil twin': 'man-in-the-middle-spoofing-and-transport-trust',
  malware: 'malware-ransomware-and-unwanted-software', virus: 'malware-ransomware-and-unwanted-software', worm: 'malware-ransomware-and-unwanted-software', trojan: 'malware-ransomware-and-unwanted-software', ransomware: 'malware-ransomware-and-unwanted-software', rootkit: 'malware-ransomware-and-unwanted-software', spyware: 'malware-ransomware-and-unwanted-software', keylogger: 'malware-ransomware-and-unwanted-software', botnet: 'malware-ransomware-and-unwanted-software',
  wordlist: 'password-attacks-offline-cracking-and-authentication-defense', 'dictionary attack': 'password-attacks-offline-cracking-and-authentication-defense', 'password cracking': 'password-attacks-offline-cracking-and-authentication-defense', 'offline password cracking': 'password-attacks-offline-cracking-and-authentication-defense', 'online password guessing': 'password-attacks-offline-cracking-and-authentication-defense', 'rainbow table': 'password-attacks-offline-cracking-and-authentication-defense', 'brute-force attack': 'password-attacks-offline-cracking-and-authentication-defense', 'password spraying': 'password-attacks-offline-cracking-and-authentication-defense', 'credential stuffing': 'password-attacks-offline-cracking-and-authentication-defense', salt: 'password-attacks-offline-cracking-and-authentication-defense', 'password hash': 'password-attacks-offline-cracking-and-authentication-defense',
  'buffer overflow': 'software-vulnerability-families-and-secure-coding', 'stack overflow': 'software-vulnerability-families-and-secure-coding', 'heap overflow': 'software-vulnerability-families-and-secure-coding', 'memory safety': 'software-vulnerability-families-and-secure-coding', 'bounds checking': 'software-vulnerability-families-and-secure-coding', 'input validation': 'software-vulnerability-families-and-secure-coding', 'output encoding': 'software-vulnerability-families-and-secure-coding', injection: 'software-vulnerability-families-and-secure-coding', 'race condition': 'software-vulnerability-families-and-secure-coding', toctou: 'software-vulnerability-families-and-secure-coding', 'broken access control': 'software-vulnerability-families-and-secure-coding', 'insecure design': 'software-vulnerability-families-and-secure-coding', 'custom cryptography': 'software-vulnerability-families-and-secure-coding', 'physical access': 'software-vulnerability-families-and-secure-coding', 'full-disk encryption': 'software-vulnerability-families-and-secure-coding',
  'inherent risk': 'risk-foundations-taxonomies-appetite-and-tolerance', 'residual risk': 'risk-foundations-taxonomies-appetite-and-tolerance', 'risk appetite': 'risk-foundations-taxonomies-appetite-and-tolerance', 'risk tolerance': 'risk-foundations-taxonomies-appetite-and-tolerance',
  'directive control': 'core-security-control-families', 'deterrent control': 'core-security-control-families', 'preventive control': 'core-security-control-families', 'compensating control': 'core-security-control-families', 'detective control': 'core-security-control-families', 'corrective control': 'core-security-control-families', 'recovery control': 'core-security-control-families',
};

function guideForTerm(term: GlossaryTerm) {
  const hintedSlug = exactGuideHints[term.term.toLowerCase()];
  if (hintedSlug) return topics.find((topic) => topic.slug === hintedSlug);
  const exactNames = [term.term, term.expansion, ...(term.aliases ?? [])].filter(Boolean).map((value) => String(value).toLowerCase());
  const termWords = new Set(exactNames.join(' ').replace(/[^a-z0-9+]+/g, ' ').split(/\s+/).filter((word) => word.length > 2 && !guideStopWords.has(word)));
  const ranked = topics.map((topic) => {
    const title = topic.title.toLowerCase();
    const body = `${topic.title} ${topic.summary} ${topic.subtrack}`.toLowerCase();
    let score = exactNames.reduce((total, name) => total + (name.length > 3 && title.includes(name) ? 80 : name.length > 3 && body.includes(name) ? 30 : 0), 0);
    termWords.forEach((word) => { if (title.includes(word)) score += 8; else if (body.includes(word)) score += 3; });
    if (body.includes(term.category.toLowerCase())) score += 2;
    return { topic, score };
  }).sort((a, b) => b.score - a.score);
  return ranked[0]?.score >= 20 ? ranked[0].topic : undefined;
}

export default function GlossaryClient({ initialDomain = 'all' }: { initialDomain?: string }) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState(initialDomain);
  const [view, setView] = useState<'compact' | 'detailed'>('detailed');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedQuery = params.get('q');
    const requestedDomain = params.get('domain');
    const timer = window.setTimeout(() => {
      if (requestedQuery) setQuery(requestedQuery);
      if (requestedDomain && (requestedDomain === 'all' || glossaryDomainBySlug(requestedDomain))) setDomain(requestedDomain);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialDomain]);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    if (query) params.set('q', query); else params.delete('q');
    if (domain !== 'all' && domain !== initialDomain) params.set('domain', domain); else params.delete('domain');
    const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', next);
  }, [query, domain, ready, initialDomain]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const score = (term: GlossaryTerm) => {
      const name = term.term.toLowerCase();
      const expansion = (term.expansion ?? '').toLowerCase();
      const aliases = (term.aliases ?? []).map((alias) => alias.toLowerCase());
      if (!q) return 0;
      if (name === q || expansion === q || aliases.includes(q)) return 0;
      if (name.startsWith(q) || expansion.startsWith(q)) return 1;
      if (name.split(/\s+/).includes(q) || expansion.split(/\s+/).includes(q)) return 2;
      if (name.includes(q) || expansion.includes(q)) return 3;
      return 4;
    };
    return glossary
      .filter((term) => searchText(term).includes(q) && (domain === 'all' || domainSlugForTerm(term) === domain))
      .sort((a, b) => score(a) - score(b) || a.term.localeCompare(b.term));
  }, [query, domain]);

  const grouped = useMemo(() => query.trim()
    ? [{ letter: 'Results', terms: filtered }]
    : alphabet.map((letter) => ({ letter, terms: filtered.filter((term) => term.term[0]?.toUpperCase() === letter) })).filter((group) => group.terms.length), [filtered, query]);
  const availableLetters = new Set(grouped.map((group) => group.letter));

  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const timer = window.setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      target?.scrollIntoView({ block: 'start' });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [ready, query, domain, view]);

  function reset() {
    setQuery('');
    setDomain(initialDomain);
  }

  return <section className="glossary-browser" id="glossary-index">
    <div className="glossary-tools">
      <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a term, abbreviation, full form or alias…" /></label>
      <select value={domain} onChange={(event) => setDomain(event.target.value)} aria-label="Choose a glossary domain"><option value="all">All domains</option>{glossaryDomains.map((item) => <option value={item.slug} key={item.slug}>{item.shortLabel}</option>)}</select>
      <div className="view-toggle" aria-label="Glossary view">
        <button className={view === 'compact' ? 'active' : ''} onClick={() => setView('compact')} type="button">Compact</button>
        <button className={view === 'detailed' ? 'active' : ''} onClick={() => setView('detailed')} type="button">Detailed</button>
      </div>
    </div>

    <div className="glossary-domain-row" aria-label="Glossary domains">
      <Link className={domain === 'all' ? 'active' : ''} href="/glossary#glossary-index">All</Link>
      {glossaryDomains.map((item) => <Link className={domain === item.slug ? 'active' : ''} href={`/glossary/${item.slug}#glossary-index`} key={item.slug}>{item.shortLabel}</Link>)}
    </div>

    {!query.trim() && <nav className="alphabet-rail" aria-label="Glossary alphabet">
      <a href="#glossary-index">All</a>
      {alphabet.map((letter) => availableLetters.has(letter) ? <a href={`#letter-${letter}`} key={letter}>{letter}</a> : <span aria-disabled="true" key={letter}>{letter}</span>)}
    </nav>}

    <div className="glossary-summary"><div><span>{domain === 'all' ? 'Consolidated glossary' : `${glossaryDomainBySlug(domain)?.label ?? 'Domain'} glossary`}</span><strong>{filtered.length} terms</strong></div><p>Definitions are educational summaries. Product categories, regulations and standards can change; follow linked guides and official sources for current detail.</p></div>

    {grouped.length ? <div className={`glossary-groups ${view}`}>
      {grouped.map((group) => <section id={group.letter === 'Results' ? 'glossary-results' : `letter-${group.letter}`} className={`glossary-letter-group ${group.letter === 'Results' ? 'results-group' : ''}`} key={group.letter}>
        <header><strong>{group.letter}</strong><span>{group.terms.length} {group.terms.length === 1 ? 'term' : 'terms'}</span></header>
        <div>{group.terms.map((item) => { const guide = guideForTerm(item); return <details id={glossaryTermAnchor(item.term)} className="glossary-term-card" key={item.term}>
          <summary>
            <div className="term-title"><strong>{item.term}</strong>{item.expansion && <span>{item.expansion}</span>}</div>
            <p>{item.meaning}</p>
            <div className="term-meta"><i>{glossaryDomainBySlug(domainSlugForTerm(item))?.shortLabel}</i><small>{item.category}</small><b>＋</b></div>
          </summary>
          <div className="term-detail">
            {item.aliases?.length ? <div><span>Also known or searched as</span><p>{item.aliases.join(' · ')}</p></div> : null}
            {item.howItWorks ? <div><span>How it works</span><p>{item.howItWorks}</p></div> : null}
            {item.whyItMatters ? <div><span>Why it matters</span><p>{item.whyItMatters}</p></div> : null}
            {item.where ? <div><span>Where it sits</span><p>{item.where}</p></div> : null}
            <div><span>Example</span><p>{item.example}</p></div>
            {item.commonConfusion ? <div><span>Common confusion</span><p>{item.commonConfusion}</p></div> : null}
            {item.boundary ? <div><span>Important boundary</span><p>{item.boundary}</p></div> : null}
            {item.version || item.status ? <div><span>Version and status</span><p>{[item.version, item.status, item.lastReviewed ? `Reviewed ${item.lastReviewed}` : ''].filter(Boolean).join(' · ')}</p></div> : null}
            {item.related?.length ? <div><span>Related</span><p>{item.related.map((related) => <Link href={`/glossary?q=${encodeURIComponent(related)}#glossary-index`} key={related}>{related}</Link>)}</p></div> : null}
            {guide ? <div><span>Learn in context</span><p><Link href={`/learn/${guide.slug}`}>{guide.title} →</Link></p></div> : null}
            {item.officialUrl ? <div><span>Official or primary source</span><p><a href={item.officialUrl} target="_blank" rel="noreferrer">Open source ↗</a></p></div> : null}
          </div>
        </details>; })}</div>
      </section>)}
    </div> : <div className="no-results glossary-empty"><strong>No term matches this combination.</strong><p>Try the full form, a broader word or the consolidated view.</p><button onClick={reset} type="button">Reset glossary</button></div>}
  </section>;
}
