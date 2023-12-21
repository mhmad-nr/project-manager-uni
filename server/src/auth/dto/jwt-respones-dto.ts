import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsJWT, IsNotEmpty } from "class-validator";

export class JwtResponesDto {

    @ApiProperty()
    @IsJWT()
    accessToken: string

    @ApiProperty({
        description: "The type of the user",
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    isManager: boolean


}