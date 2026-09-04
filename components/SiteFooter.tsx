import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return <footer className="site-footer full-footer">
    <div className="footer-brand">
      <Link className="footer-brand-link" href="/" aria-label="Robin’s Hood home">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/robins-hood-mark.png`} alt="" width={58} height={58} unoptimized />
        <strong>ROBIN’S HOOD</strong>
      </Link>
    </div>
    <nav className="footer-links" aria-label="Footer navigation">
      <div><span>Learn</span><Link href="/pillars">Consolidated pillar guides</Link><Link href="/learn">Supporting deep dives</Link><Link href="/learn/iso-iec-27001-2022-self-study-handbook">ISO/IEC 27001 handbook</Link><Link href="/paths">Learning paths</Link><Link href="/learning">My learning</Link><Link href="/pillars/people-professional-capability">People and professional capability</Link></div>
      <div><span>Apply</span><Link href="/industries">Industry domains</Link><Link href="/cases">Case studies</Link><Link href="/linux">Linux learning lab</Link></div>
      <div><span>Reference</span><Link href="/resources">Resource hub</Link><Link href="/red-blue">Attack and defense guide</Link><Link href="/reports">Reports and evidence</Link><Link href="/glossary#glossary-index">A to Z glossary</Link><Link href="/frameworks">Frameworks and laws</Link><Link href="/organizations">Organizations and standards</Link></div>
    </nav>
    <div className="footer-bottom">
      <p>Created by <a href="https://www.linkedin.com/in/vrushankchaitanya/" target="_blank" rel="noreferrer">Vrushank ↗</a></p>
      <p className="footer-discord"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.34A17 17 0 0 0 15.44 4l-.51 1.03a15.8 15.8 0 0 0-5.86 0L8.55 4A17 17 0 0 0 4.5 5.34C1.94 9.12 1.25 12.8 1.6 16.43a16.4 16.4 0 0 0 4.98 2.52c.4-.55.76-1.13 1.07-1.75-.59-.22-1.15-.49-1.68-.8l.41-.32c3.25 1.48 7.18 1.48 10.4 0l.42.32c-.54.31-1.1.58-1.69.8.31.62.67 1.2 1.08 1.75a16.4 16.4 0 0 0 4.98-2.52c.42-4.22-.72-7.87-2.07-11.09ZM8.52 14.2c-1 0-1.82-.91-1.82-2.02s.8-2.03 1.82-2.03 1.84.92 1.82 2.03c0 1.11-.8 2.02-1.82 2.02Zm6.96 0c-1 0-1.82-.91-1.82-2.02s.8-2.03 1.82-2.03 1.84.92 1.82 2.03c0 1.11-.8 2.02-1.82 2.02Z" /></svg><span>Discord · robinscherbatsky</span></p>
    </div>
  </footer>;
}
