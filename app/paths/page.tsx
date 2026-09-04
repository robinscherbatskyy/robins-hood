import type { Metadata } from 'next';
import Link from 'next/link';
import { learningPaths } from '../../lib/ecosystem';
import { estimateGuideReadTime, getGuide } from '../../lib/guides';
import { handbookModules, iso27001HandbookSlug } from '../../lib/iso27001-handbook';
import { topicBySlug } from '../../lib/topics';

export const metadata: Metadata = { title: 'Learning Paths: Robin’s Hood', description: 'Guided routes through the connected Robin’s Hood knowledge system.' };

const handbookMinutes = handbookModules.reduce((sum, module) => sum + module.minutes, 0);

function topicMinutes(slug: string) {
  const topic = topicBySlug.get(slug);
  if (!topic) return 0;
  return slug === iso27001HandbookSlug ? handbookMinutes : estimateGuideReadTime(getGuide(topic));
}

export default function PathsPage() {
  return <main className="inner-page paths-page">
    <section className="page-hero paths-hero"><p className="eyebrow dark"><span /> Choose a practical learning route</p><div><h1>A path through<br /><em>the big picture.</em></h1><p>Every lesson opens directly. Reading time is calculated from the content currently rendered in each complete guide.</p></div><aside><strong>{learningPaths.length}</strong><span>guided journeys</span><i>Local progress saved</i></aside></section>
    <section className="path-catalog">
      {learningPaths.map((path, pathIndex) => { const totalMinutes = path.topicSlugs.reduce((sum, slug) => sum + topicMinutes(slug), 0); return <article className={`path-card path-${path.color}`} id={`path-${path.slug}`} key={path.slug}>
        <header><span>{String(pathIndex + 1).padStart(2, '0')}</span><div><small>{path.audience}</small><h2>{path.title}</h2><p>{path.description}</p></div><i>About {totalMinutes} min</i></header>
        <ol>{path.topicSlugs.map((slug, index) => { const topic = topicBySlug.get(slug); return topic ? <li key={slug}><Link href={`/learn/${slug}`}><span>{index + 1}</span><div><strong>{topic.title}</strong><small>{topic.categoryLabel} · {topicMinutes(slug)} min</small></div><i>{index < path.topicSlugs.length - 1 ? '→' : '◆'}</i></Link></li> : null; })}</ol>
        <Link href={`/learn/${path.topicSlugs[0]}`}>Begin this path <span>→</span></Link>
      </article>; })}
    </section>
  </main>;
}
