// // require("dotenv").config()
// // var express=require("express")

// // var connectToDatabase=require("./Database/db")
// // var userRoute=require("./Routes/user-Routes")

// // var app=express()



// // connectToDatabase()

// // app.use(express.json())

// // app.use("api/auth",userRoute)

// // var PORT=process.env.PORT || 3000

// // app.listen(PORT,()=>{
// //     console.log("the server is running");
// // })











// require("dotenv").config();
// const express = require("express");

// const connectToDatabase = require("./Database/db");
// const userRoute = require("./Routes/user-Routes");

// const app = express();

// connectToDatabase();

// app.use(express.json());


// app.use("/api/auth", userRoute);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`The server is running on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./Database/db");
const userRoutes = require("./Routes/user-Routes");

const app = express();
connectToDatabase();

app.use(express.json());
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
