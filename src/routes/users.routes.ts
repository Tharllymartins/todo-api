import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdatedUserAvatarService from "../services/UpdatedUserAvatarService";
import AuthUserService from "../services/AuthUserService";
import { getRepository } from "typeorm";
import User from "../models/User";

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post("/signup", async ( req, res ) => {
    const { email, name, password } = req.body;
    const createUser = new CreateUserService;
    try {
        await createUser.execute({
            email,
            name,
            password
        })
        const authUser = new AuthUserService;
        const user  = await authUser.execute({
            email,
            password
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.json({msg: error})
    }
})

usersRouter.post("/auth", async ( req, res ) => {
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

usersRouter.get("/auth/me", ensureAutheticated, async ( req, res) => {
    const id = req.user.id;
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({
        select: ["name", "email", "avatar"],
        where: {
            id
        }
    }) as User

    if(!user){
        return res.status(400).json()
    }
    
    return res.json(user)

})

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), async (req, res) => {
    try {
        const updateUserAvatar = new UpdatedUserAvatarService();
        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFileName: req.file?.filename
        })
        
        delete user.password;

        return res.json(user)
    } catch (error) {
        return res.json({msg: error})
    }
})

export default usersRouter;