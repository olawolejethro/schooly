import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { StudentService } from '../student/student.service';
import { QueueService } from '../result/queue/result.queue';
import { Student } from '../student/student.entity';
import { CreateResultDto } from './dtos/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly studentService: StudentService,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly queueService: QueueService,
  ) {}

  async processResult(resultData: any) {
    let student = await this.studentService.findOne(resultData.studentId);

    if (!student) {
      try {
        student = await this.studentService.create({
          studentId: resultData.studentId,
          name: resultData.name,
        });
      } catch (error) {
        throw new BadRequestException('Error saving student data');
      }
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

  async processBulk(file: Express.Multer.File) {
    await this.queueService.addBulkJob(file);
    return { message: 'Bulk data is being processed.' };
  }
}
