/* ---------- Door scroll animation ---------- */
(function(){
 const door=document.getElementById('theDoor');
 if(!door)return;
 const back=document.querySelector('.mtn-back'),front=document.querySelector('.mtn-front');
 const hint=document.querySelector('.scroll-hint');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced)return;
 let intro=0,introDone=false,target=0,current=12;
 // gentle intro: door cracks open on load to invite interaction
 const t0=performance.now();
 function frame(now){
   const homeActive=document.getElementById('page-home').classList.contains('active');
   if(homeActive){
     if(!introDone){
       intro=Math.min((now-t0)/1600,1);
       if(intro>=1)introDone=true;
     }
     const sc=Math.min(Math.max(window.scrollY/420,0),1);
     const ease=sc<.5?2*sc*sc:1-Math.pow(-2*sc+2,2)/2;
     target=12+10*intro+62*ease;            /* 12° rest → ~22° after intro → 84° fully open */
     current+=(target-current)*0.12;        /* smooth follow */
     door.style.transform='rotateY('+current.toFixed(2)+'deg)';
     /* parallax: ranges drift apart as the door opens */
     const p=(current-12)/72;
     if(back)back.style.transform='translateX('+(p*10)+'px) translateY('+(p*-4)+'px) scale('+(1+p*.04)+')';
     if(front)front.style.transform='translateX('+(p*-14)+'px) scale('+(1+p*.07)+')';
     if(hint)hint.classList.toggle('gone',sc>0.12);
   }
   requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
})();
