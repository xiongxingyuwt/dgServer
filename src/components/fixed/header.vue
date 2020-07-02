<template>
    <div id='tpheader' class="clearfix">
        <div class="btlbox fl">
            <router-link to="#">
                <div class="imgbg"></div>
            </router-link>
        </div>
        <div class="btrbox fr">
            <router-link to="">
                <span class="messagebox">
                    <i class="el-icon-message-solid"></i>
                    <span class="number">99</span>
                </span>
            </router-link>
            <div class="linkto" @click="dispactiv">
                <span class="getTime">
                    <span class="unmx">{{timelist.h}}</span>
                    <span>时</span>
                    <span class="unmx">{{timelist.m}}</span>
                    <span>分</span>
                    <span class="unmx">{{timelist.s}}</span>
                    <span>秒</span>
                </span>
                <span class="sectionbox">
                    <router-link to="">
                        <p>欢迎光临</p>
                        <p class="userclass">{{iphx}}管理员</p>
                        <span>xxx</span>
                    </router-link>
                </span>
                <span class="iconx el-icon-caret-bottom">
                    <div class="zic" :style="active"></div>
                    <div class="context" :style="active">
                            <ul class="items">
                                <li class="item">
                                    <i class="el-icon-s-tools"></i>
                                    <router-link to="">网络设置</router-link>
                                </li>
                                <li class="item">
                                    <i class="el-icon-s-custom"></i>
                                    <router-link to="">个人中心</router-link>
                                </li>
                                <li class="item" @click="xexit">
                                    <i class="el-icon-switch-button"></i>
                                    <router-link to="/">退出系统</router-link>
                                </li>
                           </ul>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getlogin } from 'ax/dataaxios/dealadmin'
export default {
    data(){
        return {
            active: {
                display: 'none'
            },
            timer: '',
            timelist: {
                h: '',
                m: '',
                s: ''
            },
            iphx: ''
        }
    },
    created(){
        getlogin('get=true').then((res)=>{
                this.iphx = res.adphone
                if(!res.adphone || res.adphone === null){
                this.$router.push('/');
            }
        })
        this.timer = setInterval(()=>{
            this.timelist.h = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
            this.timelist.m = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            this.timelist.s = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        }, 1000);
    },
    destroyed(){
        clearInterval(this.timer)
    },
    methods: {
        dispactiv(){
            if(this.active.display === 'none'){
                this.active.display = 'block'
            }else{
                this.active.display = 'none'
            }
        },
        xexit(){
            getlogin('exit=true').then((res)=>{
                console.log(res)
        })
            this.$router.push('/');
        }
    }
}
</script>