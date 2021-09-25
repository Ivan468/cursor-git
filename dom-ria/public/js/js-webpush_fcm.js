function PushMessanger(e,t,i){this.webpush_service="https://webpush.ria.com",this.project=e,this.welcomeNotification=t,this.user_id="0",this.web_id="123",this.message=i,this.new_subscribe=!1,this.icon="https://www.ria.com/dist/img/ria-push.png",this.project_name='<span class="blue">RIA.com</span>',this.load=function(){var e=this;e.loadApp(),e.setProjectParams();var t=this.getCookie("PSP_ID"),i=this.getCookie("ui");if(this.project&&(t&&(this.user_id=t.substr(64,t.length)),i&&(i=i.substr(0,i.length-8),i=parseInt(i+"",16).toString(10),this.web_id=i),"123"!=this.web_id||"0"!=this.user_id)){if("Notification"in window&&window.Notification){var s=e.getToken();this.new_subscribe=!s&&"granted"!==Notification.permission,console.log(Notification.permission),e.message&&!s&&"granted"===Notification.permission?e.createConfirm():s&&!s[this.user_id]&&"granted"===Notification.permission?e.subscribe():s||"denied"===Notification.permission?s[this.user_id]&&"denied"!=s[this.user_id]&&"granted"===Notification.permission?e.subscribe():s[this.user_id]&&"denied"==s[this.user_id]&&"default"===Notification.permission?e.subscribe():"denied"===Notification.permission&&s&&e.unsubscribe():e.subscribe(),navigator.serviceWorker.register("/sw.js").then(function(e){}),messaging.onMessage(function(t){e.appendMessage(t)})}return this}},this.appendMessage=function(e){var t=this;console.log("Message received. ",e),window.Notification&&"granted"===Notification.permission&&navigator.serviceWorker.ready.then(function(i){var s=e.data.title?e.data.title:"Уведомление!",o="Спасибо за подписку";e.data.body?o=e.data.body:e.data.alert&&(o=e.data.alert);var a={requireInteraction:!0,body:o,icon:e.data.icon?e.data.icon:"https://www.ria.com/dist/img/logo-uk.png",image:e.data.image?e.data.image:""};a.data={id:e.data.id},e.data.click_action?a.data.url=e.data.click_action:t.url?a.data.url=e.data.url:t.custom&&t.custom.u&&(a.data.url=e.data.custom.u);var n=t.getCookie("webpush_message"),r=t.hashCode(o),c=!0,p=new Date;if(p.setHours(23,59,59,999),n){var d=n.split("/"),u=r.toString();if(d.includes(u))c=!1;else{var h=n+"/"+r;document.cookie="webpush_message="+h+";expires="+p.toUTCString()+";path=/"}}else document.cookie="webpush_message="+r+";expires="+p.toUTCString()+";path=/";c&&t.spawnNotification(s,a)}).catch(function(e){console.log("ServiceWorker registration failed",e)})},this.unsubscribe=function(){var e=this,t=JSON.parse(localStorage.getItem("push_object_data")),i="";for(var s in t)"denied"!=t[s][e.user_id]&&(i=t[s][e.user_id]);if(i){var o=new XMLHttpRequest;o.open("DELETE",e.webpush_service+"/api/subscribes_fcm/"+i,!0),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify({})),localStorage.removeItem("push_object_data")}},this.subscribe=function(){var e=this;messaging.requestPermission().then(function(){messaging.getToken().then(function(t){t?e.sendTokenToServer(t):console.warn("Не удалось получить токен.")}).catch(function(e){console.warn("При получении токена произошла ошибка.",e)})}).catch(function(e){console.warn("Не удалось получить разрешение на показ уведомлений.",e)})},this.sendTokenToServer=function(e){var t=this;if(!t.isTokenSentToServer(e)){var i={project_id:t.project};if(t.user_id&&"0"!=t.user_id&&(i.user_id=t.user_id),t.web_id&&"123"!=t.web_id&&(i.web_id=t.web_id),t.web_id||t.user_id){var s=new XMLHttpRequest;s.open("POST",t.webpush_service+"/api/after_subscribe",!0),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(i))}var o={subscribes:{device_tocken:e,user_id:t.user_id?t.user_id:"0",web_id:t.web_id?t.web_id:"123",domain:location.host,browser:t.detectBrowser(),project_id:t.project}},a=new XMLHttpRequest;a.open("POST",t.webpush_service+"/api/subscribes_fcm",!0),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){4==a.readyState&&200==a.status&&e&&(JSON.parse(a.response).data&&t.setTokenSentToServer(e),t.new_subscribe&&t.welcomeNotification&&t.spawnNotification(t.welcomeNotification.title,t.welcomeNotification))},a.send(JSON.stringify(o))}},this.spawnNotification=function(e,t){var i=this;navigator.serviceWorker.ready.then(function(s){t.icon=i.icon,s.showNotification(e,t)})},this.isTokenSentToServer=function(e){var t=this,i=JSON.parse(localStorage.getItem("push_object_data"));return!!(i&&i[t.project]&&i[t.project][t.user_id]&&i[t.project][t.user_id]==e&&"denied"!=e)},this.getToken=function(){var e=JSON.parse(localStorage.getItem("push_object_data"));return!(!e||!e[this.project])&&e[this.project]},this.setTokenSentToServer=function(e){var t=this;if(localStorage){var i=JSON.parse(localStorage.getItem("push_object_data"));t.user_id=t.user_id?t.user_id:"0",i||(i={}),i[t.project]||(i[t.project]={}),i[t.project][t.user_id]||(i[t.project][t.user_id]={}),i[t.project][t.user_id]=e,localStorage.setItem("push_object_data",JSON.stringify(i))}var s=document.getElementsByClassName("want_subscribe");for(var o in s)"object"==typeof s[o]&&s[o].classList.toggle("hide");document.getElementById("already_subscribe")&&document.getElementById("already_subscribe").classList.add("hide"),document.getElementById("done_subscribe")&&document.getElementById("done_subscribe").classList.remove("hide")},this.getCookie=function(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):void 0},this.loadApp=function(){firebase.initializeApp({apiKey:"AIzaSyAkyJ4Ex9zCWo-wFsnwVAYI-8Da5wD9dHA",authDomain:"testrianotifications.firebaseapp.com",databaseURL:"https://testrianotifications.firebaseio.com",projectId:"testrianotifications",storageBucket:"",messagingSenderId:"982171711279"}),messaging=firebase.messaging()},this.createConfirm=function(){var e=this;if(!e.getCookie("show_webpush")){var t=e.createDiv("div",{class:"wpush-wrap"},"<style>.wpush-wrap{display: block;width: 365px;min-height: 140px;position: fixed;left: 90px;top: 10px;background: #fff;box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);padding: 12px 35px 15px 65px;z-index: 999;line-height: 1.2;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABuCAYAAABhhpAAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxRTlGNjg2QkY5ODExRTdBMzUyOUY0NEE2NEUwNDU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxRTlGNjg3QkY5ODExRTdBMzUyOUY0NEE2NEUwNDU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFFOUY2ODRCRjk4MTFFN0EzNTI5RjQ0QTY0RTA0NTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTFFOUY2ODVCRjk4MTFFN0EzNTI5RjQ0QTY0RTA0NTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4AYWWyAAACfElEQVR42uycTUhUURTHr6Njjk2TH40QM2gIgaJuhGTESF3Wog/wCyELWgQiJIgEunDauRFdRFuHEiQwYtDcCEoQJEEi4kYQGZyJCLEICkKo8X+YqwtRyZH0/ekc+PGGgQfvx7x7zrl33n0ZsXjiqzEmH3wDS+AlGAW/jEOjJBjY/eyyF2/ssR48AysgZAjCdcD3xeAtaGQVkMgGE8DPKiBRAPqZBSTaQSazgNxCl5kFJILsAl52AaMCKnA8gTugDmSxCnSAd2ATjIMbTpE56i3kA23gDfgEwuAC6xgoAgNgHYyAQtZB7AGPwCroBm7WLJQHhsE8qGBOo9Xgo/1VaOvAGTsunoMc5kJ2F8zZeQVtJQ7Z6amfVUCiEsz+i1R7kr2QSERt2qVt5qSfirB3oy2gi72dHrL1glYg295KWawCElW2d6KekT0BF5kFcsFj9jnxQ3OMdScnCEiz18m+KvHAZiZaAZme3mIWkGhiF7huJ0K0AufANWYBiVoVOOWoZheQdOplFpAoZRcIsAt42AV87AJn2QXc7AJGBVRABVRABVRABVRABVRABVRABVRABVRABVRABU4h6Feny9gFrrILyF9MV9gHcQ+7QKtJPaJJnUbHzF886etkgUtgGpxnLmQ14L05ZEMFQyUuBwtg0Oyz4SgjFk8kiTqHLTAFZsAy+MImoM2cCqiACjgsZANClF3gNttF7305jI4BFfjfs1AkjfN6wYZTBO6lcV4f8y30E3xmFpA980lmgVfMWUhe5faCWSAMfrAKyET6KWshWwTN4A+jgCxjNIDvbK1EHNwHN5168TuV+LdJvUdOjmvgA3gNJk1qIcnRsS3AAOQQVBPnOErwAAAAAElFTkSuQmCC');background-repeat: no-repeat;background-position: -1px 50%;box-sizing: border-box}.wpush-wrap *{box-sizing: border-box}.wpush-wrap .i-block{display: inline-block}.wpush-wrap .blue{color: #003b56}.wpush-wrap .orange{color: #f19311}.wpush-wrap .red{color: #db5c4c}.wpush-wrap .size15{font-size: 15px}.wpush-wrap .size13{font-size: 13px}.wpush-wrap .wpush-head, .wpush-wrap .wpush-text{margin-bottom: 5px}.wpush-wrap .wpush-nav{margin-top: 12px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;width: 100%;}.wpush-wrap .wpush-button{display: block;text-align: center;width: 150px;font-size: 15px;padding: 5px 10px;position: relative;border: 1px solid #256799;border-radius: 3px;-webkit-transition: all .2s;-moz-transition: all .2s;-o-transition: all .2s;transition: all .2s;float: left;}.wpush-wrap .wpush-button:hover{text-decoration: none;background: #ddf4fb}.wpush-wrap .wp-close{position: absolute;padding-top: 2px;font-size: 28px;line-height: 30px;text-decoration: none;cursor: pointer;border-bottom-color: transparent;opacity: .5;right: 10px;top: 5px;color: #a0a0a0;text-shadow: 0 1px 0 #fff}.wpush-wrap .wp-close:hover{color: #003b56;opacity: .75;text-decoration: none}.wpush-wrap .wpush-cansel{margin-left: 10px;float: left;white-space: nowrap;line-height: 30px}@media (min-width: 769px){.wpush-wrap{border-radius: 3px}.wpush-wrap:before{position: absolute;bottom: 100%;left: 35px;width: 0;height: 0;border-style: solid;border-width: 0 7px 7px 7px;border-color: transparent transparent #ffffff transparent;content: ''}}@media (max-width: 768px){.wpush-wrap{top: initial;bottom: 0;left: 0;right: 0;width: 100%;display: flex;flex-direction: column;justify-content: center;min-height: 120px}.wpush-wrap br{display: none}.wpush-wrap .wp-close:before{position: absolute;top: -5px;bottom: 0;left: -10px;right: -10px;content: ''}}</style>");t.setAttribute("id","wpush_wrap_subscribe");var i=e.createDiv("div",{class:"wpush-head size15"},"<strong>"+e.message.title+"</strong>"),s=e.createDiv("div",{class:"wpush-head size13"},e.message.text),o=e.createDiv("div",{class:"wpush-nav"},""),a=e.createDiv("a",{class:"wpush-button",href:"javascript:void(0)"},e.message.subscribe_word),n=e.createDiv("a",{class:"wpush-cansel",href:"javascript:void(0)"},e.message.unsubscribe_word);a.setAttribute("onclick","subscribeEvent(1)"),n.setAttribute("onclick","subscribeEvent(2)");var r=e.createDiv("a",{class:"wp-close",href:"javascript:void(0)"},"x");r.setAttribute("onclick","closePush()"),t.appendChild(i),t.appendChild(s),o.appendChild(a),o.appendChild(n),t.appendChild(o),t.appendChild(r),document.getElementsByTagName("body")[0].appendChild(t),e.setCookieWp()}},this.createDiv=function(e,t,i){var s=document.createElement(e);for(var o in t)s.setAttribute(o,t[o]);return s.innerHTML=i,s},this.detectBrowser=function(){return navigator.userAgent},this.setCookieWp=function(){var e=new Date;e.setTime(e.getTime()+216e5);(document.domain.match(/(\w+?\.?ria\.\w+)?$/)||[,"ria.com"])[1];document.cookie="show_webpush=1;expires="+e.toUTCString()+";path=/"},this.setProjectParams=function(){switch(this.project){case 2:case 5:case 7:this.icon="https://css.riastatic.com/images/apple-touch-icon-180x180-precomposed.png",this.project_name='<span class="red">AUTO.RIA</span>';break;case 3:case 4:this.icon="https://dom.riastatic.com/css/images/apple-touch-icon-180x180-precomposed.png",this.project_name='<span class="orange">DOM.RIA</span>'}},this.hashCode=function(e){return e.split("").reduce(function(e,t){return(e<<5)-e+t.charCodeAt(0)|0},0)}}function subscribeEvent(e){e&&(2==e?push_subscribe_object.setTokenSentToServer("denied"):1==e&&push_subscribe_object.subscribe());var t=document.getElementById("wpush_wrap_subscribe");t.parentNode.removeChild(t)}function closePush(){var e=document.getElementById("wpush_wrap_subscribe");e.parentNode.removeChild(e)}