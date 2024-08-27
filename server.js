const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const errorHandler = require("./config/errorHandler");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;

//connect to db
dbConnect();

//to log incoming request
app.use(morgan('dev'));

//handle cookie data
app.use(cookieParser());

//setting view engine
app.set("view engine" , "ejs");

//set view engine folder
app.set("views" , "views");

//to handle json data
app.use(express.json());

//to handle url-encoded-form
app.use(express.urlencoded({extended:false}));

//to serve statics file
app.use(express.static(path.join(__dirname , "public")));
app.use("/media" , express.static(path.join(__dirname , 'public' ,'data')));

//to serve view file
app.use("/" , require("./routes/viewRoute"));


app.all("*" , (req,res)=> res.render('404'));

//to handle error
app.use(errorHandler);

//to make db is connect before app launching
mongoose.connection.once('open' , () =>{
    console.log("MongoDB now connect..");
    app.listen(port , console.log(`Server running on port ${port}...`));
})
