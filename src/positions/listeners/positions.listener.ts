import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import sendMail from 'src/applicants/mailSender/mailSender';
import { CreatePositionDto } from '../dto/create-position.dto';
import { Position } from '../entities/position.entity';
import { Op } from 'sequelize';
import { Applicant } from 'src/applicants/entities/applicant.entity';

@Injectable()
export class PositionsListener {
  constructor(
    @Inject('APPLICATIONS_REPOSITORY')
    private applicantRepository: typeof Applicant
  ){}

  @OnEvent('positionAddedEmit')
  handleEvent(position: CreatePositionDto, msg: string) {
    this.handlePositionChanges(position, msg)
  }


  @OnEvent('positionDeletedEmit')
  secondEvent(position: Position, msg: string) {
    this.handlePositionChanges(position, msg)
  }

  async handlePositionChanges(position: Position | CreatePositionDto, msg: string) {
    const { category, level, japaneseRequired } = position
    let positionToFind = {
      categories: {
        [Op.contains]: [category]
      },
      level: level
    }
    if(japaneseRequired != false){
        Object.assign(positionToFind, { 
          japaneseKnowledge: japaneseRequired })
    }

    const applicants = await this.applicantRepository.findAll({
      where: positionToFind
    })

    if(!applicants){
      console.log('No Value(s).')
    }else{
      applicants.forEach(item => {
        sendMail(item.email, position, msg)
      })
    }
  }
}

