require("dotenv").config()
var express=require("express")

var connectToDatabase=require("./Database/db")
var userRoute=require("./Routes/user-Routes")

var app=express()



connectToDatabase()



app.use(express.json())

app.use("api/auth",userRoute)

var PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("the server is running");
})











