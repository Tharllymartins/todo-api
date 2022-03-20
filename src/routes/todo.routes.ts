import { Router } from "express";
import TaskRepo from "../repository/taskRepository";

const todoRouter = Router();

const tasksRepo = new TaskRepo;

todoRouter.get("/", ( req, res ) => {
    try {
        const allTasks = tasksRepo.all()
        return res.json(allTasks)
    } catch(err){
        return res.status(400).json()
    }
})

todoRouter.post("/", ( req, res ) => {
    const { name, status } = req.body;
    const task = tasksRepo.create({name, status});

    return res.status(201).json(task)
})

todoRouter.patch("/status/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const task = tasksRepo.update({ status, id });

    return res.json(task);
})


export default todoRouter;