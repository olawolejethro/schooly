import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';

@Module({
  providers: [SemesterService],
})
export class SemesterModule {}
