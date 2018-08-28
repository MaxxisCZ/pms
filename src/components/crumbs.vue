<template>
    <div id="mainTitle">
        <ul class="crumbs">
            <li>
                <router-link :to="{path:'/'}">首页</router-link>
            </li>
            <li v-for="a in data.crumbs">
                <router-link :to="{path:a.to, hash:a.hash}" v-text="a.name"></router-link>
            </li>
        </ul>
        <ul class="btns">
            <li v-for="a in data.btns">
                <router-link :to="{path:a.to, hash:a.hash}" @click.native="callback(a.click)" :class="{primary:a.primary}" v-text="a.name"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name : 'lux-crumbs',
        props : {
            data : {}
        },
        methods:{
            callback(f){
                f && f(this);
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import '../assets/css/var.less';
    #mainTitle{
        overflow: hidden;
        border-bottom: solid 8px #dff1fa;
        height: 50px;
        .crumbs{
            float: left;
            margin-right: -1000px;
            li{
                float: left;
                position: relative;
                padding: 0 20px;
                line-height: 50px;
                font-size: 18px;
                a{
                    color: #666;
                    &:hover{
                        color: #448eb7;
                    }
                }
                &:after{
                    position: absolute;
                    .icon;
                    content: "\e600";
                    width: 25px;
                    text-align: center;
                    right: -10px;
                    color: #AAA;
                }
                &:last-child{
                    &:after{
                        display: none;
                    }
                    a{
                        pointer-events: none;
                        color:#AAA;
                    }
                }
            }
        }
        .btns{
            float: right;
            padding: 10px 15px 0 0;
            li{
                float: left;
                padding-left: 15px;
                a{
                    // margin-top: 10px;
                    // line-height: 20px;
                    line-height: 30px;
                    vertical-align: bottom;
                    font-size: 15px;
                    float: left;
                    &:hover{
                        color: #448eb7;
                    }
                    &.primary{
                        display: block;
                        padding: 0 15px ;
                        margin-top: 0;
                        border: solid 1px #CCC;
                        border-radius: 3px;
                        line-height: 28px;
                        height: 30px;
                        &:before{
                            .icon;
                            content:'\e69d';
                            font-size: 15px;
                            padding-bottom: 3px;
                            padding-right:5px;
                            display:inline-block;
                        }
                        &:hover{
                            border-color: #448eb7;
                            background: #448eb7;
                            color: #FFF;
                        }
                    }
                }
            }
        }
    }
</style>
