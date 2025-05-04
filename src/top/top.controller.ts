import { Controller, Get, Query } from '@nestjs/common';
import { TopService } from './top.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Top Ratings')
@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}

  @Get('teacherRating')
  @ApiOperation({ summary: 'Get top 5 teachers by event count' })
  @ApiResponse({
    status: 200,
    description: 'Returns top 5 teachers sorted by events count',
  })
  async getTeacherRating() {
    return this.topService.teacherRating();
  }

  @Get('filterTop')
  @ApiOperation({
    summary: 'Get filtered top ratings',
    description:
      'Returns top ratings with various filters and time period sorting',
  })
  @ApiQuery({
    name: 'filter',
    required: true,
    description: 'Filter type with optional parameter (format: "type:value")',
    examples: {
      allGroups: { value: 'allGroupes', description: 'All groups' },
      allDepartments: {
        value: 'allDepartments',
        description: 'All departments',
      },
      department: {
        value: 'department:1',
        description: 'Groups in department with ID 1',
      },
      group: { value: 'groupe:5', description: 'Students in group with ID 5' },
      course: { value: 'course:2', description: 'Groups from 2nd course' },
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['all', 'week', 'month', 'halfYear', 'custom'],
    description: 'Time period for filtering',
    example: 'month',
  })
  @ApiQuery({
    name: 'customRange',
    required: false,
    description: 'Custom date range (DD.MM.YYYY-DD.MM.YYYY) when sort=custom',
    example: '01.09.2023-31.12.2023',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully filtered top ratings',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity - invalid filter',
  })
  async topForStudents(
    @Query('filter') filter: string,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string,
  ) {
    return this.topService.topForStudents(filter, sort, customRange);
  }
}
