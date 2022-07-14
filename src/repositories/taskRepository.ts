import Task from "../models/Task";
import { EntityRepository, Repository } from 'typeorm'


interface IOverView {
    total: number;
    todo: number;
    done: number;
    doing: number;
}

@EntityRepository(Task)
class TaskRepo extends Repository<Task> {
    public overView(tasks: any): IOverView{
        const { done, todo, doing } = tasks.reduce(
            (accum: IOverView, task: Task) => {
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