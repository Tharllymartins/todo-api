import { Router } from "express";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import { createSubTask, createTask, deleteSubTask, deleteTask, getTasks, updateSubTask, updateTask } from "../controller/taskController";


const taskRouter = Router();


taskRouter.use(ensureAutheticated)


taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);
taskRouter.post("/:taskId/subtask", createSubTask); 

taskRouter.patch("/:id", updateTask);
taskRouter.patch("/subtask/:id", updateSubTask);

taskRouter.delete("/:id", deleteTask);
taskRouter.delete("/subtask/:id", deleteSubTask);


export default taskRouter;