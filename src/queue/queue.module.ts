import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-10880.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: +10880,
        password: 'YDP1THkhaxSee5YavTo6CEDhX9Whzg5u',
      },
    }),
  ],
})
export default class QueueModule {}
