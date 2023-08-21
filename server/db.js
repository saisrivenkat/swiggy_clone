const mongoose = require('mongoose');
require('dotenv').config()
const dbConnect=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://srisai:${process.env.DB_PASSWORD}@cluster0.t0wifnm.mongodb.net/?retryWrites=true&w=majority`);
        console.log("connected")
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports=dbConnect;