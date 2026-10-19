let cleanup: (()=>void) | undefined;
function initializeProjects() {
  cleanup?.();
  const browser=document.querySelector<HTMLElement>('[data-project-browser]');
  if(!browser) return;
  const filter=browser.querySelector<HTMLSelectElement>('[data-filter]');
  const rows=[...browser.querySelectorAll<HTMLElement>('[data-project-row]')];
  const panels=[...browser.querySelectorAll<HTMLElement>('[data-preview-panel]')];
  const empty=browser.querySelector<HTMLElement>('[data-project-empty]');
  const layout=browser.querySelector<HTMLElement>('.project-browser');
  const count=browser.querySelector<HTMLElement>('[data-project-count]');
  if(!filter) return;
  let selected='';
  function select(id:string,animate=false) {
    if(id===selected) return;
    selected=id;
    rows.forEach(row=>{
      const active=row.dataset.projectId===id;
      row.classList.toggle('is-selected',active);
      row.querySelector('[data-preview]')?.setAttribute('aria-pressed',String(active));
    });
    panels.forEach(panel=>{
      panel.hidden=panel.dataset.previewPanel!==id;
      if(!panel.hidden && animate && document.documentElement.dataset.motion!=='reduce' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        panel.getAnimations().forEach(a=>a.cancel());
        panel.animate([{opacity:.4,transform:'translateX(12px)'},{opacity:1,transform:'translateX(0)'}],{duration:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel')) || 240,easing:'cubic-bezier(.22,1,.36,1)'});
      }
    });
  }
  function applyFilter() {
    const tech=new URL(location.href).searchParams.get('tech')||'';
    filter!.querySelector('[data-unknown]')?.remove();
    if(tech && ![...filter!.options].some(o=>o.value===tech)) {
      const option=new Option(tech,tech);option.dataset.unknown='';filter!.add(option);
    }
    filter!.value=tech;
    const visible=rows.filter(row=>{
      const matches=!tech || (JSON.parse(row.dataset.tech||'[]') as string[]).includes(tech);
      row.hidden=!matches;return matches;
    });
    if(count) count.textContent=`${visible.length} ${visible.length===1?'project':'projects'}`;
    if(empty) empty.hidden=visible.length>0;
    if(layout) layout.hidden=visible.length===0;
    if(!visible.some(row=>row.dataset.projectId===selected)) selected='';
    if(visible[0]) select(visible[0].dataset.projectId||'');
  }
  const change=()=>{
    const url=new URL(location.href);
    if(filter.value) url.searchParams.set('tech',filter.value);else url.searchParams.delete('tech');
    history.pushState(history.state,'',url);
    applyFilter();
  };
  const preview=(event:Event)=>{
    const target=event.target instanceof Element?event.target:null;
    if(event.type==='click' && target?.closest('[data-reset-filter]')) {
      event.preventDefault();
      const url=new URL(location.href);url.searchParams.delete('tech');
      history.pushState(history.state,'',url);applyFilter();filter!.focus();return;
    }
    const row=target?.closest<HTMLElement>('[data-project-row]');
    if(row && !row.hidden) select(row.dataset.projectId||'',event.type==='click' && document.documentElement.dataset.input!=='keyboard');
  };
  filter.addEventListener('change',change);
  browser.addEventListener('click',preview);
  browser.addEventListener('focusin',preview);
  browser.addEventListener('pointerover',preview);
  window.addEventListener('popstate',applyFilter);
  applyFilter();
  cleanup=()=>{
    filter.removeEventListener('change',change);browser.removeEventListener('click',preview);browser.removeEventListener('focusin',preview);browser.removeEventListener('pointerover',preview);window.removeEventListener('popstate',applyFilter);
  };
}
document.addEventListener('astro:page-load',initializeProjects);
document.addEventListener('astro:before-swap',()=>{cleanup?.();cleanup=undefined;});
initializeProjects();
