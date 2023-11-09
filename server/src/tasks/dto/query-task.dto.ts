import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"
import { StatusEnum } from 'src/common';

export class GetTasksFilterDto {

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsUUID()
  projectId?: string;
}