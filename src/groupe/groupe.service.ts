import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupeService {
    constructor(private readonly prisma: PrismaService){}

    async allGroupesByDepartment(departmentId: number) {
        // Получаем группы по departmentId
        const groupes = await this.prisma.groupe.findMany({
            where: { departmentId: Number(departmentId) },
            include: {
                students: {
                    include: {
                        studentEvent: true, // Убедитесь, что это правильное имя поля
                    },
                },
            },
        });
    
        // Создаем объект для хранения баллов за каждое мероприятие
        const eventPoints: { [key: string]: number } = {};
    
        // Обрабатываем группы и суммируем баллы за мероприятия
        groupes.forEach(groupe => {
            groupe.students.forEach(student => {
                student.studentEvent.forEach(event => {
                    if (!eventPoints[event.eventId]) {
                        eventPoints[event.eventId] = 0; // Инициализируем, если еще нет
                    }
                    eventPoints[event.eventId] += event.point; // Суммируем баллы
                });
            });
        });
    
        // Получаем список мероприятий с их баллами
        const events = await this.prisma.event.findMany({
            where: {
                id: {
                    in: Object.keys(eventPoints).map(Number), // Получаем ID мероприятий
                },
            },
        });
    
        // Формируем ответ в нужном формате
        const result = groupes.map(groupe => {
            const eventsWithPoints = events.map(event => ({
                name: event.eventName,
                point: eventPoints[event.id] || 0, // Если нет баллов, ставим 0
            }));
    
            return {
                id: groupe.id, // ID группы
                groupeName: groupe.groupeName, // Название группы
                events: eventsWithPoints, // Мероприятия с баллами
            };
        });
    
        return result;
    }

    async groupeById(groupeId: number){
        return this.prisma.groupe.findUnique({
            where: {id: Number(groupeId)}
        })
    }

    async allByCourse(courseId: number) {
        // Получаем все группы
        const allGroupes = await this.prisma.groupe.findMany({
            include: {
                students: {
                    include: {
                        studentEvent: true, // Убедитесь, что это правильное имя поля
                    },
                },
            },
        });
    
        // Фильтруем группы по курсу
        const groupeByCourse = allGroupes.filter(groupe => {
            return groupe.groupeName.charAt(0) === String(courseId);
        });
    
        // Формируем ответ в нужном формате
        const result = await Promise.all(groupeByCourse.map(async groupe => {
            // Создаем объект для хранения баллов за каждое мероприятие
            const eventPoints: { [key: string]: number } = {};
    
            // Обрабатываем студентов и суммируем баллы за мероприятия
            groupe.students.forEach(student => {
                student.studentEvent.forEach(event => {
                    if (!eventPoints[event.eventId]) {
                        eventPoints[event.eventId] = 0; // Инициализируем, если еще нет
                    }
                    eventPoints[event.eventId] += event.point; // Суммируем баллы
                });
            });
    
            // Получаем список мероприятий с их баллами
            const events = await this.prisma.event.findMany({
                where: {
                    id: {
                        in: Object.keys(eventPoints).map(Number), // Получаем ID мероприятий
                    },
                },
            });
    
            // Формируем массив мероприятий с их баллами
            const eventsWithPoints = events.map(event => ({
                name: event.eventName,
                point: eventPoints[event.id] || 0, // Если нет баллов, ставим 0
            }));
    
            return {
                id: groupe.id, // ID группы
                groupeName: groupe.groupeName, // Название группы
                events: eventsWithPoints, // Мероприятия с баллами
            };
        }));
    
        return result;
    }
}
