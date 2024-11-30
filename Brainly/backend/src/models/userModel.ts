import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let userModel=  model("User", userSchema);

export default userModel;