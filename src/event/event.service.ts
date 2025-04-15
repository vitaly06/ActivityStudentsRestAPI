import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddEvent } from './event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async addEvent(body: { eventName: string }): Promise<Event> {
    return this.prisma.event.create({
      data: body,
    });
  }

  async removeEvent(id: number) {
    return this.prisma.event.delete({
      where: { id: Number(id) },
    });
  }

  async updateEvent(id: number, data: AddEvent): Promise<Event> {
    return this.prisma.event.update({
      where: { id: Number(id) },
      data,
    });
  }

  async findAll(): Promise<Event[]> {
    const events = this.prisma.event.findMany();
    return (await events).map((event) => {
      return {
        ...event,
        eventName: `${event.eventName} (${this.formatDate(event.eventDate)})`,
      };
    });
  }

  private formatDate(date: Date): string {
    if (!date) return ''; // Проверка на случай, если дата отсутствует
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
