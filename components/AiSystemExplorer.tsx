'use client';

import { useState } from 'react';
import Link from 'next/link';

const modes = [
  {
    id: 'predictive', label: 'Predictive ML',
    purpose: 'Estimate a class, score, quantity or next-best action from learned patterns.',
    example: 'A payment-risk model estimates the probability that a transaction is fraudulent.',
    path: ['Business question', 'Historical data', 'Features', 'Training', 'Validation', 'Inference', 'Decision'],
    inspect: ['Is the target label meaningful?', 'Does the evaluation data represent real use?', 'Which threshold turns a score into an action?', 'Who monitors drift and harmful errors?'],
    failure: 'A high aggregate accuracy can hide poor performance for rare but important events or affected groups.',
  },
  {
    id: 'generative', label: 'Generative AI',
    purpose: 'Produce new language, code, images, audio or other content from instructions and context.',
    example: 'A support assistant drafts a response, but a person remains responsible for a sensitive account decision.',
    path: ['User intent', 'System instruction', 'Context', 'Foundation model', 'Candidate output', 'Validation', 'User'],
    inspect: ['What may enter the context?', 'Which claims require grounding?', 'How are unsafe or sensitive outputs handled?', 'Can a person identify limits and appeal a decision?'],
    failure: 'Fluent output can be unsupported, stale, biased, insecure or inconsistent even when it sounds certain.',
  },
  {
    id: 'rag', label: 'RAG',
    purpose: 'Retrieve approved source material at request time and place selected passages into the model context.',
    example: 'An employee asks about travel policy. Retrieval finds the current policy version the employee may access and attaches citations to the answer.',
    path: ['Question + identity', 'Query rewrite', 'Authorized retrieval', 'Rank + filter', 'Grounded context', 'Generate', 'Cite + verify'],
    inspect: ['Was access enforced before retrieval?', 'Are chunks current, complete and traceable?', 'Does the answer follow the retrieved evidence?', 'What happens when no reliable source is found?'],
    failure: 'Retrieval-Augmented Generation improves access to evidence, but it does not guarantee truth, authorization or complete coverage.',
  },
  {
    id: 'agent', label: 'Agentic system',
    purpose: 'Use a model inside a loop that can plan, select tools, observe results and continue toward a bounded goal.',
    example: 'An operations agent reads an approved alert, gathers diagnostic evidence and drafts a response plan, but cannot change production without approval.',
    path: ['Goal + policy', 'Plan', 'Choose tool', 'Authorize', 'Act in sandbox', 'Observe', 'Stop, ask or continue'],
    inspect: ['Which tools and data can it reach?', 'What is the smallest useful permission?', 'Which actions need approval?', 'What limits cost, time and repeated actions?', 'Can every action be reconstructed?'],
    failure: 'A model error becomes more consequential when the system can act. Tool permissions, isolation, limits and human checkpoints are security boundaries.',
  },
] as const;

const vocabulary = [
  ['Model', 'A learned mathematical system that maps input to output.'],
  ['Training', 'Adjusting model parameters using examples and an objective.'],
  ['Inference', 'Using a trained model on new input.'],
  ['Token', 'A unit of text processed by a language model, often part of a word.'],
  ['Embedding', 'A numeric representation whose geometry captures useful similarity.'],
  ['Context window', 'The limited amount of input the model can consider in one request.'],
  ['Grounding', 'Connecting an output to verifiable source material or observed facts.'],
  ['Vector search', 'Retrieving items by similarity between numeric embeddings.'],
  ['Tool call', 'A structured request from the model to an external capability.'],
  ['Guardrail', 'A policy, validation or runtime control around model behavior.'],
  ['Evaluation', 'A repeatable test of usefulness, quality, safety, cost or reliability.'],
  ['Drift', 'A change in data, context or behavior that weakens earlier evidence.'],
] as const;

export default function AiSystemExplorer() {
  const [active, setActive] = useState<(typeof modes)[number]['id']>('rag');
  const mode = modes.find((item) => item.id === active) ?? modes[0];
  return <section className="ai-system-explorer" id="ai-system-map">
    <header><span>Interactive architecture</span><h2>Four systems people often call &ldquo;AI&rdquo;.</h2><p>Select a mode. The architecture, evidence and failure boundary change with the job the system performs.</p></header>
    <div className="ai-mode-tabs" role="tablist" aria-label="AI system types">{modes.map((item) => <button className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)} role="tab" aria-selected={active === item.id} type="button" key={item.id}><span>{item.label}</span><small>{item.purpose}</small></button>)}</div>
    <article className="ai-mode-panel" role="tabpanel">
      <div className="ai-system-flow">{mode.path.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < mode.path.length - 1 && <i>→</i>}</div>)}</div>
      <div className="ai-mode-detail"><section><span>Concrete example</span><p>{mode.example}</p></section><section><span>Failure boundary</span><p>{mode.failure}</p></section><section><span>Questions that prove understanding</span><ol>{mode.inspect.map((item) => <li key={item}>{item}</li>)}</ol></section></div>
    </article>
    <div className="ai-vocabulary"><header><span>Vocabulary rail</span><strong>Mechanism before hype</strong></header>{vocabulary.map(([term, meaning]) => <Link href={`/glossary?q=${encodeURIComponent(term)}#glossary-index`} key={term}><b>{term}</b><span>{meaning}</span><i>↗</i></Link>)}</div>
  </section>;
}
