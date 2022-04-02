import cors from "cors";
import { response, Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdatedUserAvatarService from "../services/UpdatedUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);
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
        return res.status(201).json(user)
    } catch (error) {
        return res.json({msg: error})
    }
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