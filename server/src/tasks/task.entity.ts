import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "src/projects/project.entity";
import { User } from "src/auth/entity";
import { StatusEnum } from "src/common";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: StatusEnum

    @Column({ type: "timestamp", default: () => `CURRENT_TIMESTAMP` })
    createdAt: Date;

    @Column({ type: "timestamp", nullable: true })
    endDate: Date | null;

    @ManyToOne((_type) => User, (user) => user.tasks)
    user: User

    @ManyToOne((_type) => Project, (project) => project.tasks)
    project: Project


}