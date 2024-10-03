import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './result.entity';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';
import { BullModule } from '@nestjs/bull';
import { Session } from '../session/session.entity';
import { Semester } from '../semester/semester.entity';
import { StudentModule } from 'src/student/student.module';
// import { ResultProcessor } from './result.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Course, Student, Session, Semester]),
    BullModule.registerQueue({
      name: 'bulk-results',
    }),
    StudentModule,
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
