const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const readXlsxFile = require('read-excel-file/node')
const path = require('path');
const app = express();
app.use(bodyParser.json())
app.use(cors())
const PORT = process.env.PORT || 3002

app.get("/",(req,res)=>{
    res.send("welcome to cost realty backend")
})

app.post('/',(req,res)=>{
    readXlsxFile('./Master Cost Sheet - Platinum Capital KP.xlsx',{sheet:req.body.sheet}).then((rows) => {
        // `rows` is an array of rows
        res.send(rows)
        // each row being an array of cells.
      })
})
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  
    })
  }
app.listen(PORT,()=>{
    console.log("server started on 3002")
})
