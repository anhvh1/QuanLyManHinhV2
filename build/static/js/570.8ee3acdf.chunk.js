"use strict";(self.webpackChunkbrvh=self.webpackChunkbrvh||[]).push([[570],{67225:function(e,n,t){var i,a=t(8491),r=t(30168),u=t(16932);t(32619),c=a.Z,(0,u.ZP)(c)(i||(i=(0,r.Z)(["\n  &.ant-switch-checked {\n    \n  }\n"])));var c},68448:function(e,n,t){t.d(n,{Z:function(){return o}});t(50390);var i,a=t(30168),r=t(16932),u=(t(32619),r.ZP.div(i||(i=(0,a.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  /* padding: 10px 0; */\n  gap: 10px;\n  width: 100%;\n"])))),c=t(62559),o=function(e){return(0,c.jsx)(u,{className:"wrapper-top",children:e.children})}},24274:function(e,n,t){t.d(n,{Z:function(){return s}});t(50390);var i,a=t(30168),r=t(16932),u=t(29665),c=r.ZP.div(i||(i=(0,a.Z)(["\n  /* margin-top: 15px;\n  margin-bottom: 15px; */\n  text-align: right;\n  /* display: inline-block; */\n  flex: 1;\n  padding: 0 3px 0 0;\n  /* margin-bottom: 10px; */\n  display: flex;\n  gap: 10px;\n  justify-content: end;\n  flex-wrap: wrap;\n  align-items: center;\n  @media only screen and (max-width: 1336px) {\n    text-align: left;\n    /* display: block; */\n    flex: none;\n    width: 100%;\n    padding: 0 0 10px 0;\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  /* button {\n    margin-right: 0px;\n    margin-left: 10px;\n    @media only screen and (max-width: 1336px) {\n      margin-left: 0px;\n      margin-right: 10px;\n    }\n  } */\n"]))),o=(0,u.Z)(c),l=t(62559),s=function(e){return(0,l.jsx)(o,{children:e.children})}},32812:function(e,n,t){t.d(n,{z:function(){return r}});var i=t(29439),a=t(50390);function r(e){var n=(0,a.useState)(0),t=(0,i.Z)(n,2),r=t[0],u=t[1];return[r,function(){u(r+1)}]}},80570:function(e,n,t){t.r(n),t.d(n,{default:function(){return U}});var i=t(1413),a=t(29439),r=t(891),u=t(32955),c=t(78333),o=t(76947),l=t(50390),s=t(34424),d=t(3143),h=t(7335),f=t(24274),x=t(41367),p=t(23194),Z=t(31348),g=t(71017),m=(t(47471),t(67225),t(66660)),T=t(32812),C=t(64693),D=t(27268),S=(t(60606),t(74165)),v=t(15861),j=t(70785),I=t(46008),P=t(92503),y=t(69645),L=t(57483),b=t(62559),w=I.Z.Item,k=I.Z.useForm,M=function(e){var n=k(),t=(0,a.Z)(n,1)[0],r=e.dataEdit,u=e.loading,c=e.visible,o=e.action,s=(0,l.useState)([]),d=(0,a.Z)(s,2),h=d[0],f=d[1],x=(0,l.useState)(r?r.ChiTieuChaID:null),p=(0,a.Z)(x,2),Z=p[0],m=p[1],T=(0,l.useState)([]),C=(0,a.Z)(T,2),M=(C[0],C[1]),E=(0,l.useState)(null),N=(0,a.Z)(E,2),z=N[0],R=N[1];(0,l.useEffect)((function(){r&&r.ChiTieuID&&(R(r.ChiTieuID),t.setFieldsValue((0,i.Z)({},r)))}),[r]),(0,l.useEffect)((function(){if(Z){var e=function(){var e=(0,v.Z)((0,S.Z)().mark((function e(){var n,t,i;return(0,S.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.Z.ChiTietChiTieu({Id:Z});case 3:1===(n=e.sent).data.Status?(t=n.data.Data.Children)?(i=[],function e(n,t){n.forEach((function(n){i.push({TenChiTieu:n.TenChiTieu,ChiTieuID:n.ChiTieuID,isChild:t}),n.Children&&n.Children.length>0&&e(n.Children,!0)}))}(t,!1),0===i.length?f([]):(f(i),M(new Array(i.length).fill(!0)))):f([]):console.error("Failed to fetch data"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Failed to fetch data");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}else f([])}),[Z]);var U=function(){var n=(0,v.Z)((0,S.Z)().mark((function n(a){var r;return(0,S.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.preventDefault(),n.next=3,t.validateFields();case 3:r=n.sent,e.onCreate((0,i.Z)({},r));case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),A=function(e){var n=h[e],i=n.ChiTieuID===z?null:n.ChiTieuID;R(i),t.setFieldsValue({ChiTieuID:i})},F=function(e){var n=e.record,t=e.index;return(0,b.jsxs)("div",{style:{border:"1px solid #ccc",height:"35px",padding:"5px 0px 0px 10px",marginLeft:"-15px"},children:[(0,b.jsx)("span",{children:n.TenChiTieu}),(0,b.jsx)(P.Z,{style:{float:"right",marginRight:20},checked:z===n.ChiTieuID,onChange:function(){return A(t)}})]})},O=function(e){var n=e.record,t=e.index;return(0,b.jsxs)("div",{style:{border:"1px solid #ccc",marginLeft:"10px",height:"35px",padding:"5px 0px 0px 10px"},children:[(0,b.jsx)("span",{children:n.TenChiTieu}),(0,b.jsx)(P.Z,{style:{float:"right",marginRight:20},checked:z===n.ChiTieuID,onChange:function(){return A(t)}})]})},Q=[{dataIndex:"ChiTieuID",align:"left",render:function(e,n,t){return(0,b.jsx)(b.Fragment,{children:n.isChild?(0,b.jsx)(O,{record:n,index:t}):(0,b.jsx)(F,{record:n,index:t})})}}],V=e.danhSachLoaiMauPhieu,K=e.DanhSachChiTieu;return(0,b.jsx)(g.u_,{title:"".concat("edit"===o?"S\u1eeda":"Th\xeam m\u1edbi"," di s\u1ea3n t\u01b0 li\u1ec7u"),width:1e3,visible:c,onCancel:e.onCancel,footer:[(0,b.jsx)(g.zx,{onClick:e.onCancel,children:"H\u1ee7y"},"back"),(0,b.jsx)(g.zx,{htmlType:"submit",type:"primary",form:"formDiSanTuLieu",loading:u,onClick:U,children:"L\u01b0u"},"submit")],children:(0,b.jsxs)(I.Z,{form:t,name:"formDiSanTuLieu",children:["add"!==o?(0,b.jsx)(w,(0,i.Z)({name:"DiSanTuLieuID",hidden:!0},j.REQUIRED)):null,(0,b.jsx)(w,(0,i.Z)((0,i.Z)({label:"T\xean",name:"TenDiSanTuLieu"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,b.jsx)(g.II,{})})),(0,b.jsx)(w,(0,i.Z)((0,i.Z)({label:"Ch\u1ecdn lo\u1ea1i m\u1eabu phi\u1ebfu ",name:"LoaiMauPhieuID"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,b.jsx)(y.Z,{allowClear:!0,placeholder:"Ch\u1ecdn lo\u1ea1i m\u1eabu phi\u1ebfu",children:null===V||void 0===V?void 0:V.map((function(e){return(0,b.jsx)(Option,{value:e.ID,children:e.Ten})}))})})),(0,b.jsx)(w,(0,i.Z)((0,i.Z)({label:"Ch\u1ecdn ch\u1ec9 ti\xeau",name:"ChiTieuChaID"},j.ITEM_LAYOUT),{},{rules:[j.REQUIRED],children:(0,b.jsx)(y.Z,{allowClear:!0,placeholder:"Ch\u1ecdn ch\u1ec9 ti\xeau",onChange:function(e){m(e)},defaultValue:r?r.ChiTieuChaID:void 0,children:null===K||void 0===K?void 0:K.map((function(e){return(0,b.jsx)(Option,{value:e.ChiTieuID,children:e.TenChiTieu},e.ChiTieuID)}))})})),(0,b.jsx)(w,{name:"ChiTieuID",children:(0,b.jsx)(L.Z,{columns:Q,dataSource:h,pagination:!1,scroll:{y:440}})})]})})},E=t(81299),N=t(86460),z=t(79588),R=t(68448);var U=(0,s.$j)((function(e){return(0,i.Z)((0,i.Z)({},e.DMDiSanTuLieu),{},{role:(0,m.Ry)(e.Auth.role,"danh-muc-chuc-vu")})}),o.Z)((function(e){var n=(0,l.useState)(C.parse(e.location.search)),t=(0,a.Z)(n,2),o=t[0],s=t[1],S=(0,l.useState)({}),v=(0,a.Z)(S,2),j=v[0],I=v[1],P=(0,l.useState)(!1),y=(0,a.Z)(P,2),L=y[0],w=y[1],k=(0,l.useState)(""),U=(0,a.Z)(k,2),A=U[0],F=U[1],O=(0,T.z)(),Q=(0,a.Z)(O,2),V=Q[0],K=Q[1],_=(0,l.useState)([]),B=(0,a.Z)(_,2),H=(B[0],B[1]),Y=(0,l.useState)(!1),X=(0,a.Z)(Y,2),q=X[0],$=X[1];document.title="QU\u1ea2N L\xdd DANH M\u1ee4C DI S\u1ea2N T\u01af LI\u1ec6U",(0,l.useEffect)((function(){(0,m.ZZ)(o),e.getList(o),e.getInitData(o)}),[o]),(0,l.useEffect)((function(){e.getList(o),e.getInitData(o)}),[]);var G=function(){H([]),I({}),w(!1)},J=function(n){return(0,b.jsxs)("div",{className:"action-btn",children:[(0,b.jsx)(c.Z,{title:"S\u1eeda",children:(0,b.jsx)(E.Z,{onClick:function(){return function(e){var n=e;F("edit"),D.Z.chiTietDiSanTuLieu({ID:n}).then((function(e){e.data.Status>0?(I(e.data.Data),K(),w(!0)):(u.ZP.destroy(),u.ZP.error(e.data.Message))})).catch((function(e){u.ZP.destroy(),u.ZP.error(e.toString())}))}(n.DiSanTuLieuID)}})}),(0,b.jsx)(c.Z,{title:"X\xf3a",children:(0,b.jsx)(N.Z,{onClick:function(){return t=n.DiSanTuLieuID,void r.Z.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ch\u1ee9c v\u1ee5 n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){$(!0),D.Z.xoaDiSanTuLieu(t,{}).then((function(n){n.data.Status>0?($(!1),e.getList((0,i.Z)((0,i.Z)({},o),{},{PageNumber:Math.ceil((te-1)/o.PageSize)<o.PageNumber?Math.ceil((te-1)/o.PageSize):o.PageNumber})),u.ZP.destroy(),u.ZP.success(n.data.Message),s((0,i.Z)((0,i.Z)({},o),{},{PageNumber:Math.ceil((te-1)/o.PageSize)<o.PageNumber?Math.ceil((te-1)/o.PageSize):o.PageNumber}))):(u.ZP.destroy(),u.ZP.error(n.data.Message))})).catch((function(e){u.ZP.destroy(),u.ZP.error(e.toString())}))}});var t}})})]})},W=e.DanhSachDanhMucDiSanTuLieu,ee=e.DanhSachLoaiMauPhieu,ne=e.DanhSachChiTieu,te=e.TotalRow,ie=(e.role,o.PageNumber?parseInt(o.PageNumber):1),ae=o.PageSize?parseInt(o.PageSize):(0,m.hL)(),re=[{title:"STT",width:"3%",align:"center",render:function(e,n,t){return(0,b.jsx)("span",{children:(ie-1)*ae+(t+1)})}},{title:"T\xean danh m\u1ee5c di s\u1ea3n t\u01b0 li\u1ec7u",dataIndex:"TenDiSanTuLieu",align:"left",width:"20%"},{title:"Thao t\xe1c",width:"7%",align:"center",margin:"10px",render:function(e,n){return J(n)}}];return(0,b.jsxs)(d.Z,{children:[(0,b.jsxs)(R.Z,{children:[(0,b.jsx)(h.Z,{children:"QU\u1ea2N L\xdd DANH M\u1ee4C DI S\u1ea2N T\u01af LI\u1ec6U"}),(0,b.jsx)(f.Z,{children:(0,b.jsxs)(g.zx,{type:"primary",onClick:function(){F("add"),I({}),K(),w(!0)},children:[(0,b.jsx)(z.Z,{}),"Th\xeam m\u1edbi"]})})]}),(0,b.jsxs)(x.Z,{children:[(0,b.jsx)(p.Z,{children:(0,b.jsx)(g.Vr,{defaultValue:o.Keyword,placeholder:"Nh\u1eadp t\xean danh m\u1ee5c di s\u1ea3n t\u01b0 li\u1ec7u",style:{width:300},onSearch:function(e){return function(e,n){var t=o,i={value:e,property:n},a=(0,m.mB)(t,i,null);s(a),H([])}(e,"Keyword")},allowClear:!0})}),(0,b.jsx)(Z.ZP,{columns:re,dataSource:W,onChange:function(e,n,t){var i=o,a={pagination:e,filters:n,sorter:t},r=(0,m.mB)(i,null,a);s(r),H([])},pagination:{showSizeChanger:!0,showTotal:function(e,n){return"T\u1eeb ".concat(n[0]," \u0111\u1ebfn ").concat(n[1]," tr\xean ").concat(e," k\u1ebft qu\u1ea3")},total:te,current:ie,pageSize:ae},rowKey:function(e){return e.DiSanTuLieuID}})]}),(0,b.jsx)(M,{visible:L,dataEdit:j,action:A,loading:q,onCreate:function(n){$(!0),"add"===A&&D.Z.themDiSanTuLieu(n).then((function(n){$(!1),n.data.Status>0?(u.ZP.destroy(),u.ZP.success(n.data.Message),G(),e.getList(o)):($(!1),u.ZP.destroy(),u.ZP.error(n.data.Message))})).catch((function(e){$(!1),u.ZP.destroy(),u.ZP.error(e.toString())})),"edit"===A&&D.Z.suaDiSanTuLieu(n).then((function(n){n.data.Status>0?($(!1),u.ZP.destroy(),u.ZP.success(n.data.Message),G(),e.getList(o)):($(!1),u.ZP.destroy(),u.ZP.error(n.data.Message))})).catch((function(e){$(!1),u.ZP.destroy(),u.ZP.error(e.toString())}))},onCancel:G,danhSachLoaiMauPhieu:ee,DanhSachChiTieu:ne},V)]})}))}}]);