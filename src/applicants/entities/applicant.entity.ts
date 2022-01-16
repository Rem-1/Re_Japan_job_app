import { AutoIncrement, Column, PrimaryKey, Model, Table } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table({tableName: "applications"})
export class Applicant extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    categories: string[];

    @Column
    japaneseKnowledge: boolean;

    @Column
    level: string;
}
