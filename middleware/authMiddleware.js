const jwt=require("jsonwebtoken")
const { loginUser } = require("../controllers/userController")

const authMiddleware=(req,res,next)=>{
    const token=req.header("Authorization")
    console.log(token);

    if(!token){
        return res.status(401).json({error:"UnAuthorized User"})
    }
    try {
        const decoded=jwt.verify(token, "tecmantras");

        req.user=decoded
        next();
    } catch (error) {
        return res.status(401).json({error:"UnAuthorized User"})
    }
}

module.exports=authMiddleware