import { Router } from "express";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import { authUserController, createUserController, getUserController, uploadUserAvatarController } from "../controller/userController";

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post("/signup", createUserController)

usersRouter.post("/auth", authUserController)

usersRouter.get("/auth/me", ensureAutheticated, getUserController)

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), uploadUserAvatarController)


export default usersRouter;