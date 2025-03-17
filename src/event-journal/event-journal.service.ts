import { BadRequestException, Injectable } from '@nestjs/common';
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
    
            // Создаем объект для хранения ID мероприятий, которые уже есть у студента
            const eventIdsWithPoints: { [key: number]: number } = {};
    
            // Заполняем события студента
            for (const record of studentRecords) {
                const event = await this.prisma.event.findUnique({
                    where: { id: Number(record.eventId) }
                });
                if (event) {
                    eventIdsWithPoints[event.id] = record.point; // Сохраняем баллы для мероприятия
                    resultStudent.events.push({
                        name: event.eventName,
                        point: record.point
                    });
                }
            }
    
            // Проверяем, есть ли мероприятия, которые отсутствуют у студента
            for (const event of events) {
                if (!(event.id in eventIdsWithPoints)) {
                    // Если мероприятия нет, добавляем его с 0 баллами
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

    async getJournalForStudent(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: { id: Number(studentId) }
        });
    
        if (!student) {
            throw new BadRequestException("Студент с таким ID не найден");
        }
    
        // Получаем все мероприятия
        const events = await this.prisma.event.findMany();
    
        // Получаем записи о мероприятиях для данного студента
        const studentRecords = await this.prisma.studentEvent.findMany({
            where: { studentId: Number(studentId) }
        });
    
        // Создаем объект для хранения результата
        const resultStudent = {
            studentId: student.id,
            fullName: student.fullName,
            events: [] as Array<{ name: string; point: number }>
        };
    
        // Создаем объект для хранения ID мероприятий, которые уже есть у студента
        const eventIdsWithPoints: { [key: number]: number } = {};
    
        // Заполняем события студента
        for (const record of studentRecords) {
            const event = await this.prisma.event.findUnique({
                where: { id: Number(record.eventId) }
            });
            if (event) {
                eventIdsWithPoints[event.id] = record.point; // Сохраняем баллы для мероприятия
                resultStudent.events.push({
                    name: event.eventName,
                    point: record.point
                });
            }
        }
    
        // Проверяем, есть ли мероприятия, которые отсутствуют у студента
        for (const event of events) {
            if (!(event.id in eventIdsWithPoints)) {
                // Если мероприятия нет, добавляем его с 0 баллами
                resultStudent.events.push({
                    name: event.eventName,
                    point: 0
                });
            }
        }
    
        return resultStudent;
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

    async allJournalForStudents() {
        // Получаем всех студентов
        const students = await this.prisma.student.findMany();
    
        // Получаем все мероприятия
        const events = await this.prisma.event.findMany();
    
        // Результирующий массив
        const result: Array<{
            studentId: number;
            fullName: string;
            events: Array<{ name: string; point: number }>;
        }> = [];
    
        // Обрабатываем каждого студента
        for (const student of students) {
            // Получаем записи о мероприятиях для текущего студента
            const studentRecords = await this.prisma.studentEvent.findMany({
                where: { studentId: student.id },
            });
    
            // Создаем объект для хранения данных студента
            const studentData = {
                studentId: student.id,
                fullName: student.fullName,
                events: [] as Array<{ name: string; point: number }>,
            };
    
            // Создаем объект для хранения ID мероприятий, которые уже есть у студента
            const eventIdsWithPoints: { [key: number]: number } = {};
    
            // Заполняем события студента
            for (const record of studentRecords) {
                const event = await this.prisma.event.findUnique({
                    where: { id: record.eventId },
                });
                if (event) {
                    eventIdsWithPoints[event.id] = record.point; // Сохраняем баллы для мероприятия
                    studentData.events.push({
                        name: event.eventName,
                        point: record.point,
                    });
                }
            }
    
            // Проверяем, есть ли мероприятия, которые отсутствуют у студента
            for (const event of events) {
                if (!(event.id in eventIdsWithPoints)) {
                    // Если мероприятия нет, добавляем его с 0 баллами
                    studentData.events.push({
                        name: event.eventName,
                        point: 0,
                    });
                }
            }
    
            // Добавляем данные студента в результат
            result.push(studentData);
        }
    
        return result;
    }
}

