import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Студент")
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("all/:groupeId")
  async allStudentsByGroupe(@Param("groupeId") id: number){
    return this.studentService.allStudentsByGroupe(id)
  }

  @Get("profile/:studentId")  
  async getProfileForStudent(@Param("studentId") id: number){
    return this.studentService.profile(id)
  }

  @Get(":studentId")
  async getStudentById(@Param("studentId") id: number){
    return this.studentService.studentById(id)
  }
}
