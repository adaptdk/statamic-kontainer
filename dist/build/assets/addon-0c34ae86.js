function c(i,e,t,l,o,a,d,p){var r=typeof i=="function"?i.options:i;e&&(r.render=e,r.staticRenderFns=t,r._compiled=!0),l&&(r.functional=!0),a&&(r._scopeId="data-v-"+a);var n;if(d?(n=function(s){s=s||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!s&&typeof __VUE_SSR_CONTEXT__<"u"&&(s=__VUE_SSR_CONTEXT__),o&&o.call(this,s),s&&s._registeredComponents&&s._registeredComponents.add(d)},r._ssrRegister=n):o&&(n=p?function(){o.call(this,(r.functional?this.parent:this).$root.$options.shadowRoot)}:o),n)if(r.functional){r._injectStyles=n;var f=r.render;r.render=function(_,u){return n.call(u),f(_,u)}}else{var h=r.beforeCreate;r.beforeCreate=h?[].concat(h,n):[n]}return{exports:i,options:r}}const v={mixins:[Fieldtype],data(){return{url:null,type:null,fileId:null,folderId:null,token:null,popupWidth:1024,popupHeight:768,popupTop:0,popupLeft:0}},mounted(){this.value&&(this.url=this.value.url,this.type=this.value.type,this.folderId=this.value.folderId,this.fileId=this.value.fileId),this.token=this.makeid(32),this.popupWidth=window.screen.width*.8,this.popupHeight=window.screen.height*.8,this.popupTop=window.screen.height*.15/2,this.popupLeft=window.screen.width*.2/2,window.addEventListener("message",this.receive,!1)},destroyed(){window.removeEventListener("message",this.receive,!1)},methods:{openKontainer(){if(!this.config.kontainer_url){this.$toast.error(__("Kontainer URL is missing"));return}let i=this.config.kontainer_url.replace(/\/?$/,"/");this.folderId||this.fileId?(this.folderId&&(i+="folder/"+this.folderId+"/"),this.fileId&&(i+="file/"+this.fileId+"/")):i+="login-cms-redirect/",i+="?cmsMode=1&cmsToken="+this.token,window.open(i,"kontainer","width="+this.popupWidth+",height="+this.popupHeight+",top="+this.popupTop+",left="+this.popupLeft+",popup")},receive(i){if(!this.config.kontainer_url.includes(i.origin))return;let e=JSON.parse(i.data);if(this.meta.debug&&console.log(this.fieldId,e),!e){this.$toast.error(__("Error parsing image data"));return}if(!e.url){this.$toast.error(__("Invalid URL"));return}if(e.token===this.token){if(!["image","video","file"].includes(e.type)){this.$toast.error(__("Unknown type"));return}if(this.config.allow_type==="images"&&e.type!=="image"){this.$toast.error(__("Only images allowed"));return}if(this.config.allow_type==="videos"&&e.type!=="video"){this.$toast.error(__("Only videos allowed"));return}if(this.config.allow_type==="files"&&e.type!=="file"){this.$toast.error(__("Only files allowed"));return}this.url=e.url,this.type=e.type,this.folderId=e.folderId,this.fileId=e.fileId,this.update(e)}},remove(){this.url=null,this.type=null,this.folderId=null,this.fileId=null,this.update(null)},makeid(i){let e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",l=t.length;for(let o=0;o<i;o++)e+=t.charAt(Math.floor(Math.random()*l));return e}}};var g=function(){var e=this,t=e._self._c;return t("div",[e.type==="image"&&e.url?t("div",{staticClass:"mb-2"},[t("a",{staticClass:"inline-block",attrs:{href:e.url,target:"_blank"}},[t("img",{attrs:{src:e.url+"?w=300&h=300"}})])]):e._e(),e.type==="video"&&e.url?t("div",{staticClass:"mb-2"},[t("video",{attrs:{controls:"",width:"300"}},[t("source",{attrs:{src:e.url,type:"video/mp4"}}),e._v(" "+e._s(e.__("Sorry, your browser doesn't support embedded videos."))+" ")])]):e._e(),e.type==="file"&&e.url?t("div",{staticClass:"flex items-center text-sm text-gray-800 bg-gray-100 border border-gray-400 rounded p-2 mb-2"},[t("div",{staticClass:"flex-none w-4 h-4 mr-1"},[t("svg",{staticClass:"block",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[t("path",{attrs:{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M23.25 9.9 12.273 20.878a6.75 6.75 0 0 1-9.546-9.546l9.016-9.015a4.5 4.5 0 1 1 6.363 6.363L9.091 17.7a2.25 2.25 0 0 1-3.182-3.181L14.925 5.5"}})])]),t("div",[t("a",{attrs:{href:e.url,target:"_blank"}},[e._v(e._s(e.url))])])]):e._e(),t("button",{staticClass:"btn",attrs:{disabled:e.config.read_only},domProps:{textContent:e._s(e.value?e.__("Edit"):e.__("Browse"))},on:{click:e.openKontainer}}),e.url?t("button",{staticClass:"btn !text-red-400",attrs:{disabled:e.config.read_only},domProps:{textContent:e._s(e.__("Unlink"))},on:{click:e.remove}}):e._e()])},m=[],w=c(v,g,m,!1,null,null,null,null);const y=w.exports;Statamic.booting(()=>{Statamic.$components.register("kontainer_field-fieldtype",y)});
