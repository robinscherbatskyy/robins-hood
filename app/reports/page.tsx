import type { Metadata } from 'next';
import ReportsClient from '../../components/ReportsClient';
import { dataSnapshots, evidenceItems } from '../../lib/resources';

export const metadata: Metadata = { title: "Reports & Evidence: Robin's Hood", description: 'Current reports, data snapshots, standards, briefings and source-aware research across the knowledge atlas.' };

export default function ReportsPage() {
  return <main className="inner-page reports-page">
    <section className="page-hero reports-hero"><p className="eyebrow dark"><span /> Evidence before confidence</p><div><h1>Reports, signals<br /><em>& source notes.</em></h1><p>A curated reference desk for current statistics, industry outlooks, standards, datasheets and primary research: with dates, data periods and limitations kept visible.</p></div><aside><strong>{evidenceItems.length}</strong><span>curated sources</span><i>Checked 30 Aug 2026</i></aside></section>
    <section className="snapshot-section"><header><span>Data snapshots</span><h2>Useful numbers need context.</h2><p>Every number keeps its population, data period and limitation nearby. Open the source before reusing it.</p></header><div className="snapshot-grid">{dataSnapshots.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={`${item.value}-${item.source}`}><small>{item.domain}</small><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.context}</p><span>{item.source} ↗</span></a>)}</div></section>
    <ReportsClient />
    <section className="reuse-note"><span>Publication rule</span><h2>Link to third-party research. Do not turn someone else’s report into an unattributed local copy.</h2><p>Robin’s Hood summarizes why a source matters and keeps its limitations visible. Copyrighted reports remain with their publishers unless redistribution is clearly permitted.</p></section>
  </main>;
}
