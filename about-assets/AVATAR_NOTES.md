# Avatar del percorso — note di lavorazione

Intervento limitato ad about.js, about.css e about-assets/. Il saluto iniziale resta invariato.

## Composizione

- Milani: scena BMS e data center nella colonna della data.
- Tenova: nuova posa seduta, con la mano appoggiata alla linea sopra il testo e le gambe nello spazio laterale.
- Regg Inspection: scena di sviluppo PLC/HMI accanto all’esperienza.
- Magistrale: nuova posa sdraiata, con corona d’alloro, gomito a terra e mano che sostiene la testa; la figura si appoggia alla linea sopra la descrizione.
- Triennale e diploma: scene dedicate allo studio e all’elettrotecnica.
- Sotto 650 px di larghezza del contenuto le esperienze diventano una colonna; per il personaggio seduto è riservato spazio sopra il testo. Le figure non sono interattive e vengono escluse dalla lettura degli screen reader.

## Immagini generate

Strumento: ImageGen integrato. Reference: avatar originali in 03_Avatar/03_Studio e Carriera. Nessuna immagine originale modificata.

### graduate-reclining.png — prompt

Use case: identity-preserve. Create a single isolated 3D character asset for a refined personal portfolio website. Reference image is the exact character identity and graduation outfit: preserve face, hair, navy suit, white shirt, white sneakers and Italian laurel crown. Change pose: full body reclining sideways horizontally, propped on one elbow, hand gently supporting head, warm amused smile toward viewer. Other hand rests on a closed burgundy thesis book near waist. Legs relaxed, slightly bent, feet fully visible. Character lies along a perfectly horizontal invisible baseline so he can rest on a website card top edge. Landscape composition with tight generous safe padding, one person only. Same polished semi-realistic 3D illustration style as reference, soft studio light. Truly transparent background, no floor, no furniture, no text, no framing, no shadow extending below baseline. Output should be a standalone PNG asset. Save result for workspace use.

### engineer-seated.png — prompt finale

Same exact 3D avatar man as reference, same face and brown hair, same white shirt, navy trousers and white sneakers. ONE isolated full body man, SITTING ON AN INVISIBLE LEDGE, legs dangling, ankles crossed casually, left hand resting next to hip on invisible ledge, right hand holding tablet on lap. No desk, no furniture, no ledge drawn, no props except tablet. Small friendly smile facing viewer. Clean polished semi-realistic 3D render. Pure SOLID WHITE #FFFFFF background everywhere, NO background gradients, NO halo, NO cast shadow, NO dark vignette. Tight portrait framing entire person including shoes. Hips / supporting hand at 58 percent image height, all fingers coherent.

## Verifica

- Sintassi JavaScript verificata con node --check.
- Rendering HTML italiano e inglese verificato; tutti gli asset esistono.
- Cambio lingua verificato: contenuto, titolo e ripristino del focus.
- I due PDF scaricabili corrispondono agli originali nel brief (SHA-256).
- Verifica visiva nel browser non eseguita: accesso all’anteprima locale bloccato dal controllo autorizzazioni dell’app. Non è stata tentata un’altra strada per aggirarlo.

Per la revisione: aprire index.html, scegliere Chi sono e ricaricare. Controllare anche EN e la modalità Mobile del prototipo.

## Revisione: mezzo profilo ed EAF

Asset finale: engineer-profile-eaf-v2.png, generato con ImageGen integrato dalla reference 07_Project_Engineering.png. Sostituisce nella pagina la posa con tablet, conservata su disco. Rimossa la linea aggiunta al testo di Tenova; conservata la separazione comune alle esperienze e lasciato spazio sopra la figura, che ora si appoggia al titolo.

Prompt: Use case identity-preserve. Website illustration, one coherent landscape cutout. Preserve exact man identity, hairstyle, white shirt, navy trousers and white sneakers from reference. New pose: man seated in HALF PROFILE facing RIGHT, head turned a little toward viewer smiling, torso upright, thighs horizontal extending right, knees bent and feet dangling down to right. Sitting on an INVISIBLE edge, no actual seat or support drawn. Left half of composition is this seated man. To his right, on SAME invisible horizontal baseline as his hips, place an unfolded engineering blueprint and a SMALL detailed 3D miniature electric arc furnace steelmaking plant, matching the industrial miniature and blueprint on the reference table: graphite electrodes, furnace vessel, yellow walkways, grey structure and orange glow. His right hand gestures toward miniature EAF. No tablet, laptop, square board, desk, table, chair, floor or visible horizontal line. The invisible hip baseline lies around 62 percent down image; legs dangle beneath it in center-right, empty space below left torso. Entire full body and entire EAF miniature visible. Compact wide composition, soft studio lighting, polished semi-realistic 3D same style as reference. Truly transparent background outside silhouette, no haze, no gradients or cast shadow. Asset will perch directly on a website title; DO NOT render any text or letters.

Verificati sintassi, rendering IT/EN e presenza degli asset. Layout adattato anche per mobile; verifica visiva nel browser ancora da fare.
