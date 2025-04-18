import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async allDepartments(sort: string = 'all', customRange?: string) {
    const allDepartments = await this.prisma.department.findMany({
      include: {
        groupes: {
          include: {
            students: {
              include: {
                studentEvent: {
                  include: {
                    event: true, // Включаем данные о мероприятии
                  },
                },
              },
            },
          },
        },
      },
    });

    if (allDepartments.length === 0) {
      console.log('Нет департаментов в базе данных.');
      return [];
    }

    // Получаем все мероприятия, чтобы использовать их в ответе
    const allEvents = await this.prisma.event.findMany();

    // Формируем ответ в нужном формате
    const result = await Promise.all(
      allDepartments.map(async (department) => {
        // Создаем объект для хранения баллов за каждое мероприятие
        const eventPoints: { [key: string]: number } = {};

        // Обрабатываем группы и суммируем баллы за мероприятия
        department.groupes.forEach((groupe) => {
          groupe.students.forEach((student) => {
            student.studentEvent.forEach((event) => {
              if (!eventPoints[event.eventId]) {
                eventPoints[event.eventId] = 0; // Инициализируем, если еще нет
              }
              eventPoints[event.eventId] += event.point; // Суммируем баллы
            });
          });
        });

        // Формируем массив мероприятий с их баллами и датами
        const eventsWithPoints = allEvents.map((event) => ({
          name: `${event.eventName} (${this.formatDate(event.eventDate)})`,
          point: eventPoints[event.id] || 0, // Если нет баллов, ставим 0
          date: event.eventDate ? this.formatDate(event.eventDate) : null, // Форматируем дату
        }));

        // Фильтрация событий в зависимости от параметра sort
        const currentDate = new Date();
        let filteredEvents = eventsWithPoints;

        switch (sort) {
          case 'week':
            // Фильтр за последнюю неделю
            filteredEvents = eventsWithPoints.filter((event) => {
              const eventDate = new Date(
                event.date.split('.').reverse().join('-'),
              );
              const weekAgo = new Date(currentDate);
              weekAgo.setDate(currentDate.getDate() - 7);
              return eventDate >= weekAgo && eventDate <= currentDate;
            });
            break;

          case 'month':
            // Фильтр за последний месяц
            filteredEvents = eventsWithPoints.filter((event) => {
              const eventDate = new Date(
                event.date.split('.').reverse().join('-'),
              );
              const monthAgo = new Date(currentDate);
              monthAgo.setMonth(currentDate.getMonth() - 1);
              return eventDate >= monthAgo && eventDate <= currentDate;
            });
            break;

          case 'halfYear':
            // Фильтр за последние полгода
            filteredEvents = eventsWithPoints.filter((event) => {
              const eventDate = new Date(
                event.date.split('.').reverse().join('-'),
              );
              const halfYearAgo = new Date(currentDate);
              halfYearAgo.setMonth(currentDate.getMonth() - 6);
              return eventDate >= halfYearAgo && eventDate <= currentDate;
            });
            break;

          case 'custom':
            // Фильтр по кастомному промежутку
            if (customRange) {
              const [startDateStr, endDateStr] = customRange.split('-');
              const startDate = new Date(
                startDateStr.split('.').reverse().join('-'),
              );
              const endDate = new Date(
                endDateStr.split('.').reverse().join('-'),
              );

              filteredEvents = eventsWithPoints.filter((event) => {
                const eventDate = new Date(
                  event.date.split('.').reverse().join('-'),
                );
                return eventDate >= startDate && eventDate <= endDate;
              });
            }
            break;

          case 'all':
          default:
            // Без фильтра (все события)
            break;
        }

        // Разделяем события на две группы: с "аттестацией" и без
        const attestationEvents = filteredEvents.filter((event) =>
          event.name.toLowerCase().includes('аттестация'),
        );
        const otherEvents = filteredEvents.filter(
          (event) => !event.name.toLowerCase().includes('аттестация'),
        );

        // Сортируем каждую группу по дате от текущей к прошлой
        attestationEvents.sort(
          (a, b) =>
            new Date(b.date.split('.').reverse().join('-')).getTime() -
            new Date(a.date.split('.').reverse().join('-')).getTime(),
        );
        otherEvents.sort(
          (a, b) =>
            new Date(b.date.split('.').reverse().join('-')).getTime() -
            new Date(a.date.split('.').reverse().join('-')).getTime(),
        );

        // Объединяем две группы, помещая события с "аттестацией" в начало
        const sortedEvents = [...attestationEvents, ...otherEvents];

        return {
          id: department.id, // ID департамента
          departmentName: department.departmentName, // Название департамента
          events: sortedEvents, // Мероприятия с баллами и датами
        };
      }),
    );

    return result;
  }

  async departmentById(departmentId: number) {
    return this.prisma.department.findUnique({
      where: { id: Number(departmentId) },
    });
  }

  private formatDate(date: Date): string {
    if (!date) return ''; // Проверка на случай, если дата отсутствует
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
