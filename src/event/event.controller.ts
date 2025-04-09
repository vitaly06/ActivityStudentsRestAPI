import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { AddEvent } from './event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('addEvent')
  async addEvent(@Body() body: AddEvent): Promise<Event> {
    return this.eventService.addEvent(body);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: number,
    @Body() body: AddEvent,
  ): Promise<Event> {
    return this.eventService.updateEvent(id, body);
  }

  @Delete(':id')
  async removeEvent(@Param('id') id: number) {
    return this.eventService.removeEvent(id);
  }

  @Get('allEvents')
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }
}
