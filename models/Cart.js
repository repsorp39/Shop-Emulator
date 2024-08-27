const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
        userId:{type:String , required:true},
        products:[{
            productId:{type:String, required:true},
            numberBought:{type:String , required:true},
        }],
        status:{
            type:String,
            required:true, 
            enum:['waiting','validate'] , 
            default:'waiting'
            }
    }
    ,
    {
        timestamps:true
    })

module.exports  = mongoose.model('Cart' , cartSchema);