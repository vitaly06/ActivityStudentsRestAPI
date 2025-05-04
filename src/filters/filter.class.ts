export class Filter {
  static formatDate(date: Date): string {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  static sort(
    events: Array<{ name: string; point: number; date: string }>,
    sort: string = 'all',
    customRange?: string,
  ): Array<{ name: string; point: number; date: string }> {
    if (!events || !Array.isArray(events)) return [];

    const currentDate = new Date();
    let filteredEvents = events.filter(
      (event) => event && event.name && event.date && event.point !== undefined,
    );

    switch (sort) {
      case 'week':
        filteredEvents = filteredEvents.filter((event) => {
          try {
            const eventDate = new Date(
              event.date.split('.').reverse().join('-'),
            );
            const weekAgo = new Date(currentDate);
            weekAgo.setDate(currentDate.getDate() - 7);
            return eventDate >= weekAgo && eventDate <= currentDate;
          } catch {
            return false;
          }
        });
        break;

      case 'month':
        filteredEvents = filteredEvents.filter((event) => {
          try {
            const eventDate = new Date(
              event.date.split('.').reverse().join('-'),
            );
            const monthAgo = new Date(currentDate);
            monthAgo.setMonth(currentDate.getMonth() - 1);
            return eventDate >= monthAgo && eventDate <= currentDate;
          } catch {
            return false;
          }
        });
        break;

      case 'halfYear':
        filteredEvents = filteredEvents.filter((event) => {
          try {
            const eventDate = new Date(
              event.date.split('.').reverse().join('-'),
            );
            const halfYearAgo = new Date(currentDate);
            halfYearAgo.setMonth(currentDate.getMonth() - 6);
            return eventDate >= halfYearAgo && eventDate <= currentDate;
          } catch {
            return false;
          }
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
              throw new Error('Invalid date format');
            }

            filteredEvents = filteredEvents.filter((event) => {
              try {
                const eventDate = new Date(
                  event.date.split('.').reverse().join('-'),
                );
                return eventDate >= startDate && eventDate <= endDate;
              } catch {
                return false;
              }
            });
          } catch (error) {
            console.error('Error processing customRange:', error);
            return events;
          }
        }
        break;
    }

    const attestationEvents = filteredEvents.filter(
      (event) =>
        event.name &&
        typeof event.name === 'string' &&
        event.name.toLowerCase().includes('аттестация'),
    );

    const otherEvents = filteredEvents.filter(
      (event) =>
        event.name &&
        typeof event.name === 'string' &&
        !event.name.toLowerCase().includes('аттестация'),
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
      point: point || 0,
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
      point: point || 0,
      date: formattedDate,
    };
  }
}
