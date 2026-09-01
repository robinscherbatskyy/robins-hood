const expansions: Record<string, string[]> = {
  rag: ['retrieval augmented generation', 'retrieval-augmented generation'],
  mitm: ['man in the middle', 'man-in-the-middle', 'adversary in the middle'],
  aitm: ['adversary in the middle', 'adversary-in-the-middle'],
  edr: ['endpoint detection and response'],
  ndr: ['network detection and response'],
  xdr: ['extended detection and response'],
  siem: ['security information and event management'],
  soar: ['security orchestration automation and response'],
  iam: ['identity and access management'],
  rbac: ['role based access control', 'role-based access control'],
  abac: ['attribute based access control', 'attribute-based access control'],
  osi: ['open systems interconnection'],
  sdlc: ['software development life cycle', 'software development lifecycle'],
  vapt: ['vulnerability assessment and penetration testing'],
  grc: ['governance risk and compliance'],
  bcp: ['business continuity plan', 'business continuity planning'],
  dr: ['disaster recovery'],
  rto: ['recovery time objective'],
  rpo: ['recovery point objective'],
  toctou: ['time of check to time of use'],
  idor: ['insecure direct object reference', 'broken object level authorization'],
  fde: ['full disk encryption', 'full-disk encryption'],
  hydra: ['thc hydra'],
  lc7: ['l0phtcrack'],
};

export function normalizeSearch(value: string) {
  return value.normalize('NFKD').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9+]+/g, ' ').trim().replace(/\s+/g, ' ');
}

export function searchVariants(query: string) {
  const normalized = normalizeSearch(query);
  const compact = normalized.replace(/\s+/g, '');
  return [...new Set([normalized, ...(expansions[normalized] ?? []), ...(expansions[compact] ?? [])].map(normalizeSearch).filter(Boolean))];
}

export function matchesSearch(query: string, ...fields: Array<string | undefined>) {
  const searchable = normalizeSearch(fields.filter(Boolean).join(' '));
  return searchVariants(query).some((variant) => searchable.includes(variant) || variant.split(' ').every((token) => searchable.includes(token)));
}

export function searchScore(query: string, title: string, detail = '', body = '') {
  const titleText = normalizeSearch(title);
  const detailText = normalizeSearch(detail);
  const bodyText = normalizeSearch(body);
  const variants = searchVariants(query);
  let best = 100;
  for (const variant of variants) {
    const tokens = variant.split(' ').filter(Boolean);
    if (titleText === variant) best = Math.min(best, 0);
    else if (detailText === variant) best = Math.min(best, 1);
    else if (titleText.startsWith(variant)) best = Math.min(best, 2);
    else if (titleText.includes(variant)) best = Math.min(best, 3);
    else if (tokens.length > 1 && tokens.every((token) => titleText.includes(token))) best = Math.min(best, 4);
    else if (detailText.includes(variant)) best = Math.min(best, 5);
    else if (bodyText.includes(variant)) best = Math.min(best, 6);
    else if (tokens.every((token) => `${titleText} ${detailText} ${bodyText}`.includes(token))) best = Math.min(best, 7);
  }
  return best;
}
