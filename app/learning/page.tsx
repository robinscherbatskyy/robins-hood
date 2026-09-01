import type { Metadata } from 'next';
import LearningDashboard from '../../components/LearningDashboard';
import { topics } from '../../lib/topics';

export const metadata: Metadata = { title: 'My Learning | Robin’s Hood', description: 'Return to saved, completed and recently viewed Robin’s Hood guides.' };

export default function LearningPage() {
  const learningTopics = topics.map(({ slug, title, categoryLabel, summary, readTime }) => ({ slug, title, categoryLabel, summary, readTime }));
  return <main className="inner-page learning-page">
    <section className="page-hero learning-hero compact-collection-hero"><p className="eyebrow dark"><span /> Your learning trail</p><div><h1>Pick up where<br /><em>your curiosity paused.</em></h1><p>Saved, completed and recently viewed guides stay on this device. No account is required and no learning history leaves your browser.</p></div><aside><strong>3</strong><span>useful collections</span><i>Private · local</i></aside></section>
    <LearningDashboard topics={learningTopics} />
  </main>;
}
