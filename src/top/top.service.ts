import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Filter } from '../filters/filter.class';

@Injectable()
export class TopService {
  constructor(private readonly prisma: PrismaService) {}

  async teacherRating() {
    const users = await this.prisma.user.findMany();
    const userWithEvents = await Promise.all(
      users.map(async (user) => {
        const eventCount = await this.prisma.event.count({
          where: {
            userId: user.id,
          },
        });
        return {
          id: user.id,
          fullName: user.fullName,
          eventCount: eventCount,
        };
      }),
    );
    userWithEvents.sort((a, b) => b.eventCount - a.eventCount);
    return userWithEvents.slice(0, 5);
  }

  async topForStudents(
    filter: string,
    sort: string = 'all',
    customRange?: string,
  ) {
    let secondQuery;
    if (filter.includes(':')) {
      const splitQuery = filter.split(':');
      secondQuery = splitQuery[1];
      filter = splitQuery[0];
    }

    // Функция для получения событий с фильтрацией по дате
    const getFilteredEvents = async (studentEvents: any[]) => {
      const events = await Promise.all(
        studentEvents.map(async (se) => {
          const event = await this.prisma.event.findUnique({
            where: { id: se.eventId },
          });
          return {
            name: event?.eventName || '',
            point: se.point,
            date: event?.eventDate ? Filter.formatDate(event.eventDate) : '',
          };
        }),
      );
      return Filter.sort(events, sort, customRange);
    };

    switch (filter) {
      case 'allGroupes': {
        const groups = await this.prisma.groupe.findMany({
          include: {
            students: {
              include: {
                studentEvent: true,
              },
            },
            department: true,
          },
        });

        const groupResult = await Promise.all(
          groups.map(async (group) => {
            const allStudentEvents = group.students.flatMap(
              (s) => s.studentEvent,
            );
            const filteredEvents = await getFilteredEvents(allStudentEvents);
            const totalScore = filteredEvents.reduce(
              (sum, e) => sum + e.point,
              0,
            );

            return {
              groupId: group.id,
              name: group.groupeName,
              departmentName: group.department.departmentName,
              totalScore: totalScore,
            };
          }),
        );

        return groupResult.sort((a, b) => b.totalScore - a.totalScore);
      }

      case 'allDepartments': {
        const departments = await this.prisma.department.findMany({
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

        const departmentResult = await Promise.all(
          departments.map(async (department) => {
            const allStudentEvents = department.groupes.flatMap((g) =>
              g.students.flatMap((s) => s.studentEvent),
            );
            const filteredEvents = await getFilteredEvents(allStudentEvents);
            const totalScore = filteredEvents.reduce(
              (sum, e) => sum + e.point,
              0,
            );
            const totalStudents = department.groupes.reduce(
              (sum, g) => sum + g.students.length,
              0,
            );

            return {
              departmentId: department.id,
              name: department.departmentName,
              totalScore: totalScore,
              totalGroups: department.groupes.length,
              totalStudents: totalStudents,
            };
          }),
        );

        return departmentResult.sort((a, b) => b.totalScore - a.totalScore);
      }

      case 'department': {
        const groupes = await this.prisma.groupe.findMany({
          where: { departmentId: Number(secondQuery) },
          include: {
            students: {
              include: {
                studentEvent: true,
              },
            },
          },
        });

        const result = await Promise.all(
          groupes.map(async (group) => {
            const allStudentEvents = group.students.flatMap(
              (s) => s.studentEvent,
            );
            const filteredEvents = await getFilteredEvents(allStudentEvents);
            const totalScore = filteredEvents.reduce(
              (sum, e) => sum + e.point,
              0,
            );

            return {
              groupId: group.id,
              name: group.groupeName,
              totalScore: totalScore,
            };
          }),
        );

        return result.sort((a, b) => b.totalScore - a.totalScore);
      }

      case 'groupe': {
        const groupe = await this.prisma.groupe.findFirst({
          where: { id: Number(secondQuery) },
          include: {
            students: {
              include: {
                studentEvent: true,
              },
            },
          },
        });

        if (!groupe) {
          throw new UnprocessableEntityException('Группа не найдена');
        }

        const studentResult = await Promise.all(
          groupe.students.map(async (student) => {
            const filteredEvents = await getFilteredEvents(
              student.studentEvent,
            );
            const totalScore = filteredEvents.reduce(
              (sum, e) => sum + e.point,
              0,
            );

            return {
              studentId: student.id,
              name: student.fullName,
              totalScore: totalScore,
            };
          }),
        );

        return studentResult.sort((a, b) => b.totalScore - a.totalScore);
      }

      case 'course': {
        const allGroupes = await this.prisma.groupe.findMany({
          include: {
            students: {
              include: {
                studentEvent: true,
              },
            },
          },
        });

        const groupesFromCourse = allGroupes.filter(
          (groupe) => groupe.groupeName[0] === secondQuery,
        );

        const courseResult = await Promise.all(
          groupesFromCourse.map(async (group) => {
            const allStudentEvents = group.students.flatMap(
              (s) => s.studentEvent,
            );
            const filteredEvents = await getFilteredEvents(allStudentEvents);
            const totalScore = filteredEvents.reduce(
              (sum, e) => sum + e.point,
              0,
            );

            return {
              groupId: group.id,
              name: group.groupeName,
              totalScore: totalScore,
            };
          }),
        );

        return courseResult.sort((a, b) => b.totalScore - a.totalScore);
      }

      default:
        throw new UnprocessableEntityException('Был передан неверный фильтр');
    }
  }
}
