
const express=require("express");
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const userRouter =require('./userRouter')
const cors=require("cors")
const morgan=require('morgan');
const app=express()


dotenv.config()


app.use(express.json());
app.use(morgan('dev'))


app.use(cors())


//Setup Router
app.use("/api",userRouter); 


const PORT =5000;

app.listen(PORT,console.log(`App Listening ${PORT}`))

//Db Conect
mongoose.connect('mongodb://localhost:27017/mydb', (err)=>{
    if(err) return console.log(err);
    console.log("Conected Sucessfully MongoDB")
})




