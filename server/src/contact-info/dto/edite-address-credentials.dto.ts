import { IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class EditeAddressCredentialsDto {
    @ApiProperty({
        description: "The Address of the user",
        example: "123 Main Street, Anytown, CA 94538",
    })
    @IsString()
    @MinLength(3)
    address: string | null
}