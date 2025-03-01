import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { GroupeModule } from './groupe/groupe.module';
import { DepartmentModule } from './department/department.module';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [StudentModule, GroupeModule, DepartmentModule],
  controllers: [],
  providers: [PrismaClient, PrismaService],
})
export class AppModule {}
