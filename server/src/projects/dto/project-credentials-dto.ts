import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger"
import { StatusEnum } from "src/common";

export class ProjectDto {

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

}