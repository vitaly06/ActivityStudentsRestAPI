import { Module } from '@nestjs/common';
import { TopService } from './top.service';
import { TopController } from './top.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TopController],
  providers: [TopService, PrismaService],
})
export class TopModule {}
