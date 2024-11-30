import express, { Request, Response } from 'express';

import { z } from "zod";
import userModel from '../models/userModel';

let router = express.Router();

const userSchema = z.object({
    userName: z.string().min(3,{message:"the username should be atlest length 3"}).max(15,{message:"the username should be max length 15"}),
    password:z.string().min(6,{message:"min length should be 6"}).max(20,{message:"max should be 20"})
})


router.post("/signup", async(req: Request, res: Response) => {
   const {userName,password} = req.body;
   const result = userSchema.safeParse({userName,password});
   if(!result.success){
    res.status(411).send({message:result.error});
    return;
   }

   const data = result.data;


  
    await userModel.create({userName:data.userName,password:data.password}).then(()=>{
        console.log("user created sussfully");
        res.status(200).send("Signed up ");
    }).catch((error)=>{
        console.log(error+"error in signup ");
        res.status(403).send("user alredy exits");
    })


});





export default router;