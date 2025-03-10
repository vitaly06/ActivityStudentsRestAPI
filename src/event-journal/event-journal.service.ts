import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventJournalService {
    constructor(private readonly prisma: PrismaService){}

    async getJournalForGroupe(groupeId: number) {
        const res: Array<any> = []; 
        
        const students = await this.prisma.student.findMany({
            where: { groupeId: Number(groupeId) }
        });
    
        const events = await this.prisma.event.findMany();
    
        for (const student of students) {
            const studentRecords = await this.prisma.studentEvent.findMany({
                where: { studentId: Number(student.id) }
            });
            const resultStudent = {
                studentId: student.id,
                fullName: student.fullName,
                events: [] 
            };
            if (studentRecords.length > 0) {
                for (const record of studentRecords) {
                    const event = await this.prisma.event.findUnique({
                        where: { id: Number(record.eventId) }
                    });
                    if (event) {
                        resultStudent.events.push({
                            name: event.eventName,
                            point: record.point
                        });
                    }
                }
            } else {
                for (const event of events) {
                    resultStudent.events.push({
                        name: event.eventName,
                        point: 0
                    });
                }
            }
            res.push(resultStudent);
        }
        return res; 
    }

    async saveJournal(data: Array<{ studentId: number; events: Array<{ name: string; point: number }> }>) {
        for (const student of data) {
            const studentId = student.studentId;
    
            if (!Array.isArray(student.events)) {
                console.error(`Events for studentId ${studentId} is not an array or is missing.`);
                continue; 
            }
    
            for (const event of student.events) {
                const eventRecord = await this.prisma.event.findFirst({
                    where: { eventName: event.name }
                });
                if (!eventRecord) {
                    console.error(`Event not found: ${event.name}`);
                    continue; // Пропускаем, если событие не найдено
                }
                try {
                    await this.prisma.studentEvent.upsert({
                        where: {
                            studentId_eventId: {
                                studentId: Number(studentId),
                                eventId: eventRecord.id
                            }
                        },
                        update: {
                            point: event.point
                        },
                        create: {
                            studentId: Number(studentId),
                            eventId: eventRecord.id,
                            point: event.point
                        }
                    });
                    console.log(`Successfully upserted studentId: ${studentId}, eventId: ${eventRecord.id}`);
                } catch (error) {
                    console.error(`Error upserting studentId: ${studentId}, eventId: ${eventRecord.id}`, error);
                }
            }
        }
    }
}

