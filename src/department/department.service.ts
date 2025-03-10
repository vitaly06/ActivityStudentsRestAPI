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
                                studentEvent: true, 
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
    
        
        const result = await Promise.all(allDepartments.map(async department => {
            // Создаем объект для хранения баллов за каждое мероприятие
            const eventPoints: { [key: string]: number } = {};
    
            // Обрабатываем группы и суммируем баллы за мероприятия
            department.groupes.forEach(groupe => {
                groupe.students.forEach(student => {
                    student.studentEvent.forEach(event => {
                        if (!eventPoints[event.eventId]) {
                            eventPoints[event.eventId] = 0; 
                        }
                        eventPoints[event.eventId] += event.point; 
                    });
                });
            });
    
            
            const events = await this.prisma.event.findMany({
                where: {
                    id: {
                        in: Object.keys(eventPoints).map(Number),
                    },
                },
            });
    
           
            if (events.length === 0) {
                console.log(`Нет мероприятий для департамента ${department.departmentName}.`);
            }
    
            // Формируем массив мероприятий с их баллами
            const eventsWithPoints = events.map(event => ({
                name: event.eventName,
                point: eventPoints[event.id] || 0, 
            }));
    
            return {
                id: department.id, 
                departmentName: department.departmentName, 
                events: eventsWithPoints, 
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
