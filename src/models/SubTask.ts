import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Task from './Task';

@Entity('sub_tasks')
class SubTask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    taskId: string;
    
    @ManyToOne(type => Task, task => task.subtasks)
    task: Task;

    @Column()
    name: string;

    @Column()
    status: 'To do' | 'Doing' | 'Done'

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}


export default SubTask;