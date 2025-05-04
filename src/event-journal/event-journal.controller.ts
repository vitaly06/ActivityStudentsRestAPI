import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventJournalService } from './event-journal.service';

@Controller('event-journal')
export class EventJournalController {
  constructor(private readonly eventJournalService: EventJournalService) {}

  @Get('student-journal/:studentId')
  async getJournalForStudent(@Param('studentId') id: number) {
    return this.eventJournalService.getJournalForStudent(id);
  }

  @Get('allStudents')
  async getJournalForAllStudents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventJournalService.allJournalForStudents(page, limit);
  }

  @Get('totalPoints')
  async totalPointsAllStudents() {
    return this.eventJournalService.totalPoints();
  }

  @Post('save-journal')
  async saveJournal(
    @Body()
    data: Array<{
      studentId: number;
      events: Array<{ name: string; point: number }>;
    }>,
  ) {
    await this.eventJournalService.saveJournal(data);
    return { message: 'Журнал успешно сохранен' };
  }
}
