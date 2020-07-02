const { axiosRequest } = require('../index')

// 获取商品
function getgoods(){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/getgoods'
        }).then((res)=>{
            resolve(res.goods)
        }).catch((err)=>{
            reject(err)
        })
    })
}
// 删除商品
function detetgoods(options){
    console.log(options + '========')
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/deletegoods?fid=' + options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 修改商品 
function updatagoods(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/updategoods',
            type: 'post',
            data: options.datax
        }).then((res)=>{
            resolve(res.goods)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 添加商品
function addgoods(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/addgoods',
            type: 'post',
            data: options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    getgoods,
    detetgoods,
    updatagoods,
    addgoods
}