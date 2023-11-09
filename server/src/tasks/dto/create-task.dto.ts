import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsUUID } from "class-validator"
import {ApiProperty} from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    projectId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
    
    @ApiProperty({nullable:true})
    @IsOptional()
    @IsDateString()
    endedAt?: Date;
}