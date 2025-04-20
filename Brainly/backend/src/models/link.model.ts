import { Schema,model } from "mongoose";

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    });

let linkModel = model("Link", linkSchema);
export default linkModel;