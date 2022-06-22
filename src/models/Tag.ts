import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Task from "./Task";
import User from "./User";


@Entity("tags")
class Tag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @OneToMany(() => Task, tasks => tasks.tag)
    tasks: Task[]

    @ManyToOne(() => User, user => user.tags)
    user: User

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date    

}

export default Tag;