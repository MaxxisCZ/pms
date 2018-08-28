<!--
title:
auto:
router:
-->
<template>
  <div style="padding: 15px;">
    <a class="btnBorder" @click="openDialog">打开dialog</a>
  </div>
</template>

<script>
  export default {
    //name: "test",
    data() {
      return {}
    },
    methods: {
      openDialog(){
        let app = this, dialog = app.$lux.dialog;
        dialog.open({
          title : 'dialog',
          content : '这是一条测试消息',
          btns : [
            {
              value : '取消',
              action(item){
                dialog.close();
              }
            },
            {
              value : '确定',
              primary : true,
              action(item){
                alert('你点了确定');
                dialog.close();
              }
            }
          ]
        })
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
