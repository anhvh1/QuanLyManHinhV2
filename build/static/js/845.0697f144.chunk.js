"use strict";(self.webpackChunkbrvh=self.webpackChunkbrvh||[]).push([[845],{74208:function(n,e,t){t.d(e,{E:function(){return c}});var a=t(45133),i=t.n(a),r=t(66660),c=function(n,e){return i()({method:"POST",url:n,data:e,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat((0,r.Y8)())}}).catch((function(n){var e=n.response,t=e.status,a=e.statusText;return{Status:0,Message:t||a?"".concat(t," - ").concat(a):"\u0110\xe3 c\xf3 l\u1ed7i x\u1ea3y ra"}}))}},68448:function(n,e,t){t.d(e,{Z:function(){return o}});t(50390);var a,i=t(30168),r=t(16932),c=(t(32619),r.ZP.div(a||(a=(0,i.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  /* padding: 10px 0; */\n  gap: 10px;\n  width: 100%;\n"])))),l=t(62559),o=function(n){return(0,l.jsx)(c,{className:"wrapper-top",children:n.children})}},24274:function(n,e,t){t.d(e,{Z:function(){return u}});t(50390);var a,i=t(30168),r=t(16932),c=t(29665),l=r.ZP.div(a||(a=(0,i.Z)(["\n  /* margin-top: 15px;\n  margin-bottom: 15px; */\n  text-align: right;\n  /* display: inline-block; */\n  flex: 1;\n  padding: 0 3px 0 0;\n  /* margin-bottom: 10px; */\n  display: flex;\n  gap: 10px;\n  justify-content: end;\n  flex-wrap: wrap;\n  align-items: center;\n  @media only screen and (max-width: 1336px) {\n    text-align: left;\n    /* display: block; */\n    flex: none;\n    width: 100%;\n    padding: 0 0 10px 0;\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  /* button {\n    margin-right: 0px;\n    margin-left: 10px;\n    @media only screen and (max-width: 1336px) {\n      margin-left: 0px;\n      margin-right: 10px;\n    }\n  } */\n"]))),o=(0,c.Z)(l),d=t(62559),u=function(n){return(0,d.jsx)(o,{children:n.children})}},32812:function(n,e,t){t.d(e,{z:function(){return r}});var a=t(29439),i=t(50390);function r(n){var e=(0,i.useState)(0),t=(0,a.Z)(e,2),r=t[0],c=t[1];return[r,function(){c(r+1)}]}},2845:function(n,e,t){t.r(e),t.d(e,{default:function(){return K}});var a=t(1413),i=t(74165),r=t(15861),c=t(29439),l=t(50390),o=t(34424),d=(t(45133),t(64693)),u=t(21956),h=t(66113),s=t(70785),f=t.n(s),p=t(60606),Z=t.n(p),g=t(3143),v=t(7335),m=t(24274),x=t(41367),T=t(23194),D=t(31348),y=t(35951),j=t(93433),w=t(46008),C=t(97612),L=t(96086),S=t(41719),b=t(50146),E=t(79758),P=t(97555),I=t(81295),M=t(66660),k=t(86424),F=t(62559),U=w.Z.Item,R=function(n){var e=(0,l.useState)(!1),t=(0,c.Z)(e,2),i=t[0],r=(t[1],(0,l.useState)([])),d=(0,c.Z)(r,2),u=d[0],h=d[1],f=(0,l.useState)(""),p=(0,c.Z)(f,2),g=(p[0],p[1]),v=(0,l.useState)(!1),m=(0,c.Z)(v,2),x=m[0],T=m[1],D=(0,w.Z.useForm)(),y=(0,c.Z)(D,1)[0];(0,o.I0)();(0,l.useEffect)((function(){y.getFieldValue("DaDuocXepHang")&&T(!0)}),[y.getFieldValue("DaDuocXepHang")]),(0,l.useEffect)((function(){var e=n.dataModalAddEdit;if(e){var t,i=Z()(e.NgayQuyetDinh).format("DD/MM/YYYY"),r=(e.DanhSachDiTichToanTinh,e.Data);if(y&&y.setFieldsValue((0,a.Z)((0,a.Z)({},r),{},{NgayQuyetDinh:e&&r&&r.NgayQuyetDinh?Z()(i,"DD/MM/YYYY"):""})),null!==(t=e.Data)&&void 0!==t&&t.TenFileGoc){var c,l,o={TenFileGoc:null===(c=e.Data)||void 0===c?void 0:c.TenFileGoc,FileUrl:null===(l=e.Data)||void 0===l?void 0:l.UrlFile};h([o])}}}),[]);var R=function(n,e,t){var a=(0,j.Z)(t);h(a)},N=function(n,e,t){var a,i=null===(a=(0,M.kA)("data_config"))||void 0===a?void 0:a.fileLimit,r=n.size/1024/1024<i,c=[];return null===t||void 0===t||t.forEach((function(n){u.filter((function(e){return e.TenFileGoc===n.name})).length&&c.push(n)})),r?function(n,e,t){var a=new FileReader;a.addEventListener("load",(function(){return e(a.result,n,t)})),a.readAsDataURL(n)}(n,e,t):C.ZP.error("File \u0111\xednh k\xe8m ph\u1ea3i nh\u1ecf h\u01a1n ".concat(i,"MB")),!1},Y=n.confirmLoading,z=n.visible,H=n.onCancel,O=n.action,Q=n.danhSachLoaiDiTich,A=n.DanhSachCapXepHang;return(0,F.jsx)(I.Z,{title:"add"===O?"Th\xeam m\u1edbi di t\xedch":"C\u1eadp nh\u1eadt di t\xedch",width:s.MODAL_NORMAL,visible:z,onCancel:H,footer:[(0,F.jsx)(L.ZP,{onClick:H,children:"H\u1ee7y"},"back"),(0,F.jsx)(L.ZP,{loading:Y,onClick:function(e){e.preventDefault(),y.validateFields().then((function(e){if(u.length<1)return C.ZP.destroy(),void C.ZP.warning("Ch\u01b0a ch\u1ecdn file \u0111\xednh k\xe8m");var t=(0,a.Z)((0,a.Z)({},e),{},{TenFileGoc:u[0].name});(0,n.onCreate)(t,u[0])}))},type:"primary",children:"L\u01b0u"})],children:(0,F.jsxs)(w.Z,{form:y,children:["add"!==O?(0,F.jsx)(U,(0,a.Z)({name:"ID",hidden:!0},s.REQUIRED)):null,(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:"T\xean",name:"TenDiTich"},s.ITEM_LAYOUT),{},{rules:[s.REQUIRED],children:(0,F.jsx)(S.Z,{})})),(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:" ",name:"DaDuocXepHang"},s.ITEM_LAYOUT),{},{children:(0,F.jsxs)(b.ZP.Group,{name:"radiogroup",onChange:function(n){var e=n.target.value;T(!0===e)},children:[(0,F.jsx)(b.ZP,{value:!0,children:"\u0110\xe3 \u0111\u01b0\u1ee3c x\u1ebfp h\u1ea1ng"}),(0,F.jsx)(b.ZP,{value:!1,children:"Ch\u01b0a \u0111\u01b0\u1ee3c x\u1ebfp h\u1ea1ng"})]})})),x&&(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:"C\u1ea5p x\u1ebfp h\u1ea1ng",name:"CapXepHang"},s.ITEM_LAYOUT),{},{rules:[s.REQUIRED],children:(0,F.jsx)(P.ZP,{allowClear:!0,placeholder:"Ch\u1ecdn c\u1ea5p",children:null===A||void 0===A?void 0:A.map((function(n){return(0,F.jsx)(P.Wx,{value:n.ID,children:n.Ten})}))})})),x&&(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:"Th\xf4ng tin quy\u1ebft \u0111\u1ecbnh",name:"ThongTinQuyetDinh"},s.ITEM_LAYOUT),{},{rules:[s.REQUIRED],children:(0,F.jsx)(S.Z,{})})),x&&(0,F.jsx)(U,(0,a.Z)((0,a.Z)((0,a.Z)({label:"Ng\xe0y quy\u1ebft \u0111\u1ecbnh",name:"NgayQuyetDinh"},s.REQUIRED),s.ITEM_LAYOUT),{},{children:(0,F.jsx)(k.C,{onChange:function(n,e){g(n)},format:"DD/MM/YYYY",placeholder:"",style:{width:"100%"}})})),(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:"Lo\u1ea1i di t\xedch",name:"LoaiDiTich"},s.ITEM_LAYOUT),{},{rules:[s.REQUIRED],children:(0,F.jsx)(P.ZP,{allowClear:!0,placeholder:"Ch\u1ecdn lo\u1ea1i di t\xedch",children:null===Q||void 0===Q?void 0:Q.map((function(n){return(0,F.jsx)(P.Wx,{value:n.ID,children:n.Ten})}))})})),(0,F.jsx)(U,(0,a.Z)((0,a.Z)({label:"\u0110\u1ecba \u0111i\u1ec3m",name:"DiaDiem"},s.ITEM_LAYOUT),{},{rules:[s.REQUIRED],children:(0,F.jsx)(S.Z,{})})),(0,F.jsxs)(U,(0,a.Z)((0,a.Z)({label:"Th\xf4ng tin chi ti\u1ebft"},s.ITEM_LAYOUT),{},{name:"UrlFile",children:[(0,F.jsx)(E.Z,{showUploadList:!1,actions:!1,beforeUpload:function(n,e){N(n,R,e)},disabled:i,children:(0,F.jsx)(L.ZP,{type:"primary",loading:i,className:"btn-upload",children:"Ch\u1ecdn file t\u1eeb li\u1ec7u t\u1eeb m\xe1y t\xednh"})}),u&&null!==u&&void 0!==u&&u.length?u.map((function(n,e){return(0,F.jsx)(F.Fragment,{children:(0,F.jsx)("p",{children:(0,F.jsx)("a",{target:"_bank",href:null===n||void 0===n?void 0:n.FileUrl,children:(null===n||void 0===n?void 0:n.name)||(null===n||void 0===n?void 0:n.TenFileGoc)})})})})):""]})),(0,F.jsx)("div",{})]})})},N=t(5718),Y=t(78333),z=t(26854),H=t(91160),O=t(74208),Q=t(35238),A=t(81299),X=t(86460),_=t(79588),q=t(43946),B=t.n(q),G=t(32812),V=t(68448),J=t(66331);var K=(0,o.$j)((function(n){return(0,a.Z)((0,a.Z)({},n.QLDiTichToanTinh),{},{FileLimit:(0,M.wU)("fileLimit",10)})}),u.Z)((function(n){document.title="Qu\u1ea3n l\xfd di t\xedch to\xe0n t\u1ec9nh";var e=(0,l.useState)(d.parse(n.location.search)),t=(0,c.Z)(e,2),s=t[0],p=t[1],Z=(0,l.useState)(!1),j=(0,c.Z)(Z,2),w=j[0],L=j[1],S=(0,G.z)(),b=(0,c.Z)(S,2),E=b[0],I=b[1],k=(0,l.useState)(!1),U=(0,c.Z)(k,2),q=U[0],K=U[1],W=((0,o.v9)((function(n){return n.ListSideBar})).ListSideBar,(0,l.useState)({})),$=(0,c.Z)(W,2),nn=$[0],en=$[1],tn=(0,l.useState)([]),an=(0,c.Z)(tn,2),rn=(an[0],an[1]),cn=(0,l.useState)(""),ln=(0,c.Z)(cn,2),on=ln[0],dn=ln[1],un=(0,o.I0)(),hn=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(){var e;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,h.Z.danhSachCacCapDonVi();case 3:e=n.sent,rn(e.data.Data),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(){return n.apply(this,arguments)}}();(0,l.useEffect)((function(){un(u.Z.getInitData(s)),un(y.Z.getList()),hn()}),[]),(0,l.useEffect)((function(){(0,M.ZZ)(s),n.getList(s)}),[s]);var sn=function(n,e){var t=(0,a.Z)({},s),i={value:n,property:e},r=(0,M.mB)(t,i,null);p(r)},fn=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var t,a,r;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,h.Z.downloadFile({ID:e.ID});case 3:(t=n.sent)&&t.data.Status>0?(a=t.data.Data).UrlFile&&""!==a.UrlFile&&((r=document.createElement("a")).href=a.UrlFile,r.download=a.TenFileGoc,r.target="_blank",document.body.appendChild(r),r.click(),document.body.removeChild(r)):C.ZP.error("Kh\xf4ng c\xf3 d\u1eef li\u1ec7u"),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(e){return n.apply(this,arguments)}}(),pn=function(){K(!1),en({})},Zn=n.DanhSachDiTichToanTinh,gn=n.DanhSachLoaiDiTich,vn=n.DanhSachCapXepHang,mn=n.TotalRow,xn=(n.role,s.PageNumber?parseInt(s.PageNumber):1),Tn=s.PageSize?parseInt(s.PageSize):(0,M.hL)(),Dn=[{title:"STT",width:"5%",align:"center",render:function(n,e,t){return(0,F.jsx)("span",{children:(xn-1)*Tn+(t+1)})}},{title:"T\xean di t\xedch",dataIndex:"TenDiTich",align:"left",width:"30%"},{title:"Lo\u1ea1i di t\xedch",dataIndex:"TenLoaiDiTich",align:"left",width:"15%"},{title:"C\u1ea5p x\u1ebfp h\u1ea1ng",dataIndex:"TenCapXepHang",align:"left",width:"25%"},{title:"\u0110\u1ecba \u0111i\u1ec3m",dataIndex:"DiaDiem",align:"left",width:"15%"},{title:"Thao t\xe1c",width:"10%",align:"center",margin:"15px",render:function(n,e){return yn(e)}}],yn=function(n){return(0,F.jsxs)("div",{className:"action-btn",children:[(0,F.jsx)(Y.Z,{title:"Chi ti\u1ebft",children:(0,F.jsx)(Q.Z,{onClick:function(){return fn(n)}})}),(0,F.jsx)(Y.Z,{title:"S\u1eeda",children:(0,F.jsx)(A.Z,{onClick:function(){return function(n){en({Data:n,DanhSachDiTichToanTinh:[]}),K(!0),I(),dn("edit")}(n)}})}),(0,F.jsx)(Y.Z,{title:"X\xf3a",children:(0,F.jsx)(X.Z,{onClick:function(){return e=n.ID,void N.Z.confirm({title:"X\xf3a d\u1eef li\u1ec7u",content:" B\u1ea1n c\xf3 mu\u1ed1n x\xf3a file b\u1ea3o v\u1eadt qu\u1ed1c gia n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){h.Z.xoaDiTichToanTinh(e).then((function(n){n.data.Status>0?(C.ZP.success("X\xf3a th\xe0nh c\xf4ng"),un(u.Z.getList(s)),un(u.Z.getGuild())):N.Z.error({title:"L\u1ed7i",content:n.data.Message})})).catch((function(n){N.Z.error(f().API_ERROR)}))}});var e}})})]})},jn=n.FileLimit;return(0,F.jsxs)(g.Z,{children:[(0,F.jsxs)(V.Z,{children:[(0,F.jsx)(v.Z,{children:"Qu\u1ea3n l\xfd di t\xedch to\xe0n t\u1ec9nh"}),(0,F.jsx)(m.Z,{children:(0,F.jsxs)(H.Z,{type:"primary",onClick:function(){en({}),K(!0),I(),dn("add")},children:[(0,F.jsx)(_.Z,{}),"Th\xeam m\u1edbi"," "]})})]}),(0,F.jsxs)(x.Z,{children:[(0,F.jsxs)(T.Z,{children:[(0,F.jsx)(J.Vr,{allowClear:!0,defaultValue:s.Keyword,placeholder:"Nh\u1eadp t\xean di t\xedch",onSearch:function(n){return sn(n,"Keyword")},style:{width:300}}),(0,F.jsx)(P.ZP,{showSearch:!0,onChange:function(n){sn(n,!1===n?"Status":"CapXepHang")},style:{width:200},placeholder:"C\u1ea5p x\u1ebfp h\u1ea1ng",allowClear:!0,children:vn?vn.map((function(n){var e;return(0,F.jsx)(P.Wx,{value:null===(e=n.ID)||void 0===e?void 0:e.toString(),children:n.Ten})})):null}),(0,F.jsx)(P.ZP,{showSearch:!0,defaultValue:s.LoaiDiTich?s.LoaiDiTich:null,onChange:function(n){return sn(n,"LoaiDiTich")},style:{width:200},placeholder:"Lo\u1ea1i di t\xedch",allowClear:!0,children:gn?gn.map((function(n){var e;return(0,F.jsx)(P.Wx,{value:null===(e=n.ID)||void 0===e?void 0:e.toString(),children:n.Ten})})):null}),(0,F.jsx)(z.Z,{picker:"year",style:{width:400},placeholder:"Di t\xedch \u0111\u01b0\u1ee3c x\u1ebfp h\u1ea1ng trong n\u0103m",value:s.NamXepHang?B()("".concat(s.NamXepHang)):null,onChange:function(n,e){return sn(e,"NamXepHang")}})]}),(0,F.jsx)(D.ZP,{columns:Dn,dataSource:Zn,loading:n.TableLoading,onChange:function(n,e,t){var i=(0,a.Z)({},s),r={pagination:n,filters:e,sorter:t},c=(0,M.mB)(i,null,r);p(c)},pagination:{showSizeChanger:!0,showTotal:function(n,e){return"T\u1eeb ".concat(e[0]," \u0111\u1ebfn ").concat(e[1]," tr\xean ").concat(n," k\u1ebft qu\u1ea3")},total:mn,current:xn,pageSize:Tn}})]}),(0,F.jsx)(R,{confirmLoading:w,visible:q,onCancel:pn,onCreate:function(n,e){if(L(!0),"add"===on){var t=new FormData;t.append("files",e),t.append("QuanLyDiTichToanTinhStr",JSON.stringify(n)),(0,O.E)(h.J.themditichtoantinh,t).then((function(n){L(!1),n.data.Status>0?(C.ZP.success("Th\xeam th\xe0nh c\xf4ng"),pn(),un(u.Z.getList(s)),un(u.Z.getGuild())):(C.ZP.destroy(),C.ZP.error(n.data.Message))})).catch((function(n){C.ZP.destroy(),C.ZP.error(n.toString())}))}else if("edit"===on){var a=new FormData;a.append("QuanLyDiTichToanTinhStr",JSON.stringify(n)),e.name&&a.append("files",e),(0,O.E)(h.J.suaditichtoantinh,a).then((function(n){L(!1),n.data.Status>0?(C.ZP.success("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng"),pn(),un(u.Z.getList(s)),un(u.Z.getGuild())):(C.ZP.destroy(),C.ZP.error(n.data.Message))})).catch((function(n){C.ZP.destroy(),C.ZP.error(n.toString())}))}},dataModalAddEdit:nn,FileLimit:jn,action:on,danhSachLoaiDiTich:gn,DanhSachCapXepHang:vn},E)]})}))},86460:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),i=t(50390),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},c=t(66555),l=function(n,e){return i.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:r}))};l.displayName="DeleteOutlined";var o=i.forwardRef(l)},81299:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),i=t(50390),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},c=t(66555),l=function(n,e){return i.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:r}))};l.displayName="EditOutlined";var o=i.forwardRef(l)},35238:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),i=t(50390),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},c=t(66555),l=function(n,e){return i.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:r}))};l.displayName="EyeOutlined";var o=i.forwardRef(l)},79588:function(n,e,t){t.d(e,{Z:function(){return o}});var a=t(1413),i=t(50390),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},c=t(66555),l=function(n,e){return i.createElement(c.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:r}))};l.displayName="PlusOutlined";var o=i.forwardRef(l)}}]);