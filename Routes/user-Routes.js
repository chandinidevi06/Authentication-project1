var express=require("express")

var{register,login}=require("../Controllers/user-Controllers")
var router=express.Router()


router.get("/register",register)

router.get("/login",login)

module.exports=router


router.get("/register", (req, res) => {
  res.send("Use POST method to register a user.");
});





