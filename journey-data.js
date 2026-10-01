// Add dated milestones only when their year is confirmed.
export const firstYear = 2012;
export const lastYear = 2026;
export const years = Array.from({length:lastYear-firstYear+1}, (_,i)=>firstYear+i);
export const milestones = {
  2012: {
    title: 'Where it started.', label: 'The beginning',
    text: 'The start of Harshal’s software-engineering journey, building the foundations for the work that followed.',
    image: 'assets/studio-hero.webp', alt: 'Illustrated engineer at a desk with a laptop',
    tags: ['Engineering foundations'], action: 'Explore the work', href: '#work',
    source: 'Start year retained from the existing profile.'
  },
  2017: {
    title: 'Bit2Sky begins.', label: 'A company milestone',
    text: 'Bit2Sky started in 2017. Today, Bit2Sky India is a delivery route for full product builds and larger engagements.',
    image: 'assets/team-collaboration.webp', alt: 'Illustrated collaborators building software together',
    tags: ['Bit2Sky', 'Started in 2017'], action: 'Meet the team', href: '#team',
    source: 'Bit2Sky start year supplied by Harshal.'
  },
  2026: {
    title: 'From software to AI agents.', label: 'Revora · founder & architect',
    text: 'Revora brings marketing and sales agents to local service businesses, connecting WhatsApp, campaign research, creative work, and reporting.',
    image: 'assets/revora-agents.webp', alt: 'Connected AI tools for messages, approvals, and creative work',
    tags: ['AI agents', 'Revora', 'In rollout'], action: 'Explore Revora', project: 'revora',
    source: 'Revora is dated 2026 in the CV.'
  }
};
export function getYearStory(year) {
  if (milestones[year]) return {year, confirmed:true, ...milestones[year]};
  const previous = years.filter(y=>y<year && milestones[y]).at(-1);
  const next = years.find(y=>y>year && milestones[y]);
  return {
    year, confirmed:false, label:'Between milestones', title:'More of the story to tell.',
    text:`A specific milestone for ${year} hasn’t been added to this timeline yet. Explore the full portfolio for the work across these years.`,
    image:'assets/career-path.webp', alt:'A winding path through software, cloud, and product milestones',
    tags:[], action:'Explore the portfolio', href:'gallery.html', previous, next
  };
}
