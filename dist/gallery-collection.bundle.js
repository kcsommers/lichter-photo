(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{341:function(e,t,n){"use strict";n.r(t),n.d(t,"GalleryCollection",function(){return i});var r=n(350),a=n(347),i={init:function(){Object(r.b)(document.querySelector("div.content"),document.querySelector("div.description")),this.hijackThumbTags()},hijackThumbTags:function(){var e=this,t=document.querySelectorAll("li.gallery>.thumbnail>a");t&&t.forEach(function(t){var n=e.parseHref(t.href),i=n.cID,o=n.gID,c=n.name;i&&o&&c&&!a.b.includes(c.toLowerCase())&&t.setAttribute("href",Object(r.c)(o,i,"showcase"))})},parseHref:function(e){if(e){var t=e.split("/");return{cID:t[t.length-1],gID:t[t.length-2],name:t[t.length-3]}}return""}}},347:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return c});var r,a,i,o=(i={filters:[{name:"View All",keyword:""},{name:"Most Popular",keyword:"Popular"},{name:"Black & White",keyword:"BW"},{name:"1970s",keyword:"1970s"},{name:"1980s",keyword:"1980s"},{name:"1990s",keyword:"1990s"},{name:"2000s",keyword:"2000s"},{name:"2010s",keyword:"2010s"},{name:"Sturgis",keyword:"Sturgis"},{name:"Riding",keyword:"Riding"},{name:"Competition",keyword:"Competition"},{name:"Classic Bikes",keyword:"Antique"},{name:"Decorative",keyword:"Decorative"},{name:"Naked Truth Exhibition",keyword:"maa15"},{name:"Heavy Mettle Exhibition",keyword:"maa20"}],keywords:["Popular","BW","1970s","1980s","1990s","2000s","2010s","Sturgis","Riding","Competition","Antique","Decorative","maa15","maa20"],isSpecial:!0},(a="G0000BLnFwimsp4o")in(r={default:{filters:[{name:"View All",keyword:""},{name:"Top Picks",keyword:"showcase"},{name:"Featured",keyword:"featured"}],keywords:["showcase","featured"],isSpecial:!1}})?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i,r),c=["limited edition"]},350:function(e,t,n){"use strict";n.d(t,"c",function(){return a}),n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o});var r=n(347),a=(n(354),function(e,t,n,r){return"https://lichterphoto.photoshelter.com/search?I_DSC=".concat(n,"&").concat(r||"I_DSC_AND=t","&G_ID=").concat(e,"&C_ID=").concat(t,"&_ACT=usrSearch")}),i=function(e,t,n,i){var o=r.a[e]||r.a.default,c=e in r.a,s=o.filters.map(function(r){var c=document.createElement("a");return c.classList.add(o.isSpecial?"kc-filter-tag-special":"kc-filter-tag"),r.keyword&&n.includes(r.keyword)?c.classList.add("kc-filter-tag-active"):c.setAttribute("href",a(e,t,function(e,t,n){var r=new RegExp("(\\+)?(".concat(n.map(function(e){return"".concat(e,"|")}).join(""),")"),"gi");return e=e.replace(r,""),t?e?"".concat(e,"+").concat(t):t:e}(n,r.keyword,o.keywords),i)),c.appendChild(document.createTextNode(r.name)),c});s.some(function(e){return e.classList.contains("kc-filter-tag-active")})||(s[0].classList.add("kc-filter-tag-active"),s[0].removeAttribute("href"));var d=document.createElement("div");d.classList.add("kc-filters-container");var u=document.querySelector(".name");if(u){for(var l=1;l<s.length;l++)d.appendChild(s[l]);c?d.prepend(s[0]):d.append(s[0]),u.appendChild(d)}},o=function(e,t){if(e&&t&&70<t.getBoundingClientRect().height){t.classList.add("kc-description");var n=document.createElement("span");n.textContent="Show More",n.classList.add("kc-showmore-btn"),n.addEventListener("click",function(e){t.classList.contains("open")?(e.target.textContent="Show More",t.classList.remove("open")):(t.classList.add("open"),e.target.textContent="Show Less")}),e.insertBefore(n,e.children[3])}}}}]);