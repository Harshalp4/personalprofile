import { answerQuestion } from './profile-guide-knowledge.js';

const dialog = document.querySelector('#profile-chat');
const log = document.querySelector('#chat-messages');
const input = document.querySelector('#chat-question');
const launcher = document.querySelector('#chat-launcher');
let previousTopic = null;
let returnFocus = launcher;

function addMessage(role, text, answer = null, welcome = false) {
  const article = document.createElement('article');
  article.className = 'chat-message '+role;
  const speaker = document.createElement('span');
  speaker.className = 'chat-speaker';
  speaker.textContent = role === 'user' ? 'You' : 'Profile guide';
  article.append(speaker);
  if (welcome) {
    const img = document.createElement('img');
    img.src = 'assets/profile-guide.webp'; img.alt = 'A friendly clay robot waves hello';
    img.width = 94; img.height = 94; img.className = 'chat-welcome-art'; article.append(img);
  }
  const p = document.createElement('p'); p.textContent = text; article.append(p);
  if (answer?.actions?.length) {
    const links = document.createElement('div'); links.className = 'chat-links';
    for (const action of answer.actions) {
      const localProject = action.project && document.querySelector(`[data-project="${action.project}"]`);
      const el = document.createElement(localProject ? 'button' : 'a');
      el.textContent = action.label;
      if (localProject) {
        el.type = 'button';
        el.addEventListener('click', () => {
          const trigger = document.querySelector(`[data-project="${action.project}"]`);
          if (!trigger) return;
          const disclosure = trigger.closest('details');
          if (disclosure) disclosure.open = true;
          returnFocus = trigger;
          dialog.close();
          trigger.focus({preventScroll:true});
          trigger.click();
        });
      } else {
        const destination = action.project ? 'gallery.html?project='+encodeURIComponent(action.project) : action.href;
        el.href = destination;
        if (action.download) el.download = action.download;
        if (destination.startsWith('https:')) {el.target = '_blank'; el.rel = 'noopener noreferrer';}
        if (destination.startsWith('#')) el.addEventListener('click', () => {
          const target = document.querySelector(destination);
          if (target?.tagName === 'DETAILS') target.open = true;
          // Focus the destination after closing, so keyboard users can continue there.
          if (target) {target.tabIndex = -1; returnFocus = target;}
          dialog.close();
        });
      }
      links.append(el);
    }
    article.append(links);
  }
  if (answer?.source) {
    const source = document.createElement('span'); source.className = 'chat-source';
    source.textContent = 'From: '+answer.source; article.append(source);
  }
  log.append(article);
  // Keep long conversations bounded; no localStorage or network calls.
  while (log.children.length > 40) log.firstElementChild.remove();
  log.scrollTop = log.scrollHeight;
}

function reset() {
  previousTopic = null;
  log.replaceChildren();
  addMessage('assistant', 'Hi! I’m your guide to Harshal’s work. Ask about his experience, explore a project, or find the best way to get in touch.', null, true);
  input.value = '';
  log.scrollTop = 0;
}
function submit(question) {
  const value = question.trim().slice(0,400);
  if (!value) return;
  addMessage('user', value);
  const answer = answerQuestion(value, previousTopic);
  previousTopic = answer.topic;
  addMessage('assistant', answer.text, answer);
  input.value = '';
  input.focus({preventScroll:true});
  log.scrollTop = log.scrollHeight;
}
document.querySelectorAll('[data-open-chat]').forEach(button => button.addEventListener('click', () => {
  returnFocus = button;
  dialog.showModal();
  input.focus({preventScroll:true});
  if (button.dataset.chatQuestion) submit(button.dataset.chatQuestion);
}));
document.querySelector('#chat-form').addEventListener('submit', event => {event.preventDefault(); submit(input.value);});
document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => submit(button.dataset.question)));
dialog.querySelector('.chat-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => returnFocus?.focus({preventScroll:true}));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
document.querySelector('#chat-clear').addEventListener('click', () => {reset();input.focus({preventScroll:true});});
reset();
launcher.hidden = false;
