import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger"
import { IsJWT } from "class-validator";

export class JwtResponesDto {

    @ApiProperty()
    @IsJWT()
    accessToken: string

}