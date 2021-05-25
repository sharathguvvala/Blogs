const express = require('express')
const path =require('path')
const mongoose = require('mongoose')

const Blog = require('./models/post')

const port = process.env.PORT || 8000
const app = express()

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded())
app.use('/assets', express.static('assets'))

//mongodb setup
mongoose.connect('mongodb+srv://blogs:blogs@cluster0.06qlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to db'));
db.once('open',function(){
    console.log('Successfully connected to the database')
})

//routes
app.get('/', function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error in fecting blogs from db")
            return
        }
        else{
            //console.log(blogs)
            //console.log(blogs[0].image)
            return res.render('blogs.ejs', {blogs: blogs})
        }
    })
})

app.get('/add', function(req,res){
    res.render('add.ejs')
})

//creating new post
app.post('/add', function(req,res){
    Blog.create({
        title:req.body.title,
        image:req.body.image,
        text:req.body.text
    },function(err,newpost){
        if(err){
            console.log('error in creating a new post')
            return
        }
        return res.redirect('/')
    })
})

//read a blog
app.get("/show/:id", function(req, res){
    Blog.findById(req.params.id, function(err, readblog){
        if(err){
            res.redirect("/");
        } else {
            res.render("read", {blog: readblog});
        }
    })
})

//delete a blog
app.get("/delete/:id", function(req, res){
    //console.log(req.params.id)
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})

//running server
app.listen(port, function(err){
    if(err){
        console.log('error in setting up the server')
    }
    console.log('server is up and running on port:', port)
})