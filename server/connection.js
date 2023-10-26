const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path : './config.env'})
/* const mongoURI = "mongodb://127.0.0.1:27017/erpbackend";

const  connectToMongo = async()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("Connected to mongodb")
    }catch(err){
        console.log("error while connecting to mongo")
    }
} */
//module.exports = connectToMongo; 

const DB = process.env.DATABASE;
mongoose.connect(DB.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(()=>{
    console.log('Connection successfull');
}).catch((err)=>{
    console.log(err);
    console.log("problem while establishing the connection")
});
