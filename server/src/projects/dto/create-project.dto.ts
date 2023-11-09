import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProjectDto {
    
    @ApiProperty()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;
}