import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckAdmin } from 'src/middlewares/admin.middlewares';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, CheckAdmin],
})
export class EventModule {}
