import { IsOptional, IsString } from 'class-validator';

export class GetProjectFilterDto {
    @IsOptional()
    @IsString()
    search?: string;

}