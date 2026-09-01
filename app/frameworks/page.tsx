import type { Metadata } from 'next';
import FrameworkLibrary from '../../components/FrameworkLibrary';
import { frameworkCatalog } from '../../lib/frameworks';

export const metadata: Metadata = {
  title: "Frameworks, Standards and Laws: Robin's Hood",
  description: 'A source-aware guide to major laws, standards, control catalogs, assurance criteria and operating frameworks.',
};

export default function FrameworksPage() {
  return <main className="inner-page frameworks-page">
    <section className="page-hero frameworks-hero">
      <p className="eyebrow dark"><span /> Authority, scope, evidence</p>
      <div><h1>Know what the name<br /><em>actually commits you to.</em></h1><p>Laws, standards, frameworks, control catalogs and assurance reports do different jobs. This library separates them, tracks current editions and shows the evidence each one produces.</p></div>
      <aside><strong>{frameworkCatalog.length}</strong><span>deep references</span><i>Checked 30 Aug 2026</i></aside>
    </section>
    <section className="framework-orientation">
      <article><span>Law or regulation</span><strong>Binding when its scope applies.</strong><p>Start with jurisdiction, role, subject matter and commencement. A control certificate does not replace legal analysis.</p></article>
      <article><span>Standard or framework</span><strong>Structures how work is performed.</strong><p>Check whether it contains requirements, guidance, outcomes, controls, testing methods or a management system.</p></article>
      <article><span>Assurance</span><strong>Supports a scoped claim with evidence.</strong><p>Always inspect the system boundary, criteria, assessor, time period, exceptions and complementary customer responsibilities.</p></article>
    </section>
    <FrameworkLibrary />
  </main>;
}
