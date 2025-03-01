import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get("all")
  async allDepartments(){
    return this.departmentService.allDepartments()
  }

  @Get(":id")
  async departmentById(@Param("id") id: number){
    return this.departmentService.departmentById(id)
  }
}
