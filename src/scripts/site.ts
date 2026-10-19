import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

const readPreference = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const writePreference = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Browser storage is optional. */ } };
let sound = readPreference('portfolio-sound') === 'on';
let reduce = readPreference('portfolio-motion') === 'reduce';
let returnFocus: HTMLElement | null = null;
let afterSwap = false;
let navigationFromKeyboard = false;
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const isReduced = () => reduce || systemMotion.matches;

async function feedback(kind: 'select' | 'confirm') {
  if (!sound) return;
  try { const { playTone } = await import('./audio'); await playTone(kind); } catch { /* Unsupported or blocked audio does not affect navigation. */ }
}
function syncPreferences() {
  document.documentElement.dataset.motion = reduce ? 'reduce' : 'system';
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach(button=>{
    button.setAttribute('aria-pressed', String(sound));
    button.setAttribute('aria-label', `Sound: ${sound ? 'on' : 'off'}`);
  });
  document.querySelectorAll('[data-sound-label]').forEach(label=>{label.textContent=`SOUND ${sound?'ON':'OFF'}`;});
  document.querySelectorAll<HTMLInputElement>('[data-sound-input]').forEach(input=>{input.checked=sound;});
  document.querySelectorAll<HTMLInputElement>('[data-motion-input]').forEach(input=>{input.checked=reduce;});
  if (isReduced()) document.getAnimations().forEach(animation=>animation.finish());
}
function closeMenu(restoreFocus = false) {
  const menu = document.querySelector<HTMLElement>('#mobile-menu');
  const button = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (!menu || !button || menu.hidden) return;
  menu.hidden=true;button.setAttribute('aria-expanded','false');
  if(restoreFocus) button.focus();
}
function setupPage() {
  document.documentElement.classList.add('has-js');
  syncPreferences();
  const dialog=document.querySelector<HTMLDialogElement>('.settings-dialog');
  if(dialog && !dialog.dataset.bound) {
  dialog.dataset.bound='true';
  dialog.addEventListener('close',()=>{
    const target=returnFocus?.getClientRects().length ? returnFocus : document.querySelector<HTMLElement>('[data-menu-toggle]');
    target?.focus();
  });
  }
  if(location.hash) {
    const originalHash=location.hash;
    let id=originalHash.slice(1);
    try { id=decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
    void document.fonts.ready.then(()=>requestAnimationFrame(()=>{
      if(location.hash===originalHash) document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});
    }));
  }
  if(afterSwap) {
    if(!location.hash) document.querySelector<HTMLElement>('#main')?.focus({preventScroll:true});
    afterSwap=false;
  }
}
document.addEventListener('astro:before-swap',(event)=>{
  const swap=event as TransitionBeforeSwapEvent;
  swap.newDocument.documentElement.dataset.motion=reduce?'reduce':'system';
  swap.newDocument.documentElement.classList.add('has-js');
  afterSwap=true;
});
document.addEventListener('astro:page-load',setupPage);
systemMotion.addEventListener('change',syncPreferences);
document.addEventListener('keydown',(event)=>{
  navigationFromKeyboard=true;
  if(event.key==='Escape') { closeMenu(true); return; }
  const target=event.target;
  if(!(target instanceof HTMLElement)) return;
  const group=target.closest<HTMLElement>('[data-key-list]');
  if(!group || !['ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
  const links=[...group.querySelectorAll<HTMLElement>('a[href],button')].filter(item=>item.getClientRects().length>0);
  const index=links.indexOf(target);
  if(index<0 || !links.length) return;
  event.preventDefault();
  const next=event.key==='Home'?0:event.key==='End'?links.length-1:(index+(event.key==='ArrowDown'?1:-1)+links.length)%links.length;
  links[next]?.focus();
  void feedback('select');
});
document.addEventListener('pointerdown',()=>{navigationFromKeyboard=false;},{passive:true});
document.addEventListener('click',(event)=>{
  const target=event.target instanceof Element ? event.target : null;
  if(!target) return;
  const menuButton=target.closest('[data-menu-toggle]');
  if(menuButton) {
    const menu=document.querySelector<HTMLElement>('#mobile-menu');
    if(menu) {const show=menu.hidden;menu.hidden=!show;menuButton.setAttribute('aria-expanded',String(show));if(show) menu.querySelector<HTMLElement>('a')?.focus();}
    void feedback('select');return;
  }
  if(target.closest('[data-settings-open]')) {
    returnFocus=target.closest<HTMLElement>('[data-settings-open]');
    closeMenu();document.querySelector<HTMLDialogElement>('.settings-dialog')?.showModal();void feedback('confirm');return;
  }
  if(target.closest('[data-settings-close]')) {document.querySelector<HTMLDialogElement>('.settings-dialog')?.close();void feedback('select');return;}
  if(target.closest('[data-sound-toggle]')) {
    sound=!sound;writePreference('portfolio-sound',sound?'on':'off');syncPreferences();if(sound) void feedback('confirm');return;
  }
  if(target.closest('a[href]')) {closeMenu();void feedback('confirm');}
  else if(target.closest('[data-preview]')) void feedback('select');
});
document.addEventListener('change',(event)=>{
  const input=event.target;
  if(!(input instanceof HTMLInputElement)) return;
  if(input.matches('[data-sound-input]')) {sound=input.checked;writePreference('portfolio-sound',sound?'on':'off');syncPreferences();if(sound) void feedback('confirm');}
  if(input.matches('[data-motion-input]')) {reduce=input.checked;writePreference('portfolio-motion',reduce?'reduce':'system');syncPreferences();void feedback('select');}
});
document.addEventListener('focusin',(event)=>{
  const target=event.target;
  if(navigationFromKeyboard && target instanceof Element && target.matches('.hero-menu-link')) {
    document.querySelectorAll('.hero-menu-link').forEach(link=>link.classList.toggle('is-highlighted',link===target));
  }
});
setupPage();
