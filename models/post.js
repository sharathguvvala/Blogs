const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const blogschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    date:{
        type: Date, 
        default: Date.now
    }
})

const Blog = mongoose.model('Blog', blogschema)
module.exports = Blog