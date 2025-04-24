import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { FiltersService } from './filters.service';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get(':type')
  @ApiResponse({
    status: 200,
    description: 'Успешное получение отфильтрованных данных',
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный тип данных или параметры',
  })
  @ApiParam({
    name: 'type',
    enum: ['journal', 'departments', 'groupes'],
    description: 'Тип данных для фильтрации',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID группы (для journal) или департамента (для groupes)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['all', 'week', 'month', 'halfYear', 'custom'],
    description: 'Тип сортировки',
  })
  @ApiQuery({
    name: 'customRange',
    required: false,
    description:
      'Кастомный диапазон дат в формате DD.MM.YYYY-DD.MM.YYYY (для sort=custom)',
  })
  async getFilteredData(
    @Param('type') type: 'journal' | 'departments' | 'groupes',
    @Query('id') id?: string,
    @Query('sort') sort: string = 'all',
    @Query('customRange') customRange?: string,
  ) {
    try {
      // Проверяем, что id передан, если это требуется
      if ((type === 'journal' || type === 'groupes') && !id) {
        throw new HttpException(
          `ID обязателен для типа ${type}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const parsedId = id ? Number(id) : undefined;
      if (id && isNaN(parsedId)) {
        throw new HttpException(
          'ID должен быть числом',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.filtersService.getFilteredData(
        type,
        parsedId,
        sort,
        customRange,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка при получении данных',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
