const { findadmin,madminlogin, showAdmins,updateAdmin,addAdmin,deleteAdmin,schangadstatus } = require('../Controller/getDatas/admindeal')

// 获取管理员数据视图,
    
function getAdmininfo(req,res){
    showAdmins().then((data)=>{
        res.json({
            datalist: data,
            status: 0
        })
    }).catch((err)=>{
        res.json({
            message: err,
            status: -1
        })
    })
}
// 管理员信息更新接口
function dupdateAdmin(req,res){
    const adminPhoto = req.body.adminPhoto;
    const adminPhone = req.body.adminPhone;
    const adminname = req.body.adminname;
    const adminGrade = req.body.adminGrade;
    const adminEmail = req.body.adminEmail
    updateAdmin({
        data: [adminPhone, adminPhoto, adminPhone, adminname, adminGrade, adminEmail, adminPhone]
    }).then(()=>{
        res.json({
            status: 0,
            message: '修改成功'
        })
    }).catch(()=>{
        res.json({
            status: -1,
            message: '修改失败'
        })
    })
}

function xaddAdmin(req,res){
    const adminPhoto = req.body.adminPhoto;
    const adminPhone = req.body.adminPhone;
    const adminname = req.body.adminname;
    const adminSex = req.body.adminSex;
    const adminGrade = req.body.adminGrade;
    const adminEmail = req.body.adminEmail
    const adcreatetime = new Date()
    const adminpwd = req.body.adminpwd;
    addAdmin({
        data: [adminpwd, adminPhone, adminPhoto, adminPhone, adminname, adminSex, adminGrade, adcreatetime,adminEmail]
    }).then((data)=>{
        console.log(data)
        res.json({
            status: 0,
            message: '添加成功'
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            status: -1,
            message: '添加失败'
        })
    })
}
// 删除管理员
function xdeleteAdmin(req,res){
    const adminId = req.body.adminPhone
    deleteAdmin({
        data: [adminId]
    }).then(()=>{
        res.json({
            status: 0,
            message: '删除成功'
        })
    }).catch(()=>{
        res.json({
            status: -1,
            message: '删除失败'
        })
    })
}

// 管理员登录
function xadminlogin(req,res){
    const phone = req.body.mobelphone;
    const passwd = req.body.passwd;
    madminlogin({
        data: [phone]
    }).then((data)=>{
        console.log(data)
        const ph = data[0].adminPhone
        const pwd = data[0].adminpwd
        console.log(ph,pwd)
        if (phone === ph && passwd === pwd){
            req.session.adphone = phone
            res.json({
                status: 0,
                message: '欢迎管理员' + phone + '登录系统',
                phone
            })
        }else{
            res.json({
                status: -1,
                message: '管理员登录失败'
            })
        }
    }).catch((err)=>{
        console.log(err)
        res.json({
            status: -1,
            message: '登录失败'
        })
    })
}

// 从session里获取管理员 销毁
function admisession(req,res){
    const adp = req.session.adphone
    console.log(adp)
    if(adp && req.query.get === 'true'){
        console.log('session获取成功')
        res.json({
            adphone: req.session.adphone,
            status: 0,
            message: '欢迎管理员' + req.session.adphone
        })
    }else if(req.query.exit === 'true'){
        console.log('session即将销毁')
        req.session.destroy()
        res.json({
            message: 'session销毁完成'
        })
        console.log('session销毁完成')
    }else{
        res.json({
            adphone: null,
            status: -1,
            message: '请重新登录'
        })
    }
    
}

// 状态修改
function changadstatus(req,res){
    console.log(req.body)
    const status = req.body.status
    const phoneNumber = req.body.phoneNumber
    schangadstatus({
        data: [status,phoneNumber]
    }).then(()=>{
        res.json({
            status: 0,
            message: '删除成功'
        })
    }).catch(()=>{
        res.json({
            status: -1,
            message: '删除失败'
        })
    })
}
// 条件查询管理员
function xsearch(req,res){
    const phoneNumber = req.query.phoneNumber
    findadmin({
        data: [phoneNumber]
    }).then((data)=>{
        res.json({
            status: 0,
            data: data
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: err
        })
    })
}
module.exports = {
    getAdmininfo,
    dupdateAdmin,
    xaddAdmin,
    xdeleteAdmin,
    xadminlogin,
    changadstatus,
    xsearch,
    admisession
}