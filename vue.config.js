const { resolve } = require('path')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: (config)=>{
        config.resolve.alias.set('ax',resolve(__dirname,'src/axios'))
    }
}