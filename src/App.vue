<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div id="dialog" v-if="dialog.index > 0">
      <div class="mask" :style="{'z-index':dialog.index}"></div>
      <div v-for="item in dialog.data" :class="['dialog', item.type].join(' ')" :style="{'z-index':item.index}">
        <div class="title" v-if="item.title" v-text="item.title"></div>
        <div class="content" v-if="item.content" v-html="item.content"></div>
        <div class="btns" v-if="item.btns">
          <div class="btn" v-for="btn in item.btns" :class="{primary:btn.primary}" v-text="btn.value" @click="btn.action(item)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dialog : {
        show : false,
        index:0,
        data : [],
        app : null
      }
    }
  },
  created(){
    this.dialog.nextTick = this.$nextTick;
    this.$lux.dialog.dialog = this.dialog;
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import "assets/css/style";
</style>
