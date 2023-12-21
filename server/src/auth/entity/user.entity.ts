import { Project } from "src/projects/project.entity";
import { Task } from "src/tasks/task.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "../../contact-info/contactInfo.entity";
import { Exclude } from "class-transformer";



@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    email: string

    @Exclude()
    @Column()
    password: string
    
    @Column({ name: "isManager" })
    isManager: boolean
    
    @Exclude()
    @OneToMany((_type) => Task, (task) => task.user, { eager: true })
    tasks: Task[]
    
    
    @Exclude()
    @ManyToMany((_type) => Project)
    projects: Project[]
    
    @Exclude()
    @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.user, { nullable: true })
    contactInfo: ContactInfo
}

