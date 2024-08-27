const handleLogout = (req , res)=>{

    res.clearCookie('token', { httpOnly:true ,sameSite:'None',secure:true });
    res.redirect("/");
}

module.exports = handleLogout;