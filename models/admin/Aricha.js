const {Schema, model} = require('mongoose');

const arichaSchema = new Schema({
    monthAccident:{
        type:Number,
        default:0,
        require:true
    },
    month:{
        type:String,
        require:true
    },
    busAccident:{
        type:Number,
        default:0,
        require:true
    },
    busName:{
        type:String,
        require:true
    },
    locationAccident:{
        type:Number,
        default:0,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    lat:{
        type:String,
        required:true
    },
    lng:{
        type:String,
        required:true
    }
})

const Aricha = model('Aricha', arichaSchema);
module.exports=Aricha;