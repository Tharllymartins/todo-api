import cors from "cors";
import { Router } from "express";
import { getRepository } from 'typeorm'
import ensureAutheticated from "../middlewares/ensureAutheticated";
import SubTask from "../models/SubTask";

const subtaskRouter = Router();
subtaskRouter.use(cors())
subtaskRouter.use(ensureAutheticated)


subtaskRouter.get("/", async (req, res) => {
    const subTaskRepo = getRepository(SubTask);
    const subTasks = await subTaskRepo.find();

    return res.json(subTasks)
})

subtaskRouter.post("/", async ( req, res ) => {
    const { name, status, task } = req.body;

    const subTaskRepo = getRepository(SubTask)
    const subTask = subTaskRepo.create({
        name,
        status,
        task
    })

    await subTaskRepo.save(subTask);

    return res.status(201).json(subTask)
})


subtaskRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const subtaskRepo = getRepository(SubTask);

    // Tenta realizar a atualização dos dados
    try {
        await subtaskRepo.update(id, data);
        const subtask = await subtaskRepo.findOne(
            {
                where: {
                    id
                }
            }
        )
        return res.json(subtask);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
})

subtaskRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const subtaskRepo = getRepository(SubTask)
    try {
        subtaskRepo.delete(id)
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }

})



export default subtaskRouter;