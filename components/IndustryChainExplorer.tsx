'use client';

import { useRef, useState } from 'react';
import { industryChains } from '../lib/industry-chains';

export default function IndustryChainExplorer() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const chain = industryChains[industryIndex];
  const active = chain.stages[stageIndex];

  function selectIndustry(index: number) {
    setIndustryIndex(index);
    setStageIndex(0);
    window.setTimeout(() => railRef.current?.scrollTo({ left: 0, behavior: 'smooth' }), 0);
  }

  function moveStage(next: number) {
    const bounded = Math.max(0, Math.min(chain.stages.length - 1, next));
    setStageIndex(bounded);
    railRef.current?.querySelector<HTMLButtonElement>(`[data-stage-index="${bounded}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  return <section className="industry-chain-explorer" id="industry-operating-map">
    <header className="industry-chain-header"><div><span>Interactive operating map</span><h2>See how the service actually works.</h2><p>Select an industry and inspect a stage. Each view shows the systems, records, owners, failure modes, controls and evidence that matter at that point.</p></div><aside><b>What changes the priorities</b><p>{chain.dominantConsequence}</p></aside></header>
    <nav className="industry-selector" aria-label="Choose an industry">{industryChains.map((item, index) => <button type="button" className={index === industryIndex ? 'active' : ''} aria-pressed={index === industryIndex} onClick={() => selectIndustry(index)} key={item.industrySlug}>{item.title}</button>)}</nav>
    <div className="industry-chain-controls"><div><span>{chain.title}</span><strong>Stage {stageIndex + 1} of {chain.stages.length}</strong></div><div><button type="button" onClick={() => moveStage(stageIndex - 1)} disabled={stageIndex === 0} aria-label="Previous value-chain stage">←</button><button type="button" onClick={() => moveStage(stageIndex + 1)} disabled={stageIndex === chain.stages.length - 1} aria-label="Next value-chain stage">→</button></div></div>
    <div className="industry-chain-viewport" ref={railRef}>
      <div className="industry-chain-rail" role="list" aria-label={`${chain.title} value chain`}>{chain.stages.map((item, index) => <div className="industry-stage-unit" role="listitem" key={item.id}>
        <button data-stage-index={index} type="button" className={stageIndex === index ? 'active' : ''} aria-current={stageIndex === index ? 'step' : undefined} onClick={() => setStageIndex(index)} onKeyDown={(event) => { if (event.key === 'ArrowRight') moveStage(stageIndex + 1); if (event.key === 'ArrowLeft') moveStage(stageIndex - 1); if (event.key === 'Home') moveStage(0); if (event.key === 'End') moveStage(chain.stages.length - 1); }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><p>{item.outcome}</p><i>{stageIndex === index ? 'Inspecting' : 'Open stage'}</i></button>{index < chain.stages.length - 1 ? <div className="industry-stage-connector" aria-hidden="true"><span /><b>→</b></div> : null}
      </div>)}</div>
    </div>
    <p className="industry-swipe-note">Swipe the operating stages or use the arrow buttons.</p>
    <div className="industry-stage-detail" aria-live="polite"><header><span>{String(stageIndex + 1).padStart(2, '0')}</span><div><small>Selected stage</small><h3>{active.label}</h3><p>{active.outcome}</p></div></header><div className="industry-stage-facets">
      <section><span>Systems</span>{active.systems.map((item) => <p key={item}>{item}</p>)}</section>
      <section><span>Data and records</span>{active.data.map((item) => <p key={item}>{item}</p>)}</section>
      <section><span>People and owners</span>{active.people.map((item) => <p key={item}>{item}</p>)}</section>
      <section className="risk"><span>Failure modes</span>{active.failureModes.map((item) => <p key={item}>{item}</p>)}</section>
      <section className="control"><span>Controls</span>{active.controls.map((item) => <p key={item}>{item}</p>)}</section>
      <section className="evidence"><span>Evidence</span>{active.evidence.map((item) => <p key={item}>{item}</p>)}</section>
    </div></div>
    <div className="industry-feedback"><span>↺</span><div><b>What operators learn from evidence</b><p>{chain.feedback}</p></div></div>
  </section>;
}
