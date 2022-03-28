import { Router } from "express";
import sessionRouter from "./session.routes";
import todoRouter from "./todo.routes"
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/todo", todoRouter)
routes.use("/users", usersRouter)
routes.use("/session", sessionRouter)



export default routes;
