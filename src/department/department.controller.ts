import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiTags } from '@nestjs/swagger';
import { Department } from '@prisma/client';

@ApiTags('Отделение')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('all')
  async allDepartments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async departmentById(@Param('id') id: number) {
    return this.departmentService.departmentById(id);
  }
}
