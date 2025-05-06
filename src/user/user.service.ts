import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async profileForAdmin(token: string) {
    const decodeToken = jwtDecode.jwtDecode(token);
    const id = decodeToken.sub;
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new BadRequestException('Данный пользователь не найден');
    }

    const { id: userId, fullName, login, roleId } = user;

    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new BadRequestException('Роль пользователя не найдена');
    }

    const res = {
      id: userId,
      fullName,
      login,
      roleName: role.name,
    };

    return res;
  }

  async allUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
      },
    });
  }

  async getUserProfile(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        fullName: true,
        Event: {
          select: {
            id: true,
            eventName: true,
            eventDate: true,
            eventRating: {
              select: {
                point: true,
                userId: true,
              },
            },
            studentEvent: {
              select: {
                point: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error(`Пользователь с id ${id} не найден`);
    }

    const result = {
      id: user.id,
      fullName: user.fullName,
      Event: user.Event.map((event) => {
        // Расчёт рейтинга
        const ratings = event.eventRating;
        const total = ratings.reduce((sum, rating) => sum + rating.point, 0);
        const participantsCount = event.studentEvent.filter(
          (se) => se.point === 1,
        ).length;

        return {
          id: event.id,
          eventName: event.eventName,
          eventDate: this.formatDate(event.eventDate),
          total,
          participantsCount,
        };
      }),
    };

    return result;
  }

  private formatDate(date: Date | null): string {
    return date ? new Date(date).toLocaleDateString() : 'Не указано';
  }
}
