import express, { Request, Response } from "express";
import router from "./routes/user.routes";
import DB_Connect from "./db/db";
import dotenv from "dotenv";
dotenv.config();


const app = express();

DB_Connect();


app.use(express.json());
app.use("/api/v1", router);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



module.exports = app;
