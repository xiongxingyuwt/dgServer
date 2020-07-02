// options 数据类型array 数据长度
function cahngedata(options,re){
    let slot = ''
    for(var i = 0; i < options.length; i++){
        options[i].push(re)
        slot = i < options.length - 1 ? slot += "?," : slot += "?"
    }
    return {
        options,
        slot
    }
}

module.exports = cahngedata