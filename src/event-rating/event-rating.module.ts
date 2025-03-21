import { Module } from '@nestjs/common';
import { EventRatingService } from './event-rating.service';
import { EventRatingController } from './event-rating.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventRatingController],
  providers: [EventRatingService, PrismaService],
})
export class EventRatingModule {}
