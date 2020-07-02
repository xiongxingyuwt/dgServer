const query = require('../mysql/getConn')
const act = require('./public')

function saddworks(options){
    return new Promise((resolve,reject)=>{
        query({
            sql: 'insert into works_tab(phonenumber,works_title,works_decoration,creatTime) values(?,?,?,?)',
            data: options.data1
        }).then((resdat)=>{
            console.log('data1操作成功')
            resolve(resdat.works_title)
            const worksId = resdat.insertId;
            const data2 = act(options.data2,worksId)
            const data3 = act(options.data3,worksId)
            query({
                sql: 'insert into wkimg_tab(wimgUrl,works_Id) values(' + data2.slot + ')',
                data: data2.options
            }).then((data)=>{
                console.log('data2操作成功')
                resolve(data.works_Id)
                query({
                    sql: 'insert into food_tab(foodname,foodimg,food_count,works_Id) values(' + data3.slot + ')',
                    data: data3.options
                }).then((data)=>{
                    console.log('data3操作成功')
                    resolve(data)
                }).catch((err)=>{
                    console.log('data3操作失败')
                    reject(err)
                })
                
            }).catch((err)=>{
                console.log('data2操作失败')
                reject(err)
            })

        }).catch((err)=>{
            console.log('data1操作失败')
            reject(err)
        })
    })
}
// 作品点赞数, 收藏数， 关注数接口
function supdatauwv(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: 'update works_tab set w_favoritecount=?,w_CollectionCount=?,wViews_count=?,woks_star=? where phonenumber = ?',
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 获取作品点赞数, 收藏数， 关注数接口
function ssgetuwv(options){
    return new Promise((resolve, reject)=>{
        query({
            sql: 'select w_favoritecount,w_CollectionCount,wViews_count,woks_star from works_tab where phonenumber = ?',
            data: options.data
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}

// 通过分类获取数据
function gettoclass(){
    return new Promise((resolve, reject)=>{
        query({
            sql: 'SELECT user_tab.phonenumber,user_tab.username,user_tab.userphoto, works_tab.works_title,wkimg_tab.wimgUrl,works_tab.works_class,works_tab.works_type,works_tab.works_status from user_tab CROSS JOIN works_tab CROSS JOIN wkimg_tab where works_tab.works_Id = wkimg_tab.works_Id and user_tab.phonenumber = works_tab.phonenumber'
        }).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    });
}
module.exports = {
    saddworks,
    supdatauwv,
    ssgetuwv,
    gettoclass
}