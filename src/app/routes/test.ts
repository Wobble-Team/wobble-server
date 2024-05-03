import express, { Request, Response } from "express";

const router = express.Router();

// Define routes
router.get('/', emoji);
router.get('/peter', peter);
router.get('/blake', balake);

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
// More routes...

export default router;