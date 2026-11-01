import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';
import { revalidateFromSanityCdn } from './cms-sync';

const readPreference = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const writePreference = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Browser storage is optional. */ } };
type PersonaTheme = 'p3r' | 'p4g' | 'p5r';
type ColorModePref = 'dark' | 'light' | 'system';
type SplashStyle = 'wipe' | 'curtain' | 'slash';

const validTheme = (val: string | null): PersonaTheme => (val === 'p4g' || val === 'p5r' ? val : 'p3r');
const validColorMode = (val: string | null): ColorModePref => (val === 'light' || val === 'system' ? val : 'dark');
const validSplashStyle = (val: string | null): SplashStyle => (val === 'curtain' || val === 'slash' ? val : 'wipe');

let sound = readPreference('portfolio-sound') === 'on';
let music = false;
let musicRequest = 0;
let soundModule: Promise<typeof import('./audio')> | undefined;
let reduce = readPreference('portfolio-motion') === 'reduce';
let personaTheme: PersonaTheme = validTheme(readPreference('portfolio-persona-theme'));
let colorModePref: ColorModePref = validColorMode(readPreference('portfolio-color-mode'));
let splashStyle: SplashStyle = validSplashStyle(readPreference('portfolio-splash-style'));
let panelDuration = Number(readPreference('portfolio-panel-duration')) || 240;
let pageDuration = Number(readPreference('portfolio-page-duration')) || 280;

let returnFocus: HTMLElement | null = null;
let afterSwap = false;
let navigationFromKeyboard = false;
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const systemLight = matchMedia('(prefers-color-scheme: light)');
const isReduced = () => reduce || systemMotion.matches;

const resolveColorMode = (): 'dark' | 'light' => {
  if (colorModePref === 'system') return systemLight.matches ? 'light' : 'dark';
  return colorModePref;
};

const themeMeta: Record<PersonaTheme, { symbol: string; sub: string; color: string }> = {
  p3r: { symbol: 'P3', sub: 'DARK HOUR', color: '#0629ae' },
  p4g: { symbol: 'P4', sub: 'MIDNIGHT TV', color: '#d99b00' },
  p5r: { symbol: 'P5', sub: 'PHANTOM', color: '#b80d2d' },
};

async function feedback(kind: 'select' | 'confirm' | 'back' | 'page' | 'open') {
  if (!sound) return;
  try { const module = await (soundModule ??= import('./audio')); if (sound) await module.playTone(kind); } catch { /* Unsupported or blocked audio does not affect navigation. */ }
}

function trackAnalyticsEvent(eventName: string, data?: Record<string, string>) {
  try {
    const win = window as unknown as { umami?: { track: (name: string, payload?: Record<string, string>) => void } };
    if (win.umami?.track) win.umami.track(eventName, data);
    const key = 'portfolio-analytics-clicks';
    const current = JSON.parse(localStorage.getItem(key) || '{}') as Record<string, number>;
    const metricKey = data?.project ? `project:${data.project}` : eventName;
    current[metricKey] = (current[metricKey] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(current));
  } catch {
    /* Privacy-safe no-op */
  }
}

function cycleShoulderNav(direction: 'prev' | 'next') {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-main-nav-link]')];
  if (!links.length) return;
  const currentIdx = links.findIndex(a => a.getAttribute('aria-current') === 'page');
  const nextIdx = currentIdx < 0
    ? (direction === 'next' ? 0 : links.length - 1)
    : (currentIdx + (direction === 'next' ? 1 : -1) + links.length) % links.length;
  links[nextIdx]?.click();
}

function syncPreferences() {
  if (!sound) void soundModule?.then(module => module.stopSounds());
  document.documentElement.dataset.personaTheme = personaTheme;
  const activeColorMode = resolveColorMode();
  document.documentElement.dataset.colorMode = activeColorMode;
  document.documentElement.dataset.splashStyle = splashStyle;

  if (panelDuration >= 80) document.documentElement.style.setProperty('--panel', `${panelDuration}ms`);
  if (pageDuration >= 100) document.documentElement.style.setProperty('--page', `${pageDuration}ms`);

  const meta = themeMeta[personaTheme];
  document.querySelectorAll('[data-brand-symbol]').forEach(el => { el.textContent = meta.symbol; });
  document.querySelectorAll('[data-brand-subtitle]').forEach(el => {
    el.textContent = activeColorMode === 'light' && personaTheme === 'p3r' ? 'DAYLIGHT' : meta.sub;
  });
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', activeColorMode === 'light' ? '#eef4fb' : meta.color);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-select]').forEach(btn => {
    const active = btn.dataset.themeSelect === personaTheme;
    btn.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll<HTMLSelectElement>('[data-theme-dropdown]').forEach(sel => {
    sel.value = personaTheme;
  });

  // Color mode controls
  const isLight = activeColorMode === 'light';
  document.querySelectorAll<HTMLButtonElement>('[data-color-mode-toggle]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('aria-label', `Color mode: ${activeColorMode}`);
  });
  document.querySelectorAll('[data-color-mode-icon]').forEach(icon => { icon.textContent = isLight ? '☀' : '☾'; });
  document.querySelectorAll('[data-color-mode-label]').forEach(lbl => { lbl.textContent = isLight ? 'LIGHT' : 'DARK'; });
  document.querySelectorAll<HTMLSelectElement>('[data-color-mode-dropdown]').forEach(sel => {
    sel.value = colorModePref;
  });

  // Transition editor controls
  document.querySelectorAll<HTMLSelectElement>('[data-splash-style-select]').forEach(sel => {
    sel.value = splashStyle;
  });
  document.querySelectorAll<HTMLInputElement>('[data-panel-duration-input]').forEach(inp => {
    inp.value = String(panelDuration);
  });
  document.querySelectorAll<HTMLInputElement>('[data-page-duration-input]').forEach(inp => {
    inp.value = String(pageDuration);
  });

  document.querySelectorAll<HTMLButtonElement>('[data-music-toggle]').forEach(button => { button.setAttribute('aria-pressed', String(music)); button.setAttribute('aria-label', `Music: ${music ? 'on' : 'off'}`); });
  document.querySelectorAll('[data-music-label]').forEach(label => { label.textContent = `MUSIC ${music ? 'ON' : 'OFF'}`; });
  document.querySelectorAll<HTMLInputElement>('[data-music-input]').forEach(input => { input.checked = music; });
  document.documentElement.dataset.motion = reduce ? 'reduce' : 'system';
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach(button => {
    button.setAttribute('aria-pressed', String(sound));
    button.setAttribute('aria-label', `Sound: ${sound ? 'on' : 'off'}`);
  });
  document.querySelectorAll('[data-sound-label]').forEach(label => { label.textContent = `SOUND ${sound ? 'ON' : 'OFF'}`; });
  document.querySelectorAll<HTMLInputElement>('[data-sound-input]').forEach(input => { input.checked = sound; });
  document.querySelectorAll<HTMLInputElement>('[data-motion-input]').forEach(input => { input.checked = reduce; });

  document.querySelectorAll<HTMLVideoElement>('[data-scene-video]').forEach(video => {
    video.muted = true;
    if (isReduced()) { video.pause(); video.classList.remove('is-playing'); }
    else void video.play().then(() => video.classList.add('is-playing')).catch(() => {});
  });
  const player = document.querySelector<HTMLAudioElement>('#persona-music');
  document.querySelectorAll<HTMLSelectElement>('[data-music-track]').forEach(select => {
    if (player?.getAttribute('src')) select.value = player.getAttribute('src')!;
  });
  if (isReduced()) document.getAnimations().forEach(animation => {
    try { if (animation.effect?.getComputedTiming().iterations === Infinity) animation.cancel(); else animation.finish(); } catch {}
  });
}

function setPersonaTheme(next: PersonaTheme) {
  personaTheme = next;
  writePreference('portfolio-persona-theme', next);
  syncPreferences();
  void feedback('page');
}

function setColorMode(next: ColorModePref) {
  colorModePref = next;
  writePreference('portfolio-color-mode', next);
  syncPreferences();
  void feedback('select');
}

function closeMenu(restoreFocus = false) {
  const menu = document.querySelector<HTMLElement>('#mobile-menu');
  const button = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (!menu || !button || menu.hidden) return;
  menu.hidden = true; button.setAttribute('aria-expanded', 'false');
  if (restoreFocus) button.focus();
}

function setupPage() {
  document.documentElement.classList.add('has-js');
  syncPreferences();
  void revalidateFromSanityCdn();
  const dialog = document.querySelector<HTMLDialogElement>('.settings-dialog');
  if (dialog && !dialog.dataset.bound) {
    dialog.dataset.bound = 'true';
    dialog.addEventListener('close', () => {
      const target = returnFocus?.getClientRects().length ? returnFocus : document.querySelector<HTMLElement>('[data-menu-toggle]');
      target?.focus();
    });
  }
  if (location.hash) {
    const originalHash = location.hash;
    let id = originalHash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
    void document.fonts.ready.then(() => requestAnimationFrame(() => {
      if (location.hash === originalHash) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }));
  }
  if (afterSwap) {
    if (!location.hash) document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
    afterSwap = false;
  }
}

document.addEventListener('astro:before-swap', (event) => {
  const swap = event as TransitionBeforeSwapEvent;
  swap.newDocument.documentElement.dataset.motion = reduce ? 'reduce' : 'system';
  swap.newDocument.documentElement.dataset.personaTheme = personaTheme;
  swap.newDocument.documentElement.dataset.colorMode = resolveColorMode();
  swap.newDocument.documentElement.dataset.splashStyle = splashStyle;
  swap.newDocument.documentElement.classList.add('has-js');
  swap.newDocument.documentElement.dataset.input = document.documentElement.dataset.input || 'pointer';
  afterSwap = true;
});
document.addEventListener('astro:page-load', setupPage);
systemMotion.addEventListener('change', syncPreferences);
systemLight.addEventListener('change', syncPreferences);

document.addEventListener('keydown', (event) => {
  navigationFromKeyboard = true;
  document.documentElement.dataset.input = 'keyboard';
  if (event.key === 'Escape') { closeMenu(true); void feedback('back'); return; }
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const isFormField = target.matches('input, textarea, select, [contenteditable="true"]');
  if (!isFormField && !event.metaKey && !event.ctrlKey && !event.altKey) {
    if (event.key === '[') { event.preventDefault(); cycleShoulderNav('prev'); return; }
    if (event.key === ']') { event.preventDefault(); cycleShoulderNav('next'); return; }
  }
  const group = target.closest<HTMLElement>('[data-key-list]');
  if (!group || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  const links = [...group.querySelectorAll<HTMLElement>('a[href],button')].filter(item => item.getClientRects().length > 0);
  const index = links.indexOf(target);
  if (index < 0 || !links.length) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
  links[next]?.focus();
  void feedback('select');
});

document.addEventListener('pointerdown', () => { navigationFromKeyboard = false; document.documentElement.dataset.input = 'pointer'; }, { passive: true });

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const tracked = target.closest<HTMLElement>('[data-track-project]');
  if (tracked?.dataset.trackProject) {
    trackAnalyticsEvent('project_click', { project: tracked.dataset.trackProject });
  }
  const shoulderBtn = target.closest<HTMLElement>('[data-shoulder-nav]');
  if (shoulderBtn?.dataset.shoulderNav) {
    cycleShoulderNav(shoulderBtn.dataset.shoulderNav === 'prev' ? 'prev' : 'next');
    return;
  }
  const themeBtn = target.closest<HTMLElement>('[data-theme-select]');
  if (themeBtn?.dataset.themeSelect) {
    setPersonaTheme(validTheme(themeBtn.dataset.themeSelect));
    return;
  }
  if (target.closest('[data-color-mode-toggle]')) {
    const next = resolveColorMode() === 'dark' ? 'light' : 'dark';
    setColorMode(next);
    return;
  }
  const menuButton = target.closest('[data-menu-toggle]');
  if (menuButton) {
    const menu = document.querySelector<HTMLElement>('#mobile-menu');
    if (menu) { const show = menu.hidden; menu.hidden = !show; menuButton.setAttribute('aria-expanded', String(show)); if (show) menu.querySelector<HTMLElement>('a')?.focus(); }
    void feedback('select'); return;
  }
  if (target.closest('[data-settings-open]')) {
    returnFocus = target.closest<HTMLElement>('[data-settings-open]');
    closeMenu(); document.querySelector<HTMLDialogElement>('.settings-dialog')?.showModal(); void feedback('open'); return;
  }
  if (target.closest('[data-settings-close]')) { document.querySelector<HTMLDialogElement>('.settings-dialog')?.close(); void feedback('back'); return; }
  if (target.closest('[data-music-toggle]')) { void toggleMusic(); return; }
  if (target.closest('[data-sound-toggle]')) {
    sound = !sound; writePreference('portfolio-sound', sound ? 'on' : 'off'); syncPreferences(); if (sound) void feedback('confirm'); return;
  }
  if (target.closest('a[href]')) { closeMenu(); void feedback('confirm'); }
  else if (target.closest('[data-preview],[data-project-row]')) void feedback('select');
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target instanceof HTMLSelectElement) {
    if (target.matches('[data-theme-dropdown]')) {
      setPersonaTheme(validTheme(target.value));
      return;
    }
    if (target.matches('[data-color-mode-dropdown]')) {
      setColorMode(validColorMode(target.value));
      return;
    }
    if (target.matches('[data-splash-style-select]')) {
      splashStyle = validSplashStyle(target.value);
      writePreference('portfolio-splash-style', splashStyle);
      syncPreferences();
      void feedback('page');
      return;
    }
    if (target.matches('[data-music-track]')) {
      const player = document.querySelector<HTMLAudioElement>('#persona-music');
      if (!player) return;
      const playing = music;
      player.src = target.value;
      if (playing) void toggleMusic(true);
      void feedback('page');
      return;
    }
  }
  if (!(target instanceof HTMLInputElement)) return;
  if (target.matches('[data-panel-duration-input]')) {
    const val = Math.min(1200, Math.max(80, Number(target.value) || 240));
    panelDuration = val;
    writePreference('portfolio-panel-duration', String(val));
    syncPreferences();
    return;
  }
  if (target.matches('[data-page-duration-input]')) {
    const val = Math.min(1500, Math.max(100, Number(target.value) || 280));
    pageDuration = val;
    writePreference('portfolio-page-duration', String(val));
    syncPreferences();
    return;
  }
  if (target.matches('[data-sound-input]')) { sound = target.checked; writePreference('portfolio-sound', sound ? 'on' : 'off'); syncPreferences(); if (sound) void feedback('confirm'); }
  if (target.matches('[data-music-input]')) void toggleMusic(target.checked);
  if (target.matches('[data-motion-input]')) { reduce = target.checked; writePreference('portfolio-motion', reduce ? 'reduce' : 'system'); syncPreferences(); void feedback('select'); }
});

async function toggleMusic(value = !music) {
  const player = document.querySelector<HTMLAudioElement>('#persona-music');
  if (!player) return;
  const request = ++musicRequest;
  music = value;
  syncPreferences();
  if (value) {
    player.volume = .22;
    try { await player.play(); } catch { if (request === musicRequest) music = false; }
  } else player.pause();
  if (request === musicRequest) syncPreferences();
}

let hovered: Element | null = null;
let hoveredRow: Element | null = null;
function activateMenu(target: Element) {
  const item = target.closest<HTMLElement>('.persona-link');
  if (!item) return;
  document.querySelectorAll('.persona-link').forEach(link => link.classList.toggle('is-highlighted', link === item));
  const label = document.querySelector('[data-menu-description]');
  if (label) label.textContent = item.dataset.description || 'Choose a destination';
}

document.addEventListener('pointerover', (event) => {
  if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
  const item = event.target.closest('.persona-link');
  if (item && item !== hovered) { hovered = item; activateMenu(item); void feedback('select'); }
  const row = event.target.closest<HTMLElement>('[data-project-row]');
  if (row && row !== hoveredRow && !row.hidden) { hoveredRow = row; void feedback('select'); }
}, { passive: true });

document.addEventListener('focusin', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (navigationFromKeyboard && target.matches('.hero-menu-link')) {
    document.querySelectorAll('.hero-menu-link').forEach(link => link.classList.toggle('is-highlighted', link === target));
  }
  activateMenu(target);
});

setupPage();
