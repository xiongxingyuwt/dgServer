const { ssgetuwv,saddworks,supdatauwv,gettoclass } = require('../Controller/getDatas/worksdeal')
// 作品上传接口
function addworks(req,res){
    const phonenumber = req.body.phonenumber
    const works_title = req.body.works_title
    const works_decoration = req.body.works_decoration
    const creatTime = new Date().toLocaleString()
    const wimgUrl = req.body.imgurl
    const foodname = req.body.foodname
    const foodimg = req.body.foodimg
    const food_count = req.body.food_count
    saddworks({
        data1: [phonenumber, works_title, works_decoration,creatTime],
        data2: [[wimgUrl]],
        data3: [[foodname, foodimg, parseFloat(food_count)]]
    }).then((data)=>{
        res.json({
            worksId: data,
            status: 0,
            message: '添加作品成功'
        })
    }).catch((err)=>{
        res.json({
            message: '添加失败',
            status: -1,
            err
        })
    })
}

function updatauwfav(req,res){
    const phonenumber = req.query.phonenumber
    // 获取当前用户
    const phone = req.session.phonenumber 
    // 前端点击 喜爱 收藏 浏览 关注 触发各项的数据变化更新到数据库中
    const w_favor = req.query.f
    const w_Collection = req.query.c
    const star = req.query.s
    ssgetuwv({
        data: [phonenumber]
    }).then((data)=>{
        var w_favoritecount = parseInt(data.w_favoritecount)
        var woks_star = parseInt(data.woks_star)
        var wViews_count = parseInt(data.wViews_count)
        var w_CollectionCount = parseInt(data.w_CollectionCount)
        if(phonenumber !== phone){
            if(w_favor !== 'null'){
                w_favoritecount += 1
            }else if(w_Collection !== 'null') {
                w_CollectionCount += 1
            }else if(star !== "null"){
                woks_star += 1
            }
            wViews_count += 1
        }
        supdatauwv({
            data: [w_favoritecount,w_CollectionCount,wViews_count,woks_star]
        }).then((data)=>{
            res.json({
                status: 0,
                message: data
            })
        }).catch((err)=>{
            res.json({
                status: -1,
                message: '数据操作错误' + err
            })
        })
    }).catch((err)=>{
        res.json({
            status: 0,
            message: err
        })
    })
}

function sgetwoks(req,res){
    gettoclass().then((data)=>{
        res.json({
            status: 0,
            worksList: data
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: err
        })
    })
}

module.exports = {
    addworks,
    updatauwfav,
    sgetwoks
}