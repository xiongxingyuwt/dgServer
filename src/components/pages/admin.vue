<template>
    <div id="admin">
        <!-- 按钮 组-->
        <div class="btngroup">
            <el-button @click="dialogVisible=true" type="primary" size="meadium" style="width:200px;">添加</el-button>
        </div>
        <!-- tab -->
        <el-table
            height="550"
            :data="pull"
            style="width: 100%"
        >
            <el-table-column
                prop="adminId"
                label="账号"
                width="130"
            >
            </el-table-column>
            <el-table-column
                label="头像"
                width="100px"
                prop="adminPhoto"
            >
                 <template slot-scope="phtoto">
                   <div id="imgbox">
                       <img class='Imgbanner' :src="phtoto.row.adminPhoto" alt="yupian">
                   </div>
                </template>
            </el-table-column>
             <el-table-column
                label="姓名"
                width="100"
                prop="adminname"
            >
            </el-table-column>
             <el-table-column
                label="姓别"
                width="80"
                prop="adminSex"
            >
            </el-table-column>
             <el-table-column
                label="邮箱"
                width="200"
                prop="adminEmail"
            >
            </el-table-column>
             <el-table-column
                label="等级"
                width="80"
                prop="adminGrade"
            >
            </el-table-column>
             <el-table-column
                label="加入时间"
                prop="adcreatetime"           
                width="180"
            >
                <template slot-scope="adcreatetime">
                    <span>{{new Date(adcreatetime.row.adcreatetime).toLocaleString()}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="80"
                prop="adstatus"
            >
                <template slot-scope="adstatus">
                    <span>{{adstatus.row.adstatus ===0? "正常": '已冻结'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleEdit(scope.$index, scope.row)">{{scope.row.adstatus ===0? "冻结": '解冻'}}</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--  -->
        <el-dialog
            title="添加管理员"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose"
        >
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
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                    <el-button type="primary" @click="resetForm('form')">重置</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { addadmin,changstatus,delet } from 'ax/dataaxios/dealadmin'
export default {
    created(){
        this.$store.dispatch('getadminif')
    },
    data(){
        return {
            st: [],
            dialogVisible: false,
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
    computed: {
        pull(){
            return this.$store.state.adlist
        }
    },
    methods: {
        handleEdit(index, row){
            console.log(row)
           if(row.adstatus === 0){
               changstatus({
                    status: 1,
                    phoneNumber: row.adminId
               }).then((res)=>{
                   this.$store.dispatch('getadminif')
               }).catch((err)=>{
               })
           }else{
               changstatus({
                   status: 0,
                   phoneNumber: row.adminId
               }).then((res)=>{
                   this.$store.dispatch('getadminif')
               }).catch((err)=>{
                   console.log(err)
               })
           }
        },
        handleDelete(index, row){
            delet({
                data: row.adminPhone
            }).then((res)=>{
                if(res.status === 0){
                    alert('删除成功')
                    this.$store.dispatch('getadminif')
                }
            })
        },
        handleClose(){
            this.dialogVisible = false
        },
        onSubmit(){
            addadmin({
                data: this.sizeForm
            }).then((res)=>{
                if(res.status === 0){
                    alert("添加成功")
                    this.dialogVisible = false
                    this.$store.dispatch('getadminif')
                }
            }).catch((err)=>{
                this.dialogVisible = false
                this.$store.dispatch('getadminif')
            })
        },
         handlChange(res){
             this.sizeForm.adminPhoto = res.imgurl
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>