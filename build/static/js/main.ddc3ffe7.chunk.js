(this.webpackJsonpcor=this.webpackJsonpcor||[]).push([[0],{188:function(e,a,t){e.exports=t(396)},193:function(e,a,t){},372:function(e,a,t){},393:function(e,a,t){},396:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(19),c=t.n(l),o=(t(193),t(7)),s=(t(50),t(101),t(68)),m=t(65),i=t.n(m),u=t(12),d=t(27),E=t(71),p=t(172),v=(t(51),t(9)),h=t(5);var f=function(e){var a,t=Object(n.useState)(!0),l=Object(o.a)(t,2),c=l[0],s=l[1],m=Object(n.useState)(),i=Object(o.a)(m,2),u=i[0],d=i[1],f=Object(n.useState)("confirmed"),y=Object(o.a)(f,2),g=y[0],b=y[1],j=Object(n.useState)(!1),O=Object(o.a)(j,2),S=O[0],w=O[1],C=Object(n.useState)(30),k=Object(o.a)(C,2),N=k[0],x=k[1],T=Object(n.useState)(["USA"]),A=Object(o.a)(T,2),D=A[0],L=A[1],I=Object(n.useState)(["USA"]),B=Object(o.a)(I,2),F=B[0],M=B[1],U=Object(n.useState)([]),K=Object(o.a)(U,2),P=K[0],R=K[1],W=Object(n.useState)("Line"),H=Object(o.a)(W,2),G=H[0],J=H[1];function z(e){var t=[],n=[],r=[],l=F,c="true";return P.forEach((function(e){if(l.includes(e.country)){for(var o=Object(p.a)({},e.timeline),s=Object.keys(o.cases),m=Object.values(o.cases),i=Object.values(o.deaths),u=Object.values(o.recovered),d=0;d<s.length;d++)t.length<m.length&&(t.push({}),n.push({}),r.push({}));for(var E=0;E<s.length;E++){if(c){var v=s[E].lastIndexOf("/");t[E].date=s[E].substring(0,v),n[E].date=s[E].substring(0,v),r[E].date=s[E].substring(0,v),a=s[E]}t[E][e.country]=m[E],n[E][e.country]=i[E],r[E][e.country]=u[E]}c=!1}})),"confirmed"===g&&"confirmed"===e?t:"recovered"===g||"recovered"===e?r:"deaths"===g||"deaths"===e?n:void 0}function _(){return r.a.createElement("span",{className:"graphMessage"},"Graph last updated on : ",a)}function Q(){var e;var a="Line"===G?h.h:"Bar"===G?h.c:"Area"===G?h.a:void 0;return 1===F.length&&(e=r.a.createElement(a,{dataKey:F[0],stroke:Y(F[0]),fill:Y(F[0]),dot:!1})),F.length>1&&(e=F.map((function(e){return r.a.createElement(a,{key:e,dataKey:e,stroke:Y(e),fill:Y(e),dot:!1})}))),e}Object(n.useEffect)((function(){fetch("https://corona.lmao.ninja/v2/historical?lastdays=".concat(N),{headers:{accept:"Accept: application/json"}}).then((function(e){return e.json()})).then((function(a){R(a),console.log("aaaaaaa"),s(!1);var t=e.name;"small"===e.from&&(d(e.name),M([e.name])),d(t)}))}),[N]);var Y=function(e){for(var a=0,t=0;t<e.length;t++)a=e.charCodeAt(t)+((a<<5)-a);for(var n="#",r=0;r<3;r++){n+=("00"+(a>>8*r&255).toString(16)).substr(-2)}return n};function Z(e){te(u),M([].concat(Object(E.a)(F),[e.target.value])),d(e.target.value)}function q(e){b(e.target.value)}function V(){w(!S)}function X(e){x(e.target.value)}function $(){return S?r.a.createElement(r.a.Fragment,null," ",r.a.createElement("button",{type:"button",onClick:function(e){return V()}},ae()),r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("input",{type:"number",min:"0",max:"200",placeholder:N,style:{width:50},onInput:X})," days")):r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("input",{type:"radio",value:"confirmed",checked:"confirmed"==g,onChange:q,name:"type"}),"Confirmed","  ",r.a.createElement("input",{type:"radio",value:"deaths",onChange:q,name:"type"}),"Deaths","  ",r.a.createElement("input",{type:"radio",value:"recovered",onChange:q,name:"type"}),"Recovered","  ",r.a.createElement("button",{type:"button",onClick:function(e){return V()}},ae())),r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("input",{type:"number",min:"0",max:"200",placeholder:N,style:{width:50},onChange:X})," days"))}function ee(){var e=Object.values(P),a=new Set;return e.map((function(e,t){return a.add(e.country)})),Array.from(a)}function ae(){return S?"Show confirmed":"Show All"}function te(e){var a=F.indexOf(e);-1!==a&&F.splice(a,1),M(Object(E.a)(F))}return c?r.a.createElement("div",{className:"spinners"}," ",r.a.createElement(v.a,{animation:"grow",variant:"primary"}),r.a.createElement(v.a,{animation:"grow",variant:"secondary"}),r.a.createElement(v.a,{animation:"grow",variant:"success"}),r.a.createElement(v.a,{animation:"grow",variant:"danger"}),r.a.createElement(v.a,{animation:"grow",variant:"warning"}),r.a.createElement(v.a,{animation:"grow",variant:"info"})):r.a.createElement("div",{className:"chartsNew"},"small"!==e.from?r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:function(e){return e.preventDefault}},r.a.createElement("label",null,"Country:"),r.a.createElement("select",{value:u,onChange:Z,className:"selectList"},r.a.createElement("option",{disabled:!0},"Select Country to compare"),ee().map((function(e,a){return r.a.createElement("option",{value:e,key:a},e)})),"))}"),function(){if(0!==F.length)return r.a.createElement(r.a.Fragment,null," ",r.a.createElement("select",{className:"selectList",name:"country",onChange:function(e){L(e.target.value)}},r.a.createElement("option",{checked:!0}," Select Country"),ee().map((function(e,a){return r.a.createElement("option",{value:e,key:a},e)})),"))}"),r.a.createElement("button",{type:"button",onClick:function(e){return a=D,void(F.includes(a+"")||M((function(e){return[].concat(Object(E.a)(e),[a])})));var a}},"Add to Graph"))}()),$(),function(){var e=r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{onChange:function(e){J(e.target.value)}},r.a.createElement("option",{value:"Line"}," Line"),r.a.createElement("option",{value:"Bar"}," Bar"),r.a.createElement("option",{value:"Area"}," Area")));return r.a.createElement("form",null,"Graph type: ",e)}(),r.a.createElement("div",{className:"cover"}," ","Click to remove: ",F.map((function(e){return r.a.createElement("span",{key:e,className:"displayedList",onClick:function(){return te(e)}},e," ")})))):$(),function(){var a,t="Line"===G?h.i:"Bar"===G?h.d:"Area"===G?h.b:"Pie"===G?h.j:"AreaLineComposed"===G?h.f:void 0;if("small"===e.from&&(a="120%"),!S){var n=z("confirmed"),l=g.charAt(0).toUpperCase()+g.slice(1);return r.a.createElement("div",{className:"graphs"},r.a.createElement("div",null," ",r.a.createElement("h3",null,l," "),r.a.createElement(h.k,{width:a,height:400},r.a.createElement(t,{data:n},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),Q())),_()))}return r.a.createElement("div",{className:"graphs"},r.a.createElement("div",null," ",r.a.createElement("h3",null,"Confirmed "),r.a.createElement(h.k,{width:"95%",height:400},r.a.createElement(t,{data:z("confirmed"),syncId:"anyId"},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),'syncId="anyId"',Q()))),r.a.createElement("div",null," ",r.a.createElement("h3",null,"Recovered "),r.a.createElement(h.k,{width:"95%",height:400},r.a.createElement(t,{data:z("recovered"),syncId:"anyId"},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),Q()))),r.a.createElement("div",null," ",r.a.createElement("h3",null,"Deaths "),r.a.createElement(h.k,{width:"95%",height:400},r.a.createElement(t,{data:z("deaths"),syncId:"anyId"},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),Q()))),_())}())};t(372);var y=function(e){var a,t=Object(n.useState)(!0),l=Object(o.a)(t,2),c=l[0],s=l[1],m=Object(n.useState)(e.name),i=Object(o.a)(m,1)[0],u=Object(n.useState)([]),d=Object(o.a)(u,2),E=d[0],p=d[1],f=Object(n.useState)("Line"),y=Object(o.a)(f,2),g=y[0],b=y[1];function j(){return r.a.createElement("span",{className:"graphMessage"},"Graph last updated on : ",a)}function O(e){var a="red";"cases"===e&&(a="blue");var t="Line"===g?h.h:"Bar"===g?h.c:"Area"===g?h.a:void 0;return r.a.createElement(t,{dataKey:e,stroke:a,fill:a,dot:!1})}return Object(n.useEffect)((function(){fetch("https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/nyt/states",{headers:{accept:"Accept: application/json"}}).then((function(e){return e.json()})).then((function(e){p(e),s(!1)}))}),[]),c?r.a.createElement("div",{className:"spinners"}," ",r.a.createElement(v.a,{animation:"grow",variant:"primary"}),r.a.createElement(v.a,{animation:"grow",variant:"secondary"}),r.a.createElement(v.a,{animation:"grow",variant:"success"}),r.a.createElement(v.a,{animation:"grow",variant:"danger"}),r.a.createElement(v.a,{animation:"grow",variant:"warning"}),r.a.createElement(v.a,{animation:"grow",variant:"info"})):r.a.createElement("div",{className:"chartsNew"},function(){var e=r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{onChange:function(e){b(e.target.value)}},r.a.createElement("option",{value:"Line"}," Line"),r.a.createElement("option",{value:"Bar"}," Bar"),r.a.createElement("option",{value:"Area"}," Area")));return r.a.createElement("form",null,"Graph type: ",e)}(),function(){var t,n="Line"===g?h.i:"Bar"===g?h.d:"Area"===g?h.b:"Pie"===g?h.j:"AreaLineComposed"===g?h.f:void 0;"small"===e.from&&(t="120%");var l=E.filter((function(e){return e.state===i&&(a=e.date),e.state===i}));return r.a.createElement("div",{className:"graphs"},r.a.createElement("div",null," ",r.a.createElement(h.k,{width:t,height:400},r.a.createElement(n,{data:l,syncId:"anyId"},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),'syncId="anyId"',O("cases"))),j()),r.a.createElement("div",null," ",r.a.createElement(h.k,{width:t,height:400},r.a.createElement(n,{data:l,syncId:"anyId"},r.a.createElement(h.e,{strokeDasharray:"3 3"}),r.a.createElement(h.m,{dataKey:"date"}),r.a.createElement(h.n,null),r.a.createElement(h.l,null),r.a.createElement(h.g,null),O("deaths"))),j()))}())};var g=function(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),l=t[0],c=t[1],s=function(){return c(!0)};return"state"===e.type?r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{cursor:"pointer"},onClick:s},e.name),r.a.createElement(d.a,{show:l,onHide:function(){return c(!1)},dialogClassName:"modal-100w",size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(d.a.Header,{closeButton:!0},r.a.createElement(d.a.Title,{id:"contained-modal-title-vcenter"},r.a.createElement("span",{className:"popUpHeader"}," ",e.name," "))),r.a.createElement(d.a.Body,null,r.a.createElement(y,{name:e.name})))):r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{cursor:"pointer"},onClick:s},e.name),r.a.createElement(d.a,{show:l,onHide:function(){return c(!1)},dialogClassName:"modal-100w",size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(d.a.Header,{closeButton:!0},r.a.createElement(d.a.Title,{id:"contained-modal-title-vcenter"},r.a.createElement("span",{className:"popUpHeader"}," ",e.name," "))),r.a.createElement(d.a.Body,null,r.a.createElement(f,{name:e.name,from:e.from,className:"popCharts"}))))},b=t(21),j=(t(373),t(49));var O=function(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)([]),m=Object(o.a)(c,2),d=m[0],E=m[1],p=Object(n.useState)(!0),h=Object(o.a)(p,2),f=h[0],y=h[1],b=Object(n.useState)(""),j=Object(o.a)(b,2),O=j[0],S=j[1],w=Object(n.useState)("desc"),C=Object(o.a)(w,2),k=C[0],N=C[1];function x(e){S(e.target.value);var a=t.filter((function(a){return a.state.toUpperCase().startsWith(e.target.value.toUpperCase())}));E(a)}function T(){return r.a.createElement("img",{src:i.a,style:{cursor:"pointer"},alt:"Logo",className:"image"})}function A(e){e.preventDefault()}function D(e){var a=d.slice().sort((function(a,t){var n=a[e],r=t[e];if("asc"!==k){var l=0;return n>r?l=1:n<r&&(l=-1),l}if("asc"===k){var c=0;return n<r?c=1:n>r&&(c=-1),c}}));E(a),N("asc"===k?"desc":"asc")}function L(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:A,style:{textAlign:"center"}},r.a.createElement("label",null,"Search:",r.a.createElement("input",{onChange:x,type:"text",name:"searching",value:O}))),r.a.createElement("div",{style:{overflow:"scrollable"}},r.a.createElement(s.a,{className:"table",striped:!0,bordered:!0,hover:!0,variant:"dark",style:{maxWidth:900}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"State",r.a.createElement("span",{onClick:function(){D("state")}},T())),r.a.createElement("th",null,"Total cases",r.a.createElement("span",{onClick:function(){D("cases")}},T())),r.a.createElement("th",null,"New Cases",r.a.createElement("span",{onClick:function(){D("todayCases")}},T())),r.a.createElement("th",null,"Deaths",r.a.createElement("span",{onClick:function(){D("deaths")}},T())),r.a.createElement("th",null," ","New Deaths",r.a.createElement("span",{onClick:function(){D("todayDeaths")}},T())),r.a.createElement("th",null," ","Active",r.a.createElement("span",{onClick:function(){D("active")}},T())),r.a.createElement("th",null," ","Tests",r.a.createElement("span",{onClick:function(){D("tests")}},T())),r.a.createElement("th",null,"Tests/1M",r.a.createElement("span",{onClick:function(){D("testsPerOneMillion")}},T())))),r.a.createElement("tbody",null,d.map((function(e,a){var t="",n="";0!==e.todayDeaths&&(t="danger",n="+");var l="",c="";return 0!==e.todayCases&&(c="+",l="casesNew"),r.a.createElement("tr",{key:a},r.a.createElement("td",{className:"country"},r.a.createElement("span",{style:{height:"100%"}}," ",r.a.createElement(g,{name:e.state,type:"state",from:"small"}))),r.a.createElement("td",null," ",r.a.createElement(u.a,{value:e.cases,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:l}," ",c,r.a.createElement(u.a,{value:e.todayCases,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"},r.a.createElement(u.a,{value:e.deaths,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:t}," ",n,r.a.createElement(u.a,{value:e.todayDeaths,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.active,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.tests,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.testsPerOneMillion,displayType:"text",thousandSeparator:!0})))}))))))}return Object(n.useEffect)((function(){fetch("https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/states?sort=cases",{headers:{accept:"Accept: application/json"}}).then((function(e){return e.json()})).then((function(e){l(e),E(e),console.log("aa"),y(!1)}))}),[]),f?r.a.createElement("div",{className:"spinners"},r.a.createElement(v.a,{animation:"grow",variant:"primary"}),r.a.createElement(v.a,{animation:"grow",variant:"secondary"}),r.a.createElement(v.a,{animation:"grow",variant:"success"}),r.a.createElement(v.a,{animation:"grow",variant:"danger"}),r.a.createElement(v.a,{animation:"grow",variant:"warning"})):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,L()))},S=t(170),w=t.n(S);t(393);var C=function(e){var a=Object(n.useState)(e.data),t=Object(o.a)(a,2),l=t[0],c=(t[1],Object(n.useState)(!0)),s=Object(o.a)(c,2),m=s[0],i=s[1],u=Object(n.useState)(),d=Object(o.a)(u,2),E=d[0],p=d[1],v=Object(n.useState)(),h=Object(o.a)(v,2),f=h[0],y=h[1],b=Object(n.useState)("cases"),j=Object(o.a)(b,2),O=j[0],S=j[1];Object(n.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){var a=e.coords;console.log("Longitude: ".concat(a.longitude)),p(a.latitude),y(a.longitude),i(!1)}),(function(e){console.warn("ERROR(".concat(e.code,"): ").concat(e.message)),p(37),y(95),i(!1)})),console.log(E)}));var C={lat:E,lng:f},k=l.map((function(e){return r.a.createElement("div",{className:"marker",key:e.country,lat:e.countryInfo.lat,lng:e.countryInfo.long},r.a.createElement(g,{name:e.country,from:"small",type:"map"}),r.a.createElement("img",{className:"flag",src:e.countryInfo.flag,alt:"country image"}),r.a.createElement("br",null),e[O])})),N=r.a.createElement(r.a.Fragment,null," ",r.a.createElement("input",{type:"radio",value:"cases",onChange:x,checked:"cases"==O})," ","Cases ",r.a.createElement("span",null," "),r.a.createElement("input",{type:"radio",name:"type",value:"deaths",onChange:x}),"Deaths",r.a.createElement("span",null," "),r.a.createElement("input",{type:"radio",name:"type",value:"recovered",onChange:x}),"Recovered");function x(e){S(e.target.value)}return m?"Loading...":r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,N,r.a.createElement("div",{style:{height:"100vh",width:"100%"}},r.a.createElement(w.a,{bootstrapURLKeys:{key:"AIzaSyDU_NJQ-CJfd_KHcSxi9SuTAk3lO_B7jYg"},defaultCenter:C,defaultZoom:4},k))))},k=t(171),N=t(17),x=t(70),T=t.n(x);var A=function(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(!0),s=Object(o.a)(c,2),m=s[0],i=s[1];return Object(n.useEffect)((function(){fetch("https://corona.lmao.ninja/v2/all").then((function(e){return e.json()})).then((function(e){l(e),console.log("aaaaaaa"),i(!1)}))}),[]),m?r.a.createElement("div",{className:"spinners"}," ",r.a.createElement(v.a,{animation:"grow",variant:"primary"}),r.a.createElement(v.a,{animation:"grow",variant:"secondary"}),r.a.createElement(v.a,{animation:"grow",variant:"success"}),r.a.createElement(v.a,{animation:"grow",variant:"danger"}),r.a.createElement(v.a,{animation:"grow",variant:"warning"})):r.a.createElement("div",null," ",function(){var e=new Date(parseInt(t.updated)).toString();return r.a.createElement("div",{className:"deckss"},r.a.createElement("span",{className:"worldWide"},"World Wide"),r.a.createElement(k.a,{className:"deck"},r.a.createElement(N.a,{bg:"secondary",text:"white",className:"text-center",style:{marginLeft:3}},r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,null,"Cases"),r.a.createElement(N.a.Text,null,r.a.createElement(T.a,{end:t.cases,duration:1.5,separator:","}))),r.a.createElement(N.a.Footer,null,r.a.createElement("small",null,"Last updated: ",e))),r.a.createElement(N.a,{bg:"danger",text:"white",className:"text-center",style:{}},r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,null,"Deaths"),r.a.createElement(N.a.Text,null," ",r.a.createElement(T.a,{end:t.deaths,duration:1.5,separator:","}))),r.a.createElement(N.a.Footer,null,r.a.createElement("small",null,"Last updated: ",e))),r.a.createElement(N.a,{bg:"success",text:"white",className:"text-center",style:{}},r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,null,"Recovered"),r.a.createElement(N.a.Text,null," ",r.a.createElement(T.a,{end:t.recovered,duration:1.5,separator:","}))),r.a.createElement(N.a.Footer,null,r.a.createElement("small",null,"Last updated: ",e)))))}())};var D=function(e){var a=Object(n.useState)([]),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)([]),d=Object(o.a)(m,2),E=d[0],p=d[1],h=Object(n.useState)("desc"),y=Object(o.a)(h,2),S=y[0],w=y[1],k=Object(n.useState)(""),N=Object(o.a)(k,2),x=N[0],T=N[1],D=Object(n.useState)(!0),L=Object(o.a)(D,2),I=L[0],B=L[1],F=Object(n.useState)(e.name),M=Object(o.a)(F,1)[0];function U(e){var a=l.slice().sort((function(a,t){var n=a[e],r=t[e];if("asc"!==S){var l=0;return n>r?l=1:n<r&&(l=-1),l}if("asc"===S){var c=0;return n<r?c=1:n>r&&(c=-1),c}}));c(a),w("asc"===S?"desc":"asc")}function K(e){T(e.target.value);var a=E.filter((function(a){return a.country.toUpperCase().startsWith(e.target.value.toUpperCase())}));c(a)}function P(e){e.preventDefault()}function R(){return r.a.createElement("img",{src:i.a,style:{cursor:"pointer"},alt:"Logo",className:"image"})}function W(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:P,style:{textAlign:"center"}},r.a.createElement("label",null,"Search:",r.a.createElement("input",{onChange:K,type:"text",name:"searching",value:x}))),r.a.createElement("div",{style:{overflow:"scrollable"}},r.a.createElement(s.a,{className:"table",striped:!0,bordered:!0,hover:!0,variant:"dark",style:{maxWidth:900}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Country",r.a.createElement("span",{onClick:function(){U("country")}},R())),r.a.createElement("th",null,"Total cases",r.a.createElement("span",{onClick:function(){U("cases")}},R())),r.a.createElement("th",null,"Deaths",r.a.createElement("span",{onClick:function(){U("deaths")}},R())),r.a.createElement("th",null,"Recovered",r.a.createElement("span",{onClick:function(){U("recovered")}},R())),r.a.createElement("th",null," ","New cases",r.a.createElement("span",{onClick:function(){U("todayCases")}},R())),r.a.createElement("th",null," ","New deaths",r.a.createElement("span",{onClick:function(){U("todayDeaths")}},R())),r.a.createElement("th",null," ","Active cases",r.a.createElement("span",{onClick:function(){U("active")}},R())),r.a.createElement("th",null,"Critical",r.a.createElement("span",{onClick:function(){U("critical")}},R())),r.a.createElement("th",null,"Cases/1M",r.a.createElement("span",{onClick:function(){U("casesPerOneMillion")}},R())),r.a.createElement("th",null,"Deaths/1M",r.a.createElement("span",{onClick:function(){U("deathsPerOneMillion")}},R())),r.a.createElement("th",null,"Tests/1M",r.a.createElement("span",{onClick:function(){U("testsPerOneMillion")}},R())))),r.a.createElement("tbody",null,l.map((function(e,a){var t="",n="";0!==e.todayDeaths&&(t="danger",n="+");var l="",c="";return 0!==e.todayCases&&(c="+",l="casesNew"),r.a.createElement("tr",{key:a},r.a.createElement("td",{className:"country"},r.a.createElement("span",{style:{height:"100%"}},r.a.createElement("img",{src:e.countryInfo.flag,alt:"flag",width:"20px"})," ",r.a.createElement(g,{name:e.country,from:"small"}))),r.a.createElement("td",null," ",r.a.createElement(u.a,{value:e.cases,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.deaths,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.recovered,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:l},c,r.a.createElement(u.a,{value:e.todayCases,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:t}," ",n,r.a.createElement(u.a,{value:e.todayDeaths,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.active,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.critical,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.casesPerOneMillion,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.deathsPerOneMillion,displayType:"text",thousandSeparator:!0})),r.a.createElement("td",{className:"datas"}," ",r.a.createElement(u.a,{value:e.testsPerOneMillion,displayType:"text",thousandSeparator:!0})))}))))))}return Object(n.useEffect)((function(){fetch(M+"?sort=cases",{headers:{accept:"Accept: application/json"}}).then((function(e){return e.json()})).then((function(e){c(e),p(e),console.log("aaaaaaa"),B(!1)}))}),[M]),I?r.a.createElement("div",{className:"spinners"}," ",r.a.createElement(v.a,{animation:"grow",variant:"primary"}),r.a.createElement(v.a,{animation:"grow",variant:"secondary"}),r.a.createElement(v.a,{animation:"grow",variant:"success"}),r.a.createElement(v.a,{animation:"grow",variant:"danger"}),r.a.createElement(v.a,{animation:"grow",variant:"warning"})):r.a.createElement("div",{className:"whole"},r.a.createElement(b.d,{className:"tabs"},r.a.createElement(b.b,null,r.a.createElement(b.a,null," ",r.a.createElement(j.a,{variant:"primary"}," All countries ")),r.a.createElement(b.a,null," ",r.a.createElement(j.a,{variant:"warning"},"World Map")),r.a.createElement(b.a,null," ",r.a.createElement(j.a,{variant:"secondary"},"USA States")),r.a.createElement(b.a,null," ",r.a.createElement(j.a,{variant:"info"},"Graphs"))),r.a.createElement(b.c,null,r.a.createElement(A,null),r.a.createElement("br",null)," ",W()),r.a.createElement(b.c,null,r.a.createElement(C,{data:l})),r.a.createElement(b.c,null,r.a.createElement(O,null)),r.a.createElement(b.c,null,r.a.createElement(f,{name:"USA"}))))};var L=function(e){return r.a.createElement("div",null,r.a.createElement(D,{name:"https://corona.lmao.ninja/v2/countries"}))};c.a.render(r.a.createElement(L,null),document.getElementById("root"))},50:function(e,a,t){},51:function(e,a,t){},65:function(e,a,t){e.exports=t.p+"static/media/sort.6a59f831.png"}},[[188,1,2]]]);
//# sourceMappingURL=main.ddc3ffe7.chunk.js.map