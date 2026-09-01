'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProgressActions({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDone((window.localStorage.getItem(`robins-hood-complete:${slug}`) ?? window.localStorage.getItem(`nexus-complete:${slug}`)) === '1');
      setSaved((window.localStorage.getItem(`robins-hood-saved:${slug}`) ?? window.localStorage.getItem(`nexus-saved:${slug}`)) === '1');
      document.documentElement.removeAttribute('data-depth');
      try {
        const current = JSON.parse(window.localStorage.getItem('robins-hood-recent') ?? '[]') as string[];
        const next = [slug, ...current.filter((item) => item !== slug)].slice(0, 18);
        window.localStorage.setItem('robins-hood-recent', JSON.stringify(next));
      } catch { window.localStorage.setItem('robins-hood-recent', JSON.stringify([slug])); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [slug]);

  return (
    <div className="progress-actions">
      <div className="progress-buttons">
        <Link href="/learning">My learning</Link>
        <button className={saved ? 'active' : ''} onClick={() => { const next = !saved; setSaved(next); window.localStorage.setItem(`robins-hood-saved:${slug}`, next ? '1' : '0'); }} type="button">{saved ? '◆ Saved' : '◇ Save'}</button>
        <button className={done ? 'complete' : ''} onClick={() => { const next = !done; setDone(next); window.localStorage.setItem(`robins-hood-complete:${slug}`, next ? '1' : '0'); }} type="button">{done ? '✓ Complete' : 'Mark complete'}</button>
      </div>
    </div>
  );
}
