const User = require("../models/User");

const getAllUser = async  (req , res) =>{
    const user = {...req.userInfo}//online users info for headers
    const registeredUsers = await User.find(
        {_id:{$not:{$eq:req.userInfo.userId}//should exclude admin in list he can delete
    }} ,{_id:1 , pseudo:1 });//filter size
    res.render("manage-user" , {user , registeredUsers});
}

const deleteUser = async (req ,res) =>{
    await User.deleteOne({_id:req.params.id});
    res.redirect("/manage-user");
   }
module.exports = {getAllUser ,deleteUser};