(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{343:function(e,t,n){"use strict";n.r(t),n.d(t,"Search",function(){return c});var a=n(350),r=n(353),i=n(93),o=n(95),c={queryParams:null,init:function(){this.queryParams=Object(i.b)(window.location.href),localStorage.setItem(o.a.QUERY_DATA,JSON.stringify(this.queryParams)),this.removeBracketsFromTotal(),this.setPagination(),this.setGalleryDetails()},removeBracketsFromTotal:function(){var e=document.querySelector(".name");e&&(e.textContent=e.textContent.replace(/[\{\}(found)]/g,"").trim(),e.classList.add("kc-name-visible"))},setPagination:function(){var e=document.querySelector(".pagination"),t=document.querySelector(".page_previous"),n=document.querySelector(".page_next"),a=document.querySelector(".count");if(e){var r="&I_DSC=".concat(this.queryParams.searchTerm,"&I_DSC_AND=").concat(this.queryParams.isAnd,"&G_ID=").concat(this.queryParams.gID,"&C_ID=").concat(this.queryParams.cID);n&&(n.href+=r),t&&(t.href+=r),document.addEventListener("keyup",function(e){nextUrl&&39===e.keyCode&&(window.location=nextUrl),prevUrl&&37===e.keyCode&&(window.location=prevUrl)})}if(a){a.style.position="relative",a.style.cursor="pointer";var i=a.textContent.match(/(\bof\b )([0-9]+)$/g);if(i&&i[0]){var o=+i[0].split(" ")[1],c=n?n.href:t?t.href:"";if(o&&c){var s=document.createElement("div");s.classList.add("kc-pagination-dropdown");for(var d,l=0;l<o;l++)(d=document.createElement("a")).classList.add("kc-page-tag"),d.textContent="".concat(l+1),d.setAttribute("href",c.replace(/_bqO=[0-9]+/,"_bqO=".concat(100*l))),s.appendChild(d);a.appendChild(s),a.addEventListener("click",function(e){e.stopPropagation(),s.classList.add("kc-pagination-dropdown-visible");var t=function(e){e.stopPropagation(),s.classList.remove("kc-pagination-dropdown-visible"),document.removeEventListener("click",t)};document.addEventListener("click",t)})}}}},setGalleryDetails:function(){var e=document.querySelector(".c1title");return Object(a.a)(this.queryParams.gID||"",this.queryParams.cID||"",this.queryParams.searchTerm||"",this.queryParams.isAnd),this.queryParams.gID?void Object(r.a)(this.queryParams.gID).then(function(t){if(t){var n=JSON.parse(t);if(n.data&&n.data.Gallery&&(n.data.Gallery.name&&e&&(e.textContent=n.data.Gallery.name,e.classList.add("kc-c1title-visible")),n.data.Gallery.description)){var r=document.querySelector(".content div:first-child");if(r){var i=document.createElement("div");i.classList.add("kc-description-wrap"),i.classList.add("kc-fade-in"),i.innerHTML=n.data.Gallery.description,r.appendChild(i),Object(a.b)(r,i)}}}}).catch(function(e){return console.error(e)}):void(e&&e.classList.add("kc-c1title-visible"))}}},347:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return c});var a,r,i,o=(i={filters:[{name:"View All",keyword:""},{name:"Most Popular",keyword:"Popular"},{name:"Black & White",keyword:"BW"},{name:"1970s",keyword:"1970s"},{name:"1980s",keyword:"1980s"},{name:"1990s",keyword:"1990s"},{name:"2000s",keyword:"2000s"},{name:"2010s",keyword:"2010s"},{name:"Sturgis",keyword:"Sturgis"},{name:"Riding",keyword:"Riding"},{name:"Competition",keyword:"Competition"},{name:"Classic Bikes",keyword:"Antique"},{name:"Decorative",keyword:"Decorative"},{name:"Naked Truth Exhibition",keyword:"maa15"},{name:"Heavy Mettle Exhibition",keyword:"maa20"}],keywords:["Popular","BW","1970s","1980s","1990s","2000s","2010s","Sturgis","Riding","Competition","Antique","Decorative","maa15","maa20"],isSpecial:!0},(r="G0000BLnFwimsp4o")in(a={default:{filters:[{name:"View All",keyword:""},{name:"Top Picks",keyword:"showcase"},{name:"Featured",keyword:"featured"}],keywords:["showcase","featured"],isSpecial:!1}})?Object.defineProperty(a,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[r]=i,a),c=["limited edition"]},350:function(e,t,n){"use strict";n.d(t,"c",function(){return r}),n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o});var a=n(347),r=(n(354),function(e,t,n,a,r){return"https://lichterphoto.photoshelter.com/search?I_DSC=".concat(n,"&").concat(a||"I_DSC_AND=t","&G_ID=").concat(e,"&C_ID=").concat(t,"&_ACT=usrSearch").concat(r?"&"+r:"")}),i=function(e,t,n,i){var o=a.a[e]||a.a.default,c=e in a.a,s=o.filters.map(function(a){var c=document.createElement("a");return c.classList.add(o.isSpecial?"kc-filter-tag-special":"kc-filter-tag"),a.keyword&&n.includes(a.keyword)?c.classList.add("kc-filter-tag-active"):c.setAttribute("href",r(e,t,function(e,t,n){var a=new RegExp("(\\+)?(".concat(n.map(function(e){return"".concat(e,"|")}).join(""),")"),"gi");return e=e.replace(a,""),t?e?"".concat(e,"+").concat(t):t:e}(n,a.keyword,o.keywords),i)),c.appendChild(document.createTextNode(a.name)),c});s.some(function(e){return e.classList.contains("kc-filter-tag-active")})||(s[0].classList.add("kc-filter-tag-active"),s[0].removeAttribute("href"));var d=document.createElement("div");d.classList.add("kc-filters-container");var l=document.querySelector(".name");if(l){for(var u=1;u<s.length;u++)d.appendChild(s[u]);c?d.prepend(s[0]):d.append(s[0]),l.appendChild(d)}},o=function(e,t){if(e&&t&&70<t.getBoundingClientRect().height){t.classList.add("kc-description");var n=document.createElement("span");n.textContent="Show More",n.classList.add("kc-showmore-btn"),n.addEventListener("click",function(e){t.classList.contains("open")?(e.target.textContent="Show More",t.classList.remove("open")):(t.classList.add("open"),e.target.textContent="Show Less")}),e.insertBefore(n,e.children[3])}}},353:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n(355),r={"x-ps-api-key":"_ZGaiaXPmIU"},i=function(e){return{host:"www.photoshelter.com",path:e,headers:r}},o=function(e){return c(i("".concat("/psapi/v3","/gallery/").concat(e)))},c=function(e){return new Promise(function(t,n){a.get(e,function(e){var n="";e.on("data",function(e){n+=e}),e.on("end",function(){t(n)})}).on("error",function(e){n(e)})})}},363:function(e,t){},364:function(e,t){}}]);