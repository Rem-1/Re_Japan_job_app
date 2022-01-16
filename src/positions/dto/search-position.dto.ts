import { IsEnum, IsOptional } from "class-validator";
import { Category, Level } from "../enums/positions.enums";

export class SearchPositionDto {

    @IsOptional()
    @IsEnum(Category, {message: "Available position categories: nodejs, angular, javascript, react"})
    category: string;
    
    @IsOptional()
    @IsEnum(Level, {message: "Available position levels: junior, middle, senior"})
    level: string;
}
