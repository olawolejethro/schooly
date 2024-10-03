import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultService } from './result.service';
import { CreateResultDto } from '../result/dtos/create-result.dto';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  createSingleResult(@Body() createResultDto: CreateResultDto) {
    return this.resultService.processResult(createResultDto);
  }

  // @Post('bulk')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadBulkResults(@UploadedFile() file: Express.Multer.File) {
  //   return this.resultService.processBulk(file);
  // }
}
