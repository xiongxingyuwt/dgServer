<template>
    <div id="registconter">
        <div id="regist-box">
            <el-form 
                ref="form" 
                :model="sizeForm" 
                label-width="80px" 
                size="mini"
            >
                <el-form-item label="头像上传">
                    <el-upload
                        action="/api/upload"
                        list-type="picture-card"
                        :auto-upload="true"
                        :on-success="handlChange">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="账号(手机号)" prop="adminPhone">
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
                <el-form-item label="密码">
                    <el-input  type="password" v-model='sizeForm.adminpwd' placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                    <el-button type="primary" @click="linktologin">已有账号/点击登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div> 
</template>

<script>
import { addadmin } from 'ax/dataaxios/dealadmin'
export default {
    data(){
        return {
            imgurl: '',
            sizeForm: {
                adminpwd: '',
                adminname: '',
                adminPhoto: '',
                adminPhone: '',
                adminEmail: '',
                adminSex: '',
                adminGrade: ''
            }
        }
    },
    methods:{
        handlChange(res){
             this.sizeForm.adminPhoto = res.imgurl
        },
        onSubmit(){
            addadmin({
                data: this.sizeForm
            }).then((res)=>{
                if(res.status === 0){
                    alert("注册成功")
                    this.$router.push('/loginManage');
                }
            }).catch((err)=>{
                alert("注册失败")
            })
        },
        linktologin(){
            this.$router.push('/loginManage');
        }
    }
}
</script>