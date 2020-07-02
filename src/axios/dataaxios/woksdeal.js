const { axiosRequest } = require('../index')

function getworks(){
    return new Promise((resolve,reject)=>{
        axiosRequest({
            url: 'api/getworks'
        }).then((res)=>{
            resolve(res.worksList)
        }).catch((err)=>{
            reject(err)
        })
    })
}

module.exports = {
    getworks
}