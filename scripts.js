'use strict';

// start
const jsStart = Date.now();



  // FIND ORIGINAL DATE AND TIME CODE
  // old format a date
  const dateFormat = (d) => {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(d)
  }
  // end old format a date



// ## GENERIC CONSTANTS ##

const capitalise_string = (s) => {
  return s[0].toUpperCase() + s.slice(1);
}


const time_stamp = () => {
  //return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(d)
  const e = new Date,
        t = e.getHours()<10?"0"+e.getHours():e.getHours(),
        g = e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),
        n = e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds(),
        o = e.getHours()<12?"AM":"PM";
  return `${t}:${g}:${n} ${o}`;
}


const view_port = () => {
  if (document.querySelector(".new-view-port")){
    resizeSomething(window.innerWidth, window.innerHeight);
    let resizeThrottling = false;
    function resizeSomething(w,h) {
      document.querySelector('.new-view-port').innerHTML = `${w}x${h}px`;
    }
    window.addEventListener('resize', function(e) {
      if (!resizeThrottling) {
        window.requestAnimationFrame(function() {
          resizeSomething(window.innerWidth, window.innerHeight);
          resizeThrottling = false;
        });
        resizeThrottling = true;
      }
    });
  }
}
const pixel_ratio = () => {
  return window.devicePixelRatio;
}
const device_type = () => {
  const e = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const r = navigator.userAgentData ? navigator.userAgentData.mobile ? "mobile" : "desktop" : e.test(navigator.userAgent) ? "mobile" : "desktop";
  return capitalise_string(r);
}
const page_orientation = () => {
  const o = screen.orientation.type;
  const orientation = {
    'landscape-primary': 'landscape',
    'landscape-secondary': 'landscape',
    'portrait-secondary': 'portrait',
    'portrait-primary': 'portrait',
    'undefined': 'not defined error',
    'error': 'not found error',
  };
  const r = o ? orientation[o] || orientation["undefined"] : orientation["error"];
  return capitalise_string(r);
}
const browser_version = () => {
  const e=()=>{let e=navigator.userAgent.toLowerCase();
  return 0<=e.indexOf("msie")?{type:"IE<11",version:Number(e.match(/msie ([\d]+)/)[1])}:e.match(/trident\/.+?rv:(([\d.]+))/)?{type:"IE",version:11}:0<=e.indexOf("edge")?{type:"Edge",version:Number(e.match(/edge\/([\d]+)/)[1])}:0<=e.indexOf("firefox")?{type:"Firefox",version:Number(e.match(/firefox\/([\d]+)/)[1])}:0<=e.indexOf("chrome")?{type:"Chrome",version:Number(e.match(/chrome\/([\d]+)/)[1])}:0<=e.indexOf("opera")?{type:"Opera",version:Number(e.match(/opera.([\d]+)/)[1])}:0<=e.indexOf("Safari")?{type:"Safari",version:Number(e.match(/version\/([\d]+)/)[1])}:{type:e,version:-1}},r=e().type+"["+e().version+"]";
  return r;
}
const page_locale = () => {
  return navigator.language;
}
const touch_support = () => {
  const r = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch ? 'touch' : 'no touch';
  return capitalise_string(r);
}

// generic menu # TO DO #

// generic skip links # TO DO #

// generic back to top # TO DO #

// generic accordian # TO DO #

// generic modal # TO DO #

// generic password # TO DO #

// generic range # TO DO #

const modalTriggers = document.querySelectorAll(`[data-modal-for]`);
for (let trigger of modalTriggers) {
  const modal = document.getElementById(trigger.dataset.modalFor);
  trigger.addEventListener('click', () => {
    trigger.hasAttribute('open') && modal.showModal();
    trigger.hasAttribute('close') && modal.close();
  });
}

// ## CONDITIONAL PAGE INJECTION ##

// time stamp
if (document.querySelector(".new-time-stamp")){
  document.querySelector(".new-time-stamp").innerHTML = time_stamp();
}
// viewport size
view_port();
// orientation
if (document.querySelector(".new-page-orientation")){
  document.querySelector(".new-page-orientation").innerHTML = page_orientation();
}
// pixel ratio
if (document.querySelector(".new-pixel-ratio")) {
  document.querySelector(".new-pixel-ratio").innerHTML = 'Ratio[' + pixel_ratio() + ']';
}
// device type
if (document.querySelector(".new-page-device")){
  document.querySelector(".new-page-device").innerHTML = device_type();
}
// browser version
if (document.querySelector(".new-page-browser")){
  document.querySelector(".new-page-browser").innerHTML = browser_version();
}
// locale
if (document.querySelector(".new-page-locale")) {
  document.querySelector(".new-page-locale").innerHTML = page_locale();
}
// touch support
if (document.querySelector(".new-page-touched")) {
  document.querySelector(".new-page-touched").innerHTML = touch_support();
}

// ## CONSOLE LOG TESTS AND AUDIT ##

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
