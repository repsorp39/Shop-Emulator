const mongoose = require('mongoose');

const histoSchema = mongoose.Schema({
    userId:{type:String ,required:true },
    cartId:{type:String ,required:true },
    cost:Number,
    status:{type:String , enum:['validate', 'waiting'] ,default:'waiting'},
    createdAt:{type:Date ,default:Date.now }
})

module.exports  = mongoose.model('Historique' , histoSchema);