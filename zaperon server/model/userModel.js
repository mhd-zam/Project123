const mongoose = require('mongoose')

const user = mongoose.Schema({
    Email:String,
    Password: String,
    accessToken:String
})

module.exports=mongoose.model('user',user)