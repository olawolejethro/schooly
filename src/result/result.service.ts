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
import { BulkResultDto } from './dtos/bulk-result.dto';

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

  async processResult(resultData: CreateResultDto) {
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

    const result = this.resultRepository.create();
    result.session = resultData.session;
    result.semester = resultData.semester;
    result.courses = resultData.courses;
    result.gpa = resultData.gpa;
    result.cgpa = resultData.cgpa;
    result.student = student;
    return await this.resultRepository.save(result);
  }

  async processBulk(file: Express.Multer.File, bulkResult: BulkResultDto) {
    console.log(
      JSON.stringify({ message: 'Processing Bulk Results', file, bulkResult }),
    );
    if (bulkResult) {
      // Process data in the background to prevent blocking
      console.log(
        JSON.stringify({ message: 'Processing Bulk Results', bulkResult }),
      );
      await this.queueService.processBulkResults(bulkResult.results);
    }
    if (file) {
    }
    // await this.queueService.addBulkJob(file);
    // return { message: 'Bulk data is being processed.' };
  }
}
