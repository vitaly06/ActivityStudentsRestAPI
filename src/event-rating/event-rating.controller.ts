import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventRatingService } from './event-rating.service';
import { CreateEventRatingDto } from './event-rating.dto';

@Controller('event-rating')
export class EventRatingController {
  constructor(private readonly eventRatingService: EventRatingService) {}

  @Get('getJournal/:userId')
  async getJournal(@Param('userId') id: number) {
    return this, this.eventRatingService.getJournal(id);
  }

  @Post('saveJournal')
  async saveJournal(@Body() data: CreateEventRatingDto[]) {
    return this.eventRatingService.saveJournal(data);
  }
}
