import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ResultService } from './result.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Processor('bulk-results')
export class ResultProcessor {
  constructor(private readonly resultService: ResultService) {}

  @Process('bulk')
  async handleBulkResults(job: Job) {
    const { file } = job.data;

    try {
      if (file.mimetype === 'application/json') {
        const results = JSON.parse(file.buffer.toString());
        for (const result of results) {
          await this.resultService.processResult(result);
        }
      } else if (file.mimetype === 'text/csv') {
        await this.processCSV(file);
      }
    } catch (error) {
      throw new Error('Error processing bulk results');
    }
  }

  private async processCSV(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            for (const result of results) {
              await this.resultService.processResult(result);
            }
            resolve(results);
          } catch (error) {
            reject(new Error('Error processing CSV results'));
          }
        })
        .on('error', (error) => reject(new Error('Error reading CSV file')));
    });
  }
}
