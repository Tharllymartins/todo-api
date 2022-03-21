import { uuid } from "uuidv4"

class Task {
    id: string;

    name: string;

    status: 'To do' | 'Done'

    constructor({ name, status}: Omit<Task, 'id'>){
        this.id = uuid();
        this.name = name;
        this.status = status
    }
}


export default Task;