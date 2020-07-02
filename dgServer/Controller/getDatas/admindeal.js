const query = require('../mysql/getConn')

// 管理员数据操作
function showAdmins(){
    return new Promise((resolve, reject)=>{
        query({
            sql: 'select adminId,adminPhoto,adminPhone,adminname, adminSex,adminGrade,adcreatetime,adminEmail,adstatus from admin_tab'
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}
// 添加管理员
function addAdmin(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: "insert into admin_tab(adminpwd,adminId,adminPhoto,adminPhone,adminname, adminSex,adminGrade,adcreatetime,adminEmail) values(?,?,?,?,?,?,?,?,?)",
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 更新管理员数据
function updateAdmin(options){
    console.log(options.data)
    return new Promise((resolve, reject)=>{
        query({
            sql: "update admin_tab set adminId=?,adminPhoto=?,adminPhone=?,adminname=?,adminGrade=?,adminEmail=? where adminId=?",
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 删除管理员
function deleteAdmin(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: "delete from admin_tab where adminPhone = ?",
            type: 'post',
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}
// 获取登录信息
function madminlogin(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: "select adminPhone,adminpwd from admin_tab where adminPhone = ?",
            data: options.data,
            type: 'get'
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 修改管理员状态
function schangadstatus(options){
    console.log(options)
    return new Promise((resolve, reject)=>{
        query({
            sql: "update admin_tab set adstatus=? where adminPhone=?",
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 条件查询
function findadmin(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: "select * from admin_tab where adminPhone = ?",
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    showAdmins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    madminlogin,
    schangadstatus,
    findadmin
}