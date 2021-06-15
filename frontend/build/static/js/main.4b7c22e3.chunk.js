(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{109:function(e,t,r){},271:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(38),c=r.n(o),l=(r(109),r(4)),s=r(15),i=r(8),d=r(11),u=r(2),b=r.n(u),f=r(52),p=r(5),j=r(100),x=r.n(j).a.create({validateStatus:function(e){return e<300}});function h(e){return m.apply(this,arguments)}function m(){return(m=Object(p.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/run",t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=r(14);function O(){return w.apply(this,arguments)}function w(){return(w=Object(p.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/api/checkpoint");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e){return C.apply(this,arguments)}function C(){return(C=Object(p.a)(b.a.mark((function e(t){var r,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(new Date).toLocaleString(),e.next=3,x.post("/api/checkpoint",Object(v.a)(Object(v.a)({},t),{},{timestamp:r}));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return y.apply(this,arguments)}function y(){return(y=Object(p.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/api/checkpoint/".concat(t));case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var N=Object(i.b)("checkpoint/fetch",function(){var e=Object(p.a)(b.a.mark((function e(t,r){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.rejectWithValue,e.prev=1,e.next=4,O();case 4:return e.abrupt("return",e.sent);case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",n(e.t0.response.data));case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,r){return e.apply(this,arguments)}}()),S=Object(i.b)("checkpoint/save",function(){var e=Object(p.a)(b.a.mark((function e(t,r){var n,a,o,c,l,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.getState,a=r.rejectWithValue,o=n(),c=o.editor,l=o.notebook,s=o.browser,l.selectedDataset&&null!==s){e.next=4;break}return e.abrupt("return",a("Rejected"));case 4:return e.prev=4,e.next=7,g({editorState:c,browserState:s,selectedDataset:l.selectedDataset});case 7:return e.abrupt("return",e.sent);case 10:return e.prev=10,e.t0=e.catch(4),e.abrupt("return",a(e.t0.response.data));case 13:case"end":return e.stop()}}),e,null,[[4,10]])})));return function(t,r){return e.apply(this,arguments)}}()),L=Object(i.b)("checkpoint/load",function(){var e=Object(p.a)(b.a.mark((function e(t,r){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.rejectWithValue,e.prev=1,e.next=4,k(t);case 4:return e.abrupt("return",e.sent);case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",n(e.t0.response.data));case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,r){return e.apply(this,arguments)}}()),B=Object(i.c)({name:"checkpoint",initialState:[],reducers:{},extraReducers:function(e){e.addCase(N.fulfilled,(function(e,t){return t.payload}))}}),I=["hasCellError","shouldUpdateBrowser"],M=["hasCellError","shouldUpdateBrowser"],D=Object(i.c)({name:"editor",initialState:{cells:[],cellCounter:0,execCounter:0,focusedCellId:null,lastExecutedCellId:null,updateBrowserCellId:null},reducers:{focusCell:function(e,t){var r=t.payload;e.focusedCellId=r||null},addCell:function(e){e.cellCounter+=1;var t={id:e.cellCounter,execStatus:"",errorStatus:!1,editorContent:"",numOfLines:0};if(e.focusedCellId){var r=e.cells.findIndex((function(t){return t.id===e.focusedCellId}));r>-1&&e.cells.splice(r+1,0,t)}else e.cells.push(t)},changeCell:function(e,t){var r=t.payload,n=e.cells.findIndex((function(t){return t.id===e.focusedCellId}));n>-1&&(e.cells[n].numOfLines=r.split("\n").length,e.cells[n].editorContent=r)},setCellStatus:function(e,t){var r,n=t.payload;n.execStatus?r=n.execStatus:(e.execCounter+=1,r=e.execCounter);var a=e.cells.findIndex((function(e){return e.id===n.id}));a>-1&&(e.cells[a].execStatus=r,e.cells[a].errorStatus=n.errorStatus)},deleteCell:function(e){var t=e.cells.findIndex((function(t){return t.id===e.focusedCellId}));t>-1&&e.cells.splice(t,1)},moveCell:function(e,t){var r=t.payload,n=e.cells.findIndex((function(t){return t.id===e.focusedCellId})),a=Math.min(Math.max(n+r,0),e.cells.length-1);n>-1&&e.cells.splice(a,0,e.cells.splice(n,1)[0])},loadCells:function(e,t){var r=t.payload;e.cells=r},setLastExecutedCellId:function(e,t){var r=t.payload;e.lastExecutedCellId=r},setBrowserUpdateCellId:function(e,t){var r=t.payload;e.updateBrowserCellId=r}},extraReducers:function(e){e.addCase(L.fulfilled,(function(e,t){return t.payload.editorState}))}}),R=D.actions,W=R.focusCell,E=R.addCell,A=R.changeCell,V=R.setCellStatus,T=R.deleteCell,U=R.moveCell,H=(R.loadCells,R.setLastExecutedCellId),P=R.setBrowserUpdateCellId,z=Object(i.b)("editor/runCell",function(){var e=Object(p.a)(b.a.mark((function e(t,r){var n,a,o,c,l,s,i,d,u,p,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.getState,a=r.dispatch,o=r.rejectWithValue,c=n(),l=c.notebook,s=c.editor,(i=s.cells.find((function(e){return e.id===s.focusedCellId})))&&l.selectedDataset){e.next=5;break}return e.abrupt("return",o("Rejected"));case 5:return e.prev=5,a(V({id:i.id,execStatus:"*",errorStatus:!1})),e.next=9,h({selectedDataset:l.selectedDataset,editorContent:i.editorContent});case 9:return d=e.sent,u=d.hasCellError,p=d.shouldUpdateBrowser,j=Object(f.a)(d,I),a(V({id:i.id,errorStatus:u})),a(H(i.id)),p&&a(P(i.id)),e.abrupt("return",j);case 19:return e.prev=19,e.t0=e.catch(5),e.abrupt("return",o(e.t0.response.data));case 22:case"end":return e.stop()}}),e,null,[[5,19]])})));return function(t,r){return e.apply(this,arguments)}}()),J=Object(i.b)("editor/runAllCells",function(){var e=Object(p.a)(b.a.mark((function e(t,r){var n,a,o,c,l,s,i,u,p,j,x,m,v,O;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.dispatch,a=r.getState,o=r.rejectWithValue,c=a(),l=c.notebook,s=c.editor,l.selectedDataset){e.next=4;break}return e.abrupt("return",o("Rejected"));case 4:e.prev=4,u=Object(d.a)(s.cells),e.prev=6,u.s();case 8:if((p=u.n()).done){e.next=23;break}return j=p.value,n(V({id:j.id,execStatus:"*",errorStatus:!1})),e.next=13,h({selectedDataset:l.selectedDataset,editorContent:j.editorContent});case 13:x=e.sent,m=x.hasCellError,v=x.shouldUpdateBrowser,O=Object(f.a)(x,M),i=O,n(V({id:j.id,errorStatus:m})),n(H(j.id)),v&&n(P(j.id));case 21:e.next=8;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(6),u.e(e.t0);case 28:return e.prev=28,u.f(),e.finish(28);case 31:return e.abrupt("return",i);case 34:return e.prev=34,e.t1=e.catch(4),e.abrupt("return",o(e.t1.response.data));case 37:case"end":return e.stop()}}),e,null,[[4,34],[6,25,28,31]])})));return function(t,r){return e.apply(this,arguments)}}()),_=Object(i.c)({name:"notebook",initialState:{loading:!1,error:null,selectedDataset:null,showCheckpointModal:!1},reducers:{selectDataset:function(e,t){var r=t.payload;e.selectedDataset=r},toggleCheckpointModal:function(e,t){var r=t.payload;e.showCheckpointModal=r}},extraReducers:function(e){e.addCase(z.pending,(function(e){e.loading=!0,e.error=null})),e.addCase(z.fulfilled,(function(e){e.loading=!1,e.error=null})),e.addCase(z.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||null})),e.addCase(J.pending,(function(e){e.loading=!0,e.error=null})),e.addCase(J.fulfilled,(function(e){e.loading=!1,e.error=null})),e.addCase(J.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||null})),e.addCase(N.pending,(function(e){e.loading=!0,e.error=null})),e.addCase(N.fulfilled,(function(e){e.loading=!1,e.error=null})),e.addCase(N.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||null})),e.addCase(S.pending,(function(e){e.loading=!0,e.error=null})),e.addCase(S.fulfilled,(function(e){e.loading=!1,e.error=null})),e.addCase(S.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||null})),e.addCase(L.pending,(function(e){e.loading=!0,e.error=null})),e.addCase(L.fulfilled,(function(e){e.loading=!1,e.error=null})),e.addCase(L.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||null}))}}),F=_.actions,q=F.selectDataset,G=F.toggleCheckpointModal,K=Object(i.c)({name:"browser",initialState:{raw:"",table:"",console:""},reducers:{},extraReducers:function(e){e.addCase(z.fulfilled,(function(e,t){return Object(v.a)(Object(v.a)({},e),t.payload)})),e.addCase(J.fulfilled,(function(e,t){return Object(v.a)(Object(v.a)({},e),t.payload)})),e.addCase(L.fulfilled,(function(e,t){return t.payload.browserState}))}}),Q=Object(s.b)({notebook:_.reducer,browser:K.reducer,editor:D.reducer,checkpoint:B.reducer}),X=Object(i.a)({reducer:Q}),Y=r(104),Z=r(1),$=["nobel_prizes_incorrect","movies_incorrect"];var ee,te=function(){var e=Object(l.c)(),t=Object(l.d)((function(e){return e.notebook.selectedDataset})),r=Object(Y.a)(),n=r.register,a=r.handleSubmit,o=r.formState.errors;return Object(Z.jsxs)("form",{className:"flex flex-col items-center justify-center",onSubmit:a((function(t){return e(q(t.dataset))})),children:[$.map((function(e){return function(e){return Object(Z.jsxs)("label",{htmlFor:e,children:[Object(Z.jsx)("input",Object(v.a)(Object(v.a)({},n("dataset",{required:!0})),{},{id:e,type:"radio",value:e})),Object(Z.jsx)("span",{className:"ml-2 inline-block ".concat(t===e&&"font-bold"),children:e})]})}(e)})),o.dataset&&Object(Z.jsx)("span",{className:"py-2 text-red-500",children:"Please choose a dataset"}),Object(Z.jsx)("button",{type:"submit",className:"button-relief",children:"Select"})]})},re=r(10),ne=r(39),ae=r.n(ne),oe=(r(138),r(139),r(101)),ce=r.n(oe),le=r(102),se=r.n(le);!function(e){e.Raw="RAW",e.Table="TABLE",e.Console="CONSOLE"}(ee||(ee={}));var ie=function(){var e=Object(l.d)((function(e){return e.notebook.loading})),t=Object(l.d)((function(e){return e.notebook.error})),r=Object(l.d)((function(e){return e.notebook.selectedDataset})),a=Object(n.useState)(ee.Raw),o=Object(re.a)(a,2),c=o[0],s=o[1],i=Object(l.d)((function(e){return e.browser.raw})),d=Object(l.d)((function(e){return e.browser.table})),u=Object(l.d)((function(e){return e.browser.console})),b=function(e){e.preventDefault(),s(e.currentTarget.name)},f=Object(n.useMemo)((function(){return Object(Z.jsx)(ae.a,{width:"100%",mode:"json",theme:"monokai",readOnly:!0,fontSize:16,minLines:39,maxLines:39,showPrintMargin:!1,value:i})}),[i]),p=Object(n.useMemo)((function(){return Object(Z.jsx)("div",{className:"px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md whitespace-nowrap overflow-scroll",children:Object(Z.jsx)(ce.a,{remarkPlugins:[se.a],children:d})})}),[d]),j=Object(Z.jsxs)("div",{className:"px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-scroll",children:[t&&Object(Z.jsx)("span",{className:"py-2 text-red-500",children:t}),!r&&"Error: No dataset selected. Please select a dataset first.",Object(Z.jsx)("span",{className:"font-mono",children:u})]});return Object(Z.jsxs)("div",{className:"px-4 max-w-4xl min-h-screen",children:[Object(Z.jsx)("div",{className:"py-2",children:Object(Z.jsx)("h1",{className:"font-bold text-3xl uppercase p-4",children:"Data Browser"})}),Object(Z.jsxs)("div",{className:"flex flex-row justify-between w-full bg-gray-50 border border-gray-300 rounded-t-md",children:[Object(Z.jsxs)("div",{className:"text-left",children:[Object(Z.jsx)("button",{type:"button",name:ee.Raw,onClick:b,className:"py-2 px-4 inline-block font-semibold ".concat(c===ee.Raw?"text-blue-600":"text-gray-400"),children:"Raw"}),Object(Z.jsx)("button",{type:"button",name:ee.Table,onClick:b,className:"py-2 px-4 inline-block font-semibold ".concat(c===ee.Table?"text-blue-600":"text-gray-400"),children:"Table"}),Object(Z.jsx)("button",{type:"button",name:ee.Console,onClick:b,className:"py-2 px-4 inline-block font-semibold ".concat(c===ee.Console?"text-blue-600":"text-gray-400"),children:"Console"})]}),e&&Object(Z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-700 m-2 outline-none animate-spin transform rotate-180",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})]}),c===ee.Raw&&f,c===ee.Table&&p,c===ee.Console&&j]})},de=r(103);r(269),r(270);var ue=function(e){var t=e.id,r=Object(l.c)(),n=Object(l.d)((function(e){var r;return(null===(r=e.editor.cells.find((function(e){return e.id===t})))||void 0===r?void 0:r.execStatus)||" "})),a=Object(l.d)((function(e){var r;return(null===(r=e.editor.cells.find((function(e){return e.id===t})))||void 0===r?void 0:r.editorContent)||""})),o=Object(l.d)((function(e){var r;return(null===(r=e.editor.cells.find((function(e){return e.id===t})))||void 0===r?void 0:r.numOfLines)||0})),c=Object(l.d)((function(e){var r;return(null===(r=e.editor.cells.find((function(e){return e.id===t})))||void 0===r?void 0:r.errorStatus)||!1})),s="";return Object(l.d)((function(e){return e.editor.lastExecutedCellId===t}))&&(s="border-l-4 border-green-500"),Object(l.d)((function(e){return e.editor.updateBrowserCellId===t}))&&(s="border-l-4 border-blue-500"),c&&(s="border-l-4 border-red-500"),Object(Z.jsxs)("div",{className:"flex flex-col p-2 ".concat(s," rounded shadow-md relative hover:shadow-lg overflow-hidden"),children:[Object(Z.jsxs)("div",{className:"flex flex-row justify-between items-start",children:[Object(Z.jsx)("span",{className:"text-lg mr-4 min-w-max",children:"[".concat(n,"]: ")}),Object(Z.jsx)("div",{style:{width:"93%"},className:"mt-2 ring-4 ring-gray-400 ".concat(o<=5?"focus-within:ring-blue-500":"focus-within:ring-yellow-500"," relative"),children:Object(Z.jsx)(ae.a,{width:"100%",mode:"python",theme:"chrome",showGutter:!1,fontSize:16,minLines:1,maxLines:15,value:a,onFocus:function(){return r(W(t))},onChange:function(e){return r(A(e))},wrapEnabled:!0})})]}),o>5&&Object(Z.jsx)("span",{className:"mt-2 text-yellow-500 text-right font-bold",children:"Recommended maximum number of lines is 5"})]})};var be=function(){var e=Object(l.c)(),t=Object(l.d)((function(e){return e.editor.cells.map((function(e){return e.id}))}),l.b);return Object(Z.jsxs)("div",{className:"flex flex-col",children:[Object(Z.jsx)("div",{className:"py-2",children:Object(Z.jsx)("h1",{className:"font-bold text-3xl uppercase p-4",children:"Editor"})}),Object(Z.jsx)("div",{className:"px-4 max-w-4xl max-h-screen bg-gray-50 border border-gray-300 block rounded-md text-left",children:Object(Z.jsxs)("div",{className:"flex flex-row justify-between",children:[Object(Z.jsxs)("div",{className:"flex flex-row",children:[Object(Z.jsx)("svg",{onClick:function(){return e(E())},"data-tip":"Add New Cell","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})}),Object(Z.jsx)("svg",{onClick:function(){return e(T())},"data-tip":"Delete Cell","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-red-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),Object(Z.jsx)("svg",{onClick:function(){return e(U(-1))},"data-tip":"Move Cell Up","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 11l5-5m0 0l5 5m-5-5v12"})}),Object(Z.jsx)("svg",{onClick:function(){return e(U(1))},"data-tip":"Move Cell Down","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 13l-5 5m0 0l-5-5m5 5V6"})}),Object(Z.jsx)("svg",{onClick:function(){return e(z())},"data-tip":"Run Cell","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),Object(Z.jsx)("svg",{onClick:function(){return e(J())},"data-tip":"Run All Cells","data-for":"topButtons",xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 5l7 7-7 7M5 5l7 7-7 7"})})]}),Object(Z.jsxs)("div",{className:"flex flex-row",children:[Object(Z.jsx)("svg",{onClick:function(){return e(S())},xmlns:"http://www.w3.org/2000/svg","data-tip":"Save Checkpoint","data-for":"topButtons",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),Object(Z.jsx)("svg",{onClick:function(){e(G(!0)),e(N())},xmlns:"http://www.w3.org/2000/svg","data-tip":"Load Checkpoint","data-for":"topButtons",className:"h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"})})]})]})}),Object(Z.jsx)("div",{className:"px-4 max-w-4xl h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-y-scroll",children:Object(Z.jsx)("div",{className:"flex flex-col m-2 gap-4",children:t.map((function(e){return Object(Z.jsx)(ue,{id:e},e)}))})}),Object(Z.jsx)(de.a,{id:"topButtons",place:"top",effect:"solid"})]})};var fe=function(e){var t=e.id,r=e.selectedId,n=e.setSelectedId,a=Object(l.d)((function(e){return e.checkpoint.find((function(e){return e.id===t}))}));return Object(Z.jsx)("li",{onClick:function(){return n(t)},className:"p-4 hover:bg-gray-100 cursor-pointer text-center ".concat(r===t&&"bg-gray-100"),role:"presentation",children:null===a||void 0===a?void 0:a.timestamp})};var pe=function(){var e=Object(l.c)(),t=Object(l.d)((function(e){return e.notebook.loading})),r=Object(l.d)((function(e){return e.checkpoint.map((function(e){return e.id}))})),a=Object(n.useState)(null),o=Object(re.a)(a,2),c=o[0],s=o[1],i=Object(n.useState)(null),d=Object(re.a)(i,2),u=d[0],b=d[1];return Object(Z.jsx)("div",{className:"bg-gray-400 h-screen w-screen flex justify-center items-center",children:Object(Z.jsxs)("div",{className:"mb-24 bg-white rounded shadow-lg w-2/12",children:[Object(Z.jsxs)("div",{className:"border-b px-4 py-2 flex justify-between items-center",children:[Object(Z.jsx)("h3",{className:"font-semibold text-lg uppercase",children:"Load checkpoint"}),Object(Z.jsx)("svg",{onClick:function(){return e(G(!1))},xmlns:"http://www.w3.org/2000/svg",className:"button-icon hover:text-red-700",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]}),Object(Z.jsx)("div",{className:"flex flex-col justify-center",children:r.length>0?Object(Z.jsx)("ul",{className:"divide-y divide-gray-300",children:r.map((function(e){return Object(Z.jsx)(fe,{id:e,selectedId:c,setSelectedId:s},e)}))}):Object(Z.jsx)("span",{className:"m-4",children:t?"Loading...":"No checkpoint has been created"})}),Object(Z.jsxs)("div",{className:"flex justify-end items-center w-100 border-t px-2",children:[u&&Object(Z.jsx)("span",{className:"px-4 py-2 text-red-500",children:u}),Object(Z.jsx)("button",{onClick:function(t){t.preventDefault(),c?(e(L(c)),e(G(!1))):b("Invalid selection!")},type:"submit",className:"button bg-blue-600 hover:bg-blue-700",children:"Load"})]})]})})};var je=function(){var e=Object(l.d)((function(e){return e.notebook.showCheckpointModal}));return Object(Z.jsxs)("div",{className:"h-full w-screen flex flex-col justify-center",children:[Object(Z.jsx)("nav",{className:"flex flex-row items-center px-8 py-1 bg-blue-600 border-b-8 border-blue-200",children:Object(Z.jsx)("div",{className:"flex flex-row items-center text-white",children:Object(Z.jsx)("a",{href:"index",className:"no-underline py-2 hover:text-gray-300",children:Object(Z.jsx)("h1",{className:"font-bold text-3xl",children:"Data Jupyter"})})})}),e?Object(Z.jsx)(pe,{}):Object(Z.jsx)("div",{className:"bg-gray-100",children:Object(Z.jsxs)("main",{className:"h-full container mx-auto px-4 py-4 text-center",children:[Object(Z.jsxs)("div",{className:"pt-16",children:[Object(Z.jsx)("h1",{className:"font-bold text-3xl uppercase p-4",children:"Choose a demo dataset"}),Object(Z.jsx)(te,{})]}),Object(Z.jsxs)("div",{className:"grid grid-cols-2 gap-6 py-4",children:[Object(Z.jsx)(be,{}),Object(Z.jsx)(ie,{})]})]})})]})};var xe=function(){return Object(Z.jsx)(l.a,{store:X,children:Object(Z.jsx)(je,{})})};c.a.render(Object(Z.jsx)(a.a.StrictMode,{children:Object(Z.jsx)(xe,{})}),document.getElementById("root"))}},[[271,1,2]]]);
//# sourceMappingURL=main.4b7c22e3.chunk.js.map