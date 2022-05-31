import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";


@Entity("tags")
export default class Tag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.tags)
    user: User

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date    

}