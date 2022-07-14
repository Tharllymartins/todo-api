import { Router } from "express";
import ensureAutheticated from "../middlewares/ensureAutheticated";
import { createSubTask, createTag, createTask, deleteSubTask, deleteTag, deleteTask, getTags, getTasks, getTasksByTag, updateSubTask, updateTag, updateTask } from "../controller/taskController";


const taskRouter = Router();
taskRouter.use(ensureAutheticated)

// Route to get tasks
taskRouter.get("/", getTasks);
taskRouter.get("/tag", getTags)
taskRouter.get("/tag/:tagId", getTasksByTag)
// Routes to create data (task, subtask)
taskRouter.post("/", createTask);
taskRouter.post("/:taskId/subtask", createSubTask); 
taskRouter.post("/tag", createTag);
// Routes to update data (task, subtask)
taskRouter.patch("/:id", updateTask);
taskRouter.patch("/subtask/:id", updateSubTask);
taskRouter.patch("/tag/:tagId", updateTag)
// Routes to delete data (task, subtask)
taskRouter.delete("/:id", deleteTask);
taskRouter.delete("/subtask/:id", deleteSubTask);
taskRouter.delete("/tag/:tagId", deleteTag)


export default taskRouter;