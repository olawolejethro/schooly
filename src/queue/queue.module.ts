// import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull';
// import { QueueProcessor } from './queue.processor';
// import { ResultModule } from '../result/result.module'; // Import the relevant modules

// @Module({
//   imports: [
//     BullModule.registerQueue({
//       name: 'bulk-results',
//     }),
//     ResultModule,
//   ],
//   providers: [QueueProcessor], // Provide the processor that handles background jobs
// })
// export class QueueModule {}
