 var user=require("../Model/user")
var byCrpt = require("bcrypt")
var webToken = require("jsonwebtoken")

var register = async(req,res)=>{
    try{
        
        var {userName,email,password,role} = req.body 
        
        var userExists = await user.findOne({$or : [{userName},{email}]})
        if(userExists){
            return res.status(400).json({message : "user exists"})
        }

        var salt = await byCrpt.genSalt(10)
        var hashPassword = await byCrpt.hash(password,salt)
        
        var myUser = await user.create({
            userName:"chandini",
            email:"chandu@gmail.com" ,
            password  : hashPassword,
            role 
        })
       
        if(myUser){
         return res.status(201).json({message : "created a new user"})

        }else{
            return res.status(400).json({message : "cannot create"})
        }

    }catch(error){
        console.log("error",error);
    }
}
var login = async(req,res)=>{
    try{
        // collect the user information
        var {userName,password} = req.body
        var userThere = await user.findOne({userName})
        if(!userThere){
            res.status(400).json({message : "invalid user name or password"})
        }

        var isPassword = await byCrpt.compare(password,userThere.password)
        console.log(isPassword);
        if(!isPassword){
            res.status(400).json({message : "invalid user name or password"})
        }
        // generate a json web token

        var ganearteToeken = webToken.sign({
            userId : userThere._id,
            userName : userThere.userName,
            role : userThere.role


        },process.env.JSON_WEB_TOKEN,{expiresIn : "10m"})
        res.status(200).json({message : "login sucess",token : ganearteToeken,sucess : true})




    }catch(error){
        console.log("error",error);
    }


}

module.exports = {
    register,login
}


