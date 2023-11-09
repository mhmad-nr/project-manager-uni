import { Expose } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger"
import { StatusEnum } from "src/common";
export class TaskDto {
    
    @ApiProperty()
    @Expose()
    id: string;
    
    @ApiProperty()
    @Expose()
    title: string;
    
    @ApiProperty()
    @Expose()
    description: string;
    
    @ApiProperty()
    @Expose()
    status: StatusEnum;
    
    @ApiProperty()
    @Expose()
    project_id: Date;
    
    @ApiProperty()
    @Expose()
    createdAt: Date;
    
    @ApiProperty()
    @Expose()
    endDate: Date;
    
}