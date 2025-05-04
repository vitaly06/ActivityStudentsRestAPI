import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  async departmentById(departmentId: number) {
    return this.prisma.department.findUnique({
      where: { id: Number(departmentId) },
    });
  }
}
