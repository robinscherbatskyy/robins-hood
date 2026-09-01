import type { Metadata } from 'next';
import RedBlueMatrix from '../../components/RedBlueMatrix';

export const metadata: Metadata = {
  title: 'Attack & Defense Guide | Robin’s Hood',
  description: 'An interactive attacker and defender learning matrix covering major cyberattack families, validation methods, controls, telemetry, response technology and software examples.',
  openGraph: { title: 'Attack & Defense Guide | Robin’s Hood', description: 'See attack and defense as one connected system.', images: [] },
  twitter: { card: 'summary', title: 'Attack & Defense Guide | Robin’s Hood', description: 'See attack and defense as one connected system.', images: [] },
};

export default function RedBluePage() {
  return <main className="red-blue-page"><RedBlueMatrix /></main>;
}
