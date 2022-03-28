import cors from "cors";
import { Router } from "express";
import AuthUserService from "../services/AuthUserService";

const sessionRouter = Router();
sessionRouter.use(cors())


sessionRouter.post("/", async ( req, res ) => {
    const { email, password } = req.body;
    try {
        const authUser = new AuthUserService;
        const  user  = await authUser.execute({
            email,
            password
        })
        
        return res.json(
            user
        )
    } catch (error) {
        return res.json({msg: error})
    }
})

export default sessionRouter;