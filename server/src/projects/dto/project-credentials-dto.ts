import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger"

export class ProjectDto {

    @Expose()
    id: string;


    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    description: string;

}