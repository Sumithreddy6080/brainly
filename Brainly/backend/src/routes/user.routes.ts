import express, { Request, Response } from 'express';
import {signin,signup,auth} from '../controllers/auth.controller';

let router = express.Router();


router.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});


router.post("/signin", signin);
router.post("/signup", signup);

router.post("/authCheck",auth,(req, res) => {
    res.status(200).send({ message: "User is authenticated" ,
        data : req.body.userData
    });
});

// router.post("/content",auth,);
// router.get("/content",auth,);
// router.delete("/content",auth,);

// router.post("/share",auth);
// router.get("brain/:shareLink",);

export default router;