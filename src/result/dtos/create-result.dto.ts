import {
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CourseDto {
  @IsString() @IsNotEmpty() courseCode: string;
  @IsString() @IsNotEmpty() courseTitle: string;
  @IsNumber() unit: number;
  @IsNumber() score: number;
  @IsString() @IsNotEmpty() grade: string;
}

export class CreateResultDto {
  @IsString() @IsNotEmpty() studentId: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() session: string;
  @IsString() @IsNotEmpty() semester: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses: CourseDto[];

  @IsNumber() gpa?: number;
  @IsNumber() cgpa?: number;
}
