import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRatingDto } from './event-rating.dto';

@Injectable()
export class EventRatingService {
    constructor(private readonly prisma: PrismaService){}

    async getJournal() {
        // Получаем все мероприятия
        const events = await this.prisma.event.findMany();
    
        // Получаем все записи рейтингов
        const eventRatings = await this.prisma.eventRating.findMany();
    
        // Создаем объект для хранения данных о рейтингах
        const ratingMap: { [eventId: number]: { total: number; count: number } } = {};
    
        // Заполняем объект ratingMap данными из eventRatings
        for (const rating of eventRatings) {
            if (!ratingMap[rating.eventId]) {
                ratingMap[rating.eventId] = { total: 0, count: 0 };
            }
            ratingMap[rating.eventId].total += rating.point;
            ratingMap[rating.eventId].count += 1;
        }
    
        // Формируем результат
        const result = events.map(event => {
            const ratingData = ratingMap[event.id] || { total: 0, count: 0 };
            return {
                eventId: event.id,
                eventName: event.eventName,
                rating: ratingData.count > 0 ? ratingData.total / ratingData.count : 0, // Средний рейтинг
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
