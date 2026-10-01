export const projects = {
  revora: {
    title: 'Revora — AI growth OS', type: 'Founder & architect · 2026',
    intro: 'A multi-tenant platform where AI agents run marketing and sales for local service businesses.',
    points: ['WhatsApp sales agents, a shared inbox, shadow mode, and escalation rules.', 'Research, campaign, creative, review, and AI CMO agents with scheduled publishing and reports.', 'An Approval Centre, role-based access, encrypted secrets, and a full audit log.'],
    outcome: 'First tenant: a Navi Mumbai laundry chain, in rollout.',
    tags: ['.NET 10', 'Angular 22', 'PostgreSQL', 'Redis', 'Hangfire', 'LLM agents']
  },
  presso: {
    title: 'Presso24 — on-demand laundry', type: 'Technology partner · live product',
    intro: 'Built and run the consumer app serving Navi Mumbai, with Flutter apps for iOS and Android.',
    points: ['WhatsApp OTP login and consumer ordering.', 'A .NET and Azure backend for the product.', 'Cohort analytics with Mixpanel to understand customer behavior.'],
    outcome: '150+ orders per month · 80% repeat rate.',
    tags: ['Flutter', '.NET', 'Azure', 'WhatsApp Business API', 'Mixpanel']
  },
  authoring: {
    title: 'Template authoring platform', type: 'Enterprise project · Big Four firm',
    intro: 'Hierarchical templates with a drag-and-drop canvas, synchronized tree view, and rule engine.',
    points: ['Angular 19 interfaces with .NET 8 APIs.', 'Incremental retrieval and hierarchical lazy loading for large templates.', 'Redis caching and Azure Functions for supporting workflows.'],
    outcome: 'About 60% faster large-template loads.',
    tags: ['Angular 19', '.NET 8', 'SQL Server', 'Redis', 'Azure Functions']
  },
  migration: {
    title: 'Cloud migration management', type: 'Enterprise project · Azure',
    intro: 'Registration, verification, appointment, and resettlement modules with automated document extraction.',
    points: ['Document Intelligence for extracting information from files.', 'Azure Service Bus for asynchronous workflows.', 'Azure AD B2C sign-in across the platform.'],
    outcome: 'Connected document processing and operational workflows in one platform.',
    tags: ['Angular', 'ASP.NET Core', 'Service Bus', 'Document Intelligence', 'Azure AD B2C']
  },
  clinic: {
    title: 'ClinicShark — AI medical scribing', type: 'Product · Azure and iOS TestFlight',
    intro: 'A medical scribing app for clinicians, built on ABP Commercial, .NET, Flutter, and Azure.',
    points: ['A shared application foundation using ABP Commercial and .NET.', 'A Flutter mobile experience for clinicians.', 'Azure deployment and iOS releases through TestFlight.'],
    outcome: 'Deployed on Azure, with iOS releases through TestFlight.',
    tags: ['ABP Commercial', '.NET', 'Flutter', 'Azure']
  },
  trackon: {
    title: 'TrackOn — attendance on device', type: 'Product · iOS and Android',
    intro: 'Face-recognition attendance with multi-angle registration and geofencing.',
    points: ['On-device recognition using MobileFaceNet and TFLite.', 'Multi-angle registration for the attendance workflow.', 'A Flutter application for iOS and Android.'],
    outcome: 'Recognition runs on the device.',
    tags: ['Flutter', 'MobileFaceNet', 'TFLite', 'Geofencing']
  }
};

export const chapters = [
  { id:'foundations', label:'Core engineering', marker:'2012', title:'Building the foundations.', subtitle:'C# · ASP.NET · SQL',
    text:'Document management and regulated scanning systems for organizations including HAL, Pune Municipal Corporation, MDIndia, and EMH Cranes.',
    details:['C# and ASP.NET applications','SQL Server and Oracle data systems','Document management and scanning workflows'], tags:['C#','ASP.NET','SQL Server','Oracle'], date:'2012 · where it started' },
  { id:'enterprise', label:'Enterprise systems', marker:'02', title:'Making complexity usable.', subtitle:'Platforms · workflows · performance',
    text:'Enterprise platforms spanning template authoring, electronic health records, global search, and loan workflows.',
    details:['About 60% faster large-template loads','Role-based EHR modules, e-signature, and chat','Search across databases, files, and cloud storage'], tags:['Angular','.NET','Redis','Azure AI Search'], date:'Career highlight' },
  { id:'cloud', label:'Cloud & integration', marker:'03', title:'Connecting the moving parts.', subtitle:'Azure · event-driven systems',
    text:'Cloud migration, document extraction, and serverless ETL, alongside incremental modernization of live ASP.NET workflows.',
    details:['Azure Functions and Service Bus','Document Intelligence and automated extraction','Reusable microservice operations and integrations'], tags:['Azure Functions','Service Bus','Document Intelligence'], date:'Career highlight' },
  { id:'products', label:'Products & mobile', marker:'04', title:'Owning the product, too.', subtitle:'Co-founder · technology partner · builder',
    text:'Building and running products brings a practical view of cost, adoption, and support. The portfolio spans consumer services, healthcare, attendance, and edge vision.',
    details:['Presso24: 150+ monthly orders, 80% repeat rate','ClinicShark: Azure deployment and iOS TestFlight','TrackOn: on-device recognition for iOS and Android'], tags:['Flutter','.NET','Azure','TFLite'], date:'Career highlight' },
  { id:'ai', label:'AI agents · 2026', marker:'2026', title:'From software to agents that act.', subtitle:'Revora · founder & architect',
    text:'Revora brings marketing and sales agents to local service businesses, connecting WhatsApp, campaign research, creative production, and reporting.',
    details:['First tenant in rollout in Navi Mumbai','Tools, approvals, audit trails, and cost awareness','Provider-agnostic AI with human approval gates'], tags:['LLM agents','.NET 10','Angular 22','PostgreSQL'], date:'2026 · current focus' }
];
