import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Filter } from './filter.class';

@Injectable()
export class FiltersService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilteredData(
    type: 'journal' | 'departments' | 'groupes',
    id?: number,
    sort: string = 'all',
    customRange?: string,
  ) {
    switch (type) {
      case 'journal':
        return this.getJournalForGroupe(id, sort, customRange);
      case 'departments':
        return this.allDepartments(sort, customRange);
      case 'groupes':
        return this.allGroupesByDepartment(id, sort, customRange);
      default:
        throw new Error(
          'Неверный тип данных. Допустимые значения: journal, departments, groupes',
        );
    }
  }

  private async getJournalForGroupe(
    groupeId: number,
    sort: string = 'all',
    customRange?: string,
  ) {
    if (!groupeId) {
      throw new Error('groupeId обязателен для типа journal');
    }

    const res: Array<any> = [];

    const students = await this.prisma.student.findMany({
      where: { groupeId: Number(groupeId) },
    });

    const events = await this.prisma.event.findMany();
    const eventMap = new Map(events.map((event) => [event.id, event]));

    for (const student of students) {
      const studentRecords = await this.prisma.studentEvent.findMany({
        where: { studentId: Number(student.id) },
      });

      const resultStudent = {
        studentId: student.id,
        fullName: student.fullName,
        events: [] as Array<{ name: string; point: number; date: string }>,
      };

      const eventIdsWithPoints: { [key: number]: number } = {};

      for (const record of studentRecords) {
        const event = eventMap.get(Number(record.eventId));
        if (event) {
          eventIdsWithPoints[event.id] = record.point;
          resultStudent.events.push(
            Filter.createEventForStudent(
              event.eventName,
              event.eventDate,
              record.point,
            ),
          );
        }
      }

      for (const event of events) {
        if (!(event.id in eventIdsWithPoints)) {
          resultStudent.events.push(
            Filter.createEventForStudent(event.eventName, event.eventDate, 0),
          );
        }
      }

      resultStudent.events = Filter.sort(
        resultStudent.events,
        sort,
        customRange,
      );
      res.push(resultStudent);
    }

    return res;
  }

  private async allDepartments(sort: string = 'all', customRange?: string) {
    const allDepartments = await this.prisma.department.findMany({
      include: {
        groupes: {
          include: {
            students: {
              include: {
                studentEvent: {
                  include: {
                    event: true,
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

    const allEvents = await this.prisma.event.findMany();

    const result = await Promise.all(
      allDepartments.map(async (department) => {
        const eventPoints: { [key: string]: number } = {};

        department.groupes.forEach((groupe) => {
          groupe.students.forEach((student) => {
            student.studentEvent.forEach((event) => {
              if (!eventPoints[event.eventId]) {
                eventPoints[event.eventId] = 0;
              }
              eventPoints[event.eventId] += event.point;
            });
          });
        });

        const eventsWithPoints = allEvents.map((event) =>
          Filter.createEvent(
            event.eventName,
            event.eventDate,
            eventPoints[event.id] || 0,
          ),
        );

        const sortedEvents = Filter.sort(eventsWithPoints, sort, customRange);

        return {
          id: department.id,
          departmentName: department.departmentName,
          events: sortedEvents,
        };
      }),
    );

    return result;
  }

  private async allGroupesByDepartment(
    departmentId: number,
    sort: string = 'all',
    customRange?: string,
  ) {
    if (!departmentId) {
      throw new Error('departmentId обязателен для типа groupes');
    }

    const groupes = await this.prisma.groupe.findMany({
      where: { departmentId: Number(departmentId) },
      include: {
        students: {
          include: {
            studentEvent: {
              include: {
                event: true,
              },
            },
          },
        },
      },
    });

    const allEvents = await this.prisma.event.findMany();

    const result = await Promise.all(
      groupes.map(async (groupe) => {
        const eventPoints: { [key: string]: number } = {};

        groupe.students.forEach((student) => {
          student.studentEvent.forEach((event) => {
            if (!eventPoints[event.eventId]) {
              eventPoints[event.eventId] = 0;
            }
            eventPoints[event.eventId] += event.point;
          });
        });

        const eventsWithPoints = allEvents.map((event) =>
          Filter.createEvent(
            event.eventName,
            event.eventDate,
            eventPoints[event.id] || 0,
          ),
        );

        const sortedEvents = Filter.sort(eventsWithPoints, sort, customRange);

        return {
          id: groupe.id,
          groupeName: groupe.groupeName,
          events: sortedEvents,
        };
      }),
    );

    return result;
  }
}
