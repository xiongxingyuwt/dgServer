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
                                <li class="item" @click="myself">
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
         <!--  -->
        <el-dialog
            title="个人中心"
            :visible.sync="mysdialogVisible"
            width="60%"
            :before-close="handleClose"
            :modal-append-to-body='false'
        >
            <el-form 
                ref="form" 
                :model="sizeForm" 
                label-width="80px" 
                size="mini"
            >   
                <el-form-item label="管理员头像">
                   <img :src="sizeForm.adminPhoto" alt="" width="300px">
                </el-form-item>
                <el-form-item label="账号(手机号)">
                   <el-input v-model='sizeForm.adminPhone' placeholder="请输入管理员手机号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                   <el-input v-model='sizeForm.adminname' placeholder="请输入管理员手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                   <el-input v-model='sizeForm.adminEmail' placeholder="请输入管理员邮箱"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="sizeForm.adminSex" size="medium">
                        <el-radio border label="男"></el-radio>
                        <el-radio border label="女"></el-radio>
                     </el-radio-group>
                </el-form-item>
                <el-form-item label="等级" prop="adminGrade">
                    <el-radio-group v-model="sizeForm.adminGrade" size="medium">
                        <el-radio border label="普通"></el-radio>
                        <el-radio border label="高级"></el-radio>
                        <el-radio border label="超级"></el-radio>
                     </el-radio-group>
                </el-form-item>
                <el-form-item size="large">
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getlogin,getloginif } from 'ax/dataaxios/dealadmin'
export default {
    data(){
        return {
            sizeForm: {
                adminpwd: '',
                adminname: '',
                adminPhoto: '',
                adminPhone: '',
                adminEmail: '',
                adminSex: '',
                adminGrade: ''
            },
            mysdialogVisible:false,
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
    computed:{
        pull(){
            return this.$store.state.adlist
        }
    },
    created(){
        this.$store.dispatch('getadminif')
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
        },
        handleClose(){
            this.mysdialogVisible = false
        },
        myself(){
            getloginif(this.iphx).then((datas)=>{
                if(datas.status === 0){
                    console.log(datas.data[0].adminname)
                    this.sizeForm.adminname = datas.data[0].adminname
                    this.sizeForm.adminPhoto = datas.data[0].adminPhoto
                    this.sizeForm.adminPhone = datas.data[0].adminPhone
                    this.sizeForm.adminEmail = datas.data[0].adminEmail
                    this.sizeForm.adminSex = datas.data[0].adminSex
                    this.sizeForm.adminGrade = datas.data[0].adminGrade
                    this.mysdialogVisible = true
                }
            })
        }
    }
}
</script>