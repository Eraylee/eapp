import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  PORT: process.env.PORT,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH,
  CASBIN_CONF_PATH: process.env.CASBIN_CONF_PATH,
}));
