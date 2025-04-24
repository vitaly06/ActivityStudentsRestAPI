export class Filter {
  // Форматирование даты
  static formatDate(date: Date): string {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Универсальный метод для фильтрации и сортировки событий
  static sort(
    events: Array<{ name: string; point: number; date: string }>,
    sort: string = 'all',
    customRange?: string,
  ): Array<{ name: string; point: number; date: string }> {
    const currentDate = new Date();
    let filteredEvents = events;

    switch (sort) {
      case 'week':
        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date.split('.').reverse().join('-'));
          const weekAgo = new Date(currentDate);
          weekAgo.setDate(currentDate.getDate() - 7);
          return eventDate >= weekAgo && eventDate <= currentDate;
        });
        break;

      case 'month':
        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date.split('.').reverse().join('-'));
          const monthAgo = new Date(currentDate);
          monthAgo.setMonth(currentDate.getMonth() - 1);
          return eventDate >= monthAgo && eventDate <= currentDate;
        });
        break;

      case 'halfYear':
        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date.split('.').reverse().join('-'));
          const halfYearAgo = new Date(currentDate);
          halfYearAgo.setMonth(currentDate.getMonth() - 6);
          return eventDate >= halfYearAgo && eventDate <= currentDate;
        });
        break;

      case 'custom':
        if (customRange) {
          try {
            const [startDateStr, endDateStr] = customRange.split('-');
            const startDate = new Date(
              startDateStr.split('.').reverse().join('-'),
            );
            const endDate = new Date(endDateStr.split('.').reverse().join('-'));

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              throw new Error('Неверный формат дат в customRange');
            }

            filteredEvents = events.filter((event) => {
              const eventDate = new Date(
                event.date.split('.').reverse().join('-'),
              );
              return eventDate >= startDate && eventDate <= endDate;
            });
          } catch (error) {
            console.error('Ошибка при обработке customRange:', error);
            return events;
          }
        }
        break;

      case 'all':
      default:
        break;
    }

    const attestationEvents = filteredEvents.filter((event) =>
      event.name.toLowerCase().includes('аттестация'),
    );
    const otherEvents = filteredEvents.filter(
      (event) => !event.name.toLowerCase().includes('аттестация'),
    );

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

    return [...attestationEvents, ...otherEvents];
  }

  static createEvent(
    eventName: string,
    eventDate: Date,
    point: number,
  ): { name: string; point: number; date: string } {
    const formattedDate = this.formatDate(eventDate);
    return {
      name: `${eventName} (${formattedDate})`,
      point,
      date: formattedDate,
    };
  }

  static createEventForStudent(
    eventName: string,
    eventDate: Date,
    point: number,
  ): { name: string; point: number; date: string } {
    const formattedDate = this.formatDate(eventDate);
    return {
      name: `${eventName} ${formattedDate}`,
      point,
      date: formattedDate,
    };
  }
}
