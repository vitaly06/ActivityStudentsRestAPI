import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
    constructor(private readonly prisma: PrismaService){}
    
    async allDepartments() {
        // Получаем все департаменты с группами и студентами
        const allDepartments = await this.prisma.department.findMany({
            include: {
                groupes: {
                    include: {
                        students: {
                            include: {
                                studentEvent: true, // Убедитесь, что это правильное имя поля
                            },
                        },
                    },
                },
            },
        });
    
        if (allDepartments.length === 0) {
            console.log("Нет департаментов в базе данных.");
            return [];
        }
    
        // Получаем все мероприятия, чтобы использовать их в ответе
        const allEvents = await this.prisma.event.findMany();
    
        // Формируем ответ в нужном формате
        const result = await Promise.all(allDepartments.map(async department => {
            // Создаем объект для хранения баллов за каждое мероприятие
            const eventPoints: { [key: string]: number } = {};
    
            // Обрабатываем группы и суммируем баллы за мероприятия
            department.groupes.forEach(groupe => {
                groupe.students.forEach(student => {
                    student.studentEvent.forEach(event => {
                        if (!eventPoints[event.eventId]) {
                            eventPoints[event.eventId] = 0; // Инициализируем, если еще нет
                        }
                        eventPoints[event.eventId] += event.point; // Суммируем баллы
                    });
                });
            });
    
            // Формируем массив мероприятий с их баллами
            const eventsWithPoints = allEvents.map(event => ({
                name: event.eventName,
                point: eventPoints[event.id] || 0, // Если нет баллов, ставим 0
            }));
    
            return {
                id: department.id, // ID департамента
                departmentName: department.departmentName, // Название департамента
                events: eventsWithPoints, // Мероприятия с баллами
            };
        }));
    
        return result;
    }

    async departmentById(departmentId: number){
        return this.prisma.department.findUnique({
            where: {id: Number(departmentId)}
        })
    }
}
