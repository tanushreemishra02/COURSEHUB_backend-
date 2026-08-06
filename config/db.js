const  mongoose  = require("mongoose");
const dotenv=require('dotenv').config();
 async function connection(){
    try{
       await  mongoose.connect(process.env.MONGODBURL)
       console.log('db is connected')
    }
    catch(error){
      if(error)  throw error;
    }
    
}
module.exports = connection;
