// Small local 3D study: triangulated ellipsoids, perspective projection and depth sorting.
// This geometry is a placeholder, not a reconstruction of Gabriele's PNG.
(()=>{
const canvas=document.getElementById('avatar-canvas'),ctx=canvas.getContext('2d');
const meshes=[];
function ellipsoid(center,radius,color,tilt=0){
  const point=(u,v)=>{const x=radius[0]*Math.sin(v)*Math.cos(u),y=radius[1]*Math.cos(v),z=radius[2]*Math.sin(v)*Math.sin(u);return [center[0]+x*Math.cos(tilt)-y*Math.sin(tilt),center[1]+x*Math.sin(tilt)+y*Math.cos(tilt),center[2]+z]};
  for(let j=0;j<14;j++)for(let i=0;i<24;i++){const u=i/24*Math.PI*2,v=j/14*Math.PI,un=(i+1)/24*Math.PI*2,vn=(j+1)/14*Math.PI;const a=point(u,v),b=point(un,v),c=point(un,vn),d=point(u,vn);meshes.push({p:[a,b,c],color},{p:[a,c,d],color})}
}
const skin=[225,184,155],shirt=[235,244,250],pants=[37,61,87],hair=[52,43,39],shoe=[235,241,246];
ellipsoid([0,1.78,0],[.34,.51,.20],shirt);
ellipsoid([0,1.3,0],[.31,.22,.20],pants);
[-1,1].forEach(s=>{
 ellipsoid([s*.17,.78,0],[.145,.62,.16],pants,.025*s);
 ellipsoid([s*.18,.105,.09],[.16,.11,.28],shoe);
 ellipsoid([s*.57,2.02,0],[.14,.40,.135],shirt,Math.PI/2*s);
 ellipsoid([s*.99,1.97,.015],[.11,.30,.11],shirt,Math.PI/2*s-.12*s);
 ellipsoid([s*1.30,1.91,.045],[.19,.075,.115],skin,-.15*s);
 ellipsoid([s*.295,2.46,.005],[.06,.095,.06],skin);
});
ellipsoid([0,2.22,0],[.12,.18,.12],skin);
ellipsoid([0,2.52,0],[.265,.34,.235],skin);
ellipsoid([0,2.73,-.025],[.268,.16,.23],hair);
ellipsoid([0,2.50,.235],[.04,.075,.065],skin);
[-1,1].forEach(s=>{ellipsoid([s*.095,2.57,.218],[.055,.025,.022],[249,250,251]);ellipsoid([s*.095,2.57,.238],[.021,.021,.012],[51,63,68]);ellipsoid([s*.095,2.62,.216],[.065,.012,.02],hair)});
ellipsoid([0,2.39,.217],[.065,.012,.02],[158,105,95]);
window.drawAvatar=function(angle){
 const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
 const dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 const scale=Math.min(h/3.1,w/3.35),co=Math.cos(angle),si=Math.sin(angle);
 const rotate=p=>[p[0]*co+p[2]*si,p[1],-p[0]*si+p[2]*co];
 const faces=meshes.map(m=>{const p=m.p.map(rotate);return {p,c:m.color,z:p.reduce((s,v)=>s+v[2],0)/3}}).sort((a,b)=>a.z-b.z);
 for(const f of faces){const [a,b,c]=f.p;const ab=b.map((v,i)=>v-a[i]),ac=c.map((v,i)=>v-a[i]);const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];const length=Math.hypot(...n)||1;const light=.74+.24*Math.abs((n[0]*-.4+n[1]*.65+n[2]*.6)/length);ctx.fillStyle=`rgb(${f.c.map(v=>Math.round(v*light)).join(',')})`;ctx.beginPath();f.p.forEach((v,i)=>{const perspective=6/(6-v[2]),x=w/2+v[0]*scale*perspective,y=h*.96-v[1]*scale*perspective;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.closePath();ctx.fill()}
};
})();
