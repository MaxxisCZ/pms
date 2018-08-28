<template>
 <div>
      <div class="tab">
           <span>首页</span>
           <span>基础配置</span>
           <span class="active">新增流程</span>
       </div>
 </div>
</template>

<script>

 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style scoped lang="less" rel="stylesheet/less">
@import '../assets/css/var.less';
 .tab{
         font-size: 16px;
         color: #8f8f8f;
         background: #fff;
         height: 50px;
         padding-left: 50px;
         span{
             line-height: 50px;
             margin-right: 50px;
             &:after{
               content: "\e600";
               .icon;
               position: relative;
               left:20px;
             }
             &:last-child:after{
                 content: "";
             }
         }
         .active{
           color: #bfbfbf;
         }      
        &:after{
            display: none;
        }
     }

</style>
