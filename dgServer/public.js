const upload = require("./sets/upload")
const getadmin = require('./sets/dealadmin')
const getgoods = require('./sets/delgoods')
const worksdeal = require('./sets/worksdeal')
const userdeal = require('./sets/userdeal.js')

const RouterView = Object.assign({}, worksdeal, getgoods, upload, userdeal,getadmin)
module.exports = {
    RouterView
}