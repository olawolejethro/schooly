import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
      },
    }),
  ],
})
export default class QueueModule {}
