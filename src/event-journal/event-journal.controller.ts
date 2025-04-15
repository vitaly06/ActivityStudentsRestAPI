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
  async getJournalForAllStudents() {
    return this.eventJournalService.allJournalForStudents();
  }

  @Get(':groupeId')
  async getJournalForGroupe(
    @Param('groupeId') groupeId: number,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string,
  ) {
    return this.eventJournalService.getJournalForGroupe(
      groupeId,
      sort,
      customRange,
    );
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
