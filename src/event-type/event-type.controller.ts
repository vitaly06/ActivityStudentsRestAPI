import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventType } from '@prisma/client';
import { AddEventTypeDto } from './add-type.dto';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}
  @Get('all')
  async getAllTypes(): Promise<EventType[]> {
    return this.eventTypeService.getAll();
  }

  @Post('addEventType')
  async addEventType(@Body() body: AddEventTypeDto): Promise<EventType> {
    return this.eventTypeService.addEventType(body);
  }
}
