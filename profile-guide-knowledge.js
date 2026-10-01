import { projects as featured } from './profile-data.js';
import { galleryProjects, digitizationProjects } from './gallery-projects.js';

// A local, curated guide, not an LLM. Reuse project facts instead of maintaining a second CV.
const projects = { ...featured, ...galleryProjects, ...digitizationProjects };
const link = (label, href) => ({label, href});
const projectLink = id => ({label: projects[id].title, project: id});
const cv = {label: 'Download CV', href: 'assets/harshal-patil-cv.pdf', download: 'Harshal-Patil-CV.pdf'};
const contact = link('Contact Harshal', '#contact');
const normalize = value => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\.net\b/g, ' dotnet ').replace(/c#/g, ' csharp ').replace(/[^a-z0-9]+/g, ' ').trim();
const has = (q, phrase) => (` ${q} `).includes(` ${normalize(phrase)} `);
const any = (q, phrases) => phrases.some(phrase => has(q, phrase));
const result = (text, actions = [], source = 'Profile & CV', topic = null) => ({text, actions, source, topic});
const aliases = {
  revora: ['revora', 'growth os'], presso: ['presso24', 'presso', 'laundry'],
  authoring: ['template', 'templates', 'authoring', 'big four', 'big 4'],
  migration: ['migration', 'resettlement'], clinic: ['clinicshark', 'scribing'],
  trackon: ['trackon', 'attendance', 'geofencing'], lending: ['loan', 'loans', 'lending'],
  ehr: ['ehr', 'electronic health records', 'nursing'], etl: ['etl', 'data mapping', 'service bus'],
  search: ['global search', 'enterprise search', 'ai search'], vitalscan: ['vitalscan', 'zkare', 'diagnostics'],
  fintasense: ['fintasense', 'portfolio optimization'], dvr: ['dvr', 'dvr ai', 'jetson', 'edge vision'],
  business: ['sitestock', 'signads', 'construction', 'signage'],
  scanning: ['scanning', 'scan', 'digitization', 'digitalization'], documents: ['dms', 'document management']
};

function describeProject(id, q) {
  const p = projects[id];
  let text = `${p.title}\n${p.intro}`;
  if (any(q, ['stack', 'tech', 'technology', 'technologies', 'built with'])) text += `\n\nTechnologies / focus: ${p.tags.join(', ')}.`;
  else if (any(q, ['results', 'outcome', 'impact', 'metrics', 'performance'])) text += `\n\n${p.outcome || p.scope || 'No quantified outcome is listed in the profile.'}`;
  else text += `\n\n${p.points.slice(0,2).join('\n')}`;
  return result(text, [projectLink(id), contact], 'Project details · '+p.title, id);
}

export function answerQuestion(question, previousTopic = null) {
  const q = normalize(String(question).slice(0,400));
  if (!q) return result('Ask me about Harshal’s skills, experience, projects, or CV.');
  if (any(q, ['price', 'pricing', 'rate', 'rates', 'cost', 'budget', 'quote', 'how much', 'salary']))
    return result('Rates and project quotes aren’t listed in this profile. Share your scope, expected deliverables, and target timeline with Harshal for a specific estimate.', [contact]);
  if (any(q, ['available', 'availability', 'start date', 'tomorrow', 'next week', 'hire']))
    return result('The profile lists Harshal as available for freelance projects, with individual and team delivery options. Please confirm his current start date and capacity directly with him.', [contact, link('Meet the team', '#team')]);
  if (any(q, ['contact', 'email', 'phone', 'whatsapp', 'get in touch', 'reach him', 'reach harshal', 'talk to harshal', 'book a call']))
    return result('You can reach Harshal at harshal.rpatil5@gmail.com or +91 84548 26644. He is based in Mumbai (IST), with overlap for US East mornings and the UK/EU working day.', [link('Email Harshal', 'mailto:harshal.rpatil5@gmail.com'), link('WhatsApp', 'https://wa.me/918454826644?text=Hi%20Harshal%21%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.%20Could%20we%20connect%20to%20talk%20about%20the%20scope%2C%20timeline%2C%20and%20how%20we%20can%20work%20together%3F'), contact], 'Contact section');
  if (any(q, ['cv', 'resume', 'curriculum vitae']))
    return result('Here’s Harshal’s downloadable freelance CV. It covers his experience, projects, technology stack, and engagement options.', [cv, link('View CV section', '#cv')], 'Attached freelance CV');
  if (any(q, ['certified', 'certification', 'certifications', 'ai 102', 'az 305']))
    return result('Microsoft AI-102 and AZ-305 are listed as in progress. The profile does not claim these certifications are complete.', [link('View toolkit', '#toolkit')]);
  const matches = Object.entries(aliases).filter(([,names]) => any(q,names)).map(([id]) => id);
  if (matches.length === 1) return describeProject(matches[0],q);
  if (matches.length > 1) return result(matches.slice(0,3).map(id => `${projects[id].title}\n${projects[id].intro}`).join('\n\n'), matches.slice(0,3).map(projectLink), 'Project details');
  if (projects[previousTopic] && any(q, ['tell me more', 'more details', 'what stack', 'tech stack', 'which technologies', 'what technology', 'what were the results', 'what was the outcome'])) return describeProject(previousTopic,q);
  if (any(q, ['team', 'bit2sky', 'company', 'collaborators', 'us contract', 'contracting']))
    return result('Bit2Sky started in 2017. Work directly with Harshal for focused engineering assignments, or through Bit2Sky India for full builds. Team composition depends on the engagement. US contracting is also available through Bit2Sky Inc. USA.', [link('Meet the team', '#team'), contact], 'Team section');
  if (any(q, ['experience', 'journey', 'career', 'years', 'background', 'who is harshal', 'about harshal']))
    return result('Harshal is a solution engineer and two-time co-founder with 13+ years of experience. His work spans enterprise document systems, .NET and Angular platforms, Azure integration, Flutter products, and AI agents.\n\nThe year-by-year journey highlights the 2012 beginning, Bit2Sky starting in 2017, and Revora in 2026. You can also explore five engineering focus areas.', [link('Explore the journey', '#journey'), cv]);
  if (any(q, ['ai', 'agents', 'llm', 'automation', 'chatbot', 'chat bot']))
    return result('His AI work includes Revora’s marketing and sales agents, ClinicShark’s medical scribing, and TrackOn’s on-device face recognition. Revora includes tools, human approvals, and audit trails.', ['revora','clinic','trackon'].map(projectLink), 'AI project details');
  if (any(q, ['azure', 'cloud', 'modernization', 'modernize', 'serverless']))
    return result('Harshal works with Azure Functions, Service Bus, Document Intelligence, and cloud application backends. Relevant work includes migration management and event-driven data mapping.', ['migration','etl'].map(projectLink), 'Cloud project details');
  if (any(q, ['mobile', 'flutter', 'ios', 'android', 'app', 'apps']))
    return result('His mobile work uses Flutter across iOS and Android: Presso24 for laundry services, ClinicShark for clinicians, and TrackOn for attendance. ClinicShark’s iOS releases are through TestFlight.', ['presso','clinic','trackon'].map(projectLink), 'Mobile project details');
  if (any(q, ['healthcare', 'medical', 'health']))
    return result('Healthcare work includes ClinicShark medical scribing, an electronic health record platform, and VitalScan / ZKare diagnostics.', ['clinic','ehr','vitalscan'].map(projectLink), 'Healthcare project details');
  if (any(q, ['skills', 'stack', 'technologies', 'technology', 'dotnet', 'csharp', 'angular', 'backend', 'frontend', 'sql']))
    return result('Core stack: C#, .NET, ASP.NET Core, Angular, and TypeScript. Cloud and data: Azure, SQL Server, PostgreSQL, and Redis. Mobile and AI: Flutter, TFLite, LLM agents, and Azure AI services.', [link('Explore the toolkit', '#toolkit'), projectLink('authoring')], 'Toolkit & project details');
  if (any(q, ['services', 'help', 'build', 'offer', 'freelance', 'work together', 'what can he do']))
    return result('Harshal helps with three areas:\n• Building products and AI agents across web, mobile, and cloud.\n• Modernizing .NET systems and improving performance.\n• Senior engineering support, architecture reviews, and team extension.', [link('Explore services', '#services'), contact], 'Services section');
  if (any(q, ['project', 'projects', 'portfolio', 'work', 'recommend', 'explore']))
    return result('Start with Revora for AI agents, Presso24 for a live consumer product, or the template-authoring platform for enterprise engineering. Scanning and DMS work has its own dedicated section.', [projectLink('revora'), projectLink('presso'), projectLink('authoring'), link('Scanning & DMS', 'gallery.html#documents')], 'Selected work');
  if (any(q, ['location', 'where', 'timezone', 'time zone', 'mumbai', 'remote']))
    return result('Harshal is based in Mumbai, India (IST). His profile lists overlap with US East mornings and the UK/EU day. Discuss any location or on-site requirements with him.', [contact], 'Contact section');
  if (any(q, ['hello', 'hi', 'hey', 'thanks', 'thank you']))
    return result('Happy to help. Ask about Harshal’s projects, skills, or experience—or grab his CV.', [link('Selected work', '#work'), cv]);
  return result('I don’t have that detail in this profile. I can help with Harshal’s experience, skills, projects, team, and CV. For anything specific to your project, it’s best to ask him directly.', [contact, cv], 'Profile guide');
}
