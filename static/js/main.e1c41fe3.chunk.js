(this["webpackJsonpmy-movie-search"]=this["webpackJsonpmy-movie-search"]||[]).push([[0],{12:function(e,t,n){},46:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var c=n(32),a=n.n(c),r=n(22),s=n(5),i=n.n(s),o=n(11),l=n(3),u=n(0),j=(n(12),n(2)),d=n(9),h=Object(u.createContext)(null),b=n(33),x=n.n(b),m=n(34),O=(n(46),n(1));function f(e){return m.isMobile?Object(O.jsx)("div",{className:"overflow-y-auto",children:e.children}):Object(O.jsx)(x.a,{className:"AppScroolbar",children:e.children})}var p=n(19),v=n.n(p),g="api_key=cfe422613b250f702980a3bbf9e90716",w="https://api.themoviedb.org",N="https://image.tmdb.org/t/p/",S="".concat(N,"w500"),y="".concat(S,"null"),C="".concat(N,"originalnull"),k="".concat(w,"/3/movie/popular?").concat(g),T=function(e){return e.pathname.substring(0,e.pathname.lastIndexOf("/")+1)},M=function(e){return e.pathname.substring(e.pathname.lastIndexOf("/")+1)};function I(e){return E.apply(this,arguments)}function E(){return(E=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("string"!==typeof t){e.next=6;break}return e.next=3,D(t);case 3:n=e.sent,e.next=12;break;case 6:if("object"!==typeof t){e.next=10;break}n=t,e.next=12;break;case 10:return console.error("Passed ".concat(typeof t," input to getMoviesDataToDisplayInSearch. You must pass string or object")),e.abrupt("return");case 12:return e.abrupt("return",n.map((function(e){return[e.original_title,e.id,S+e.poster_path]})));case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return R.apply(this,arguments)}function R(){return(R=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get(t);case 2:return n=e.sent,e.abrupt("return",n.data.results);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){return"".concat(w,"/3/search/movie?query=%").concat(e,"&").concat(g)}function H(e){return L.apply(this,arguments)}function L(){return(L=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("".concat(w,"/3/movie/").concat(t,"?&").concat(g));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return Object(u.useEffect)((function(){function e(){document.documentElement.style.setProperty("--vh","".concat(window.innerHeight/100,"px"))}return window.addEventListener("resize",e()),window.addEventListener("orientationchange",e()),function(){document.removeEventListener("resize",e),document.removeEventListener("orientationchange",e)}}),[]),Object(O.jsx)(O.Fragment,{})}var B=n(16),F=n.n(B),Q=n.p+"static/media/BgGreen2.a17d9a1b.jpg";function A(e){var t=e.backgroundIMG;return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",{className:"BgGradient"}),Object(O.jsx)(d.a,{children:Object(O.jsx)(d.b.img,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},className:"BgImage",src:t!==C?t:Q},t)})]})}var G=n(15),W=n.p+"static/media/no_image.2f8a70e1.png";function q(){var e=Object(u.useContext)(h),t=e.searchbarText,n=e.suggestions,c=e.setMovieID;return Object(O.jsx)("div",{className:"StartPageCardTransition",children:Object(O.jsxs)("div",{className:"StartPageCard",children:[Object(O.jsx)("p",{className:"Popular",children:""===t||null===t?"Trending Now":""}),Object(O.jsx)("div",{className:"row",children:n.map((function(e,t){return Object(O.jsx)("div",{className:"cardContainer col-xl-2 col-md-3 col-4",children:Object(O.jsx)(G.b,{to:"/movie/".concat(e[1]),className:"linkStyle",children:Object(O.jsxs)("div",{className:"cardFS",onClick:function(){c(e[1])},children:[Object(O.jsx)("img",{className:"posterImage",src:e[2]!==y?e[2]:W,alt:"movie poster"}),Object(O.jsx)("h1",{className:"FS-title",children:e[0]})]})})},t)}))})]})})}function z(){var e=Object(u.useContext)(h),t=e.searchbarText,n=e.oldSearchbarText,c=e.onSearchbarTextChanging,a=e.handleClickOnInput;return Object(O.jsx)("div",{className:"col-lg-6 col-md-8 col-sm-9 col-12 st-search st-animation",children:Object(O.jsx)("div",{className:"row",children:Object(O.jsx)("div",{className:"col-12",children:Object(O.jsx)("form",{onSubmit:function(e){e.preventDefault()},children:Object(O.jsx)("input",{onChange:c,className:"myForm1 myForm-animation",type:"text",placeholder:"Search Movie Title...",value:""!==t?t:n,onClick:a})})})})})}function J(){return Object(O.jsxs)(d.b.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},children:[Object(O.jsx)(z,{}),Object(O.jsx)(q,{})]})}var $=Object(u.createContext)(null);function K(){var e=Object(u.useContext)(h),t=e.searchbarText,n=e.setSearchbarText,c=e.oldSearchbarText,a=e.setMovieID,r=e.pushToHistory,s=e.setAllMoviesData,i=e.fetchPopularMoviesOnStartPage,o=Object(u.useContext)($).setShowQuickSearchRes;return[function(e){t&&void 0!==e&&(r("/movie/".concat(e[1])),n(c),o(!1),a(e[1]))},function(){s([]),n(""),i(),r("/")}]}function V(){var e=Object(u.useContext)($),t=e.showQuickSearchRes,n=e.indexOfHighlightedMovie,c=Object(u.useContext)(h),a=c.searchbarText,r=c.suggestions,s=c.allMoviesData,i=c.pushToHistory,o=function(){var e=Object(u.useContext)($),t=e.indexOfHighlightedMovie,n=e.setIndexOfHighlightedMovie;return[function(e,n,c){var a=e.split(new RegExp("(".concat(n,")"),"gi"));return Object(O.jsxs)("span",{children:[" ",a.map((function(e,a){return Object(O.jsx)("span",{style:e.toLowerCase()===n.toLowerCase()&&t!==c?{color:"#00FC87",fontWeight:"bold"}:e.toLowerCase()===n.toLowerCase()?{fontWeight:"bold"}:{},children:e},a)}))," "]})},function(e){n(parseInt(e.target.getAttribute("index")))}]}(),j=Object(l.a)(o,2),d=j[0],b=j[1],x=K(),m=Object(l.a)(x,1)[0];return Object(O.jsx)(O.Fragment,{children:s.length>0?Object(O.jsxs)("ul",{className:"searchbar_ul "+(t&&a&&"fadeIn"),children:[r.slice(0,5).map((function(e,t){return Object(O.jsx)("li",{className:"searchbar_li "+(n===t&&"active"),onClick:function(){return m(e)},onMouseEnter:b,index:t,children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("img",{src:e[2]!==y?e[2]:W,className:"col-lg-2 col-md-3 col-sm-4 col-3 quickSearchImage",alt:"movie poster"}),Object(O.jsx)("p",{className:"col-lg-10 col-md-9 col-sm-8 col-9",children:d(e[0],a,t)})]})},t)})),Object(O.jsx)("li",{className:"searchbar_li showMore "+(5===n&&"active"),onMouseEnter:b,onClick:function(){return i("/")},index:5,children:Object(O.jsx)("p",{children:"show more"})})]}):a?Object(O.jsx)("ul",{className:"fadeIn searchbar_li showMore noResult",children:Object(O.jsx)("li",{children:"no result"})}):void 0})}var Y=n.p+"static/media/tmdb.6852b1ef.svg";function U(){var e=Object(u.useContext)(h),t=e.searchbarText,n=e.oldSearchbarText,c=e.onSearchbarTextChanging,a=function(){var e=Object(u.useContext)(h),t=e.suggestions,n=e.pushToHistory,c=Object(u.useContext)($),a=c.showQuickSearchRes,r=c.setShowQuickSearchRes,s=c.indexOfHighlightedMovie,i=c.setIndexOfHighlightedMovie,o=K(),j=Object(l.a)(o,1)[0];return F.a.config({up:function(){isNaN(s)?i(5):i(s<0?5:function(e){return e-1})},down:function(){isNaN(s)?i(0):i(s>5?0:function(e){return e+1})}}),[function(e){13===(e.keyCode||e.which)&&(a||r(!0),a&&(5===s?n("/"):j(t[s])))}]}(),r=Object(l.a)(a,1)[0],s=function(){var e=Object(u.useContext)(h),t=e.searchbarText,n=e.setSearchbarText,c=e.oldSearchbarText,a=e.setOldSearchbarText,r=e.showResInSearchBar,s=Object(u.useContext)($).setShowQuickSearchRes,l=Object(u.useRef)();function j(e){l.current.contains(e.target)||s(!1)}return Object(u.useEffect)((function(){return document.addEventListener("mousedown",j),function(){document.removeEventListener("mousedown",j)}}),[]),[l,function(){var e=Object(o.a)(i.a.mark((function e(o){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(!0),""===t&&(r(c),n(c),a(""));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()]}(),j=Object(l.a)(s,2),d=j[0],b=j[1],x=K(),m=Object(l.a)(x,2)[1];return Object(O.jsx)("div",{className:"searchContainer",children:Object(O.jsxs)("div",{className:"row searchSecondContainer",children:[Object(O.jsx)("div",{className:"col-xs-12 col-sm-3 col-lg-3 p-0",children:Object(O.jsx)("img",{src:Y,className:"logo",alt:"The Movie Database Logo",onClick:m})}),Object(O.jsxs)("div",{className:"col-xs-12 col-sm-9 col-lg-9 p-0 pl-3 searchInside",ref:d,children:[Object(O.jsx)("form",{className:"searchbox",onSubmit:function(e){return e.preventDefault()},children:Object(O.jsx)("input",{onChange:c,className:"movieSearchBar",type:"text",placeholder:"Search Movie Title...",value:""!==t?t:n,onKeyPress:r,onClick:b})}),Object(O.jsx)(V,{})]})]})})}function X(e){var t=[];return void 0!==e&&e.forEach((function(e){t.push(e.name)})),t.join(", ")}function Z(){var e=Object(u.useContext)(h).movieData,t=e.original_title,n=e.overview,c=e.tagline,a=e.poster_path,r=e.production_companies,s=e.genres,i=e.release_date,o=e.runtime,l=e.revenue,j=e.vote_average,b=S+a,x=X(r),m=X(s);return"undefined"!==j&&0!==j||(j="-"),l="undefined"===l||0===l?"-":parseInt(l).toLocaleString()+" $",Object(O.jsx)("div",{className:"MovieCard",children:Object(O.jsx)(d.a,{exitBeforeEnter:!0,children:Object(O.jsxs)(d.b.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},className:"Card row",children:[Object(O.jsxs)("div",{className:"meta-data-container col-12 col-md-7 col-lg-8",children:[Object(O.jsx)("h1",{children:t}),Object(O.jsx)("span",{className:"tagline",children:c}),Object(O.jsx)("p",{children:n}),Object(O.jsxs)("div",{className:"additional-details",children:[Object(O.jsx)("span",{className:"genre-list",children:m}),Object(O.jsx)("span",{className:"production-list",children:x}),Object(O.jsxs)("div",{className:"row release-details",children:[Object(O.jsxs)("div",{className:"col-6",children:[" Original Release: ",Object(O.jsx)("span",{className:"meta-data",children:i})]}),Object(O.jsxs)("div",{className:"col-6",children:[" Running Time: ",Object(O.jsxs)("span",{className:"meta-data",children:[o," min"]})," "]}),Object(O.jsxs)("div",{className:"col-6",children:[" Box Office: ",Object(O.jsx)("span",{className:"meta-data",children:l})]}),Object(O.jsxs)("div",{className:"col-6",children:[" Vote Average: ",Object(O.jsx)("span",{className:"meta-data",children:j})]})]})]})]}),Object(O.jsx)("div",{className:"posterContainer order-md-first col-12 col-md-5 col-lg-4",children:Object(O.jsx)("img",{className:"poster",src:null!==a?b:W,alt:"poster"})})]},t)})})}function ee(){var e=Object(u.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],a=Object(u.useState)(),r=Object(l.a)(a,2),s=r[0],i=r[1];return Object(O.jsx)($.Provider,{value:{showQuickSearchRes:n,setShowQuickSearchRes:c,indexOfHighlightedMovie:s,setIndexOfHighlightedMovie:i},children:Object(O.jsxs)(d.b.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},children:[Object(O.jsx)(U,{}),Object(O.jsx)(Z,{})]})})}function te(){var e=Object(j.g)(),t=Object(j.f)(),n=Object(u.useState)(),c=Object(l.a)(n,2),a=c[0],s=c[1],b=Object(u.useState)([]),x=Object(l.a)(b,2),m=x[0],p=x[1],v=Object(u.useState)(""),g=Object(l.a)(v,2),w=g[0],N=g[1];function S(){return y.apply(this,arguments)}function y(){return(y=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,I(k);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(u.useEffect)((function(){""===w&&S()}),[w]);var C=Object(u.useState)(function(e){var t=M(e);return""===t?"157336":t}(e)),E=Object(l.a)(C,2),R=E[0],L=E[1],B=Object(u.useState)({}),Q=Object(l.a)(B,2),G=Q[0],W=Q[1];Object(u.useEffect)(Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=W,e.next=3,H(R);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)}))),[R]),Object(u.useEffect)((function(){L(M(e))}),[e.pathname]);var q=Object(u.useState)([]),z=Object(l.a)(q,2),$=z[0],K=z[1],V=Object(u.useState)(""),Y=Object(l.a)(V,2),U=Y[0],X=Y[1],Z=function(){var e=Object(o.a)(i.a.mark((function e(t){var n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0===t.length&&X(""),!(t.length>=1)){e.next=11;break}return e.next=4,D(_(t));case 4:return n=e.sent,e.next=7,I(n);case 7:c=e.sent,K(n),p(c),X(t);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.useEffect)((function(){console.log("allMoviesData.length ".concat($.length)),console.log("suggestions.length ".concat($.length))}),[$]),Object(u.useEffect)((function(){console.log({suggestions:m})}),[m]),Object(u.useEffect)((function(){console.log({movieData:G}),s("https://image.tmdb.org/t/p/original".concat(G.backdrop_path))}),[G]),Object(u.useEffect)((function(){console.log("searchbarText: ".concat(w))}),[w]),Object(u.useEffect)((function(){console.log("backgroundIMG: ".concat(a))}),[a]),Object(O.jsxs)("div",{children:[Object(O.jsx)(P,{}),Object(O.jsx)(A,{backgroundIMG:a}),Object(O.jsx)("div",Object(r.a)(Object(r.a)({id:"app"},F.a.events),{},{tabIndex:"1",children:Object(O.jsx)(h.Provider,{value:{movieID:R,movieData:G,searchbarText:w,setSearchbarText:N,oldSearchbarText:U,setOldSearchbarText:X,suggestions:m,setSuggestions:p,onSearchbarTextChanging:function(e){var t=e.target.value.replace(/[^\w\s]/gi,"");N(t),Z(t)},allMoviesData:$,setAllMoviesData:K,setMovieID:L,fetchPopularMoviesOnStartPage:S,showResInSearchBar:Z,history:t,pushToHistory:function(e){return t.push(e)}},children:Object(O.jsx)(f,{children:Object(O.jsx)(d.a,{exitBeforeEnter:!0,children:Object(O.jsxs)(j.c,{location:e,children:[Object(O.jsx)(j.a,{exact:!0,path:"/",render:function(){return Object(O.jsx)(J,{})}}),Object(O.jsx)(j.a,{exact:!0,path:"/movie/:".concat(R),render:function(){return Object(O.jsx)(ee,{})}})]},T(e))})})})}))]})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(O.jsx)(G.a,{basename:"/movie-search-app",children:Object(O.jsx)(te,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.e1c41fe3.chunk.js.map