import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addUser, LoginUser } from './auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}

    async register(data: addUser): Promise<User>{
        const checkUser = this.prisma.user.findUnique({
            where: {login: data.login}
        })
        if((await checkUser)?.password != null){
            throw new ConflictException("Данный логин уже занят")
        }
        const role = this.prisma.role.findFirst({
            where: {name: data.role}
        })
        if((await role)?.id == null){
            throw new ConflictException("Такой роли не существует")
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10)

        return this.prisma.user.create({
            data: {
                login: data.login, fullName: data.fullName, password: hashedPassword, roleId: Number((await role).id)
            }
        })
    }

    async login(data: LoginUser): Promise<{access_token: string}>{
        const checkUser = this.prisma.user.findUnique({
            where: {login: data.login}
        })
        if((await checkUser)?.login == null){
            throw new BadRequestException("Пользователя с таким логином не существует")
        }
        if(await bcrypt.compare(data.password, (await checkUser).password)){
            const payload = {sub: (await checkUser).id}
            return {access_token: await this.jwtService.signAsync(payload)}
        }
        throw new UnauthorizedException("Неверный пароль")
    }
}
