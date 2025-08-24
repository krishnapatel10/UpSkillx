import mongoose from "mongoose";

let EnrolledSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    CreatedAt:{
        type:Date,
        default: Date.now
    },
})


export default mongoose.model("Enrolled",EnrolledSchema)