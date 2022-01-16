import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantsService.create(createApplicantDto);
  }

  @Get()
  findAll() {
    return this.applicantsService.findAll();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() CreateApplicantDto: CreateApplicantDto) {
    return this.applicantsService.update(id, CreateApplicantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicantsService.remove(id);
  }
}
