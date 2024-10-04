import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

import { CreateResultDto } from '../dtos/create-result.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('bulk-results') private readonly bulkResultsQueue: Queue,
  ) {}

  async processBulkResults(results: CreateResultDto[]) {
    const job = await this.bulkResultsQueue.add('bulk-results', results);
    return job;
  }
}
