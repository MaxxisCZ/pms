<template>
    <div tabindex="0" @focus="focus()" :class="'calendar id_' + id + (active? ' active' : '')">
        <input tabindex="-1" type="text" :value="showTime" autocomplete="off" placeholder="" readonly />
        <div tabindex="-1" :class="{showClass: classData}">
            <ul class="title">
                <li @click="reset(m-=1)"><</li>
                <li @click="reset(y-=1)"><<</li>
                <li>{{date}}</li>
                <li @click="reset(y+=1)">>></li>
                <li @click="reset(m+=1)">></li>
            </ul>
            <ul class="week">
                <li v-for="w in weeks" v-text="w"></li>
            </ul>
            <ul class="days" :w="startWeek">
                <li v-for="_d in days" :class="{active:d==_d}" v-text="_d" @click="select(_d)"></li>
            </ul>
            <div class="setClass">
                <div>
                    <label v-for="(name, id) in classData"><input type="radio" v-model="c" :value="id" /><a tabindex="-1">{{name}}</a></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lux-calendar',
        data () {
            return {
                date:'2018年6月',
                showTime : '',
                classData : null,
                minTime : null,
                maxTime : null,
                startWeek : 0,
                active:false,
                y:0,
                m:0,
                d:0,
                c:0,
                format : '',
                days : [],
                id: 0,
                weeks : ['日', '一', '二', '三', '四', '五', '六'],
                setVal : ()=>{},
                auto : true
            }
        },
        props:{
            data:{}
        },
        methods: {
            double(a){
                return Number(a) < 10 ? ('0' + a) : a;
            },
            focus(el){
                let app = this;
                app.auto = true;
                if(!app.active){
                    app.active = true;
                    app.$lux.jQuery(":not('.calendar.id_" + app.id + ", .calendar.id_" + app.id + " *')").unbind('focus').one('focus', ()=>{
                        app.active=false;
                    });
                }
            },
            select(d){
                let app=this;
                d > 0 ? (app.d = d) : (d = app.d);
                let time = app.$lux.time, date = new Date(app.y + '-' + app.m + '-' + d);
                app.showTime = time.timeToStr({time : date.getTime() / 1000, format : app.format}, ($1)=>{
                    switch($1){
                        case 'c':
                            return app.classData[app.c];
                        default:
                            return $1;
                    }
                });
                app.setVal({
                    year : app.y,
                    Month : app.double(app.m),
                    day : app.double(app.d),
                    class : app.c
                });
            },
            reset(){
                let app = this, date = new Date();
                date.setFullYear(app.y);
                date.setMonth(app.m-1);
                date.setDate(1);
                app.startWeek = date.getDay();
                date.setFullYear(app.y);
                date.setMonth(app.m);
                date.setDate(0);

                app.y = date.getFullYear();
                app.m = date.getMonth() + 1;
                app.date = app.y + '年' + app.double(app.m) + '月';

                app.days = [];
                for(let i = 1, ed = date.getDate(); i<=ed; i++){
                    app.days.push(i);
                }
                app.auto && app.select(Math.min(app.d, date.getDate()));
            }
        },
        mounted(){
            let app = this, time = app.$lux.time, data = app.data, date;
            app.id = Math.floor(Math.random()*10000000000);
            if(typeof data.auto != 'undefined') app.auto = !!data.auto;
            app.format = data.format || 'Y-m-d';
            data.setVal && (app.setVal=data.setVal);
            if(data.default){
                date = new Date(data.default.y + '-' + data.default.m + '-' + data.default.d);
                app.c = data.default.c || 0;
            }else{
                data.datetime > 0 ? (date = new Date(data.datetime*1000)) : (date = new Date(), app.auto=false);
            }
            app.minTime = data.minTime ? time.timeToStr({time:data.minTime == 'now' ? time.now() : data.minTime, format:'YmdHis'}) : null;
            app.maxTime = data.maxTime ? time.timeToStr({time:data.maxTime == 'now' ? time.now() : data.maxTime, format:'YmdHis'}) : null;
            app.classData = data.class;
            app.c = Object.keys(data.class)[0];
            app.y = date.getFullYear();
            app.m = date.getMonth() + 1;
            app.d = date.getDate();
            date.setDate(1);
            app.startWeek = date.getDay();

            app.reset();
        },
        watch:{
            "c"(){
                this.auto && this.select();
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/var";
    .calendar{
        position: relative;
        display: inline-block;
        z-index: 9;
        input{
            pointer-events: none;
        }
        > div{
            position: absolute;
            min-width: 100%;
            background: #FFF;
            display: none;
            box-sizing: border-box;
            border: solid 1px #428db3;
            margin-top: -1px;
            &:after{
                content: '';
                clear: both;
                height: 0;
                overflow: hidden;
            }
            @width : 14.2857143%;
            ul.title,ul.week,ul.days{
                clear: both;
                position: relative;
                li{
                    cursor: pointer;
                    float: left;
                    width: @width;
                    text-align: center;
                    &:hover{
                        color: #428db3;
                    }
                }
            }
            ul.week{
                li{
                    cursor: auto;
                    &:hover{
                        color: #333;
                    }
                }
            }
            ul.days{
                li.active{
                    color:#3b8cb7;
                }
                &[w="1"] li:first-child{margin-left: 1 * @width;}
                &[w="2"] li:first-child{margin-left: 2 * @width;}
                &[w="3"] li:first-child{margin-left: 3 * @width;}
                &[w="4"] li:first-child{margin-left: 4 * @width;}
                &[w="5"] li:first-child{margin-left: 5 * @width;}
                &[w="6"] li:first-child{margin-left: 6 * @width;}
            }
            ul.title{
                padding: 0 60px;
                li{
                    width: 30px;
                    &:nth-child(1){margin-left: -60px;}
                    &:nth-child(2){margin-left: -30px;}
                    &:nth-child(3){width: 100%;}
                    &:nth-child(4){margin-right: -60px;}
                    &:nth-child(5){margin-right: -60px; margin-left: 30px;}
                }
            }
            &.showClass{
                ul.title,ul.week,ul.days{
                    margin-right: 60px;
                }
                .setClass{
                    float: right;
                    width: 60px;
                    position: absolute;
                    left: auto;
                    font-size: 12px;
                    right: 0;
                    top:0;
                    bottom :0;
                    background: #3b8cb7;
                    color: #FFF;
                    > div{
                        position: absolute;
                        width: 100%;
                        top: 50%;
                        .translate(0, -50%);
                        label{
                            padding: 5px;
                            position: relative;
                            display: block;
                            overflow: hidden;
                            input{
                                position: absolute;
                                left: -200px;
                                &:checked + a{
                                    color: #3b8cb7;
                                    background: #FFF;
                                }
                            }
                            a{
                                cursor: pointer;
                                display: block;
                                border-radius: 20px;
                                line-height: 24px;
                                text-align: center;
                                color: #FFF;
                            }
                        }
                    }
                }
            }

        }
        &:focus,&.active{
            div{
                left: 0;
                display: block;

            }
            input{
                border: solid 1px #428db3 !important;
                border-radius: 3px 3px 0 0 !important;
                border-bottom: none !important;
            }
        }
    }
</style>
