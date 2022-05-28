import { Router } from "express";
import subtaskRouter from "./subtask.routes";
import todoRouter from "./task.routes"
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/task", todoRouter)
routes.use("/user", usersRouter)
routes.use("/subtask", subtaskRouter)



export default routes;
