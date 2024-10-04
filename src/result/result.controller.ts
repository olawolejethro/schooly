import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultService } from './result.service';
import { CreateResultDto } from '../result/dtos/create-result.dto';
import { BulkResultDto } from '../result/dtos/bulk-result.dto';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @HttpCode(201)
  async createSingleResult(
    @Body() createResultDto: CreateResultDto,
    @Res() res: Response,
  ) {
    const data = await this.resultService.processResult(createResultDto);
    return { status: 'success', data };
  }

  @Post('bulk')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(202)
  uploadBulkResults(
    @UploadedFile() file: Express.Multer.File,
    @Body() bulkResultDto: BulkResultDto,
  ) {
    this.resultService.processBulk(file, bulkResultDto);
    return { status: 'success', data: null };
  }
}
