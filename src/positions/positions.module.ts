import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PositionsListener } from './listeners/positions.listener';
import { Position } from './entities/position.entity';
import { Applicant } from 'src/applicants/entities/applicant.entity';


@Module({
  imports:[DatabaseModule],
  controllers: [PositionsController],
  providers: [
    PositionsService,
    PositionsListener,
    {
      provide: 'POSITIONS_REPOSITORY',
      useValue: Position
    },
    {
      provide: 'APPLICATIONS_REPOSITORY',
      useValue: Applicant
    }
  ]
})
export class PositionsModule {}
