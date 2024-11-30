import express, { Request, Response } from "express";
import userRouter from "./user.routes";
const router = express.Router();

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

router.use("/user", userRouter);



export default router;