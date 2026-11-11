// All frames use the same 1024x1536 canvas. Offsets register the feet and lower-leg axis.
const AvatarRotation = (() => {
  const roots = [510,522,521,554,518,514,504,486,404,410,442,433,478];
  const feet = [1463,1469,1471,1459,1461,1461,1459,1457,1457,1457,1459,1469,1469];
  const gestures = [
    {frame:1, tip:[140,280]},  // Chi sono: raised finger to the left
    {frame:3, tip:[120,400]},  // Articoli: horizontal finger to the left
    {frame:6, tip:[900,195]},  // Immagini: raised finger to the right
    {frame:8, tip:[910,360]},  // Libri: horizontal finger to the right
    {frame:11,tip:[885,825]}   // Ufficio: downward finger, front three-quarter view
  ];
  const clamp = (n,a=0,b=1) => Math.max(a,Math.min(b,n));
  const smooth = n => {n=clamp(n);return n*n*(3-2*n)};
  let labelState=[], labelTargets=[], labelAnimation=0, labelTime=0, furthestLabelPosition=0;
  let images=[], ready=[], failed=[], stack, scene, items, lastProgress=0;
  function init(){
    scene=document.querySelector('.scene');
    const stage=document.querySelector('.avatar-stage');
    document.getElementById('avatar-reference').hidden=true;
    stack=document.createElement('div');stack.className='rotation-stack';
    stack.setAttribute('role','img');stack.setAttribute('aria-label','Avatar di Gabriele, rotazione per immagini controllata dallo scorrimento');
    stage.append(stack);items=[...document.querySelectorAll('.orbit-item')];
    for(let i=0;i<13;i++){
      const image=new Image();image.className='rotation-frame';image.alt='';image.decoding='async';
      image.style.transform=`translate(${(510-roots[i])/1024*100}%,${(1463-feet[i])/1536*100}%)`;
      image.style.opacity='0';images.push(image);ready.push(false);failed.push(false);
      image.onload=async()=>{try{await image.decode()}catch{}ready[i]=true;render(lastProgress)};
      image.onerror=()=>{failed[i]=true;render(lastProgress)};
      image.src=`rotation/${String(i+1).padStart(2,'0')}.png`;stack.append(image);
    }
    document.getElementById('mode-caption').textContent='Caricamento delle 13 viste…';
    document.getElementById('view-toggle').hidden=true;
    document.querySelector('.progress>span:last-child').textContent='360°';
    document.body.classList.add('image-rotation');
    render(0);
  }
  function render(progress){
    if(!stack)return;lastProgress=clamp(progress);
    const position=lastProgress*13; // last interval closes the turn with the original front view
    const low=Math.min(12,Math.floor(position)), high=(low+1)%13;
    const fraction=position-low;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blend=lastProgress===1?1:reduced?(fraction>=.5?1:0):smooth((fraction-.4)/.2);
    let weights=images.map(()=>0);
    if(ready[low]&&ready[high]){weights[low]=1-blend;weights[high]+=blend}
    else if(ready[low]||ready[high]) weights[ready[low]?low:high]=1;
    else {const nearest=ready.map((r,i)=>r?i:-1).filter(i=>i>=0).sort((a,b)=>Math.abs(a-low)-Math.abs(b-low))[0];if(nearest!==undefined)weights[nearest]=1}
    // Keep an opaque lower frame beneath the incoming frame: no white flash at mid-blend.
    const visible=weights.map((weight,index)=>({weight,index})).filter(x=>x.weight>0);
    images.forEach(image=>{image.style.opacity='0';image.style.zIndex='0'});
    if(visible.length===2){images[low].style.opacity='1';images[low].style.zIndex='1';images[high].style.opacity=String(blend);images[high].style.zIndex='2'}
    else if(visible.length===1){images[visible[0].index].style.opacity='1';images[visible[0].index].style.zIndex='1'}
    const active=blend>=.5?high:low;
    stack.setAttribute('aria-label',`Avatar di Gabriele, vista ${active+1} di 13`);
    const loaded=ready.filter(Boolean).length;
    document.getElementById('mode-caption').textContent=failed.some(Boolean)?'Una vista non è disponibile · aggiorna la pagina':loaded<13?`Caricamento viste ${loaded}/13`:`Rotazione per immagini · ${String(active+1).padStart(2,'0')} / 13`;
    document.getElementById('degrees').textContent=String(Math.round(lastProgress*360)).padStart(3,'0')+'°';
    const rect=stack.getBoundingClientRect(),area=scene.getBoundingClientRect();
    if(!area.width||!area.height)return;
    // Labels keep their furthest reached position while the avatar can rotate backwards.
    furthestLabelPosition=Math.max(furthestLabelPosition,position);
    const compact=area.width<=700;
    const labelW=compact?106:164,labelH=compact?36:46;
    const columnX=area.width-labelW-(compact?16:area.width*.075);
    const row=compact?52:66;
    const columnY=Math.max(115,(area.height-(row*4+labelH))/2);
    items.forEach((item,i)=>{
      const g=gestures[i];
      const reveal=smooth((furthestLabelPosition-(g.frame-.28))/.38);
      const collect=smooth((furthestLabelPosition-(g.frame+.30))/1.25);
      const tipX=rect.left-area.left+(g.tip[0]+510-roots[g.frame])/1024*rect.width;
      const tipY=rect.top-area.top+(g.tip[1]+1463-feet[g.frame])/1536*rect.height;
      const leftHand=g.tip[0]<512;
      // Reserve the column at every stage, so the hand anchor never jumps as rows fill.
      const anchorX=clamp(leftHand?tipX-labelW-12:tipX+12,12,Math.max(12,columnX-labelW-18));
      const anchorY=clamp(tipY-labelH*.65,115,area.height-labelH-100);
      const finalY=columnY+i*row;
      // Travel vertically outside the column, then enter the assigned row horizontally.
      const vertical=smooth(collect/.70),horizontal=smooth((collect-.30)/.70);
      const x=anchorX+(columnX-anchorX)*horizontal;
      const y=anchorY+(finalY-anchorY)*vertical;
      labelTargets[i]={x,y,opacity:reveal};
      item.style.left='0';item.style.top='0';item.style.right='auto';item.style.width=labelW+'px';item.style.height=labelH+'px';
      item.classList.toggle('revealed',reveal>.01);item.classList.toggle('collected',collect>.99);
      item.tabIndex=reveal>.5?0:-1;item.setAttribute('aria-hidden',String(reveal<=.5));
    });
    if(!labelAnimation)labelAnimation=requestAnimationFrame(animateLabels);
  }
  function animateLabels(time){
    labelAnimation=0;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dt=Math.min(50,Math.max(1,time-(labelTime||time-16)));labelTime=time;
    const alpha=reduced?1:1-Math.exp(-dt/95);
    let moving=false;
    items.forEach((item,i)=>{
      const target=labelTargets[i];if(!target)return;
      const current=labelState[i]||(labelState[i]={...target});
      for(const key of ['x','y','opacity']){
        current[key]+=(target[key]-current[key])*alpha;
        if(Math.abs(target[key]-current[key])>.05)moving=true;else current[key]=target[key];
      }
      item.style.transform=`translate3d(${current.x.toFixed(2)}px,${current.y.toFixed(2)}px,0)`;
      item.style.opacity=String(current.opacity);
      item.style.pointerEvents=current.opacity>.5?'auto':'none';
    });
    if(moving)labelAnimation=requestAnimationFrame(animateLabels);
  }

  return {init,render,gestureProgress:[1,3,6,8,11].map(n=>(n+.05)/13)};
})();

