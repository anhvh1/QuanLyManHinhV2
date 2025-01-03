"use strict";(self.webpackChunkbrvh=self.webpackChunkbrvh||[]).push([[378],{68448:function(n,e,t){t.d(e,{Z:function(){return o}});t(50390);var a,r=t(30168),i=t(16932),c=(t(32619),i.ZP.div(a||(a=(0,r.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  /* padding: 10px 0; */\n  gap: 10px;\n  width: 100%;\n"])))),u=t(62559),o=function(n){return(0,u.jsx)(c,{className:"wrapper-top",children:n.children})}},24274:function(n,e,t){t.d(e,{Z:function(){return l}});t(50390);var a,r=t(30168),i=t(16932),c=t(29665),u=i.ZP.div(a||(a=(0,r.Z)(["\n  /* margin-top: 15px;\n  margin-bottom: 15px; */\n  text-align: right;\n  /* display: inline-block; */\n  flex: 1;\n  padding: 0 3px 0 0;\n  /* margin-bottom: 10px; */\n  display: flex;\n  gap: 10px;\n  justify-content: end;\n  flex-wrap: wrap;\n  align-items: center;\n  @media only screen and (max-width: 1336px) {\n    text-align: left;\n    /* display: block; */\n    flex: none;\n    width: 100%;\n    padding: 0 0 10px 0;\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  /* button {\n    margin-right: 0px;\n    margin-left: 10px;\n    @media only screen and (max-width: 1336px) {\n      margin-left: 0px;\n      margin-right: 10px;\n    }\n  } */\n"]))),o=(0,c.Z)(u),s=t(62559),l=function(n){return(0,s.jsx)(o,{children:n.children})}},32812:function(n,e,t){t.d(e,{z:function(){return i}});var a=t(29439),r=t(50390);function i(n){var e=(0,r.useState)(0),t=(0,a.Z)(e,2),i=t[0],c=t[1];return[i,function(){c(i+1)}]}},35378:function(n,e,t){t.r(e),t.d(e,{default:function(){return U}});var a=t(1413),r=t(29439),i=t(891),c=t(32955),u=t(78333),o=t(89457),s=t(50390),l=t(34424),d=t(3143),h=t(7335),f=t(24274),Z=t(41367),g=t(23194),p=t(31348),m=t(21669),x=(t(47471),t(66660)),v=t(32812),S=t(64693),y=t(17541),D=t(60606),P=t.n(D),T=t(74165),w=t(15861),j=t(70785),b=t(46008),L=t(69645),N=t(86424),M=t(43946),C=t.n(M),I=t(62559),E=b.Z.Item,z=b.Z.useForm,k=function(n){var e=z(),t=(0,r.Z)(e,1)[0],i=n.dataEdit,c=n.loading,u=n.visible,o=n.action,l=(0,s.useState)([]),d=(0,r.Z)(l,2),h=d[0],f=d[1],Z=(0,s.useState)(""),g=(0,r.Z)(Z,2),p=(g[0],g[1]);(0,s.useEffect)((function(){if(i&&i.ID){var n=C()(i.NgayCongNhan).format("DD/MM/YYYY");t&&t.setFieldsValue((0,a.Z)((0,a.Z)({},i),{},{NgayCongNhan:i&&i.NgayCongNhan?C()(n,"DD/MM/YYYY"):""}))}}),[]),(0,s.useEffect)((function(){x()}),[]);var x=function(){var n=(0,w.Z)((0,T.Z)().mark((function n(){var e;return(0,T.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,y.Z.danhSachDMDiSanTuLieu();case 3:(e=n.sent).data.Status>0&&f(e.data.Data),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.error("L\u1ed7i khi l\u1ea5y danh s\xe1ch c\u1ea5p x\u1ebfp h\u1ea1ng:",n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(){return n.apply(this,arguments)}}(),v=function(){var e=(0,w.Z)((0,T.Z)().mark((function e(r){var i;return(0,T.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,t.validateFields();case 3:i=e.sent,n.onCreate((0,a.Z)({},i));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,I.jsx)(m.u_,{title:"".concat("edit"===o?"S\u1eeda":"Th\xeam m\u1edbi"," di s\u1ea3n t\u01b0 li\u1ec7u"),width:450,visible:u,onCancel:n.onCancel,footer:[(0,I.jsx)(m.zx,{onClick:n.onCancel,children:"H\u1ee7y"},"back"),(0,I.jsx)(m.zx,{htmlType:"submit",type:"primary",form:"formDiSanTuLieu",loading:c,onClick:v,children:"L\u01b0u"},"submit")],children:(0,I.jsxs)(b.Z,{form:t,name:"formDiSanTuLieu",children:["add"!==o?(0,I.jsx)(E,(0,a.Z)({name:"ID",hidden:!0},j.REQUIRED)):null,(0,I.jsx)(E,(0,a.Z)((0,a.Z)({label:"T\xean di s\u1ea3n",name:"TenDiSan"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,I.jsx)(m.II,{})})),(0,I.jsx)(E,(0,a.Z)((0,a.Z)({label:"Lo\u1ea1i di s\u1ea3n ",name:"LoaiDiSanID"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,I.jsx)(L.Z,{allowClear:!0,placeholder:"Ch\u1ecdn lo\u1ea1i di s\u1ea3n",children:null===h||void 0===h?void 0:h.map((function(n){return(0,I.jsx)(Option,{value:n.DiSanTuLieuID,children:n.TenDiSanTuLieu})}))})})),(0,I.jsx)(E,(0,a.Z)((0,a.Z)({label:"N\u01a1i l\u01b0u tr\u1eef",name:"NoiLuuTru"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,I.jsx)(m.II,{})})),(0,I.jsx)(E,(0,a.Z)((0,a.Z)((0,a.Z)({label:"N\u0103m c\xf4ng nh\u1eadn",name:"NgayCongNhan"},j.REQUIRED),j.ITEM_LAYOUT),{},{children:(0,I.jsx)(N.C,{onChange:function(n,e){p(n)},format:"DD/MM/YYYY",placeholder:"",style:{width:"100%"}})}))]})})},Y=t(81299),R=t(86460),q=t(79588),O=t(68448);var U=(0,l.$j)((function(n){return(0,a.Z)((0,a.Z)({},n.QLDiSanTuLieu),{},{role:(0,x.Ry)(n.Auth.role,"danh-muc-chuc-vu")})}),o.Z)((function(n){var e=(0,s.useState)(S.parse(n.location.search)),t=(0,r.Z)(e,2),o=t[0],l=t[1],D=(0,s.useState)({}),T=(0,r.Z)(D,2),w=T[0],j=T[1],b=(0,s.useState)(!1),L=(0,r.Z)(b,2),N=L[0],M=L[1],C=(0,s.useState)(""),E=(0,r.Z)(C,2),z=E[0],U=E[1],H=(0,v.z)(),B=(0,r.Z)(H,2),Q=B[0],A=B[1],_=(0,s.useState)([]),K=(0,r.Z)(_,2),V=(K[0],K[1]),F=(0,s.useState)(!1),X=(0,r.Z)(F,2),$=X[0],G=X[1];document.title="qu\u1ea3n l\xfd di s\u1ea3n t\u01b0 li\u1ec7u",(0,s.useEffect)((function(){(0,x.ZZ)(o),n.getList(o)}),[o]),(0,s.useEffect)((function(){n.getList(o)}),[]);var J=function(){V([]),j({}),M(!1)},W=function(e){return(0,I.jsxs)("div",{className:"action-btn",children:[(0,I.jsx)(u.Z,{title:"S\u1eeda",children:(0,I.jsx)(Y.Z,{onClick:function(){return function(n){var e=n;U("edit"),y.Z.chiTietDiSanTuLieu({ID:e}).then((function(n){n.data.Status>0?(j(n.data.Data),A(),M(!0)):(c.ZP.destroy(),c.ZP.error(n.data.Message))})).catch((function(n){c.ZP.destroy(),c.ZP.error(n.toString())}))}(e.ID)}})}),(0,I.jsx)(u.Z,{title:"X\xf3a",children:(0,I.jsx)(R.Z,{onClick:function(){return t=e.ID,void i.Z.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ch\u1ee9c v\u1ee5 n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){G(!0),y.Z.xoaDiSanTuLieu(t,{}).then((function(e){e.data.Status>0?(G(!1),n.getList((0,a.Z)((0,a.Z)({},o),{},{PageNumber:Math.ceil((en-1)/o.PageSize)<o.PageNumber?Math.ceil((en-1)/o.PageSize):o.PageNumber})),c.ZP.destroy(),c.ZP.success(e.data.Message),l((0,a.Z)((0,a.Z)({},o),{},{PageNumber:Math.ceil((en-1)/o.PageSize)<o.PageNumber?Math.ceil((en-1)/o.PageSize):o.PageNumber}))):(c.ZP.destroy(),c.ZP.error(e.data.Message))})).catch((function(n){c.ZP.destroy(),c.ZP.error(n.toString())}))}});var t}})})]})},nn=n.DanhSachDiSanTuLieu,en=n.TotalRow,tn=(n.role,o.PageNumber?parseInt(o.PageNumber):1),an=o.PageSize?parseInt(o.PageSize):(0,x.hL)(),rn=[{title:"STT",align:"center",width:"5%",render:function(n,e,t){return(0,I.jsx)("span",{children:(tn-1)*an+(t+1)})}},{title:"T\xean di s\u1ea3n",dataIndex:"TenDiSan",width:"35%"},{title:"N\u01a1i l\u01b0u tr\u1eef",dataIndex:"NoiLuuTru",width:"35%"},{title:"N\u0103m c\xf4ng nh\u1eadn",dataIndex:"center",align:"left",width:"15%",render:function(n,e){return e.NgayCongNhan?P()(e.NgayCongNhan).format("DD/MM/YYYY"):void 0}},{title:"Thao t\xe1c",width:"10%",align:"center",margin:"10px",render:function(n,e){return W(e)}}];return(0,I.jsxs)(d.Z,{children:[(0,I.jsxs)(O.Z,{children:[(0,I.jsx)(h.Z,{children:"qu\u1ea3n l\xfd di s\u1ea3n t\u01b0 li\u1ec7u"}),(0,I.jsx)(f.Z,{children:(0,I.jsxs)(m.zx,{type:"primary",onClick:function(){U("add"),j({}),A(),M(!0)},children:[(0,I.jsx)(q.Z,{}),"Th\xeam m\u1edbi"]})})]}),(0,I.jsxs)(Z.Z,{children:[(0,I.jsx)(g.Z,{children:(0,I.jsx)(m.Vr,{defaultValue:o.Keyword,placeholder:"Nh\u1eadp t\xean danh m\u1ee5c di s\u1ea3n t\u01b0 li\u1ec7u",style:{width:300},onSearch:function(n){return function(n,e){var t=o,a={value:n,property:e},r=(0,x.mB)(t,a,null);l(r),V([])}(n,"Keyword")},allowClear:!0})}),(0,I.jsx)(p.ZP,{columns:rn,dataSource:nn,onChange:function(n,e,t){var a=o,r={pagination:n,filters:e,sorter:t},i=(0,x.mB)(a,null,r);l(i),V([])},pagination:{showSizeChanger:!0,showTotal:function(n,e){return"T\u1eeb ".concat(e[0]," \u0111\u1ebfn ").concat(e[1]," tr\xean ").concat(n," k\u1ebft qu\u1ea3")},total:en,current:tn,pageSize:an},rowKey:function(n){return n.ID}})]}),(0,I.jsx)(k,{visible:N,dataEdit:w,action:z,loading:$,onCreate:function(e){G(!0),"add"===z&&y.Z.themDiSanTuLieu(e).then((function(e){G(!1),e.data.Status>0?(c.ZP.destroy(),c.ZP.success(e.data.Message),J(),n.getList(o)):(G(!1),c.ZP.destroy(),c.ZP.error(e.data.Message))})).catch((function(n){G(!1),c.ZP.destroy(),c.ZP.error(n.toString())})),"edit"===z&&y.Z.suaDiSanTuLieu(e).then((function(e){e.data.Status>0?(G(!1),c.ZP.destroy(),c.ZP.success(e.data.Message),J(),n.getList(o)):(G(!1),c.ZP.destroy(),c.ZP.error(e.data.Message))})).catch((function(n){G(!1),c.ZP.destroy(),c.ZP.error(n.toString())}))},onCancel:J,DanhSachDiSanTuLieu:nn},Q)]})}))},86460:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),r=t(50390),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},c=t(34224),u=function(n,e){return r.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:i}))};u.displayName="DeleteOutlined";var o=r.forwardRef(u)},81299:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),r=t(50390),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},c=t(34224),u=function(n,e){return r.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:i}))};u.displayName="EditOutlined";var o=r.forwardRef(u)},79588:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),r=t(50390),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},c=t(34224),u=function(n,e){return r.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:i}))};u.displayName="PlusOutlined";var o=r.forwardRef(u)}}]);