import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
  
const userSchema = new Schema({
  username : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true   //searching easier ke liye
  },
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname : {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String, // cloudinary url jo third party hai aur images store kar sakte hai
    required: true
  },
  coverImage: {
    type: String
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  password: {
    type: String,
    required: [true, "Password is required"] 
  },
  refreshToken : {
    type: String
  }
},{timestamps:true})

userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password)
}
//modern practise isliye 2 token, only expire is different.refresh token is longer. jab tak access token hai tab tak authenticated hon. agar refresh token hai toh har baar password nahi dalna aur agar woh aur database same hai toh new access token miljata hai.

userSchema.methods.generateAccessToken = function (){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function (){
  return jwt.sign(
    {
      _id: this._id,
     
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

//jwt bearer token hai, jo usko bear karta hai usse sahi maan lete hai. 

export const User = new mongoose.model("User",userSchema)  
// mongodb mei users se save hoga