export const iso27001HandbookSlug = 'iso-iec-27001-2022-self-study-handbook';

export type HandbookModule = {
  id: string;
  number: string;
  title: string;
  label: string;
  minutes: number;
};

export const handbookModules: HandbookModule[] = [
  { id: 'orientation', number: '01', title: 'The standard and certification ecosystem', label: 'Orientation', minutes: 35 },
  { id: 'clauses-4-5', number: '02', title: 'Clauses 4 and 5: context and leadership', label: 'Context + leadership', minutes: 45 },
  { id: 'clause-6', number: '03', title: 'Clause 6: planning, risk and objectives', label: 'Planning', minutes: 60 },
  { id: 'clauses-7-8', number: '04', title: 'Clauses 7 and 8: support and operation', label: 'Support + operation', minutes: 55 },
  { id: 'clauses-9-10', number: '05', title: 'Clauses 9 and 10: evaluation and improvement', label: 'Evaluate + improve', minutes: 55 },
  { id: 'risk-lab', number: '06', title: 'Risk assessment and treatment lab', label: 'Risk lab', minutes: 70 },
  { id: 'soa', number: '07', title: 'Statement of Applicability', label: 'Applicability', minutes: 35 },
  { id: 'annex-a', number: '08', title: 'All 93 Annex A controls', label: 'Annex A', minutes: 180 },
  { id: 'evidence', number: '09', title: 'Documents, records and evidence', label: 'Evidence', minutes: 60 },
  { id: 'audit', number: '10', title: 'Audit, management review and corrective action', label: 'Assurance', minutes: 65 },
  { id: 'exam', number: '11', title: 'Exam practice and interview preparation', label: 'Practice', minutes: 90 },
  { id: 'capstone', number: '12', title: 'Build a complete dummy ISMS', label: 'Capstone', minutes: 240 },
];

export type ClauseLesson = {
  id: string;
  title: string;
  requirement: string;
  practice: string;
  evidence: string;
  trap: string;
};

export type ClauseGroup = {
  clause: string;
  title: string;
  purpose: string;
  memory: string;
  lessons: ClauseLesson[];
};

export const clauseGroups: ClauseGroup[] = [
  {
    clause: '4',
    title: 'Context of the organization',
    purpose: 'Define the environment, interested parties, boundaries and management system before choosing controls.',
    memory: 'Where are we, who cares, what is inside, and how will the system work?',
    lessons: [
      {
        id: '4.1',
        title: 'Understanding the organization and its context',
        requirement: 'Determine internal and external issues that are relevant to the organization purpose and that can affect the intended outcomes of the Information Security Management System (ISMS). The 2024 climate-action amendment also requires considering whether climate change is a relevant issue.',
        practice: 'Run a structured context workshop. Record the business model, strategy, technology, culture, skills, contractual environment, threat landscape, economic conditions, suppliers and relevant environmental or climate dependencies.',
        evidence: 'Approved context register, workshop notes, business and technology diagrams, external environment review, and a review date.',
        trap: 'Copying a generic strengths and weaknesses list without explaining how each issue changes information-security decisions.',
      },
      {
        id: '4.2',
        title: 'Needs and expectations of interested parties',
        requirement: 'Identify relevant interested parties, their information-security requirements and which of those requirements the ISMS will address. Interested-party requirements can include legal, regulatory and contractual obligations. A climate-action amendment note highlights that relevant interested parties can have climate-change requirements.',
        practice: 'Map customers, personnel, regulators, owners, suppliers, partners, insurers and certification stakeholders. Translate each relevant expectation into an obligation, control, objective or operating commitment.',
        evidence: 'Interested-party register, obligations register, contracts, privacy commitments, service requirements and traceability to controls or processes.',
        trap: 'Listing every possible stakeholder while failing to decide which requirements are actually relevant to the scope.',
      },
      {
        id: '4.3',
        title: 'Determining the scope of the ISMS',
        requirement: 'Set the boundaries and applicability of the ISMS while considering context, relevant interested-party requirements, and interfaces and dependencies between the organization and others. The scope must be available as documented information.',
        practice: 'State the products, services, locations, teams, processes, information, technology and exclusions. Explain important suppliers and shared services so the boundary cannot hide a critical dependency.',
        evidence: 'A concise approved scope statement, scope diagram, location list, service inventory, dependency map and rationale for boundaries.',
        trap: 'Using a vague scope such as “the IT department” or excluding a difficult supplier even though the scoped service depends on it.',
      },
      {
        id: '4.4',
        title: 'Information security management system',
        requirement: 'Establish, implement, maintain and continually improve an ISMS, including the processes needed and their interactions.',
        practice: 'Define a management-system map linking governance, risk, control operation, competence, communication, performance evaluation, audit, management review and improvement.',
        evidence: 'ISMS process map, governance calendar, role assignments, process procedures, meeting records and evidence that the system is operating.',
        trap: 'Treating the ISMS as a folder of policies rather than a living set of connected management processes.',
      },
    ],
  },
  {
    clause: '5',
    title: 'Leadership',
    purpose: 'Make information security part of leadership, business direction and accountable decision-making.',
    memory: 'Commit, set policy, assign authority.',
    lessons: [
      {
        id: '5.1',
        title: 'Leadership and commitment',
        requirement: 'Top management is accountable for ISMS effectiveness, policy and objectives, integration into business processes, resources, communication, intended outcomes, support for people and continual improvement.',
        practice: 'Put security risk and objectives into leadership routines. Require leaders to decide priorities, accept residual risk within authority, remove resource barriers and review performance.',
        evidence: 'Leadership meeting minutes, approved budget, objective ownership, risk decisions, communications, management-review participation and tracked actions.',
        trap: 'Delegating accountability to the security manager and showing only a signed policy as evidence of leadership.',
      },
      {
        id: '5.2',
        title: 'Information security policy',
        requirement: 'Establish a policy appropriate to the organization that provides a framework for objectives and includes commitments to satisfy applicable requirements and continually improve the ISMS. It must be documented, communicated and available to relevant interested parties.',
        practice: 'Write a short governing policy that sets direction and commitments. Support it with topic-specific policies for access, assets, suppliers, incidents, continuity and secure development where relevant.',
        evidence: 'Approved policy, version history, publication record, awareness evidence and controlled external sharing where appropriate.',
        trap: 'Writing an overly technical policy that staff cannot use or leaving it unchanged when scope and obligations change.',
      },
      {
        id: '5.3',
        title: 'Roles, responsibilities and authorities',
        requirement: 'Assign and communicate relevant roles, responsibilities and authorities. Someone must ensure the ISMS conforms and report its performance to top management.',
        practice: 'Name the ISMS owner, risk owners, control owners, asset owners, internal-audit responsibility, incident roles and approval authorities. Separate incompatible duties where needed.',
        evidence: 'Organization chart, role descriptions, responsibility matrix, committee terms, risk and control ownership fields and communications.',
        trap: 'Using a responsibility matrix with team names only, no accountable individual and no authority to make decisions.',
      },
    ],
  },
  {
    clause: '6',
    title: 'Planning',
    purpose: 'Turn context into risks, treatment decisions, measurable objectives and controlled change.',
    memory: 'Plan for uncertainty, assess risk, choose treatment, set objectives, manage change.',
    lessons: [
      {
        id: '6.1.1',
        title: 'Actions to address risks and opportunities',
        requirement: 'Consider context and interested parties, determine risks and opportunities that could affect intended outcomes, prevent unwanted effects or enable improvement, and plan how actions will be integrated and evaluated.',
        practice: 'Look beyond cyberattack scenarios. Include management-system risks such as unclear ownership, weak competence, unreliable evidence or rapid business change, plus opportunities such as automation and stronger customer trust.',
        evidence: 'Planning log, management-system risk and opportunity register, assigned actions, integration into operating plans and effectiveness reviews.',
        trap: 'Assuming this subclause is identical to the information-security risk assessment in 6.1.2.',
      },
      {
        id: '6.1.2',
        title: 'Information security risk assessment',
        requirement: 'Define and apply a repeatable process with risk acceptance and assessment criteria. Identify risks to confidentiality, integrity and availability, identify risk owners, analyze consequences and likelihood, calculate risk levels, compare them with criteria and prioritize treatment.',
        practice: 'Use scenario statements that connect an asset or process, a threat or cause, a vulnerability or condition and a business consequence. Use the same scoring method so results are consistent, valid and comparable.',
        evidence: 'Approved methodology, risk criteria, risk register, workshop records, source evidence, owner confirmation and assessment history.',
        trap: 'Starting with Annex A controls and inventing risks afterward. Risks explain why controls are needed, not the other way around.',
      },
      {
        id: '6.1.3',
        title: 'Information security risk treatment',
        requirement: 'Select treatment options, determine all controls needed, compare them with Annex A, produce a Statement of Applicability, create a risk treatment plan, and obtain risk-owner approval of the plan and acceptance of residual risk.',
        practice: 'Choose avoidance, modification, sharing or retention based on criteria and decision authority. Add legal, contractual or custom controls when Annex A alone does not fully treat the risk.',
        evidence: 'Treatment decisions, control mapping, Statement of Applicability, risk treatment plan, implementation records, residual-risk assessment and signed acceptance.',
        trap: 'Calling every Annex A control mandatory or assuming a justified exclusion means the related risk can be ignored.',
      },
      {
        id: '6.2',
        title: 'Information security objectives and planning',
        requirement: 'Set objectives at relevant functions and levels. Objectives must align with policy, consider requirements and risk results, be measurable where practicable, monitored, communicated, updated and documented. Plan what, resources, ownership, timing and evaluation.',
        practice: 'Use outcome-focused objectives such as reducing overdue critical remediation, improving recovery-test success or closing access reviews on time. Define baseline, target, owner, deadline, data source and response when off track.',
        evidence: 'Objective register, metric definitions, dashboard history, action plans, review minutes and decisions based on results.',
        trap: 'Using activities such as “deliver training” as objectives without measuring the security outcome or effectiveness.',
      },
      {
        id: '6.3',
        title: 'Planning changes to the ISMS',
        requirement: 'Changes to the ISMS must be carried out in a planned manner.',
        practice: 'Assess purpose, consequences, dependencies, resources, responsibilities and evidence when the scope, methodology, organization, technology, suppliers or controls change.',
        evidence: 'Change proposal, impact assessment, approvals, implementation plan, updated documents, communication and post-change review.',
        trap: 'Updating documents after a major change without evaluating whether the change damaged control operation or introduced new risk.',
      },
    ],
  },
  {
    clause: '7',
    title: 'Support',
    purpose: 'Provide resources, competence, awareness, communication and controlled information so the ISMS can operate reliably.',
    memory: 'Resource, competence, awareness, communicate, document.',
    lessons: [
      {
        id: '7.1',
        title: 'Resources',
        requirement: 'Determine and provide the people, time, tools, technology and funding needed to establish, operate, maintain and improve the ISMS.',
        practice: 'Link resources to scope, risk, obligations, objectives and audit results. Include specialist capacity, backup coverage, tooling, training and supplier support.',
        evidence: 'Budget, staffing plan, tool licenses, supplier agreements, capacity plans and management decisions on gaps.',
        trap: 'Claiming resources are adequate without showing how the conclusion follows from workload and risk.',
      },
      {
        id: '7.2',
        title: 'Competence',
        requirement: 'Determine competence needed for work affecting information-security performance, ensure people are competent through education, training or experience, evaluate actions and retain evidence.',
        practice: 'Build a role-based competence matrix. Use training, mentoring, supervised practice, certification or recruitment, then verify through observation, tests, work quality or outcomes.',
        evidence: 'Role profiles, competence matrix, training and qualification records, assessment results, mentoring notes and performance evidence.',
        trap: 'Treating attendance at training as proof of competence without checking whether the person can perform the task.',
      },
      {
        id: '7.3',
        title: 'Awareness',
        requirement: 'People doing work under the organization control must know the policy, their contribution and the implications of not conforming.',
        practice: 'Combine induction, periodic campaigns and role-specific reminders. Make reporting routes, expected behavior and consequences clear.',
        evidence: 'Awareness plan, communication records, acknowledgements, campaign metrics, simulations and follow-up actions.',
        trap: 'Sending one annual video to everyone and calling the awareness program effective.',
      },
      {
        id: '7.4',
        title: 'Communication',
        requirement: 'Determine what to communicate, when, with whom, by whom and how for internal and external ISMS communication.',
        practice: 'Create a communication matrix for policy, incidents, vulnerabilities, customers, regulators, suppliers, audit results, objectives and crisis messages.',
        evidence: 'Communication plan, templates, contact lists, notifications, meeting records and tested escalation channels.',
        trap: 'Focusing on message content while omitting authority, timing, audience or secure communication channels.',
      },
      {
        id: '7.5.1',
        title: 'Documented information: general',
        requirement: 'Maintain documents required by ISO/IEC 27001 and any additional documents the organization decides are necessary for ISMS effectiveness.',
        practice: 'Use the minimum documentation that makes decisions repeatable, responsibilities clear and evidence retrievable. Add detail where risk, complexity or competence requires it.',
        evidence: 'Document inventory, required artifact map, process documents, records and retention schedule.',
        trap: 'Believing every process needs a long procedure or, at the opposite extreme, believing undocumented practice is always enough.',
      },
      {
        id: '7.5.2',
        title: 'Creating and updating documented information',
        requirement: 'Use appropriate identification, description, format, media, review and approval when creating or changing documented information.',
        practice: 'Standardize owner, title, identifier, classification, version, approval, effective date and review date. Make changes traceable.',
        evidence: 'Templates, metadata, approval workflow, version history and review records.',
        trap: 'Keeping multiple uncontrolled copies with no clear approved version.',
      },
      {
        id: '7.5.3',
        title: 'Control of documented information',
        requirement: 'Ensure documents are available and suitable where needed and protected from loss of confidentiality, integrity or improper use. Control access, distribution, retrieval, storage, preservation, changes, retention, disposition and relevant external documents.',
        practice: 'Match access and retention to classification and obligations. Protect records from unauthorized alteration while allowing timely retrieval for operation and audit.',
        evidence: 'Access permissions, repository settings, backups, retention rules, disposal evidence, external-document register and access logs.',
        trap: 'Applying version control to policies but leaving risk, audit and incident records editable without an audit trail.',
      },
    ],
  },
  {
    clause: '8',
    title: 'Operation',
    purpose: 'Execute planned processes, reassess risk and deliver the treatment plan under controlled conditions.',
    memory: 'Operate the plan, reassess risk, carry out treatment.',
    lessons: [
      {
        id: '8.1',
        title: 'Operational planning and control',
        requirement: 'Plan, implement and control processes needed to meet requirements and actions. Set process criteria, operate against them, retain evidence, control planned changes, review unintended changes and control relevant externally provided processes, products or services.',
        practice: 'Turn controls into operating routines with frequency, owner, inputs, expected result, exceptions, evidence and escalation. Integrate security into supplier, change, incident and project workflows.',
        evidence: 'Operating procedures, tickets, approvals, logs, review records, supplier monitoring, exceptions and change records.',
        trap: 'Documenting a control once but not defining how often it runs or how failures are handled.',
      },
      {
        id: '8.2',
        title: 'Information security risk assessment in operation',
        requirement: 'Perform risk assessments at planned intervals and when significant changes are proposed or occur, using the criteria defined in 6.1.2. Retain results.',
        practice: 'Set an annual or more frequent cycle and event triggers such as acquisitions, major releases, new suppliers, incidents, office moves, legal changes and new data use.',
        evidence: 'Assessment calendar, trigger records, updated risk register, change-linked assessments and retained approvals.',
        trap: 'Reassessing every risk on a fixed date while missing a major business or technology change during the year.',
      },
      {
        id: '8.3',
        title: 'Information security risk treatment in operation',
        requirement: 'Implement the information security risk treatment plan and retain evidence of the results.',
        practice: 'Track each action to completion, verify the control is operating, recalculate residual risk and obtain acceptance from the authorized risk owner.',
        evidence: 'Treatment tracker, implementation artifacts, control tests, residual-risk record, acceptance and overdue-action escalation.',
        trap: 'Closing a treatment action when a tool is purchased rather than when the intended risk reduction is demonstrated.',
      },
    ],
  },
  {
    clause: '9',
    title: 'Performance evaluation',
    purpose: 'Measure the system, audit it and have management decide whether it remains suitable, adequate and effective.',
    memory: 'Monitor, audit, review.',
    lessons: [
      {
        id: '9.1',
        title: 'Monitoring, measurement, analysis and evaluation',
        requirement: 'Decide what to monitor and measure, the valid methods, when activity occurs, who performs it, when results are analyzed and who evaluates them. Retain evidence and evaluate ISMS performance and effectiveness.',
        practice: 'Use a balanced set of control-performance, risk, objective and outcome measures. Define data quality, thresholds, trend interpretation and action owners.',
        evidence: 'Metric catalogue, dashboards, source data, trend analysis, threshold breaches, decisions and retained reports.',
        trap: 'Collecting many easy metrics without defining what decision each metric supports.',
      },
      {
        id: '9.2.1',
        title: 'Internal audit: purpose',
        requirement: 'Conduct internal audits at planned intervals to determine whether the ISMS conforms to the organization’s own requirements and ISO/IEC 27001 and whether it is effectively implemented and maintained.',
        practice: 'Audit both design and operation. Follow evidence across clauses, risks, controls and business processes instead of running a document-only checklist.',
        evidence: 'Audit reports, evidence references, interview notes, samples, findings, conclusions and retained records.',
        trap: 'Using the control owner to audit their own work or equating absence of incidents with control effectiveness.',
      },
      {
        id: '9.2.2',
        title: 'Internal audit programme',
        requirement: 'Plan, establish, implement and maintain an audit programme considering process importance, changes and previous results. Define criteria and scope, select objective and impartial auditors, report to relevant management, correct issues without undue delay and retain evidence.',
        practice: 'Create a risk-based annual programme. Give higher frequency or depth to critical, changed or previously weak areas while ensuring full coverage over a justified cycle.',
        evidence: 'Audit programme, individual plans, competence and independence checks, reports, action tracking and follow-up validation.',
        trap: 'Scheduling every area equally each year without using risk, change or prior results.',
      },
      {
        id: '9.3.1',
        title: 'Management review: general',
        requirement: 'Top management reviews the ISMS at planned intervals to ensure continuing suitability, adequacy and effectiveness.',
        practice: 'Use a decision meeting, not a presentation ceremony. Provide inputs early, name decision owners and track outputs to closure.',
        evidence: 'Review schedule, agenda, attendance, decision record, minutes and action tracker.',
        trap: 'Having the security manager review the system alone and circulate slides to leadership afterward.',
      },
      {
        id: '9.3.2',
        title: 'Management review inputs',
        requirement: 'Review previous actions, relevant changes, interested-party needs, trends in nonconformities, monitoring, audit and objective results, interested-party feedback, risk and treatment status, and opportunities for improvement.',
        practice: 'Use an input pack with trends and decisions required. Explain uncertainty, overdue risk, control failures, resource needs and changing business context.',
        evidence: 'Complete input pack, source reports, risk summary, objective trends, audit status, feedback and change analysis.',
        trap: 'Reporting only positive statistics and omitting unresolved risks or changes that require leadership action.',
      },
      {
        id: '9.3.3',
        title: 'Management review results',
        requirement: 'Record decisions related to continual-improvement opportunities and any need for ISMS changes.',
        practice: 'State each decision, rationale, owner, due date and resource commitment. Link changes back to objectives, risk, documents and operations.',
        evidence: 'Approved minutes, decisions, funded actions, updated plans and closure evidence.',
        trap: 'Recording discussion but no explicit decisions, ownership or follow-up.',
      },
    ],
  },
  {
    clause: '10',
    title: 'Improvement',
    purpose: 'Strengthen the ISMS through ongoing improvement and disciplined correction of failures.',
    memory: 'Improve continually, correct causes.',
    lessons: [
      {
        id: '10.1',
        title: 'Continual improvement',
        requirement: 'Continually improve the suitability, adequacy and effectiveness of the ISMS.',
        practice: 'Use objectives, metrics, incidents, tests, audit, feedback, risk reviews and management decisions to prioritize improvements. Continual means recurring, not necessarily constant.',
        evidence: 'Improvement register, before-and-after measures, lessons learned, implemented changes and effectiveness evaluation.',
        trap: 'Treating document updates as improvement without evidence that risk, performance or usability became better.',
      },
      {
        id: '10.2',
        title: 'Nonconformity and corrective action',
        requirement: 'React to nonconformity, control and correct it, manage consequences, investigate causes and similar issues, implement needed action, review effectiveness and change the ISMS if necessary. Retain evidence of the issue, action and result.',
        practice: 'Separate correction from corrective action. Restore the failed control first, then remove or reduce the cause using evidence-based analysis and verify that recurrence risk changed.',
        evidence: 'Nonconformity record, containment, cause analysis, corrective-action plan, similar-condition review, effectiveness test and closure approval.',
        trap: 'Writing “staff reminded” as root cause and closing the issue without testing whether the real process weakness remains.',
      },
    ],
  },
];

export type AnnexControl = {
  id: string;
  title: string;
  intent: string;
  implementation: string;
  evidence: string;
};

export type AnnexControlGroup = {
  id: 'organizational' | 'people' | 'physical' | 'technological';
  code: string;
  title: string;
  memory: string;
  controls: AnnexControl[];
};

export const annexControlGroups: AnnexControlGroup[] = [
  {
    id: 'organizational',
    code: 'A.5',
    title: 'Organizational controls',
    memory: 'Govern work, assets, suppliers, incidents, continuity, obligations and assurance.',
    controls: [
      { id: '5.1', title: 'Policies for information security', intent: 'Set approved direction and rules that match business needs and risk.', implementation: 'Maintain a governing policy and relevant topic policies with owners, approval and review triggers.', evidence: 'Approved policies, version history, publication and acknowledgement records.' },
      { id: '5.2', title: 'Information security roles and responsibilities', intent: 'Make security accountability clear and appropriate to the organization.', implementation: 'Assign named owners for the ISMS, risks, controls, assets, incidents and approvals.', evidence: 'Role descriptions, responsibility matrix, committee charter and assigned records.' },
      { id: '5.3', title: 'Segregation of duties', intent: 'Reduce the chance that one person can misuse or conceal a sensitive action.', implementation: 'Separate request, approval, execution and review for high-risk activity, or add monitored compensating controls.', evidence: 'Access design, workflow approvals, conflict matrix and review logs.' },
      { id: '5.4', title: 'Management responsibilities', intent: 'Ensure personnel follow security policies and procedures.', implementation: 'Make managers accountable for communicating expectations, enabling compliance and addressing deviations.', evidence: 'Manager briefings, onboarding checklists, performance records and exception follow-up.' },
      { id: '5.5', title: 'Contact with authorities', intent: 'Maintain reliable channels with relevant legal, regulatory and emergency authorities.', implementation: 'Identify when and how to contact law enforcement, regulators, emergency services or national response bodies.', evidence: 'Contact register, notification procedure, exercised call tree and incident records.' },
      { id: '5.6', title: 'Contact with special interest groups', intent: 'Receive useful security knowledge from trusted professional communities.', implementation: 'Join relevant sector groups, security forums, vendor communities or information-sharing networks.', evidence: 'Memberships, subscriptions, meeting notes and intelligence used in decisions.' },
      { id: '5.7', title: 'Threat intelligence', intent: 'Collect and analyze threat information so decisions reflect relevant adversaries and techniques.', implementation: 'Define intelligence needs, trusted sources, analysis, distribution and links to risk, detection and vulnerability work.', evidence: 'Threat briefs, source register, tickets, detection changes and risk updates.' },
      { id: '5.8', title: 'Information security in project management', intent: 'Address security throughout projects rather than near release.', implementation: 'Add risk, security requirements, review gates, testing and acceptance criteria to project methods.', evidence: 'Project plans, risk logs, security reviews, test results and approvals.' },
      { id: '5.9', title: 'Inventory of information and other associated assets', intent: 'Know which information and supporting assets need ownership and protection.', implementation: 'Maintain an inventory with owner, location, classification, lifecycle and dependencies.', evidence: 'Asset register, discovery reports, ownership reviews and reconciliation records.' },
      { id: '5.10', title: 'Acceptable use of information and associated assets', intent: 'Define safe and permitted use of information, devices, systems and services.', implementation: 'Set clear rules for access, handling, software, personal use, sharing and prohibited behavior.', evidence: 'Acceptable-use rules, acknowledgements, technical enforcement and exception records.' },
      { id: '5.11', title: 'Return of assets', intent: 'Recover organizational assets when employment, contracts or assignments end or change.', implementation: 'Link asset return to offboarding and role-change workflows, including devices, cards, records and keys.', evidence: 'Exit checklist, asset handover, inventory update and unresolved-item escalation.' },
      { id: '5.12', title: 'Classification of information', intent: 'Apply protection according to sensitivity, criticality and obligations.', implementation: 'Define a simple classification scheme and handling expectations based on impact.', evidence: 'Classification policy, labelled repositories, data inventories and review samples.' },
      { id: '5.13', title: 'Labelling of information', intent: 'Communicate classification in a usable and consistent way.', implementation: 'Apply visible or metadata labels where they help people and systems choose correct handling.', evidence: 'Labelling procedure, system settings, sample records and quality checks.' },
      { id: '5.14', title: 'Information transfer', intent: 'Protect information sent within the organization or to external parties.', implementation: 'Set approved channels, recipient checks, encryption needs, agreements and incident handling for transfers.', evidence: 'Transfer rules, secure-channel settings, agreements, logs and sampled approvals.' },
      { id: '5.15', title: 'Access control', intent: 'Set business rules for physical and logical access based on need and risk.', implementation: 'Define least privilege, need to know, access lifecycle, conflicts, review and exception principles.', evidence: 'Access policy, role model, requests, approvals, reviews and exceptions.' },
      { id: '5.16', title: 'Identity management', intent: 'Manage identities uniquely and reliably through their full lifecycle.', implementation: 'Control creation, verification, changes, disabling, deletion and shared or service identity use.', evidence: 'Identity procedures, directory records, joiner-mover-leaver tickets and reconciliations.' },
      { id: '5.17', title: 'Authentication information', intent: 'Protect passwords, keys, tokens and other authentication secrets.', implementation: 'Issue secrets securely, require safe handling, prevent exposure and reset them after suspected compromise.', evidence: 'Authentication standard, vault settings, issuance logs, reset records and awareness material.' },
      { id: '5.18', title: 'Access rights', intent: 'Provision, review, change and remove access rights under formal control.', implementation: 'Use authorized requests, timely changes, periodic recertification and rapid removal at termination.', evidence: 'Access tickets, approval trail, review results, removal timing and exception follow-up.' },
      { id: '5.19', title: 'Information security in supplier relationships', intent: 'Manage information-security risk created by suppliers and services.', implementation: 'Tier suppliers, perform due diligence, assign owners and monitor risk through the relationship lifecycle.', evidence: 'Supplier inventory, assessments, risk ratings, approvals and monitoring records.' },
      { id: '5.20', title: 'Information security within supplier agreements', intent: 'Put relevant security responsibilities and requirements into agreements.', implementation: 'Address access, incidents, audit, subcontractors, data handling, resilience, return and exit based on risk.', evidence: 'Signed contracts, security schedules, deviations, legal review and renewal checks.' },
      { id: '5.21', title: 'Managing information security in the information and communication technology supply chain', intent: 'Address layered technology supply-chain risk, including components and subcontractors.', implementation: 'Request component transparency, secure development, vulnerability handling, provenance and change notice where relevant.', evidence: 'Supply-chain clauses, bills of materials, attestations, assessments and remediation records.' },
      { id: '5.22', title: 'Monitoring, review and change management of supplier services', intent: 'Ensure supplier security remains acceptable as performance and services change.', implementation: 'Review service reports, incidents, assurance, vulnerabilities, changes and concentration or exit risk.', evidence: 'Service reviews, assurance reports, issue logs, change notices and action tracking.' },
      { id: '5.23', title: 'Information security for use of cloud services', intent: 'Govern cloud acquisition, use, management and exit under shared responsibility.', implementation: 'Define cloud roles, approved configurations, identity, logging, data location, resilience and exit requirements.', evidence: 'Cloud policy, architecture, configuration reports, responsibility matrix and exit plan.' },
      { id: '5.24', title: 'Information security incident management planning and preparation', intent: 'Prepare roles, processes and capabilities before incidents occur.', implementation: 'Define severity, response roles, playbooks, communications, evidence handling, exercises and supplier coordination.', evidence: 'Incident plan, playbooks, contact list, exercise reports and readiness reviews.' },
      { id: '5.25', title: 'Assessment and decision on information security events', intent: 'Evaluate events consistently and decide whether they are incidents.', implementation: 'Use triage criteria, severity, ownership, escalation and recording for reported or detected events.', evidence: 'Event tickets, triage records, severity decisions and escalation timelines.' },
      { id: '5.26', title: 'Response to information security incidents', intent: 'Contain, investigate, resolve and communicate incidents effectively.', implementation: 'Follow playbooks while protecting evidence, coordinating decisions, restoring service and meeting notification duties.', evidence: 'Incident timeline, decisions, containment actions, communications and closure report.' },
      { id: '5.27', title: 'Learning from information security incidents', intent: 'Use incidents to reduce recurrence and improve detection and response.', implementation: 'Run lessons-learned reviews, identify systemic causes and assign measurable improvements.', evidence: 'Review report, improvement tickets, risk updates, control changes and effectiveness checks.' },
      { id: '5.28', title: 'Collection of evidence', intent: 'Collect and preserve evidence in a way that supports internal, legal or disciplinary needs.', implementation: 'Define authority, chain of custody, acquisition, integrity verification, secure storage and specialist support.', evidence: 'Evidence procedure, custody forms, hashes, access logs and legal guidance.' },
      { id: '5.29', title: 'Information security during disruption', intent: 'Maintain appropriate security while normal operations are disrupted.', implementation: 'Include security roles, minimum controls, exceptions and alternate processes in continuity plans.', evidence: 'Continuity plans, scenario tests, emergency access records and lessons learned.' },
      { id: '5.30', title: 'Information and communication technology readiness for business continuity', intent: 'Ensure technology can meet business continuity and recovery needs.', implementation: 'Translate business impact analysis into recovery time and recovery point objectives, architecture and tests.', evidence: 'Impact analysis, recovery plans, dependency maps, backup results and recovery exercises.' },
      { id: '5.31', title: 'Legal, statutory, regulatory and contractual requirements', intent: 'Identify, maintain and meet relevant information-security obligations.', implementation: 'Maintain an obligations register with owner, applicability, required action and change monitoring.', evidence: 'Legal register, compliance mapping, counsel advice, assessments and filings.' },
      { id: '5.32', title: 'Intellectual property rights', intent: 'Protect the organization’s and other parties’ intellectual property and respect licensing.', implementation: 'Control software licensing, proprietary materials, source code, content use and ownership terms.', evidence: 'License inventory, contracts, repository controls, notices and compliance reviews.' },
      { id: '5.33', title: 'Protection of records', intent: 'Preserve records against loss, destruction, falsification, unauthorized access and release.', implementation: 'Define classification, immutability needs, retention, legal holds, access, backup and disposal.', evidence: 'Retention schedule, repository settings, audit trails, holds and disposal certificates.' },
      { id: '5.34', title: 'Privacy and protection of personally identifiable information', intent: 'Meet privacy obligations for personally identifiable information (PII).', implementation: 'Define lawful purpose, minimization, notices, rights, sharing, retention, safeguards and incident duties.', evidence: 'Processing records, privacy assessments, notices, consent or authority records and request logs.' },
      { id: '5.35', title: 'Independent review of information security', intent: 'Obtain objective review of the security approach and its implementation.', implementation: 'Schedule competent, sufficiently independent reviews after major change and at planned intervals.', evidence: 'Review scope, independence record, report, findings and tracked actions.' },
      { id: '5.36', title: 'Compliance with information security policies, rules and standards', intent: 'Check whether people and systems follow the organization security requirements.', implementation: 'Run management reviews, technical checks, attestations and exception follow-up at planned intervals.', evidence: 'Compliance reviews, scan results, exceptions, approvals and remediation records.' },
      { id: '5.37', title: 'Documented operating procedures', intent: 'Make important operating activities consistent and repeatable.', implementation: 'Document procedures where absence would create material variation, error or loss of knowledge.', evidence: 'Approved runbooks, version history, usage records, tests and review evidence.' },
    ],
  },
  {
    id: 'people',
    code: 'A.6',
    title: 'People controls',
    memory: 'Choose, inform, support and offboard people securely.',
    controls: [
      { id: '6.1', title: 'Screening', intent: 'Assess trust and suitability before and during relevant engagement.', implementation: 'Use lawful, proportionate checks based on role risk, jurisdiction and access.', evidence: 'Screening standard, consent, provider records, completion status and exceptions.' },
      { id: '6.2', title: 'Terms and conditions of employment', intent: 'Make security responsibilities part of the employment relationship.', implementation: 'Include confidentiality, acceptable use, intellectual property, incident reporting and post-employment duties as relevant.', evidence: 'Contract templates, signed terms, role conditions and legal review.' },
      { id: '6.3', title: 'Information security awareness, education and training', intent: 'Give people the knowledge and behavior needed for their roles.', implementation: 'Provide induction, recurring awareness and role-specific education, then evaluate effectiveness.', evidence: 'Training plan, completion, assessments, simulations and improvement actions.' },
      { id: '6.4', title: 'Disciplinary process', intent: 'Apply a fair and communicated response to security-policy violations.', implementation: 'Define severity, investigation, consistency, legal and human-resources involvement, and appeal routes.', evidence: 'Disciplinary policy, awareness record, case files and consistency reviews.' },
      { id: '6.5', title: 'Responsibilities after termination or change of employment', intent: 'Maintain continuing duties and adjust access when relationships change.', implementation: 'Trigger access removal, asset return, knowledge transfer and reminders of continuing confidentiality duties.', evidence: 'Offboarding and transfer checklist, removal logs, asset return and acknowledgements.' },
      { id: '6.6', title: 'Confidentiality or non-disclosure agreements', intent: 'Define enforceable duties for confidential information.', implementation: 'Use risk-appropriate confidentiality or non-disclosure agreements (NDAs), review them and update when relationships change.', evidence: 'Signed agreements, template approval, register, review dates and exceptions.' },
      { id: '6.7', title: 'Remote working', intent: 'Protect information handled outside controlled organizational premises.', implementation: 'Set requirements for devices, connections, privacy, storage, travel, shared spaces, support and incident reporting.', evidence: 'Remote-work policy, device compliance, secure-access logs, training and exceptions.' },
      { id: '6.8', title: 'Information security event reporting', intent: 'Help people report suspected events quickly through known channels.', implementation: 'Provide simple reporting routes, examples, no-blame guidance, escalation and feedback to reporters.', evidence: 'Reporting procedure, awareness, submitted events, response times and trend analysis.' },
    ],
  },
  {
    id: 'physical',
    code: 'A.7',
    title: 'Physical controls',
    memory: 'Protect places, equipment, media and supporting infrastructure.',
    controls: [
      { id: '7.1', title: 'Physical security perimeters', intent: 'Use boundaries to protect areas containing information and processing facilities.', implementation: 'Define secure zones with walls, doors, reception, barriers and risk-appropriate separation.', evidence: 'Site plans, zone definitions, inspections, photographs and access design.' },
      { id: '7.2', title: 'Physical entry', intent: 'Allow only authorized entry to protected areas and retain suitable records.', implementation: 'Use badges, visitor controls, escorts, anti-tailgating measures and timely revocation.', evidence: 'Entry logs, badge records, visitor register, access reviews and incident reports.' },
      { id: '7.3', title: 'Securing offices, rooms and facilities', intent: 'Protect work areas according to the sensitivity and criticality within them.', implementation: 'Use locks, layout, visibility, alarms and local rules appropriate to the area.', evidence: 'Facility assessments, access lists, inspection records and corrective actions.' },
      { id: '7.4', title: 'Physical security monitoring', intent: 'Detect and deter unauthorized physical access.', implementation: 'Use guards, alarms, sensors or closed-circuit television where lawful and proportionate, with monitoring and retention.', evidence: 'Monitoring design, footage access, alarm tests, logs and privacy review.' },
      { id: '7.5', title: 'Protecting against physical and environmental threats', intent: 'Reduce damage from fire, water, temperature, weather, unrest and other hazards.', implementation: 'Assess local hazards and use detection, suppression, site choice, barriers and response plans.', evidence: 'Hazard assessment, maintenance, sensor tests, drills and insurance reviews.' },
      { id: '7.6', title: 'Working in secure areas', intent: 'Control behavior and activity inside sensitive spaces.', implementation: 'Limit knowledge and access, supervise visitors, restrict recording, and define emergency and lone-working rules.', evidence: 'Secure-area rules, authorization list, visitor records and inspection results.' },
      { id: '7.7', title: 'Clear desk and clear screen', intent: 'Prevent casual exposure or loss of sensitive information.', implementation: 'Require secure storage, screen locking, protected printing and appropriate disposal based on risk.', evidence: 'Policy, automatic-lock settings, walk-through checks and awareness records.' },
      { id: '7.8', title: 'Equipment siting and protection', intent: 'Position and protect equipment against access, damage and environmental threats.', implementation: 'Consider visibility, spills, heat, theft, interference, public access and emergency routes.', evidence: 'Site assessment, equipment layout, safeguards and inspection records.' },
      { id: '7.9', title: 'Security of assets off-premises', intent: 'Protect assets when they leave organizational premises.', implementation: 'Authorize removal, use secure transport and storage, track custody, encrypt devices and define travel precautions.', evidence: 'Asset issue record, encryption status, travel rules, custody logs and incidents.' },
      { id: '7.10', title: 'Storage media', intent: 'Manage removable and fixed media through acquisition, use, transport and disposal.', implementation: 'Inventory sensitive media, restrict use, encrypt, transport securely and sanitize before reuse or disposal.', evidence: 'Media register, encryption settings, transfer records and destruction certificates.' },
      { id: '7.11', title: 'Supporting utilities', intent: 'Protect processing facilities from power, cooling, water or communication utility failure.', implementation: 'Use capacity planning, alarms, uninterruptible power, generators, redundant feeds and maintenance as justified.', evidence: 'Utility diagrams, maintenance, capacity checks, failover tests and incidents.' },
      { id: '7.12', title: 'Cabling security', intent: 'Protect power and data cabling from interception, interference and damage.', implementation: 'Use protected routes, separation, locked termination points, labels and inspections.', evidence: 'Cable plans, access controls, inspection results and repair records.' },
      { id: '7.13', title: 'Equipment maintenance', intent: 'Keep equipment reliable without exposing information during maintenance.', implementation: 'Use authorized maintainers, schedules, secure transport, supervision and post-maintenance checks.', evidence: 'Maintenance schedule, work orders, provider authorization and return-to-service checks.' },
      { id: '7.14', title: 'Secure disposal or re-use of equipment', intent: 'Prevent information recovery from retired or reused equipment.', implementation: 'Verify sanitization or physical destruction using a method appropriate to the media and sensitivity.', evidence: 'Disposal approvals, sanitization logs, destruction certificates and inventory updates.' },
    ],
  },
  {
    id: 'technological',
    code: 'A.8',
    title: 'Technological controls',
    memory: 'Protect endpoints, identity, data, systems, networks, development and change.',
    controls: [
      { id: '8.1', title: 'User endpoint devices', intent: 'Protect information accessed, stored or processed on user devices.', implementation: 'Apply managed configuration, encryption, updates, malware protection, screen lock, backup and remote-response capability.', evidence: 'Device inventory, compliance reports, configuration baseline and exception records.' },
      { id: '8.2', title: 'Privileged access rights', intent: 'Strictly limit and monitor powerful access.', implementation: 'Use separate named accounts, least privilege, approval, time limits, multifactor authentication (MFA), session controls and review.', evidence: 'Privileged inventory, approvals, vault and session logs, reviews and revocations.' },
      { id: '8.3', title: 'Information access restriction', intent: 'Enforce access rules for information and application functions.', implementation: 'Use role or attribute rules, data filters, service checks and deny-by-default design.', evidence: 'Authorization model, configurations, test results, access logs and reviews.' },
      { id: '8.4', title: 'Access to source code', intent: 'Protect source code, development tools and libraries from unauthorized access or change.', implementation: 'Restrict repositories, protect branches, review changes, manage tokens and log administrative actions.', evidence: 'Repository permissions, branch rules, change history, access reviews and alerts.' },
      { id: '8.5', title: 'Secure authentication', intent: 'Use authentication mechanisms that resist relevant attacks.', implementation: 'Select phishing-resistant or multifactor methods where risk requires, protect sessions and rate-limit abuse.', evidence: 'Authentication architecture, settings, test results, sign-in logs and exception approvals.' },
      { id: '8.6', title: 'Capacity management', intent: 'Ensure resources meet current and expected processing needs.', implementation: 'Monitor use, forecast demand, set thresholds, test scaling and manage resource exhaustion.', evidence: 'Capacity dashboard, forecasts, alerts, load tests and scaling records.' },
      { id: '8.7', title: 'Protection against malware', intent: 'Prevent, detect and recover from malicious software.', implementation: 'Combine prevention, endpoint detection, filtering, patching, restricted execution, backups and user awareness.', evidence: 'Protection coverage, alerts, blocked events, test results and incident records.' },
      { id: '8.8', title: 'Management of technical vulnerabilities', intent: 'Identify, assess and treat technical vulnerabilities in time.', implementation: 'Maintain inventories, trusted advisories, scanning, risk-based deadlines, exceptions and remediation verification.', evidence: 'Scan reports, vulnerability tickets, service targets, exception approvals and retest results.' },
      { id: '8.9', title: 'Configuration management', intent: 'Maintain secure, known and controlled configurations.', implementation: 'Define baselines, automate deployment, approve change, detect drift and protect configuration secrets.', evidence: 'Baselines, infrastructure code, change records, compliance scans and drift alerts.' },
      { id: '8.10', title: 'Information deletion', intent: 'Delete information when it is no longer required.', implementation: 'Translate retention decisions into verified deletion across primary systems, copies, devices and suppliers.', evidence: 'Deletion rules, system jobs, tickets, supplier confirmation and validation samples.' },
      { id: '8.11', title: 'Data masking', intent: 'Limit exposure by obscuring sensitive data while preserving necessary use.', implementation: 'Use masking, tokenization or pseudonymization in displays, analytics and non-production environments.', evidence: 'Masking rules, configuration, test samples, access controls and exceptions.' },
      { id: '8.12', title: 'Data leakage prevention', intent: 'Detect and reduce unauthorized disclosure or extraction of information.', implementation: 'Combine classification, endpoint and network controls, sharing restrictions, monitoring and response.', evidence: 'Prevention rules, alerts, tuning records, investigations and coverage reviews.' },
      { id: '8.13', title: 'Information backup', intent: 'Maintain recoverable copies that meet business and security needs.', implementation: 'Define scope, frequency, isolation, encryption, retention, monitoring and restoration tests.', evidence: 'Backup policy, job reports, immutable-copy settings, restore tests and failures.' },
      { id: '8.14', title: 'Redundancy of information processing facilities', intent: 'Meet availability needs through appropriate redundancy.', implementation: 'Remove justified single points of failure and test failover across components, zones or regions.', evidence: 'Architecture, availability requirements, failover tests, monitoring and lessons learned.' },
      { id: '8.15', title: 'Logging', intent: 'Create and protect records of relevant events and activities.', implementation: 'Define required sources and fields, centralize where appropriate, restrict access, retain and review logs.', evidence: 'Logging standard, source inventory, sample events, retention settings and access logs.' },
      { id: '8.16', title: 'Monitoring activities', intent: 'Detect abnormal behavior and potential incidents through monitored systems and networks.', implementation: 'Define detection use cases, baselines, alert triage, coverage, tuning and escalation.', evidence: 'Use-case catalogue, security information and event management rules, alerts, tickets and tests.' },
      { id: '8.17', title: 'Clock synchronization', intent: 'Keep system time accurate enough for operation, investigation and evidence.', implementation: 'Use approved time sources, monitor drift, protect configuration and account for time zones.', evidence: 'Time-service configuration, drift alerts, source hierarchy and sampled timestamps.' },
      { id: '8.18', title: 'Use of privileged utility programs', intent: 'Control tools that can override normal system or application restrictions.', implementation: 'Inventory, restrict, approve, isolate and log powerful utilities; remove unnecessary tools.', evidence: 'Utility inventory, access rules, execution logs, reviews and removal records.' },
      { id: '8.19', title: 'Installation of software on operational systems', intent: 'Prevent unauthorized or unsafe software from entering production.', implementation: 'Allow approved sources and installers, restrict privileges, test software and monitor installations.', evidence: 'Approved-software list, deployment records, endpoint inventory and blocked-install alerts.' },
      { id: '8.20', title: 'Network security', intent: 'Secure networks and network devices against threats and unauthorized use.', implementation: 'Use secure architecture, hardened devices, controlled administration, filtering, monitoring and vulnerability management.', evidence: 'Network diagrams, configurations, rule reviews, monitoring and test reports.' },
      { id: '8.21', title: 'Security of network services', intent: 'Define and manage security features and service levels for network services.', implementation: 'Specify authentication, encryption, availability, monitoring, ownership and supplier requirements.', evidence: 'Service agreements, configurations, architecture, monitoring and supplier reviews.' },
      { id: '8.22', title: 'Segregation of networks', intent: 'Limit trust and movement between users, systems and service zones.', implementation: 'Separate environments by risk and enforce narrowly permitted flows with reviewed controls.', evidence: 'Zone model, firewall rules, flow approvals, tests and review records.' },
      { id: '8.23', title: 'Web filtering', intent: 'Reduce access to malicious or inappropriate web resources.', implementation: 'Use risk-based category, reputation or domain controls with secure resolution, logging and exceptions.', evidence: 'Filtering policy, configurations, blocked events, exception records and effectiveness review.' },
      { id: '8.24', title: 'Use of cryptography', intent: 'Use encryption and keys consistently to protect confidentiality, integrity and authenticity.', implementation: 'Define approved algorithms, use cases, key ownership, generation, storage, rotation, recovery and retirement.', evidence: 'Cryptography standard, key inventory, certificate records, configuration scans and rotation logs.' },
      { id: '8.25', title: 'Secure development life cycle', intent: 'Integrate security activities into every stage of system and software development.', implementation: 'Set security gates for requirements, design, coding, testing, release, maintenance and retirement.', evidence: 'Development standard, pipeline gates, design reviews, tests and release approvals.' },
      { id: '8.26', title: 'Application security requirements', intent: 'Define security and privacy needs before building or acquiring applications.', implementation: 'Derive testable requirements from risk, data, users, misuse cases, obligations and architecture.', evidence: 'Requirements, threat models, acceptance criteria, traceability and test results.' },
      { id: '8.27', title: 'Secure system architecture and engineering principles', intent: 'Apply repeatable security principles to system design and engineering.', implementation: 'Use least privilege, defense in depth, secure defaults, isolation, fail-safe behavior and reviewed patterns.', evidence: 'Architecture principles, diagrams, decisions, design reviews and exception approvals.' },
      { id: '8.28', title: 'Secure coding', intent: 'Reduce software weaknesses through safe coding practices.', implementation: 'Use language-specific standards, peer review, automated analysis, dependency controls and developer training.', evidence: 'Coding standard, review history, scan results, training and defect trends.' },
      { id: '8.29', title: 'Security testing in development and acceptance', intent: 'Find security defects before production and verify requirements are met.', implementation: 'Plan risk-based static, dynamic, dependency, abuse-case and penetration testing with remediation gates.', evidence: 'Test plan, results, defect tickets, retests, risk acceptance and release decision.' },
      { id: '8.30', title: 'Outsourced development', intent: 'Maintain security oversight when external parties develop systems or software.', implementation: 'Set requirements, review capability, control access and code, require testing, and verify delivery.', evidence: 'Contracts, supplier assessment, repository records, test results and acceptance approvals.' },
      { id: '8.31', title: 'Separation of development, test and production environments', intent: 'Prevent lower-trust activity from harming production or exposing information.', implementation: 'Separate accounts, access, networks, data, credentials and deployment authority between environments.', evidence: 'Architecture, account structure, access lists, pipeline rules and environment tests.' },
      { id: '8.32', title: 'Change management', intent: 'Assess, authorize, test and trace changes to information-processing facilities and systems.', implementation: 'Define risk-based change types, approvals, testing, rollback, emergency handling and post-change review.', evidence: 'Change tickets, approvals, test and rollback evidence, deployment logs and reviews.' },
      { id: '8.33', title: 'Test information', intent: 'Protect information used for testing.', implementation: 'Prefer synthetic data; when production-like data is justified, minimize, mask, authorize, secure and delete it.', evidence: 'Test-data procedure, approvals, masking validation, access records and deletion evidence.' },
      { id: '8.34', title: 'Protection of information systems during audit testing', intent: 'Prevent audit and assurance tests from disrupting or exposing operational systems.', implementation: 'Agree scope, timing, access, test methods, data handling, monitoring, rollback and incident contacts.', evidence: 'Test authorization, rules of engagement, access logs, results and cleanup confirmation.' },
    ],
  },
];

export const totalAnnexControls = annexControlGroups.reduce((sum, group) => sum + group.controls.length, 0);

export type QuizQuestion = {
  module: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  { module: 'Orientation', question: 'Who publishes ISO/IEC 27001?', options: ['PECB', 'ISO and IEC', 'Certification bodies', 'Accreditation bodies'], answer: 1, explanation: 'The International Organization for Standardization and the International Electrotechnical Commission jointly publish the standard. They do not certify organizations.' },
  { module: 'Orientation', question: 'Which statement is correct?', options: ['ISO certifies organizations directly', 'PECB accredits national certification bodies', 'An external certification body can certify an organization ISMS', 'Every organization implementing the standard must be certified'], answer: 2, explanation: 'Organization certification is optional and is performed by an external certification body. Accreditation provides confidence in that body competence.' },
  { module: 'Orientation', question: 'What is the main purpose of an ISMS?', options: ['Install security tools', 'Manage information-security risk systematically', 'Eliminate all incidents', 'Pass one audit'], answer: 1, explanation: 'An ISMS is a management system for governing and continually improving how information-security risk is managed.' },
  { module: 'Clauses 4 and 5', question: 'What must directly influence the ISMS scope?', options: ['Only office locations', 'Context, relevant requirements, interfaces and dependencies', 'Only the technology inventory', 'The certification body preferred scope'], answer: 1, explanation: 'Clause 4.3 requires the boundary to consider context, relevant interested-party requirements, and organizational interfaces and dependencies.' },
  { module: 'Clauses 4 and 5', question: 'Who remains accountable for ISMS effectiveness?', options: ['The external auditor', 'The security analyst', 'Top management', 'The cloud provider'], answer: 2, explanation: 'Tasks can be delegated, but top management accountability under clause 5.1 cannot be outsourced.' },
  { module: 'Clause 6', question: 'Which item belongs in the risk assessment methodology before assessments begin?', options: ['Risk acceptance criteria', 'A guarantee that all risks are low', 'A list of certification auditors', 'Only Annex A controls'], answer: 0, explanation: 'Risk acceptance and assessment criteria make results consistent, valid and comparable.' },
  { module: 'Clause 6', question: 'What must happen during risk treatment?', options: ['Select every Annex A control', 'Compare necessary controls with Annex A', 'Exclude all custom controls', 'Transfer every high risk'], answer: 1, explanation: 'The organization determines necessary controls from treatment needs, then compares them with Annex A so no necessary control has been omitted.' },
  { module: 'Clause 6', question: 'Who approves the treatment plan and accepts residual risk?', options: ['The risk owner', 'Any internal auditor', 'ISO', 'The control operator'], answer: 0, explanation: 'Clause 6.1.3 requires risk-owner approval of the treatment plan and acceptance of residual information-security risk.' },
  { module: 'Clause 6', question: 'Which is the strongest objective?', options: ['Improve security', 'Deliver awareness training', 'Reduce overdue critical vulnerability treatment from 18 percent to below 5 percent by the fourth quarter', 'Buy a scanning tool'], answer: 2, explanation: 'It is specific, measurable, time-bound and focused on an outcome rather than an activity or purchase.' },
  { module: 'Clauses 7 and 8', question: 'What demonstrates competence most strongly?', options: ['Attendance at a course only', 'A job title', 'Observed ability and evaluated work results', 'A policy acknowledgement'], answer: 2, explanation: 'Training can build competence, but its effectiveness should be evaluated using evidence that the person can perform the relevant work.' },
  { module: 'Clauses 7 and 8', question: 'When should risk assessment be repeated?', options: ['Only before certification', 'At planned intervals and after significant change', 'Only after an incident', 'Whenever an auditor requests it'], answer: 1, explanation: 'Clause 8.2 requires planned assessments and assessments when significant changes are proposed or occur.' },
  { module: 'Clauses 7 and 8', question: 'When is a treatment action truly complete?', options: ['When a purchase order is approved', 'When a policy is drafted', 'When implementation and intended risk reduction are evidenced', 'When the due date passes'], answer: 2, explanation: 'Operation requires implementation evidence. Good practice also verifies control operation and reassesses residual risk.' },
  { module: 'Clauses 9 and 10', question: 'What is the internal-audit purpose?', options: ['Guarantee no breach will occur', 'Determine conformity and effective implementation', 'Approve all residual risk', 'Replace management review'], answer: 1, explanation: 'Internal audit determines conformity with both organizational and standard requirements and whether the ISMS is effectively implemented and maintained.' },
  { module: 'Clauses 9 and 10', question: 'Which factor should shape the audit programme?', options: ['Only auditor availability', 'Process importance, changes and previous audit results', 'The alphabetical order of controls', 'Only the certification date'], answer: 1, explanation: 'A risk-based audit programme considers importance, changes and previous results while maintaining justified coverage.' },
  { module: 'Clauses 9 and 10', question: 'What is a required management-review output?', options: ['A new security product', 'Decisions on improvement opportunities and needed ISMS changes', 'An external certificate', 'A completed asset inventory'], answer: 1, explanation: 'The review records leadership decisions about improvement and changes needed to the ISMS.' },
  { module: 'Clauses 9 and 10', question: 'What separates correction from corrective action?', options: ['Correction fixes the detected issue; corrective action addresses its cause', 'They are identical', 'Corrective action is always disciplinary', 'Correction requires an external auditor'], answer: 0, explanation: 'Correction restores or fixes the immediate problem. Corrective action aims to prevent recurrence by addressing causes.' },
  { module: 'Risk and SoA', question: 'Which is the best risk statement?', options: ['Weak security', 'Ransomware', 'Because unsupported software is exposed to the internet, an attacker may exploit it and interrupt customer service for several days', 'Patch servers'], answer: 2, explanation: 'It connects a condition, threat event and business consequence, making analysis and treatment possible.' },
  { module: 'Risk and SoA', question: 'What is residual risk?', options: ['Risk before controls', 'Risk remaining after treatment', 'A control with no owner', 'An excluded Annex A control'], answer: 1, explanation: 'Residual risk is what remains after planned or implemented treatment and must be compared with acceptance criteria.' },
  { module: 'Risk and SoA', question: 'What belongs in the Statement of Applicability?', options: ['Only implemented controls', 'Necessary controls, justification, implementation status and justification for excluded Annex A controls', 'Only legal requirements', 'Every company asset'], answer: 1, explanation: 'The Statement of Applicability explains the organization control set and its relationship to Annex A.' },
  { module: 'Annex A', question: 'How many Annex A controls are in ISO/IEC 27001:2022?', options: ['14', '37', '93', '114'], answer: 2, explanation: 'The 2022 edition contains 93 controls grouped into organizational, people, physical and technological themes.' },
  { module: 'Annex A', question: 'Are all 93 Annex A controls automatically mandatory?', options: ['Yes, without exception', 'No; necessary controls are determined by risk and requirements, with exclusions justified', 'Only technological controls are mandatory', 'Only controls requested by an auditor are mandatory'], answer: 1, explanation: 'Annex A is a reference set used to check that necessary controls were not omitted. Applicability must be reasoned and documented.' },
  { module: 'Evidence', question: 'Which is a record rather than a policy?', options: ['Information security policy', 'Access-control standard', 'Completed quarterly access review', 'Risk assessment methodology'], answer: 2, explanation: 'A completed review is retained evidence of an activity and its result. Policies and methods are maintained guidance.' },
  { module: 'Audit', question: 'Which evidence is most persuasive for an operating control?', options: ['A policy statement alone', 'A process owner assurance', 'A representative sample of dated approvals, logs and exceptions', 'A future implementation plan'], answer: 2, explanation: 'Operating effectiveness is supported by objective evidence that the control ran consistently over the period.' },
  { module: 'Audit', question: 'What makes an audit finding defensible?', options: ['Auditor opinion alone', 'Criteria, condition, evidence and consequence stated clearly', 'A large report', 'A control title without a sample'], answer: 1, explanation: 'A finding should connect the applicable requirement with observed evidence and explain the resulting risk or consequence.' },
];

export const interviewQuestions = [
  { question: 'What is ISO/IEC 27001?', answer: 'A certifiable requirements standard for establishing, implementing, maintaining and continually improving an Information Security Management System using a risk-based approach.' },
  { question: 'What is the difference between ISO/IEC 27001 and ISO/IEC 27002?', answer: 'ISO/IEC 27001 contains requirements and can be used for organization certification. ISO/IEC 27002 provides detailed guidance for information-security controls and is not the organization-certification requirements standard.' },
  { question: 'What is the difference between certification and accreditation?', answer: 'Certification is an independent statement that an organization management system conforms to specified requirements. Accreditation is independent recognition that the certification body is competent and impartial to perform that certification.' },
  { question: 'How do clauses and Annex A differ?', answer: 'Clauses 4 through 10 are management-system requirements. Annex A is a reference set of controls used during treatment to check that necessary controls were not omitted. The Statement of Applicability records the selected control set.' },
  { question: 'How would you write a useful information-security risk?', answer: 'I would connect an in-scope asset or process, a threat or cause, a vulnerability or condition, and a business consequence, then assign an owner and assess likelihood and impact using approved criteria.' },
  { question: 'What are the common risk treatment options?', answer: 'Avoid the activity, modify the likelihood or consequence, share the risk through contracts or insurance, or retain the risk through authorized acceptance.' },
  { question: 'What is a Statement of Applicability?', answer: 'It is the controlled record of necessary information-security controls, why they are included, whether they are implemented, and why any Annex A control is excluded.' },
  { question: 'How do you test a control?', answer: 'Understand its objective and design, identify the expected evidence, select a representative sample across the review period, inspect or reperform the control, record exceptions and conclude against defined criteria.' },
  { question: 'What is the difference between inherent and residual risk?', answer: 'Inherent risk is the exposure before considering treatment or controls. Residual risk is what remains after treatment and must be compared with acceptance criteria.' },
  { question: 'What should management review achieve?', answer: 'Top management should evaluate whether the ISMS remains suitable, adequate and effective, and make documented decisions about improvements, changes, resources, objectives and risk.' },
  { question: 'What is a nonconformity?', answer: 'Failure to meet a requirement. The requirement may come from ISO/IEC 27001, the organization’s own ISMS, law, contract or another adopted criterion.' },
  { question: 'How do correction and corrective action differ?', answer: 'Correction fixes or contains the observed problem. Corrective action addresses causes and is tested to reduce recurrence.' },
];

export const practicalExercises = [
  { title: 'Context interview', output: 'One-page context and interested-party register', task: 'Interview an imaginary chief executive, engineer, customer and regulator. Record only issues and requirements that change the ISMS.' },
  { title: 'Scope boundary test', output: 'Scope statement and dependency diagram', task: 'Write a precise scope for a cloud service. Try to identify one supplier or shared service that your first boundary accidentally hid.' },
  { title: 'Risk workshop', output: 'Five scored risk scenarios', task: 'Create confidentiality, integrity and availability scenarios. Assign risk owners and explain each likelihood and impact score.' },
  { title: 'Treatment and SoA', output: 'Treatment plan and ten-row Statement of Applicability', task: 'Choose treatment options, identify necessary controls, compare them with Annex A and obtain fictional residual-risk acceptance.' },
  { title: 'Control operating design', output: 'Three control procedures', task: 'For access review, backup restoration and supplier monitoring, define owner, frequency, inputs, steps, exceptions and retained evidence.' },
  { title: 'Evidence walk-through', output: 'Evidence request list and sample conclusion', task: 'Choose one control, request design and operating evidence, sample three instances and state whether the evidence is sufficient.' },
  { title: 'Internal audit', output: 'Audit plan, two findings and report', task: 'Audit clauses 6.1.2, 8.2 and 9.1. Write criteria, sample, evidence, condition, consequence and conclusion.' },
  { title: 'Management review', output: 'Decision-focused review pack', task: 'Summarize context changes, objectives, audit, risk, incidents and improvements. Ask leadership for three explicit decisions.' },
];

export const capstoneDeliverables = [
  'Organization profile, services, context and interested-party register',
  'Approved ISMS scope statement and dependency map',
  'Information-security policy, roles and governance calendar',
  'Risk assessment and risk treatment methodology with acceptance criteria',
  'Asset register and information-classification scheme',
  'Risk register with at least ten realistic scenarios and named owners',
  'Risk treatment plan with resources, due dates and residual-risk decisions',
  'Statement of Applicability covering all 93 Annex A controls',
  'Three topic policies and three operating procedures',
  'Objectives, measures and one month of fictional performance evidence',
  'Internal-audit programme, audit report and corrective-action record',
  'Management-review pack, decisions and continual-improvement register',
];

export const sourceLinks = [
  { label: 'ISO/IEC 27001:2022 overview', detail: 'Official standard page and management-system explanation', url: 'https://www.iso.org/standard/27001' },
  { label: 'ISO management system standards', detail: 'Official explanation that ISO does not perform certification', url: 'https://www.iso.org/management-system-standards.html' },
  { label: 'ISO/IEC 27002:2022', detail: 'Official control guidance standard overview', url: 'https://www.iso.org/standard/75652.html' },
  { label: 'ISO/IEC 27005:2022', detail: 'Official guidance on information-security risk management', url: 'https://www.iso.org/standard/80585.html' },
  { label: 'ISO 19011:2026', detail: 'Official guidance for auditing management systems', url: 'https://www.iso.org/standard/19011' },
  { label: 'International Accreditation Forum recognized bodies', detail: 'Find recognized accreditation bodies and scopes', url: 'https://iaf.nu/en/recognised-abs/' },
  { label: 'PECB ISO/IEC 27001 Foundation', detail: 'Current learning objectives, prerequisites and certificate requirements', url: 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation' },
  { label: 'PECB Foundation Candidate Handbook', detail: 'Current exam domains, format and programme rules', url: 'https://pecb.com/pdf/candidate-handbooks/pecb-candidate-handbook-iso-27001-2022-foundation.pdf' },
];
