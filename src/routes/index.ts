import { Router } from "express";
import todoRouter from "./todo.routes"

const routes = Router();

routes.use("/todo", todoRouter)

export default routes;
