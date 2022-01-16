import { Module } from '@nestjs/common';
import { PositionsModule } from './positions/positions.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicantsModule } from './applicants/applicants.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    PositionsModule,
    ApplicantsModule
  ],
})
export class AppModule {}
