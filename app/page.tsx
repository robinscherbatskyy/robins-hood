import BigPictureOrbit from '../components/BigPictureOrbit';
import Link from 'next/link';
import { glossary, learningPaths, organizations } from '../lib/ecosystem';
import { caseStudies, evidenceItems } from '../lib/resources';
import { topics } from '../lib/topics';

const pillars = [
  { code: '01', title: 'Business & operations', tone: 'blue', href: '/pillars/business-product-operations', detail: 'Value, products, processes, projects, services, finance and decisions' },
  { code: '02', title: 'Systems & infrastructure', tone: 'violet', href: '/pillars/systems-infrastructure', detail: 'Computing, networks, architecture, integration, databases and operations' },
  { code: '03', title: 'Software, SDLC & delivery', tone: 'indigo', href: '/pillars/software-sdlc-delivery', detail: 'How software is discovered, designed, built, tested, released and retired' },
  { code: '04', title: 'Cloud & resilience', tone: 'sky', href: '/pillars/cloud-resilience', detail: 'Platforms, containers, reliability, continuity and shared responsibility' },
  { code: '05', title: 'Data & analytics', tone: 'teal', href: '/pillars/data-analytics', detail: 'Lifecycles, models, pipelines, quality, lineage and trustworthy insight' },
  { code: '06', title: 'AI & emerging technology', tone: 'rose', href: '/pillars/artificial-intelligence', detail: 'Traditional AI, machine learning, language, agents, blockchain, quantum, robotics and connected systems' },
  { code: '07', title: 'Cybersecurity, identity & VAPT', tone: 'cyan', href: '/pillars/cybersecurity-identity-vapt', detail: 'Architecture, access, defense, testing, incident response and recovery' },
  { code: '08', title: 'Governance & assurance', tone: 'amber', href: '/pillars/governance-compliance-assurance', detail: 'Direction, policy, compliance, control, privacy, audit and evidence' },
  { code: '09', title: 'Risk & enterprise resilience', tone: 'orange', href: '/pillars/enterprise-risk-resilience', detail: 'Uncertainty, appetite, scenarios, continuity, third parties and trade-offs' },
  { code: '10', title: 'People & professional capability', tone: 'purple', href: '/pillars/people-professional-capability', detail: 'Social skill, networking, writing, presenting, leadership and negotiation' },
];

const featuredPaths = learningPaths;

const applyCards = [
  { label: 'Industry lenses', title: 'See how the same knowledge changes with the stakes.', detail: 'Banking, manufacturing, healthcare, retail, energy, telecommunications, public services, transport and technology.', href: '/industries', count: '09 domains' },
  { label: 'Case files', title: 'Trace what happened across more than one pillar.', detail: 'Documented incidents and clearly labeled fictional composites with facts, system links and decision prompts.', href: '/cases', count: `${caseStudies.length} cases` },
];

const referenceCards = [
  { title: 'A-Z glossary', count: `${glossary.length} terms`, href: '/glossary#glossary-index', detail: 'Consolidated and domain views with full forms, placement, examples and related ideas.' },
  { title: 'Reports & evidence', count: `${evidenceItems.length} sources`, href: '/reports', detail: 'Current reports, statistical snapshots and source notes with dates and caveats.' },
  { title: 'Organizations & standards', count: `${organizations.length} profiles`, href: '/organizations', detail: 'Regulators, standards bodies, agencies, communities, institutions and providers in context.' },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> A living field guide for curious minds</p>
          <h1>Understand how<br /><em>everything connects.</em></h1>
          <p className="hero-lead">A clear, visual knowledge system for business, technology, security, governance, risk, industry and the human skills that make them useful, from first principles to professional judgment.</p>
          <form className="hero-search" action={`${basePath}/search`} role="search">
            <span aria-hidden="true">⌕</span>
            <input name="q" aria-label="Search Robin’s Hood" placeholder="Search a concept, framework, product or organization…" />
            <kbd>⌘ K</kbd>
          </form>
          <div className="hero-meta" aria-label="Robin’s Hood highlights">
            <span><b>{pillars.length}</b> core learning pillars</span>
            <span><b>{topics.length}</b> connected guides</span>
            <span><b>{glossary.length}</b> searchable terms</span>
          </div>
        </div>

        <BigPictureOrbit />
      </section>

      <section className="atlas-architecture" aria-label="Knowledge architecture">
        <Link href="/pillars"><span>01 · Learn</span><strong>Ten core pillars</strong><p>Durable explanations from foundations to advanced judgment.</p><b>Open pillars →</b></Link>
        <i>→</i><Link href="/cases"><span>02 · Apply</span><strong>Industries & cases</strong><p>Operating context, decisions, trade-offs and consequences.</p><b>Open applications →</b></Link>
        <i>→</i><Link href="/resources"><span>03 · Reference</span><strong>Evidence & definitions</strong><p>Glossary, reports, standards and organizations at the source.</p><b>Open resources →</b></Link>
      </section>

      <section className="explore" id="explore">
        <div className="section-heading">
          <div><p className="eyebrow dark"><span /> The learning layer</p><h2>Ten pillars.<br />One connected view.</h2></div>
          <p>Each pillar has a complete reading path. Cross-cutting subjects such as DevSecOps, AI governance or cloud security link across pillars, while narrower pages support revision and technical depth.</p>
        </div>
        <div className="discipline-grid pillar-grid">
          {pillars.map((item) => <Link className={`discipline-card ${item.tone}`} href={item.href} key={item.code}><span className="card-code">{item.code}</span><span className="card-orb" aria-hidden="true"><i /><i /></span><h3>{item.title}</h3><p>{item.detail}</p><span className="card-link">Explore the pillar <b>→</b></span></Link>)}
        </div>
      </section>

      <section className="path-preview" id="paths">
        <div className="path-intro"><p className="eyebrow dark"><span /> A path, not a pile of pages</p><h2>Learn in the order<br />your brain needs.</h2><p>Begin with a friendly mental model, connect it to systems and decisions, then test the idea in a realistic situation.</p><Link href="/paths">See all learning paths <span>→</span></Link></div>
        <ol className="path-list">{featuredPaths.map((path, index) => <li key={path.slug}><Link href={`/paths#path-${path.slug}`}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{path.title}</strong><small>{path.description}</small></div><i aria-hidden="true">→</i></Link></li>)}</ol>
      </section>

      <section className="apply-layer">
        <header><p className="eyebrow dark"><span /> The application layer</p><h2>Knowledge becomes judgment<br />when context pushes back.</h2></header>
        <div>{applyCards.map((item) => <Link href={item.href} key={item.title}><span>{item.label}</span><small>{item.count}</small><h3>{item.title}</h3><p>{item.detail}</p><b>Open collection →</b></Link>)}</div>
      </section>

      <section className="reference-layer">
        <header><p className="eyebrow dark"><span /> The reference layer</p><h2>Find the term.<br />Check the evidence.</h2><p>Definitions, institutional roles and current reports stay separate from lessons so their authority, dates and limitations remain visible.</p></header>
        <div>{referenceCards.map((item, index) => <Link href={item.href} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><small>{item.count}</small><h3>{item.title}</h3><p>{item.detail}</p><b>Open reference →</b></Link>)}</div>
      </section>
    </main>
  );
}
