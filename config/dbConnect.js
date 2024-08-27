const mongoose = require("mongoose");

const dbConnect = async() => {

        await mongoose.connect( process.env.DB_URI  )
};

module.exports =dbConnect;