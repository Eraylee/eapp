import { registerAs } from '@nestjs/config';

export const DateBaseConfig = registerAs('database', () => ({
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  autoLoadEntities: true,
  // entities: [process.env.TYPEORM_ENTITIY],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
}));
