import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRatingDto } from './event-rating.dto';

@Injectable()
export class EventRatingService {
    constructor(private readonly prisma: PrismaService){}

    async getJournal(id) {
        // Получаем все мероприятия
        const events = await this.prisma.event.findMany();
    
        // Получаем все записи рейтингов для всех мероприятий
        const allEventRatings = await this.prisma.eventRating.findMany();
    
        // Получаем оценки конкретного пользователя
        const userEventRatings = await this.prisma.eventRating.findMany({
            where: { userId: Number(id) }
        });
    
        // Создаем объект для хранения данных о рейтингах
        const ratingMap: { [eventId: number]: { total: number; count: number; userRating: number | null } } = {};
    
        // Заполняем объект ratingMap данными из allEventRatings (общие данные)
        for (const rating of allEventRatings) {
            if (!ratingMap[rating.eventId]) {
                ratingMap[rating.eventId] = { total: 0, count: 0, userRating: null };
            }
            ratingMap[rating.eventId].total += rating.point; // Суммируем все оценки
            ratingMap[rating.eventId].count += 1; // Считаем количество оценок
        }
    
        // Добавляем оценку пользователя в ratingMap
        for (const userRating of userEventRatings) {
            if (ratingMap[userRating.eventId]) {
                ratingMap[userRating.eventId].userRating = userRating.point;
            }
        }
    
        // Формируем результат
        const result = events.map(event => {
            const ratingData = ratingMap[event.id] || { total: 0, count: 0, userRating: null };
            return {
                eventId: event.id,
                eventName: event.eventName,
                rating: ratingData.userRating, // Оценка пользователя
                all: ratingData.total, // Общая сумма баллов
                count: ratingData.count, // Количество оценок
            };
        });
    
        return result;
    }

    async saveJournal(data: CreateEventRatingDto[]) {
        // Проходим по каждому элементу массива данных
        for (const item of data) {
            // Проверяем, существует ли уже запись для данного eventId и userId
            const existingRating = await this.prisma.eventRating.findFirst({
                where: {
                    eventId: item.eventId,
                    userId: item.userId,
                },
            });
    
            if (existingRating) {
                // Если запись существует, обновляем её
                await this.prisma.eventRating.update({
                    where: {
                        id: existingRating.id,
                    },
                    data: {
                        point: item.point,
                    },
                });
            } else {
                // Если записи нет, создаем новую
                await this.prisma.eventRating.create({
                    data: {
                        eventId: item.eventId,
                        userId: item.userId,
                        point: item.point,
                    },
                });
            }
        }
    
        return { message: "Журнал успешно сохранен" };
    }
}
