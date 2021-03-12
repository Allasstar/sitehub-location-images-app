(this["webpackJsonploc-img-react-pcui"]=this["webpackJsonploc-img-react-pcui"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var o,a,c,i=n(2),s=n.n(i),l=n(8),r=n.n(l),d=(n(13),n(5)),u=n(7),g=(n(14),n(1)),h=n(6),j=n(0),v=new h.Observer({status:"Status: ok",locations:{},locationImages:{}}),b=-1;var p=function(){return Object(j.jsxs)(g.Container,{class:"bgc1",children:[Object(j.jsx)(f,{}),Object(j.jsx)(g.Divider,{}),Object(j.jsx)(x,{}),Object(j.jsx)(g.Divider,{}),Object(j.jsx)(m,{})]})};function f(){var t={observer:v,path:"status"};return Object(j.jsxs)(g.Container,{height:40,children:[Object(j.jsx)(g.Label,{text:"SiteHub"}),Object(j.jsx)(g.TextInput,{placeholder:"enter project id",onChange:I}),Object(j.jsx)(g.TextInput,{placeholder:"enter lambda token",onChange:O}),Object(j.jsx)(g.Button,{text:"Find Location",icon:"E129",enabled:!0,onClick:w}),Object(j.jsx)(g.Label,{binding:new h.BindingTwoWay,link:t})]})}function x(){var t,e,n=Object(i.useState)({}),o=Object(u.a)(n,2),a=o[0],c=o[1];v.on("locations:set",c);var s=Object(i.useState)({}),l=Object(u.a)(s,2),r=l[0],d=l[1];return v.on("locationImages:set",d),Object(j.jsxs)(g.Container,{class:"col2",children:[Object(j.jsx)(g.Label,{text:"Locations"}),Object(j.jsx)(g.Container,{class:"bgc2",hidden:!1,height:250,scrollable:!0,children:null===a||void 0===a||null===(t=a.value)||void 0===t?void 0:t.map((function(t){return[Object(j.jsx)(g.Button,{text:"Select > id: ".concat(t.id,"  title: ").concat(t.title),icon:"E131",width:220,enabled:!0,onClick:function(){return C(t)}})]}))}),Object(j.jsx)(g.Label,{text:"Location Images"}),Object(j.jsx)(g.Container,{class:"bgc3",hidden:!1,height:250,scrollable:!0,children:null===r||void 0===r||null===(e=r.value)||void 0===e?void 0:e.map((function(t){return[Object(j.jsxs)(g.Container,{children:[Object(j.jsx)(g.Label,{text:"id: ".concat(t.id," - Name: ").concat(t.imageURL.split("/").reverse()[0])}),Object(j.jsx)(g.Button,{text:"Open",icon:"E117",width:80,enabled:!0,onClick:function(){window.open(t.imageURL)}}),Object(j.jsx)(g.Button,{text:"Delete",icon:"E124",width:80,enabled:!0,onClick:function(){return y(t.id)}})]})]}))})]})}function m(){return Object(j.jsxs)(g.Container,{class:"bgc4",children:[Object(j.jsx)(g.Label,{text:"Add URLs"}),Object(j.jsx)(g.ArrayInput,{enabled:!0,width:720,onChange:function(t){return S(t)},type:"string"}),Object(j.jsx)(g.Button,{text:"Apply",icon:"E133",enabled:!0,onClick:function(){return L()}})]})}var O=function(t){o=t,console.log("token =",o)},I=function(t){a=t,console.log("projectId =",a)},S=function(t){c=t,console.log("changeLocationImages",c)},w=function(){b=-1,v.set("locations",{}),v.set("locationImages",{}),v.set("status","Status: finding locations for project id: ".concat(a));var t=new Headers;t.append("Authorization",o),t.append("project_id",a),fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/locations",{method:"GET",headers:t}).then((function(t){return t.text()})).then((function(t){var e=JSON.parse(t);console.log("Location count:",null===e||void 0===e?void 0:e.length),v.set("status","Status: finded [".concat(null===e||void 0===e?void 0:e.length,"] locations")),v.set("locations",{value:e})})).catch((function(t){console.log("error",t),v.set("status","Status: error [".concat(t,"]"))})),console.log("loadLocations =",a)},C=function(t){b=-1,v.set("locationImages",{}),v.set("status","Status: loading images for location id: ".concat(t.id));var e=new Headers;e.append("Authorization",o),e.append("location_id",t.id),fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images",{method:"GET",headers:e}).then((function(t){return t.text()})).then((function(e){var n=JSON.parse(e);console.log("Location count:",null===n||void 0===n?void 0:n.length),null===n||void 0===n||n.sort((function(t,e){return t.id-e.id})),v.set("locationImages",{value:n}),v.set("status","Status: loaded [".concat(null===n||void 0===n?void 0:n.length,"] images for location id: ").concat(t.id)),b=t.id})).catch((function(t){console.log("error",t),v.set("status","Status: error [".concat(t,"]"))}))},L=function(){var t,e;if(0!==(null===(t=c)||void 0===t?void 0:t.length)&&null!==c){var n,a=[],i=Object(d.a)(c);try{for(i.s();!(n=i.n()).done;){var s=n.value;""!==s&void 0!==s&&a.push({locationId:b,imageURL:s})}}catch(u){i.e(u)}finally{i.f()}if(0!==(null===a||void 0===a?void 0:a.length))if(b<0)v.set("status","Status: need select locationId");else{v.set("status","Status: start adding [".concat(null===(e=c)||void 0===e?void 0:e.length,"] images to locationId: [").concat(b,"]"));var l=new Headers;l.append("Authorization",o),l.append("Content-Type","application/json");var r=JSON.stringify(a);fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images",{method:"POST",headers:l,body:r}).then((function(t){return t.text()})).then((function(t){var e;v.set("status","Status: added [".concat(null===(e=c)||void 0===e?void 0:e.length,"] images to locationId: [").concat(b,"]")),console.log(t),t=JSON.parse(t);var n,o=v.get("locationImages").value,a=Object(d.a)(t);try{for(a.s();!(n=a.n()).done;){var i=n.value;o.push(i)}}catch(u){a.e(u)}finally{a.f()}null===o||void 0===o||o.sort((function(t,e){return t.id-e.id})),v.set("locationImages",{}),v.set("locationImages",{value:o})})).catch((function(t){console.log("error",t),v.set("status","Status: error [".concat(t,"]"))}))}else v.set("status","Status: URL field(s) is empty")}else v.set("status","Status: need add URLs")},y=function(t){console.log("delete img id =",t),v.set("status","Status: start deleting image id [".concat(t,"] in locationId: [").concat(b,"]"));var e=new Headers;e.append("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pF3q46_CLIyP_1QZPpeccbs-hC4n9YW2VMBjKrSO6Wg"),e.append("Content-Type","application/json");var n=JSON.stringify([{id:t}]);fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images",{method:"DELETE",headers:e,body:n}).then((function(t){return t.text()})).then((function(e){console.log(e),v.set("status","Status: deleted image id [".concat(t,"] in locationId: [").concat(b,"]"));var n=v.get("locationImages").value,o=n.findIndex((function(e){return(null===e||void 0===e?void 0:e.id)===t}));delete n[o],null===n||void 0===n||n.sort((function(t,e){return t.id-e.id})),v.set("locationImages",{}),v.set("locationImages",{value:n})})).catch((function(t){console.log("error",t),v.set("status","Status: need select locationId")}))},k=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),o(t),a(t),c(t),i(t)}))};r.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(p,{})}),document.getElementById("root")),document.title="SiteHub",k()}},[[16,1,2]]]);
//# sourceMappingURL=main.79bf40b0.chunk.js.map