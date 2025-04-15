import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Студент')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('all/:groupeId')
  async allStudentsByGroupe(@Param('groupeId') id: number) {
    return this.studentService.allStudentsByGroupe(id);
  }

  @Get('profile/:studentId')
  async getProfileForStudent(
    @Param('studentId') id: number,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string, // Параметр для кастомного промежутка
  ) {
    return this.studentService.profile(id, sort, customRange); // Передаем customRange
  }

  @Get(':studentId')
  async getStudentById(@Param('studentId') id: number) {
    return this.studentService.studentById(id);
  }
}
