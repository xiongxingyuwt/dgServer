const { uplod,sfindpassword,getulogin,userregist,getuser, backstoreupuser,frontupuser } = require('../Controller/getDatas/userdeal')
// 登录接口
function loginx(req, res) {
    getulogin({
        sql: 'select phonenumber,password from user_tab where phonenumber=?',
        data: [req.body.phonenumber]
    }).then((da)=>{
        // 调用数据库接口获取用户名和密码
        if(req.body.phonenumber === da[0].phonenumber && req.body.password === da[0].password){
            req.session.phonenumber = da[0].phonenumber;
            res.json({
                message: '登录成功!欢迎' + req.body.phonenumber + '用户使用本系统',
                status: 0
            })
        }else{
            res.json({
                message: '登录失败',
                status: -1,
                userphone: da[0].phonenumber
            })
        }
    })
}
// 注册接口
function userregister(req,res){
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;
    const username = req.body.username;

    userregist({
        sql: 'insert into user_tab(phonenumber,password,username) values(?,?,?)',
        data: [phonenumber,password,username]
    }).then(()=>{
        res.json({
            message: '注册成功',
            status: 0
        })
    }).catch((err)=>{
        res.json({
            message: err,
            status: -1
         })
    })
}

// 获取用户全部信息
function getuserimfo(req,res){
    getuser({
        sql: 'select * from user_tab'
    }).then((data)=>{
        res.json({
            status: 0,
            userlist: data
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: '数据获取失败'
        })
    })
}
// 获取用全部信息
function getsessioninfo(req,res){
    const phonenumber = req.session.phonenumber;
    console.log(phonenumber)
    if(phonenumber){
        getulogin({
            sql: 'select * from user_tab where phonenumber=?',
            data: [phonenumber]
        }).then((da)=>{
            res.json({
                message: '登录成功!欢迎' + phonenumber + '用户使用本系统',
                status: 0,
                lists: da
            })
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        res.json({
            status:-1,
            message: '请重新登录'
        })
    }
}

// 前端用户管理 
function xfrontupuser(req,res){
    console.log(req.body)
    const userphoto = req.body.userphoto;
    const phonenumber = req.body.phonenumber;
    const username = req.body.username;
    const userSex = req.body.userSex;
    const addr = req.body.addr;
    const myfav = req.body.myfav;
    let birthday = req.body.birthday;
    birthday = new Date(birthday).toLocaleString()
    const decorations = req.body.decorations

    frontupuser({
        sql: 'update user_tab set userphoto=?,username=?,userSex=?,addr=?,myfav=?,birthday=?,decorations=? where phonenumber=?',
        data: [userphoto, username, userSex, addr, myfav, birthday, decorations, phonenumber]
    }).then((dat)=>{
        console.log(dat)
        res.json({
            status: 0,
            message: '修改成功'
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: '修改失败' + err
        })
    })
}

// 用户密码找回
function findpassword(req,res){
    const phoneNumber = req.body.phonenumbet
    const newpassword = req.body.newpassword
    sfindpassword({
        sql: 'update user_tab set password=? where phonenumber=?',
        data: [newpassword, phoneNumber]
    }).then(()=>{
        res.json({
            status: 0,
            message: '恭喜用户' + phoneNumber + '密码修改成功'
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: '密码修改错误' + err
        })
    })
}

// 后台用户管理 
function xbackstoreupuser(req,res){
    const phonenumber = req.body.phonenumber
    const userClass = req.body.userClass
    const userstatus = req.body.userstatus
    backstoreupuser({
        sql: 'update user_tab set userClass=?,userstatus=? where phonenumber=?',
        data: [userClass, userstatus, phonenumber]
    }).then(()=>{
        res.json({
            status: 0,
            message: '修改成功'
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: '修改失败' + err
        })
    })
}
// updatestatus
function updatestatus(req,res){
    const phonenumber = req.query.phonenumber
    const userstatus = req.query.userstatus
    console.log(phonenumber,userstatus + '用户状态管理')
    if(parseInt(userstatus) === 0){
        console.log('用户正在恢复冻结状态....')
        uplod({
            sql: 'update user_tab set userstatus = ? where phonenumber = ?',
            data: [userstatus, phonenumber]
        }).then(()=>{
            res.json({
                status: 0,
                message: '用户' + phonenumber + '恢复成功'
            })
        }).catch((err)=>{
            res.json({
                status: -1,
                message: '用户恢复错误' + err
            })
        })
    } else if(parseInt(userstatus) === -1){
        console.log('正在冻结用户....')
        uplod({
            sql: 'update user_tab set userstatus = ? where phonenumber = ?',
            data: [userstatus, phonenumber]
        }).then(()=>{
            res.json({
                status: 0,
                message: '用户' + phonenumber + '冻结成功'
            })
        }).catch((err)=>{
            res.json({
                status: -1,
                message: '用户冻结错误' + err
            })
        })
    }
}
module.exports = {
    loginx,
    userregister,
    getuserimfo,
    xbackstoreupuser,
    xfrontupuser,
    findpassword,
    getsessioninfo,
    updatestatus
}