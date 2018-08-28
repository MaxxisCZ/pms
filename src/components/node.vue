<template>
    <div>
        <div class="node" v-for="(node, index) in nodes.children" :tabindex="(node.parent=nodes)&&1" onkeydown="return event.key ? !(({'ArrowUp':1,'ArrowDown':1,'ArrowLeft':1,'ArrowRight':1})[event.key]) : true" @keyup.self.37="left(index)" @keyup.self.38="top(index)" @keyup.self.39="right(index)" @keyup.self.40="bottom(index)"  @keyup.enter.self="append" @keydown.tab.self="after(index)" @keydown.delete.self="remove(index)" v-focus="node.focus" :class="{active:node.active}" @focus="setActive(node)" @dblclick="$event.stopPropagation(edit(node))" @keyup.space="$event.stopPropagation(edit(node))" @blur="node.focus=false">
            <div class="control">
                <div class="f-l">
                    <i title="关联设备" @click="addTool(node.before)"></i>
                    <p v-for="(tool, j) in node.before" @click="editTool(tool, node.before, j)" :style="{'background-image':'url(' + baseUrl + tool.icon + ')', 'border-color' : (tool.color || '#FFF')}"></p>
                </div>
                <div class="f-r">
                    <p v-for="(tool, j) in node.after" @click="editTool(tool, node.after, j)" :style="{'background-image':'url(' + baseUrl + tool.icon + ')', 'border-color' : (tool.color || '#FFF')}"></p>
                    <i title="关联设备" @click="addTool(node.after)"></i>
                </div>
                <div class="input" :style="{marginLeft:25*node.before.length+'px',marginRight:25*node.after.length+'px'}">
                    <input v-focus.select="node.edit" v-model="node.name" onkeydown="return (event.stopPropagation(),(event.key ? (event.key == 'Tab' ? (this.blur(),false) : true) : true))" @focus.self="edit(node)" @blur.self="save"  @keyup.enter.self="save" />
                    <span v-html="node.name.replace(/ /g, '&nbsp;')"></span>
                </div>
            </div>
            <lux-node v-if="node.children" :nodes="node" :actions="actions" :baseUrl="baseUrl"></lux-node>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import luxNode from '@/components/node';
    export default {
        name: 'lux-node',
        data () {
            return {
                show:false,
                active : null
            }
        },
        props:{
            nodes:{},
            actions:{},
            baseUrl:{type:String},
            isEditLine:{}
        },
        methods: {
            setActive(node){
                this.active = node;
                node.focus = true;
            },
            append(){
                if(this.isEditLine) return;

                let node = this.active, nn = {
                    id : 0,
                    parent:node,
                    name : 'new node',
                    before : [],
                    after : [],
                    children : [],
                    focus : false,
                    active : true,
                    edit : false
                };

                node.children.push(nn);
                setTimeout(function(){
                    nn.edit = true;
                }, 10);
            },
            after(index){
                if(this.isEditLine) return;

                let node = this.active.parent,nn = {
                    id : 0,
                    parent:node,
                    name : 'new node',
                    before : [],
                    after : [],
                    children : [],
                    focus : false,
                    active : true,
                    edit : false
                };
                node.children.splice(index+1, 0, nn);
                setTimeout(function(){
                    nn.edit = true;
                }, 10);
            },
            save(){
                let node = this.active;
                node.edit=false;
                node.active=false;
                node.focus = true;
                node.name = node.name.replace(/(^\s*)|(\s*$)/g, "");
                if(node.name == '') node.name = '未命名节点';
            },
            left(i){
                if(i == 0) return this.top();
                let node = this.active.parent.children[i-1];
                if(!node) return;
                if(this.active) this.active.focus = false;
                node.focus = true;
                this.active = node;
            },
            right(i){
                let node = this.active.parent.children[i+1];
                if(!node) return this.top();
                this.active.focus = false;
                node.focus = true;
                this.active = node;
            },
            top(i){
                let node = this.active.parent;
                if(typeof node.active == 'undefined') return i > 0 ? this.left(i) : false;
                if(this.active) this.active.focus = false;
                node.focus = true;
                this.active = node;
            },
            bottom(i){
                let node = this.active.children[0];
                if(!node) return this.right(i);
                this.active.focus = false;
                node.focus = true;
                this.active = node;
            },
            edit(node){
                if(this.isEditLine) return;
                this.active = node;
                node.active = true;
                node.focus = false;
                node.edit = true;
            },
            reSelect(){
                if(this.isEditLine) return;
                this.active.focus = true;
            },
            remove(i){
                if(this.isEditLine) return;
                let obj=this, children = obj.active.parent.children;
                children.splice(i, 1);
                console.log(children.length);
                if(i > 0){
                    obj.active = children[i - 1];
                    obj.active.focus = true;
                }else if(typeof obj.active.parent.active != 'undefined'){
                    obj.active = obj.active.parent;
                    obj.active.focus = true;
                }else if(children.length > 0){
                    obj.active = children[0];
                    obj.active.focus = true;
                }else{
                    obj.active = {
                        id : 0,
                        parent:null,
                        name : 'start',
                        before : [],
                        after : [],
                        children : [],
                        focus : false,
                        active : true,
                        edit : false
                    };

                    children.push(obj.active);
                    setTimeout(function(){
                        obj.active.edit = true;
                    }, 10);
                }
            },
            addTool(seat){
                this.actions.addTool && this.actions.addTool(seat, this);
            },
            editTool(tool, seat, index){
                this.actions.editTool && this.actions.editTool(tool, seat, index, this);
            },
        },
        directives: {
            focus: {
                update: function (el, {value, oldValue, modifiers, arg}) {
                    if (value && !oldValue) {
                        el.focus();
                        //arg == 'select' && el.select();
                        modifiers.select && el.select();
                    }
                }
            }
        },
        components: {
            luxNode,
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/var";
    .node{
        display: inline-block;
        position: relative;
        z-index: 1;
        border: solid 1px #d7d7d7;
        border-radius: 3px;
        margin-right: 35px;
        vertical-align: middle;
        margin-bottom: 15px;
        &:after{
            .icon;
            font-size: 15px;
            content: '\e627';
            height: 30px;
            display: block;
            position: absolute;
            width: 33px;
            text-align: center;
            top: 50%;
            margin-top: -15px;
            right: -36px;
            color: #478eb5;
        }
        &:last-child{
            margin-right: 5px;
            &:after{display: none;}
        }
        .node{
            margin: 5px 25px 10px 10px;
            &:last-child{
                margin-right: 10px;
            }
        }
        *{
            vertical-align: middle;
        }
        .control{
            font-size: 15px;
            .ip(){
                display:block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 18px;
                margin: 5px;
                cursor: pointer;
                float: left;
                color: #999;
                border-radius: 3px;
                overflow: hidden;
                &:hover{
                    background-color: #DDD;
                }
                border: solid 1px transparent;
                box-sizing: border-box;
            }
            i{
                .ip;
                width: 18px;
                height: 18px;
                line-height: 18px;
                border: none;
                &:after{
                    .icon;
                    font-size: 15px;
                    content: '\e643';
                    display: block;
                }
            }
            p{
                .ip();
                background: center center no-repeat;
                background-size: cover;
            }
            div{
                position: relative;
                display: block;
                overflow: hidden;
                text-align: center;
                font-size: 15px;
                &.f-l{
                    float: left;
                    margin-right: -1000px;
                    padding-left: 5px;
                    i,p{margin-right: 0}
                }
                &.f-r{
                    float: right;
                    margin-left: -1000px;
                    padding-right: 5px;
                    i,p{margin-left: 0}
                }
                &.input{
                    pointer-events: none;
                    padding: 0 25px;
                }
                input{
                    pointer-events: auto;
                    position: absolute;
                    box-sizing: border-box;
                    width: 100% !important;
                    font-size: inherit;
                    font-family: inherit;
                    height: 30px;
                    border: none !important;
                    margin: 0;
                    padding: 0 10px !important;
                    text-align: center !important;
                    line-height: 30px;
                    top: -300px;
                    left:0;
                    color: #333;
                    background: transparent !important;
                    &:focus{
                        top:0px;
                        box-shadow: none !important;
                    }
                }
                span{padding:0 10px; display: inline-block; font-size: inherit; min-width: 80px; height: 30px; line-height: 30px; color: #333;}
            }
        }

        &.active,&:focus{
            box-shadow: 0 0 5px 0 #478eb5;
            border-color: #478eb5;
            > .control > div{
                //&.input{padding: 0 25px;}
                > i{
                    display: inline-block;
                }
            }
        }
        &.active > .control > div.input input:focus + span{color: #FFF};
    }
</style>
