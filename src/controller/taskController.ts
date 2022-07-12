import {Request, Response} from "express";
import { getCustomRepository, getRepository } from "typeorm";
import SubTask from "../models/SubTask";
import Task from "../models/Task";
import TaskRepo from "../repositories/taskRepository";
import CreateTaskService from "../services/CreateTaskService";



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

    const overView = taskRepo.overView(tasks);

    return res.json({tasks, overView});
}

const createTask = async (req: Request, res: Response) => {
    const { name, tagId } = req.body;
    const { id } = req.user;
    const createTaskService = new CreateTaskService;
    try {
        const task = await createTaskService.execute({
            name,
            id,
            tagId
        })
    
        return res.status(201).send()
    } catch (error) {
        return res.status(400).json()
    }
}

const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const taskRepo = getRepository(Task);

    try {
        const task = await taskRepo.update(id, data)
        if (task) {
            return res.json();
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json()
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskRepo = getRepository(Task);
    try {
        taskRepo.delete(id)
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

const createSubTask = async (req: Request, res: Response) => {
    const { name, status } = req.body;
    const { taskId }: any = req.params;
    const subTaskRepo = getRepository(SubTask)

    try {
        const subTask = subTaskRepo.create({
            name,
            status,
            taskId
        })
    
        await subTaskRepo.save(subTask);
    
        return res.status(201).json(subTask)
    } catch (error) {
        return res.status(400).send()
    }

}

const updateSubTask =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const subtaskRepo = getRepository(SubTask);

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
}

const deleteSubTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const subtaskRepo = getRepository(SubTask)
    try {
        subtaskRepo.delete(id)
        return res.status(202).json()
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}


export {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
}