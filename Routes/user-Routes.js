// var express=require("express")

// var{register,login}=require("../Controllers/user-Controllers")
// var router=express.Router()


// router.post("/register",register)

// router.get("/login",login)

// module.exports=router




const express = require("express");
const router = express.Router();
const { register, login } = require("../Controllers/user-Controllers");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
