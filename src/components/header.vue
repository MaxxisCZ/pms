<template>
  <div id="header">
    <a class="logo" href="/">立讯机器人管理系统</a>
    <ul class="nav">
      <li class="myProject">
        <a href="javascript:;">我的项目</a>
        <ul>
          <li class="title">我的项目</li>
          <li>
            <a href="javascript:;">我负责的项目</a>
            <b></b>
          </li>
          <li>
            <a href="javascript:;">我参与的项目</a>
            <b></b>
          </li>
          <li>
            <a href="javascript:;">该我操作的项目</a>
            <b></b>
          </li>
          <li>
            <a href="javascript:;">已完成的项目</a>
            <b>3</b>
          </li>
          <li class="workSpace">
            <a class="btnBorder" href="javascript:;">进入工作区</a>
          </li>
        </ul>
      </li>
      <li class="dashboard">
        <router-link :to="{path:'index'}">仪表盘</router-link>
      </li>
    </ul>
    <ul class="menu">
      <li class="search">
        <input type="text" placeholder="搜索" />
      </li>
      <li class="userMeta">
        <router-link :to="{}">
          <div class="avatar default"></div>
          <div class="userInfo">
            <div>{{userName}}</div>
            <p>苏州立讯机器人</p>
          </div>
        </router-link>
      </li>
      <li><router-link title="未读消息" :to="{}" class="icon-message" ><span v-if="newMsg > 0">{{ newMsg }}</span></router-link></li>
      <li><router-link title="工作记录" :to="{}" class="icon-history"></router-link></li>
      <li><router-link title="个人设置" :to="{}" class="icon-setup"></router-link></li>
      <li><a title="安全退出" class="icon-exit" @click="logout"></a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name : 'lux-header',
    props : {
      newMsg : {
        type : Number,
        default : 0
      },
      userName : {
        type : String,
        default : '访客'
      }
    },
    methods : {
      logout(){
        sessionStorage.removeItem('userInfo');
        this.$router.replace({path:'/login'});
      }
    }
  }
</script>
