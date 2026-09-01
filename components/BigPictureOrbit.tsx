'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const orbitNodes = [
  { id: 'systems', label: 'Systems', detail: 'Compute, networks, storage and operations', href: '/pillars/systems-infrastructure', className: 'node-a' },
  { id: 'security', label: 'Security', detail: 'Identity, defense, VAPT and recovery', href: '/pillars/cybersecurity-identity-vapt', className: 'node-b' },
  { id: 'risk', label: 'Risk', detail: 'Uncertainty, resilience and decisions', href: '/pillars/enterprise-risk-resilience', className: 'node-c' },
  { id: 'ai-data', label: 'AI and data', detail: 'Information, models, agents and evidence', href: '/pillars/artificial-intelligence', className: 'node-d' },
  { id: 'people', label: 'People', detail: 'Communication, leadership and influence', href: '/pillars/people-professional-capability', className: 'node-e' },
  { id: 'industry', label: 'Industries', detail: 'Banking, manufacturing, health and more', href: '/industries', className: 'node-f' },
] as const;

type OrbitNode = (typeof orbitNodes)[number];
type OrbitTooltip = { node: OrbitNode; left: number; top: number };

type DotStyle = CSSProperties & {
  '--dot-x': string;
  '--dot-y': string;
  '--dot-z': string;
  '--dot-scale': string;
  '--dot-opacity': string;
  '--dot-delay': string;
};

const sphereDots = Array.from({ length: 74 }, (_, index) => {
  const y = 1 - (index / 73) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;
  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;
  const radius = 94;
  const fixed = (value: number) => value.toFixed(4);
  return {
    id: index,
    style: {
      '--dot-x': `${fixed(x * radius)}px`,
      '--dot-y': `${fixed(y * radius)}px`,
      '--dot-z': `${fixed(z * radius)}px`,
      '--dot-scale': fixed(0.62 + ((z + 1) / 2) * 0.72),
      '--dot-opacity': fixed(0.36 + ((z + 1) / 2) * 0.64),
      '--dot-delay': `${fixed((index % 12) * -0.11)}s`,
    } as DotStyle,
  };
});

export default function BigPictureOrbit() {
  const [active, setActive] = useState<OrbitNode | null>(null);
  const [tooltip, setTooltip] = useState<OrbitTooltip | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clearTooltip = () => setTooltip(null);
    window.addEventListener('resize', clearTooltip);
    window.addEventListener('scroll', clearTooltip, true);
    return () => {
      window.removeEventListener('resize', clearTooltip);
      window.removeEventListener('scroll', clearTooltip, true);
    };
  }, []);

  function showTooltip(node: OrbitNode, element: HTMLElement) {
    const host = hostRef.current;
    if (!host) return;
    const nodeRect = element.getBoundingClientRect();
    const width = Math.min(292, window.innerWidth - 32);
    const height = 78;
    const viewportLeft = Math.min(window.innerWidth - 16 - width / 2, Math.max(16 + width / 2, nodeRect.left + nodeRect.width / 2));
    const proposedTop = nodeRect.bottom + 10 + height > window.innerHeight ? nodeRect.top - height - 10 : nodeRect.bottom + 10;
    const viewportTop = Math.min(window.innerHeight - 16 - height, Math.max(16, proposedTop));
    setActive(node);
    setTooltip({ node, left: viewportLeft, top: viewportTop });
  }

  function clearActive() {
    setActive(null);
    setTooltip(null);
  }

  return <div ref={hostRef} className="constellation interactive-constellation" data-active={active?.id ?? 'overview'} onPointerLeave={clearActive} aria-label="Explore connected knowledge pillars">
    <div className="orbit-scene">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="orbit orbit-three" aria-hidden="true" />
      <Link className="knowledge-sphere" href="/pillars" onFocus={() => setActive(null)} aria-label="Explore all ten connected knowledge pillars">
        <span className="sphere-halo" aria-hidden="true" />
        <span className="sphere-rotator" aria-hidden="true">{sphereDots.map((dot) => <i style={dot.style} key={dot.id} />)}</span>
        <span className="sphere-emblem"><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/robins-hood-mark.png`} alt="" width={82} height={82} draggable={false} unoptimized /><i>10</i></span>
      </Link>
      <div className="orbit-node-field">
        {orbitNodes.map((node) => <span className={`orbit-node-anchor ${node.className}`} key={node.id}><span className="orbit-node-counter"><Link className={`node ${active?.id === node.id ? 'active' : ''}`} href={node.href} aria-describedby="orbit-node-tooltip" onPointerEnter={(event) => showTooltip(node, event.currentTarget)} onFocus={(event) => showTooltip(node, event.currentTarget)} onBlur={clearActive}>
          <i aria-hidden="true" /><span>{node.label}</span>
        </Link></span></span>)}
      </div>
      <span className="connection connection-one" aria-hidden="true" /><span className="connection connection-two" aria-hidden="true" /><span className="connection connection-three" aria-hidden="true" />
    </div>
    <div id="orbit-node-tooltip" className="orbit-floating-tooltip" role="tooltip" aria-hidden={!tooltip} style={tooltip ? { left: tooltip.left, top: tooltip.top } : undefined}><strong>{tooltip?.node.label}</strong><span>{tooltip?.node.detail}</span></div>
  </div>;
}
