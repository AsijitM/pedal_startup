import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

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
