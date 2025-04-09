import { Controller, Get, Param, Query } from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { ApiTags } from '@nestjs/swagger';
import { Groupe } from '@prisma/client';

@ApiTags('Группа')
@Controller('groupe')
export class GroupeController {
  constructor(private readonly groupeService: GroupeService) {}
  @Get('all/:departmentId')
  async allGroupesByDepartment(
    @Param('departmentId') departmentId: number,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string,
  ) {
    return this.groupeService.allGroupesByDepartment(
      departmentId,
      sort,
      customRange,
    );
  }

  @Get('all')
  async allGroupes(): Promise<Groupe[]> {
    return this.groupeService.allGroupes();
  }

  @Get(':groupeId')
  async getGroupeById(@Param('groupeId') groupeId: number) {
    return this.groupeService.groupeById(groupeId);
  }

  @Get('allCourse/:courseId')
  async allGroupesByCourse(
    @Param('courseId') courseId: number,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string,
  ) {
    return this.groupeService.allByCourse(courseId, sort, customRange);
  }
}
