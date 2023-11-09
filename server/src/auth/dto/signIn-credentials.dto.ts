import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength, IsNotEmpty, IsObject, ValidateIf } from "class-validator"
export class SignInCredentialsDto {

    @ApiProperty({
        description: "The email of the user",
        example: "mohammadnorouuzi@gmail.com",
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: "The password of the user",
        example: "qwertQ123",
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "This password is too weak"
    })
    password: string;


}