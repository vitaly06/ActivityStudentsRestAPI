import { Controller, Get } from '@nestjs/common';
import { TopService } from './top.service';

@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}

  @Get('teacherRating')
  async getTeacherRating() {
    return this.topService.teacherRating();
  }
}
