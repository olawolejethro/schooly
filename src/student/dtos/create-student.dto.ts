import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'studentId must be alphanumeric' })
  studentId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
