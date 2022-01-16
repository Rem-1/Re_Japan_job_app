import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreatePositionDto } from './create-position.dto';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
    
    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsBoolean()
    japaneseRequired: boolean
}
