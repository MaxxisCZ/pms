<template>
    <div id="pageLayout" v-if="data.page_total>1">
        <ul v-if="data.action">
            <li>
                <a :class="{active:data.page==1}" @click="data.action(1)" v-text="1"></a>
            </li>
            <li v-if="data.page > 4">...</li>
            <li v-for="i in getPage()">
                <a :class="{active:data.page==i}" @click="data.action(i)" v-text="i"></a>
            </li>
            <li v-if="data.page_total - data.page > 3">...</li>
            <li>
                <a :class="{active:data.page==data.page_total}" @click="data.action(data.page_total)" v-text="data.page_total"></a>
            </li>
        </ul>
        <ul v-else>
            <li>
                <router-link :class="{active:data.page==1}" :to="page(1)" v-text="1"></router-link>
            </li>
            <li v-if="data.page > 4">...</li>
            <li v-for="i in getPage()">
                <router-link :class="{active:data.page==i}" :to="page(i)" v-text="i"></router-link>
            </li>
            <li v-if="data.page_total - data.page > 3">...</li>
            <li>
                <router-link :class="{active:data.page==data.page_total}" :to="page(data.page_total)" v-text="data.page_total"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name : 'lux-page',
        props : {
            data : {}
        },
        methods:{
            page(page){
                let app = this;
                return {
                    path : app.data.url.replace('{page}', page)
                }
            },
            getPage(){
                let app = this, pages = [];
                for(let i = Math.max(2, app.data.page-2), l = Math.min(app.data.page + 2, app.data.page_total - 1); i <= l; i++){
                    pages.push(i);
                }
                return pages;
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import '../assets/css/var.less';
    #pageLayout{
        position: relative;
        text-align: right;
        padding: 25px 0;
        ul{
            display: inline-block;
            font-size: 0;
            li{
                display: inline-block;
                font-size: 15px;
                margin-left: 15px;

                a{
                    display: block;
                    min-width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 28px;
                    box-sizing: border-box;
                    padding: 0 5px;
                    border: solid 1px #DDD;
                    border-radius: 3px;
                    &.active,&:hover{
                        background: #478eb5;
                        color:#FFF;
                        border-color: #478eb5;
                    }
                    &.active{
                        pointer-events: none;
                    }
                }
            }

        }
    }
</style>
