import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventJournalService } from 'src/event-journal/event-journal.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, EventJournalService],
})
export class StudentModule {}
