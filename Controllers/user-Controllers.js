var user=require("../model/user")

var bcrypt=require("bcrypt")

//register controller

var register=async(req,res)=>{
    try{
        var {userName,email,password,role}=req.body

        var userExists=await user.findOne({$ :[{userName},{email}]})
        if(userExists){
            return res.status(400).json({message:"user exists"})
        }
        var salt=await bcrypt.genSalt(10)
        var hashPassword=await bcrypt.hash(password,salt)
        var myUser=await user.create({
            userName,
            email,
            password:hashPassword,
            role
        })

        if(myUser){
            return res.status(201).json({message:"created a new user"})
        }else{
           return res.status(400).json({message:"cannot create"})
        }


    }catch(error){
        console.log("error",error);

    }
}

var login=async(req,res)=>{
    try{
        var{userName,password}=req.body
        var userThere=await user.findOne({userName})
        if(!userThere){
            return res.status(400).json({message:"invalid username and password"})
        }

        var ispassword=await bcrypt.compare(password,userThere.password)
        if(!ispassword){
            return res.status(400).json({"message":"invalid username and password"})
        }


    }catch(error){
        console.log("error",error);
    }
}

module.exports={
    register,login
}
