import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:"https://png.pngtree.com/png-clipart/20240923/original/pngtree-handsome-man-with-a-beautiful-smile-and-glasses-png-image_16072042.png",
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // enum full form --- "enumerate"
    default: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
