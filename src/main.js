import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import dialog from '../src/libs/dialog'
import time from '../src/libs/time'
import ep from 'eventproxy'
import crypto from 'crypto'

Vue.config.productionTip = false;

let apiServer = process.env.apiServer;

jQuery.curl = (api, options, ByXHR)=>{
  return new Promise((resolve, reject)=>{
    if(options){
      if(typeof options.data == "undefined") options = {data: options};
    }else{
      options = {};
    }
    options = jQuery.extend({
      async:true,
      type: 'POST',
      dataType: 'json',
      url: (/^(https?:\/\/)/i).test(api) ? api : (apiServer + '/' + api),
      data:{},
      context:null,
      xhrFields:{withCredentials: true},
      timeout:10000
    }, options || {});
    options.success = resolve || function(data, textStatus, jqXHR){};
    options.error = reject || function(XHR, TS){};
    typeof options.complete == 'function' || (options.complete = function (XHR, TS) {});

    if(ByXHR){
      const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open(options.type, options.url, true);
      if(options.progress){
        const startDate = new Date().getTime();
        xhr.upload.addEventListener("progress", function(evt){
          if (evt.lengthComputable) {
            evt.taking = (new Date().getTime()) - startDate;
            options.progress(evt);
          }
        });
      }
      let formData = new FormData();
      $.each(options.data||{}, function(key, value){
        formData.append(key, value);
      });
      xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {
          if (xhr.status==200) {
            if(options.dataType == 'json'){
              if(xhr.responseText != ""){
                options.success(JSON.parse(xhr.responseText), 200, xhr);
              }else{
                options.success({}, 200, xhr);
              }
            }else{
              options.success(xhr.responseText, 200, xhr);
            }
          }else{
            options.error(xhr, xhr.status);
          }
          options.complete(xhr, xhr.status);
        }
      };
      xhr.send(formData);
      return xhr;
    }else{
      return jQuery.ajax(options);
    }
  })
};
jQuery.curl.getServer=()=>{
  return apiServer;
};

let task = function(c){
  let _ep = new ep(c);
  _ep.curl = function(api, options, ByXHR){
    let curl = jQuery.curl(api, options, ByXHR);
    return {
      done:(task)=>{
        curl.then((data, textStatus, jqXHR)=>{
          _ep.emit(task, data);//{data : data, textStatus : textStatus, jqXHR:jqXHR});
        }).catch((XHR, TS)=>{
          _ep.emit('error', {XHR:XHR, TS:TS});
        })
      }
    }
  };
  return _ep;
};

Math.formatFloat = function (f, digit) {
  let m = Math.pow(10, digit||2);
  return Math.round(f * m) / m;
};
Vue.prototype.$lux = {
  dialog : dialog,
  jQuery : jQuery,
  apiServer: apiServer,
  crypto : crypto,
  ep : ep,
  time : time,
  join(obj,separator){
    let arr = [];
    for(let i in obj){
      arr.push(obj[i]);
    }
    return arr.join(separator);
  },
  each(data, cb){
    if(typeof cb != "function") return;
    if(typeof data != "object") return cb(data, 0);
    for(let i in data){
      if(cb(data[i], i) === false){
        break;
      }
    }
  },
  double(a){
    return Number(a) < 10 ? ('0' + a) : a;
  },
  task : task,
  debounce : function(fn,delay){
    let timer;
    delay=delay||300;
    return function(){
      let th=this, args=arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer=setTimeout(function () {
        timer=null;
        fn.apply(th,args);
      }, delay);
    };
  },
  throttle : function (fn,interval){
    let last, timer;
    interval=interval||200;
    return function(){
      let th=this, args=arguments, now=+new Date();
      if(last&&now-last<interval){
        clearTimeout(timer);
        timer=setTimeout(function(){
          last=now;
          fn.apply(th,args);
        },interval);
      }else{
        last=now;
        fn.apply(th,args);
      }
    }
  }
};

Vue.directive('datetime', {
  bind(el,binding, vnode){
    el.innerHTML = time.timeToStr(binding.value);
  },
  update(el,binding, vnode){
    el.innerHTML = time.timeToStr(binding.value);
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
