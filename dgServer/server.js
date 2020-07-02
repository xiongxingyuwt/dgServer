const express = require('express');
const { RouterView } = require('./public');
const bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

// 跨域操作
app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*")
    next()
})
// 使用静态服务器
app.use(express.static("./uploads"));

// 解析application/json 
app.use(bodyParser.json());

// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 开启cookie
app.use(cookieParser())
// 配置session
app.use(session({
    secret: 'zxcvbnm', // 设置签名秘钥
    cookie: { maxAge: 60 * 60 * 60 * 1000 }, // 设置cookie超期时间
    resave: true, // 强制保存 如果session 没有被改变也要保存
    saveUninitialized: false
}))

app.post('/upload', RouterView.uploadConfig('images/', 20, ['image/jpeg', 'image/jpg']), RouterView.upload)
// 用户操作接口 
app.post('/login', RouterView.loginx) // 登录接口
app.post('/regist', RouterView.userregister) // 注册接口
app.get('/getuser', RouterView.getuserimfo) // 获取用户全部数据
app.post('/frontupuser', RouterView.xfrontupuser) // 用户数据完善接口
app.post('/backstoreupuser', RouterView.xbackstoreupuser) // 管理员管理用户接口
app.get('/getsessioninfo',RouterView.getsessioninfo)
app.get('/fixstatus',RouterView.updatestatus)
// 管理员操作接口
app.get('/getadmin', RouterView.getAdmininfo) // 获取管理员信息
app.post('/addAdmin', RouterView.xaddAdmin) // 添加管理员接口
app.post('/updateAdmin', RouterView.dupdateAdmin) // 管理员数据更新接口
app.post('/deleteAdmin', RouterView.xdeleteAdmin) // 删除管理员
app.post('/adminlogin', RouterView.xadminlogin) // 管理员登录接口
app.post('/changestatus',RouterView.changadstatus) // 修改管理员状态
app.get('/search', RouterView.xsearch) // 条件查询管理员
app.get('/admisession', RouterView.admisession) // 获取session的管理员
// 商品操作接口
app.get('/getgoods', RouterView.getgoods) // 获取商品列表
app.post('/addgoods', RouterView.addgoods) // 商品添加
app.post('/updategoods', RouterView.updategoods) // 商品更新
app.get('/deletegoods', RouterView.deletegoods) // 商品删除
app.get('/getgoodscomtianer', RouterView.sgetgoodscomtianer) // 商品详情
// 作品操作接口
app.post('/addworks', RouterView.addworks) // 作品上传
app.get('/updatauwfav', RouterView.updatauwfav) // 更新用户作品的关注数 浏览量 收藏量 
app.get('/getworks', RouterView.sgetwoks) // 获取作品和图片
app.listen(3000)