const mysql = require('mysql')
const pool = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'koademo'
})
let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = { query }
