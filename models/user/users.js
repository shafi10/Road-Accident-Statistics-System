const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpiration:Date
})

module.exports = mongoose.model('Users', userSchema);