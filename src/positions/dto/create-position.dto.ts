import { IsBoolean, IsDefined, IsEnum, IsString } from "class-validator";
import { Category, Level } from "../enums/positions.enums";

export class CreatePositionDto {

    @IsString()
    @IsDefined()
    @IsEnum(Category)
    category: string;

    @IsString()
    @IsDefined()
    @IsEnum(Level)
    level: string;

    @IsString()
    @IsDefined()
    company: string

    @IsString()
    description: string

    @IsBoolean()
    japaneseRequired: boolean
}
