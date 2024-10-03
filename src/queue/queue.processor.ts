// import { Processor, Process } from '@nestjs/bull';
// import { Job } from 'bull';
// import { ResultService } from '../result/result.service';

// @Processor('bulk-results')
// export class QueueProcessor {
//   constructor(private readonly resultService: ResultService) {}

//   @Process('bulk')
//   async handleBulkResults(job: Job) {
//     const { file } = job.data;

//     // You can process the file here, for example, parse CSV or JSON data
//     const results = await this.parseFile(file);

//     // Save results using ResultService or other services
//     await this.resultService.saveBulkResults(results);

//     return { status: 'Completed' };
//   }

//   private async parseFile(file: any): Promise<any[]> {
//     // Implement logic to parse the file (CSV/JSON parsing logic)
//     // You could use libraries like `csv-parser` or `papaparse` for CSV parsing
//     return []; // Return parsed data
//   }
// }
