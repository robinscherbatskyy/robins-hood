import Link from 'next/link';

const weaknessFamilies = [
  {
    number: '01', title: 'Memory safety and buffer overflows',
    definition: 'A buffer is a bounded region of memory. An overflow occurs when a program writes beyond that boundary and corrupts adjacent memory. Depending on location and protections, the result may be a crash, incorrect data, information disclosure or altered control flow.',
    example: 'An image parser trusts width and height values, calculates the wrong allocation size, then copies more pixel data than the allocated buffer can hold.',
    impact: 'A public file-upload service can become an outage, a data-exposure path or a route to running code under the service identity.',
    prevent: 'Prefer memory-safe languages for new components. In memory-unsafe code, use bounded APIs, checked arithmetic, safe abstractions, compiler and runtime protections, and least privilege.',
    verify: 'Add boundary tests, sanitizers, fuzzing, static analysis and crash triage. Test zero, maximum, malformed and integer-overflow dimensions.',
  },
  {
    number: '02', title: 'Untrusted input and injection',
    definition: 'External input is data, not authority. Validate its syntax, type, length, range and business meaning, then use an interface that keeps data separate from commands, queries, paths or markup.',
    example: 'A report filter is concatenated into a database query. A crafted value changes the query rather than remaining a search value.',
    impact: 'Injection can expose or alter records, bypass decisions, execute commands or interrupt a service.',
    prevent: 'Use parameterized queries, safe APIs, allowlists for constrained values, canonicalization where required, contextual output encoding and server-side business validation.',
    verify: 'Trace input from source to sensitive sink. Test unexpected type, length, encoding, structure, duplicate fields and authorization context, not only obvious punctuation.',
  },
  {
    number: '03', title: 'Race conditions and TOCTOU',
    definition: 'A race condition appears when correctness depends on operations happening in a particular order or at a particular time. A time-of-check to time-of-use flaw occurs when a checked object can change before it is used.',
    example: 'A payment service checks the available balance in one operation and deducts it later. Two requests pass the check before either deduction commits.',
    impact: 'Concurrency bugs can create duplicate payments, inventory errors, privilege changes, corruption and failures that are difficult to reproduce.',
    prevent: 'Use atomic operations, transactions, locks with understood scope, idempotency keys, immutable handles and database constraints. Design for retries and reordering.',
    verify: 'Run concurrent and repeated requests, inject delay at boundaries, test retries and failover, and examine whether the invariant still holds.',
  },
  {
    number: '04', title: 'Broken access control',
    definition: 'Authentication identifies a requester. Authorization must still decide whether that requester may perform this action on this specific object in the current context. Hiding a button is not an authorization control.',
    example: 'A user changes an invoice identifier in an Application Programming Interface request and receives another customer’s invoice because the server checks only that the user is signed in.',
    impact: 'Broken object, function or tenant boundaries can cause fraud, privacy breaches, unsafe administration and regulatory exposure.',
    prevent: 'Deny by default, enforce authorization at the trusted service boundary, scope every data query, minimize privilege and centralize reusable policy where practical.',
    verify: 'Build a subject-action-object-context matrix. Test horizontal, vertical, tenant and workflow transitions with negative cases and direct requests.',
  },
  {
    number: '05', title: 'Weak security practices and custom cryptography',
    definition: 'Security mechanisms fail when teams invent algorithms, use obsolete primitives, expose secrets, disable validation or configure trusted libraries without understanding their guarantees.',
    example: 'A team “encrypts” account data with a reversible home-grown transform and stores the key in the same repository.',
    impact: 'Controls can look present while providing no meaningful confidentiality, integrity or authenticity, leaving large-scale remediation and disclosure costs.',
    prevent: 'Use maintained, reviewed libraries and protocols, secure defaults, approved key management, dependency governance and documented threat assumptions. Do not design custom cryptography.',
    verify: 'Review algorithm, mode, key lifecycle, validation behavior, failure handling and library version against current authoritative guidance.',
  },
  {
    number: '06', title: 'The physical-access boundary',
    definition: 'Operating-system permissions mediate access while the operating system and hardware remain trusted. Physical possession can let an attacker boot another environment, remove storage, attach hardware or alter firmware.',
    example: 'A stolen laptop has strong file permissions but no full-disk encryption. The drive is read from another system without authenticating to the original operating system.',
    impact: 'Device loss can become credential theft, data exposure, tampering or a trusted route back into the organization.',
    prevent: 'Use full-disk encryption, secure boot, hardware-backed keys, port and boot controls, device inventory, remote response and proportionate physical protection.',
    verify: 'Test the powered-off loss scenario, recovery-key governance, boot protections, disposal process and the evidence generated when a device disappears.',
  },
] as const;

export default function SoftwareWeaknessExplorer() {
  return <section className="article-section weakness-atlas" id="weakness-atlas">
    <header className="cyber-foundations-header">
      <div><span>Secure-coding field guide</span><h2>Recognize the failure mechanism, then break the path safely.</h2></div>
      <p>A scanner label is not the lesson. For each weakness, understand the unsafe assumption, the concrete failure, the business consequence, the design response and the evidence that proves the response works.</p>
    </header>
    <div className="weakness-map">
      {weaknessFamilies.map((item) => <article key={item.number} id={`weakness-${item.number}`}>
        <header><span>{item.number}</span><h3>{item.title}</h3></header>
        <dl>
          <div><dt>What it is</dt><dd>{item.definition}</dd></div>
          <div className="analogy-panel"><dt>Concrete example</dt><dd>{item.example}</dd></div>
          <div><dt>Business consequence</dt><dd>{item.impact}</dd></div>
          <div><dt>Prevent it</dt><dd>{item.prevent}</dd></div>
          <div><dt>Verify it</dt><dd>{item.verify}</dd></div>
        </dl>
      </article>)}
    </div>
    <nav className="subject-related-links" aria-label="Related secure software guides">
      <Link href="/learn/secure-sdlc-devsecops-and-software-supply-chain">Secure SDLC and DevSecOps <span>→</span></Link>
      <Link href="/learn/web-api-and-mobile-application-testing">Application security testing <span>→</span></Link>
      <Link href="/tools">Static, dynamic and dependency tools <span>→</span></Link>
    </nav>
  </section>;
}
