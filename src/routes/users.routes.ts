import cors from "cors";
import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();
usersRouter.use(cors())


usersRouter.post("/", async ( req, res ) => {
    const { email, name, password } = req.body;
    const createUser = new CreateUserService;
    try {
        const user = await createUser.execute({
            email,
            name,
            password
        })

        delete user.password;

        return res.status(201).json(user)
    } catch (error) {
        return res.json({msg: error})
    }
})

export default usersRouter;