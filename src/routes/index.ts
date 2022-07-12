import { Router } from "express";
import tagRouter from "./tag.routes";
import todoRouter from "./task.routes"
import usersRouter from "./users.routes";
import cors from "cors";

const routes = Router();

routes.use(cors());
routes.use("/task", todoRouter);
routes.use("/user", usersRouter);
routes.use("/tag", tagRouter);



export default routes;
