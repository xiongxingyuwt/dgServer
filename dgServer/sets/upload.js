const multer = require('multer')
const path = require('path')
const fs = require('fs')

// 定制文件名和文件路径
function uploadConfig (folder, mb, suffix){
    // folder: 上传文件的具体分类
    // mb: 上传文件的大小
    // suffix 上传文件的类型控制 
    const newPath = path.resolve(__dirname, '../uploads/' + folder)
    return multer({
        storage: multer.diskStorage({
            // 文件存储位置
            destination: (req, file, cb) => {
                fs.mkdir(newPath, { recursive: true }, (err) => {
                    if (err){
                        console.log('目录创建失败')
                    }
                })
                cb(null, newPath)
            },
            // 文件名
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + "_" + file.originalname)
            }
        }),
        // 文件大小限制 单位为bytes
        limits: {
            fileSize: 1024 * 1024 * mb
        },
        fileFilter: (req, file, cb) => {
            // 文件类型
            if (suffix.indexOf(file.mimetype !== -1)){
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }).array("file", 20);
}

function upload (req, res){
    for(var i = 0; i < req.files.length; i++){
        try {
            res.json({
                status: 200,
                imgurl: 'http://192.168.85.248:3000/images/' + req.files[i].filename
            })
        } catch (err){
            console.log(err)
        }
    }
}

module.exports = {
    upload,
    uploadConfig
}