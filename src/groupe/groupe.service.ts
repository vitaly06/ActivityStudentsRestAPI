import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupeService {
    constructor(private readonly prisma: PrismaService){}

    async allGroupesByDepartment(departmentId: number){
        return this.prisma.groupe.findMany({
            where: {departmentId: Number(departmentId)}
        })
    }

    async groupeById(groupeId: number){
        return this.prisma.groupe.findUnique({
            where: {id: Number(groupeId)}
        })
    }
}
