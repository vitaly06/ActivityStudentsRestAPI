import { Module } from '@nestjs/common';
import { EventJournalService } from './event-journal.service';
import { EventJournalController } from './event-journal.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventJournalController],
  providers: [EventJournalService, PrismaService],
})
export class EventJournalModule {}
