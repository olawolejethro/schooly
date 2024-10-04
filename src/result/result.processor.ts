import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { ResultService } from '../result/result.service';
import { CreateResultDto } from '../result/dtos/create-result.dto';

@Processor('bulk-results')
export class ResultJobProcessor {
  constructor(private resultService: ResultService) {}

  @Process('bulk-results')
  async bulkResult(job: Job<CreateResultDto[]>) {
    const results = job.data;
    console.log(
      JSON.stringify({ message: 'Worker processing bulk results', results }),
    );
    const savedResultPromises = results.map(async (result) => {
      const data = await this.resultService.processResult(result);
      return data;
    });
    console.log(
      JSON.stringify({
        message: 'Saved results promises',
        savedResultPromises,
      }),
    );
    const savedResults = Promise.all(savedResultPromises);
    console.log(JSON.stringify({ message: 'Saved results', savedResults }));
    console.log(JSON.stringify({ message: 'Job completed!!!', savedResults }));

    return savedResults;
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<any>) {
    console.log(
      JSON.stringify({
        message: `Job with id - ${job.id} in queue - ${job.queue.name}, name - ${job.name} has completed!`,
      }),
    );
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      JSON.stringify({
        message: `Processing job - ${job.id} of type ${job.name} with data ${job.data}...`,
      }),
    );
  }

  @OnQueueError()
  onError(error: any) {
    console.error(
      JSON.stringify({
        message: `Error while processing queue`,
        error,
      }),
    );
  }

  @OnQueueFailed()
  onFailed(job: Job, error: any) {
    console.error(
      JSON.stringify({
        message: `Error while processing job - ${job.id} of type - ${job.name} with data - ${job.data}`,
        error,
      }),
    );
  }
}
