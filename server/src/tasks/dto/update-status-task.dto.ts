import {  IsEnum, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { StatusEnum } from "src/common";

export class UpdateStatusTaskDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    status: StatusEnum;

}