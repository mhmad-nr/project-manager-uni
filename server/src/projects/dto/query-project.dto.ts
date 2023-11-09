import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/common';

export class GetProjectFilterDto {
    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;

    @IsOptional()
    @IsString()
    search?: string;

}