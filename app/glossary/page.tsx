import type { Metadata } from 'next';
import Link from 'next/link';
import GlossaryClient from '../../components/GlossaryClient';
import { glossary } from '../../lib/ecosystem';
import { domainSlugForTerm, glossaryDomains } from '../../lib/glossary-domains';

export const metadata: Metadata = { title: 'A-Z Glossary: Robin’s Hood', description: 'Consolidated and domain-filtered explanations of important business, technology, security, risk and professional terms.' };

export default function GlossaryPage() {
  return <main className="inner-page glossary-page"><section className="page-hero glossary-hero"><p className="eyebrow dark"><span /> Full forms are only the beginning</p><div><h1>Understand the term,<br /><em>not just the acronym.</em></h1><p>Use one consolidated A-Z or open a dedicated domain glossary. Every entry keeps the full form, plain meaning, placement, example, boundary and related concepts together.</p></div><aside><strong>{glossary.length}</strong><span>connected definitions</span><i>{glossaryDomains.length} domain glossaries</i></aside></section><section className="glossary-domain-directory"><header><span>Choose a domain</span><h2>Learn the language around a complete field.</h2></header><div>{glossaryDomains.map((domain) => <Link className={`domain-${domain.color}`} href={`/glossary/${domain.slug}#glossary-index`} key={domain.slug}><span>{glossary.filter((term) => domainSlugForTerm(term) === domain.slug).length}</span><strong>{domain.label}</strong><p>{domain.description}</p><b>Open domain glossary →</b></Link>)}</div></section><GlossaryClient /></main>;
}
