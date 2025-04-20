import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
// console.log(Mongo_URI);
const DB_Connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully ....");
  }catch (error : any) {
    console.error("Error connecting to MongoDB:", error.message);
  }

};

export default DB_Connect;