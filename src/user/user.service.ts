import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async profileForUser (id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: Number(id) }
        });
        if (!user) {
            throw new BadRequestException("Данный пользователь не найден");
        }
    
        const { id: userId, fullName, login, roleId } = user;
    
        const role = await this.prisma.role.findUnique({
            where: { id: roleId }
        });
        if (!role) {
            throw new BadRequestException("Роль пользователя не найдена");
        }
    
        const res = {
            id: userId,
            fullName,
            login,
            roleName: role.name,
        };
    
        return res;
    }
}
