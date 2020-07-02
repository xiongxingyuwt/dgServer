const { userregist } = require('../Controller/getDatas/userdeal')
function userregister(req,res){
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;
    const userSex = req.body.userSex;
    const username = req.body.username;

    userregist({
        sql: 'insert into user_tab(phonenumber,password,username,userSex) values(?,?,?,?)',
        data: [phonenumber,password,username,userSex]
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

module.exports = {
    userregister
}