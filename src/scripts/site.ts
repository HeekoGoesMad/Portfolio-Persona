import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

const readPreference = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const writePreference = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Browser storage is optional. */ } };
let sound = readPreference('portfolio-sound') === 'on';
let music = false;
let musicRequest=0;
let soundModule:Promise<typeof import('./audio')>|undefined;
let reduce = readPreference('portfolio-motion') === 'reduce';
let returnFocus: HTMLElement | null = null;
let afterSwap = false;
let navigationFromKeyboard = false;
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const isReduced = () => reduce || systemMotion.matches;

async function feedback(kind: 'select' | 'confirm' | 'back' | 'page' | 'open') {
  if (!sound) return;
  try { const module=await (soundModule??=import('./audio'));if(sound) await module.playTone(kind); } catch { /* Unsupported or blocked audio does not affect navigation. */ }
}
function syncPreferences() {
  if(!sound) void soundModule?.then(module=>module.stopSounds());
  document.querySelectorAll<HTMLButtonElement>('[data-music-toggle]').forEach(button=>{button.setAttribute('aria-pressed',String(music));button.setAttribute('aria-label',`Music: ${music?'on':'off'}`);});
  document.querySelectorAll('[data-music-label]').forEach(label=>{label.textContent=`MUSIC ${music?'ON':'OFF'}`;});
  document.querySelectorAll<HTMLInputElement>('[data-music-input]').forEach(input=>{input.checked=music;});
  document.documentElement.dataset.motion = reduce ? 'reduce' : 'system';
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach(button=>{
    button.setAttribute('aria-pressed', String(sound));
    button.setAttribute('aria-label', `Sound: ${sound ? 'on' : 'off'}`);
  });
  document.querySelectorAll('[data-sound-label]').forEach(label=>{label.textContent=`SOUND ${sound?'ON':'OFF'}`;});
  document.querySelectorAll<HTMLInputElement>('[data-sound-input]').forEach(input=>{input.checked=sound;});
  document.querySelectorAll<HTMLInputElement>('[data-motion-input]').forEach(input=>{input.checked=reduce;});

  document.querySelectorAll<HTMLVideoElement>('[data-scene-video]').forEach(video=>{
    video.muted=true;
    if(isReduced()) {video.pause();video.classList.remove('is-playing');}
    else void video.play().then(()=>video.classList.add('is-playing')).catch(()=>{});
  });
  const player=document.querySelector<HTMLAudioElement>('#persona-music');
  document.querySelectorAll<HTMLSelectElement>('[data-music-track]').forEach(select=>{
    if(player?.getAttribute('src')) select.value=player.getAttribute('src')!;
  });
  if(isReduced()) document.getAnimations().forEach(animation=>{
    try {if(animation.effect?.getComputedTiming().iterations===Infinity) animation.cancel();else animation.finish();} catch {}
  });

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
  swap.newDocument.documentElement.dataset.input=document.documentElement.dataset.input||'pointer';
  afterSwap=true;
});
document.addEventListener('astro:page-load',setupPage);
systemMotion.addEventListener('change',syncPreferences);
document.addEventListener('keydown',(event)=>{
  navigationFromKeyboard=true;
  document.documentElement.dataset.input='keyboard';
  if(event.key==='Escape') { closeMenu(true);void feedback('back');return; }
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
document.addEventListener('pointerdown',()=>{navigationFromKeyboard=false;document.documentElement.dataset.input='pointer';},{passive:true});
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
    closeMenu();document.querySelector<HTMLDialogElement>('.settings-dialog')?.showModal();void feedback('open');return;
  }
  if(target.closest('[data-settings-close]')) {document.querySelector<HTMLDialogElement>('.settings-dialog')?.close();void feedback('back');return;}
  if(target.closest('[data-music-toggle]')) {void toggleMusic();return;}
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
  if(input.matches('[data-music-input]')) void toggleMusic(input.checked);
  if(input.matches('[data-motion-input]')) {reduce=input.checked;writePreference('portfolio-motion',reduce?'reduce':'system');syncPreferences();void feedback('select');}
});
document.addEventListener('focusin',(event)=>{
  const target=event.target;
  if(navigationFromKeyboard && target instanceof Element && target.matches('.hero-menu-link')) {
    document.querySelectorAll('.hero-menu-link').forEach(link=>link.classList.toggle('is-highlighted',link===target));
  }
});

async function toggleMusic(value=!music) {
  const player=document.querySelector<HTMLAudioElement>('#persona-music');
  if(!player) return;
  const request=++musicRequest;
  music=value;
  syncPreferences();
  if(value) {
    player.volume=.22;
    try {await player.play();} catch {if(request===musicRequest) music=false;}
  } else player.pause();
  if(request===musicRequest) syncPreferences();
}
let hovered:Element|null=null;
function activateMenu(target:Element) {
  const item=target.closest<HTMLElement>('.persona-link');
  if(!item) return;
  document.querySelectorAll('.persona-link').forEach(link=>link.classList.toggle('is-highlighted',link===item));
  const label=document.querySelector('[data-menu-description]');
  if(label) label.textContent=item.dataset.description||'Choose a destination';
}
document.addEventListener('pointerover',(event)=>{
  if(event.pointerType!=='mouse' || !(event.target instanceof Element)) return;
  const item=event.target.closest('.persona-link');
  if(item && item!==hovered) {hovered=item;activateMenu(item);void feedback('select');}
},{passive:true});
document.addEventListener('focusin',(event)=>{if(event.target instanceof Element) activateMenu(event.target);});
setupPage();

document.addEventListener('change',(event)=>{
  if(!(event.target instanceof HTMLSelectElement) || !event.target.matches('[data-music-track]')) return;
  const player=document.querySelector<HTMLAudioElement>('#persona-music');
  if(!player) return;
  const playing=music;
  player.src=event.target.value;
  if(playing) void toggleMusic(true);
  void feedback('page');
});
