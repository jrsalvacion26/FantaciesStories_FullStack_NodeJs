//const { query } = require('express')
require('dotenv').config()
const mysql = require('mysql')

const config = {
    host:process.env.DB_HOST,
    user:process.env.DB_ROOT,
    pass:process.env.DB_PASS,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
}

const connection = mysql.createPool(config)

module.exports = (query) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, sql) => {
            if(err){
                
                reject(err)
            }else{
                connection.query(query,(err,results) => {
                    if(err){
                        
                    }else{
                        
                        resolve(results)
                    }
                    sql.release()
                })
            }
        })
    })
}