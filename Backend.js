const express = require('express')
var cors = require('cors')
// const sql = require('mysql')
const app = express()
const bodyPanser = require('body-parser')
var middle = require('./Middleware/jumlah.js')


app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


const DataBase = require('mysql')
const C = DataBase.createConnection({

    host : 'localhost', user: 'root', port: '3306', database: 'sayang'

})

C.connect(function(err){

    if(!err){
        console.log('Berhasil terhubung')
    }

    else{
        console.log('Gagal Terhubung')
    }

})

app.get('/', function(req, res){

    res.send(
        `<html>

        <h1> Tugas Tahap 01 </h1>
        <h2> Backend </h2>

        <form action = "/Pacar" method = "POST">

            <p> Panggilan Sayang </p>

            <input Name = "Nama_Sayang">



            <button>Simpan</button>

        </form>


        </html>`
    )

})

app.get('/Pacar',middle, function(req, res){

    C.query('SELECT * FROM data_sayang', (err, result, fields)=>{

        if(!err){
            res.send(result)
        }

        else{
            console.log(err)
        }
        
    })
})

app.post('/Pacar',middle, function(req, res){
    
    var Arsir_Panggilan = req.body.Nama_Sayang
    var Q = "INSERT INTO data_sayang (Nama_Sayang) values ('"+ Arsir_Panggilan +"')"

    C.query(Q,Arsir_Panggilan, function(err, Data){
        if(err){
            throw err;
        }   
    })

    res.end()
    
})

app.delete('/Pacar/:ID_Sayang',(req,res)=>{
    C.query("DELETE from data_sayang WHERE ID_Sayang = '"+req.params.ID_Sayang+"'",(err,rows,fields)=>{
        if(!err){
        }
        else
        console.log(err);
    })
})

app.post('/User',(req,res,next)=>{
    C.query('SELECT COUNT(*) as jumlah_data FROM user',(err,result)=>{
        var jumlah = Object.values(result)
        if(jumlah[0].jumlah_data > 0){
            middle(req,res,next)
        }
        else{
            next()
        }
    })
},
(req,res)=>{
    var dataUsername = req.body.username
    var dataPassword = req.body.password

    C.query("INSERT into user(Username,Pass) VALUES (?,?)",[dataUsername,dataPassword],function(err){
        if(err){
            throw err
            
        }else{
            C.query("SELECT ID_User,Username FROM user ORDER BY ID_User DESC LIMIT 1",(err,rows,field)=>{
                res.send(rows)
            })
        }
})

})
app.get('/User', middle,(req,res)=>{
    C.query("SELECT ID_User,Username from user",(err,rows,field)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err);
        }
    })
})

app.delete('/User/:ID_User',middle,(req,res)=>{
    C.query("DELETE from user WHERE ID_User = '"+req.params.ID_User+"'",(err,rows,field)=>{
        if(!err){
        res.send(rows)
    }
    else
    console.log(err);
    })
})

app.listen(3000)

