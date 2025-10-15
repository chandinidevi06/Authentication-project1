
var express = require("express");
require("dotenv").config();

var connectToDatabase = require("./Database/db");
var userRoutes = require("./Routes/user-Routes");
var homeRoutes = require("./Routes/home-Routes");

var app = express();

connectToDatabase()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/auth", userRoutes);
    app.use("/api/home", homeRoutes);

    var PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Unable to start server due to DB connection error:", err);
  });

