const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyJWT =  (req ,res ,next) =>{

    const accessToken = req.cookies?.token;
    if(!accessToken)   return res.redirect("/login");

    jwt.verify(
        accessToken ,
        process.env.ACCESS_TOKEN_SECRET ,
        async (err,decoded) =>{
            if(err)   return res.redirect("/login");
            const info = await User.findOne(
                {_id:decoded.userId}
                 ,{role:1 , pseudo:1 ,_id:1}//filter 
                );

                req.userInfo = {
                    userId:info._id.toString(),
                    pseudo:info.pseudo,
                    isAdmin:info.role === 2024
                };
            next();
        }
    )
};

module.exports = verifyJWT;