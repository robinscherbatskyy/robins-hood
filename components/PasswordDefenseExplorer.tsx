import Link from 'next/link';

const methods = [
  ['Wordlist or dictionary attack', 'A text file containing candidate passwords is tried in a useful order. A good list reflects likely human choices, breached passwords or an authorized organization-specific test corpus. It is not the operating-system dictionary.'],
  ['Rule and mask attack', 'Rules transform candidates, such as adding a predictable year. Masks describe likely character positions. Both reduce wasted guesses by using a model of how people choose passwords.'],
  ['Brute force', 'Every candidate in a defined character space is attempted. The search grows exponentially with length, so longer unpredictable passwords change the economics dramatically.'],
  ['Rainbow-table attack', 'A precomputed lookup trades storage for time. Unique per-password salts force the attacker to compute guesses separately and make reusable tables impractical.'],
  ['Password spraying', 'One or a few common passwords are attempted across many accounts to avoid repeatedly failing one account. Per-account lockout alone does not address the distributed pattern.'],
  ['Credential stuffing', 'Username and password pairs stolen from another service are replayed. Unique passwords, passkeys, multi-factor authentication and breach-aware monitoring reduce the value of reuse.'],
] as const;

const tools = [
  { name: 'hashcat', mode: 'Offline', use: 'Audits approved password hashes and encrypted artifacts with wordlist, mask and rule strategies.', href: '/tools/hashcat' },
  { name: 'John the Ripper', mode: 'Offline', use: 'Audits many approved password and encrypted-artifact formats.', href: '/tools/john-the-ripper' },
  { name: 'Ophcrack', mode: 'Offline', use: 'Demonstrates Windows password-hash auditing through rainbow-table lookup.', href: '/tools/ophcrack' },
  { name: 'RainbowCrack', mode: 'Offline', use: 'Generates and searches time-memory trade-off tables for controlled research and audit data.', href: '/tools/rainbowcrack' },
  { name: 'L0phtCrack', mode: 'Offline', use: 'Audits Windows password material and password-policy resistance in an authorized environment.', href: '/tools/l0phtcrack' },
  { name: 'THC Hydra', mode: 'Online', use: 'Submits authentication attempts to supported live network services in a tightly scoped test.', href: '/tools/thc-hydra' },
  { name: 'Medusa', mode: 'Online', use: 'Performs modular, parallel login testing against approved network services.', href: '/tools/medusa' },
] as const;

export default function PasswordDefenseExplorer() {
  return <section className="article-section password-defense" id="password-defense">
    <header className="cyber-foundations-header">
      <div><span>Authentication defense model</span><h2>Offline cracking and online guessing are different risk problems.</h2></div>
      <p>Offline tools test a copied verifier without account lockout or live-service throttling. Online tools submit guesses to an authentication service and can lock accounts, trigger alerts or cause disruption. The authorization, safety controls and defensive response must reflect that difference.</p>
    </header>
    <div className="password-mode-compare">
      <article><span>Offline</span><h3>The attacker has password hashes or an encrypted artifact.</h3><p>Guessing speed is governed by password predictability, hashing algorithm, unique salt, work factor and available compute. The service cannot rate-limit an attacker working on a stolen copy.</p><strong>Defend with long unique passwords, per-password salts, a slow password-hashing scheme, protected verifier data, passkeys and rapid reset after compromise.</strong></article>
      <article><span>Online</span><h3>The attacker is talking to a live verifier.</h3><p>Every attempt crosses the authentication path. Rate limiting, risk signals, device context, multi-factor authentication and detection can change the outcome.</p><strong>Defend with throttling, blocklists, phishing-resistant authentication, generic errors, distributed-pattern detection and safe recovery.</strong></article>
    </div>
    <div className="password-method-grid">
      {methods.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
    </div>
    <section className="password-tool-table">
      <header><span>Tool placement</span><h3>Know which question each product answers.</h3></header>
      <div role="table" aria-label="Password auditing tools">
        {tools.map((tool) => <Link href={tool.href} role="row" key={tool.name}><strong role="cell">{tool.name}</strong><span role="cell" data-mode={tool.mode}>{tool.mode}</span><p role="cell">{tool.use}</p><i aria-hidden="true">→</i></Link>)}
      </div>
    </section>
    <aside className="practice-boundary"><strong>Safe practitioner boundary</strong><p>Use synthetic accounts, approved test hashes or written authorization. Define evidence handling, attempt limits, lockout monitoring, service owners, stop conditions and cleanup before testing. Recovered credentials are secrets, not screenshots for a report.</p></aside>
  </section>;
}
