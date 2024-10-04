import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './entities/result.entity';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';
import { BullModule } from '@nestjs/bull';
import { Session } from '../session/session.entity';
import { Semester } from '../semester/semester.entity';
import { StudentModule } from 'src/student/student.module';
import { QueueService } from './queue/result.queue';
import { ResultJobProcessor } from './queue/result.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Course, Student, Session, Semester]),

    BullModule.registerQueue({
      name: 'bulk-results', // Register the queue
    }),
    StudentModule,
  ],
  controllers: [ResultController],
  providers: [ResultService, QueueService, ResultJobProcessor],
})
export class ResultModule {}
