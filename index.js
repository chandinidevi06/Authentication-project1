

const express = require("express");
require("dotenv").config();

const connectToDatabase = require("./Database/db");
const userRoute = require("./Routes/user-Routes");

const app = express();

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running");
});
