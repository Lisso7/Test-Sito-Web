// The office is a rendered scene with accessible HTML controls, not a real-time 3D model.
function renderOffice(head, agents, agentPanel) {
  const order = ['coordinatore', 'redattore', 'illustratore', 'libraio'];
  return head('Ufficio', 'Un piccolo studio. Grandi possibilità.', 'Quattro persone, quattro ruoli. Entra nello studio e seleziona una postazione per scoprire il lavoro di ciascuno.') + `
    <div class="studio-summary"><span><i></i> Studio digitale</span><span>04 postazioni</span><span>Dati dimostrativi</span></div>
    <div class="office-experience">
      <div class="studio-main">
        <div class="studio-scene">
          <img src="office-studio-v2.png?v=07ac281ad873cd0d" alt="Ufficio tridimensionale con vetrate, scrivanie in legno, monitor e quattro personaggi: Coordinatore, Redattore, Illustratore e Libraio." width="1536" height="1024">
          <div class="studio-hotspots" aria-label="Postazioni dello studio">
            ${order.map((key) => `<button type="button" class="studio-person person-${key}" data-agent="${key}" tabindex="-1" aria-label="Apri scheda ${agents[key].name}" aria-pressed="${key === 'coordinatore'}"></button>`).join('')}
            ${order.map((key, i) => `<button type="button" class="studio-hotspot spot-${key}" data-agent="${key}" aria-label="Seleziona ${agents[key].name}" aria-pressed="${i === 0}"><span class="spot-number">0${i + 1}</span><span class="spot-name">${agents[key].name}</span><span class="spot-arrow" aria-hidden="true">↗</span></button>`).join('')}
          </div>
          <button type="button" class="studio-zoom" data-office-zoom aria-label="Ingrandisci immagine dello studio">⤢ <span>Ingrandisci</span></button>
        </div>
        <p class="studio-caption">Una piccola redazione, uno spazio condiviso. <span>Seleziona un’etichetta o un ruolo qui sotto.</span></p>
        <div class="studio-roster" aria-label="Seleziona un collaboratore">
          ${order.map((key, i) => `<button type="button" data-agent="${key}" aria-pressed="${i === 0}"><span class="roster-icon" aria-hidden="true">${agents[key].icon}</span><span><small>0${i + 1} / ${key === 'coordinatore' ? 'DIREZIONE' : 'REDAZIONE'}</small><strong>${agents[key].name}</strong></span><span class="roster-arrow" aria-hidden="true">↗</span></button>`).join('')}
        </div>
      </div>
      <aside class="agent-panel studio-panel" id="agent-panel" aria-live="polite" aria-atomic="true">${agentPanel('coordinatore')}</aside>
    </div>
    <p class="studio-footnote">Ambiente illustrato con resa 3D e postazioni interattive. Personaggi e attività sono dimostrativi.</p>
    <dialog class="studio-lightbox" id="studio-lightbox" aria-label="Vista ingrandita dello studio"><button type="button" data-office-close aria-label="Chiudi vista ingrandita">Chiudi ×</button><img src="office-studio-v2.png?v=07ac281ad873cd0d" alt="Vista ingrandita delle quattro postazioni dello studio"></dialog>`;
}
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-office-zoom]')) document.getElementById('studio-lightbox')?.showModal();
  if (event.target.closest('[data-office-close]')) document.getElementById('studio-lightbox')?.close();
});
