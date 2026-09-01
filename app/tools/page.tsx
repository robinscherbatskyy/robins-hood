import type { Metadata } from 'next';
import ToolLibrary from '../../components/ToolLibrary';
import { toolCatalog } from '../../lib/tool-catalog';

export const metadata: Metadata = { title: "Technology Tools and Platforms: Robin's Hood", description: 'Understand where technology, delivery, data, artificial-intelligence and security tools sit, what they can do and where their limits begin.' };

export default function ToolsPage() {
  return <main className="inner-page tools-page">
    <section className="page-hero tools-hero"><p className="eyebrow dark"><span /> Capability before product name</p><div><h1>Place the tool<br /><em>inside the real system.</em></h1><p>Linux utilities, delivery platforms, cloud automation, observability, data systems, AI evaluation and security tools become easier to understand when you see where they run, what they observe or change and what they cannot prove.</p></div><aside><strong>{toolCatalog.length}</strong><span>tool profiles</span><i>Placement · Capability · Boundary</i></aside></section>
    <ToolLibrary />
  </main>;
}
