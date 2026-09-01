export type SecurityPerspective = {
  slug: string;
  title: string;
  summary: string;
  boundary: string;
  red: {
    goal: string;
    entry: string[];
    preconditions: string[];
    discovery: string[];
    validation: string;
    path: Array<{ label: string; detail: string }>;
    evidence: string[];
  };
  blue: {
    prevent: string[];
    reduce: string[];
    detect: string[];
    investigate: string[];
    contain: string[];
    remediate: string[];
    verify: string[];
  };
  attack: Array<{ id: string; tactic: string; technique: string; note: string; url: string }>;
  tools: Array<{ category: string; examples: string; contribution: string }>;
};

export const securityPerspectives: SecurityPerspective[] = [
  {
    slug: 'sql-injection',
    title: 'SQL injection in a customer portal',
    summary: 'See how untrusted input becomes database instructions, then place prevention, detection and verification at the correct layers.',
    boundary: 'Use only in a deliberately vulnerable lab or an application covered by written authorization. Validation should prove the unsafe interpretation with the least harmful test and should never extract real customer data.',
    red: {
      goal: 'Change the meaning of a database query through application input so the application reads, changes or authorizes something its designer did not intend.',
      entry: ['Search and filter fields', 'URL and API parameters', 'Login and recovery forms', 'Headers or cookies later used in a query'],
      preconditions: ['Input is combined with query text instead of being bound as data', 'The database account can perform the targeted operation', 'The route is reachable and the unsafe code path executes', 'Validation or encoding does not preserve the data and instruction boundary'],
      discovery: ['Trace each input to a database sink during code review', 'Use an intercepting proxy in an authorized test environment', 'Compare controlled responses for input-handling anomalies', 'Confirm the database technology and query construction from evidence, not guesses'],
      validation: 'Use a reversible input that changes a harmless test response, then stop. Record the request, response, affected code path and database privilege. Do not pivot to unrelated records merely because the flaw permits it.',
      path: [
        { label: 'Input', detail: 'The application accepts data controlled by the requester.' },
        { label: 'Construction', detail: 'Code joins that data into a query string.' },
        { label: 'Interpretation', detail: 'The database parses part of the input as instructions.' },
        { label: 'Privilege', detail: 'The application database account permits an unintended action.' },
        { label: 'Impact', detail: 'Data access, alteration or authorization logic becomes possible.' },
      ],
      evidence: ['Repeatable response difference tied to one input change', 'Application or database error with matching timestamp', 'Source-to-sink code trace', 'Database audit event under the application identity'],
    },
    blue: {
      prevent: ['Use parameterized queries or safe object-relational mapping interfaces', 'Keep database identities narrowly privileged by service and function', 'Validate expected type, length and format at trust boundaries', 'Test query-building code with security-focused unit and integration tests'],
      reduce: ['Remove unused routes and database functions', 'Separate read and write identities where the design supports it', 'Keep administrative interfaces off public paths', 'Limit result size, execution time and dangerous database capabilities'],
      detect: ['Correlate unusual request patterns with application and database errors', 'Alert on unexpected data-definition or administrative actions by application identities', 'Use Web Application Firewall signals as supporting evidence, not proof of safety', 'Retain request identifiers across gateway, application and database logs'],
      investigate: ['Reconstruct the exact request and authenticated session', 'Identify the code path, query and database identity', 'Review nearby requests for enumeration or follow-on access', 'Determine which records and actions were actually reachable'],
      contain: ['Disable or constrain the affected route', 'Rotate exposed credentials when access cannot be excluded', 'Apply a narrow temporary gateway rule while engineering the fix', 'Preserve logs and affected build artifacts'],
      remediate: ['Replace string-built queries with bound parameters', 'Correct authorization independently of input handling', 'Reduce database privileges and remove unsafe functions', 'Fix variants across every route sharing the same data-access pattern'],
      verify: ['Retest the original proof in the same authorized environment', 'Add a regression test that fails on unsafe query construction', 'Confirm the database identity cannot exceed its intended role', 'Review telemetry to ensure attempted abuse is visible'],
    },
    attack: [
      { id: 'T1190', tactic: 'Initial Access', technique: 'Exploit Public-Facing Application', note: 'Applies when exploitation of an exposed application creates initial access.', url: 'https://attack.mitre.org/techniques/T1190/' },
      { id: 'T1213', tactic: 'Collection', technique: 'Data from Information Repositories', note: 'May apply when a compromised application is used to collect repository data.', url: 'https://attack.mitre.org/techniques/T1213/' },
    ],
    tools: [
      { category: 'Code analysis', examples: 'Semgrep, CodeQL, SonarQube', contribution: 'Find risky source-to-sink patterns and enforce reviewed rules in delivery pipelines.' },
      { category: 'Application testing', examples: 'Burp Suite, OWASP ZAP', contribution: 'Inspect and replay requests in an authorized test while preserving evidence.' },
      { category: 'Runtime protection', examples: 'Cloudflare WAF, AWS WAF, F5 Advanced WAF', contribution: 'Reduce selected request patterns and add telemetry while the application remains the primary fix point.' },
      { category: 'Database monitoring', examples: 'Native audit logs, Microsoft Defender for SQL, IBM Guardium', contribution: 'Record unusual queries, privilege use and database actions for investigation.' },
    ],
  },
  {
    slug: 'password-spraying',
    title: 'Password spraying against workforce identity',
    summary: 'Follow a low-and-slow credential attack across the identity edge, then design layered controls that still work when one password is correct.',
    boundary: 'Authorized validation should use dedicated test accounts, agreed attempt limits and monitored source infrastructure. Never test employee accounts without explicit written approval and a rollback plan.',
    red: {
      goal: 'Find an account that accepts a commonly reused password while avoiding the rapid per-account failures that simple lockout rules expect.',
      entry: ['Cloud sign-in page', 'Legacy mail or remote-access protocol', 'Federated application', 'Account recovery or help-desk process'],
      preconditions: ['A usable list of account identifiers exists', 'At least one account reuses a weak or exposed password', 'The authentication surface permits repeated distributed attempts', 'Multifactor or conditional access is absent, bypassable or not enforced on the route'],
      discovery: ['Map authorized authentication surfaces and legacy protocols', 'Review identity policy and smart-lockout behavior', 'Use only approved test identities to establish a baseline', 'Observe whether failures are logged with account, source, device and application context'],
      validation: 'Use the smallest agreed set of test identities and one controlled password. Stop at the first confirmed control failure, preserve sign-in evidence and avoid opening real mailboxes or data.',
      path: [
        { label: 'Identify', detail: 'Account names are learned from public, leaked or organizational patterns.' },
        { label: 'Attempt', detail: 'One candidate password is tried across several accounts.' },
        { label: 'Evade', detail: 'Attempts are spaced or distributed to avoid simple thresholds.' },
        { label: 'Authenticate', detail: 'A weak account accepts the password.' },
        { label: 'Abuse', detail: 'The session is used for discovery, persistence or further access.' },
      ],
      evidence: ['A successful test sign-in after the agreed spray pattern', 'Distributed failed sign-ins followed by success', 'Unexpected legacy-protocol or unfamiliar-application use', 'New session, token or device registration for the test identity'],
    },
    blue: {
      prevent: ['Require phishing-resistant multifactor authentication where risk justifies it', 'Block known compromised passwords and weak recovery paths', 'Disable legacy authentication that cannot enforce modern controls', 'Use smart lockout, throttling and risk-based conditional access'],
      reduce: ['Limit which users and devices can reach sensitive applications', 'Remove dormant and orphaned accounts quickly', 'Avoid predictable public identifiers where feasible', 'Separate administrator identities from routine communication'],
      detect: ['Correlate one password pattern across many accounts and sources', 'Detect success after distributed failures, not only single-account thresholds', 'Alert on unfamiliar device, geography, application or protocol combinations', 'Monitor new factor, token, forwarding rule and privilege changes after sign-in'],
      investigate: ['Review the complete identity timeline and session tokens', 'Identify every attempted account and successful route', 'Check mailbox, forwarding, OAuth grants and recovery changes', 'Inspect endpoint and cloud activity initiated by the identity'],
      contain: ['Revoke sessions and refresh tokens', 'Reset or replace affected authenticators through a verified process', 'Block the abused route and source patterns', 'Protect evidence before deleting attacker-created changes'],
      remediate: ['Enforce stronger authentication on every equivalent route', 'Repair recovery and help-desk verification gaps', 'Remove exposed credentials and stale identities', 'Tune detections using the incident pattern and test them'],
      verify: ['Repeat the approved pattern with test accounts', 'Confirm legacy routes reject or challenge the attempt', 'Validate the detection fires with useful context', 'Exercise session revocation and account recovery end to end'],
    },
    attack: [
      { id: 'T1110.003', tactic: 'Credential Access', technique: 'Password Spraying', note: 'The specific ATT&CK sub-technique for one or a small number of passwords tried across many accounts.', url: 'https://attack.mitre.org/techniques/T1110/003/' },
      { id: 'T1078', tactic: 'Initial Access and Persistence', technique: 'Valid Accounts', note: 'A successfully authenticated account may be used across several later tactics.', url: 'https://attack.mitre.org/techniques/T1078/' },
    ],
    tools: [
      { category: 'Identity protection', examples: 'Microsoft Entra ID Protection, Okta Identity Threat Protection', contribution: 'Evaluate sign-in risk, device and session context, then enforce access decisions.' },
      { category: 'SIEM', examples: 'Microsoft Sentinel, Splunk Enterprise Security, Google Security Operations', contribution: 'Correlate failures and successes across accounts, addresses, applications and time windows.' },
      { category: 'Identity detection and response', examples: 'Microsoft Defender for Identity, CrowdStrike Falcon Identity Protection', contribution: 'Detect identity misuse and risky directory behavior after authentication.' },
    ],
  },
  {
    slug: 'ransomware-chain',
    title: 'Ransomware intrusion and recovery decision',
    summary: 'Trace an intrusion from initial access to impact and identify the earliest reliable places defenders can break the chain.',
    boundary: 'The scenario teaches behavior and defensive validation. Malware execution belongs only in isolated training environments with approved samples, egress controls and expert supervision.',
    red: {
      goal: 'Gain sufficient access and control to disrupt operations, steal information or apply extortion pressure while delaying detection.',
      entry: ['Phishing or stolen session', 'Exploited public-facing service', 'Remote service with weak credentials', 'Compromised supplier or administrator tool'],
      preconditions: ['An initial access route succeeds', 'Privileges and segmentation allow movement', 'Defensive telemetry has blind spots or weak response', 'Backups or recovery dependencies can be reached, altered or are untested'],
      discovery: ['Map exposed services, identities and trust relationships in an authorized exercise', 'Identify high-impact service and recovery dependencies', 'Test whether endpoint and identity telemetry covers selected techniques', 'Validate only agreed objectives with non-destructive emulation'],
      validation: 'Use benign emulation markers and test files instead of destructive encryption. Prove whether the path reaches a protected objective, whether detection occurs and whether the team can contain it.',
      path: [
        { label: 'Initial access', detail: 'A user, service or supplier path opens a foothold.' },
        { label: 'Execution', detail: 'Code or a trusted tool performs an attacker-directed action.' },
        { label: 'Privilege', detail: 'Access expands through credentials, configuration or vulnerable components.' },
        { label: 'Movement', detail: 'Remote services and trust paths reach additional systems.' },
        { label: 'Collection', detail: 'Sensitive data and operational knowledge are staged.' },
        { label: 'Impact', detail: 'Services, data or recovery capability are disrupted.' },
      ],
      evidence: ['Unexpected process ancestry or script execution', 'Credential access followed by remote logons', 'High-volume internal discovery or archive creation', 'Backup-control changes, mass file operations or service stops'],
    },
    blue: {
      prevent: ['Patch reachable services and secure remote administration', 'Use separate privileged identities with phishing-resistant authentication', 'Segment important services and recovery infrastructure', 'Restrict script, remote-service and administrative tool use'],
      reduce: ['Maintain isolated, immutable or otherwise protected recovery copies', 'Remove direct paths from user networks to management planes', 'Limit service-account rights and interactive use', 'Know minimum viable operations before a crisis'],
      detect: ['Correlate initial access with new execution, identity and movement signals', 'Detect credential access, remote service creation and unusual administration', 'Monitor backup policy, retention and deletion changes', 'Alert on rapid archive, encryption-like file changes and security-control impairment'],
      investigate: ['Build one time-aligned identity, endpoint, network and cloud timeline', 'Determine earliest known access and every trust boundary crossed', 'Separate confirmed impact from possible exposure', 'Identify whether recovery systems and credentials remain trustworthy'],
      contain: ['Isolate affected segments and revoke compromised sessions', 'Protect backup and identity control planes', 'Block confirmed command paths while preserving evidence', 'Use an incident command structure with explicit decision authority'],
      remediate: ['Remove persistence and rebuild from trusted sources where required', 'Close the initial weakness and equivalent paths', 'Reset credentials in a dependency-aware order', 'Correct segmentation, monitoring and recovery weaknesses'],
      verify: ['Validate clean identity, builds and recovery media', 'Restore a representative service and reconcile data integrity', 'Re-run selected emulation stages against new controls', 'Record residual uncertainty and monitored exit criteria'],
    },
    attack: [
      { id: 'T1486', tactic: 'Impact', technique: 'Data Encrypted for Impact', note: 'Covers encryption intended to interrupt availability or create leverage.', url: 'https://attack.mitre.org/techniques/T1486/' },
      { id: 'T1021', tactic: 'Lateral Movement', technique: 'Remote Services', note: 'Covers several remote-service paths used to act on additional systems.', url: 'https://attack.mitre.org/techniques/T1021/' },
      { id: 'T1490', tactic: 'Impact', technique: 'Inhibit System Recovery', note: 'Covers behavior intended to prevent or impair recovery.', url: 'https://attack.mitre.org/techniques/T1490/' },
    ],
    tools: [
      { category: 'Endpoint detection and response', examples: 'Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne Singularity', contribution: 'Record process, file and identity-linked endpoint behavior and support scoped containment.' },
      { category: 'Network detection and response', examples: 'Vectra AI, ExtraHop Reveal(x), Corelight', contribution: 'Reveal movement and unusual protocol behavior beyond one host.' },
      { category: 'Recovery platforms', examples: 'Rubrik, Cohesity, Veeam', contribution: 'Protect, inventory, test and restore recovery copies. Product ownership does not replace recovery exercises.' },
    ],
  },
  {
    slug: 'cloud-permission-chain',
    title: 'Over-privileged cloud workload identity',
    summary: 'See how a small workload compromise becomes a control-plane problem when identity permissions and metadata paths are too broad.',
    boundary: 'Cloud validation must stay inside approved accounts, roles and resources. Use a sandbox tenancy and synthetic data for permission-path testing.',
    red: {
      goal: 'Use a compromised workload or exposed credential to obtain cloud permissions, discover valuable resources and access more than the workload requires.',
      entry: ['Server-side request forgery to an instance metadata service', 'Exposed access key in source or build output', 'Compromised continuous-delivery identity', 'Public workload with a vulnerable application'],
      preconditions: ['The workload can obtain a usable cloud token', 'The assigned role contains unnecessary actions or resources', 'Trust policies permit assumption from the compromised context', 'Control-plane and data-plane events are not rapidly detected'],
      discovery: ['Review trust policies and effective permissions', 'Map workload metadata and token paths', 'Use a cloud security graph in an authorized account', 'Test one synthetic resource to prove the permission chain'],
      validation: 'Request only the agreed temporary credentials, enumerate the permitted synthetic resources and perform one harmless read or tag action. Stop before copying real data or modifying production controls.',
      path: [
        { label: 'Workload', detail: 'An application or runtime becomes attacker-controlled.' },
        { label: 'Token', detail: 'The runtime exposes or can request a cloud identity token.' },
        { label: 'Permission', detail: 'The identity grants broader actions or resources than needed.' },
        { label: 'Discovery', detail: 'Control-plane calls reveal storage, secrets or other roles.' },
        { label: 'Expansion', detail: 'Trust or policy relationships create a path to higher impact.' },
      ],
      evidence: ['Token request or credential use outside expected workload behavior', 'Unusual list, describe or get-secret operations', 'Role assumption not seen in the service baseline', 'Synthetic resource access proving the effective permission'],
    },
    blue: {
      prevent: ['Use workload identities instead of long-lived embedded keys', 'Limit role actions, resources, conditions and trust relationships', 'Protect metadata services and require current hardened access modes', 'Scan source, artifacts and logs for secrets before release'],
      reduce: ['Separate accounts and projects by environment and consequence', 'Keep sensitive data and key-management permissions outside ordinary workload roles', 'Use service control and organization-level guardrails', 'Expire temporary credentials quickly and rotate persistent credentials'],
      detect: ['Baseline expected control-plane actions for each workload', 'Detect new geography, user agent, resource family or role chain', 'Alert on secret access, policy changes and unusual enumeration', 'Correlate runtime alerts with cloud audit events'],
      investigate: ['Identify the exact token, role session and originating workload', 'Trace every control-plane call and resource touched', 'Review policy history and trust changes', 'Check build, deployment and secret-management paths for the source'],
      contain: ['Disable or narrow the role and revoke active sessions where supported', 'Isolate the workload and block the abused route', 'Protect audit logs and control-plane evidence', 'Move critical operations to a known-good identity path'],
      remediate: ['Fix the application entry point and metadata access', 'Redesign permissions from observed necessary actions', 'Remove key material from source and artifacts', 'Correct equivalent roles, templates and organizational policies'],
      verify: ['Deploy the fixed workload in a sandbox', 'Prove the original token path is unavailable', 'Confirm required service behavior still works under least privilege', 'Test that unusual control-plane behavior produces an actionable alert'],
    },
    attack: [
      { id: 'T1552.005', tactic: 'Credential Access', technique: 'Cloud Instance Metadata API', note: 'Covers attempts to obtain credentials from cloud instance metadata services.', url: 'https://attack.mitre.org/techniques/T1552/005/' },
      { id: 'T1078.004', tactic: 'Initial Access and Persistence', technique: 'Cloud Accounts', note: 'Covers use of valid cloud accounts or service identities.', url: 'https://attack.mitre.org/techniques/T1078/004/' },
    ],
    tools: [
      { category: 'Cloud-native protection', examples: 'Microsoft Defender for Cloud, Amazon GuardDuty, Google Security Command Center', contribution: 'Use native control-plane context and provider telemetry to identify selected threats and posture problems.' },
      { category: 'CNAPP', examples: 'Wiz, Palo Alto Prisma Cloud, Orca Security', contribution: 'Connect assets, vulnerabilities, identities, data and paths across cloud environments.' },
      { category: 'Entitlement analysis', examples: 'Microsoft Entra Permissions Management alternatives, native IAM analyzers, Sonrai Security', contribution: 'Compare granted and observed permissions and reveal risky trust paths.' },
    ],
  },
];

export const securityPerspectiveByTopic: Record<string, string> = {
  'web-api-and-mobile-application-testing': 'sql-injection',
  'identity-threats-and-zero-trust-access': 'password-spraying',
  'authentication-and-authenticators': 'password-spraying',
  'incident-response-digital-forensics-and-recovery': 'ransomware-chain',
  'threat-actors-motives-and-attack-lifecycles': 'ransomware-chain',
  'cloud-container-and-infrastructure-as-code-testing': 'cloud-permission-chain',
  'cloud-workload-data-and-security-posture': 'cloud-permission-chain',
};
