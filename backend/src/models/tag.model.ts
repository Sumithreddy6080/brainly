import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  title: { type: String, required: true },
});

let tagModel = model("Tag", tagSchema);
export default tagModel;