import { Controller, Get, Param } from '@nestjs/common';
import { GroupeService } from './groupe.service';

@Controller('groupe')
export class GroupeController {
  constructor(private readonly groupeService: GroupeService) {}
  @Get("all/:departmentId")
  async allGroupesByDepartment(@Param("departmentId") departmentId: number){
    return this.groupeService.allGroupesByDepartment(departmentId)
  }

  @Get(":groupeId")
  async getGroupeById(@Param("groupeId") groupeId: number){
    return this.groupeService.groupeById(groupeId)
  }
}
