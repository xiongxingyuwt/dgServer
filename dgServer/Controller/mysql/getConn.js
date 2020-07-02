const mysql = require('mysql')
const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123123',
  database: 'douguo',
  connectionLimit: 20
}

const pool = mysql.createPool(config)

function getConn (options) {
  return new Promise((resolve, reject) => {
      pool.getConnection((error, connection)=>{
          if(!error) {
             connection.query(options.sql, options.data, (err, result)=>{
                 if(!err){
                     resolve(result)
                 }else{
                     reject(err.sqlMessage)
                 }
             })
             connection.release()
          }else{
            error.release()
          }
      })
  })
}

module.exports = getConn
