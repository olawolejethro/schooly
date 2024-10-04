import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ResultModule } from './result/result.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { SessionModule } from './session/session.module';
import { SemesterModule } from './semester/semester.module';
import QueueModule from './queue/queue.module';
import { ConfigModule } from '@nestjs/config';

console.log('hey', process.env.HOST);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ResultModule,
    StudentModule,
    CourseModule,
    SessionModule,
    SemesterModule,
    QueueModule,
  ],
})
export class AppModule {}
