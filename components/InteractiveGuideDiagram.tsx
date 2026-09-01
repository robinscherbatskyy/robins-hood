'use client';

import { useMemo, useState } from 'react';
import type { DiagramView } from '../lib/guide-enrichment';

export default function InteractiveGuideDiagram({ views }: { views: DiagramView[] }) {
  const [viewId, setViewId] = useState(views[0]?.id ?? '');
  const activeView = views.find((view) => view.id === viewId) ?? views[0];
  const [nodeByView, setNodeByView] = useState<Record<string, string>>(() => Object.fromEntries(views.map((view) => [view.id, view.nodes[0]?.id ?? ''])));
  const activeNodeId = nodeByView[activeView.id] ?? activeView.nodes[0]?.id;
  const activeNode = activeView.nodes.find((node) => node.id === activeNodeId) ?? activeView.nodes[0];

  const connected = useMemo(() => {
    const ids = new Set<string>([activeNodeId]);
    activeView.edges.forEach((edge) => {
      if (edge.from === activeNodeId) ids.add(edge.to);
      if (edge.to === activeNodeId) ids.add(edge.from);
    });
    return ids;
  }, [activeNodeId, activeView]);

  function selectNode(id: string) {
    setNodeByView((current) => ({ ...current, [activeView.id]: id }));
  }

  if (!activeView || !activeNode) return null;

  return <div className="interactive-guide-diagram">
    <div className="diagram-view-tabs" role="tablist" aria-label="Diagram view">
      {views.map((view) => <button aria-selected={view.id === activeView.id} className={view.id === activeView.id ? 'active' : ''} onClick={() => setViewId(view.id)} role="tab" type="button" key={view.id}><span>{view.id === activeView.id ? '◆' : '◇'}</span>{view.label}</button>)}
    </div>

    <div className="diagram-view-heading">
      <div><span>Interactive {activeView.type}</span><h3>{activeView.title}</h3></div>
      <p>{activeView.intro}</p>
    </div>

    <div className={`diagram-node-canvas diagram-${activeView.type}`} role="group" aria-label={activeView.title}>
      {activeView.nodes.map((node, index) => {
        const edge = activeView.edges.find((item) => item.from === node.id);
        const isActive = node.id === activeNode.id;
        const isConnected = connected.has(node.id);
        return <div className="diagram-node-wrap" key={node.id}>
          <button aria-pressed={isActive} className={`${isActive ? 'active' : ''} ${activeNodeId && !isConnected ? 'muted' : ''}`} onClick={() => selectNode(node.id)} onFocus={() => selectNode(node.id)} onPointerEnter={() => selectNode(node.id)} type="button">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>{node.group ?? 'Stage'}</small>
            <strong>{node.label}</strong>
            <i aria-hidden="true">{isActive ? '●' : '○'}</i>
          </button>
          {index < activeView.nodes.length - 1 && <div className={`diagram-edge edge-${edge?.kind ?? 'normal'} ${edge?.from === activeNodeId || edge?.to === activeNodeId ? 'active' : ''}`} aria-hidden="true"><span>{edge?.label ?? '→'}</span></div>}
        </div>;
      })}
      {activeView.type === 'cycle' && <div className="diagram-feedback" aria-hidden="true"><span>Evidence changes the next cycle</span><i>↩</i></div>}
    </div>

    <div className="diagram-detail" aria-live="polite">
      <div><span>Selected stage</span><b>{String(activeView.nodes.findIndex((node) => node.id === activeNode.id) + 1).padStart(2, '0')}</b></div>
      <section><small>{activeNode.group ?? 'Stage'}</small><h4>{activeNode.label}</h4><p>{activeNode.detail}</p></section>
      <nav aria-label="Connected stages">{activeView.nodes.filter((node) => connected.has(node.id) && node.id !== activeNode.id).map((node) => <button onClick={() => selectNode(node.id)} type="button" key={node.id}>Connects to {node.label} <span>→</span></button>)}</nav>
    </div>
  </div>;
}

