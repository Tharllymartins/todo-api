import { Entity, Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    status: 'To do' | 'Doing' | 'Done' 

}


export default Task;