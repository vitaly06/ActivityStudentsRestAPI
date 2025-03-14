import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { EventJournalService } from './event-journal.service';

@Controller('event-journal')
export class EventJournalController {
  constructor(private readonly eventJournalService: EventJournalService) {}

  @Get(":groupeId")
  async getJournalForGroupe(@Param("groupeId") groupeId: number){
    return this.eventJournalService.getJournalForGroupe(groupeId)
  }

  @Post("save-journal")
  async saveJournal(@Body() data: Array<{ studentId: number; events: Array<{ name: string; point: number }> }>) {
    await this.eventJournalService.saveJournal(data);
    return { message: 'Журнал успешно сохранен' };
  }
}
