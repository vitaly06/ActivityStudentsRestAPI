import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addUser, LoginUser } from './auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: addUser): Promise<User> {
    const checkUser = this.prisma.user.findUnique({
      where: { login: data.login },
    });
    if ((await checkUser)?.password != null) {
      throw new ConflictException('Данный логин уже занят');
    }
    const role = this.prisma.role.findFirst({
      where: { name: data.role },
    });
    if ((await role)?.id == null) {
      throw new ConflictException('Такой роли не существует');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        login: data.login,
        fullName: data.fullName,
        password: hashedPassword,
        roleId: Number((await role).id),
      },
    });
  }

  async login(data: LoginUser): Promise<{ access_token: string }> {
    const checkUser = await this.prisma.user.findUnique({
      where: { login: data.login },
    });

    if (!checkUser) {
      throw new BadRequestException(
        'Пользователя с таким логином не существует',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      checkUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    // Создаем JWT-токен
    const payload = { sub: checkUser.id };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token }; // Возвращаем токен
  }
}
