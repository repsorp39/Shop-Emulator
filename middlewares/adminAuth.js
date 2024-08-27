const adminAuth =  (req ,res ,next) =>{

    const isAdmin = req?.userInfo?.isAdmin;
    if(isAdmin)next();
    else return res.redirect("/");
};

module.exports = adminAuth;