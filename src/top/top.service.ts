import { Injectable } from '@nestjs/common';
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
}
