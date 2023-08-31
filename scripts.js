'use strict';

// start
const jsStart = Date.now();

// time stamp
if (document.querySelector(".page-date")){
  const e = new Date,
        t = e.getHours()<10?"0"+e.getHours():e.getHours(),
        g = e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),
        n = e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds(),
        o = e.getHours()<12?"AM":"PM";
  document.querySelector(".page-date").innerHTML = `${t}:${g}:${n} ${o}`
}

// FIND ORIGINAL DATE AND TIME CODE

// format a date
const dateFormat = (d) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(d)
}

// viewport size
if (document.querySelector(".page-viewport")) { 
  resizeSomething(window.innerWidth,window.innerHeight);
  let e=!1;function resizeSomething(e,n) {
    document.querySelector(".page-viewport").innerHTML=e+"&nbsp;x&nbsp;"+n+"px"
  }
  window.addEventListener("resize",(function(n){e||(window.requestAnimationFrame((function(){
    resizeSomething(window.innerWidth,window.innerHeight),e=!1})),e=!0)}))
  }

// pixel ratio
if (document.querySelector(".page-ratio")) {
  const r=window.devicePixelRatio;
  document.querySelector(".page-ratio").innerHTML='Ratio ' + r;
}

// device type
if (document.querySelector(".page-device")) {
  const e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  let i="";
  i=navigator.userAgentData?navigator.userAgentData.mobile?"Mobile":"Desktop":e.test(navigator.userAgent)?"Mobile":"Desktop",document.querySelector(".page-device").innerHTML=i;
}

// browser version
if (document.querySelector(".page-browser")) {
  const e=()=>{let e=navigator.userAgent.toLowerCase();
  return 0<=e.indexOf("msie")?{type:"IE<11",version:Number(e.match(/msie ([\d]+)/)[1])}:e.match(/trident\/.+?rv:(([\d.]+))/)?{type:"IE",version:11}:0<=e.indexOf("edge")?{type:"Edge",version:Number(e.match(/edge\/([\d]+)/)[1])}:0<=e.indexOf("firefox")?{type:"Firefox",version:Number(e.match(/firefox\/([\d]+)/)[1])}:0<=e.indexOf("chrome")?{type:"Chrome",version:Number(e.match(/chrome\/([\d]+)/)[1])}:0<=e.indexOf("opera")?{type:"Opera",version:Number(e.match(/opera.([\d]+)/)[1])}:0<=e.indexOf("Safari")?{type:"Safari",version:Number(e.match(/version\/([\d]+)/)[1])}:{type:e,version:-1}},r=e().type+"("+e().version+")";document.querySelector(".page-browser").innerHTML=r;
}

// touch support
if (document.querySelector(".page-touched")) {
  const o=document.querySelector(".page-touched"),
        e="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch?'Touch':'No Touch';
  o.innerHTML=e;
}


//console.log('[PGE-0] Pge: {{ page.fileSlug }}');

console.log('[PGE-0] Pge: ' + document.location.pathname.split("/").slice(-1) );
console.log('[PGE-1] Ref: ' + window.location.pathname.substring(1));
console.log('[PGE-2] Start: ' + dateFormat(jsStart) );

// DOM loaded
const domLoad = document.addEventListener("DOMContentLoaded", (event) => { return Date.now(); });

// page load
window.onload = (event) => {
  // doSomethingElse();  init(); loadImage(); registerSW();
  const jsLoad = Date.now();
  console.log('[PGE-3] DOM Loaded: ' + dateFormat(domLoad) );
  console.log('[PGE-4] Window Loaded: ' + dateFormat(jsLoad) );
  console.log('[PGE-5] Elapsed: ' + (jsLoad-jsStart)/1000 + ' secs');
};

// generic modal process
const modalTriggers = document.querySelectorAll(`[data-modal-for]`);
for (let trigger of modalTriggers) {
  const modal = document.getElementById(trigger.dataset.modalFor);
  trigger.addEventListener('click', () => {
    trigger.hasAttribute('open') && modal.showModal();
    trigger.hasAttribute('close') && modal.close();
  });
}
