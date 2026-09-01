import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlossaryClient from '../../../components/GlossaryClient';
import { glossary } from '../../../lib/ecosystem';
import { domainSlugForTerm, glossaryDomainBySlug, glossaryDomains } from '../../../lib/glossary-domains';

type Props = { params: Promise<{ domain: string }> };

export function generateStaticParams() { return glossaryDomains.map((domain) => ({ domain: domain.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain: slug } = await params;
  const domain = glossaryDomainBySlug(slug);
  return domain ? { title: `${domain.label} Glossary: Robin's Hood`, description: domain.description } : {};
}

export default async function DomainGlossaryPage({ params }: Props) {
  const { domain: slug } = await params;
  const domain = glossaryDomainBySlug(slug);
  if (!domain) notFound();
  const count = glossary.filter((term) => domainSlugForTerm(term) === slug).length;
  return <main className="inner-page glossary-page domain-glossary-page">
    <section className="page-hero glossary-hero"><p className="eyebrow dark"><span /> Domain glossary</p><div><h1>{domain.label}<br /><em>in connected language.</em></h1><p>{domain.description} Each definition explains meaning, placement, a practical example and the boundary people commonly miss.</p></div><aside><strong>{count}</strong><span>domain definitions</span><i><Link href="/glossary#glossary-index">Open consolidated A-Z ↗</Link></i></aside></section>
    <GlossaryClient initialDomain={slug} />
  </main>;
}
