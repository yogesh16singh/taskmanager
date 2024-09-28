const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any())
app.use(cors())

// app.use("/",(req,res)=> res.status(200).send("Server is running"))
app.listen(3001,(err)=>{
    if(err){
        console.log('Error while running')
        return
    }
    console.log('Server is listening on port 3001')
})

module.exports = {
    app
}