<template>
    <ul>
        <li v-for="(item,index) in menuList" :key="index">
            <a v-if="item.auth & chmod" :class="(active == (item.url = parent + item.name) ? 'active' : '') + (item.children ? ' hasChildren' : '') + (item.showChildren ? ' isOpen' : '') + ' icon-menu' + item.url.replace(/\//g, '-') " @click.self="show(item)" href="javascript:;" :style="{paddingLeft:setLeft + 'px'}" v-text="item.title"></a>
            <lux-menu v-show="item.showChildren" v-if="item.children" :menuList="item.children" :parent="item.url+'/'" :chmod="chmod" :active="active" :paddingLeft="paddingLeft" :setLeft="paddingLeft+setLeft"></lux-menu>
        </li>
    </ul>
</template>

<script>
    import luxMenu 	from '@/components/menu';
    export default {
        name: 'lux-menu',
        data() {
            return {
                status : true,
                timer : null,
            }
        },
        props : {
            menuList : {
                validator : function (value) {
                    return true;
                }
            },
            setLeft : {
                type : Number,
                default : 40
            },
            paddingLeft : {
                type : Number,
                default : 20
            },
            parent : {
                type : String,
                default : '/'
            },
            chmod : {type:Number},
            active : {type:String}
        },
        methods : {
            show(c){
                c.children ? (c.showChildren = !c.showChildren) : this.$router.push({path:c.url});
            }
        },
        components : {
            luxMenu
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/var";
    ul{
        margin: 0; padding: 0; text-align: left; position: relative;
        &:first-child > li > a{
            font-size: 18px;
        }
        li{
            list-style: none; margin: 0; padding: 0;
            a{
                .sl;
                padding: 0 35px;
                line-height: 50px;
                height: 50px;
                border-left: solid 5px transparent;
                display: block;
                color: #FFF;
                font-size: 15px;
                position: relative;
                box-sizing: border-box;
                z-index: 1;
                &.hasChildren{
                    font-size: 18px;
                    &:after{
                        .icon;
                        content: '\e63c';
                        position: absolute;
                        width: 30px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        right: 5px;
                        top:0;
                        font-size: 15px;
                    }
                    &.isOpen:after{
                        .rotate(180deg,.5,.5);
                    }
                }

                &.active,&:hover{
                    background: #1f282c;
                    color: #FFF;
                }
                &.active{
                    border-left-color: #408db9;
                    z-index: 2;
                    box-shadow: -1px 0 0 1px #232d32;
                }
                &:before{
                    .icon;
                    position: absolute;
                    margin-left: -40px;
                    width: 30px;
                    text-align: right;
                    content: '\e64f';
                }
                &.icon-menu-index:before{
                    content: '\e62f';
                }
                &.icon-menu-flow:before{
                    content: '\e606';
                }
                &.icon-menu-line:before{
                    content: '\e746';
                }
                &.icon-menu-goods:before{
                    content: '\e616';
                }
                &.icon-menu-task:before{
                    content: '\e61f';
                }
            }
        }
    }
</style>