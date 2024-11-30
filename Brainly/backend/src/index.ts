import express, { Request, Response } from "express";
import userModel from "./models/userModel";
import router from "./routes/routes";
import DB_Connect from "./db/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();

DB_Connect();

app.use(express.json());
app.use("/api/v1", router);


// const port = process.env.port || ;



app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});



module.exports = app;
