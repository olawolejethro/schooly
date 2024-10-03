import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('bulk-results') private readonly bulkQueue: Queue) {}

  async addBulkJob(file: Express.Multer.File) {
    await this.bulkQueue.add('bulk', { file });
  }
}
