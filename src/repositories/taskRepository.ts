import Task from "../models/Task";
import { EntityRepository, getRepository, Repository } from 'typeorm'
import { request } from "express"


interface TasksResume {
    total: number;
    todo: number;
    done: number;
    doing: number;
}

@EntityRepository(Task)
class TaskRepo extends Repository<Task> {
    public resume(tasks: any): TasksResume{
        const { done, todo, doing } = tasks.reduce(
            (accum: TasksResume, task: Task) => {
                switch (task.status) {
                    case "Done":
                        accum.done += 1;
                        break;
                    case "To do":
                        accum.todo += 1;
                        break;
                    case "Doing":
                        accum.doing += 1
                    default:
                        break;
                }
                return accum;
            },
            { //Formato do objeto accumulator
                todo: 0,
                doing: 0,
                done: 0,
                total: 0
            }
        );
        const total = done + todo + doing;
        return { todo, doing, done, total }
    }

    public getByStatus(status: any, user_id: any): Task[] {
        const taskRepo = getRepository(Task);
        let tasksFinded: Task[] = []
        taskRepo.find({where: [{user_id}, {status}]}).then(
            (tasks) => { tasksFinded = tasks} 
        )

        return tasksFinded;
    }

        
}

/*
    public create({ name }: Omit<Task, "id">): Task {
        const task = new Task({ name, status: "To do" })
        this.tasks.push(task);
        return task;
    }

    public update({ name, status, id }: Task) {
        const taskIndex = this.tasks.findIndex(task => task.id === id)        
        if (taskIndex >= 0) {
            this.tasks[taskIndex].status = status ? status : this.tasks[taskIndex].status;
            this.tasks[taskIndex].name = name ? name : this.tasks[taskIndex].name;
            return this.tasks[taskIndex];
        } else {
            throw "Task not found"
        }
    }

    public delete( { id }: Omit<Task, "name" | "status"> ) {
        const taskIndex = this.tasks.findIndex(task => task.id === id)
        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1)
        } else {
            throw "Task not found"
        }
    }
    */

export default TaskRepo;