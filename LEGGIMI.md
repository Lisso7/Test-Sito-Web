# Gabriele Lissoni — Prototipo locale

Apri `index.html` con un doppio clic. Per confrontare tutti gli stati e le pagine, apri `review.html`. Non servono installazioni, connessioni Internet o account.

## Cosa provare

- Scorri la homepage: il percorso compatto dedica più spazio alle cinque pose che presentano le sezioni. Le 13 immagini dell’avatar compongono un giro, chiuso dalla vista frontale. La scena rimane ferma e lo scroll controlla direttamente i passaggi; risalendo avatar e voci mantengono il progresso raggiunto. Il refresh o il clic sul logo riavviano la homepage.
- Usa Esplora subito per saltare alla posa frontale finale con tutti i collegamenti disponibili. A fine giro il comando diventa Scegli una sezione e porta il focus al menu.
- Per provare il layout mobile restringi la finestra o usa gli strumenti dispositivo del browser. I vecchi controlli del prototipo sono stati rimossi dalla homepage.
- Le voci appaiono vicino al dito nelle viste 02 (Chi sono), 04 (Articoli), 07 (Immagini), 09 (Libri) e 12 (Ufficio). Quando lasci la posa si spostano in una colonna laterale; al termine sono tutte visibili e cliccabili. Su mobile le etichette vengono contenute nello schermo.
- I piedi e l’asse delle gambe sono registrati per ogni immagine con offset di visualizzazione; gli originali non sono modificati. Le pose sono mantenute leggibili e collegate da brevi dissolvenze. Il cambiamento delle braccia fa parte delle immagini e non può diventare un movimento 3D continuo con il solo allineamento.
- Apri le cinque sezioni dal menu o dalle etichette intorno all’avatar. Le pagine hanno indirizzi locali con hash e supportano Indietro/Avanti del browser.
- In Ufficio il Coordinatore è già selezionato. Le quattro postazioni sono Coordinatore, Redattore, Illustratore e Libraio. Premi i personaggi, le etichette o i pulsanti sottostanti per cambiare agente e pannello. Usa Ingrandisci per osservare i dettagli. Nessuna esecuzione è reale.
- Usa Tab e Invio per navigare da tastiera. Anche senza completare lo scroll, tutte le destinazioni sono disponibili nel menu superiore.

## Avatar: cosa manca per la versione definitiva

Il file in `03_Avatar` è un PNG frontale, non un modello tridimensionale. L’immagine originale viene conservata senza modifiche e copiata nel sito come `avatar.png`. La vista principale usa questa immagine senza fingere una rotazione tridimensionale.

Per ruotare proprio il tuo avatar mantenendo volume, profilo e schiena serve un modello **GLB** (preferibile, con texture incorporate) oppure **GLTF** con tutti i file collegati. Richieste: figura intera, posa accogliente con braccia laterali e mani rilassate, materiali e texture completi, asse verticale Y e pivot centrale ai piedi. Non serve un’animazione già pronta: la rotazione sarà controllata dallo scroll. Per cambiare la posa in seguito servirebbe anche uno scheletro/rig.

La homepage ora usa `rotation.js`, `rotation.css` e le immagini locali in `rotation/`, senza richiedere un GLB. Il precedente studio `avatar3d.js` è conservato ma non è caricato dalla pagina. Un eventuale GLB sarà un miglioramento futuro.

## Come sono organizzati i file

- `index.html`: struttura della scena, nome, menu, piattaforma e controlli del prototipo.
- `styles.css`: palette, tipografia, composizione e layout mobile.
- `office.css` e `office.js`: ambiente Ufficio, selezione delle quattro postazioni e ingrandimento del render.
- `office-studio-v2.png`: render dello studio, con quattro avatar distinti; il Coordinatore riprende i tratti dell’avatar di Gabriele. È un’immagine con controlli interattivi, non una scena 3D ruotabile.
- `office-art-direction.md`: reference, strumento e prompt utilizzati per il render.
- `script.js`: scroll, navigazione delle pagine e schede degli agenti. Biografia, articoli e libri sono segnaposto; i titoli dei libri sono fittizi. Le fonti degli articoli sono spazi da compilare, non fonti già verificate.
- `rotation.js`: sequenza delle 13 viste, allineamento di piedi e asse, transizioni e posizionamento delle voci presso le mani e nella colonna.
- `rotation.css`: composizione della sequenza e adattamento mobile. `rotation/01.png`–`13.png` sono copie delle immagini ordinate in `03_Avatar/01_Posizioni Rotazione`.
- `review.html`: tavola navigabile con gli stati richiesti.

Prima modifica a mano: apri `index.html` in un editor, cambia “Benvenuto nel mio spazio digitale.”, salva e aggiorna il browser con Ctrl+R. Per cambiare biografia o schede, cerca il relativo testo in `script.js`, conservando apici e backtick del codice.

## Git

Git è installato. Dalla cartella principale del progetto puoi inizializzare e salvare la prima versione con questi comandi, uno alla volta:

```powershell
git init
git status
git add 00_Brief 01_Output
git commit -m "Prototipo personale Gabriele Lissoni"
git log --oneline
```

Se Git chiede nome ed email, imposta `git config user.name "Il tuo nome"` e `git config user.email "la-tua-email@example.com"` per il solo progetto, poi ripeti il commit. Nessun file viene pubblicato online. Prima di aggiungere altri file, controlla `git status`.

Hosting, credenziali e automazioni non sono configurati.
