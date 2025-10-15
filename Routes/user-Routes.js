
 var express = require("express")

 var { register, login } = require("../Controllers/user-Controllers")

 var router = express.Router()

 router.post("/register", register)

 router.post("/login", login) 

 router.get("/home", (req, res) => {
     res.send("Welcome to the Home Page");

 router.get("/admin", (req, res) => {
  res.send("Welcome to the admin page!");
});

 });

 router.get("/register", (req, res) => {
     res.send("Use POST method to register a user")
 })

 module.exports = router



