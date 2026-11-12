// Self-contained about page: shared navigation and other pages stay independent.
let aboutLanguage = 'it';
const aboutContent = {
  it: {
    label:'Chi sono', title:'Piacere, Gabriele.', lead:'Dall’automazione al progetto. Dalle idee agli impianti.',
    intro:'Sono un ingegnere dell’automazione con una base concreta nello sviluppo software: PLC, HMI e robotica. Oggi mi occupo di project engineering, mettendo in relazione le scelte tecniche, le persone e le attività che portano un impianto dalla progettazione al commissioning.',
    now:'OGGI / MILANI S.P.A.', nowText:'BMS Automation Project Engineer per data center e grandi edifici, da aprile 2026.',
    journey:'Il mio percorso', journeySub:'Tre esperienze, un filo conduttore: far funzionare sistemi complessi.',
    jobs:[
      ['APR 2026 — OGGI','BMS Automation Project Engineer','Milani S.p.A. · Osnago (LC)','Mi occupo dell’architettura di rete e dei componenti di controllo per sistemi BMS. Seguo la commessa come interfaccia tecnica per clienti, EPC, general contractor, fornitori e team interno, gestendo FAT e commissioning presso il cliente finale.'],
      ['GIU 2024 — MAR 2026','Automation Project Engineer','Tenova S.p.A. · Dalmine (BG)','Ho lavorato all’automazione di impianti di fusione dell’acciaio e sistemi ausiliari: architetture di rete, componenti PLC/HMI, verifica di schemi e software, collaudi presso i fornitori e supervisione del commissioning in cantiere.'],
      ['MAR 2021 — MAG 2024','Automation Engineer, PLC & HMI Developer','Regg Inspection S.r.l. · Gorgonzola (MI)','Ho sviluppato software PLC Siemens S7 e interfacce HMI per macchine di ispezione e sistemi di carico e scarico. Ho lavorato su CNC FANUC, azionamenti e integrazione di robot antropomorfi, seguendo anche commissioning e manutenzione.']
    ],
    skills:'Dalla logica al coordinamento', skillsSub:'Le competenze che porto nei progetti.',
    skillGroups:[['Automazione','PLC Siemens S7 · TIA Portal · Step 7','HMI · FANUC Ladder III · FANUC Picture','CNC e robot antropomorfi FANUC · Azionamenti'],['Project engineering','Architetture di rete · Componenti di controllo','Gestione commessa · Clienti, EPC e fornitori','Collaudi FAT · Commissioning · Verifica schemi']],
    education:'Le basi del mio percorso', degrees:[['2018 — 2021','Laurea magistrale in Automation and Control Engineering','Politecnico di Milano · Corso in inglese'],['2015 — 2018','Laurea triennale in Ingegneria dell’Automazione','Politecnico di Milano'],['2010 — 2015','Diploma in Elettrotecnica','Istituto Tecnico P. Hensemberger · Monza']],
    extra:'Formazione sul campo', courses:'FANUC Robot Base (RO03) e Avanzato (RO04). Formazione preposti, sicurezza alto rischio e lavoro in spazi confinati.', languages:'Italiano madrelingua · Inglese B2',
    download:'Il percorso, in dettaglio.', downloadText:'Esperienze, competenze e formazione: scarica il mio CV nella lingua che preferisci.', downloadIt:'Scarica CV italiano', downloadEn:'Scarica CV inglese', contact:'Restiamo in contatto', languageLabel:'Lingua della pagina'
  },
  en: {
    label:'About me', title:'Hi, I’m Gabriele.', lead:'From automation to project delivery. From ideas to working systems.',
    intro:'I’m an automation engineer with a hands-on background in software development: PLCs, HMIs and robotics. Today I focus on project engineering, connecting technical decisions, people and the activities that take a system from design to on-site commissioning.',
    now:'CURRENTLY / MILANI S.P.A.', nowText:'BMS Automation Project Engineer for data centers and large buildings, since April 2026.',
    journey:'My journey', journeySub:'Three experiences, one common thread: making complex systems work.',
    jobs:[
      ['APR 2026 — PRESENT','BMS Automation Project Engineer','Milani S.p.A. · Osnago, Italy','I design network architectures and define control components for BMS systems. As the technical interface for clients, EPCs, general contractors, suppliers and the internal team, I coordinate project activities, FATs and commissioning at the end customer’s site.'],
      ['JUN 2024 — MAR 2026','Automation Project Engineer','Tenova S.p.A. · Dalmine, Italy','I worked on automation for steel melting plants and auxiliary systems: network architectures, PLC/HMI components, electrical schematic and software reviews, supplier acceptance tests and supervision of on-site commissioning.'],
      ['MAR 2021 — MAY 2024','Automation Engineer, PLC & HMI Developer','Regg Inspection S.r.l. · Gorgonzola, Italy','I developed Siemens S7 PLC software and HMI interfaces for inspection machines and loading/unloading systems. My work also covered FANUC CNCs, drives and anthropomorphic robot integration, as well as commissioning and maintenance.']
    ],
    skills:'From logic to coordination', skillsSub:'The skills I bring to each project.',
    skillGroups:[['Automation','Siemens S7 PLCs · TIA Portal · Step 7','HMI · FANUC Ladder III · FANUC Picture','FANUC CNCs and anthropomorphic robots · Drives'],['Project engineering','Network architectures · Control components','Project management · Clients, EPCs and suppliers','FATs · Commissioning · Schematic review']],
    education:'The foundations', degrees:[['2018 — 2021','MSc in Automation and Control Engineering','Politecnico di Milano · Taught in English'],['2015 — 2018','BSc in Automation Engineering','Politecnico di Milano'],['2010 — 2015','Diploma in Electrical Engineering','Istituto Tecnico P. Hensemberger · Monza']],
    extra:'Practical training', courses:'FANUC Robot Basic (RO03) and Advanced (RO04). Supervisor safety, high-risk safety and confined space work training.', languages:'Italian native speaker · English B2',
    download:'The full picture.', downloadText:'Experience, skills and education: download my CV in your preferred language.', downloadIt:'Download Italian CV', downloadEn:'Download English CV', contact:'Let’s connect', languageLabel:'Page language'
  }
};
function renderAbout(head) {
  const c = aboutContent[aboutLanguage];
  const avatar = (name, cls) => `<img class="about-avatar ${cls}" src="about-assets/${name}.png?v=07ac281ad873cd0d" alt="" aria-hidden="true" loading="lazy">`;
  return `<div class="about-viewport"><div class="about-page" lang="${aboutLanguage}">
    <div class="about-top"><span class="eyebrow">GABRIELE LISSONI / ${c.label.toUpperCase()}</span><div class="about-language" role="group" aria-label="${c.languageLabel}">${['it','en'].map(l=>`<button type="button" data-about-language="${l}" lang="${l}" aria-pressed="${aboutLanguage===l}">${l==='it'?'ITA':'EN'}</button>`).join('')}</div></div>
    <section class="about-hero"><div><h1>${c.title}</h1><h2>${c.lead}</h2><p>${c.intro}</p><div class="about-now"><span class="eyebrow">${c.now}</span><p>${c.nowText}</p></div></div><div class="about-hero-art">${avatar('hello','about-hello')}<span class="about-art-label">AUTOMATION / PROJECT ENGINEERING</span></div></section>
    <section class="about-section about-career"><p class="eyebrow">01 / ${c.label.toUpperCase()}</p><h2>${c.journey}</h2><p class="about-subtitle">${c.journeySub}</p><div class="about-timeline">${c.jobs.map((j,i)=>`<article class="about-job about-job-${i}"><div class="about-job-margin"><p class="about-date">${j[0]}</p>${i!==1?avatar(i===0?'career-bms':'career-plc','about-career-scene'):''}</div><div class="about-job-copy">${i===1?avatar('engineer-profile-eaf-v2','about-seated'):''}<div class="about-job-heading"><h3>${j[1]}</h3></div><p class="about-company">${j[2]}</p><p>${j[3]}</p></div></article>`).join('')}</div></section>
    <section class="about-section about-skills"><div class="about-section-title"><div><p class="eyebrow">02 / SKILLS</p><h2>${c.skills}</h2><p class="about-subtitle">${c.skillsSub}</p></div>${avatar('thinking','about-thinking')}</div><div class="about-skill-grid">${c.skillGroups.map(g=>`<article><h3>${g[0]}</h3><ul>${g.slice(1).map(s=>`<li>${s}</li>`).join('')}</ul></article>`).join('')}</div></section>
    <section class="about-section about-study"><p class="eyebrow">03 / ${aboutLanguage==='it'?'FORMAZIONE':'EDUCATION'}</p><h2>${c.education}</h2><div class="about-education">${c.degrees.map((d,i)=>`<article><div class="about-degree-art about-degree-art-${i}">${avatar(['graduate-reclining','education-study','education-electrical'][i],'about-degree-avatar')}</div><div class="about-degree-copy"><p class="about-date">${d[0]}</p><h3>${d[1]}</h3><p>${d[2]}</p></div></article>`).join('')}</div><div class="about-training"><div><h3>${c.extra}</h3><p>${c.courses}</p></div><p class="about-languages">${c.languages}</p></div></section>
    <section class="about-download"><div><p class="eyebrow">CURRICULUM VITAE / PDF</p><h2>${c.download}</h2><p>${c.downloadText}</p><div class="about-download-links"><a href="about-assets/CV_Gabriele_Lissoni_IT.pdf?v=07ac281ad873cd0d" download lang="it">${c.downloadIt} <span>↓</span></a><a href="about-assets/CV_Gabriele_Lissoni_EN.pdf?v=07ac281ad873cd0d" download lang="en">${c.downloadEn} <span>↓</span></a></div><a class="about-contact" href="https://www.linkedin.com/in/gabriele-lissoni/">${c.contact} · LinkedIn ↗</a></div>${avatar('presenting','about-presenting')}</section>
  </div></div>`;
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-about-language]');
  if (!button || !button.closest('.about-page')) return;
  aboutLanguage = button.dataset.aboutLanguage;
  const page = button.closest('.about-viewport');
  page.outerHTML = renderAbout();
  fitAboutComposition();
  document.title = `${aboutContent[aboutLanguage].label} — Gabriele Lissoni`;
  document.querySelector(`[data-about-language="${aboutLanguage}"]`).focus({preventScroll:true});
});

// A single fixed composition: resizing changes scale, never the internal layout.
const ABOUT_DESIGN_WIDTH = 1100;
let aboutResizeObserver;
function fitAboutComposition() {
  if (aboutResizeObserver) aboutResizeObserver.disconnect();
  const viewport = document.querySelector('.about-viewport');
  const page = viewport?.querySelector('.about-page');
  if (!page) return;
  const fit = () => {
    const width = viewport.clientWidth;
    if (!width) return;
    const scale = Math.min(1, width / ABOUT_DESIGN_WIDTH);
    page.style.transform = 'scale(' + scale + ')';
    viewport.style.height = Math.ceil(page.offsetHeight * scale) + 'px';
    viewport.style.visibility = 'visible';
  };
  aboutResizeObserver = new ResizeObserver(fit);
  aboutResizeObserver.observe(viewport);
  aboutResizeObserver.observe(page);
  fit();
}
const aboutMount = document.getElementById('page-content');
if (aboutMount) {
  new MutationObserver(fitAboutComposition).observe(aboutMount, {childList:true});
  fitAboutComposition();
}
