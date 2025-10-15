
var express = require("express");
var router = express.Router();

var authMiddleware = require("../Middleware/auth-Middleware");
var adminMiddleware = require("../Middleware/admin-Middleware");

router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.send("Welcome to the admin page");
});

module.exports = router;
