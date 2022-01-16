import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { Applicant } from './entities/applicant.entity';


@Injectable()
export class ApplicantsService {
  constructor(
    @Inject('APPLICATIONS_REPOSITORY')
    private repository: typeof Applicant
  ){}

  async create(createApplicantDto: CreateApplicantDto) {
    try {
      const createdApplicant = await this.repository
      .create(createApplicantDto)

      if(!createdApplicant){
        throw new InternalServerErrorException()
      }

      return createdApplicant;
    } catch (error) {
      if(error.name === 'SequelizeUniqueConstraintError'){
        throw new ConflictException({
          message: 'This email address is already taken!'
        })
      }else{
        return error.name
      }
    }
  }

  async findAll(): Promise<Applicant[]> {
    const applicants = await this.repository.findAll()

    if(!applicants){
      throw new NotFoundException()
    }
    return applicants;
  }

  async update(id: number, CreateApplicantDto: CreateApplicantDto) {
    const updatedApplicant = await this.repository.update(CreateApplicantDto, {
      where:{
        id: id
      }
    })

    if(!updatedApplicant[0]){
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    const removedApplicant = await this.repository.destroy({
      where:{
        id: id
      }
    })

    if(!removedApplicant){
      throw new NotFoundException()
    }
  }
}
