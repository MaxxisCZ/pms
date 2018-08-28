<template>
    <div>
        <lux-header :newMsg="newMsg" :userName="userName"></lux-header>
        <div id="leftMenu">
            <lux-menu :menuList="menuList" :chmod="chmod" :active="active"></lux-menu>
        </div>
        <div id="body">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import luxHeader 	from '@/components/header';
    import luxMenu 	  from '@/components/menu';
    const menu = require('../menuList');

    export default {
        name : 'lux-layout',
        data() {
            return {
                newMsg:2,
                userName : '访客',
                chmod : 0,
                active : '/',
                menuList : menu.menu
            }
        },
        components : {
            luxHeader,
            luxMenu,
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
            this.chmod = userInfo.chmod ||0;
            this.newMsg = Math.floor(Math.random() * 200);
            this.userName = userInfo.realName || userInfo.userName;

            let c;
            if(this.$route.hash && this.$route.hash != '#lux'){
                c = this.$route.hash.substr(1);
            }else{
                let params = this.$route.params[0];
                c = this.$route.path;
                if(params){
                    c = c.substr(0, c.length - params.length - 1);
                }
            }

            this.setActive(c);
            window.setActive = this.setActive;
        },
        methods : {
            setActive(c){
                let activeAlias = menu.alias || {
                    //'/order/edit' : '/order/list'
                };
                this.active = activeAlias[c] ? activeAlias[c] : c;
                c = this.active.substr(1).split('/');
                let menuList = this.menuList;
                for(let i in c){
                    for(let j in menuList){
                        if(menuList[j] && menuList[j].children){
                            if(menuList[j].name == c[i]){
                                menuList[j].showChildren = true;
                                menuList = menuList[j].children;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>
