import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Отделение")
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get("all")
  @ApiResponse({status: 200, description: "Получение всех отделений"})
  async allDepartments(){
    return this.departmentService.allDepartments()
  }

  @Get(":id")
  async departmentById(@Param("id") id: number){
    return this.departmentService.departmentById(id)
  }
}
