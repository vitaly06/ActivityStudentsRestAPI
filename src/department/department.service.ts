import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
    constructor(private readonly prisma: PrismaService){}
    
    async allDepartments(){
        return this.prisma.department.findMany()
    }

    async departmentById(departmentId: number){
        return this.prisma.department.findUnique({
            where: {id: Number(departmentId)}
        })
    }
}
