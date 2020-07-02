const query = require('../mysql/getConn')

// 获取登录需要的用户信息
function getulogin(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 更新用户等级
function uplod(options){
    console.log(options.data)
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 用户获取
function getuser(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}
// }
// 注册接口
function userregist(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 后台用户管理 用户等级 用户状态 的管理
function backstoreupuser(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}
// 用户头像 昵称 和 密码更新
function frontupuser(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 密码找回
function sfindpassword(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: options.sql,
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

module.exports = {
    getulogin,
    userregist,
    getuser,
    backstoreupuser,
    frontupuser,
    sfindpassword,
    uplod
}