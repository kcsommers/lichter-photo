!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=332)}({332:function(e,t,r){"use strict";r.r(t);var n,a=void 0,o=function(e,t,r){return"https://lichterphoto.photoshelter.com/search?I_DSC=".concat(r,"&G_ID=").concat(e,"&C_ID=").concat(t,"&I_DSC_AND=t&_ACT=usrSearch")},l=function(e,t,r,n,l){var c=document.createElement("a").classList.add("lp-filter-tg","view-all-tag");c.href=r,c.appendChild(document.createTextNode("View All"));var i=document.createElement("a").classList.add("lp-filter-tg","showcase-tag");i.href=o(e,t,"showcase"),i.appendChild(document.createTextNode("Showcase"));var s=document.createElement("a").classList.add("lp-filter-tg","featured-tag");s.href=o(e,t,"showcase"),s.appendChild(document.createTextNode("Featured")),a[l].removeAttribute("href"),a[l].style.color="#c35a1c";var u=document.createElement("div").classList.add("lp-filters-container"),d=document.querySelector(".".concat(n));u.appendChild(c).appendChild(i).appendChild(s),d.appendChild(u)},c=function(e){var t=e.split("/"),r=t[t.length-1],n=t[t.length-2];return{gID:parseInt(n,10)||"0"===n?t[t.length-3]:n,cID:r}},i=function(){var e=document.querySelectorAll(".thumbnail"),t=!0,r=!1,n=void 0;try{for(var a,o=e[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var l=a.value.firstChild,c=l.href&&l.href.match(/([a-zA-Z-']*)((P|p)ortrait(s?)|((B|b)ike(s?)))/);c&&function(){var e=c[0].split("-").join(" ");l.addEventListener("click",function(t){t.preventDefault(),s(e)})}()}}catch(e){r=!0,n=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw n}}},s=function(e){var t="https://lichterphoto.photoshelter.com/search?I_DSC=".concat(e,"&I_DSC_AND=t&_ACT=search");window.location=t},u=function(e){var t,r,n,a=e.match(/(G_ID=)(.*?)(?=&)/),o=e.match(/(C_ID=)(.*?)(?=&)/),l=e.match(/(I_DSC=)(.*?)(?=&)/);if(a&&o)t=a[0].split("G_ID=")[1],r=o[0].split("C_ID=")[1],n=l?l[0].split("I_DSC=")[1]:null;else{var c=localStorage.getItem("lp-queryData");if(c){var i=JSON.parse(c);r=i.cID,t=i.gID,n=i.searchTerm}}return{gID:t,cID:r,searchTerm:n}};(n=window.location.pathname,/\/arlen-ness\//.test(n)?(console.log("Arlen Ness"),"arlen-ness"):/\/gallery-collection\//.test(n)?(document.addEventListener("DOMContentLoaded",i),n.match(/By-Builder/)?"gallery-collection":null):/\/gallery\//.test(n)?(function(e){var t=c(e),r=t.gID,n=t.cID,a=r&&n?"https://lichterphoto.photoshelter.com/gallery/".concat(r,"/").concat(n):e;r&&n&&localStorage.setItem("lp-queryData",JSON.stringify(Object.assign({gID:r,cID:n},{url:a}))),/full_gallery=true/.test(e)||(window.location=o(r,n,"showcase")),document.addEventListener("DOMContentLoaded",l.call(r,n,a,"name","viewAll"))}(n),"gallery"):/\/search?/.test(n)?(function(e){var t=u(e),r=t.gID,n=t.cID,a=t.searchTerm,o=r&&n?"https://lichterphoto.photoshelter.com/gallery/".concat(r,"/").concat(n):e;r&&n&&localStorage.setItem("lp-queryData",JSON.stringify(Object.assign({gID:r,cID:n,searchTerm:a},{url:o}))),document.addEventListener("DOMContentLoaded",l.bind(void 0,r,n,o,"name",a||"viewAll"))}(n),"search"):null)||localStorage.removeItem("lp-queryData")}});