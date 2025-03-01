import { Module } from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { GroupeController } from './groupe.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GroupeController],
  providers: [GroupeService, PrismaService],
})
export class GroupeModule {}
