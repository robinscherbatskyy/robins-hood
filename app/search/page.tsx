import type { Metadata } from 'next';
import { Suspense } from 'react';
import UniversalSearchPage from '../../components/UniversalSearchPage';

export const metadata: Metadata = { title: 'Search: Robin’s Hood', description: 'Search every guide, definition, tool, framework, case, report and organization.' };

export default function SearchPage() {
  return <Suspense fallback={<main className="inner-page search-page"><section className="universal-search"><p>Preparing the atlas search…</p></section></main>}><UniversalSearchPage /></Suspense>;
}
