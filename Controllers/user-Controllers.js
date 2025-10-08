//  var user=require("../Model/user")
// var byCrpt = require("bcrypt")
// var webToken = require("jsonwebtoken")

// var register = async(req,res)=>{
//     try{
        
//         var {userName,email,password,role} = req.body 
        
//         var userExists = await user.findOne({$or : [{userName},{email}]})
//         if(userExists){
//             return res.status(400).json({message : "user exists"})
//         }

//         var salt = await byCrpt.genSalt(10)
//         var hashPassword = await byCrpt.hash(password,salt)
        
//         var myUser = await user.create({
//             userName:"chandini",
//             email:"chandu@gmail.com" ,
//             password  : hashPassword,
//             role 
//         })
       
//         if(myUser){
//          return res.status(201).json({message : "created a new user"})

//         }else{
//             return res.status(400).json({message : "cannot create"})
//         }

//     }catch(error){
//         console.log("error",error);
//     }
// }
// var login = async(req,res)=>{
//     try{
    
//         var {userName,password} = req.body
//         var userThere = await user.findOne({userName})
//         if(!userThere){
//             res.status(400).json({message : "invalid user name or password"})
//         }

//         var isPassword = await byCrpt.compare(password,userThere.password)
//         console.log(isPassword);
//         if(!isPassword){
//             res.status(400).json({message : "invalid user name or password"})
//         }
    

//         var ganearteToeken = webToken.sign({
//             userId : userThere._id,
//             userName : userThere.userName,
//             role : userThere.role


//         },process.env.JSON_WEB_TOKEN,{expiresIn : "10m"})
//         res.status(200).json({message : "login sucess",token : ganearteToeken,sucess : true})




//     }catch(error){
//         console.log("error",error);
//     }


// }

// module.exports = {
//     register,login
// }




const User = require("../Model/user"); // Make sure this is correct path
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------- REGISTER --------------------
const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGIN --------------------
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by userName
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: existingUser._id,
        userName: existingUser.userName,
        role: existingUser.role,
      },
      process.env.JSON_WEB_TOKEN, // Make sure this is defined in your .env
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- EXPORT --------------------
module.exports = {
  register,
  login,
};
