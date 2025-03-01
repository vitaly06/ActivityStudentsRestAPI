import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService){}

    async allStudentsByGroupe(id: number){
        return this.prisma.student.findMany({
            where: {groupeId: Number(id)}
        })
    }

    async studentById(studentId: number){
        return this.prisma.student.findUnique({
            where: {id: Number(studentId)}
        })
    }
}
