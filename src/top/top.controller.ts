import { Controller, Get, Query } from '@nestjs/common';
import { TopService } from './top.service';

@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}

  @Get('teacherRating')
  async getTeacherRating() {
    return this.topService.teacherRating();
  }

  @Get('filterTop')
  async topForStudents(@Query('filter') filter: string) {
    return this.topService.topForStudents(filter);
  }
}
