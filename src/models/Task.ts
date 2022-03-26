import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    status: 'To do' | 'Doing' | 'Done'

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}


export default Task;