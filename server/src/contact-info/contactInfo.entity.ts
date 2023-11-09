import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/entity";
import { IsPhoneNumber } from "class-validator";
import { Exclude } from "class-transformer";

@Entity()
export class ContactInfo {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "bigint", unique: true, nullable: true })
    @IsPhoneNumber()
    phone: number

    @Column({ nullable: true })
    address: string

    @OneToOne(() => User, user => user.contactInfo)
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User

}

