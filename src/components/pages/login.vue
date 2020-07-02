<template>
    <div id="login-box">
            <el-form 
                ref="form" 
                :model="sizeForm" 
                label-width="80px" 
                size="mini"
            >
                <el-form-item label="账号:" prop="adminPhone">
                   <el-input v-model='sizeForm.mobelphone' placeholder="请输入管理员手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                   <el-input type="password" v-model='sizeForm.passwd' placeholder="请输入管理员登录密码"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button type="danger" @click="resetForm">还没账号/注册</el-button>
                </el-form-item>
                </el-form>
    </div>
</template>

<script>
import { login } from 'ax/dataaxios/dealadmin'
export default {
    data(){
        return {
            sizeForm: {
                mobelphone: '',
                passwd: ''
            }
        }
    },
    methods:{
        onSubmit(){
            login({
                data: this.sizeForm
            }).then((res)=>{
                this.$router.push('/admin');
            })
        },
        resetForm(){
            this.$router.push('/registManage');
        },
        handleClose(){
            this.dialogVisible = false
        }
    }
}
</script>