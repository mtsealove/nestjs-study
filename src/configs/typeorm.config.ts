import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: 'Fucker0916*',
  synchronize: true,
  database: 'typeorm',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
