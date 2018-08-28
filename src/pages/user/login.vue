<template>
    <div id="loginLayout">
        <div class="control">
            <div class="logo">
                <p>智能工厂MES</p>
                <span>版本 1.0</span>
            </div>
            <div id="form">
                <div>
                    <i class="icon-userName"></i>
                    <input placeholder="请输入用户名或手机号" type="text" v-model="userName" />
                </div>
                <div>
                    <i class="icon-passWord"></i>
                    <input placeholder="请输入密码" type="password" v-model="passWord" />
                </div>
                <div>
                    <i class="icon-captcha"></i>
                    <input maxlength="4" v-bind:placeholder="placehold" type="text" v-model="captcha" @focus.once="getCaptcha" @keyup.enter.self="login" /><img id="captcha" v-if="src" v-bind:src="src" @click="resetCaptcha" />
                </div>
                <div class="option">
                    <label>
                        <input type="checkbox" autocomplete="false" value="1" /> 自动登录
                    </label>
                    <a href="####"><span class="icon-forget"></span> 忘记密码？</a>
                </div>
                <div v-if="errorMsg" class="error">{{errorMsg}}</div>
                <div class="submit_btn">
                    <button v-bind:disabled="userName.length < 2 || passWord.length < 6 || captcha.length != 4" @click="login"  @keyup.enter.self="login">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'login',
        data () {
            return {
                userName : '',
                passWord : '',
                captcha : '',
                src : false,
                placehold : '点此获取验证码',
                errorMsg : ''
            }
        },

        methods : {
            login(){
                let app = this;
                //*
                app.$lux.jQuery.curl('user/login',{
                    data : {
                        userName : app.userName,
                        passWord : app.passWord,
                        captcha  : app.captcha,
                        comm : [{
                            id : '',
                            cid : 0
                        },{
                            id : 2,
                            cid : 3
                        }]
                    }
                }).then(result=>{
                    if(result.errorCode){
                        app.errorMsg = result.errorMsg;
                        app.captcha = '';
                        app.resetCaptcha();
                    }else{
                        sessionStorage.setItem('userInfo', JSON.stringify(result.data));
                        app.$router.push({path:'/'});
                    }
                }).catch(err=>{

                });
            },
            getCaptcha(){
                this.src='';
                this.resetCaptcha();
                this.placehold = '请输入验证码';
            },
            resetCaptcha(){
                this.src = this.$lux.apiServer + '/captcha?v=' + Math.floor(Math.random() * 10000000) + '&token=qweqwqeqwdfsewewfwewefsf'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less/var.less">
    @import "../../assets/css/var.less";
    body{
        #loginLayout{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background: #e3f5fe;
            padding: 15px;
            min-height: 420px;
            min-width: 700px;
            .control{
                .translate;
                position: absolute;
                left: 50%;
                top: 50%;
                width: 245px;
                padding: 65px 105px 90px 350px;
                background: #FFF;
                box-shadow: 0px 0px 8.96px 7.04px rgba(186, 229, 254, 0.26);
                border-radius: 3px;
                .logo{
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 245px;
                    background: #368cb9;
                    text-align: center;
                    p{
                        position: absolute;
                        height: 50px;
                        width: 100%;
                        line-height: 50px;
                        top: 50%;
                        margin-top: -25px;
                        color: #FFF;
                        font-size: 32px;
                    }
                    span{
                        display: block;
                        position: absolute;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 15px;
                        //text-align: right;
                        bottom: 0;
                        color: rgba(255,255,255,.5);
                    }
                }

                #form > div{
                    position: relative;
                    margin-top: 25px;
                    overflow: hidden;
                    i[class^='icon-']{
                        position: absolute;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #FFF;
                        background: #368cba;
                    }
                    i.icon-userName:before{
                        content: '\e620';
                    }
                    i.icon-passWord:before{
                        content: '\e614';
                    }
                    i.icon-captcha:before{
                        content: '\e656';
                    }
                    input[type='text'],input[type='password']{
                        box-sizing: border-box;
                        width: 100%;
                        padding: 0 5px 0 35px;
                        border:solid 1px #9f9f9f;
                        height: 30px;
                        &:focus{
                            border-color:#368cba;
                            & + img#captcha{
                                border-left-color: #368cba;
                            }
                        }
                        font-size: 15px;
                    }
                    img#captcha{
                        position: absolute;
                        right: 1px;
                        top:1px;
                        height: 28px;
                        border-left: solid 1px #9f9f9f;
                    }
                    &.option{
                        margin-top: 9px;
                        font-size: 14px;
                        label{float: left; color: #999;}
                        a{
                            float: right; color: #999;
                            &:hover{color: #3bb7fb;}
                        }
                    }
                    &.submit_btn{
                        button{
                            border: none;
                            background: #3bb7fb;
                            width: 100%;
                            height: 34px;
                            color: #FFF;
                            font-size: 20px;
                            border-radius: 3px;
                            &:disabled{
                                background: #666;
                            }
                        }

                    }
                    &.error{
                        color: #F00;
                        line-height: 1.4;
                        padding-left: 20px;
                        margin-top: 15px;
                        &:before{
                            .icon;
                            content: '\e67a';
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                    }

                }
            }
        }
    }
</style>
