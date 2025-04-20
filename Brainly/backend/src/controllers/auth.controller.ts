import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from "zod";
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || "secret" as string;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const userSchema = z.object({
    userName: z.string().min(3, { message: "The username should be at least 3 characters long" }).max(15, { message: "The username should be at most 15 characters long" }),
    password: z.string().min(6, { message: "The password should be at least 6 characters long" }).max(20, { message: "The password should be at most 20 characters long" })
});

const signup = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const result = userSchema.safeParse({ userName, password });

    if (!result.success) {
        res.status(400).send({ message: "Invalid input data", error: result.error.message });
        return;
    }

    const data = result.data;

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const token = jwt.sign({ userName: data.userName }, JWT_SECRET);

        await userModel.create({ userName: data.userName, password: hashedPassword });
        console.log("User created successfully");
        res.status(201).send({ message: "User created successfully", token: token });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(409).send({ message: "User already exists" });
    }
};


const signin = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const result = userSchema.safeParse({ userName, password });

    if (!result.success) {
        res.status(400).send({ message: "Invalid input data", error: result.error.message });
        return;
    }

    const data = result.data;

    try {

        const user = await userModel.findOne({ userName: data.userName });
        if (!user) {
            res.status(404).send({ message: "User does not exist" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            res.status(403).send({ message: "Invalid credentials" });
            return;
        }

        const token =  await jwt.sign({ userName: data.userName }, JWT_SECRET);
        console.log("User logged in successfully");
        res.status(200).send({ message: "User logged in successfully", token: token });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send("Access Denied");
        return;
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.body.userData = user;
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(400).send("Invalid Token");
        return ;
    }
};



export { signup, signin, auth };