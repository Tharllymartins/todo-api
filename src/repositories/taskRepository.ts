import Task from "../models/Task";
import { EntityRepository, Repository } from 'typeorm'
interface TasksResume {
    total: number;
    todo: number;
    done: number
}
@EntityRepository(Task)
class TaskRepo extends Repository<Task> {
    public resume(tasks: any): TasksResume{
        const { done, todo } = tasks.reduce(
            (accum: TasksResume, task: Task) => {
                switch (task.status) {
                    case "Done":
                        accum.done += 1;
                        break;
                    case "To do":
                        accum.todo += 1;
                        break;
                    default:
                        break;
                }
                return accum;
            },
            { //Formato do objeto accumulator
                done: 0,
                todo: 0,
                total: 0
            }
        );
        const total = done + todo;
        return { done, todo, total }
    }
}
    /*
    public all(): Task[]{
        return this.tasks;
    }

    public getStatus({status}: Omit<Task, "id" | "name">): Task[]{
        const tasksFiltered = this.tasks.filter(task => task.status === status)
        return tasksFiltered;
    }

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