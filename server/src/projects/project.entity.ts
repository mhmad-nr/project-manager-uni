import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/tasks/task.entity";
import { User } from "src/auth/entity";
import { Exclude } from "class-transformer";
import { StatusEnum } from "src/common";

@Entity({ name: "project" })

export class Project {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: StatusEnum

    @Exclude({ toPlainOnly: true })
    @ManyToMany((_type) => User)
    @JoinTable({
        name: "project_user",
        joinColumn: {
            name: "project_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    users: User[]

    @OneToMany((_type) => Task, (task) => task.project, { eager: true, cascade: true })
    tasks: Task[]



}