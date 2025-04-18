import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopService {
  constructor(private readonly prisma: PrismaService) {}

  async teacherRating() {
    const users = this.prisma.user.findMany();
    const userWithEvents = await Promise.all(
      (await users).map(async (user) => {
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
    if (userWithEvents.length > 5) {
      return userWithEvents.slice(0, 5);
    }
    return userWithEvents;
  }

  async topForStudents(filter: string) {
    let department;
    if (filter.includes(':')) {
      // Разделяем строку на фильтр и название отделения
      department = filter.split(':')[1];
      filter = 'department';
    }
    switch (filter) {
      case 'allGroupes':
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

        const groupResult = groups.map((group) => {
          const totalScore = group.students.reduce((sum, student) => {
            return (
              sum +
              student.studentEvent.reduce((studentSum, event) => {
                return studentSum + event.point;
              }, 0)
            );
          }, 0);

          return {
            groupId: group.id,
            groupName: group.groupeName,
            departmentName: group.department.departmentName,
            totalScore: totalScore,
          };
        });

        return groupResult.sort((a, b) => b.totalScore - a.totalScore);
      case 'allDepartments':
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

        const departmentResult = departments.map((department) => {
          let departmentTotalScore = 0;
          let totalStudents = 0;

          department.groupes.forEach((group) => {
            group.students.forEach((student) => {
              totalStudents++;
              departmentTotalScore += student.studentEvent.reduce(
                (sum, event) => {
                  return sum + event.point;
                },
                0,
              );
            });
          });

          return {
            departmentId: department.id,
            departmentName: department.departmentName,
            totalScore: departmentTotalScore,
            totalGroups: department.groupes.length,
            totalStudents: totalStudents,
          };
        });

        return departmentResult.sort((a, b) => b.totalScore - a.totalScore);
      case 'department':
        const groupes = this.prisma.groupe.findMany({
          include: {
            department: true,
            students: {
              include: {
                studentEvent: true,
              },
            },
          },
        });
        const groupesFromDepartment = (await groupes).filter((groupe) => {
          if (groupe.department.departmentName == department) {
            return groupe;
          }
        });

        const result = groupesFromDepartment.map((group) => {
          const totalScore = group.students.reduce((sum, student) => {
            return (
              sum +
              student.studentEvent.reduce((studentSum, event) => {
                return studentSum + event.point;
              }, 0)
            );
          }, 0);

          return {
            groupId: group.id,
            groupName: group.groupeName,
            totalScore: totalScore,
          };
        });

        return result;
      default:
        throw new UnprocessableEntityException('Был передан неверный фильтр');
    }
  }
}
