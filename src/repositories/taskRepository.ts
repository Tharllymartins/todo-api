import Task from "../models/Task";

interface TasksResume {
    total: number;
    todo: number;
    done: number
}
class TaskRepo {
    private tasks: Task[];

    constructor(){
        this.tasks = []
    }

    public all(): Task[]{
        return this.tasks;
    }

    public create({ name }: Omit<Task, "id">): Task {
        const task = new Task({ name, status: "To do" })
        this.tasks.push(task);
        return task;
    }

    public update({ status, id }: Omit<Task, "name">) {
        const taskIndex = this.tasks.findIndex(task => task.id === id)        
        if (taskIndex >= 0 ) {
            this.tasks[taskIndex].status = status
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
}

export default TaskRepo;