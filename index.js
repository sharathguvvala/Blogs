const express = require('express')

const port = process.env.PORT || 8000
const app = express()


//routes
app.get('/', function(req,res){
    res.send('home page')
})



//running server
app.listen(port, function(err){
    if(err){
        console.log('error in setting up the server')
    }
    console.log('server is up and running on port:', port)
})