import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Applicant } from './entities/applicant.entity';


@Module({
  imports:[DatabaseModule],
  controllers: [ApplicantsController],
  providers: [
    ApplicantsService,
      {
          provide: 'APPLICATIONS_REPOSITORY',
          useValue: Applicant
      }
  ]
})
export class ApplicantsModule {}
