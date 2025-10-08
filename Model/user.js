var mongoose=require("mongoose")
const { GiRobotLeg } = require("react-icons/gi")

var userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

module.exports=mongoose.model("users",userSchema)