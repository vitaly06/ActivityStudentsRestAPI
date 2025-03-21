import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventJournalService {
    constructor(private readonly prisma: PrismaService){}

    async getJournalForGroupe(groupeId: number, sort: string = "all", customRange?: string) {
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
                events: [] as Array<{ name: string; point: number; date: string }> // Добавляем дату
            };
    
            // Создаем объект для хранения ID мероприятий, которые уже есть у студента
            const eventIdsWithPoints: { [key: number]: number } = {};
    
            // Заполняем события студента
            for (const record of studentRecords) {
                const event = await this.prisma.event.findUnique({
                    where: { id: Number(record.eventId) }
                });
                if (event) {
                    eventIdsWithPoints[event.id] = record.point; 
                    resultStudent.events.push({
                        name: event.eventName,
                        point: record.point,
                        date: this.formatDate(event.eventDate) 
                    });
                }
            }
    
            // Проверяем, есть ли мероприятия, которые отсутствуют у студента
            for (const event of events) {
                if (!(event.id in eventIdsWithPoints)) {
                    // Если мероприятия нет, добавляем его с 0 баллами
                    resultStudent.events.push({
                        name: event.eventName,
                        point: 0,
                        date: this.formatDate(event.eventDate) // Форматируем дату
                    });
                }
            }
    
            // Фильтрация событий в зависимости от параметра sort
            const currentDate = new Date();
            let filteredEvents = resultStudent.events;
    
            switch (sort) {
                case "week":
                    // Фильтр за последнюю неделю
                    filteredEvents = resultStudent.events.filter(event => {
                        const eventDate = new Date(event.date.split('.').reverse().join('-'));
                        const weekAgo = new Date(currentDate);
                        weekAgo.setDate(currentDate.getDate() - 7);
                        return eventDate >= weekAgo && eventDate <= currentDate;
                    });
                    break;
    
                case "month":
                    // Фильтр за последний месяц
                    filteredEvents = resultStudent.events.filter(event => {
                        const eventDate = new Date(event.date.split('.').reverse().join('-'));
                        const monthAgo = new Date(currentDate);
                        monthAgo.setMonth(currentDate.getMonth() - 1);
                        return eventDate >= monthAgo && eventDate <= currentDate;
                    });
                    break;
    
                case "halfYear":
                    // Фильтр за последние полгода
                    filteredEvents = resultStudent.events.filter(event => {
                        const eventDate = new Date(event.date.split('.').reverse().join('-'));
                        const halfYearAgo = new Date(currentDate);
                        halfYearAgo.setMonth(currentDate.getMonth() - 6);
                        return eventDate >= halfYearAgo && eventDate <= currentDate;
                    });
                    break;
    
                case "custom":
                    // Фильтр по кастомному промежутку
                    if (customRange) {
                        const [startDateStr, endDateStr] = customRange.split('-');
                        const startDate = new Date(startDateStr.split('.').reverse().join('-'));
                        const endDate = new Date(endDateStr.split('.').reverse().join('-'));
    
                        filteredEvents = resultStudent.events.filter(event => {
                            const eventDate = new Date(event.date.split('.').reverse().join('-'));
                            return eventDate >= startDate && eventDate <= endDate;
                        });
                    }
                    break;
    
                case "all":
                default:
                    // Без фильтра (все события)
                    break;
            }
    
            // Разделяем события на две группы: с "аттестацией" и без
            const attestationEvents = filteredEvents.filter(event => event.name.toLowerCase().includes('аттестация'));
            const otherEvents = filteredEvents.filter(event => !event.name.toLowerCase().includes('аттестация'));
    
            // Сортируем каждую группу по дате от текущей к прошлой
            attestationEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
            otherEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
    
            // Объединяем две группы, помещая события с "аттестацией" в начало
            const sortedEvents = [...attestationEvents, ...otherEvents];
    
            // Добавляем отфильтрованные и отсортированные события в результат
            res.push({
                ...resultStudent,
                events: sortedEvents
            });
        }
    
        return res;
    }

    async getJournalForStudent(studentId: number, sort: string = "all", customRange?: string) {
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
            events: [] as Array<{ name: string; point: number; date: string }>
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
                    point: record.point,
                    date: this.formatDate(event.eventDate) // Форматируем дату
                });
            }
        }
    
        // Проверяем, есть ли мероприятия, которые отсутствуют у студента
        for (const event of events) {
            if (!(event.id in eventIdsWithPoints)) {
                // Если мероприятия нет, добавляем его с 0 баллами
                resultStudent.events.push({
                    name: event.eventName,
                    point: 0,
                    date: this.formatDate(event.eventDate) // Форматируем дату
                });
            }
        }
    
        // Фильтрация событий в зависимости от параметра sort
        const currentDate = new Date();
        let filteredEvents = resultStudent.events;
    
        switch (sort) {
            case "week":
                // Фильтр за последнюю неделю
                filteredEvents = resultStudent.events.filter(event => {
                    const eventDate = new Date(event.date.split('.').reverse().join('-'));
                    const weekAgo = new Date(currentDate);
                    weekAgo.setDate(currentDate.getDate() - 7);
                    return eventDate >= weekAgo && eventDate <= currentDate;
                });
                break;
    
            case "month":
                // Фильтр за последний месяц
                filteredEvents = resultStudent.events.filter(event => {
                    const eventDate = new Date(event.date.split('.').reverse().join('-'));
                    const monthAgo = new Date(currentDate);
                    monthAgo.setMonth(currentDate.getMonth() - 1);
                    return eventDate >= monthAgo && eventDate <= currentDate;
                });
                break;
    
            case "halfYear":
                // Фильтр за последние полгода
                filteredEvents = resultStudent.events.filter(event => {
                    const eventDate = new Date(event.date.split('.').reverse().join('-'));
                    const halfYearAgo = new Date(currentDate);
                    halfYearAgo.setMonth(currentDate.getMonth() - 6);
                    return eventDate >= halfYearAgo && eventDate <= currentDate;
                });
                break;
    
            case "custom":
                // Фильтр по кастомному промежутку
                if (customRange) {
                    const [startDateStr, endDateStr] = customRange.split('-');
                    const startDate = new Date(startDateStr.split('.').reverse().join('-'));
                    const endDate = new Date(endDateStr.split('.').reverse().join('-'));
    
                    filteredEvents = resultStudent.events.filter(event => {
                        const eventDate = new Date(event.date.split('.').reverse().join('-'));
                        return eventDate >= startDate && eventDate <= endDate;
                    });
                }
                break;
    
            case "all":
            default:
                // Без фильтра (все события)
                break;
        }
    
        // Разделяем события на две группы: с "аттестацией" и без
        const attestationEvents = filteredEvents.filter(event => event.name.toLowerCase().includes('аттестация'));
        const otherEvents = filteredEvents.filter(event => !event.name.toLowerCase().includes('аттестация'));
    
        // Сортируем каждую группу по дате от текущей к прошлой
        attestationEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
        otherEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
    
        // Объединяем две группы, помещая события с "аттестацией" в начало
        const sortedEvents = [...attestationEvents, ...otherEvents];
    
        // Возвращаем отфильтрованные и отсортированные события
        return {
            ...resultStudent,
            events: sortedEvents
        };
    }
    
    // Вспомогательная функция для форматирования даты
    private formatDate(date: Date): string {
        if (!date) return ''; // Проверка на случай, если дата отсутствует
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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
            events: Array<{ name: string; point: number; date: string }>;
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
                events: [] as Array<{ name: string; point: number; date: string }>,
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
                        date: this.formatDate(event.eventDate), // Форматируем дату
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
                        date: this.formatDate(event.eventDate), // Форматируем дату
                    });
                }
            }
    
            // Разделяем события на две группы: с "аттестацией" и без
            const attestationEvents = studentData.events.filter(event => event.name.toLowerCase().includes('аттестация'));
            const otherEvents = studentData.events.filter(event => !event.name.toLowerCase().includes('аттестация'));
    
            // Сортируем каждую группу по дате от текущей к прошлой
            attestationEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
            otherEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());
    
            // Объединяем две группы, помещая события с "аттестацией" в начало
            const sortedEvents = [...attestationEvents, ...otherEvents];
    
            // Добавляем данные студента в результат
            result.push({
                ...studentData,
                events: sortedEvents,
            });
        }
    
        return result;
    }
}

