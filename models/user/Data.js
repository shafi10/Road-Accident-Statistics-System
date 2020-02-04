const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    roadname:{
        type:String,
        required:true
    },
    noaccident:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    busname:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    date:{
       type:Date,
       default:Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
})

const Data = mongoose.model('Data', dataSchema);

module.exports=Data;