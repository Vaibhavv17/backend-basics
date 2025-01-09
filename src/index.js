// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
  path:"./env"
})



connectDB()




/*
import express from "express"
const app = express()
//database se jab bhi baat karenge try catch use karo or promises
//database is always in another continent, toh time lagta hai so async await

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("err",error);
      throw error
    })

    app.listen(process.env. PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
      
    })
  } catch (error) {
    console.error("error",error);
    throw err
  }
})() //fn hai isko immediately execute kardo
 */
