'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { securityPerspectives } from '../lib/security-perspectives';

type View = 'red' | 'blue' | 'compare';

export default function SecurityPerspectiveLab({ initialSlug = 'sql-injection', showScenarioPicker = false }: { initialSlug?: string; showScenarioPicker?: boolean }) {
  const [scenarioSlug, setScenarioSlug] = useState(initialSlug);
  const [view, setView] = useState<View>('compare');
  const [stage, setStage] = useState(0);
  const scenario = useMemo(() => securityPerspectives.find((item) => item.slug === scenarioSlug) ?? securityPerspectives[0], [scenarioSlug]);

  function chooseScenario(slug: string) {
    setScenarioSlug(slug);
    setStage(0);
  }

  return <div className="security-perspective-lab">
    {showScenarioPicker && <div className="security-scenario-picker" aria-label="Choose a security scenario">
      {securityPerspectives.map((item) => <button className={item.slug === scenario.slug ? 'active' : ''} onClick={() => chooseScenario(item.slug)} type="button" key={item.slug}><span>{item.slug === scenario.slug ? '●' : '○'}</span>{item.title}</button>)}
    </div>}

    <header className="security-lab-heading">
      <div><span>Security perspective lab</span><h3>Red Team or Blue Team?</h3><p>{scenario.summary}</p></div>
      <small>Authorized learning only</small>
    </header>

    <div className="pill-choice" role="tablist" aria-label="Choose security perspective">
      <button className={view === 'red' ? 'active' : ''} onClick={() => setView('red')} role="tab" aria-selected={view === 'red'} type="button"><i aria-hidden="true" /><span><small>RED TEAM</small><strong>Think like the tester</strong></span></button>
      <div aria-hidden="true"><span>same system</span><b>↔</b></div>
      <button className={view === 'blue' ? 'active' : ''} onClick={() => setView('blue')} role="tab" aria-selected={view === 'blue'} type="button"><i aria-hidden="true" /><span><small>BLUE TEAM</small><strong>Think like the defender</strong></span></button>
      <button className={`compare-choice ${view === 'compare' ? 'active' : ''}`} onClick={() => setView('compare')} role="tab" aria-selected={view === 'compare'} type="button">Compare both sides</button>
    </div>

    <div className="security-lab-title"><span>Current scenario</span><h4>{scenario.title}</h4><p>{scenario.boundary}</p></div>

    {(view === 'red' || view === 'compare') && <section className="perspective-panel red-panel">
      <header><span>Red Team</span><h4>Understand the weakness and prove it safely.</h4></header>
      <div className="perspective-lead"><span>Attacker goal</span><p>{scenario.red.goal}</p></div>
      <div className="perspective-grid">
        <section><span>Likely entry points</span><ul>{scenario.red.entry.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><span>Conditions that must exist</span><ul>{scenario.red.preconditions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><span>Authorized discovery</span><ul>{scenario.red.discovery.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><span>Evidence of success</span><ul>{scenario.red.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      <div className="validation-note"><span>Safe validation</span><p>{scenario.red.validation}</p></div>
    </section>}

    <section className="attack-chain-lab" aria-label="Interactive attack and defense chain">
      <header><div><span>Follow the behavior</span><h4>Where can the chain be broken?</h4></div><p>Select a stage to inspect what changes at that point.</p></header>
      <div className="attack-stage-row">{scenario.red.path.map((item, index) => <div className="attack-stage-wrap" key={item.label}><button className={index === stage ? 'active' : ''} onClick={() => setStage(index)} type="button"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong></button>{index < scenario.red.path.length - 1 && <i>→</i>}</div>)}</div>
      <div className="attack-stage-detail"><span>{String(stage + 1).padStart(2, '0')}</span><div><small>{scenario.red.path[stage].label}</small><p>{scenario.red.path[stage].detail}</p></div><strong>{view === 'red' ? 'Ask: what condition enables the next step?' : view === 'blue' ? 'Ask: what control or signal breaks this step?' : 'Compare the enabling condition with its defensive interruption.'}</strong></div>
    </section>

    {(view === 'blue' || view === 'compare') && <section className="perspective-panel blue-panel">
      <header><span>Blue Team</span><h4>Prevent, detect, investigate and recover.</h4></header>
      <div className="blue-response-grid">
        {([['Prevent', scenario.blue.prevent], ['Reduce exposure', scenario.blue.reduce], ['Detect', scenario.blue.detect], ['Investigate', scenario.blue.investigate], ['Contain', scenario.blue.contain], ['Remediate', scenario.blue.remediate], ['Verify the fix', scenario.blue.verify]] as const).map(([label, items], index) => <section key={label}><span>{String(index + 1).padStart(2, '0')}</span><h5>{label}</h5><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
      </div>
    </section>}

    <section className="attack-reference-grid">
      <header><span>MITRE ATT&amp;CK connections</span><h4>Map behavior only where the evidence supports it.</h4><p>ATT&amp;CK tactics explain why an adversary acts. Techniques and sub-techniques describe how. The mapping does not prove that a named actor was responsible.</p></header>
      <div>{scenario.attack.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={item.id}><span>{item.tactic}</span><strong>{item.id} · {item.technique}</strong><p>{item.note}</p><i>Official ATT&amp;CK ↗</i></a>)}</div>
    </section>

    <section className="security-tool-map">
      <header><span>Tool placement</span><h4>Products contribute signals and enforcement. They do not replace design.</h4></header>
      <div>{scenario.tools.map((tool) => <article key={tool.category}><span>{tool.category}</span><strong>{tool.examples}</strong><p>{tool.contribution}</p></article>)}</div>
    </section>

    <footer className="security-lab-footer"><p>Learn both perspectives, document authorization and use the smallest test that answers the question.</p><div><Link href="/frameworks/mitre-attack">Learn MITRE ATT&amp;CK</Link><Link href="/glossary/security-operations-tools?q=CVE#term-cve">Open security glossary</Link></div></footer>
  </div>;
}
