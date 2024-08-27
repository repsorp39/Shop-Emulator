const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleRegister = async(req, res, next) =>{

    const {pseudo , password} = req.body;
    if(!pseudo || !password) return res.status(400).json({message:"Pseudo and password required"});

    try{
        const hashedPassword = await bcrypt.hash(password , 7);
        await User.create({pseudo , password:hashedPassword});
        res.status(201).json({message:"New user saved!"})
    }catch(err){
        if(err.name === 'ValidationError'){
            return res.status(409).json({message:err.message});
        }
        console.log(err);
        res.status(500).json({message:"Something broke!"});
        next(err);

    }

}
module.exports = handleRegister;