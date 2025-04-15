import { Injectable } from '@nestjs/common';
import { EventType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddEventTypeDto } from './add-type.dto';

@Injectable()
export class EventTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<EventType[]> {
    return this.prisma.eventType.findMany();
  }

  async addEventType(body: AddEventTypeDto) {
    return this.prisma.eventType.create({
      data: {
        typeName: body.typeName,
      },
    });
  }
}
