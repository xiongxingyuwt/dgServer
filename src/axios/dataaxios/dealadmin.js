const { axiosRequest } = require('../index')
// 获取管理员信息
function getad(){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/getadmin'
        }).then((res)=>{
            console.log(res)
            resolve(res.datalist)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 修改管理员状态
function changstatus(options){
    console.log(options)
        return new Promise((resolve,reject)=>{
            axiosRequest({
                url: 'api/changestatus',
                type: 'post',
                data: {
                    status: options.status,
                    phoneNumber: options.phoneNumber
                }
            }).then((res)=>{
                resolve(res.datalist)
            }).catch((err)=>{
                reject(err)
            })
        })
}
// 添加管理员
function addadmin(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/addAdmin',
            type: 'post',
            data: options.data
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 删除管理员 /deleteAdmin
function delet(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/deleteAdmin',
            type: 'post',
            data: {
               adminPhone: options.data
            }
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// login
function login(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/adminlogin',
            type: 'post',
            data: options.data
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 获取登录信息
function getlogin(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/admisession?' + options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 获取登录信息 phoneNumber
function getloginif(options){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/search?phoneNumber=' + options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    getad,
    addadmin,
    changstatus,
    delet,
    login,
    getlogin,
    getloginif
}