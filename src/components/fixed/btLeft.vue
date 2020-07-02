<template>
    <div id="btLeft">
        <ul class="options">
            <router-link :to="item.tolink" v-for="(item,index) in options" :key="index">
                <li :class="item.active" class="option clearfix" >
                    <div class="opl fl">{{item.title}}</div>
                    <div class="opr fr"><i :class="item.icClass"></i></div>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            options: [
                {
                    title: "用户列表",
                    icClass: 'el-icon-arrow-right',
                    tolink: '/userManage'
                },
                {
                    title: "作品管理(菜谱)",
                    icClass: 'el-icon-arrow-right',
                    tolink: '/worksManage'
                },
                {
                    title: "商品管理",
                    icClass: 'el-icon-arrow-right',
                    tolink: '/olderManage'
                },
                {
                    title: "管理员管理",
                    icClass: 'el-icon-arrow-right',
                    tolink: '/manageManage'
                }
            ]
        }
    }
}
</script>