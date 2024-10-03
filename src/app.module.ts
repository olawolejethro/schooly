import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ResultModule } from './result/result.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { SessionModule } from './session/session.module';
import { SemesterModule } from './semester/semester.module';
// import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Olawole111?',
      database: 'academ',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ResultModule,
    StudentModule,
    CourseModule,
    SessionModule,
    SemesterModule,
    // QueueModule,
  ],
})
export class AppModule {}
