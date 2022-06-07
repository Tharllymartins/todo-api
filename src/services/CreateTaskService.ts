import { getRepository } from "typeorm"
import Task from "../models/Task";


interface Request {
    name: string;
    id?: string;
    tagId?: string;
}

export default class CreateTaskService {
    public async execute({ name, id, tagId }: Request): Promise<Task>{
        const taskRepo = getRepository(Task)

        const userExist = taskRepo.findOne({
            where: {
                user_id: id
            }
        });

        if (!userExist){
            throw new Error("User does not exist!")
        }

        const task = taskRepo.create({
            name,
            user_id: id,
            tagId,
            status: "To do"
        })

        await taskRepo.save(task);

        delete task.user_id;

        return task;
        
    }
}