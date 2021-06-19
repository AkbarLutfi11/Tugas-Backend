const { rows } = require("mssql")
const sql = require('mysql')

const conn = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'sayang'
})

module.exports = function (req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    conn.query("SELECT COUNT(*) as jmlh_user FROM user WHERE Username=? AND Pass=?",[username,password],function(err,rows){
        var jumlah = Object.values(rows)
        
        if(jumlah[0].jmlh_user > 0){
            next()
            // console.log("masuk auth")
        }
        else{
            res.send(401)
        }
        
    })
}