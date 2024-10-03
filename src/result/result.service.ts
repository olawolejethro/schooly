import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.entity';
import { CreateResultDto } from './dtos/create-result.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly studentService: StudentService, // Inject the student service
  ) {}

  async processResult(resultData: any) {
    let student = await this.studentService.findOne(resultData.studentId);

    if (!student) {
      student = await this.studentService.create({
        studentId: resultData.studentId,
        name: resultData.name,
      });
    }

    const result = this.resultRepository.create({
      student,
      session: resultData.session,
      semester: resultData.semester,
      courses: resultData.courses,
      gpa: resultData.gpa,
      cgpa: resultData.cgpa,
    });

    return this.resultRepository.save(result);
  }
}

// async processBulk(file: Express.Multer.File) {
//   // Add file processing logic (CSV/JSON parsing)
//   await this.bulkResultsQueue.add('bulk', { file });
//   return { message: 'Bulk data is being processed.' };
// }
// }
