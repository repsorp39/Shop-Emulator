const { getAllProduct } = require("./productController");

const homeAccessControl = async (req , res) =>{

     const  user = {...req.userInfo} ;
     const products =  await getAllProduct();
     const queryInfo = {};//case some research is made
     res.render('index' , {user , products , queryInfo});

 }

 const registerRouteAccess = (req , res) =>{
    const  user = {location:"/signup"};
     if(!req.userInfo?.pseudo) res.render('signup' , {user}) 
      else res.redirect('/');
 };

 const loginRouteAccess = (req , res) =>{
    const  user = {location:"/login"};
     if(!req.userInfo?.pseudo) res.render('login' , {user});
     else res.redirect('/');//on le redirige vers l'accueil si il a une session en cours
 }

 module.exports = {homeAccessControl,registerRouteAccess,loginRouteAccess};