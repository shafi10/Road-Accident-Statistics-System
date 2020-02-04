const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    }
});

const Admin = model('Admin', adminSchema);
 module.exports = Admin;