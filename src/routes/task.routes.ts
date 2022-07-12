import cors from "cors";
import { Router } from "express";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController";


const taskRouter = Router();
taskRouter.use(cors())
taskRouter.use(ensureAutheticated)

taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);

taskRouter.patch("/:id", updateTask)

taskRouter.delete("/:id", deleteTask)


export default taskRouter;