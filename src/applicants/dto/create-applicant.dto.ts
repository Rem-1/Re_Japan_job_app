import { IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, IsString } from "class-validator";
import { Category, Level } from "src/positions/enums/positions.enums";

export class CreateApplicantDto {

    @IsEmail()
    @IsDefined()
    email: string

    @IsArray()
    @IsDefined()
    @IsEnum(Category, { each: true })
    categories: Array<string>;

    @IsString()
    @IsDefined()
    @IsEnum(Level)
    level: string;

    @IsBoolean()
    japaneseKnowledge: boolean
}
