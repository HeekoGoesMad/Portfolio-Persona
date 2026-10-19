import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
const chrome=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--disable-gpu','--no-sandbox']});
try {
  await mkdir('reports',{recursive:true});
  const results=[];
  for(const route of ['/','/projects/','/projects/afterhours/']) {
    const result=await lighthouse(`http://127.0.0.1:4321${route}`,{port:chrome.port,output:'html',onlyCategories:['performance','accessibility','best-practices','seo']});
    const name=route==='/'?'home':route.split('/').filter(Boolean).join('-');
    await writeFile(`reports/lighthouse-${name}.html`,result.report);
    await writeFile(`reports/lighthouse-${name}.json`,JSON.stringify(result.lhr));
    const scores=Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)]));
    results.push({route,...scores,LCP:result.lhr.audits['largest-contentful-paint'].displayValue,CLS:result.lhr.audits['cumulative-layout-shift'].displayValue});
  }
  await writeFile('reports/lighthouse-summary.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
  if(results.some(result=>result.performance<90||result.accessibility<95)) process.exitCode=1;
} finally {chrome.kill();}
