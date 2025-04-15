import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventTypeController],
  providers: [EventTypeService, PrismaService],
})
export class EventTypeModule {}
