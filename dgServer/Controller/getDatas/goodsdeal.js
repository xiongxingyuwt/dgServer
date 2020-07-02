const query = require('../mysql/getConn')
function mgetgoods(){
    return new Promise((resolve,reject)=>{
        query({
            sql: "select * from fshop_tab ORDER BY fid ASC"
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 添加商品
function saddgoods(options){
    return new Promise((resolve,reject)=>{
        query({
            sql: 'insert into fshop_tab(fimgurl,fname,foriginPrice,fnowprice,originadrr)values(?,?,?,?,?)',
            data: options.data
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
// 修改商品
function supdategoods(options){
    if(options.data.fimgurl !== 'null'){
        options.sql = 'update fshop_tab set fimgurl=?,fname=?,foriginPrice=?,fnowprice=?,originadrr=? where fid=?'
    }else{
        options.sql = 'update fshop_tab set fname=?,foriginPrice=?,fnowprice=?,originadrr=? where fid=?'
    }
    return new Promise((resolve,reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
// 删除商品
function sdeletegoods(options){
    console.log('数据' + options)
    return new Promise((resolve,reject)=>{
        query({
            sql: 'delete from fshop_tab where fid = ?',
            data: [options]
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 商品详情
function getgoodscomtianer(options){
    console.log(options)
    return new Promise((resolve,reject)=>{
        query({
            sql: 'SELECT * from fshop_tab where fid = ?',
            data: options.data
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 订单处理
function saddolder(options){
    return new Promise((resolve,reject)=>{
        query({
            sql: 'INSERT into older_tab(olderacount,createTime,userphone,oldergoodsname,goodsid,count,everprice,allprice) VALUES(?,?,?,?,?,?,?,?)',
            data: options.data
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    mgetgoods,
    saddgoods,
    supdategoods,
    sdeletegoods,
    getgoodscomtianer,
    saddolder
}