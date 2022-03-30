import { getRepository } from "typeorm"
import Task from "../models/Task";


interface Request {
    name: string;
    id?: string;
}

export default class CreateTaskService {
    public async execute({ name, id }: Request): Promise<Task>{
        const taskRepo = getRepository(Task)

        const task = taskRepo.create({
            name,
            id,
            status: "To do"
        })

        await taskRepo.save(task);

        return task;
        
    }
}