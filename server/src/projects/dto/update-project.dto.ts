import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { StatusEnum } from "src/common";
export class UpdateProjectDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty() 
    @IsEnum(StatusEnum)
    @IsOptional()
    status?: StatusEnum;
}