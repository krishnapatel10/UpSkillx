import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

let app = express();

// // ✅ CORS Setup
// const allowedOrigins = [
//   "http://localhost:5173",                       // local dev
//   "https://up-skillx-wdd1.vercel.app/",       // replace with tumhara actual Vercel URL
// ];

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin (like Postman)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true // agar cookies/token bhejna ho
// }));

app.use(cors({
  origin: ["https://up-skillx-wdd1.vercel.app", "http://localhost:3000"],
  credentials: true
}));

app.use(bodyParser.json());


//Routes
import ConnectDB from "./Config/dbconfig.js";
import authMiddleware from "./Middleware/authMiddleware.js";


import UserRoute from "./Routes/UserRoute.js";
import CourseRoute from "./Routes/CourseRoute.js";
import EnrollRoute from "./Routes/EnrollRoute.js";
//Mongodb Connection
ConnectDB();

// Test route
// app.get("/", (req, res) => res.send("API is working"));

//Apis
// Mount routes
app.use("/api/users", UserRoute);
app.use("/api/courses", authMiddleware, CourseRoute);
app.use("/api/enroll", EnrollRoute);


app.get("/",(req,res)=>{
  res.json("API is working");
})


//listening
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

