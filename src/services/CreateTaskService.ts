import User from "../models/User"
import { getRepository } from "typeorm"
import Task from "../models/Task";


interface Request {
    name: string;
    id?: string;
}

export default class CreateTaskService {
    public async execute({ name, id }: Request): Promise<Task>{
        const userRepo = getRepository(User);
        const taskRepo = getRepository(Task)

        const userExist = await userRepo.findOne({ where: {
            id
        }
    })

        if (!userExist){
            throw new Error("User id does not exist")
        }

        const task = taskRepo.create({
            name,
            id,
            status: "To do"
        })

        await taskRepo.save(task);

        return task;
        
    }
}