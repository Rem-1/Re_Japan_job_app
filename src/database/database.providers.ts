import { Sequelize } from 'sequelize-typescript';
import { Applicant } from 'src/applicants/entities/applicant.entity';
import { Position } from 'src/positions/entities/position.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([
          Position,
          Applicant
        ]
      );
      await sequelize.sync();
      return sequelize;
    },
  },
];