const axios = require('axios')

function axiosRequest(options){
    return new Promise((resolve,reject)=>{
        axios({
            url: options.url,
            method: options.type || 'get',
            data: options.data,
            parmas: options.data
        }).then((res)=>{
            resolve(res.data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
module.exports = {
    axiosRequest
}
