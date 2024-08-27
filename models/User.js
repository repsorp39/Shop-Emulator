const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
        pseudo:{type:String , required:true ,unique:true},
        password:{type:String , required:true},
        refreshToken:{type:String},
        role:{type:Number, default:2020}
    }, 
    {
        timestamps:true
    }
);
userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User'  , userSchema);

