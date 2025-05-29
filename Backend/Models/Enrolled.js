import mongoose from "mongoose";
import { useId } from "react";

let EnrolledSchema = new mongoose.Schema({
    useId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    CreatedAt:{
        type:Date,
        default: Date.now
    },
})


export default mongoose.model("Enrolled",EnrolledSchema)