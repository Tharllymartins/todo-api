import { getRepository } from "typeorm"
import Task from "../models/Task";


interface Request {
    name: string;
    id?: string;
}

export default class CreateTaskService {
    public async execute({ name, id }: Request): Promise<Task>{
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
            status: "To do"
        })

        await taskRepo.save(task);

        return task;
        
    }
}