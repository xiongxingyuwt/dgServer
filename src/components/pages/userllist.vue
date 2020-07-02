<template>
    <div id="admin">
        <!-- tab -->
        <el-table
            height="550"
            :data="pullxz"
            style="width: 100%"
        >
            <el-table-column
                prop="phonenumber"
                label="账号"
                width="130"
            >
            </el-table-column>
            <el-table-column
                label="头像"
                width="100px"
                prop="userphoto"
            >
                 <template slot-scope="phtoto">
                   <div id="imgbox">
                       <img class='Imgbanner' :src="phtoto.row.userphoto === null?'http://d.hiphotos.baidu.com/zhidao/pic/item/e61190ef76c6a7efd517f640fbfaaf51f3de66a6.jpg':phtoto.row.userphoto" alt="yupian">
                   </div>
                </template>
            </el-table-column>
             <el-table-column
                label="姓名"
                width="100"
                prop="username"
            >
            </el-table-column>
             <el-table-column
                label="姓别"
                width="80"
                prop="userSex"
            >
                <template slot-scope="sex">
                    {{sex.row.userSex ===null?'未指定':sex.row.userSex}}
                </template>
            </el-table-column>
             <el-table-column
                label="邮箱"
                width="200"
                prop="userEmail"
            >
                <template slot-scope="useem">
                    {{useem.row.userEmail === null? '未注册':useem.row.userEmail}}
                </template>
            </el-table-column>
             <el-table-column
                label="等级"
                width="80"
                prop="userClass"
            >
                <template slot-scope="usclass">
                    {{usclass.row.userClass === 0 ? '普通用户':usclass.row.userClass === 1?'会员':usclass.row.userClass === 2?'超级会员':'等级错误'}}
                </template>
            </el-table-column>
             <el-table-column
                label="生日"
                prop="birthday"           
                width="180"
            >
                <template slot-scope="birthday">
                    <span>{{new Date(birthday.row.birthday).toLocaleString()}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="80"
                prop="userstatus"
            >
                <template slot-scope="userstatus">
                    <span>{{userstatus.row.userstatus ===0? "正常": userstatus.row.userstatus ===-1? '已冻结':'非法用户'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleEdit(scope.$index, scope.row)">{{scope.row.userstatus ===0? "冻结":scope.row.userstatus ===-1? '解冻':''}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fixuserclss } from 'ax/dataaxios/userdeal.js'
export default {
    created(){
       this.$store.dispatch('getuserlist')
    },
    data(){
        return {
            value: '',
            sizeForm: {
                adminpwd: '',
                adminname: '',
                adminPhoto: '',
                adminPhone: '',
                adminEmail: '',
                adminSex: '',
                adminGrade: ''
            },
            statususer: 0
        }
    },
    computed: {
        pullxz(){
            return this.$store.state.userlist
        }
    },
    methods: {
        handleEdit(index, row){
           if(this.statususer === 0){
                fixuserclss(row.phonenumber,-1).then((res)=>{
                        if(res.status === 0){
                            this.$store.dispatch('getuserlist')
                            this.statususer = -1
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
           } else if(this.statususer === -1){
               fixuserclss(row.phonenumber,0).then((res)=>{
                        if(res.status === 0){
                            this.$store.dispatch('getuserlist')
                            this.statususer = 0
                        }
                    }).catch((err)=>{
                        this.$store.dispatch('getuserlist')
                    })
           }
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>