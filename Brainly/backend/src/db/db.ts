import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Mongo_URI =
    process.env.MONGO_URI || "mongodb+srv://sumithreddy:sumith123@branly.o8apy.mongodb.net/?retryWrites=true&w=majority&appName=Branly";

    console.log(Mongo_URI);

const DB_Connect = async () => {
    await mongoose
        .connect(Mongo_URI)
        .then(() => {
            console.log("Connected to the database");
        })
        .catch((err) => {
            console.log("Error connecting to the database", err);
        });
};

export default DB_Connect;