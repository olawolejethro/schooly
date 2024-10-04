import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResultDto } from './create-result.dto';

export class BulkResultDto {
  @IsArray()
  @ValidateNested({ each: true }) // Ensures validation of each element in the array
  @Type(() => CreateResultDto) // Required to transform and validate nested DTOs
  results: CreateResultDto[];
}
