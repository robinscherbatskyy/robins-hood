import { caseStudies, type CaseStudy } from './resources';

export type EvidenceStatus = 'confirmed' | 'assessed' | 'teaching inference';
export type CaseDetail = {
  slug: string;
  thesis: string;
  occurred: string;
  domains: string[];
  factualBoundary: string;
  timeline: Array<{ date: string; event: string; status: EvidenceStatus }>;
  causalChain: Array<{ stage: string; explanation: string; confidence: EvidenceStatus }>;
  controls: Array<{ layer: string; control: string; expectedEvidence: string }>;
  evidenceToInspect: string[];
  sources: Array<{ label: string; publisher: string; url: string; caveat?: string }>;
  quiz: Array<{ question: string; answerGuidance: string; rubric: string[] }>;
};

type CaseOverride = Omit<Partial<CaseDetail>, 'slug' | 'quiz'>;

const caseOverrides: Record<string, CaseOverride> = {
  'crowdstrike-channel-file-291': {
    thesis: 'A privileged defensive sensor became a worldwide availability dependency when rapid content delivery bypassed sufficient end-to-end release protection.',
    factualBoundary: 'CrowdStrike’s root-cause material is the provider’s primary technical account. Microsoft’s device estimate provides useful ecosystem context. Treat customer-specific outage and recovery claims separately unless their own evidence supports them.',
    timeline: [
      { date: 'Before 19 July 2024', event: 'A new Template Type used for named-pipe attack detection was developed, tested and deployed through the Rapid Response Content path.', status: 'confirmed' },
      { date: '19 July, 04:09 UTC', event: 'A Rapid Response Content update for Windows systems was released.', status: 'confirmed' },
      { date: '19 July, 04:09 to 05:27 UTC', event: 'Affected Windows hosts with the relevant Falcon sensor version could crash because the content supplied more input fields than the Content Interpreter expected.', status: 'confirmed' },
      { date: '19 July, 05:27 UTC', event: 'CrowdStrike reverted the problematic content.', status: 'confirmed' },
      { date: '19 July onward', event: 'Customers, cloud providers and technology partners coordinated manual and automated recovery for systems unable to receive the reverted content normally.', status: 'confirmed' },
      { date: 'Post-incident', event: 'CrowdStrike described added content validation, staged deployment, monitoring and customer-control improvements.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'High-privilege dependency', explanation: 'The Falcon sensor operated deeply on a very large Windows estate.', confidence: 'confirmed' },
      { stage: 'Separate rapid path', explanation: 'Rapid Response Content followed a different release path from sensor software.', confidence: 'confirmed' },
      { stage: 'Interface mismatch', explanation: 'The supplied content contained 21 input fields while the interpreter expected 20.', confidence: 'confirmed' },
      { stage: 'Validation escape', explanation: 'Existing checks did not prevent the incompatible content from reaching production.', confidence: 'confirmed' },
      { stage: 'Immediate common failure', explanation: 'Affected hosts crashed before many could receive the reverted content.', confidence: 'confirmed' },
      { stage: 'Recovery friction', explanation: 'Encrypted, remote or physically distributed devices required coordinated access and recovery.', confidence: 'assessed' },
    ],
    controls: [
      { layer: 'Interface contract', control: 'Validate content schemas against the exact production interpreter contract.', expectedEvidence: 'Machine-checked schema, compatibility test and rejected invalid sample.' },
      { layer: 'Release rings', control: 'Progress through internal, canary, representative and broad deployment stages.', expectedEvidence: 'Ring definition, health criteria, dwell time, promotion approval and stop event.' },
      { layer: 'Blast-radius limit', control: 'Allow customers to control timing and groups for non-emergency content where feasible.', expectedEvidence: 'Policy configuration, emergency override and rollout telemetry.' },
      { layer: 'Independent health signal', control: 'Detect crash, boot and availability anomalies outside the updated component.', expectedEvidence: 'External health dashboard, alert threshold and automated halt.' },
      { layer: 'Offline recovery', control: 'Pre-stage tested recovery for encrypted, remote and inaccessible endpoints.', expectedEvidence: 'Recovery key escrow, technician procedure, exercise result and device reconciliation.' },
    ],
    evidenceToInspect: ['Template and interpreter schema', 'Unit, fuzz and compatibility tests', 'Content Validator behavior', 'Release-ring telemetry', 'Crash and boot signals', 'Reversion decision timeline', 'Endpoint inventory by version', 'Recovery-key availability', 'Customer communication timeline', 'Post-incident action validation'],
    sources: [
      { label: 'Channel File 291 Root Cause Analysis', publisher: 'CrowdStrike', url: 'https://www.crowdstrike.com/en-us/blog/channel-file-291-rca-available/', caveat: 'Provider-authored root-cause account.' },
      { label: 'Helping customers through the CrowdStrike outage', publisher: 'Microsoft', url: 'https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/' },
    ],
  },
  'tsb-it-migration': {
    thesis: 'Successful data transfer did not create a safe banking service because end-to-end capacity, testing, supplier governance and recovery were not proven together.',
    factualBoundary: 'The United Kingdom Financial Conduct Authority and Prudential Regulation Authority enforcement material supports the governance and operational-resilience findings. Distinguish regulatory conclusions from any unsupported claim about one individual technical root cause.',
    timeline: [
      { date: '2015 to 2018', event: 'TSB and its technology partners planned an ambitious migration from the former Lloyds platform to a new Proteo4UK platform.', status: 'confirmed' },
      { date: '20 April 2018', event: 'Customer and corporate data was migrated during the planned cutover weekend.', status: 'confirmed' },
      { date: '22 April onward', event: 'Customers experienced serious and prolonged disruption across online, mobile, telephone and branch services.', status: 'confirmed' },
      { date: '2018 recovery period', event: 'The bank used technical remediation, customer support and compensation while service problems continued.', status: 'confirmed' },
      { date: '2019', event: 'An independent review by Slaughter and May examined the migration and disruption.', status: 'confirmed' },
      { date: '20 December 2022', event: 'United Kingdom regulators announced a combined penalty of £48.65 million for operational-risk and governance failings.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Ambitious change', explanation: 'A highly complex core-banking migration had a broad customer and operating footprint.', confidence: 'confirmed' },
      { stage: 'Supplier dependence', explanation: 'Critical design, delivery and operation relied on group and external technology arrangements.', confidence: 'confirmed' },
      { stage: 'Assurance weakness', explanation: 'Testing and readiness did not establish that the complete service could support expected demand and scenarios.', confidence: 'confirmed' },
      { stage: 'Cutover approval', explanation: 'Governance did not respond adequately to unresolved risk before migration.', confidence: 'confirmed' },
      { stage: 'Service instability', explanation: 'Digital and operational channels failed under live conditions despite data migration.', confidence: 'confirmed' },
      { stage: 'Customer harm', explanation: 'Customers lost reliable access to important banking services and support.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Service map', control: 'Map customer journeys to technology, supplier, data, channel and manual dependencies.', expectedEvidence: 'Critical-service map with owners, failure modes and impact tolerances.' },
      { layer: 'Readiness gate', control: 'Require independent end-to-end evidence for capacity, performance, data, security and operations.', expectedEvidence: 'Production-like test results, open-defect decision and accountable sign-off.' },
      { layer: 'Cutover design', control: 'Define measurable pause, rollback and safe-continuation triggers.', expectedEvidence: 'Runbook, authority matrix, trigger telemetry and exercised rollback.' },
      { layer: 'Supplier governance', control: 'Retain informed customer accountability across outsourced design and operation.', expectedEvidence: 'Supplier assurance, challenge, service-level evidence and escalation record.' },
      { layer: 'Customer protection', control: 'Prepare alternate service, transparent communication and compensation decisions.', expectedEvidence: 'Continuity process, communication cadence, complaint analysis and restitution record.' },
    ],
    evidenceToInspect: ['Target architecture', 'Customer-journey dependency map', 'Migration rehearsal results', 'Performance and capacity tests', 'Open-defect and risk acceptance', 'Cutover and rollback plan', 'Supplier accountability records', 'Executive and board challenge', 'Live incident timeline', 'Customer impact and compensation analysis'],
    sources: [
      { label: 'TSB fined £48.65m for operational resilience failings', publisher: 'Financial Conduct Authority', url: 'https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings' },
      { label: 'TSB operational risk management enforcement', publisher: 'Prudential Regulation Authority', url: 'https://www.bankofengland.co.uk/news/2022/december/pra-fines-tsb-bank-plc-for-operational-risk-management-and-governance-failures' },
    ],
  },
  'knight-capital-deployment': {
    thesis: 'A deployment inconsistency activated obsolete code while missing automated exposure limits allowed a software defect to become a market and solvency event.',
    factualBoundary: 'The United States Securities and Exchange Commission order is the authoritative enforcement account used here. The teaching analysis separates the deployment error, dormant-code condition and missing independent limit controls.',
    timeline: [
      { date: 'Before August 2012', event: 'Knight reused a flag previously associated with dormant Power Peg functionality while preparing new Retail Liquidity Program code.', status: 'confirmed' },
      { date: '27 July to 31 July', event: 'A technician manually deployed the new code to seven of eight servers and no second technician reviewed the result.', status: 'confirmed' },
      { date: '1 August, market open', event: 'Orders reaching the eighth server activated obsolete code and began sending millions of unintended child orders.', status: 'confirmed' },
      { date: 'First minutes', event: 'Internal monitoring produced messages, but they were not designed or handled as an effective automated stop.', status: 'confirmed' },
      { date: 'About 45 minutes', event: 'Knight disabled the affected system after accumulating a reported pre-tax loss of about $440 million.', status: 'confirmed' },
      { date: '16 October 2013', event: 'The Securities and Exchange Commission announced a $12 million penalty and remedial undertakings.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Dormant hazard', explanation: 'Obsolete production code remained callable.', confidence: 'confirmed' },
      { stage: 'Identifier reuse', explanation: 'A reused control flag connected new activity to the dormant behavior.', confidence: 'confirmed' },
      { stage: 'Manual inconsistency', explanation: 'One server did not receive the new deployment.', confidence: 'confirmed' },
      { stage: 'No independent verification', explanation: 'Deployment completeness was not automatically or independently confirmed.', confidence: 'confirmed' },
      { stage: 'Weak runtime guardrails', explanation: 'Controls did not stop order rate, position or loss as the abnormal behavior grew.', confidence: 'confirmed' },
      { stage: 'Financial consequence', explanation: 'Erroneous market orders created a loss threatening the firm.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Code lifecycle', control: 'Remove dead production code and prohibit unsafe identifier reuse.', expectedEvidence: 'Code deletion, reference search, review and regression result.' },
      { layer: 'Deployment', control: 'Use immutable, automated deployment with desired-state verification on every node.', expectedEvidence: 'Artifact hash, node inventory, successful state report and blocked partial release.' },
      { layer: 'Four-eyes gate', control: 'Require independent review for consequential production change.', expectedEvidence: 'Reviewer approval tied to exact artifact, scope and plan.' },
      { layer: 'Runtime risk', control: 'Enforce independent order, position, rate and loss limits outside the strategy logic.', expectedEvidence: 'Limit configuration, test, trigger event and authorized reset.' },
      { layer: 'Incident stop', control: 'Provide a practiced, accountable kill mechanism and escalation path.', expectedEvidence: 'Exercise result, decision authority and time-to-stop measure.' },
    ],
    evidenceToInspect: ['Source and dead-code inventory', 'Flag and identifier history', 'Artifact hashes by server', 'Deployment script and output', 'Peer-review evidence', 'Pre-production scenario tests', 'Order-rate and position limits', 'Alert handling record', 'Kill-switch exercise', 'Market and loss reconciliation'],
    sources: [{ label: 'SEC charges Knight Capital with violations of market access rule', publisher: 'United States Securities and Exchange Commission', url: 'https://www.sec.gov/newsroom/press-releases/2013-222' }],
  },
  'solarwinds-supply-chain': {
    thesis: 'A trusted, signed update carried attacker-controlled behavior because trust in software origin was not matched by assurance over the build environment and runtime behavior.',
    factualBoundary: 'Public evidence supports compromise of the Orion software build process and distribution of affected signed updates. Victim-specific access and impact varied. A valid signature established origin in the compromised process, not safety of the resulting behavior.',
    timeline: [
      { date: '2019 to early 2020', event: 'Attackers established access associated with the Orion build environment and prepared the supply-chain compromise.', status: 'assessed' },
      { date: 'March to June 2020', event: 'SolarWinds distributed affected Orion platform updates to customers.', status: 'confirmed' },
      { date: 'Customer environments', event: 'The implanted behavior could establish command-and-control and support selective follow-on activity.', status: 'confirmed' },
      { date: 'December 2020', event: 'The campaign became public after FireEye disclosed a sophisticated intrusion and investigators connected the activity to Orion.', status: 'confirmed' },
      { date: '13 December onward', event: 'SolarWinds notified customers and the Cybersecurity and Infrastructure Security Agency issued emergency direction and guidance.', status: 'confirmed' },
      { date: 'Long-tail response', event: 'Organizations removed affected components, hunted for follow-on access, rotated trust material and reassessed suppliers.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Build access', explanation: 'The attacker reached a highly trusted software-production path.', confidence: 'confirmed' },
      { stage: 'Build manipulation', explanation: 'Malicious logic was introduced through the build process rather than the ordinary source repository alone.', confidence: 'confirmed' },
      { stage: 'Trusted distribution', explanation: 'Affected software was signed and delivered through the vendor’s update channel.', confidence: 'confirmed' },
      { stage: 'Customer privilege', explanation: 'Orion commonly had broad network visibility and privileged integration.', confidence: 'assessed' },
      { stage: 'Selective follow-on access', explanation: 'The actor selected a smaller set of organizations for deeper activity.', confidence: 'confirmed' },
      { stage: 'Detection challenge', explanation: 'Apparently trusted components and identity use complicated detection and attribution.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Build identity', control: 'Use isolated, short-lived, strongly authenticated build identities and dual control.', expectedEvidence: 'Build identity inventory, token lifetime, access log and approval.' },
      { layer: 'Build integrity', control: 'Generate verifiable provenance from reviewed source to reproducible artifact.', expectedEvidence: 'Source revision, builder identity, dependency record, artifact hash and signed attestation.' },
      { layer: 'Environment isolation', control: 'Separate source, build, signing and release privileges and monitor each trust boundary.', expectedEvidence: 'Architecture, policy, denied-path test and independent telemetry.' },
      { layer: 'Customer containment', control: 'Run vendor software with only required network, identity and system privileges.', expectedEvidence: 'Service-account scope, segmentation rule and access review.' },
      { layer: 'Behavioral detection', control: 'Monitor trusted software for unexpected process, identity, network and configuration behavior.', expectedEvidence: 'Detection logic, hunt query, baseline and investigated exception.' },
    ],
    evidenceToInspect: ['Build-system architecture', 'Source-to-artifact provenance', 'Signing-key use', 'Builder identity and access', 'Dependency inventory', 'Release approval', 'Customer Orion version', 'Service-account privileges', 'Domain and network indicators', 'Follow-on identity and mailbox evidence'],
    sources: [
      { label: 'SolarWinds current report disclosure', publisher: 'SolarWinds through the United States Securities and Exchange Commission', url: 'https://www.sec.gov/Archives/edgar/data/1739942/000162828020017451/swi-20201214.htm' },
      { label: 'Emergency Directive 21-01', publisher: 'Cybersecurity and Infrastructure Security Agency', url: 'https://www.cisa.gov/news-events/directives/emergency-directive-21-01' },
    ],
  },
  'equifax-breach': {
    thesis: 'A known application vulnerability became a mass personal-data breach because asset discovery, patch verification, inspection and data protection did not operate as one accountable lifecycle.',
    factualBoundary: 'The United States Government Accountability Office report provides the main evidence. Avoid reducing the case to one missed patch: the report describes connected weaknesses across identification, detection, segmentation and data governance.',
    timeline: [
      { date: '7 March 2017', event: 'The Apache Struts vulnerability became publicly known and remediation information was available.', status: 'confirmed' },
      { date: 'March 2017', event: 'Equifax issued an internal patching request, but the affected dispute-portal component remained vulnerable.', status: 'confirmed' },
      { date: '13 May to 30 July', event: 'Attackers accessed the environment and queried data over an extended period.', status: 'confirmed' },
      { date: '29 July', event: 'A renewed inspection capability associated with an updated certificate helped reveal suspicious traffic.', status: 'confirmed' },
      { date: '30 July', event: 'Equifax took the affected application offline and began incident response.', status: 'confirmed' },
      { date: '7 September', event: 'Equifax publicly announced the breach and subsequent investigation and response continued.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Known exposure', explanation: 'A critical internet-facing application dependency required urgent remediation.', confidence: 'confirmed' },
      { stage: 'Inventory gap', explanation: 'The organization did not reliably connect the vulnerable component to an accountable asset and validation process.', confidence: 'confirmed' },
      { stage: 'Patch not verified', explanation: 'An instruction was issued, but complete remediation was not proven.', confidence: 'confirmed' },
      { stage: 'Detection blind spot', explanation: 'An expired certificate limited inspection of relevant encrypted traffic.', confidence: 'confirmed' },
      { stage: 'Broad data reach', explanation: 'Weak segmentation and concentrated personal data increased accessible impact.', confidence: 'confirmed' },
      { stage: 'Extended access', explanation: 'The connected gaps allowed unauthorized querying before detection.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Asset and dependency inventory', control: 'Link every internet-facing service to components, versions, owner and data.', expectedEvidence: 'Reconciled external and internal inventory with dependency evidence.' },
      { layer: 'Emergency remediation', control: 'Translate authoritative vulnerability notice into a timed, risk-based action.', expectedEvidence: 'Advisory intake, affected population, owner, deadline and exception.' },
      { layer: 'Independent verification', control: 'Prove remediation from the outside and inside rather than trusting completion statements.', expectedEvidence: 'Authenticated scan, external validation, version evidence and retest.' },
      { layer: 'Detection coverage', control: 'Monitor inspection certificates, sensors, logs and blind spots as production dependencies.', expectedEvidence: 'Coverage dashboard, expiry alert and tested telemetry.' },
      { layer: 'Data protection', control: 'Minimize, segment and monitor bulk access to sensitive records.', expectedEvidence: 'Data-flow map, narrow service access, query alerts and retention decision.' },
    ],
    evidenceToInspect: ['Internet-facing asset inventory', 'Software component inventory', 'Patch instruction and accountable receipt', 'Authenticated scan population', 'External retest', 'Certificate inventory and expiry alert', 'Network segmentation', 'Database service privileges', 'Bulk-query telemetry', 'Breach timeline and notification decision'],
    sources: [{ label: 'Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach', publisher: 'United States Government Accountability Office', url: 'https://www.gao.gov/products/gao-18-559' }],
  },
  'change-healthcare': {
    thesis: 'A single critical healthcare intermediary connected identity weakness to nationwide claims, payment, pharmacy and care disruption.',
    factualBoundary: 'Public testimony and United States Department of Health and Human Services material support the reported remote-access and Multi-Factor Authentication issue and the broad healthcare disruption. Individual provider and patient impacts require their own evidence.',
    timeline: [
      { date: '12 February 2024', event: 'According to congressional testimony, compromised credentials were used to access a Change Healthcare Citrix portal that did not have Multi-Factor Authentication.', status: 'confirmed' },
      { date: '21 February', event: 'UnitedHealth Group identified the threat actor in the Change Healthcare environment and isolated affected systems.', status: 'confirmed' },
      { date: 'Late February and March', event: 'Claims, payment, pharmacy and related services experienced widespread disruption while manual and alternate arrangements were used.', status: 'confirmed' },
      { date: 'March 2024', event: 'The United States Department of Health and Human Services issued guidance and flexibilities intended to support continuity and provider cash flow.', status: 'confirmed' },
      { date: '2024 recovery', event: 'Services were restored in stages while investigation, data review and provider support continued.', status: 'confirmed' },
      { date: 'Notification phase', event: 'Breach analysis and notification continued because of the scale and complexity of affected data and downstream relationships.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Credential compromise', explanation: 'A valid credential was available to the attacker.', confidence: 'confirmed' },
      { stage: 'Remote access without MFA', explanation: 'The relevant Citrix portal lacked Multi-Factor Authentication.', confidence: 'confirmed' },
      { stage: 'Environment access', explanation: 'The actor established presence and later deployed ransomware.', confidence: 'confirmed' },
      { stage: 'Protective isolation', explanation: 'The organization disconnected systems to contain risk.', confidence: 'confirmed' },
      { stage: 'Intermediary concentration', explanation: 'A broad healthcare transaction dependency created cross-organization impact.', confidence: 'confirmed' },
      { stage: 'Care and cash-flow consequence', explanation: 'Providers faced operational and payment pressure while patients experienced service disruption.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Remote identity', control: 'Require phishing-resistant Multi-Factor Authentication and device-aware access on every remote path.', expectedEvidence: 'Endpoint inventory, policy, authentication event and denied bypass test.' },
      { layer: 'Privileged movement', control: 'Segment administrative paths, protect privileged identity and detect unusual access.', expectedEvidence: 'Privileged Access Management record, network policy and investigation telemetry.' },
      { layer: 'Critical-service mapping', control: 'Map claims, pharmacy, payment and clinical dependencies across the ecosystem.', expectedEvidence: 'Service map, dependency owner, impact tolerance and concentration review.' },
      { layer: 'Alternate processing', control: 'Maintain safe manual or alternate routes for essential transactions and provider funding.', expectedEvidence: 'Continuity procedure, exercised capacity and reconciliation plan.' },
      { layer: 'Data and notification', control: 'Maintain lineage and role clarity for affected health and personal information.', expectedEvidence: 'Data inventory, Business Associate relationships, breach assessment and notification log.' },
    ],
    evidenceToInspect: ['Remote-access inventory', 'Multi-Factor Authentication policy and logs', 'Compromised-account activity', 'Segmentation and privileged paths', 'Ransomware timeline', 'Critical healthcare service map', 'Provider continuity results', 'Payment and claim backlog', 'Protected Health Information lineage', 'Breach and regulatory decision records'],
    sources: [
      { label: 'Change Healthcare cybersecurity incident frequently asked questions', publisher: 'United States Department of Health and Human Services', url: 'https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html' },
      { label: 'UnitedHealth Group testimony on the cyberattack', publisher: 'United States Senate Committee on Finance', url: 'https://www.finance.senate.gov/hearings/hacking-americas-health-care-assessing-the-change-healthcare-cyber-attack-and-whats-next' },
    ],
  },
  'ariane-501': {
    thesis: 'Redundant hardware did not create independent safety because both channels ran the same reused software with an invalid assumption about the new flight profile.',
    factualBoundary: 'The European Space Agency inquiry is the primary source. The exact numeric-conversion and failure sequence are documented; broader lessons about modern software delivery are teaching applications of that evidence.',
    timeline: [
      { date: 'Before launch', event: 'Ariane 4 inertial-reference software was reused for Ariane 5, including alignment behavior that was not required after liftoff.', status: 'confirmed' },
      { date: '4 June 1996, launch', event: 'Flight 501 began and behaved nominally through the early flight sequence.', status: 'confirmed' },
      { date: 'About 36.7 seconds', event: 'A 64-bit floating-point horizontal-bias value exceeded the range of a 16-bit signed integer conversion.', status: 'confirmed' },
      { date: 'Immediately afterward', event: 'The active and backup inertial-reference systems failed from the same software condition.', status: 'confirmed' },
      { date: 'Control response', event: 'Diagnostic data was interpreted as flight data and commanded extreme nozzle deflection.', status: 'confirmed' },
      { date: 'About 40 seconds', event: 'The launcher broke up and the range-safety system triggered destruction.', status: 'confirmed' },
      { date: '19 July 1996', event: 'The inquiry board issued findings and recommendations on specification, testing, software reuse and failure handling.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Context change', explanation: 'Ariane 5 had a different early-flight trajectory and horizontal velocity profile.', confidence: 'confirmed' },
      { stage: 'Reused assumption', explanation: 'Alignment software continued after launch although its original operational need and range assumptions had changed.', confidence: 'confirmed' },
      { stage: 'Unprotected conversion', explanation: 'A numeric conversion lacked protection because the value was assumed to remain in range.', confidence: 'confirmed' },
      { stage: 'Common-mode redundancy', explanation: 'Both active and backup units used the same software and failed on the same input.', confidence: 'confirmed' },
      { stage: 'Unsafe diagnostic propagation', explanation: 'Diagnostic output entered the flight-control path as if it were valid attitude data.', confidence: 'confirmed' },
      { stage: 'Physical loss', explanation: 'Control commands caused aerodynamic breakup and mission loss.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Reuse qualification', control: 'Revalidate every environmental, timing, numeric and failure assumption in the new system context.', expectedEvidence: 'Assumption register, changed-envelope analysis and owner approval.' },
      { layer: 'Boundary testing', control: 'Test maximum, minimum, invalid and unexpected numeric values against the flight profile.', expectedEvidence: 'Range analysis, boundary tests and overflow result.' },
      { layer: 'Defensive conversion', control: 'Handle out-of-range values through defined safe behavior rather than uncontrolled exception.', expectedEvidence: 'Conversion rule, exception path and test evidence.' },
      { layer: 'Diverse failure protection', control: 'Avoid assuming identical redundant software provides independence from software defects.', expectedEvidence: 'Common-cause analysis, diversity decision and fault-injection result.' },
      { layer: 'Interface validity', control: 'Prevent diagnostic words from being accepted as operational control data.', expectedEvidence: 'Typed interface, validity state and end-to-end failure test.' },
    ],
    evidenceToInspect: ['Original and new flight envelopes', 'Software reuse decision', 'Requirements traceability', 'Numeric range analysis', 'Conversion exception handling', 'Boundary and trajectory tests', 'Common-cause failure analysis', 'Interface validity design', 'Fault-injection result', 'Inquiry recommendation closure'],
    sources: [
      { label: 'Ariane 501 inquiry board report', publisher: 'European Space Agency', url: 'https://www.esa.int/esapub/bulletin/bullet87/inbrie87.htm' },
      { label: 'Ariane 5 Flight 501 failure report', publisher: 'National Aeronautics and Space Administration Software Engineering Laboratory archive', url: 'https://llis.nasa.gov/llis_lib/pdf/1009464main1_0641-mr.pdf' },
    ],
  },
  'british-library-ransomware-recovery': {
    thesis: 'Recovery failed as a complete system even though important backup data survived.',
    factualBoundary: 'The Library assessed a Terminal Services server and compromised privileged credentials as the likely entry route. The precise entry method could not be established, so it must not be presented as confirmed.',
    timeline: [
      { date: '25 October 2023, 23:29', event: 'Later forensic analysis identified an external presence.', status: 'assessed' },
      { date: '26 October, 00:21', event: 'Monitoring automatically blocked suspicious activity.', status: 'confirmed' },
      { date: '26 October, 01:15', event: 'Security staff investigated, reset a password and later unblocked the account after the initial review did not reveal compromise.', status: 'confirmed' },
      { date: '28 October, about 01:30', event: 'Jisc later identified about 440 GB of unusual outbound traffic.', status: 'confirmed' },
      { date: '28 October, 07:35', event: 'The Library recognized a major incident after a team member could not access the network.', status: 'confirmed' },
      { date: '15 January 2024', event: 'A searchable version of the online catalogue returned.', status: 'confirmed' },
      { date: '8 March 2024', event: 'The Library published its incident review and lessons.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Likely credential compromise', explanation: 'A privileged account associated with remote access was probably compromised.', confidence: 'assessed' },
      { stage: 'Authentication weakness', explanation: 'The exposed on-premises route did not require Multi-Factor Authentication.', confidence: 'confirmed' },
      { stage: 'Early signal closure', explanation: 'Suspicious activity was blocked, but closure criteria did not establish that the environment was clean.', confidence: 'teaching inference' },
      { stage: 'Broad internal reach', explanation: 'Legacy topology and limited segmentation increased the possible blast radius.', confidence: 'assessed' },
      { stage: 'Destructive action', explanation: 'Exfiltration was followed by encryption and server destruction that inhibited recovery and evidence collection.', confidence: 'confirmed' },
      { stage: 'Recovery constraint', explanation: 'Protected data still needed clean infrastructure, supported applications, configuration and sequencing.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Identity', control: 'Multi-Factor Authentication and time-bound Privileged Access Management for every internet-facing and supplier path.', expectedEvidence: 'Identity policy, privileged-session approval, session recordings and access-review results.' },
      { layer: 'Architecture', control: 'Segment remote administration, user services, collections, management planes and backup infrastructure.', expectedEvidence: 'Current trust-zone map, enforced rules and tested denial paths.' },
      { layer: 'Detection', control: 'Cover the complete server estate and require deep investigation after unexplained privileged access.', expectedEvidence: 'Coverage inventory, alerts, investigation queries and explicit closure criteria.' },
      { layer: 'Data', control: 'Reduce duplicated extracts and document retention and deletion for shared storage.', expectedEvidence: 'Data lineage, owners, retention rules and deletion reports.' },
      { layer: 'Recovery', control: 'Maintain isolated backups plus clean restoration infrastructure and supported applications.', expectedEvidence: 'Restore tests, Recovery Time Objective results, configuration backups and recovery exercise decisions.' },
    ],
    evidenceToInspect: ['Remote-access and identity logs', 'Outbound traffic records', 'Privileged-account inventory', 'Security-tool coverage by asset', 'Network and management-plane diagrams', 'Application support and retirement status', 'Backup restore and clean-room tests', 'Data-lineage and retention records', 'Incident decision log', 'Aggregate risk-acceptance history'],
    sources: [
      { label: 'British Library cyber incident review', publisher: 'British Library', url: 'https://www.bl.uk/files/v5dwkion/production/99206a2d1e9f07b35712b78f7d75fbb09560c08d.pdf/british-library-cyber-incident-review-8-march-2024.pdf?dl=' },
      { label: 'Learning lessons from the cyber attack', publisher: 'British Library', url: 'https://www.bl.uk/stories/blogs/posts/learning-lessons-from-the-cyber-attack' },
    ],
  },
  'storm-0558-cloud-signing-key': {
    thesis: 'A cloud identity system accepted apparently valid tokens because key scope, validation boundaries and provider detection failed together.',
    factualBoundary: 'The stolen key and token-validation weaknesses are established. The Cyber Safety Review Board reported that Microsoft did not know how or when the actor obtained the key, so acquisition hypotheses remain unconfirmed.',
    timeline: [
      { date: 'May to June 2023', event: 'Storm-0558 accessed victim Exchange Online mailboxes.', status: 'confirmed' },
      { date: '15 June', event: 'The United States Department of State detected anomalous activity.', status: 'confirmed' },
      { date: '16 June', event: 'State notified Microsoft and the investigation expanded.', status: 'confirmed' },
      { date: '19 to 24 June', event: 'Additional affected accounts and organizations were identified.', status: 'confirmed' },
      { date: '24 June', event: 'Microsoft invalidated the stolen signing key.', status: 'confirmed' },
      { date: 'Around 26 June', event: 'Microsoft determined that the 2016 consumer key had issued tokens usable against consumer and enterprise accounts.', status: 'confirmed' },
      { date: '20 March 2024', event: 'The Cyber Safety Review Board published its review.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Key acquisition', explanation: 'The actor obtained a high-value signing key through a method that remained unknown.', confidence: 'confirmed' },
      { stage: 'Excessive reach', explanation: 'The key and trust design created a large potential authentication blast radius.', confidence: 'assessed' },
      { stage: 'Validation weakness', explanation: 'A flaw allowed consumer-key-signed tokens to be accepted for enterprise accounts.', confidence: 'confirmed' },
      { stage: 'Apparently trusted access', explanation: 'Forged tokens passed cryptographic signature checks and reached mailboxes.', confidence: 'confirmed' },
      { stage: 'Provider detection gap', explanation: 'Microsoft did not independently identify the crown-jewel compromise.', confidence: 'confirmed' },
      { stage: 'Customer-led discovery', explanation: 'Customer telemetry exposed anomalous access and began containment.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Key custody', control: 'Use hardware-backed isolation, narrow purpose and environment scope, rotation and emergency revocation.', expectedEvidence: 'Hardware Security Module logs, key inventory, ceremony records and revocation exercises.' },
      { layer: 'Validation', control: 'Validate issuer, audience, tenant, algorithm and key authorization independently.', expectedEvidence: 'Negative test suite and release-gate results across token boundaries.' },
      { layer: 'Detection', control: 'Detect impossible or abnormal claim relationships even when a signature is valid.', expectedEvidence: 'Cross-tenant analytics, provider hunts and investigated anomalies.' },
      { layer: 'Customer evidence', control: 'Provide adequate audit logging and retention by default.', expectedEvidence: 'Mailbox, token, privilege and application-consent logs available to every affected customer.' },
      { layer: 'Governance', control: 'Hold leaders accountable for systemic identity defects and overdue remediation.', expectedEvidence: 'Risk decisions, independent reviews, deadlines and corrected public statements.' },
    ],
    evidenceToInspect: ['Key-generation and rotation records', 'Hardware Security Module audit trails', 'Token-validation code and tests', 'Authentication and mailbox logs', 'Tenant anomaly alerts', 'Key revocation evidence', 'Victim notification criteria', 'Red-team findings', 'Root-cause hypotheses and confidence', 'Corrections to public statements'],
    sources: [
      { label: 'Cyber Safety Review Board resource page', publisher: 'CISA', url: 'https://www.cisa.gov/resources-tools/resources/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer-2023' },
      { label: 'Review of the Summer 2023 Microsoft Exchange Online intrusion', publisher: 'Cyber Safety Review Board', url: 'https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf' },
    ],
  },
  'mgm-resorts-operational-disruption': {
    thesis: 'A containment decision reduced uncertain cyber exposure while immediately trading away availability across digital and physical guest services.',
    factualBoundary: 'MGM filings confirm unauthorized activity, shutdown, disruption, data categories and financial estimates. They do not establish the initial access method or actor, so popular social-engineering narratives are outside this primary-source case.',
    timeline: [
      { date: 'September 2023', event: 'MGM identified unauthorized activity affecting certain United States systems.', status: 'confirmed' },
      { date: '12 September', event: 'The company disclosed investigation, law-enforcement notification and shutdown of certain systems.', status: 'confirmed' },
      { date: 'September', event: 'System shutdowns disrupted property and guest-facing operations.', status: 'confirmed' },
      { date: 'By 5 October', event: 'Domestic property operations returned to normal and virtually all guest-facing systems were restored.', status: 'confirmed' },
      { date: '5 October', event: 'MGM reported affected data categories and estimated financial effects.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Initial access', explanation: 'Public primary sources do not establish the access technique.', confidence: 'confirmed' },
      { stage: 'Material system exposure', explanation: 'Unauthorized activity reached systems important enough to require broad containment.', confidence: 'confirmed' },
      { stage: 'Shutdown', explanation: 'Containment reduced uncertain integrity and confidentiality risk but removed availability.', confidence: 'confirmed' },
      { stage: 'Physical-service impact', explanation: 'Property operations depended on the affected digital service chain.', confidence: 'confirmed' },
      { stage: 'Financial and privacy work', explanation: 'Restoration, personal-data assessment and materiality reporting ran in parallel.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Service mapping', control: 'Map digital dependencies to physical guest services and restoration tiers.', expectedEvidence: 'Business impact analysis, dependency map and tested restoration sequence.' },
      { layer: 'Graceful degradation', control: 'Maintain safe offline procedures for access, check-in, booking, payment and support.', expectedEvidence: 'Exercise records, role cards and property-level fallback results.' },
      { layer: 'Architecture', control: 'Segment corporate, property and management systems with limited trust paths.', expectedEvidence: 'Zone rules, break-glass design and tested isolation.' },
      { layer: 'Data lifecycle', control: 'Retain historical customer data only for a documented purpose and protect archives.', expectedEvidence: 'Retention schedule, legal basis, deletion records and access controls.' },
      { layer: 'Materiality', control: 'Use a reconciled method for operational and financial impact.', expectedEvidence: 'Lost-service model, incident costs, assumptions, insurance treatment and disclosure approvals.' },
    ],
    evidenceToInspect: ['System dependency map', 'Shutdown decision and authority', 'Property workaround results', 'Restoration logs', 'Recovery Time Objective tests', 'Customer-data inventory', 'Retention schedule', 'Incident cost model', 'Disclosure review record', 'Preserved forensic evidence'],
    sources: [
      { label: '12 September incident filing', publisher: 'MGM Resorts, filed with the SEC', url: 'https://www.sec.gov/Archives/edgar/data/789570/000119312523233855/d502352d8k.htm' },
      { label: '5 October incident update', publisher: 'MGM Resorts, filed with the SEC', url: 'https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm' },
      { label: 'Third-quarter filing', publisher: 'MGM Resorts, filed with the SEC', url: 'https://www.sec.gov/Archives/edgar/data/789570/000078957023000024/mgm-20230930.htm' },
    ],
  },
  'capital-one-cloud-risk-governance': {
    thesis: 'A cloud transformation outpaced the risk, control, assurance and accountability system needed to govern it.',
    factualBoundary: 'The regulator identified governance and control failures surrounding public-cloud migration. The case does not establish that public cloud itself is inherently unsafe.',
    timeline: [
      { date: 'Around 2015', event: 'Significant technology operations began moving to public cloud without sufficiently effective risk-assessment processes.', status: 'confirmed' },
      { date: 'Following migration', event: 'Network, Data Loss Prevention, alert and governance weaknesses persisted.', status: 'confirmed' },
      { date: 'Assurance period', event: 'Internal audit did not identify or effectively report numerous weaknesses.', status: 'confirmed' },
      { date: '2019', event: 'An Office of the Comptroller of the Currency examination identified corrective needs.', status: 'confirmed' },
      { date: '5 August 2020', event: 'The regulator issued civil penalty and cease-and-desist consent orders.', status: 'confirmed' },
      { date: '6 August 2020', event: 'The $80 million penalty was publicly announced.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Transformation ambition', explanation: 'Important workloads moved to public cloud.', confidence: 'confirmed' },
      { stage: 'Risk-process lag', explanation: 'Material technology change was not matched by effective cloud-specific assessment.', confidence: 'confirmed' },
      { stage: 'Control gaps', explanation: 'Network, data-protection, alert, vulnerability and configuration weaknesses persisted.', confidence: 'confirmed' },
      { stage: 'Challenge weakness', explanation: 'Independent risk did not adequately aggregate and challenge the cloud exposure.', confidence: 'confirmed' },
      { stage: 'Audit weakness', explanation: 'Internal audit did not surface the complete control picture.', confidence: 'confirmed' },
      { stage: 'Regulatory consequence', explanation: 'The regulator required formal remediation and imposed a penalty.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Change gate', control: 'Require a risk assessment before material migration.', expectedEvidence: 'Criticality, data, architecture, threats, shared responsibility, recovery and residual-risk approval.' },
      { layer: 'Control system', control: 'Map cloud risks to technical controls, assets, owners, tests and exceptions.', expectedEvidence: 'Cloud control universe with population coverage and operating results.' },
      { layer: 'Second line', control: 'Independently challenge design, assumptions and residual risk.', expectedEvidence: 'Challenge records, escalations and acceptance authority.' },
      { layer: 'Third line', control: 'Maintain cloud-native audit competence without designing the controls being audited.', expectedEvidence: 'Risk-based plan, qualified work papers and reporting to the Audit Committee.' },
      { layer: 'Board', control: 'Report material gaps, overdue remediation, exceptions and accountable executives.', expectedEvidence: 'Trend dashboard, minutes, decisions and validated closure.' },
    ],
    evidenceToInspect: ['Migration approvals', 'Architecture risk assessments', 'Threat models', 'Cloud control inventory', 'Data Loss Prevention test results', 'Alert queue and closure evidence', 'Second-line challenges', 'Internal audit work papers', 'Audit Committee minutes', 'Independent remediation validation'],
    sources: [
      { label: 'Penalty announcement', publisher: 'Office of the Comptroller of the Currency', url: 'https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html' },
      { label: 'Civil money penalty consent order', publisher: 'Office of the Comptroller of the Currency', url: 'https://www.occ.gov/static/enforcement-actions/ea2020-036.pdf' },
      { label: 'Cease-and-desist consent order', publisher: 'Office of the Comptroller of the Currency', url: 'https://www.occ.gov/static/enforcement-actions/ea2020-037.pdf' },
    ],
  },
  'okta-support-system-session-tokens': {
    thesis: 'A support workflow carried reusable administrator sessions across employee, provider and customer trust boundaries.',
    factualBoundary: 'The principal account is Okta’s own root-cause report. It is useful primary evidence from the provider, but it remains a vendor self-report rather than an independent investigation.',
    timeline: [
      { date: '28 September 2023', event: 'Unauthorized support-system access began.', status: 'confirmed' },
      { date: '29 September', event: '1Password reported suspicious activity and Okta began investigating.', status: 'confirmed' },
      { date: '2 October', event: 'BeyondTrust reported suspicious activity.', status: 'confirmed' },
      { date: '13 October', event: 'BeyondTrust supplied a suspicious Internet Protocol address.', status: 'confirmed' },
      { date: '16 October', event: 'Okta connected the indicator to a service account and previously unobserved events.', status: 'confirmed' },
      { date: '17 to 19 October', event: 'The account and sessions were disabled, files were examined, tokens were revoked and affected customers were identified.', status: 'confirmed' },
      { date: '3 November', event: 'Okta published root-cause and remediation information.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Browser trust boundary', explanation: 'A personal browser profile was used on a managed device.', confidence: 'confirmed' },
      { stage: 'Credential synchronization', explanation: 'A reusable service credential was stored in the personal account.', confidence: 'confirmed' },
      { stage: 'Broad support access', explanation: 'The compromised service account could access customer support cases and files.', confidence: 'confirmed' },
      { stage: 'Sensitive diagnostic files', explanation: 'Some HTTP Archive files contained active session tokens.', confidence: 'confirmed' },
      { stage: 'Session replay', explanation: 'Stolen tokens represented already authenticated sessions and were used against customers.', confidence: 'confirmed' },
      { stage: 'Log interpretation gap', explanation: 'Direct file access used a different event type from the investigators’ initial query.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Managed endpoint', control: 'Block personal browser-profile sign-in and unmanaged credential synchronization.', expectedEvidence: 'Enforced browser policy, endpoint findings and exception review.' },
      { layer: 'Workload identity', control: 'Replace reusable service passwords with short-lived, task-scoped workload identity.', expectedEvidence: 'Identity inventory, narrow permissions, rotation and usage logs.' },
      { layer: 'Diagnostic data', control: 'Detect and redact secrets before upload, encrypt files and minimize retention.', expectedEvidence: 'Upload scanning, warnings, access logs and deletion reports.' },
      { layer: 'Session security', control: 'Shorten token life, bind risk-sensitive sessions and support immediate revocation.', expectedEvidence: 'Token policy, reauthentication events and revocation confirmation.' },
      { layer: 'Detection', control: 'Use consistent file event semantics and correlate credible customer reports provider-wide.', expectedEvidence: 'Complete queries, cross-customer cases and escalation thresholds.' },
    ],
    evidenceToInspect: ['Managed-browser policy', 'Service-account permission history', 'Credential-vault records', 'Support-file inventory', 'Token lifetime and revocation logs', 'Every file-access event schema', 'Investigation queries', 'Customer escalation record', 'Session-hijack evidence', 'Notification timeline'],
    sources: [{ label: 'Unauthorized access to Okta’s support case-management system: root cause', publisher: 'Okta Security', url: 'https://sec.okta.com/articles/2023/11/unauthorized-access-oktas-support-case-management-system-root-cause/', caveat: 'Vendor self-report.' }],
  },
  'moveit-transfer-zero-day': {
    thesis: 'An internet-facing transfer platform concentrated sensitive data and supplier dependency behind one unknown application flaw.',
    factualBoundary: 'The evidence supports exploitation, a web shell, data theft and extortion. It does not support claiming that every affected organization experienced file encryption.',
    timeline: [
      { date: 'Beginning 27 May 2023', event: 'CISA and the FBI reported CL0P exploitation activity.', status: 'confirmed' },
      { date: '28 May', event: 'Progress received an initial customer report of unusual activity.', status: 'confirmed' },
      { date: '30 May', event: 'Progress alerted customers and took MOVEit Cloud offline for investigation.', status: 'confirmed' },
      { date: '31 May', event: 'Patches were released for supported versions.', status: 'confirmed' },
      { date: '2 June', event: 'CISA added CVE-2023-34362 to its Known Exploited Vulnerabilities catalog.', status: 'confirmed' },
      { date: '7 June', event: 'CISA and the FBI published a joint advisory.', status: 'confirmed' },
      { date: '23 June', event: 'The federal Known Exploited Vulnerabilities remediation due date arrived.', status: 'confirmed' },
    ],
    causalChain: [
      { stage: 'Concentrated service', explanation: 'An internet-facing managed transfer service held high-value files and metadata.', confidence: 'confirmed' },
      { stage: 'Unknown flaw', explanation: 'An unauthenticated SQL injection vulnerability enabled unauthorized access.', confidence: 'confirmed' },
      { stage: 'Persistence', explanation: 'Attackers deployed a web shell at the application layer.', confidence: 'confirmed' },
      { stage: 'Collection', explanation: 'Central transfer repositories exposed data for discovery and theft.', confidence: 'confirmed' },
      { stage: 'Ecosystem propagation', explanation: 'One intermediary affected customers, suppliers, employees and data subjects.', confidence: 'confirmed' },
      { stage: 'Long-tail response', explanation: 'Patching did not end compromise assessment, notification or downstream data tracing.', confidence: 'confirmed' },
    ],
    controls: [
      { layer: 'Exposure inventory', control: 'Continuously map internet-facing products, versions, owners and stored data.', expectedEvidence: 'External inventory reconciled to internal ownership and current version.' },
      { layer: 'Emergency response', control: 'Prioritize known exploitation and isolate or mitigate before a complete patch window.', expectedEvidence: 'Advisory intake, action timestamps, exceptions and alternate service plan.' },
      { layer: 'Compromise assessment', control: 'Hunt for web shells, abnormal database activity, downloads and outbound traffic.', expectedEvidence: 'Historical logs, file integrity, database queries and validated clean-state decision.' },
      { layer: 'Data lifecycle', control: 'Delete transferred files promptly after verified delivery and limit service-account access.', expectedEvidence: 'Retention configuration, deletion results and database privilege tests.' },
      { layer: 'Supplier continuity', control: 'Maintain disclosure, evidence-sharing and alternate transfer obligations.', expectedEvidence: 'Contract clauses, 24-hour fact pack and exercised fallback channel.' },
    ],
    evidenceToInspect: ['External asset inventory', 'Exact version and patch time', 'Internet and web logs', 'Web-shell indicators', 'Database activity', 'New accounts and credentials', 'File-access history', 'Outbound traffic', 'Transferred-file inventory', 'Downstream notification analysis'],
    sources: [
      { label: 'CL0P exploits MOVEit vulnerability', publisher: 'CISA and FBI', url: 'https://www.cisa.gov/sites/default/files/2023-06/aa23-158a-stopransomware-cl0p-ransomware-gang-exploits-moveit-vulnerability_7.pdf' },
      { label: 'Known Exploited Vulnerabilities catalog', publisher: 'CISA', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog' },
      { label: 'Update on steps to protect MOVEit customers', publisher: 'Progress Software', url: 'https://www.progress.com/blogs/update-steps-we-are-taking-protect-moveit-customers', caveat: 'Vendor update.' },
    ],
  },
};

function defaultTimeline(item: CaseStudy): CaseDetail['timeline'] {
  return [
    { date: 'Before the event', event: `The operating system, assumptions and dependencies behind ${item.title.toLowerCase()} accumulated over time.`, status: 'teaching inference' },
    { date: item.year, event: item.situation, status: item.type === 'Documented case' ? 'confirmed' : 'teaching inference' },
    { date: 'Response', event: `Teams had to make decisions across ${item.connections.slice(0, 3).join(', ')}.`, status: 'teaching inference' },
    { date: 'Learning', event: item.learn, status: 'teaching inference' },
  ];
}

function defaultChain(item: CaseStudy): CaseDetail['causalChain'] {
  return [
    { stage: 'Operating context', explanation: item.situation, confidence: item.type === 'Documented case' ? 'confirmed' : 'teaching inference' },
    ...item.facts.map((fact, index) => ({ stage: `Evidence ${index + 1}`, explanation: fact, confidence: (item.type === 'Documented case' ? 'confirmed' : 'teaching inference') as EvidenceStatus })),
    { stage: 'Decision pressure', explanation: item.decision, confidence: 'teaching inference' },
  ];
}

function defaultControls(item: CaseStudy): CaseDetail['controls'] {
  return item.connections.slice(0, 5).map((connection, index) => ({
    layer: connection,
    control: `Define the owner, operating boundary and failure conditions for ${connection.toLowerCase()} in this case.`,
    expectedEvidence: index === 0 ? 'Approved design, current inventory and accountable owner.' : index === 1 ? 'Time-bound operating records and exception history.' : index === 2 ? 'Test results, alerts and investigated deviations.' : index === 3 ? 'Recovery or fallback exercise with measured outcomes.' : 'Independent review, decision log and confirmed remediation.',
  }));
}

function buildQuiz(item: CaseStudy, detail: Omit<CaseDetail, 'quiz'>): CaseDetail['quiz'] {
  const factBoundary = detail.factualBoundary;
  const firstControl = detail.controls[0];
  const secondControl = detail.controls[1] ?? firstControl;
  const evidence = detail.evidenceToInspect.slice(0, 4).join(', ');
  return [
    { question: `Which claims about ${item.title.toLowerCase()} are confirmed, assessed or only teaching inference?`, answerGuidance: `${factBoundary} A strong answer labels every material claim by confidence and explains what missing artifact would raise or lower confidence.`, rubric: ['Source provenance', 'Confidence labels', 'Missing evidence', 'No causal overclaim'] },
    { question: 'Build the smallest defensible causal chain. Which condition is a root cause, an enabling condition, a trigger and a consequence?', answerGuidance: `Use the sequence ${detail.causalChain.map((step) => step.stage).join(' -> ')}. Defend why removing one condition changes the path and avoid treating the final visible failure as the only cause.`, rubric: ['Cause classification', 'Necessary conditions', 'Dependencies', 'Counterfactual reasoning'] },
    { question: 'Where would you place two independent controls so one failure does not become complete loss?', answerGuidance: `Start with ${firstControl.layer}: ${firstControl.control} Then add ${secondControl.layer}: ${secondControl.control} Explain how the controls fail differently and which residual risk remains.`, rubric: ['Defense in depth', 'Control independence', 'Placement', 'Residual risk'] },
    { question: 'Which architecture or operating boundary concentrated the impact, and how would you redesign it?', answerGuidance: `Trace the case through ${item.connections.join(', ')}. Propose segmentation, narrowed trust, graceful degradation or alternate service only where it changes the documented causal path.`, rubric: ['Boundary map', 'Concentration', 'Trade-offs', 'Operability'] },
    { question: 'What evidence would you demand before declaring containment or remediation complete?', answerGuidance: `At minimum examine ${evidence}. Define population coverage, time range, expected clean result, evidence owner and the independent retest needed for closure.`, rubric: ['Evidence quality', 'Population coverage', 'Time window', 'Independent validation'] },
    { question: `Answer the live decision: ${item.decision}`, answerGuidance: 'State the immediate objective, separate known facts from assumptions, compare at least three options, set a stop condition, name the decision owner and explain what new evidence would change the choice.', rubric: ['Prioritization', 'Options', 'Decision rights', 'Reversibility'] },
    { question: 'How should first-line operators, independent risk or compliance, internal audit and senior leadership divide responsibility?', answerGuidance: `Operators own safe execution. Independent functions challenge the design and residual risk. Audit evaluates governance and operating effectiveness without designing the control. Leadership decides material trade-offs and overdue remediation. Apply those roles to ${item.connections.slice(0, 3).join(', ')}.`, rubric: ['Accountability', 'Independence', 'Escalation', 'Assurance'] },
    { question: 'Design a recovery exercise that would expose hidden dependencies before a real event.', answerGuidance: 'Start from the important service, remove the failed dependency, require an alternate operating mode, restore from trusted assets, verify integrity, measure time and data loss, and record unresolved manual or supplier dependencies.', rubric: ['Important service', 'Failure scenario', 'Measured recovery', 'Integrity validation'] },
    { question: 'Which leading indicators would reveal the conditions forming before the incident?', answerGuidance: `Choose indicators tied to the causal chain rather than generic counts. Examples include unresolved exposure, control coverage, aged exceptions, failed tests and unowned dependencies across ${item.connections.join(', ')}. Each indicator needs a threshold and action owner.`, rubric: ['Causal relevance', 'Threshold', 'Trend', 'Action owner'] },
    { question: 'Give a 90-second executive recommendation without losing technical truth.', answerGuidance: `Lead with the affected objective and consequence. Summarize the causal chain, distinguish confirmed evidence from uncertainty, recommend a prioritized set of actions, state cost or service trade-offs and end with the decision required now.`, rubric: ['Governing message', 'Evidence boundary', 'Trade-off', 'Clear ask'] },
  ];
}

function buildDetail(item: CaseStudy): CaseDetail {
  const override = caseOverrides[item.slug] ?? {};
  const withoutQuiz: Omit<CaseDetail, 'quiz'> = {
    slug: item.slug,
    thesis: override.thesis ?? item.learn,
    occurred: override.occurred ?? item.year,
    domains: override.domains ?? item.domains,
    factualBoundary: override.factualBoundary ?? (item.type === 'Documented case' ? `Use the cited source for documented facts. The connection and control analysis on this page is a teaching interpretation of ${item.title.toLowerCase()}.` : 'This is a fictional composite. Every event and organization detail is constructed for practice, although the control and reasoning patterns reflect real professional work.'),
    timeline: override.timeline ?? defaultTimeline(item),
    causalChain: override.causalChain ?? defaultChain(item),
    controls: override.controls ?? defaultControls(item),
    evidenceToInspect: override.evidenceToInspect ?? ['Current asset and dependency inventory', 'Identity, change and access records', 'Technical and business telemetry', 'Incident decisions and communications', 'Control test and recovery evidence', 'Risk acceptance and remediation history'],
    sources: override.sources ?? [{ label: item.sourceLabel, publisher: item.type === 'Documented case' ? 'Primary or authoritative case source' : 'Robin’s Hood', url: item.sourceUrl }],
  };
  return { ...withoutQuiz, quiz: buildQuiz(item, withoutQuiz) };
}

export const caseDetails = caseStudies.map(buildDetail);
export const caseDetailBySlug = new Map(caseDetails.map((detail) => [detail.slug, detail]));
