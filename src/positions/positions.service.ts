import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePositionDto } from './dto/create-position.dto';
import { SearchPositionDto } from './dto/search-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @Inject('POSITIONS_REPOSITORY')
    private repository: typeof Position,
    private eventEmitter: EventEmitter2
  ){}


  async create(createPositionDto: CreatePositionDto): Promise<string> {
    const createdPosition = await this.repository.create(createPositionDto)

    if(!createdPosition){
      throw new InternalServerErrorException()
    }

    this.eventEmitter.emit('positionAddedEmit', createPositionDto, 'Position added.')
    return `Position ID:${createdPosition.id} was created in "${this.repository.getTableName()}"`;
  }

  async findAll(queryBuilder: SearchPositionDto): Promise<Position[]> {
    const positions = await this.repository.findAll({
      where: {...queryBuilder}
    })

    return positions;
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.repository.findOne({
      where: {id: id}
    });

    if(!position){
      throw new NotFoundException()
    }

    return position
  }

  async update(id: number, updatePositionDto: UpdatePositionDto):Promise<void> {
    const updatedPosition = await this.repository
    .update(updatePositionDto,{
        where: {id: id}
    });
    
    if(!updatedPosition[0]){
      throw new NotFoundException()
    }
  }

  async remove(id: number):Promise<void> {
    const position: Position = await this.repository.findOne({
      where: {id: id}
    });

    if(!position){
      throw new NotFoundException()
    }

    const deletedPosition = await this.repository
    .destroy({
      where: {id: id}
    })

    const positionToEmit = { 
      category: position.category,
      level: position.level,
      japaneseRequired: position.japaneseRequired
    }

    this.eventEmitter.emit('positionDeletedEmit', positionToEmit, 'Position deleted.')
  }
}
