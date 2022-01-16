import { Controller, Get, Post, Body, Patch, Delete, Query, Param, ParseIntPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { SearchPositionDto } from './dto/search-position.dto';
import { Position } from './entities/position.entity';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto):Promise<string> {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  findAll(@Query() SearchPositionDto: SearchPositionDto):Promise<Position[]> {
    return this.positionsService.findAll(SearchPositionDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Position> {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePositionDto: UpdatePositionDto):Promise<void> {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.positionsService.remove(id);
  }
}
