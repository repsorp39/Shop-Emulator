const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async(req ,res,next) =>{

    const {pseudo , password} = req.body;
    if(!pseudo || !password) return res.status(400).json({message:"Pseudo and password required"});

    try{
        const foundUser = await User.findOne({pseudo}) ;
        if(!foundUser) return res.status(404).json({message:"Pseudo or password incorrect"});

        const passMatched = await bcrypt.compare(password ,foundUser.password);
        if(!passMatched) return res.status(404).json({message:"Pseudo or password incorrect"});

        //creation des token
        const accessToken =  jwt.sign(
           {userId: foundUser._id} ,
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn:'24h'}
        );
     
         res.cookie('token',accessToken, {
            httpOnly:true,maxAge:24 * 60 * 60 * 1000,sameSite:'None',secure:true
        });
         res.redirect(301 , "/index");
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something broke!"});
        next(err);
    }

}

module.exports = handleLogin;