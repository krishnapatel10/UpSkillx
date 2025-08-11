import express from "express"
import "dotenv/config"

let adminMiddleware = express.Router()

adminMiddleware = ((req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"Access Denied"})
    }
    next();
})

export default adminMiddleware;