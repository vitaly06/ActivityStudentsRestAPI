import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckAdmin implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('CheckAdmin middleware triggered for:', req.path);
    const token = req.cookies?.access_token;
    console.log(token);
    console.log('1');
    if (!token) {
      throw new UnauthorizedException('Вы не авторизованы');
    }
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
        include: {
          role: true,
        },
      });

      if (!user || user.role.name !== 'admin') {
        // Исправлено условие
        throw new ForbiddenException('Требуются права администратора');
      }

      next();
    } catch (err) {
      throw new ForbiddenException(
        'Недействительный токен или недостаточно прав',
      );
    }
  }
}
