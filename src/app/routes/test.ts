import express, { Request, Response } from "express";
import {testInstance} from '../modules/test';

const router = express.Router();

// Define routes
router.get('/', emoji);
router.get('/peter', peter);
router.get('/blake', balake);

router.post('/create', createTest);

//define function
async function emoji (req: Request, res: Response) {
    return res.status(200).json(['😀', '😳', '🙄'])
}
async function peter (req: Request, res: Response) {
    console.log("I am a lil bitch XDXD -peter")
    return res.status(200).json("done")
}
async function balake (req: Request, res: Response) {
    console.log("I am a lil bitch XDXD -blake")
    return res.status(200).json("done")
}

async function createTest(req: Request, res: Response){
    // const body = req.body;

    // if(!body.name || !body.age || !body.shirt_size){
    //     console.error("need name,body,and shirt_size");
    //     res.status(400);
    // }

    const response = await testInstance.addTest();

    return res.status(200).json(response);

}

export default router;