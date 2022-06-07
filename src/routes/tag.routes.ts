import ensureAutheticated from "../middlewares/ensureAutheticated";
import cors from "cors";
import { Router } from "express";
import { getRepository } from "typeorm";
import  Tag from "../models/Tag";
import Task from "../models/Task";


const tagRouter = Router();
tagRouter.use(cors())
tagRouter.use(ensureAutheticated);


tagRouter.post("", async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    const tagRepo = getRepository(Tag);

    try {
        const tag = tagRepo.create({
            name,
            userId
        })

        await tagRepo.save(tag)

        return res.json(tag)
    } catch (error) {
        return res.status(400).json({msg: "Error"})
    }
})

tagRouter.get("/", async (req, res) => {
    const tagRepo = getRepository(Tag);
    const userId = req.user.id;
    const tags = await tagRepo.find({
        where: {
            userId
        }
    })

    return res.json(tags);
})

tagRouter.get("/:tagId/tasks", async (req, res) => {
    const { tagId } = req.params;
    const taskRepo = getRepository(Task);
    const tasks = await taskRepo.find({
        where: {
            tagId
        }
    })

    return res.json(tasks)
})

tagRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const tagrepo = getRepository(Tag);
    tagrepo.delete(id);

    return res.status(204).json()
})


export default tagRouter;