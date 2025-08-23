import express from "express"
import "dotenv/config"

let adminMiddleware = express.Router()

adminMiddleware = ((req,res,next)=>{
   if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only!" });
  }
})

export default adminMiddleware;

