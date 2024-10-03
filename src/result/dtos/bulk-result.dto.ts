import { IsArray } from 'class-validator';
import { CreateResultDto } from './create-result.dto';

export class BulkResultDto {
  @IsArray()
  results: CreateResultDto[];
}
