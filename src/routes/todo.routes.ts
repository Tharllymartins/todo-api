import cors from "cors";
import { Router } from "express";
import TaskRepo from "../repositories/taskRepository";

const todoRouter = Router();
todoRouter.use(cors())

const tasksRepo = new TaskRepo;

todoRouter.get("/", ( req, res ) => {
    try {
        const { status }: any = req.query;
        const tasks = status ? tasksRepo.getStatus({ status }) : tasksRepo.all()
        const resume = tasksRepo.resume()
        return res.json({tasks, resume})
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

    try {
        const task = tasksRepo.update({ status, id });

        return res.json(task);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
})

todoRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    try {
        tasksRepo.delete({ id })
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }

})


export default todoRouter;