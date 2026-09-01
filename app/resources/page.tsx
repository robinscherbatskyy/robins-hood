import type { Metadata } from 'next';
import Link from 'next/link';
import { evidenceItems, caseStudies } from '../../lib/resources';
import { glossary, organizations } from '../../lib/ecosystem';
import { frameworkCatalog } from '../../lib/frameworks';
import { toolCatalog } from '../../lib/tool-catalog';

export const metadata: Metadata = { title: "Resources: Robin's Hood", description: 'Case studies, glossary, reports, standards, organizations, datasheets and evidence tools.' };

const resources = [
  { n: '01', title: 'Glossary', count: `Reference · ${glossary.length} terms`, href: '/glossary#glossary-index', tone: 'teal', copy: 'A consolidated A-Z plus domain views. Full forms, plain meaning, placement, examples and common confusions.' },
  { n: '02', title: 'Frameworks, laws & standards', count: `Reference · ${frameworkCatalog.length} deep records`, href: '/frameworks', tone: 'amber', copy: 'GDPR, India DPDP, HIPAA, the EU AI Act, DORA, NIS2, NIST, ISO, OWASP, MITRE, CIS and more, with scope, status, evidence and boundaries.' },
  { n: '03', title: 'Tools & platforms', count: `Practice · ${toolCatalog.length} profiles`, href: '/tools', tone: 'orange', copy: 'Nmap, Shodan, Masscan, sqlmap, Semgrep, Endpoint Detection and Response, Extended Detection and Response, Security Information and Event Management, firewalls and cloud security.' },
  { n: '04', title: 'Linux learning lab', count: 'Tutorial · Shell to hardening', href: '/linux', tone: 'green', copy: 'Filesystem, commands, users, services, logs, networking, permissions from 0 to 777 and a practical hardening model.' },
  { n: '05', title: 'Reports & evidence', count: `Reference · ${evidenceItems.length} sources`, href: '/reports', tone: 'rose', copy: 'Current reports, statistical snapshots, standards and research with data periods, authority and caveats.' },
  { n: '06', title: 'Case studies', count: `Apply · ${caseStudies.length} cases`, href: '/cases', tone: 'violet', copy: 'Documented incidents and fictional composites with timelines, causal chains, controls, evidence and difficult 10-question case labs.' },
  { n: '07', title: 'Organizations & standards bodies', count: `Reference · ${organizations.length} profiles`, href: '/organizations', tone: 'slate', copy: 'Know who regulates, publishes, standardizes, researches, certifies, builds and sells, and where each role ends.' },
  { n: '08', title: 'Attack & defense guide', count: 'Interactive · Attack, defense or connected view', href: '/red-blue', tone: 'cyan', copy: 'Study attack paths, defensive controls, telemetry, response decisions, tools and safe practice through an interactive adversary and defender lens.' },
  { n: '09', title: 'Emerging technology watch', count: 'Reference · Horizon scanning', href: '/learn/emerging-technology-and-horizon-scanning', tone: 'green', copy: 'Blockchain, quantum computing, robotics, spatial systems, edge computing and other technologies separated from the core artificial intelligence learning path.' },
];

export default function ResourcesPage() {
  return <main className="inner-page resources-page"><section className="page-hero resources-hero"><p className="eyebrow dark"><span /> Apply & reference collections</p><div><h1>Find the fact.<br /><em>See its context.</em></h1><p>Nine focused collections keep definitions, frameworks, tools, tutorials, evidence, institutions and real-world application easy to find without flattening them into one generic template.</p></div><aside><strong>{String(resources.length).padStart(2, '0')}</strong><span>resource collections</span><i>Learn · Apply · Reference</i></aside></section><section className="resource-cards">{resources.map((item) => <Link className={`resource-card resource-${item.tone}`} href={item.href} key={item.n}><small>{item.count}</small><h2>{item.title}</h2><p>{item.copy}</p><footer className="resource-card-footer"><span>{item.n}</span><b>Open collection →</b></footer></Link>)}</section></main>;
}
