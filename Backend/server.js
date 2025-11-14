import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

let app = express();
app.use(cors());
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

