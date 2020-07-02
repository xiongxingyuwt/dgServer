<template>
    <div id="admin">
        <!-- 按钮 组-->
        <div class="btngroup">
            <el-button @click="addgoods" type="primary" size="meadium" style="width:200px;">添加</el-button>
        </div>
        <el-table
            height="550"
            :data="pullxz"
            style="width: 100%"
        >
            <el-table-column
                label="商品号"
                width="150"
                prop="fid"
            >
                <template slot-scope="fid">
                    <span>{{fid.row.fid + 'F202006Y'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商品banner"
                width="120"
                prop="fimgurl"
            >
                 <template slot-scope="fimgurl">
                    <img width="100%" height="80px" :src="fimgurl.row.fimgurl === null?'未发布banner': fimgurl.row.fimgurl" alt="图片更新失败">
                </template>
            </el-table-column>
            <el-table-column
                label="商品名称"
                width="300"
                prop="fname"
            >
            </el-table-column>
            <el-table-column
                label="原价"
                width="100"
                prop="foriginPrice"
            >
            </el-table-column>
            <el-table-column
                label="现价"
                width="100"
                prop="fnowprice"
            >
            </el-table-column>
             <el-table-column
                label="发源地"
                width="120"
                prop="originadrr"
            >
            </el-table-column>
            <el-table-column
                label="月销量"
                width="80=0"
                prop="fsaleCount"
            >
                <template slot-scope="fsaleCount">
                    <span>{{fsaleCount.row.fsaleCount ===null? 0: fsaleCount.row.fsaleCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                       @click="handleedit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="商品编辑"
            :visible.sync="dialogVisible"
            width="60%"
        >
            <el-form 
                ref="form" 
                :model="sizeForm" 
                label-width="80px" 
                size="mini"
            >
                <el-form-item label="商品封面上传">
                    <el-upload
                        action="/api/upload"
                        list-type="picture-card"
                        :auto-upload="true"
                        :on-success="handlChange">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品banner" prop="adminPhone">
                   <img :src="sizeForm.fimgurl" alt="">
                </el-form-item>
                <el-form-item label="商品号" prop="adminPhone">
                   <el-input v-model='sizeForm.fid' placeholder="请输入管理员手机号"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                   <el-input v-model='sizeForm.fname' placeholder="请输入商品标题"></el-input>
                </el-form-item>
                <el-form-item label="商品原价">
                   <el-input v-model='sizeForm.foriginPrice' placeholder="请输入商品原价"></el-input>
                </el-form-item>
                <el-form-item label="商品现价">
                   <el-input v-model='sizeForm.fnowprice' placeholder="请输入商品现价"></el-input>
                </el-form-item>
                <el-form-item label="商品发源地">
                   <el-input v-model='sizeForm.originadrr' placeholder="请输入商品现价"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button type="primary" @click="resetForm('form')">重置</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
        <el-dialog
            title="商品编辑"
            :visible.sync="adddialogVisible"
            width="60%"
        >
            <el-form 
                ref="form" 
                :model="sizeForm" 
                label-width="80px" 
                size="mini"
            >
                <el-form-item label="商品封面上传">
                    <el-upload
                        action="/api/upload"
                        list-type="picture-card"
                        :auto-upload="true"
                        :on-success="handlChange">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品标题">
                   <el-input v-model='sizeForm.fname' placeholder="请输入商品标题"></el-input>
                </el-form-item>
                <el-form-item label="商品原价">
                   <el-input v-model='sizeForm.foriginPrice' placeholder="请输入商品原价"></el-input>
                </el-form-item>
                <el-form-item label="商品现价">
                   <el-input v-model='sizeForm.fnowprice' placeholder="请输入商品现价"></el-input>
                </el-form-item>
                <el-form-item label="商品发源地">
                   <el-input v-model='sizeForm.originadrr' placeholder="请输入商品现价"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="addgoodsx">添加</el-button>
                    <el-button type="primary" @click="resetForm('form')">重置</el-button>
                    <el-button @click="adddialogVisible=false">取消</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { detetgoods,updatagoods,addgoods } from 'ax/dataaxios/goodsdeal'
export default {
    created(){
        return this.$store.dispatch('getgoodslist')
    },
    data(){
        return {
            adddialogVisible: false,
            dialogVisible: false,
            sizeForm:{
                fname: '',
                fimgurl: '',
                fnowprice: '',
                foriginPrice: '',
                originadrr: '',
                fid:''
            }
        }
    },
    // fimgurl,fname,foriginPrice,fnowprice,originadrr
    computed: {
        pullxz(){
            return this.$store.state.goodslist
        }
    },
    methods: {
        handleDelete(index,row){
            console.log(row.fid)
            detetgoods(row.fid).then((res)=>{
                if(res.status === 0){
                    alert(res.message)
                    this.$store.dispatch('getgoodslist')

                }else{
                    alert("删除失败")
                    this.$store.dispatch('getgoodslist')
                }
            }).catch((err)=>{
                alert("删除失败")
                this.$store.dispatch('getgoodslist')
            })
        },
        handleedit(idx,row){
            this.dialogVisible = true
            this.sizeForm.fname = row.fname
            this.sizeForm.fimgurl = row.fimgurl
            this.sizeForm.fnowprice = row.fnowprice
            this.sizeForm.foriginPrice = row.foriginPrice
            this.sizeForm.originadrr = row.originadrr
            this.sizeForm.fid = row.fid
        },
        onSubmit(){
            updatagoods({
                datax: this.sizeForm
            }).then((res)=>{
                if(res.status === 0){
                    alert("修改成功")
                    this.$store.dispatch('getgoodslist')
                }else{
                    alert("修改失败")
                    this.$store.dispatch('getgoodslist')
                }
            }).catch((err)=>{
                this.$store.dispatch('getgoodslist')
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
         handlChange(res){
             this.sizeForm.fimgurl = res.imgurl
        },
        addgoods(){
            this.adddialogVisible = true
            this.sizeForm.fname = ''
            this.sizeForm.fimgurl = ''
            this.sizeForm.fnowprice = ''
            this.sizeForm.foriginPrice = ''
            this.sizeForm.originadrr = ''
            this.sizeForm.fid = ''
        },
        addgoodsx(){
            addgoods({
                fname: this.sizeForm.fname,
                fimgurl: this.sizeForm.fimgurl,
                fnowprice: this.sizeForm.fnowprice,
                foriginPrice: this.sizeForm.foriginPrice,
                originadrr: this.sizeForm.originadrr
            }).then((res)=>{
                if(res.status === 0){
                    alert('添加成功')
                    this.adddialogVisible = false
                    this.$store.dispatch('getgoodslist')
                }else{
                    alert('添加失败')
                    this.adddialogVisible = false
                    this.$store.dispatch('getgoodslist')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>