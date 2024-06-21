import { Type } from 'class-transformer';
import { IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly dueDate?: Date;
}
