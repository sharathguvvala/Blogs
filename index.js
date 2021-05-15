const express = require('express')

const port = process.env.PORT || 8000
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.urlencoded())

//routes
app.get('/', function(req,res){
    res.render('blogs.ejs')
})
app.get('/add', function(req,res){
    res.render('add.ejs')
})



//running server
app.listen(port, function(err){
    if(err){
        console.log('error in setting up the server')
    }
    console.log('server is up and running on port:', port)
})