var se=Object.defineProperty;var ne=(t,n,a)=>n in t?se(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a;var O=(t,n,a)=>(ne(t,typeof n!="symbol"?n+"":n,a),a);import{c as oe,s as F,t as X,a as p,d as H,r as g,w as j,b as D,e as U,f as Y,u as v,n as G,o as r,g as e,h as V,i as f,F as L,j as N,k as z,l as $,m as R,p as W,q as J,M as Z,v as M,x as ae,y as ie,A as B,P as T}from"./index.02ac06a4.js";function ee(){const t=navigator.userAgent;return{isPc:oe(()=>window.innerWidth>500&&(t.indexOf("Windows")>-1&&t.indexOf("NT")>-1||t.indexOf("Macintosh")>-1))}}class te{constructor(n){O(this,"url","");O(this,"method","GET");this.url=n}setMethod(n){this.method=n}async get(n){return this.setMethod("GET"),this.onRequest(n)}async post(n){return this.setMethod("POST"),this.onRequest(n)}async onRequest(n){F({type:"loading",message:"\u52A0\u8F7D\u4E2D...",duration:2});const a=await fetch(this.url,{method:this.method,headers:{"Content-Type":"application/json"},body:JSON.stringify({token:X.value,...n})});return p().changeTokenIndex(),(await a.json()).data}}const q={Music:{Search:"https://v2.alapi.cn/api/music/search",Detail:"https://v2.alapi.cn/api/music/detail",PlayUrl:"https://v2.alapi.cn/api/music/url",Rank:"https://api.wer.plus/api/wytop"}},ue=[{id:1,name:"\u5468\u6770\u4F26"},{id:2,name:"\u6797\u4FCA\u6770"},{id:3,name:"\u738B\u529B\u5B8F"},{id:5,name:"\u9648\u5955\u8FC5"},{id:7,name:"en"},{id:8,name:"\u859B\u4E4B\u8C26"}],le=t=>(W("data-v-bbec1837"),t=t(),J(),t),ce={class:"pop-panel"},de=le(()=>e("div",{class:"pop-t"},"\u97F3\u4E50\u641C\u7D22",-1)),re={class:"content"},pe={key:0,class:"artist"},ve=["onClick"],me={key:1,class:"song-list"},_e=["onClick"],he={class:"left"},ye={class:"name"},ge={class:"action"},fe=["onClick"],Ce=["onClick"],we=H({__name:"search",props:{modelValue:{type:Boolean,default:!1}},emits:["onPlay","update:modelValue"],setup(t,{emit:n}){const{isPc:a}=ee(),_=t,m=g(_.modelValue);j(()=>_.modelValue,i=>{m.value=i});const d=n;j(()=>m.value,i=>{d("update:modelValue",i)});function A(i){d("onPlay",i),m.value=!1}async function o(i){const b=new Z().setId(i.id).setName(i.name).setDuration(i.duration).setSinger(i.artists.map(S=>S.name).join(","));p().addMusicToHistory(b),F({type:"success",message:"\u5DF2\u6DFB\u52A0\u5230\u64AD\u653E\u5217\u8868"})}const k=g(""),x=g([]),C=g(1),h=g(30),w=g(0);async function P(){const i=await new te(q.Music.Search).post({keyword:k.value,page:C.value,limit:h.value});x.value=i.songs,w.value=i.songCount}function E(i){C.value=i,P()}return(i,b)=>{const S=D("van-search"),u=D("van-empty"),s=D("van-pagination"),y=D("van-popup");return r(),U(y,{round:"","overlay-style":{background:"none"},show:m.value,"onUpdate:show":b[2]||(b[2]=l=>m.value=l),position:v(a)?"right":"bottom",style:G({width:v(a)?"400px":"100%",height:v(a)?"100%":"90%"})},{default:Y(()=>[e("div",ce,[de,e("div",re,[V(S,{placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22\u6B4C\u66F2",style:{padding:"0"},modelValue:k.value,"onUpdate:modelValue":b[0]||(b[0]=l=>k.value=l),onSearch:P},null,8,["modelValue"]),k.value?z("",!0):(r(),f("div",pe,[(r(!0),f(L,null,N(v(ue),l=>(r(),f("div",{class:"item",onClick:c=>{k.value=l.name,P()}},$(l.name),9,ve))),256))])),x.value.length?(r(),f("div",me,[(r(!0),f(L,null,N(x.value,l=>(r(),f("div",{class:"item",onClick:c=>A(l)},[e("div",he,[e("div",ye,$(l.name)+"\xA0\xA0\xA0 "+$(l.artists.map(c=>c.name).join(",")),1)]),e("div",ge,[e("i",{onClick:R(c=>A(l),["stop"]),class:"iconfont icon-bofang"},null,8,fe),e("i",{onClick:R(c=>o(l),["stop"]),class:"iconfont icon-tianjiadingdan1"},null,8,Ce)])],8,_e))),256))])):(r(),U(u,{key:2,style:{flex:"1"},description:"\u7A7A\u7A7A\u5982\u4E5F"})),x.value.length?(r(),U(s,{key:3,mode:"simple","items-per-page":h.value,modelValue:C.value,"onUpdate:modelValue":b[1]||(b[1]=l=>C.value=l),"total-items":w.value,onChange:E},null,8,["items-per-page","modelValue","total-items"])):z("",!0)])])]),_:1},8,["show","position","style"])}}});const K=(t,n)=>{const a=t.__vccOpts||t;for(const[_,m]of n)a[_]=m;return a},be=K(we,[["__scopeId","data-v-bbec1837"]]),ke=t=>(W("data-v-a9e5345b"),t=t(),J(),t),Ae={class:"pop-panel"},$e=ke(()=>e("div",{class:"pop-t"}," \u64AD\u653E\u5217\u8868 ",-1)),xe={class:"content"},Be={key:0,class:"song-list"},De=["onClick"],Fe={class:"left"},Pe={class:"name"},Ee={key:0,class:"iconfont icon-zhengzaibofang"},Se={class:"action"},Ve=["onClick"],Me=H({__name:"historyList",props:{modelValue:{type:Boolean,default:!1},musicObj:{type:Object,default:()=>new Z},isPlaying:{type:Boolean,default:!1}},emits:["onPlay","onNext","update:modelValue"],setup(t,{emit:n}){const{isPc:a}=ee(),_=t,m=g(_.modelValue);j(()=>_.modelValue,o=>{m.value=o});const d=n;j(()=>m.value,o=>{d("update:modelValue",o)});function A(o){o.id===_.musicObj.id&&d("onNext"),p().deleteInHistory(o)}return(o,k)=>{const x=D("van-empty"),C=D("van-popup");return r(),U(C,{"overlay-style":{background:"none"},round:"",show:m.value,"onUpdate:show":k[0]||(k[0]=h=>m.value=h),position:v(a)?"left":"bottom",style:G({width:v(a)?"400px":"100%",height:"88%",background:"rgba(0,0,0,.7)"})},{default:Y(()=>[e("div",Ae,[$e,e("div",xe,[v(p)().historyMusicList.length?(r(),f("div",Be,[(r(!0),f(L,null,N(v(p)().historyMusicList,h=>(r(),f("div",{class:M(["item",t.musicObj.id==h.id&&"current"]),onClick:w=>d("onPlay",h)},[e("div",Fe,[e("div",Pe,[t.musicObj.id==h.id&&t.isPlaying?(r(),f("i",Ee)):z("",!0),ae(" "+$(h.name)+"\xA0\xA0"+$(h.singer),1)])]),e("div",Se,[e("i",{class:"iconfont icon-shanchu1",onClick:R(w=>A(h),["stop"])},null,8,Ve)])],10,De))),256))])):(r(),U(x,{key:1,style:{flex:"1"},description:"\u7A7A\u7A7A\u5982\u4E5F"}))])])]),_:1},8,["show","position","style"])}}});const Ue=K(Me,[["__scopeId","data-v-a9e5345b"]]);async function Q(){F({type:"loading",message:"\u58C1\u7EB8\u52A0\u8F7D\u4E2D",forbidClick:!0,duration:0});const n=await(await fetch("https://api.wetab.link/api/wallpaper/next?type=random")).json(),a=document.createElement("img");return a.src=n.data.rawSrc,new Promise(_=>{a.onload=()=>{p().setBgUrl(n.data.rawSrc),_(n.data.rawSrc),F().close(),ie(()=>{F({message:"\u58C1\u7EB8\u52A0\u8F7D\u6210\u529F",type:"success"})})},a.onerror=()=>{p().setBgUrl(new URL(""+new URL("bg.3e0d6b15.webp",import.meta.url).href,self.location).href)}})}const I=t=>(W("data-v-e9882772"),t=t(),J(),t),Ie={class:"music-content"},je={class:"top-bar"},Oe=I(()=>e("i",{class:"iconfont icon-dongtaibizhi"},null,-1)),Te=I(()=>e("div",{class:"bar-t"}," \u968F\u673A\u80CC\u666F ",-1)),Le=[Oe,Te],Ne=I(()=>e("i",{class:"iconfont icon-sousuo"},null,-1)),ze=I(()=>e("div",{class:"bar-t"}," \u6B4C\u66F2\u641C\u7D22 ",-1)),Re=[Ne,ze],qe=I(()=>e("div",{class:"mask"},null,-1)),He={class:"ctl"},Ge={class:"song-name"},We={class:"progress"},Je={class:"time"},Ke={class:"time"},Qe={class:"act"},Xe=H({__name:"index",setup(t){const n=g(!1),a=g(!1);function _(){n.value=!0}function m(){a.value=!0}const d=g(!1),A=g(0),o=g(p().lastMusicObj);console.log("\u4E0A\u4E00\u6B21\u64AD\u653E\u7684\u6B4C\u66F2\u4FE1\u606F",o.value),B.Audio.setUrl(o.value.url).setLoop(p().playMode===T.LOOP),B.Audio.onEnded(()=>{console.log("\u5F53\u524D\u6B4C\u66F2\u64AD\u653E\u5B8C\u6BD5"),setTimeout(()=>{p().playMode===T.LIST&&(C(1),console.log("\u4E0B\u4E00\u9996"))},500)});function k(u){i(),B.Audio.setCurrentTime(u/100*o.value.dt/1e3),E()}function x(){if(!o.value.url)return F("\u6682\u65E0\u97F3\u4E50\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u53BB\u641C\u7D22\u6B4C\u66F2");d.value=!d.value,d.value?(B.Audio.play(),E()):(B.Audio.pause(),i())}function C(u){d.value=!1,A.value=0;const s=p().historyMusicList;if(!s.length)return F("\u64AD\u653E\u5217\u8868\u4E3A\u7A7A");const y=s.findIndex(l=>l.id===o.value.id);switch(u){case 0:w(y===0?s[s.length-1]:s[y-1]);break;case 1:y<s.length-1?w(s[y+1]):w(s[0])}}async function h(u){const y=(await new te(q.Music.Detail).post({id:u.id})).songs[0];o.value.setName(y.name).setCoverUrl(y.al.picUrl).setDuration(y.dt).setSinger(y.ar.map(l=>l.name).join(","))}async function w(u){if(u.id===o.value.id&&d.value)return F("\u6B63\u5728\u64AD\u653E\u8FD9\u9996\u6B4C");await h(u);const s=`${q.Music.PlayUrl}?id=${u.id}&token=${X.value}`;o.value.setId(u.id).setUrl(s),B.Audio.setUrl(s).play(),p().setLastMusicObj(o.value),d.value=!0,E()}const P=g(null);function E(){i(),P.value=setInterval(()=>{A.value=B.Audio.getDuration()*1e3/o.value.dt*100},1e3)}function i(){clearInterval(P.value),P.value=null}function b(u){return`${Math.floor(u/60)}:${S(Math.ceil(u%60))}`}function S(u){return u>=10?u:`0${u}`}return(u,s)=>{const y=D("van-image"),l=D("van-slider");return r(),f("div",{class:"music",style:G({backgroundImage:`url(${v(p)().bgUrl})`})},[e("div",Ie,[e("div",je,[e("div",{class:"bar-item",onClick:s[0]||(s[0]=(...c)=>v(Q)&&v(Q)(...c))},Le),e("div",{class:"bar-item",onClick:_},Re)]),(r(),f("div",{key:o.value.id,class:"music-top"},[e("div",{class:M(["music-pic",d.value&&"playing"])},[V(y,{class:M([d.value?"playing":"pause","music_img"]),src:o.value.coverUrl,width:"65%",height:"65%"},null,8,["class","src"]),qe],2)])),e("div",He,[e("div",Ge,$(o.value.name)+"\xA0-\xA0"+$(o.value.singer),1),e("div",We,[e("div",Je,$(b(v(B).Audio.getDuration())),1),V(l,{modelValue:A.value,"onUpdate:modelValue":s[1]||(s[1]=c=>A.value=c),onChange:s[2]||(s[2]=c=>k(c))},null,8,["modelValue"]),e("div",Ke,$(b(o.value.dt/1e3)),1)]),e("div",Qe,[e("i",{class:M(["iconfont",v(p)().playMode===v(T).LIST?"icon-shunxubofang":"icon-danquxunhuan"]),onClick:s[3]||(s[3]=c=>v(p)().changePlayMode())},null,2),e("i",{class:"iconfont icon-shixin-shangyishou",onClick:s[4]||(s[4]=c=>C(0))}),e("i",{class:M(["iconfont",d.value?"icon-zanting":"icon-zantingbofang"]),onClick:x},null,2),e("i",{class:"iconfont icon-shixin-shangyishou",style:{transform:"rotate(180deg)"},onClick:s[5]||(s[5]=c=>C(1))}),e("i",{class:"iconfont icon-bofangliebiao",onClick:m})])])]),V(be,{modelValue:n.value,"onUpdate:modelValue":s[6]||(s[6]=c=>n.value=c),onOnPlay:w},null,8,["modelValue"]),V(Ue,{modelValue:a.value,"onUpdate:modelValue":s[7]||(s[7]=c=>a.value=c),"music-obj":o.value,"is-playing":d.value,onOnPlay:w,onOnNext:s[8]||(s[8]=c=>C(1))},null,8,["modelValue","music-obj","is-playing"])],4)}}});const et=K(Xe,[["__scopeId","data-v-e9882772"]]);export{et as default};
