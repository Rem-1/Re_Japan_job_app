import { Model, Column, Table, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({tableName: "positions"})
export class Position extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    category: string;

    @Column
    level: string;

    @Column
    company: string;

    @Column
    description: string;

    @Column
    japaneseRequired: boolean;

}

