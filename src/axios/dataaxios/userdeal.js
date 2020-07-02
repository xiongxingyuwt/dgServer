const { axiosRequest } = require('../index')

function getuser(){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/getuser'
        }).then((res)=>{
            resolve(res.userlist)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// 冻结 phonenumber: row.phonenumber, row.userstatus
function fixuserclss(phonenumber,userstatus){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/fixstatus?phonenumber=' + phonenumber + '&userstatus=' + userstatus
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

module.exports = {
    getuser,
    fixuserclss
}