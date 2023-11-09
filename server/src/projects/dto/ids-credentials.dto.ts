import { IsUUID } from "class-validator"
export class IdSCredentialsDto {

    @IsUUID()
    userId: string;
    @IsUUID()
    projectId: string;
}