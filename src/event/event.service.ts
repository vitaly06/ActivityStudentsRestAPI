import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService){}

    async addEvent(body: {eventName: string}): Promise<Event>{
        return this.prisma.event.create({
            data: body
        })
    }

    async removeEvent(id: number){
        return this.prisma.event.delete({
            where: {id: Number(id)}
        })
    }

    async findAll(): Promise<Event[]>{
        return this.prisma.event.findMany()
    }
}
