import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home menu supports keyboard and route focus',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('THINK.');
  const menu=page.getByRole('navigation',{name:'Explore the portfolio'});
  await menu.getByRole('link',{name:/PROJECTS/}).focus();
  await page.keyboard.press('ArrowDown');
  await expect(menu.getByRole('link',{name:/ABOUT/})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.getByRole('heading',{name:'Your name',exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});

test('technology filter keeps shareable history',async({page})=>{
  await page.goto('/projects/');
  await page.getByLabel('Filter by technology').selectOption('React');
  await expect(page).toHaveURL(/tech=React/);
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(1);
  await expect(page.locator('[data-project-count]')).toHaveText('1 project');
  await page.getByLabel('Filter by technology').selectOption('Astro');
  await expect(page.locator('[data-project-row]:visible')).toContainText('Common Ground');
  await page.goBack();
  await expect(page.locator('[data-project-row]:visible')).toContainText('Afterhours');
  await page.goBack();
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(3);
  await page.goto('/projects/?tech=Accessibility');
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(2);
});

test('preview changes without leaving collection',async({page})=>{
  await page.goto('/projects/');
  await page.getByRole('button',{name:'Preview Common Ground'}).click();
  await expect(page.locator('[data-preview-panel="common-ground"]')).toBeVisible();
  await expect(page.locator('[data-preview-panel="afterhours"]')).toBeHidden();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.locator('[data-preview-panel="common-ground"]').getByRole('link',{name:/Open case study/}).click();
  await expect(page).toHaveURL(/\/projects\/common-ground\/$/);
  await page.goBack();
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(3);
});

test('unknown technology has a recoverable empty state',async({page})=>{
  await page.goto('/projects/?tech=NotARealTechnology');
  await expect(page.locator('[data-project-empty]')).toBeVisible();
  await expect(page.locator('[data-project-count]')).toHaveText('0 projects');
  await page.getByRole('link',{name:/Show all projects/}).click();
  await expect(page.locator('[data-project-row]:visible')).toHaveCount(3);
});

test('case studies load directly and expose article anchors',async({page})=>{
  await page.goto('/projects/afterhours/');
  await expect(page.getByRole('heading',{name:'Afterhours',exact:true})).toBeVisible();
  await expect(page.locator('.inline-notice')).toContainText('Illustrative case study');
  await expect(page.getByRole('link',{name:'Live project'})).toHaveCount(0);
  await expect(page.getByRole('link',{name:'Source code'})).toHaveCount(0);
  await page.getByRole('navigation',{name:'Case study sections'}).getByRole('link',{name:'Building it'}).click();
  await expect(page).toHaveURL(/#building-it$/);
  await expect(page.locator('#building-it')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#building-it')).toBeInViewport();
});

test('preferences persist and sound stays opt-in',async({page})=>{
  const audioRequests:string[]=[];
  page.on('request',request=>{if(/\/audio[.\-_]/.test(request.url())) audioRequests.push(request.url());});
  await page.goto('/');
  await expect(page.getByRole('button',{name:'Sound: off'})).toHaveAttribute('aria-pressed','false');
  expect(audioRequests).toHaveLength(0);
  await page.getByRole('button',{name:'Settings',exact:true}).click();
  const dialog=page.getByRole('dialog');
  await dialog.getByRole('checkbox',{name:/Reduce motion/}).check();
  await expect(page.locator('html')).toHaveAttribute('data-motion','reduce');
  await dialog.getByRole('checkbox',{name:/Interface sounds/}).check();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Settings',exact:true})).toBeFocused();
  await expect(page.getByRole('button',{name:'Sound: on'})).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion','reduce');
  await expect(page.getByRole('button',{name:'Sound: on'})).toBeVisible();
  await page.getByRole('button',{name:'Sound: on'}).click();
  await page.reload();
  await expect(page.getByRole('button',{name:'Sound: off'})).toBeVisible();
});

test('system reduced motion prevents entry animation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const animation=await page.locator('.hero-intro').evaluate(el=>getComputedStyle(el).animationName);
  expect(animation).toBe('none');
  await page.getByRole('navigation',{name:'Explore the portfolio'}).getByRole('link',{name:/PROJECTS/}).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator('#main')).toBeFocused();
});

test('blocked browser storage does not break preferences or navigation',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Unavailable','SecurityError');}});});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button',{name:'Settings',exact:true}).click();
  await page.getByRole('checkbox',{name:/Reduce motion/}).check();
  await page.keyboard.press('Escape');
  await page.getByRole('navigation',{name:'Explore the portfolio'}).getByRole('link',{name:/PROJECTS/}).click();
  await expect(page.locator('[data-project-row]')).toHaveCount(3);
  expect(errors).toEqual([]);
});

test('mobile menu and preferences restore focus',async({page})=>{
  await page.setViewportSize({width:360,height:800});
  await page.goto('/');
  const button=page.getByRole('button',{name:'Menu',exact:true});
  await button.click();
  await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await button.click();
  await page.getByRole('button',{name:'Preferences'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await button.click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Projects'}).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(button).toHaveAttribute('aria-expanded','false');
});

test('essential pages work without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await page.getByRole('navigation',{name:'Explore the portfolio'}).getByRole('link',{name:/PROJECTS/}).click();
  await expect(page.locator('[data-project-row]')).toHaveCount(3);
  await page.getByRole('link',{name:'Afterhours',exact:false}).first().click();
  await expect(page.getByRole('heading',{name:'The idea',exact:true})).toBeVisible();
  await context.close();
});

test('responsive pages have no horizontal overflow',async({page},testInfo)=>{
  for(const width of [360,768,1440]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['/','/projects/','/projects/form-and-function/','/about/','/contact/']) {
      await page.goto(route);
      await page.evaluate(()=>document.fonts.ready);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} at ${width}px`).toBe(true);
      if(testInfo.project.name==='chromium' && (route==='/' || route==='/projects/')) await page.screenshot({path:`reports/${route==='/'?'home':'projects'}-${width}.png`,fullPage:true,animations:'disabled'});
    }
  }
});

test('long project titles and many technologies remain readable',async({page})=>{
  await page.setViewportSize({width:360,height:800});await page.goto('/projects/');
  await page.locator('.project-title-link h2').first().evaluate(el=>{el.textContent='A very long project title about building thoughtful and accessible interfaces';});
  await page.locator('.project-row-bottom>span').first().evaluate(el=>{el.textContent='TypeScript / React / Astro / CSS / Web Audio / Accessibility / MoreVeryLongTechnologyNamesWithoutSpaces';});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('content survives 200 percent text enlargement',async({page})=>{
  await page.goto('/');
  await page.addStyleTag({content:'html { font-size: 200%; }'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.goto('/projects/');
  await page.addStyleTag({content:'html { font-size: 200%; }'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('pages meet automated WCAG AA rules and load without errors',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/projects/','/projects/afterhours/','/about/','/contact/','/404.html']) {
    await page.goto(route);
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));});
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(results.violations,route).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('sitemap, robots and recovery route match local example state',async({request,page})=>{
  const sitemap=await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);expect(await sitemap.text()).toContain('/projects/afterhours/');
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  await page.goto('/404.html');
  await page.getByRole('link',{name:/Find a project/}).click();
  await expect(page).toHaveURL(/\/projects\/$/);
});
