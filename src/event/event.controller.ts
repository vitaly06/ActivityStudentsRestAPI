import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            eventName: {
                type: 'string',
                example: 'Урок Цифры', // Пример значения
            },
        },
        required: ['eventName'], // Обязательные поля
    },
})
  @Post("addEvent")
  async addEvent(@Body() body: {eventName: string}): Promise<Event>{
    return this.eventService.addEvent(body)
  }

  @Delete(":id")
  async removeEvent(@Param("id") id: number){
    return this.eventService.removeEvent(id)
  }

  @Get("allEvents")
  async findAll(): Promise<Event[]>{
    return this.eventService.findAll()
  }
}
