import { IsBoolean, IsNotEmpty } from "class-validator"
import { SignInCredentialsDto } from "./signIn-credentials.dto";
import { ApiProperty } from "@nestjs/swagger"
export class SignUpCredentialsDto extends SignInCredentialsDto {

    @ApiProperty({
        description: "The type of the user",
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    isManager: boolean


}