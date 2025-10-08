var express=require("express")

var{register,login}=require("../Controllers/user-Controllers")
var router=express.Router()


router.post("/register",register)

router.get("/login",login)

module.exports=router