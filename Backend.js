const express = require('express')
var cors = require('cors')
const sql = require('mysql')
const app = express()
const bodyPanser = require('body-parser')


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

app.get('/Pacar', function(req, res){

    C.query('SELECT * FROM data_sayang', (err, result, fields)=>{

        if(!err){
            res.send(result)
        }

        else{
            console.log(err)
        }
        
    })
})

app.post('/Pacar', function(req, res){
    
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
            // res.end(rows)
        }
        else
        console.log(err);
    })
})

app.listen(3000)

