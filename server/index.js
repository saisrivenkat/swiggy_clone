const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const db = require('./db')
db();

app.use(express.json())
app.use(cors())
app.use('/user',require('./routes/user'))
app.listen(port,()=>{
    console.log("listening")
})




