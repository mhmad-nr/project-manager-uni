import { IsString, ValidateIf, MinLength, IsPhoneNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
export class ContactInfoCredentialsDto {
    @ApiProperty({
        description: "The Phone Number of the user",
        example: "09876543210",
    })
    @IsPhoneNumber()
    phone: number

    @ApiProperty({
        description: "The Address of the user",
        example: "123 Main Street, Anytown, CA 94538",
    })
    @IsString()
    @MinLength(3)
    address?: string | null

}