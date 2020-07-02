const { saddolder,mgetgoods, saddgoods, supdategoods,sdeletegoods,getgoodscomtianer } = require('../Controller/getDatas/goodsdeal')
function getgoods(req,res){
    mgetgoods().then((data)=>{
        res.json({
            goods: data,
            status: 0
        })
    }).catch((err)=>{
        res.json({
        status: -1,
        message: '获取数据失败' + err
        })
    })
}
// 添加商品 fimgurl,fname,foriginPrice,fnowprice,originadrr
function addgoods(req,res){
    const fimgurl = req.body.fimgurl
    const fname = req.body.fname;
    const foriginPrice = req.body.foriginPrice;
    const fnowprice = req.body.fnowprice;
    const originadrr = req.body.originadrr;
    saddgoods({
        data: [fimgurl,fname,foriginPrice,fnowprice,originadrr]
    }).then((data)=>{
        res.json({
            goodsId: data.insertId,
            status: 0
        })
    }).catch((err)=>{
        res.json({
        status: -1,
        message: '获取数据失败' + err
        })
    })
}

function updategoods(req,res){
    console.log(req.body)
    console.log("商品更新id="+req.body.fid)
    const fid = req.body.fid
    const fimgurl = req.body.fimgurl
    const fname = req.body.fname;
    const foriginPrice = req.body.foriginPrice;
    const fnowprice = req.body.fnowprice;
    const originadrr = req.body.originadrr;
    if(fid === 'null'){
        return false
    }
    supdategoods({
        data: [fimgurl,fname,foriginPrice,fnowprice,originadrr,fid]
    }).then((data)=>{
        console.log(data)
        res.json({
            status: 0,
            message: '商品id为：' + fid + '更新成功'
        })
    }).catch((err)=>{
        res.json({
            status: -1,
            message: '更新失败'
        })
    })
}

function deletegoods(req,res){
    const fid = req.query.fid
    console.log(fid)
    console.log('删除商品id='+fid)
    if(fid !== 'null'){
        sdeletegoods(fid).then(()=>{
            res.json({
                status: 0,
                message: '商品id为：' + fid + '删除成功'
            })
        }).catch(()=>{
            res.json({
                status: -1,
                message: '删除失败,请输入商品id'
            })
        })
    }
}

// 获取商品信息并响应
function sgetgoodscomtianer(req,res){
    getgoodscomtianer({
        data: req.query.id
    }).then((data)=>{
        res.json({
            goods: data,
            status: 0
        })
    }).catch((err)=>{
        res.json({
        status: -1,
        message: '获取数据失败' + err
        })
    })
}

// 商品订单添加接口
function addolder(req,res){
    const goodsid = req.body.id
    const olderacount = new Date().getTime()
    const createTime = new Date()
    const userphone = req.session.userphone
    const oldergoodsname = req.body.oldergoodsname
    const count = req.body.count
    const everprice = req.body.everprice
    const allprice = parseInt(count)*parseFloat(everprice)
    saddolder({
        data: [olderacount,createTime,userphone,oldergoodsname,goodsid,count,everprice,allprice]
    }).then((data)=>{
        res.json({
            goods: data,
            status: 0
        })
    }).catch((err)=>{
        res.json({
        status: -1,
        message: '获取数据失败' + err
        })
    })
}
module.exports = {
    getgoods,
    addgoods,
    updategoods,
    deletegoods,
    sgetgoodscomtianer,
    addolder
}