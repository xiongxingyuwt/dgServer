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
                width="180"
            >
            </el-table-column>
            <el-table-column
                label="头像"
                width="180px"
                prop="userphoto"
            >
                 <template slot-scope="phtoto">
                   <div id="imgbox">
                       <img class='Imgbanner' :src="phtoto.row.userphoto === null?'http://d.hiphotos.baidu.com/zhidao/pic/item/e61190ef76c6a7efd517f640fbfaaf51f3de66a6.jpg':phtoto.row.userphoto" alt="yupian">
                   </div>
                </template>
            </el-table-column>
            <el-table-column
                label="作品banner"
                width="150"
                prop="userphoto"
            >
                 <template slot-scope="phtoto">
                    <img width="100%" height="80px" class='Imgbanner' :src="phtoto.row.userphoto === null?'未发布banner':phtoto.row.userphoto" alt="图片更新失败">
                </template>
            </el-table-column>
            <el-table-column
                label="作品标题"
                width="200"
                prop="works_title"
            >
            </el-table-column>
            <el-table-column
                label="作品类型"
                width="100"
                prop="works_type"
            >
                <template slot-scope="works_type">
                    <span>{{works_type.row.works_type ===null || works_type.row.works_type === 0 ? "笔记": works_type.row.works_type === 1?'教程':works_type.row.works_type === 2?"菜谱":'超级菜谱'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="作品风格"
                width="100"
                prop="works_class"
            >
                <template slot-scope="works_class">
                    <span>{{works_class.row.works_class ===null || works_class.row.works_class === 0 ? "中国风": works_class.row.works_class === 1?'西餐':"混合"}}</span>
                </template>
            </el-table-column>
             <el-table-column
                label="姓名"
                width="120"
                prop="username"
            >
            </el-table-column>
            <el-table-column
                label="状态"
                width="80"
                prop="works_status"
            >
                <template slot-scope="works_status">
                    <span>{{works_status.row.works_status ===0? "上线": '已下线'}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('getworkslist')
    },
    data(){
        return {
            dialogVisible: false,
            sizeForm: {
                phonenumber: '',
                wimgUrl: '',
                works_class: '',
                works_title: '',
                works_type: ''
            }
        }
    },
    computed: {
        pullxz(){
            return this.$store.state.wokslist
        }
    }
}
</script>