import {Request, Response} from "express";
import { getCustomRepository, getRepository } from "typeorm";
import Task from "../models/Task";
import TaskRepo from "../repositories/taskRepository";



const getTasks = async (req: Request, res: Response) => {
    const taskRepo = getCustomRepository(TaskRepo);
    const user_id = req.user.id;
    const {status} = req.query;
    let tasks: Task[] = []
    if(status) {
        tasks = await taskRepo.find({
            where: {
                user_id,
                status
            }
        })
    } else {
        tasks = await taskRepo.find({
            where: {
                user_id
            }
        })
    }

    const resume = taskRepo.resume(tasks);

    return res.json({tasks, resume});
}



export {
    getTasks
}