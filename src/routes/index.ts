import { Router } from "express";
import todoRouter from "./todo.routes"
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/todo", todoRouter)
routes.use("/users", usersRouter)



export default routes;
