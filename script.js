const $ = (selector) => document.querySelector(selector);
const names = ['Chi sono','Articoli','Immagini','Libri','Ufficio'];
const routes = ['chi-sono','articoli','immagini','libri','ufficio'];
let progress = 0, queued = false;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
$('.identity').addEventListener('click',(event)=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  const home=new URL(location.href);
  home.hash='home';
  home.searchParams.delete('preview');
  home.searchParams.delete('studio');
  history.replaceState(null,'',home.href);
  location.reload();
});
function updateScroll(){
  queued=false;if($('#home-view').hidden)return;
  const story=$('.scroll-story');
  progress=Math.max(0,Math.min(1,(scrollY-story.offsetTop)/(story.offsetHeight-innerHeight)));
  $('.scene-title').style.opacity=Math.max(0,1-progress*26);
  AvatarRotation.render(progress);
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateScroll)}},{passive:true});
addEventListener('resize',updateScroll);
function jumpTo(p){if(location.hash!=='#home')location.hash='home';requestAnimationFrame(()=>{const story=$('.scroll-story');scrollTo({top:story.offsetTop+p*(story.offsetHeight-innerHeight),behavior:'instant'});updateScroll()})}
function focusSection(){document.querySelector('.orbit-item')?.focus({preventScroll:true})}
$('#scroll-next').addEventListener('click',()=>{
  if(AvatarRotation.isComplete()){focusSection();return}
  const p=AvatarRotation.gestureProgress.find(n=>n>progress+.015)??1;
  const story=$('.scroll-story');
  scrollTo({top:story.offsetTop+p*(story.offsetHeight-innerHeight),behavior:reduceMotion?'instant':'smooth'});
});
$('#explore-now').addEventListener('click',()=>{
  AvatarRotation.render(1);
  const story=$('.scroll-story');
  scrollTo({top:story.offsetTop+story.offsetHeight-innerHeight,behavior:'instant'});
  updateScroll();
  // Wait for the labels to finish their short arrival before handing off keyboard focus.
  setTimeout(focusSection,reduceMotion?0:350);
});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#site-nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open))});
const head=(label,title,description)=>`<div class="page-head"><div><p class="eyebrow">GABRIELE LISSONI / ${label.toUpperCase()}</p><h1>${title}</h1><p>${description}</p></div><span class="demo">PROTOTIPO · DATI DIMOSTRATIVI</span></div>`;
const agents={redattore:{name:'Redattore',icon:'✎',role:'Ricerca, verifica e scrittura di brevi articoli.',status:'Bozza da rivedere',task:'Preparare un articolo sulla curiosità digitale',last:'10 novembre 2026 · 09:00 (esempio)',next:'Non programmato',output:'Le domande che aprono nuove strade · bozza demo'},illustratore:{name:'Illustratore',icon:'✳',role:'Generazione di immagini, titoli e descrizioni.',status:'In attesa di indicazioni',task:'Definire lo stile della prossima galleria',last:'10 novembre 2026 · 10:30 (esempio)',next:'Non programmato',output:'Geometrie di luce · composizione demo'},libraio:{name:'Libraio',icon:'▤',role:'Selezione dei libri e preparazione di recensioni.',status:'Scheda da rivedere',task:'Proporre la prima lettura della settimana',last:'9 novembre 2026 · 09:00 (esempio)',next:'Non programmato',output:'La biblioteca delle possibilità · scheda demo'}};
agents.coordinatore={name:'Coordinatore',icon:'◎',role:'Organizza gli incarichi, coordina la redazione e prepara le bozze per la revisione di Gabriele.',status:'In attesa della revisione',task:'Controllare le proposte di articoli, immagini e libri',last:'11 novembre 2026 · 08:30 (esempio)',next:'Non programmato',output:'Riepilogo delle tre proposte editoriali · demo'};
function agentPanel(key){const a=agents[key];return `<div class="agent-top"><span class="agent-icon">${a.icon}</span><span class="demo">AGENTE DEMO</span></div><h2>${a.name}</h2><p>${a.role}</p><dl><div><dt>Stato</dt><dd><span class="status">● ${a.status}</span></dd></div><div><dt>Incarico corrente</dt><dd>${a.task}</dd></div><div><dt>Ultima esecuzione</dt><dd>${a.last}</dd></div><div><dt>Prossimo avvio</dt><dd>${a.next}</dd></div><div><dt>Ultimo contenuto</dt><dd>${a.output}</dd></div></dl><p>Nessun agente reale attivo. I dati di questa scheda sono simulati.</p>`}
const pages={
'chi-sono':()=>renderAbout(head),
articoli:()=>head('Articoli','Idee, messe a fuoco.','Brevi letture per osservare il presente da prospettive diverse.')+`<div class="content-grid">${['Le domande che aprono nuove strade','Tecnologia, con uno sguardo umano','Il valore di un piccolo esperimento'].map((t,i)=>`<article class="content-card"><span class="meta">0${i+1} / BOZZA DEMO · 10 NOV 2026</span><h2>${t}</h2><p>${['La curiosità come punto di partenza: un titolo e un’anteprima per immaginare la futura raccolta.','Una riflessione dimostrativa sul rapporto tra strumenti, abitudini e scelte quotidiane.','Imparare facendo, osservare il risultato e trovare la domanda successiva.'][i]}</p><div class="source">Fonti: da verificare e inserire prima della pubblicazione.<br>Scheda di esempio, non un articolo verificato.</div></article>`).join('')}</div>`,
immagini:()=>head('Immagini','Un altro modo di vedere.','Forme, atmosfere e piccoli esperimenti visivi.')+`<div class="content-grid">${['Geometrie di luce','Equilibri sospesi','Orizzonti possibili'].map((t,i)=>`<article><div class="artwork ${['','two','three'][i]}" role="img" aria-label="${t}: composizione astratta dimostrativa in bianco e azzurro"></div><p class="meta">STUDIO VISIVO / CSS · 10 NOV 2026</p><h2 style="font-size:25px">${t}</h2><p class="subtle">Composizione dimostrativa. Le immagini dell’illustratore arriveranno in una fase successiva.</p></article>`).join('')}</div>`,
libri:()=>head('Libri','Pagine che lasciano traccia.','Una piccola biblioteca di incontri, domande e nuove prospettive.')+`<div class="content-grid">${['La biblioteca delle possibilità','Appunti sul futuro','L’arte di osservare'].map((t,i)=>`<article class="content-card"><div class="book-cover ${['','light','gray'][i]}"><div class="book-object">${t}<small>COPERTINA DIMOSTRATIVA</small></div></div><h2>${t}</h2><p class="meta">AUTORE DA INSERIRE · LIBRO FITTIZIO</p><p>Qui troverà spazio una recensione critica: temi, punti di forza e spunti di riflessione, accompagnati da fonti consultabili.</p><div class="source">Scheda dimostrativa · non è la recensione di un libro reale.</div></article>`).join('')}</div>`,
ufficio:()=>renderOffice(head,agents,agentPanel)};
function route(){const key=decodeURIComponent(location.hash.slice(1))||'home';const inner=routes.includes(key);$('#home-view').hidden=inner;$('#inner-view').hidden=!inner;$('#site-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');document.querySelectorAll('#site-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+key));if(inner){$('#page-content').innerHTML=pages[key]();document.title=names[routes.indexOf(key)]+' — Gabriele Lissoni';document.querySelectorAll('[data-agent]').forEach(button=>button.addEventListener('click',()=>{$('#agent-panel').innerHTML=agentPanel(button.dataset.agent);document.querySelectorAll('[data-agent]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.agent===button.dataset.agent)))}))}else{document.title='Gabriele Lissoni — Spazio personale'}scrollTo({top:0,behavior:'instant'});updateScroll()}
AvatarRotation.init();
addEventListener('hashchange',route);route();
const previewOptions=new URLSearchParams(location.search);
if(previewOptions.has('embed'))document.body.classList.add('embedded');
if(previewOptions.has('mobile')){document.body.classList.add('mobile-sim');document.body.classList.add('mobile-sim')}

if(previewOptions.has('preview'))requestAnimationFrame(()=>requestAnimationFrame(()=>jumpTo(Math.max(0,Math.min(1,Number(previewOptions.get('preview'))||0)))));

// Native scroll restoration must not resume a half-completed introduction on refresh.
addEventListener('pageshow',()=>{
  if(previewOptions.has('preview'))return;
  const navigation=performance.getEntriesByType('navigation')[0];
  if(navigation?.type==='reload' && location.hash && location.hash!=='#home'){
    history.replaceState(null,'',location.pathname+location.search+'#home');
    route();
  }
  if(!$('#home-view').hidden){
    AvatarRotation.reset();progress=0;
    scrollTo({top:0,left:0,behavior:'instant'});
    updateScroll();
    requestAnimationFrame(()=>{scrollTo({top:0,left:0,behavior:'instant'});updateScroll()});
  }
});
