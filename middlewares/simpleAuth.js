const jwt = require("jsonwebtoken");
const User = require("../models/User");

//this middleware is used for route which can be accessed both verified or not
const basicAuth = async (req ,res ,next) =>{

    const accessToken = req.cookies?.token;

    if(!accessToken)  {
        req.userInfo = {};
        next();
        return;
    }

    jwt.verify(
        accessToken ,
        process.env.ACCESS_TOKEN_SECRET ,
        async (err,decoded) =>{
            if(err) {
                req.userInfo = {};
                next();
                return;
            };
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

module.exports = basicAuth;