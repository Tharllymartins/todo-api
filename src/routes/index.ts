import { Router } from "express";
import todoRouter from "./todo.routes"
import usersRouter from "./users.routes";
import sessionRouter from "./session.routes";

const routes = Router();

routes.use("/todo", todoRouter)
routes.use("/users", usersRouter)
routes.use("/session", sessionRouter)



export default routes;
