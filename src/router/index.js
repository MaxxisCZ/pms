import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/user/login'
import layout from '@/pages/layout'

Vue.use(Router);
window.setActive = function(c){};
let autoRouter = [];

require('./config').forEach(page=>{
  autoRouter.push({
    meta : {
      requiresAuth : !true,
      keepAlive:true
    },
    path : page,
    component : resolve=>require(['../pages/' + page], resolve)
  },{
    meta : {
      requiresAuth : !true,
      keepAlive:true
    },
    path : page + '/*',
    component : resolve=>require(['../pages/' + page], resolve)
  })
});

let router = new Router({
  mode : 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        requiresAuth:false
      }
    },{
      path: '/',
      name: 'index',
      redirect: '/index',
      component: layout,
      children : autoRouter
    },{
      path: '*',
      name: '未路由的页面统统返回首页',
      redirect: '/index'
    }
  ]
});
router.beforeEach((to, from, next) => {
  //TODO 下面这句仅供未完成用户登录时使用
  sessionStorage.setItem('userInfo', JSON.stringify({
    newMsg:2,
    userName : '访客',
    chmod : -1,
    active : '/'
  }));
  if(to.meta.requiresAuth !== false && !sessionStorage.getItem('userInfo')){
    next({path:'login'});
  }else{
    let params = to.params[0],c=to.path;
    if(params){
      c = c.substr(0, c.length - params.length - 1);
      params = params.split('/');
      for(let i=0,j=params.length; i < j; i+=2){
        to.query[params[i]] = params[i+1];
      }
    }
    window.setActive(to.hash ? to.hash.substr(1) : c);
    if(typeof to.query.reload == "undefined") {
      if (to.meta.keepAlive === 'reload') {
        to.query.reload = true;
        to.meta.keepAlive = true;
      } else {
        to.query.reload = false;
      }
    }
    next();
  }
});
export default router
