const mongoose = require("mongoose");;

const productSchema = mongoose.Schema(
    {
        name :{type:String, required:true},
        categorie:{type:String, required:true , default:"others"},
        price:{type:Number, required:true},
        src:{type:String, required:true},
        description:{type:String, required:true},
    }
);

module.exports = mongoose.model('Product' , productSchema);