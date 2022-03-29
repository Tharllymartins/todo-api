import cors from "cors";
import { Router } from "express";
import TaskRepo from "../repositories/taskRepository";
import { Any, getCustomRepository } from 'typeorm'
import ensureAutheticated from "../middlewares/ensureAutheticated";

const todoRouter = Router();
todoRouter.use(cors())
todoRouter.use(ensureAutheticated)

todoRouter.get("/", async ( req, res ) => {
    try {
        console.log(req.user)
        const tasksRepo = getCustomRepository(TaskRepo);
        const { id } = req.user;
        const { status }: any = req.query;
        const tasks = status ? await tasksRepo.find({ where: {
            status
        } }) : await tasksRepo.find({ where: {
            user_id: id
        } })
        const resume = tasksRepo.resume(tasks)
        return res.json({tasks, resume})

    } catch(err){
        return res.status(400).json()
    }
})

todoRouter.post("/", async ( req, res ) => {
    const { name, user_id } = req.body;
    const tasksRepo = getCustomRepository(TaskRepo);
    const task = tasksRepo.create({
        name,
        user_id,
        status: "To do"
    })
    await tasksRepo.save(task)

    return res.status(201).json(task)
})


todoRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const taskRepo = getCustomRepository(TaskRepo);

    // Tenta realizar a atualziação dos dados
    try {
        const task = await taskRepo.update(id, data);
        return res.json(task);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
})

todoRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const taskRepo = getCustomRepository(TaskRepo)
    try {
        taskRepo.delete(id)
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }

})


export default todoRouter;