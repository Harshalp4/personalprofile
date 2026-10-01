// Project links from the profile guide open the matching gallery detail dialog.
import './gallery-page.js';
const requested = new URLSearchParams(location.search).get('project');
const button = [...document.querySelectorAll('[data-project]')].find(item => item.dataset.project === requested);
if (button) {
  document.querySelector('[data-filter="all"]')?.click();
  button.scrollIntoView({block:'center', behavior:'instant'});
  button.focus({preventScroll:true});
  button.click();
}
