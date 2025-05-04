import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all-roles')
  async allRoles(): Promise<Role[]> {
    return this.roleService.allRoles();
  }
}
