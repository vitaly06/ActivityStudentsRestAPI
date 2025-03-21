import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventRatingService } from './event-rating.service';
import { CreateEventRatingDto } from './event-rating.dto';

@Controller('event-rating')
export class EventRatingController {
  constructor(private readonly eventRatingService: EventRatingService) {}

  @Get("getJournal")
  async getJournal(){
    return this,this.eventRatingService.getJournal()
  }

  @Post('saveJournal')
  async saveJournal(@Body() data: CreateEventRatingDto[]) {
    return this.eventRatingService.saveJournal(data);
  }
}
