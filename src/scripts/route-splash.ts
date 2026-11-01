import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';
import { stripBase } from '../lib/paths';

// The splash owns route motion; Astro still owns fetching, history and DOM swapping.
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => systemMotion.matches || document.documentElement.dataset.motion === 'reduce';
const splash = () => document.querySelector<HTMLElement>('#route-splash');
let serial = 0;
let active: { id: number; path: string; swapped: boolean } | undefined;
let movement: Animation | undefined;

function reset() {
  active = undefined;
  movement?.cancel();
  movement = undefined;
  const element = splash();
  if (element) {
    element.dataset.state = 'idle';
    element.style.removeProperty('transform');
  }
}

function destination(rawPath: string): string {
  const path = stripBase(rawPath);
  if (path.startsWith('/projects/') && path !== '/projects/') return 'CASE STUDY';
  if (path === '/projects/') return 'PROJECTS';
  if (path === '/about/') return 'PROFILE';
  if (path === '/contact/') return 'CONTACT';
  if (path === '/') return 'PORTFOLIO';
  return 'LOST SIGNAL';
}

function setLabel(element: HTMLElement, label: string) {
  element.querySelectorAll('[data-splash-title]').forEach(node => { node.textContent = label.toUpperCase(); });
}

async function move(element: HTMLElement, from: string, to: string) {
  const tokens = getComputedStyle(document.documentElement);
  const animation = element.animate([{ transform: from }, { transform: to }], {
    duration: parseFloat(tokens.getPropertyValue('--panel')) || 240,
    easing: tokens.getPropertyValue('--ease').trim() || 'ease-out',
    fill: 'forwards',
  });
  movement = animation;
  try { await animation.finished; } catch { /* Superseded navigation or a changed motion preference. */ }
  if (movement === animation) {
    element.style.transform = to;
    animation.cancel();
    movement = undefined;
  }
}

function cover(path: string) {
  const element = splash();
  if (!element) return;
  const from = element.dataset.state === 'idle' ? 'translate3d(-110%,0,0)' : getComputedStyle(element).transform;
  movement?.cancel();
  movement = undefined;
  const id = ++serial;
  active = { id, path, swapped: false };
  setLabel(element, destination(path));
  element.style.transform = from;
  element.dataset.state = 'covering';
  const covered = move(element, from, 'translate3d(0,0,0)');
  return { element, id, covered };
}

document.addEventListener('astro:before-preparation', event => {
  const navigation = event as TransitionBeforePreparationEvent;
  // Query filters and article anchors keep their immediate, in-page behavior.
  if (navigation.from.pathname === navigation.to.pathname) return;
  if (reduced()) { reset(); return; }
  const scene = cover(navigation.to.pathname);
  if (!scene) return;
  const { element, id, covered } = scene;
  // A replacement navigation starts in this same task: let it retarget the
  // visible wipe before cleaning up an abort with no replacement.
  navigation.signal.addEventListener('abort', () => {
    queueMicrotask(() => { if (active?.id === id) reset(); });
  }, { once: true });
  const load = navigation.loader;
  navigation.loader = async () => {
    try {
      // Fetch during the wipe; no artificial loading pause or minimum display time.
      await Promise.all([load(), covered]);
      if (active?.id !== id || navigation.signal.aborted) return;
      if (navigation.defaultPrevented) { reset(); return; }
      active.path = navigation.to.pathname;
      setLabel(element, destination(navigation.to.pathname));
      const label = navigation.newDocument.querySelector<HTMLElement>('[data-route-label]')?.dataset.routeLabel;
      if (label) setLabel(element, label);
      element.dataset.state = 'covered';
    } catch (error) {
      if (active?.id === id) reset();
      throw error;
    }
  };
});

document.addEventListener('astro:before-swap', event => {
  const navigation = event as TransitionBeforeSwapEvent;
  if (navigation.from.pathname === navigation.to.pathname) return;
  // Native snapshot animations are disabled in RouteSplash; the persistent
  // element provides the motion without cancelling an in-progress browser swap.
  if (active?.path === navigation.to.pathname) active.swapped = true;
});

document.addEventListener('astro:page-load', () => {
  const scene = active;
  const element = splash();
  if (!scene?.swapped || scene.path !== location.pathname || !element) return;
  if (reduced()) { reset(); return; }
  element.dataset.state = 'revealing';
  void move(element, getComputedStyle(element).transform, 'translate3d(110%,0,0)').then(() => {
    if (active?.id === scene.id) reset();
  });
});

systemMotion.addEventListener('change', () => { if (reduced()) reset(); });
document.addEventListener('change', event => {
  if (event.target instanceof HTMLInputElement && event.target.matches('[data-motion-input]') && event.target.checked) reset();
});
window.addEventListener('pagehide', reset);
window.addEventListener('pageshow', event => { if (event.persisted) reset(); });

// The recovery page deliberately uses ordinary navigation: WebKit crashes while
// snapshotting that error document. Give its internal links the same exit splash
// without asking the native View Transition API to snapshot it.
document.addEventListener('click', event => {
  if (document.querySelector('[name="astro-view-transitions-enabled"]') || reduced()) return;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const to = new URL(link.href, location.href);
  if (to.origin !== location.origin || to.pathname === location.pathname) return;
  const scene = cover(to.pathname);
  if (!scene) return;
  event.preventDefault();
  void scene.covered.then(() => {
    if (active?.id === scene.id) location.assign(to.href);
  });
});
