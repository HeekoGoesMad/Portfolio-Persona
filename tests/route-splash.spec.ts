import { test, expect } from '@playwright/test';

test('route splash covers a pending page, reveals its destination and preserves focus', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const overlay = page.locator('#route-splash');
  await expect(overlay).toHaveAttribute('data-state', 'idle');
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/about/', async route => { await pending; await route.continue(); });
  await page.locator('.hero-menu a[href="/about/"]').focus();
  await page.keyboard.press('Enter');
  await expect(overlay).toBeVisible();
  await expect(overlay.locator('[data-splash-title]')).toHaveText('PROFILE');
  await expect.poll(() => overlay.evaluate(el => getComputedStyle(el).transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
  await expect(page).toHaveURL(/\/$/);
  await page.screenshot({ path: testInfo.outputPath('route-splash.png') });
  release();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(overlay).toHaveAttribute('data-state', 'idle');
  await expect(page.locator('#main')).toBeFocused();
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  expect(errors).toEqual([]);
});

test('rapid route changes cancel stale splashes and browser history plays new ones', async ({ page }) => {
  await page.goto('/');
  // Observe lifecycle synchronously so even fast production navigations are counted.
  await page.evaluate(() => {
    (window as any).splashRoutes = [];
    document.addEventListener('astro:before-preparation', (event: any) => {
      if (event.from.pathname !== event.to.pathname) (window as any).splashRoutes.push(event.to.pathname);
    });
  });
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/about/', async route => { await pending; await route.continue().catch(() => {}); });
  await page.locator('.hero-menu a[href="/about/"]').click();
  await expect(page.locator('#route-splash')).toBeVisible();
  // The decorative splash never captures input; another choice supersedes the first.
  await page.locator('.hero-menu a[href="/contact/"]').click();
  release();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await page.goForward();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  expect(await page.evaluate(() => (window as any).splashRoutes)).toEqual(['/about/', '/contact/', '/', '/contact/']);
});

test('filters and article anchors do not trigger a route splash', async ({ page }) => {
  await page.goto('/projects/');
  await page.getByLabel('Filter by technology').selectOption('Flutter');
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await page.goBack();
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(3);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await page.goto('/projects/betogether/');
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Building it' }).click();
  await expect(page).toHaveURL(/#building-it$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
});

test('system and saved reduced motion skip the splash on keyboard navigation', async ({ page }) => {
  for (const preference of ['system', 'saved']) {
    await page.emulateMedia({ reducedMotion: preference === 'system' ? 'reduce' : 'no-preference' });
    if (preference === 'saved') await page.evaluate(() => localStorage.setItem('portfolio-motion', 'reduce'));
    await page.goto('/');
    await page.evaluate(() => {
      (window as any).splashStates = [];
      new MutationObserver(records => {
        for (const record of records) (window as any).splashStates.push((record.target as HTMLElement).dataset.state);
      }).observe(document.querySelector('#route-splash')!, { attributes: true, attributeFilter: ['data-state'] });
    });
    await page.locator('.hero-menu a[href="/projects/"]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/projects\/$/);
    await expect(page.locator('#main')).toBeFocused();
    expect(await page.evaluate(() => (window as any).splashStates)).not.toContain('covering');
    await expect(page.locator('#route-splash')).toBeHidden();
  }
});

test('404 recovery and mobile navigation use the same splash without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/404/');
  await page.getByRole('link', { name: /Find a project/ }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('enabling reduced motion while a route is loading clears the splash and completes navigation', async ({ page }) => {
  await page.goto('/');
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/about/', async route => { await pending; await route.continue(); });
  await page.locator('.hero-menu a[href="/about/"]').click();
  await expect(page.locator('#route-splash')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  release();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.locator('#route-splash')).toBeHidden();
});

test('redirected internal routes reveal the final destination', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    // Exercise Astro's supported destination rewrite, without a synthetic HTTP
    // redirect (WebKit cannot fulfill intercepted requests with a 302).
    document.addEventListener('astro:before-preparation', (event: any) => {
      if (event.to.pathname === '/profile-shortcut/') event.to = new URL('/about/', location.origin);
    });
    const link = document.createElement('a');
    link.href = '/profile-shortcut/';
    link.textContent = 'Profile shortcut';
    document.querySelector('#main')!.prepend(link);
  });
  await page.getByRole('link', { name: 'Profile shortcut' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('#route-splash')).toHaveAttribute('data-state', 'idle');
  await expect(page.locator('#main')).toBeFocused();
});
