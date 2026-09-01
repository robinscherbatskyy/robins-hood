import type { GlossaryTerm } from '../lib/ecosystem';
import { domainSlugForTerm, glossaryTermAnchor } from '../lib/glossary-domains';

export default function GlossaryTermLink({ term, compact = false }: { term: GlossaryTerm; compact?: boolean }) {
  return <a className={`glossary-term-link ${compact ? 'compact' : ''}`} href={`/glossary/${domainSlugForTerm(term)}?q=${encodeURIComponent(term.term)}#${glossaryTermAnchor(term.term)}`}>
    <span>{term.term}</span>
    {term.expansion && !compact && <small>{term.expansion}</small>}
    <i role="tooltip"><b>{term.expansion ? `${term.term}: ${term.expansion}` : term.term}</b>{term.meaning}{term.where ? <small>{term.where}</small> : null}<em>Open domain glossary →</em></i>
  </a>;
}
