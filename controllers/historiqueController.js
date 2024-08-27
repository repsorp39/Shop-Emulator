const Historique = require('../models/Historique');
const Cart = require("../models/Cart");

const getHistorique = async (req,res,next) =>{

    try{
        const userHisto = await Historique.find({userId:req.userInfo.userId})
                                          .sort({createdAt:-1});
        const user = {...req.userInfo}
        res.render('histo' , {user,userHisto})
    }catch(err){
        console.log(err);
        next(err);
    }
}

const deleteHistory = async(req ,res,next) =>{
  
    try{
        await Historique.deleteOne({_id:req.params.id});
        res.redirect('/histo');
    }catch(err){
        console.log(err);
        res.redirect('/');
        next(err);
    }
}

const getCartInfo = async  (req,res,next) =>{
 
    try{
        if(!req?.params?.id) return res.sendStatus(400);
     const {products} = await Cart.findOne({_id:req.params.id});
    if (!products)  res.sendStatus(404);
     else res.json(products);
    }catch(err){
        res.sendStatus(500);
        console.error(err);
        next(err);
    }

}
module.exports = {getHistorique , deleteHistory ,getCartInfo};