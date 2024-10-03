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
import { ResultProcessor } from './result.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Course, Student, Session, Semester]),

    BullModule.registerQueue({
      name: 'bulk-results', // Register the queue
      redis: {
        host: 'localhost', // Replace with your Redis host
        port: 6379,
      },
    }),
    StudentModule,
  ],
  controllers: [ResultController],
  providers: [ResultService, QueueService, ResultProcessor],
})
export class ResultModule {}
