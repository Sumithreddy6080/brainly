
import  { Schema, model } from "mongoose";

const contentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String,  },
    link: { type: String, required: true },
    type: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId,  ref: "Tag" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    });


let contentModel = model("Content", contentSchema);
export default contentModel;