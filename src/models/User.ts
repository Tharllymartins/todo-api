import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Tag from './Tag'


@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Tag, tags => tags.user)
    tags: Tag[]

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password?: string

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}

export default User;