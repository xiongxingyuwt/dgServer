const { getulogin } = require('../Controller/getDatas/userdeal')

function loginx(req, res) {
    console.log(req.body)
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

module.exports = {
    loginx
}