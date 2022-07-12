import cors from "cors";
import { Router } from "express";
import TaskRepo from "../repositories/taskRepository";
import { getCustomRepository, getRepository, ObjectID } from 'typeorm'
import ensureAutheticated from "../middlewares/ensureAutheticated";
import CreateTaskService from "../services/CreateTaskService";
import Task from "../models/Task";
import { getTasks } from "../controller/taskController";


const taskRouter = Router();
taskRouter.use(cors())
taskRouter.use(ensureAutheticated)

taskRouter.get("/", getTasks);

taskRouter.post("/", async ( req, res ) => {
    const { name, tagId } = req.body;
    const { id } = req.user;
    const createTask = new CreateTaskService;
    try {
        const task = await createTask.execute({
            name,
            id,
            tagId
        })
    
        return res.status(201).json(task)
    } catch (error) {
        return res.status(400).json()
    }

})


taskRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const taskRepo = getRepository(Task);

    // Tenta realizar a atualiziação dos dados
    try {
        const task = await taskRepo.update(id, data)
        if (task) {
            return res.json();
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json()
    }

    

})

taskRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const taskRepo = getCustomRepository(TaskRepo)
    try {
        taskRepo.delete(id)
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }

})


export default taskRouter;