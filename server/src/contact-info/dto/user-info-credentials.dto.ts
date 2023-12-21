import { IsEmail } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { ContactInfoCredentialsDto } from "./contact-info-credentials.dto"
import { UserDto } from "src/auth/dto/user-credentials-dto"
import { Expose } from "class-transformer";
export class UserInfoCredentials extends ContactInfoCredentialsDto {
    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    isManager: boolean;
}