import type { Metadata } from 'next';
import LibraryClient from '../../components/LibraryClient';
import { topics } from '../../lib/topics';

export const metadata: Metadata = {
  title: 'Supporting Deep-Dive Library | Robin’s Hood',
  description: 'Browse narrower supporting guides after reading the consolidated core pillars.',
};

export default function LearnPage() {
  return <main className="inner-page library-page">
    <section className="page-hero library-hero">
      <p className="eyebrow dark"><span /> Supporting subject library</p>
      <div><h1>Open a focused<br /><em>deep dive.</em></h1><p>The ten consolidated pillars are the primary reading experience. Use these {topics.length} narrower guides to revise a subject, inspect one technology, or practise a specific idea.</p></div>
      <aside><strong>{topics.length}</strong><span>supporting guides</span><i>Read a pillar first</i></aside>
    </section>
    <LibraryClient />
  </main>;
}
