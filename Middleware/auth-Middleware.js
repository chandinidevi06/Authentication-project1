var jwt=require("jsonwebtoken")
var authMiddleware=(req,res,next)=>{
    console.log("the Midlleware is running")
    var headerAuth=req.headers["authorization"]
    var token=headerAuth && headerAuth.split("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjY4ZWRlZTYzNjYxOTcwZjg1ZmQ4MGE1MiIsImVtYWlsIjoiaGVsbG9AMTIzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjA0NDMwMDQsImV4cCI6MTc2MDQ0MzYwNH0.kmiC8Sl4RcpBPjWWcb0UWChnwrP4tCrZpNwFHFbIkCk")[1]
    if(!token){

    
        return res.status(401).json({message:"no token"})

}
try{
    var decodedToken=jwt.verify(token,process.env.JSON_WEB_TOKEN)
    req.user=jwt.decodedToken
    console.log(req.user);
    next()
}catch(error){
    return  res.status(401).json({message:"invalid token"})
}
}

module.exports=authMiddleware
