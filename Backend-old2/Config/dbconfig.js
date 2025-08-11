import mongoose from "mongoose";
import "dotenv/config"


export default async function ConnectDB(){
    // mongoose.connect(process.env.MONGODB_URI).then(()=>{
    //     console.log("Connected to MongoDb...!");
    // }).catch((error)=>{
    //     console.log({message:error.message});
    // })
      try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }

    
}