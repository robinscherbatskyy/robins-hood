'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { attackFamilies, attackSurfaces, type AttackFamily } from '../lib/red-blue-catalog';

type ViewMode = 'red' | 'both' | 'blue';

function RedPanel({ attack }: { attack: AttackFamily }) {
  return <section className="rb-detail-panel red">
    <header><span>Red Team perspective</span><h3>How an authorized tester examines it</h3></header>
    <div className="rb-definition"><b>Attacker objective</b><p>{attack.objective}</p></div>
    <div className="rb-definition"><b>How the attack works</b><p>{attack.mechanism}</p></div>
    <div className="rb-panel-grid">
      <section><b>Safe validation sequence</b><ol>{attack.redValidation.map((item) => <li key={item}>{item}</li>)}</ol></section>
      <section><b>Techniques and tools</b><ul>{attack.redTools.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><b>Real patterns and exploit classes</b><ul>{attack.examples.map((item) => <li key={item}>{item}</li>)}</ul></section>
    </div>
    <p className="rb-safety"><strong>Boundary</strong> Use only in an environment you own or have explicit permission to test. The goal is minimum necessary proof, not uncontrolled exploitation.</p>
  </section>;
}

function BluePanel({ attack }: { attack: AttackFamily }) {
  return <section className="rb-detail-panel blue">
    <header><span>Blue Team perspective</span><h3>How defenders break, see and contain it</h3></header>
    <div className="rb-detection-strip"><b>Signals to correlate</b><div>{attack.signals.map((item) => <span key={item}>{item}</span>)}</div></div>
    <div className="rb-response-grid">
      <section><span>01</span><b>Prevent and reduce</b><ul>{attack.prevent.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><span>02</span><b>Detect and investigate</b><ul>{attack.detect.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><span>03</span><b>Contain and recover</b><ul>{attack.respond.map((item) => <li key={item}>{item}</li>)}</ul></section>
    </div>
    <div className="rb-tech-stack"><b>Technology and software examples</b>{attack.blueTechnology.map((item) => <span key={item}>{item}</span>)}</div>
  </section>;
}

export default function RedBlueMatrix() {
  const [mode, setMode] = useState<ViewMode>('both');
  const [surface, setSurface] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(attackFamilies[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attackFamilies.filter((item) => (surface === 'All' || item.surface === surface) && (!q || `${item.title} ${item.surface} ${item.mechanism} ${item.examples.join(' ')}`.toLowerCase().includes(q)));
  }, [surface, query]);
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? attackFamilies[0];

  return <>
    <section className="rb-pill-hero" aria-labelledby="red-blue-title">
      <div className="rb-hero-image" style={{ '--rb-hero-image': `url("${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/red-blue-pill-choice.png")` } as CSSProperties} aria-hidden="true" />
      <div className="rb-code-rain" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <header><span>Authorized security field guide</span><h1 id="red-blue-title">Attack &amp;<br /><em>defense.</em></h1><p>Pick an attack family and see both sides: the objective and safe validation method, then the telemetry, controls, investigation steps, recovery decisions and real software defenders use.</p></header>
      <div className="rb-pill-legend" aria-hidden="true"><i className="red" /><span>One scenario, attacker and defender views</span><i className="blue" /></div>
    </section>

    <section className={`rb-matrix mode-${mode}`} id="attack-matrix">
      <header><div><span>Attack and defense matrix</span><h2>{attackFamilies.length} major attack families across nine surfaces.</h2><p>No finite list contains every technique. This matrix covers durable families used to organize enterprise, application, cloud, identity, data, human and artificial-intelligence attack paths.</p></div><aside><b>Choose the view you need</b><p>Connected is the default. Narrow the page only when you are studying one professional perspective.</p><div className="rb-view-switch" role="group" aria-label="Choose an attack, connected or defense view"><button className={mode === 'red' ? 'active red' : 'red'} onClick={() => setMode('red')} type="button">Attack</button><button className={mode === 'both' ? 'active both' : 'both'} onClick={() => setMode('both')} type="button">Connected</button><button className={mode === 'blue' ? 'active blue' : 'blue'} onClick={() => setMode('blue')} type="button">Defense</button></div></aside></header>
      <div className="rb-filters"><label><span>Search attacks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="credential, ransomware, injection…" /></label><div><button className={surface === 'All' ? 'active' : ''} onClick={() => setSurface('All')} type="button">All <b>{attackFamilies.length}</b></button>{attackSurfaces.map((item) => <button className={surface === item ? 'active' : ''} onClick={() => setSurface(item)} type="button" key={item}>{item}</button>)}</div></div>
      <div className="rb-matrix-layout">
        <nav aria-label="Attack families">{filtered.map((attack, index) => <button className={selected.id === attack.id ? 'active' : ''} onClick={() => setSelectedId(attack.id)} type="button" key={attack.id}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{attack.surface}</small><strong>{attack.title}</strong></div><i>→</i></button>)}{filtered.length === 0 && <p>No attack family matches this filter.</p>}</nav>
        <article className="rb-attack-detail">
          <header><div><span>{selected.surface}</span><h2>{selected.title}</h2><p>{selected.mechanism}</p></div><div className="rb-selected-mode"><strong>{selected.id.replaceAll('-', ' ')}</strong><small>{mode === 'both' ? 'Connected view' : mode === 'red' ? 'Attack view' : 'Defense view'}</small></div></header>
          <div className="rb-framework-links">{selected.mappings.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={item.url}>{item.label}<span>↗</span></a>)}</div>
          <div className="rb-mode-content">{mode !== 'blue' && <RedPanel attack={selected} />}{mode !== 'red' && <BluePanel attack={selected} />}</div>
        </article>
      </div>
    </section>

    <section className="rb-boundary"><div><span>Ethics and authorization</span><h2>Capability without permission is not professional testing.</h2></div><p>Define written authority, exact targets, allowed techniques, test data, hours, rate limits, evidence handling, emergency contacts, stop conditions and cleanup. Test the smallest action that proves the risk. Never use this page as permission to access a system.</p><Link href="/learn/ethics-authorization-scope-and-rules-of-engagement">Open rules of engagement guide →</Link></section>
  </>;
}
